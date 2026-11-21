import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { itemById, items, sessions } from "../shared/data";
import { isCorrect, outcome, weightOfAdvice } from "../shared/metrics";
import { DOMAIN_LABELS, ERROR_LABELS, OUTCOME_LABELS, PERSONA_COLORS, formatAnswer } from "../shared/labels";
import { PERSONAS } from "../shared/simulation";
import { Comparison, DataChart } from "../shared/ItemViews";

const PHASES = ["Reads the data", "Answers alone", "AI weighs in", "Final answer", "Ground truth"] as const;
const P = PHASES.length;
const TOTAL = items.length * P;

/** Rewrites the tool's second-person outcome sentences for an observer. */
export const thirdPerson = (s: string) =>
  s.replace(/\bYou were\b/g, "The learner was").replace(/\byou were\b/g, "the learner was")
    .replace(/\bYou\b/g, "The learner").replace(/\byou\b/g, "the learner")
    .replace(/\bYour\b/g, "Their").replace(/\byour\b/g, "their");

export function Replay() {
  const [persona, setPersona] = useState(PERSONAS[0].id);
  const [id, setId] = useState(sessions.find((s) => s.persona === PERSONAS[0].id)!.sessionId);
  const [pos, setPos] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<1 | 2>(1);
  const rootRef = useRef<HTMLDivElement>(null);

  const s = sessions.find((x) => x.sessionId === id)!;
  const pool = sessions.filter((x) => x.persona === persona);
  const itemIdx = Math.min(items.length - 1, Math.floor(pos / P));
  const phase = pos % P;
  const t = s.trials[itemIdx];
  const item = itemById.get(t.itemId)!;
  const o = outcome(item, t);

  const choose = useCallback((sid: string) => { setId(sid); setPos(0); setPlaying(false); }, []);
  const go = useCallback((p: number) => setPos(Math.max(0, Math.min(TOTAL - 1, p))), []);

  // autoplay
  useEffect(() => {
    if (!playing) return;
    if (pos >= TOTAL - 1) { setPlaying(false); return; }
    const ms = (phase === 0 ? 1400 : phase === 2 ? 2600 : 1800) / speed;
    const h = setTimeout(() => setPos((p) => p + 1), ms);
    return () => clearTimeout(h);
  }, [playing, pos, phase, speed]);

  const onKey = (e: React.KeyboardEvent) => {
    if ((e.target as HTMLElement).tagName === "SELECT") return;
    if (e.key === "ArrowRight") { e.preventDefault(); go(pos + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(pos - 1); }
    else if (e.key === " ") { e.preventDefault(); setPlaying((p) => !p); }
  };

  // running tallies up to the current point
  const done = s.trials.slice(0, itemIdx + (phase === P - 1 ? 1 : 0));
  const aloneSoFar = s.trials.slice(0, itemIdx + (phase >= 1 ? 1 : 0)).filter((tr) => isCorrect(itemById.get(tr.itemId)!, tr.initial.answer)).length;
  const finalSoFar = done.filter((tr) => isCorrect(itemById.get(tr.itemId)!, tr.revised.answer)).length;

  return (
    <div ref={rootRef} tabIndex={0} onKeyDown={onKey} className="card overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-ink/30">
      {/* --- session picker --- */}
      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-wash/60 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Learner type">
          {PERSONAS.map((p) => (
            <button key={p.id} aria-pressed={persona === p.id}
              onClick={() => { setPersona(p.id); choose(sessions.find((x) => x.persona === p.id)!.sessionId); }}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium transition ${
                persona === p.id ? "border-ink bg-ink text-white" : "border-line bg-card text-muted hover:border-faint"}`}>
              <span className="h-2 w-2 rounded-full" style={{ background: PERSONA_COLORS[p.id] }} />{p.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="session" className="sr-only">Session</label>
          <select id="session" value={id} onChange={(e) => choose(e.target.value)}
            className="rounded-lg border border-line bg-card px-2.5 py-1.5 text-sm font-medium outline-none focus:border-ink">
            {pool.map((x) => <option key={x.sessionId} value={x.sessionId}>Session {x.sessionId}</option>)}
          </select>
          <button onClick={() => choose(pool[Math.floor(Math.random() * pool.length)].sessionId)}
            className="rounded-lg border border-line bg-card px-2.5 py-1.5 text-sm font-semibold hover:border-faint" title="Random session of this type">↻</button>
        </div>
      </div>

      {/* --- timeline --- */}
      <div className="px-5 pt-5 sm:px-6">
        <div className="flex gap-1.5" role="slider" aria-label="Replay position" aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={pos + 1}
          aria-valuetext={`Item ${itemIdx + 1}, ${PHASES[phase]}`}>
          {s.trials.map((tr, i) => {
            const it = itemById.get(tr.itemId)!;
            const oc = OUTCOME_LABELS[outcome(it, tr)];
            const revealed = pos >= i * P + P - 1;
            const current = i === itemIdx;
            return (
              <div key={tr.itemId} className="group flex-1">
                <div className="flex gap-0.5">
                  {PHASES.map((ph, k) => {
                    const p = i * P + k;
                    return (
                      <button key={k} onClick={() => { go(p); setPlaying(false); }} title={`#${i + 1} ${it.title}: ${ph}`}
                        className={`h-2.5 flex-1 first:rounded-l-full last:rounded-r-full transition-colors ${
                          p <= pos ? (current ? "bg-ink" : "bg-ink/70") : "bg-line hover:bg-faint/50"}`} />
                    );
                  })}
                </div>
                <div className={`mt-1.5 flex items-center gap-1.5 text-[11px] tabular-nums ${current ? "font-semibold text-ink" : "text-faint"}`}>
                  #{i + 1}
                  {it.ai.errorType !== "none" && <span className="hidden h-1.5 w-1.5 rotate-45 bg-ai sm:inline-block" title="AI wrong on this item" />}
                  {revealed && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className={`h-2 w-2 rounded-full ${oc.tone === "good" ? "bg-truth" : "bg-bad"}`} title={oc.label} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- controls --- */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Ctl label="Previous item" onClick={() => go((itemIdx - 1) * P)}><path d="M6 5v14M19 5l-9 7 9 7z" /></Ctl>
          <Ctl label="Step back" onClick={() => go(pos - 1)}><path d="M15 5l-8 7 8 7" fill="none" strokeWidth={2.4} /></Ctl>
          <button onClick={() => { if (pos >= TOTAL - 1) setPos(0); setPlaying((p) => !p); }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white shadow-sm transition hover:bg-ink/90" aria-label={playing ? "Pause" : "Play"}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">{playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M7 4l13 8-13 8z" />}</svg>
          </button>
          <Ctl label="Step forward" onClick={() => go(pos + 1)}><path d="M9 5l8 7-8 7" fill="none" strokeWidth={2.4} /></Ctl>
          <Ctl label="Next item" onClick={() => go((itemIdx + 1) * P)}><path d="M18 5v14M5 5l9 7-9 7z" /></Ctl>
          <button onClick={() => setSpeed((v) => (v === 1 ? 2 : 1))}
            className="ml-1 rounded-full border border-line px-2.5 py-1 text-xs font-semibold tabular-nums text-muted hover:border-faint">{speed}×</button>
          <p className="ml-auto text-sm">
            <span className="text-faint">Item {itemIdx + 1}/8 · </span>
            <span className="font-semibold">{PHASES[phase]}</span>
          </p>
        </div>
        <p className="mt-1 hidden text-xs text-faint sm:block">Tip: click the player, then use ← → to step and Space to play or pause. ◆ marks items where the AI was wrong; a green or red dot appears once an item's outcome is revealed.</p>
      </div>

      {/* --- stage --- */}
      <div className="mt-4 grid gap-6 border-t border-line p-5 sm:p-6 lg:grid-cols-[1fr_1fr]">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-faint">{DOMAIN_LABELS[item.domain]} · Item {itemIdx + 1}</p>
          <h3 className="mt-1 font-serif text-2xl font-semibold">{item.title}</h3>
          <p className="mt-1 text-[15px] text-muted">{item.question.prompt}</p>
          <div className="mt-3"><DataChart item={item} height={240} /></div>
        </div>

        <div className="min-w-0 space-y-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {phase >= 1 && (
              <Beat key={`${id}-${itemIdx}-1`} tone="learner" label="Answers alone">
                <b>{formatAnswer(item, t.initial.answer)}</b>
                <span className="text-muted"> · {t.initial.confidence}% sure · {Math.round(t.initial.rtMs / 1000)} s</span>
              </Beat>
            )}
            {phase >= 2 && (
              <Beat key={`${id}-${itemIdx}-2`} tone="ai" label={`AI · ${item.ai.statedConfidence} confidence`}>
                <p className="text-[14px] leading-relaxed">{item.ai.rationale}</p>
                <p className="mt-1.5"><span className="text-muted">Answer: </span><b>{formatAnswer(item, item.ai.answer)}</b></p>
              </Beat>
            )}
            {phase >= 3 && (
              <Beat key={`${id}-${itemIdx}-3`} tone="learner" label="Final answer">
                <b>{formatAnswer(item, t.revised.answer)}</b>
                <span className="text-muted"> · {t.revised.confidence}% sure</span>
                <p className="mt-1 text-sm text-muted">{moveSentence(item, t)}</p>
              </Beat>
            )}
            {phase >= 4 && (
              <Beat key={`${id}-${itemIdx}-4`} tone={OUTCOME_LABELS[o].tone === "good" ? "good" : "bad"} label={`Ground truth · ${OUTCOME_LABELS[o].label}`}>
                <p className="text-sm">{thirdPerson(OUTCOME_LABELS[o].sentence)}</p>
                {item.ai.flaw && <p className="mt-1.5 text-sm text-muted"><span className="font-semibold text-ai">AI error ({ERROR_LABELS[item.ai.errorType].label}):</span> {item.ai.flaw}</p>}
                <TrustMeter before={t.trustBefore} after={t.calibration.trustAfter} />
              </Beat>
            )}
          </AnimatePresence>
          {phase === 0 && (
            <div className="rounded-xl border border-dashed border-line p-4 text-sm text-faint">
              The learner is reading the chart. Press ▶ or → to follow what happens next.
            </div>
          )}
          <div className="pt-2">
            <Comparison item={item} who="Learner" marks={{ initial: t.initial.answer, ai: item.ai.answer, final: t.revised.answer }}
              show={{ initial: phase >= 1, ai: phase >= 2, final: phase >= 3, truth: phase >= 4 }} />
          </div>
        </div>
      </div>

      {/* --- running tally --- */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line bg-wash/60 px-5 py-3 text-sm sm:px-6">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: PERSONA_COLORS[s.persona] }} />
          <b>{PERSONAS.find((p) => p.id === s.persona)!.label}</b>
          <span className="text-faint">· session {s.sessionId}</span>
        </span>
        <span className="tabular-nums text-muted">Correct alone <b className="text-ink">{aloneSoFar}</b></span>
        <span className="tabular-nums text-muted">Correct final <b className="text-ink">{finalSoFar}</b></span>
        <TrustSpark trials={s.trials} upto={itemIdx + (phase === P - 1 ? 1 : 0)} />
      </div>
    </div>
  );
}

function moveSentence(item: (typeof items)[number], t: (typeof sessions)[number]["trials"][number]) {
  const same = item.question.kind === "numeric"
    ? Math.abs((t.initial.answer as number) - (t.revised.answer as number)) < 1e-9
    : t.initial.answer === t.revised.answer;
  if (same) return t.initial.answer === item.ai.answer ? "Already agreed with the AI." : "Kept their own answer.";
  if (t.revised.answer === item.ai.answer) return "Switched to the AI's answer.";
  const w = weightOfAdvice(item, t);
  if (w !== undefined) return `Moved ${Math.round(w * 100)}% of the way toward the AI's answer.`;
  return "Changed to a different answer.";
}

const TONES = {
  learner: "border-learner/30 bg-learner-wash",
  ai: "border-ai/25 bg-ai-wash",
  good: "border-truth/30 bg-truth-wash",
  bad: "border-bad/25 bg-bad-wash",
};
const DOT = { learner: "bg-learner", ai: "bg-ai rotate-45 rounded-none", good: "bg-truth", bad: "bg-bad" };

function Beat({ tone, label, children }: { tone: keyof typeof TONES; label: string; children: React.ReactNode }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: "easeOut" }} className={`rounded-xl border px-4 py-3 ${TONES[tone]}`}>
      <p className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
        <span className={`h-2 w-2 rounded-full ${DOT[tone]}`} />{label}
      </p>
      <div className="text-[15px]">{children}</div>
    </motion.div>
  );
}

