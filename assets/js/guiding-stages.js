/*
 * Guiding-question stages: animated canvases for the two guiding questions.
 *   brain : Cognition. A 3D brain (lobes in atlas colours) and an AI network both take in
 *           multimodal data; a dashed "schema?" link asks whether they build knowledge alike.
 *   build : Behavior. A human and an AI build a shared 3D knowledge network through
 *           question / explain / challenge / revise / integrate moves.
 * Plain canvas 2D with a small 3D projection; no libraries.
 * Pauses off screen and in hidden tabs; honours prefers-reduced-motion; follows the site theme.
 */
(() => {
  const root = document.documentElement;
  const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => reduceMQ.matches;

  /* ---------- palette ---------- */
  let P;
  function palette() {
    const cs = getComputedStyle(root);
    const dark = root.getAttribute("data-theme") === "dark";
    const v = (name, fb) => cs.getPropertyValue(name).trim() || fb;
    P = {
      dark,
      ink: v("--global-text-color", dark ? "#e8e8e8" : "#000000"),
      muted: v("--global-text-color-light", "#828282"),
      learner: dark ? "#f08a5d" : "#eb6834",
      ai: dark ? "#9085e9" : "#6250d6",
      truth: dark ? "#3fb27f" : "#0f7a3d",
      hurt: dark ? "#e66767" : "#c03a39",
    };
  }
  palette();

  /* ---------- helpers ---------- */
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const ease = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
  const lerp = (a, b, t) => a + (b - a) * t;
  const seeded = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

  function project(x, y, z, rotY, rotX, cx, cy, s) {
    const cY = Math.cos(rotY), sY = Math.sin(rotY);
    let x1 = x * cY + z * sY, z1 = -x * sY + z * cY;
    const cX = Math.cos(rotX), sX = Math.sin(rotX);
    const y1 = y * cX - z1 * sX; z1 = y * sX + z1 * cX;
    const f = 3.4 / (3.4 + z1);
    return { x: cx + x1 * s * f, y: cy - y1 * s * f, z: z1, f };
  }
  function dot(ctx, x, y, r, color, alpha = 1) {
    ctx.globalAlpha = alpha; ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
  }
  function ring(ctx, x, y, r, color, alpha = 1, width = 2) {
    ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = width;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke(); ctx.globalAlpha = 1;
  }
  function diamond(ctx, x, y, r, color, alpha = 1) {
    ctx.globalAlpha = alpha; ctx.fillStyle = color;
    ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x + r, y); ctx.lineTo(x, y + r); ctx.lineTo(x - r, y); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
  }
  function label(ctx, text, x, y, align = "center", color = P.muted, alpha = 1, weight = 500, size = 10) {
    ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.font = `${weight} ${size}px Roboto, system-ui, sans-serif`;
    ctx.textAlign = align; ctx.textBaseline = "middle"; ctx.fillText(text, x, y); ctx.globalAlpha = 1;
  }
  function line(ctx, x1, y1, x2, y2, color, alpha = 1, width = 1.5, dash) {
    ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = width; ctx.setLineDash(dash || []);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
  }
  const bez = (a, c, b, t) => ({ x: (1 - t) ** 2 * a.x + 2 * (1 - t) * t * c.x + t * t * b.x, y: (1 - t) ** 2 * a.y + 2 * (1 - t) * t * c.y + t * t * b.y });
  function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }

  /* =====================================================================
     Scene 1 (Cognition): a transparent "glass brain" of dots with an internal fibre network,
     beside an AI network; both are fed by the same multimodal data.
     ===================================================================== */
  // Shell samples stored flat: x, y, z, kind (0 gyrus, 1 sulcus/fold line)
  const SHELL = (() => {
    const r = seeded(11), out = [];
    for (let i = 0; i < 5600; i++) {
      const u = r() * 2 - 1, th = r() * Math.PI * 2, rr = Math.sqrt(1 - u * u);
      const nx = rr * Math.cos(th), ny = u, nz = rr * Math.sin(th);
      const side = r() < 0.5 ? 1 : -1;
      if (side * nz < -0.25) continue;                       // inner walls sit inside the other hemisphere
      let x = nx * 1.18, y = ny * 0.8, z = side * 0.47 + nz * 0.5;
      if (y < 0) y *= 0.72;
      if (y < -0.02 && x > -0.6 && x < 0.6) y -= 0.12 * Math.cos((x / 0.6) * 1.57) * ease((-y - 0.02) / 0.22);
      if (x > 0.7) y += (x - 0.7) * 0.15;
      const gyri = Math.sin(x * 9 + Math.sin(y * 6 + z * 4) * 1.9) + Math.sin(y * 10 + Math.sin(z * 7 + x * 3) * 1.7) + Math.sin(z * 8.5 + Math.sin(x * 6.5 - y * 2) * 1.5);
      const k = 1 + gyri * 0.015; x *= k; y *= k; z = side * 0.47 + (z - side * 0.47) * k;
      out.push(x, y, z, Math.abs(gyri) < 0.28 ? 1 : 0);
    }
    for (let i = 0; i < 620; i++) { // cerebellum with folia
      const u = r() * 2 - 1, th = r() * Math.PI * 2, rr = Math.sqrt(1 - u * u);
      const y = -0.56 + u * 0.24;
      out.push(-0.82 + rr * Math.cos(th) * 0.36, y, rr * Math.sin(th) * 0.62, Math.sin(y * 85) > 0.45 ? 1 : 0);
    }
    for (let i = 0; i < 140; i++) { // brainstem
      const a = r() * Math.PI * 2, hh = r();
      out.push(-0.42 - hh * 0.12 + Math.cos(a) * 0.1, -0.48 - hh * 0.45, Math.sin(a) * 0.12, 0);
    }
    return new Float32Array(out);
  })();

  // internal "connectome": regions joined by curved fibres (incl. across the hemispheres)
  const HUBS = [
    [0.72, 0.22, 0.32], [0.72, 0.22, -0.32],   // frontal
    [-0.12, 0.5, 0.32], [-0.12, 0.5, -0.32],   // parietal
    [-0.86, 0.14, 0.28], [-0.86, 0.14, -0.28], // occipital
    [0.12, -0.26, 0.55], [0.12, -0.26, -0.55], // temporal
    [-0.08, 0.02, 0.12], [-0.08, 0.02, -0.12], // thalamus
    [-0.8, -0.55, 0],                          // cerebellum
  ];
  const FIBRES = [[0, 2], [1, 3], [2, 4], [3, 5], [0, 6], [1, 7], [6, 4], [7, 5], [0, 1], [2, 3], [4, 5],
    [8, 0], [9, 1], [8, 2], [9, 3], [8, 6], [9, 7], [8, 9], [8, 10], [9, 10], [6, 8], [2, 9]].map(([a, b]) => {
    const A = HUBS[a], B = HUBS[b], mid = A.map((v, i) => (v + B[i]) / 2);
    const C = [mid[0] * 0.6, mid[1] * 0.6 + 0.16, mid[2] * 0.55];   // bow toward the core, like a tract
    const pts = [];
    for (let i = 0; i <= 14; i++) { const t = i / 14; pts.push(A.map((v, j) => (1 - t) ** 2 * v + 2 * (1 - t) * t * C[j] + t * t * B[j])); }
    return { a, b, pts };
  });

  const BUCKETS = 6;
  const bucketXY = Array.from({ length: BUCKETS * 2 }, () => new Float32Array(SHELL.length / 2));
  const bucketN = new Int32Array(BUCKETS * 2);

  function glassBrain(ctx, t, bx, by, bs, pulses) {
    const rotY = t * 0.22, rotX = 0.24;
    const cY = Math.cos(rotY), sY = Math.sin(rotY), cX = Math.cos(rotX), sX = Math.sin(rotX);
    const pr = (x, y, z) => {
      const x1 = x * cY + z * sY, z1 = -x * sY + z * cY;
      const y1 = y * cX - z1 * sX, z2 = y * sX + z1 * cX, f = 3.4 / (3.4 + z2);
      return [bx + x1 * bs * f, by - y1 * bs * f, z2];
    };
    // shell: bucket by depth and kind, then draw each bucket in one pass
    bucketN.fill(0);
    for (let i = 0; i < SHELL.length; i += 4) {
      const [px, py, z] = pr(SHELL[i], SHELL[i + 1], SHELL[i + 2]);
      const b = Math.min(BUCKETS - 1, Math.max(0, Math.floor(clamp((1.25 - z) / 2.5) * BUCKETS))) + (SHELL[i + 3] ? BUCKETS : 0);
      const n = bucketN[b]++; bucketXY[b][n * 2] = px; bucketXY[b][n * 2 + 1] = py;
    }
    ctx.fillStyle = P.ink;
    for (let b = 0; b < BUCKETS * 2; b++) {
      const fold = b >= BUCKETS, d = (b % BUCKETS + 0.5) / BUCKETS;    // d: 0 far … 1 near
      ctx.globalAlpha = (fold ? 0.2 + d * 0.55 : 0.05 + d * 0.17);
      const sz = fold ? 1.5 + d * 0.6 : 1.2 + d * 0.5, arr = bucketXY[b];
      for (let n = 0; n < bucketN[b]; n++) ctx.fillRect(arr[n * 2] - sz / 2, arr[n * 2 + 1] - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1;

    // fibres
    const fp = FIBRES.map((f) => f.pts.map(([x, y, z]) => pr(x, y, z)));
    ctx.lineWidth = 1; ctx.strokeStyle = P.muted;
    fp.forEach((pts) => {
      const depth = clamp((1.25 - pts[7][2]) / 2.5);
      ctx.globalAlpha = 0.12 + depth * 0.3;
      ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
    });
    ctx.globalAlpha = 1;
    HUBS.forEach(([x, y, z]) => { const [px, py, pz] = pr(x, y, z); dot(ctx, px, py, 2.2, P.muted, 0.35 + clamp((1.25 - pz) / 2.5) * 0.5); });

    // activity: pulses run along fibres; the arriving hub glows
    const HOT = "#f0802e";
    for (const { fibre, p } of pulses) {
      const pts = fp[fibre], idx = p * (pts.length - 1), i0 = Math.floor(idx), fr = idx - i0;
      const head = i0 >= pts.length - 1 ? pts[pts.length - 1] : [lerp(pts[i0][0], pts[i0 + 1][0], fr), lerp(pts[i0][1], pts[i0 + 1][1], fr)];
      ctx.strokeStyle = HOT; ctx.lineWidth = 1.8; ctx.globalAlpha = 0.75 * (1 - p * 0.4);
      ctx.beginPath(); ctx.moveTo(pts[Math.max(0, i0 - 3)][0], pts[Math.max(0, i0 - 3)][1]);
      for (let k = Math.max(0, i0 - 2); k <= i0; k++) ctx.lineTo(pts[k][0], pts[k][1]);
      ctx.lineTo(head[0], head[1]); ctx.stroke(); ctx.globalAlpha = 1;
      dot(ctx, head[0], head[1], 2.8, HOT, 0.95);
      if (p > 0.8) { const end = pts[pts.length - 1]; ring(ctx, end[0], end[1], 4 + (p - 0.8) * 30, HOT, (1 - p) * 4, 1.5); }
    }
  }

  const NET = (() => { // small 3-layer network, in its own 3D space
    const layers = [4, 5, 3], nodes = [], edges = [];
    layers.forEach((n, li) => { for (let i = 0; i < n; i++) nodes.push({ x: (li - 1) * 0.9, y: (i - (n - 1) / 2) * 0.42, z: ((i % 2) - 0.5) * 0.3, li }); });
    nodes.forEach((a, i) => nodes.forEach((b, j) => { if (b.li === a.li + 1) edges.push([i, j]); }));
    return { nodes, edges };
  })();
  const GLYPHS = ["chart", "scatter", "text", "image"];

  function drawGlyph(ctx, kind, x, y, color, alpha) {
    ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.strokeStyle = color; ctx.lineWidth = 1.3;
    if (kind === "chart") { for (let i = 0; i < 3; i++) ctx.fillRect(x - 7 + i * 5, y + 5 - (i + 1) * 3.5, 3.5, (i + 1) * 3.5); }
    if (kind === "scatter") { [[-6, 4], [-2, 1], [1, 2], [4, -3], [6, -5]].forEach(([a, b]) => { ctx.beginPath(); ctx.arc(x + a, y + b, 1.6, 0, 7); ctx.fill(); }); }
    if (kind === "text") { [10, 14, 8].forEach((wd, i) => ctx.fillRect(x - 7, y - 5 + i * 4.5, wd, 1.8)); }
    if (kind === "image") { ctx.strokeRect(x - 7, y - 6, 14, 11); ctx.beginPath(); ctx.moveTo(x - 6, y + 4); ctx.lineTo(x - 1, y - 1); ctx.lineTo(x + 2, y + 2); ctx.lineTo(x + 6, y - 3); ctx.stroke(); }
    ctx.globalAlpha = 1;
  }

  function brain(ctx, w, h, t) {
    const narrow = w < 380, wide = w > h * 2.6;
    let bx = narrow ? w * 0.33 : w * 0.34, by = h * 0.43, bs = Math.min(w * (narrow ? 0.19 : 0.2), h * 0.31);
    let nx = narrow ? w * 0.84 : w * 0.8, ny = h * 0.4, ns = Math.min(w * 0.1, h * 0.26);
    if (wide) { bs = h * 0.33; bx = w / 2 - bs * 1.55; by = h * 0.44; nx = w / 2 + bs * 2.6; ny = h * 0.42; ns = h * 0.24; }

    // incoming data: two of every three particles enter the brain and travel along a fibre
    const SPAWN = 0.45, LIFE = 1.5, RUN = 1.1; let netAct = 0;
    const glyphY = h - 18, glyphX = (i) => w * 0.5 + (i - 1.5) * 26;
    const particles = [], pulses = [];
    for (let k = Math.floor((t - LIFE - RUN) / SPAWN); k <= Math.floor(t / SPAWN); k++) {
      if (k < 0) continue;
      const age = t - k * SPAWN; if (age < 0 || age > LIFE + RUN) continue;
      const toBrain = k % 3 !== 2, g = k % 4;
      if (age > LIFE) { if (toBrain) pulses.push({ fibre: (k * 5) % FIBRES.length, p: (age - LIFE) / RUN }); else netAct = Math.max(netAct, 1 - (age - LIFE) / RUN); continue; }
      particles.push({ g, toBrain, p: ease(age / LIFE) });
    }

    glassBrain(ctx, t, bx, by, bs, pulses);

    // AI network
    const np = NET.nodes.map((n) => project(n.x, n.y, n.z, Math.sin(t * 0.4) * 0.5, 0.15, nx, ny, ns));
    NET.edges.forEach(([i, j], e) => {
      const pulse = netAct * (0.5 + 0.5 * Math.sin(e * 1.7 + t * 6));
      line(ctx, np[i].x, np[i].y, np[j].x, np[j].y, P.ai, 0.18 + pulse * 0.5, 1);
    });
    np.forEach((p) => dot(ctx, p.x, p.y, 3.2 + netAct * 1.5, P.ai, 0.9));

    // the open question between them
    const sx1 = bx + bs * 1.5, sx2 = nx - ns * 1.3, sy = by - bs * 0.1;
    line(ctx, sx1, sy, sx2, sy, P.muted, 0.5, 1.2, [3, 4]);
    label(ctx, "schema?", (sx1 + sx2) / 2, sy - 9, "center", P.muted, 0.9, 600);

    // particles
    for (const q of particles) {
      const start = { x: glyphX(q.g), y: glyphY - 10 };
      const end = q.toBrain ? { x: bx + (q.g - 1.5) * bs * 0.35, y: by + bs * 0.2 } : { x: nx - ns * 0.9, y: ny + (q.g - 1.5) * 8 };
      const c = { x: (start.x + end.x) / 2, y: Math.min(start.y, end.y) - 10 };
      const pt = bez(start, c, end, q.p);
      dot(ctx, pt.x, pt.y, 2.2, q.toBrain ? "#f0802e" : P.ai, 0.9);
    }

    // data glyphs + labels
    GLYPHS.forEach((g, i) => drawGlyph(ctx, g, glyphX(i), glyphY - 3, P.ink, 0.65));
    label(ctx, "multimodal data", w * 0.5 + 62, glyphY - 3, "left", P.muted, 0.95);
    label(ctx, "human", bx, by + bs * 1.02 + 4, "center", P.muted, 0.95, 600);
    label(ctx, "AI", nx, ny + ns * 1.5 + 2, "center", P.ai, 0.95, 600);
  }

  /* =====================================================================
     Scene 2 (Behavior): a human and an AI build a shared knowledge network
     ===================================================================== */
  const KNODES = [ // 3D positions of knowledge nodes, in build order
    [0, 0.05, 0], [0.62, 0.35, 0.2], [-0.55, 0.42, -0.25], [0.5, -0.45, -0.35],
    [-0.6, -0.35, 0.35], [0.05, 0.75, 0.45], [0.1, -0.7, 0.4], [0.78, -0.05, -0.55],
  ];
  const KEDGES = { 1: [0], 2: [0, 1], 3: [0], 4: [0, 2], 5: [1, 2], 6: [3, 4], 7: [1, 3] };
  // the collaboration script; node adds a node; target acts on an existing node
  const STEPS = [
    { who: "H", move: "question", node: 0 },
    { who: "A", move: "explain", node: 1 },
    { who: "H", move: "integrate", node: 2 },
    { who: "A", move: "explain", node: 3, flawed: true },
    { who: "H", move: "challenge", target: 3 },
    { who: "A", move: "revise", target: 3 },
    { who: "H", move: "integrate", node: 4 },
    { who: "A", move: "explain", node: 5 },
    { who: "H", move: "question", node: 6 },
    { who: "A", move: "explain", node: 7 },
  ];
  const STEP = 1.15, BUILD = STEPS.length * STEP, HOLD = 2.6, CYCLE2 = BUILD + HOLD + 0.8;

  function build(ctx, w, h, t) {
    const T = t % CYCLE2;
    const cx = w / 2, cy = h * 0.45, s = Math.min(w * 0.22, h * 0.34);
    const rotY = t * 0.3, rotX = 0.28;
    const wide = w > h * 2.6;
    const hx = wide ? cx - s * 2.6 : Math.max(34, w * 0.09), ax = wide ? cx + s * 2.6 : w - Math.max(34, w * 0.09), ay = cy + 6;
    const fadeAll = T > BUILD + HOLD ? 1 - (T - BUILD - HOLD) / 0.8 : 1;
    const stepNow = Math.min(STEPS.length - 1, Math.floor(T / STEP)), stepP = (T % STEP) / STEP;
    const building = T < BUILD;

    // node state from the script so far
    const state = new Map();
    STEPS.forEach((st, i) => {
      const doneAt = i * STEP + STEP * 0.55; // the pulse arrives at 55% of the step
      if (T < doneAt) return;
      if (st.node !== undefined) state.set(st.node, { who: st.who, flawed: !!st.flawed, born: doneAt });
      if (st.move === "challenge" && state.has(st.target)) state.get(st.target).challenged = doneAt;
      if (st.move === "revise" && state.has(st.target)) Object.assign(state.get(st.target), { flawed: false, revised: doneAt });
    });

    const proj = KNODES.map(([x, y, z]) => project(x, y, z, rotY, rotX, cx, cy, s));
    const consolidated = !building ? ease((T - BUILD) / 0.8) : 0;

    // the shared space between the collaborators
    ctx.globalAlpha = 0.75; ctx.strokeStyle = P.muted; ctx.lineWidth = 1.2; ctx.setLineDash([3, 5]);
    ctx.beginPath(); ctx.ellipse(cx, cy, s * 1.4, s * 1.1, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    label(ctx, "collaborative space", cx, cy + s * 1.1 + 14, "center", P.muted, 1, 600, 11);

    // edges grow from the existing node to the new one
    for (const [k, links] of Object.entries(KEDGES)) {
      const a = state.get(+k); if (!a) continue;
      for (const j of links) {
        if (!state.get(j)) continue;
        const pa = proj[+k], pb = proj[j];
        const grow = ease((T - a.born) / 0.4);
        line(ctx, pb.x, pb.y, lerp(pb.x, pa.x, grow), lerp(pb.y, pa.y, grow), consolidated ? P.truth : P.muted, (0.35 + consolidated * 0.45) * fadeAll, 1.4 + consolidated);
      }
    }
    // nodes, back to front
    [...state.entries()].map(([i, st]) => ({ st, p: proj[i] })).sort((a, b) => b.p.z - a.p.z).forEach(({ st, p }) => {
      const born = ease((T - st.born) / 0.35);
      const r = (6 + p.f * 2) * (0.4 + 0.6 * born);
      let color = st.who === "H" ? P.learner : P.ai, jitter = 0;
      if (st.flawed && st.challenged) { color = P.hurt; jitter = Math.sin(T * 40) * 2 * clamp(1 - (T - st.challenged) / 0.6); }
      if (consolidated) color = P.truth;
      const alpha = (0.55 + 0.45 * clamp(1 - (p.z + 1) / 2)) * fadeAll;
      if (st.who === "A" && !consolidated) diamond(ctx, p.x + jitter, p.y, r * 1.15, color, alpha);
      else dot(ctx, p.x + jitter, p.y, r, color, alpha);
      if (st.revised && !consolidated) ring(ctx, p.x, p.y, r + 4, P.ai, 0.6 * fadeAll, 1.2);
      if (consolidated) ring(ctx, p.x, p.y, r + 3 + consolidated * 4, P.truth, (1 - consolidated) * 0.6 + 0.15, 1.5);
    });

    // the two collaborators
    const H = { x: hx, y: ay }, A = { x: ax, y: ay };
    dot(ctx, H.x, H.y, 9, P.learner);
    diamond(ctx, A.x, A.y, 10, P.ai);
    label(ctx, "human", H.x, H.y + 20, "center", P.muted, 1, 600);
    label(ctx, "AI", A.x, A.y + 20, "center", P.ai, 1, 600);

    // the current move: a pulse from the actor into the network, and its name
    if (building) {
      const st = STEPS[stepNow];
      const from = st.who === "H" ? H : A;
      const to = proj[st.node !== undefined ? st.node : st.target];
      const color = st.who === "H" ? P.learner : P.ai;
      const c = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 30 };
      line(ctx, from.x, from.y, to.x, to.y, color, 0.12, 1, [2, 4]);
      if (stepP < 0.55) { const pt = bez(from, c, to, ease(stepP / 0.55)); dot(ctx, pt.x, pt.y, 3.5, color); }
      const fade = stepP < 0.15 ? stepP / 0.15 : stepP > 0.85 ? (1 - stepP) / 0.15 : 1;
      label(ctx, st.move, from.x, from.y - 22, "center", st.move === "challenge" ? P.hurt : color, fade, 700, 11);
    } else {
      label(ctx, "shared knowledge", cx, 16, "center", P.truth, consolidated * fadeAll, 700, 11);
    }
  }

  /* =====================================================================
     Scene 3 (Technical work): a 3D network trains while its loss curve falls
     ===================================================================== */
  // layers sit side by side along x; each layer's neurons ring the x-axis in 3D
  const NET3 = (() => {
    const sizes = [4, 6, 6, 3], nodes = [], edges = [], r = seeded(5);
    sizes.forEach((n, l) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + l * 0.4, rad = n === 3 ? 0.3 : 0.44;
        nodes.push({ l, x: (l - (sizes.length - 1) / 2) * 0.95, y: Math.cos(a) * rad, z: Math.sin(a) * rad });
      }
    });
    nodes.forEach((A, i) => nodes.forEach((B, j) => { if (B.l === A.l + 1) edges.push({ i, j, mag: 0.25 + r() * 0.75 }); }));
    return { nodes, edges, layers: sizes.length };
  })();
  const TRAIN_CYCLE = 9.5, TRAIN_RUN = 7.5;

  function train(ctx, w, h, t) {
    const T = t % TRAIN_CYCLE, p = clamp(T / TRAIN_RUN), done = T > TRAIN_RUN;
    const fade = T > TRAIN_CYCLE - 0.5 ? (TRAIN_CYCLE - T) / 0.5 : 1;
    const wide = w > h * 2.6;
    const ncx = wide ? w * 0.5 - h * 0.85 : w * 0.31, ncy = h * 0.46, ns = wide ? h * 0.46 : Math.min(w * 0.19, h * 0.36);
    const chL = wide ? w * 0.5 + h * 0.25 : w * 0.64, chR = wide ? w * 0.5 + h * 1.4 : w - 16;
    const top = h * 0.16, bot = h * 0.78;
    const rotY = Math.sin(t * 0.3) * 0.38 + 0.18, rotX = 0.32;   // stays side-on enough to read the layers

    const P3 = NET3.nodes.map((n) => project(n.x, n.y, n.z, rotY, rotX, ncx, ncy, ns));
    const depthA = (z) => clamp(0.35 + (1 - (z + 0.8) / 1.6) * 0.65);
    // edges: fade with depth, strengthen with training
    for (const e of NET3.edges) {
      const a = P3[e.i], b = P3[e.j];
      line(ctx, a.x, a.y, b.x, b.y, P.ai, (0.06 + p * 0.4 * e.mag) * depthA((a.z + b.z) / 2) * fade, 0.6 + p * 1.3 * e.mag);
    }
    // pulses: forward pass (ink), then gradients flowing back (orange)
    const STEP = 1.25, sp = (T % STEP) / STEP;
    if (!done) {
      const forward = sp < 0.5, q = forward ? sp / 0.5 : (sp - 0.5) / 0.5;
      const span = NET3.layers - 1, pos = forward ? q * span : (1 - q) * span;
      const l = Math.min(span - 1, Math.floor(pos)), f = pos - l;
      for (const e of NET3.edges) {
        if (NET3.nodes[e.i].l !== l || e.mag < 0.6) continue;
        const a = P3[e.i], b = P3[e.j];
        dot(ctx, lerp(a.x, b.x, f), lerp(a.y, b.y, f), 2, forward ? P.ink : "#f0802e", 0.8 * depthA(lerp(a.z, b.z, f)) * fade);
      }
      label(ctx, forward ? "forward pass" : "backprop", ncx, h - 12, "center", forward ? P.muted : "#f0802e", 0.95, 600);
    }
    // neurons, back to front
    P3.map((q, i) => ({ q, i })).sort((A, B) => B.q.z - A.q.z).forEach(({ q }) => {
      dot(ctx, q.x, q.y, 3.6 + q.f * 2.2, P.ai, depthA(q.z) * fade);
    });

    // loss chart
    const loss = (x) => 0.12 + 0.82 * Math.exp(-4.2 * x) + 0.035 * Math.sin(x * 37) * (1 - x);
    const X = (x) => lerp(chL, chR, x), Y = (v) => lerp(bot, top, v); // high loss sits high
    line(ctx, chL, top - 4, chL, bot, P.muted, 0.55, 1);
    line(ctx, chL, bot, chR, bot, P.muted, 0.55, 1);
    label(ctx, "epochs →", chR, bot + 11, "right", P.muted, 0.9);
    ctx.globalAlpha = fade; ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.beginPath();
    for (let k = 0; k <= 80; k++) { const x = (k / 80) * p; k ? ctx.lineTo(X(x), Y(loss(x))) : ctx.moveTo(X(x), Y(loss(x))); }
    ctx.stroke(); ctx.globalAlpha = 1;
    dot(ctx, X(p), Y(loss(p)), 3.4, done ? P.truth : "#f0802e", fade);
    label(ctx, done ? "trained ✓" : `loss ${loss(p).toFixed(2)} · epoch ${Math.round(p * 20)}`, chR, top - 8, "right", done ? P.truth : P.ink, fade, 600);
  }

  const SCENES = {
    brain: { draw: brain, still: 1.6 },
    build: { draw: build, still: BUILD + 1.2 },
    train: { draw: train, still: 6.2 },
  };

  /* ---------- stage runner ---------- */
  const stages = [];
  function mount(card) {
    const scene = SCENES[card.dataset.scene];
    const canvas = card.querySelector("canvas");
    if (!scene || !canvas) return;
    const ctx = canvas.getContext("2d");
    const st = { w: 0, h: 0, dpr: 1, t: 0.6, last: 0, raf: 0, visible: false, speed: 1 };
    const draw = (time) => { ctx.clearRect(0, 0, st.w, st.h); scene.draw(ctx, st.w, st.h, time); };
    const frame = (now) => {
      const dt = st.last ? Math.min(64, now - st.last) : 16; st.last = now;
      st.t += (dt / 1000) * st.speed; draw(st.t);
      st.raf = requestAnimationFrame(frame);
    };
    st.start = () => { if (!st.raf && st.visible && !reduced() && !document.hidden) { st.last = 0; st.raf = requestAnimationFrame(frame); } };
    st.stop = () => { cancelAnimationFrame(st.raf); st.raf = 0; };
    st.refresh = () => { if (reduced()) { st.stop(); draw(scene.still); } else if (!st.raf) { draw(st.t); st.start(); } };
    const resize = () => {
      const r = canvas.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
      st.w = r.width; st.h = r.height; st.dpr = dpr;
      canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(reduced() ? scene.still : st.t);
    };
    new ResizeObserver(resize).observe(canvas);
    new IntersectionObserver(([e]) => { st.visible = e.isIntersecting; st.visible ? st.refresh() : st.stop(); }, { rootMargin: "80px" }).observe(card);
    const fast = () => (st.speed = 1.7), slow = () => (st.speed = 1);
    card.addEventListener("mouseenter", fast); card.addEventListener("mouseleave", slow);
    card.addEventListener("focusin", fast); card.addEventListener("focusout", slow);
    stages.push(st);
  }

  const refreshAll = () => stages.forEach((s) => s.refresh());
  new MutationObserver(() => { palette(); refreshAll(); }).observe(root, { attributes: true, attributeFilter: ["data-theme", "class"] });
  reduceMQ.addEventListener?.("change", refreshAll);
  document.addEventListener("visibilitychange", () => stages.forEach((s) => (document.hidden ? s.stop() : s.refresh())));

  const init = () => document.querySelectorAll(".gq-card[data-scene], .rq-band[data-scene]").forEach(mount);
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
