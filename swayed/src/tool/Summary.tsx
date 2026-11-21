import { useCallback, useMemo } from "react";
import * as Plot from "@observablehq/plot";
import { centroids, itemById, items, sessions } from "../shared/data";
import type { SessionLog } from "../shared/schema";
import { isCorrect, nearest, outcome, profile, weightOfAdvice } from "../shared/metrics";
import { ERROR_LABELS, OUTCOME_LABELS, PERSONA_COLORS } from "../shared/labels";
import { PERSONAS } from "../shared/simulation";
import { Comparison } from "../shared/ItemViews";
import { PlotFigure, dodge } from "../shared/PlotFigure";

export function Summary({ log, onRestart }: { log: SessionLog; onRestart: () => void }) {
  const t = log.trials;
  const rows = t.map((tr) => ({ tr, item: itemById.get(tr.itemId)! }));
  const initC = rows.filter((r) => isCorrect(r.item, r.tr.initial.answer)).length;
  const finalC = rows.filter((r) => isCorrect(r.item, r.tr.revised.answer)).length;
  const outcomes = rows.map((r) => outcome(r.item, r.tr));
  const swayChances = rows.filter((r) => r.item.ai.errorType !== "none" && isCorrect(r.item, r.tr.initial.answer)).length;
  const swayed = outcomes.filter((o) => o === "swayed").length;
  const helpChances = rows.filter((r) => r.item.ai.errorType === "none" && !isCorrect(r.item, r.tr.initial.answer)).length;
  const helped = outcomes.filter((o) => o === "helped").length;
  const woas = rows.map((r) => weightOfAdvice(r.item, r.tr)).filter((w): w is number => w !== undefined);
  const meanWoa = woas.length ? woas.reduce((a, b) => a + b, 0) / woas.length : undefined;
  const wrongItems = items.filter((i) => i.ai.errorType !== "none");

  const me = profile(items, t);
  const match = PERSONAS.find((p) => p.id === nearest(me, centroids))!;
  const trustStart = t[0]?.trustBefore ?? 50;
  const trustEnd = t[t.length - 1]?.calibration.trustAfter ?? trustStart;

  const download = () => {
    const blob = new Blob([JSON.stringify(log, null, 2)], { type: "application/json" });
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `swayed-session-${log.sessionId}.json` });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-faint">Your results</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight sm:text-5xl">How the AI moved your reasoning</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        The AI was deliberately wrong on <b className="text-ink">{wrongItems.length} of {items.length}</b> items.
        Here's what happened at each step.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Tile label="Correct on your own" value={`${initC}/${items.length}`} />
        <Tile label="Correct after the AI" value={`${finalC}/${items.length}`} delta={finalC - initC} />
        <Tile label="Swayed by a wrong AI" value={swayChances ? `${swayed}/${swayChances}` : "—"}
          hint="Items where you were right and the AI was wrong" bad={swayed > 0} />
        <Tile label="Helped by a right AI" value={helpChances ? `${helped}/${helpChances}` : "—"}
          hint="Items where you were wrong and the AI was right" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="card p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Your trust in the AI, item by item</h2>
          <p className="text-sm text-muted">
            From {trustStart} to {trustEnd}. Thin lines show the average simulated learner of each type. ◆ marks items where the AI was wrong.
          </p>
          <TrustChart log={log} />
        </section>
        <section className="card p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Your reliance pattern</h2>
          <p className="mt-1 text-sm text-muted">Closest simulated learner type:</p>
          <p className="mt-2 flex items-center gap-2 font-serif text-2xl font-semibold">
            <span className="h-3 w-3 rounded-full" style={{ background: PERSONA_COLORS[match.id] }} /> {match.label}
          </p>
          <p className="mt-1 text-sm text-muted">{match.blurb}</p>
          <div className="mt-5 space-y-3">
            <Bar label="Took the AI's answer when it was wrong" you={me.adoptWhenWrong} them={centroids[match.id].adoptWhenWrong} />
            <Bar label="Took the AI's answer when it was right" you={me.adoptWhenRight} them={centroids[match.id].adoptWhenRight} />
            <Bar label="Correct on your own" you={me.initialAccuracy} them={centroids[match.id].initialAccuracy} />
            <Bar label="Average trust" you={me.meanTrust} them={centroids[match.id].meanTrust} />
          </div>
          <p className="mt-4 text-xs text-faint">
            Dark bar: you. Outline: average {match.label} learner.
            {meanWoa !== undefined && <> On number questions you moved {Math.round(meanWoa * 100)}% of the way toward the AI's answer on average.</>}
          </p>
        </section>
      </div>

      <section className="mt-6 card p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Item by item</h2>
        <ul className="mt-4 divide-y divide-line">
          {rows.map(({ tr, item }, i) => {
            const o = OUTCOME_LABELS[outcomes[i]];
            const err = ERROR_LABELS[item.ai.errorType];
            return (
              <li key={item.id} className="grid gap-3 py-4 md:grid-cols-[14rem_1fr]">
                <div>
                  <p className="text-xs text-faint">Item {i + 1}</p>
                  <p className="font-semibold leading-snug">{item.title}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${o.tone === "good" ? "bg-truth-wash text-truth" : "bg-bad-wash text-bad"}`}>{o.label}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${item.ai.errorType === "none" ? "bg-wash text-muted" : "bg-ai-wash text-ai"}`}>
                      AI: {err.label}
                    </span>
                  </div>
                </div>
                <div>
                  <Comparison item={item} marks={{ initial: tr.initial.answer, ai: item.ai.answer, final: tr.revised.answer }} compact />
                  {item.ai.errorType !== "none" && <p className="mt-1.5 text-xs text-muted">{err.blurb}</p>}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          <span>○ you, first</span><span className="text-ai">◆ AI</span><span>● you, final</span><span className="text-truth">▮ truth (green band = counts as correct)</span>
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <button onClick={download} className="rounded-full bg-ink px-5 py-2.5 font-semibold text-white hover:bg-ink/90">Download my session log</button>
        <a href={import.meta.env.BASE_URL + "#explore"} className="rounded-full border border-ink px-5 py-2.5 font-semibold hover:bg-ink hover:text-white">
          Compare with {sessions.length} simulated sessions
        </a>
        <button onClick={onRestart} className="rounded-full px-5 py-2.5 font-semibold text-muted hover:text-ink">Start over</button>
      </div>
    </main>
  );
}

function Tile({ label, value, hint, delta, bad }: { label: string; value: string; hint?: string; delta?: number; bad?: boolean }) {
  return (
    <div className="card p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-1 font-serif text-3xl font-semibold tabular-nums ${bad ? "text-bad" : ""}`}>
        {value}
        {delta !== undefined && delta !== 0 && (
          <span className={`ml-2 align-middle font-sans text-sm font-semibold ${delta > 0 ? "text-truth" : "text-bad"}`}>{delta > 0 ? `+${delta}` : delta}</span>
        )}
      </p>
      {hint && <p className="mt-1 text-xs leading-snug text-faint">{hint}</p>}
    </div>
  );
}

function Bar({ label, you, them }: { label: string; you: number; them: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm"><span className="text-muted">{label}</span><span className="font-semibold tabular-nums">{Math.round(you * 100)}%</span></div>
      <div className="relative mt-1 h-2.5 rounded-full bg-wash">
        <div className="absolute inset-y-0 left-0 rounded-full bg-ink" style={{ width: `${you * 100}%` }} />
        <div className="absolute -top-1 h-4.5 w-1.5 rounded-sm border-2 border-ink bg-white" style={{ left: `calc(${them * 100}% - 3px)` }} title={`Persona average ${Math.round(them * 100)}%`} />
      </div>
    </div>
  );
}

function TrustChart({ log }: { log: SessionLog }) {
  const data = useMemo(() => {
    const series = (id: string, label: string, trials: SessionLog["trials"]) => [
      ...trials.map((t, i) => ({ id, label, x: i, trust: t.trustBefore })),
      { id, label, x: trials.length, trust: trials[trials.length - 1].calibration.trustAfter },
    ];
    const mine = series("you", "You", log.trials);
    const personas = PERSONAS.flatMap((p) => {
      const ss = sessions.filter((s) => s.persona === p.id);
      return Array.from({ length: items.length + 1 }, (_, x) => ({
        id: p.id, label: p.label, x,
        trust: ss.reduce((a, s) => a + (x < items.length ? s.trials[x].trustBefore : s.trials[x - 1].calibration.trustAfter), 0) / ss.length,
      }));
    });
    return { mine, personas };
  }, [log]);

  const make = useCallback(
    (w: number): Plot.PlotOptions => ({
      marginLeft: 36, marginRight: w < 520 ? 16 : 96, marginBottom: 36,
      x: { label: null, ticks: items.length + 1, tickFormat: (x: number) => (x === 0 ? "Start" : String(x)) },
      y: { domain: [0, 100], grid: true, label: "↑ Trust" },
      marks: [
        Plot.ruleX(items.map((it, i) => ({ x: i + 1, wrong: it.ai.errorType !== "none" })).filter((d) => d.wrong), { x: "x", stroke: "#efecfb", strokeWidth: 14 }),
        Plot.dot(items.map((it, i) => ({ x: i + 1, wrong: it.ai.errorType !== "none" })).filter((d) => d.wrong), { x: "x", y: 100, symbol: "diamond2", fill: "#6250d6", r: 4 }),
        Plot.line(data.personas, { x: "x", y: "trust", z: "id", stroke: (d) => PERSONA_COLORS[d.id], strokeWidth: 1.5, strokeOpacity: 0.8 }),
        ...(w < 520 ? [] : [Plot.text(dodge(data.personas.filter((d) => d.x === items.length), 7), { x: "x", y: "labelY", text: "label", dx: 8, textAnchor: "start", fill: "#5b5e66", fontSize: 11 })]),
        Plot.line(data.mine, { x: "x", y: "trust", stroke: "#eb6834", strokeWidth: 3 }),
        Plot.dot(data.mine, { x: "x", y: "trust", fill: "#eb6834", stroke: "white", strokeWidth: 2, r: 5 }),
        Plot.text(data.mine.slice(-1), { x: "x", y: "trust", text: () => "You", dx: 10, dy: -12, textAnchor: "start", fill: "#16181d", fontWeight: 700 }),
        Plot.tip([...data.mine, ...data.personas], Plot.pointer({ x: "x", y: "trust", title: (d) => `${d.label}: ${Math.round(d.trust)}` })),
      ],
    }),
    [data],
  );
  return (
    <>
      <PlotFigure make={make} height={280} className="mt-3" label="Trust in the AI across items, you versus simulated learner types" />
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <li className="flex items-center gap-1.5"><span className="h-1 w-4 rounded bg-learner" />You</li>
        {PERSONAS.map((p) => (
          <li key={p.id} className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded" style={{ background: PERSONA_COLORS[p.id] }} />{p.label}</li>
        ))}
      </ul>
    </>
  );
}