function TrustMeter({ before, after }: { before: number; after: number }) {
  const d = after - before;
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-muted">
        <span>Trust in the AI</span>
        <span className="tabular-nums">{before} → <b className={d < 0 ? "text-bad" : d > 0 ? "text-truth" : "text-ink"}>{after}</b></span>
      </div>
      <div className="relative mt-1 h-2 rounded-full bg-white/80">
        <div className="absolute inset-y-0 left-0 rounded-full bg-ink/15" style={{ width: `${before}%` }} />
        <motion.div className="absolute inset-y-0 left-0 rounded-full bg-ink" initial={{ width: `${before}%` }} animate={{ width: `${after}%` }} transition={{ duration: 0.7, ease: "easeInOut" }} />
      </div>
    </div>
  );
}

function TrustSpark({ trials, upto }: { trials: (typeof sessions)[number]["trials"]; upto: number }) {
  const pts = useMemo(() => [trials[0].trustBefore, ...trials.map((t) => t.calibration.trustAfter)], [trials]);
  const W = 120, H = 24;
  const x = (i: number) => (i / (pts.length - 1)) * W;
  const y = (v: number) => H - (v / 100) * H;
  const d = pts.slice(0, upto + 1).map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  return (
    <span className="ml-auto flex items-center gap-2 text-muted">
      Trust
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible" aria-label={`Trust now ${pts[upto]}`}>
        <rect x={-3} y={-3} width={W + 6} height={H + 6} rx={4} fill="#efece5" />
        <line x1={0} x2={W} y1={y(50)} y2={y(50)} stroke="#d9d5cc" strokeDasharray="2 2" />
        <path d={d} fill="none" stroke="#16181d" strokeWidth={1.75} />
        <circle cx={x(upto)} cy={y(pts[upto])} r={3} fill="#16181d" />
      </svg>
      <b className="w-6 tabular-nums text-ink">{pts[upto]}</b>
    </span>
  );
}

function Ctl({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-label={label} title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card text-ink transition hover:border-faint">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
    </button>
  );
}
