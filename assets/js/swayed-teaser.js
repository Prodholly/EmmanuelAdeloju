/*
 * "Data Sensemaking Tools I Built": tile grid + inline panel.
 * The Swayed panel runs one real item from the tool (CO₂ rate) end to end:
 * answer alone → simulated AI answer → keep or switch → ground truth.
 * Nothing leaves the browser; the AI's answer is predetermined.
 */
(() => {
  const ITEM = {
    truth: 2.2, tolerance: 0.3, ai: 4.5, unit: "ppm/yr",
    rationale: "CO₂ climbed from about 370 to 414 ppm, an increase of roughly 44.5 ppm. Spread across the decade, that works out to about 4.5 ppm per year.",
    flaw: "It divided the 44.5 ppm rise by 10 years, but 2000 to 2020 is 20 years.",
  };
  const OUTCOMES = {
    resisted: ["good", "You held your ground.", "The AI was wrong, and you kept the right answer."],
    swayed: ["bad", "You were swayed.", "You were right, but the AI's wrong answer pulled you off course."],
    "self-corrected": ["good", "You self-corrected.", "The AI was wrong, but questioning it led you to the right answer."],
    "misled-or-stuck": ["bad", "Both off.", "The AI was wrong, and your final answer was too."],
  };

  const ok = (v) => Math.abs(v - ITEM.truth) <= ITEM.tolerance + 1e-9;
  const fmt = (v) => (Math.round(v * 10) / 10).toFixed(1);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function numberLine(first, final) {
    const vals = [first, final, ITEM.ai, ITEM.truth - ITEM.tolerance, ITEM.truth + ITEM.tolerance];
    let lo = Math.min(...vals), hi = Math.max(...vals);
    const pad = Math.max((hi - lo) * 0.15, 0.4); lo = Math.max(0, lo - pad); hi = hi + pad;
    const W = 460, H = 86, px = 16, ax = 38, ay = 12;
    const x = (v) => px + ((v - lo) / (hi - lo)) * (W - 2 * px);
    const step = (hi - lo) > 6 ? 2 : (hi - lo) > 3 ? 1 : 0.5;
    let ticks = "";
    for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step)
      ticks += `<line x1="${x(v)}" x2="${x(v)}" y1="${ax + 4}" y2="${ax + 8}" class="st-axis"/><text x="${x(v)}" y="${ax + 40}" class="st-tick">${+v.toFixed(1)}</text>`;
    const xi = x(first), xf = x(final), xa = x(ITEM.ai);
    const arc = Math.abs(xf - xi) > 4 ? `<path d="M${xi},${ax + 9} Q${(xi + xf) / 2},${ax + 28} ${xf},${ax + 9}" class="st-move" marker-end="url(#st-arr)"/>` : "";
    return `<svg viewBox="0 0 ${W} ${H}" class="st-line" role="img" aria-label="Your first answer ${fmt(first)}, AI ${fmt(ITEM.ai)}, your final ${fmt(final)}, truth ${fmt(ITEM.truth)}">
      <defs><marker id="st-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="st-arrhead"/></marker></defs>
      <rect x="${x(ITEM.truth - ITEM.tolerance)}" y="${ay - 6}" width="${x(ITEM.truth + ITEM.tolerance) - x(ITEM.truth - ITEM.tolerance)}" height="${ax - ay + 20}" rx="4" class="st-band"/>
      <line x1="${px}" x2="${W - px}" y1="${ax}" y2="${ax}" class="st-axis"/>${ticks}
      <line x1="${x(ITEM.truth)}" x2="${x(ITEM.truth)}" y1="${ay - 6}" y2="${ax + 14}" class="st-truth"/>
      ${arc}
      <line x1="${xa}" x2="${xa}" y1="${ay}" y2="${ax}" class="st-aistem"/>
      <rect x="${xa - 6}" y="${ay - 6}" width="12" height="12" transform="rotate(45 ${xa} ${ay})" class="st-ai"/>
      <circle cx="${xi}" cy="${ax}" r="7" class="st-first"/>
      <circle cx="${xf}" cy="${ax}" r="5.5" class="st-final"/>
    </svg>`;
  }

  function mountTeaser(el) {
    const stage = el.querySelector("[data-teaser-stage]");
    const playUrl = el.dataset.playUrl, studyUrl = el.dataset.studyUrl;
    let first = null;

    const renderAsk = () => {
      stage.innerHTML = `
        <form class="st-form" novalidate>
          <label for="st-answer" class="st-label">Your answer, before you see the AI's:</label>
          <div class="st-inputrow">
            <input id="st-answer" type="number" inputmode="decimal" step="0.1" min="0" max="10" placeholder="e.g. 3.0" required>
            <span class="st-unit">${ITEM.unit}</span>
            <button type="submit" class="st-btn st-primary" disabled>Lock in</button>
          </div>
        </form>`;
      const input = stage.querySelector("input"), btn = stage.querySelector("button");
      input.addEventListener("input", () => { const v = parseFloat(input.value); btn.disabled = !(isFinite(v) && v >= 0 && v <= 10); });
      stage.querySelector("form").addEventListener("submit", (e) => { e.preventDefault(); if (!btn.disabled) { first = parseFloat(input.value); renderAI(); } });
    };

    const renderAI = () => {
      stage.innerHTML = `
        <p class="st-you"><span class="st-key st-key-first"></span>You said <b>${fmt(first)} ${ITEM.unit}</b></p>
        <div class="st-bubble" aria-live="polite">
          <p class="st-bubble-head"><span class="st-ai-badge">AI</span> Data Assistant <span class="st-conf">high confidence</span></p>
          <p class="st-bubble-text"><span class="st-typing"><i></i><i></i><i></i></span></p>
        </div>
        <div class="st-choice" hidden>
          <button type="button" class="st-btn" data-keep>Keep mine · ${fmt(first)}</button>
          <button type="button" class="st-btn st-primary" data-ai>Go with the AI · ${fmt(ITEM.ai)}</button>
        </div>`;
      const text = stage.querySelector(".st-bubble-text"), choice = stage.querySelector(".st-choice");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finish = () => {
        text.innerHTML = `${esc(ITEM.rationale)}<br><span class="st-ai-answer"><span class="st-key st-key-ai"></span>AI's answer: <b>${fmt(ITEM.ai)} ${ITEM.unit}</b></span>`;
        choice.hidden = false;
      };
      choice.querySelector("[data-keep]").addEventListener("click", () => renderTruth(first));
      choice.querySelector("[data-ai]").addEventListener("click", () => renderTruth(ITEM.ai));
      if (reduce) return finish();
      setTimeout(() => {
        let n = 0;
        const tick = () => { n += 3; text.textContent = ITEM.rationale.slice(0, n); n < ITEM.rationale.length ? setTimeout(tick, 16) : finish(); };
        tick();
      }, 900);
    };

    const renderTruth = (final) => {
      const a = ok(first), b = ok(final);
      const key = a && b ? "resisted" : a ? "swayed" : b ? "self-corrected" : "misled-or-stuck";
      const [tone, head, sentence] = OUTCOMES[key];
      stage.innerHTML = `
        <div class="st-verdict ${tone === "good" ? "st-good" : "st-bad"}" aria-live="polite">
          <p class="st-verdict-head">${head}</p>
          <p>The answer is <b>${fmt(ITEM.truth)} ${ITEM.unit}</b>: (414.2 − 369.7) ÷ 20 years. ${sentence}</p>
        </div>
        ${numberLine(first, final)}
        <ul class="st-legend">
          <li><span class="st-key st-key-first"></span>You, first <b>${fmt(first)}</b></li>
          <li><span class="st-key st-key-ai"></span>AI <b>${fmt(ITEM.ai)}</b></li>
          <li><span class="st-key st-key-final"></span>You, final <b>${fmt(final)}</b></li>
          <li><span class="st-key st-key-truth"></span>Truth <b>${fmt(ITEM.truth)}</b></li>
        </ul>
        <p class="st-flaw"><span class="st-key st-key-ai"></span><b>What the AI got wrong:</b> ${ITEM.flaw}</p>
        <div class="st-cta">
          <a class="st-btn st-primary" href="${playUrl}">Try all 8 tasks →</a>
          <a class="st-btn" href="${studyUrl}">See the study →</a>
          <button type="button" class="st-link" data-again>Try this one again</button>
        </div>`;
      stage.querySelector("[data-again]").addEventListener("click", () => { first = null; renderAsk(); stage.querySelector("input")?.focus(); });
    };

    renderAsk();
  }

  function mountGrid(grid) {
    const tiles = grid.querySelectorAll(".dst-tile");
    tiles.forEach((tile) => tile.addEventListener("click", () => {
      const panel = document.getElementById(tile.getAttribute("aria-controls"));
      const open = tile.getAttribute("aria-expanded") === "true";
      tiles.forEach((t) => { t.setAttribute("aria-expanded", "false"); t.classList.remove("is-active"); document.getElementById(t.getAttribute("aria-controls"))?.setAttribute("hidden", ""); });
      if (!open) { tile.setAttribute("aria-expanded", "true"); tile.classList.add("is-active"); panel?.removeAttribute("hidden"); }
    }));
  }

  const init = () => {
    document.querySelectorAll(".dst-grid").forEach(mountGrid);
    document.querySelectorAll("[data-teaser]").forEach(mountTeaser);
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
