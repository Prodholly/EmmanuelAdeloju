import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { itemById, items, sessions } from "../shared/data";
import { outcome } from "../shared/metrics";
import { ERROR_LABELS, OUTCOME_LABELS, PERSONA_COLORS } from "../shared/labels";
import { PERSONAS } from "../shared/simulation";
import { Comparison } from "../shared/ItemViews";

/** Worked example used to illustrate the three steps: item 1 (CO₂), a learner who gets swayed. */
const EX = itemById.get("co2-rate")!;
const EX_PATH = { initial: 2.2, conf1: 70, final: 4.5, conf2: 75, trustBefore: 70, trustAfter: 42 };

export function ThreeMoments() {
  const [active, setActive] = useState<number | null>(null);
  const steps = [
    {
      n: 1, role: "learner", title: "Reason alone",
      d: "The learner reads the chart and data table, commits to an answer, and rates how sure they are.",
      logs: ["initial answer", "confidence", "response time"],
      visual: <StepOneVisual />,
    },
    {
      n: 2, role: "ai", title: "The AI weighs in",
      d: "A simulated assistant gives a fluent, confident answer. On 5 of 8 items it is wrong. The learner keeps their answer or revises it.",
      logs: ["revised answer", "confidence", "trust before"],
      visual: <StepTwoVisual />,
    },
    {
      n: 3, role: "truth", title: "Ground truth",
      d: "The objective answer appears with its working. The learner explains the gap and sets their trust for the next item.",
      logs: ["outcome", "attribution", "trust after"],
      visual: <StepThreeVisual />,
    },
  ] as const;
  const accent = { learner: "bg-learner", ai: "bg-ai", truth: "bg-truth" } as const;
  const ring = { learner: "ring-learner/40", ai: "ring-ai/40", truth: "ring-truth/40" } as const;

  return (
    <div>
      <p className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted">
        <span className="rounded-full bg-ink px-2 py-0.5 text-xs font-semibold text-white">Worked example</span>
        Item 1, <i>{EX.title}</i>, followed through one learner's path.
      </p>
      <ol className="relative grid gap-4 md:grid-cols-3 md:gap-6">
        {steps.map((s, i) => (
          <motion.li key={s.n} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className={`card relative flex flex-col p-5 transition-shadow ${active === i ? `shadow-lg ring-2 ${ring[s.role]}` : "shadow-sm"}`}>
            {i < 2 && (
              <span aria-hidden className="absolute -right-[1.15rem] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper text-muted md:flex">→</span>
            )}
            <div className="flex items-center gap-3">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${accent[s.role]}`}>{s.n}</span>
              <h3 className="text-lg font-semibold">{s.title}</h3>
            </div>
            <div className="mt-4 rounded-xl border border-line bg-paper/70 p-3.5">{s.visual}</div>
            <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{s.d}</p>
            <div className="mt-4 border-t border-line pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-faint">Logged</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {s.logs.map((l) => <span key={l} className="rounded-md bg-wash px-2 py-0.5 font-mono text-[11px] text-muted">{l}</span>)}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function Spark() {
  const rows = EX.dataset.rows as { year: number; co2: number }[];
  const W = 220, H = 66;
  const x = (y: number) => ((y - 2000) / 20) * (W - 12) + 6;
  const y = (v: number) => H - 18 - ((v - 365) / 55) * (H - 26);
  const d = rows.map((r, i) => `${i ? "L" : "M"}${x(r.year)},${y(r.co2)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      <path d={d} fill="none" stroke="#3a3f4b" strokeWidth={2} />
      {rows.map((r) => <circle key={r.year} cx={x(r.year)} cy={y(r.co2)} r={3} fill="white" stroke="#3a3f4b" strokeWidth={1.5} />)}
      <text x={6} y={H - 1} fontSize={9} fill="#8a8d94">2000</text>
      <text x={W - 6} y={H - 1} fontSize={9} fill="#8a8d94" textAnchor="end">2020</text>
    </svg>
  );
}

function StepOneVisual() {
  return (
    <div className="space-y-2.5">
      <Spark />
      <div className="flex items-center justify-between rounded-lg border border-line bg-card px-3 py-2">
        <span className="text-lg font-semibold tabular-nums">{EX_PATH.initial}</span>
        <span className="text-xs text-muted">ppm/yr</span>
      </div>
      <div>
        <div className="flex justify-between text-[11px] text-muted"><span>How sure?</span><span className="font-semibold tabular-nums text-ink">{EX_PATH.conf1}%</span></div>
        <div className="mt-1 h-1.5 rounded-full bg-wash"><div className="h-full rounded-full bg-learner" style={{ width: `${EX_PATH.conf1}%` }} /></div>
      </div>
    </div>
  );
}

function StepTwoVisual() {
  return (
    <div className="space-y-2.5">
      <div className="rounded-lg border border-ai/25 bg-ai-wash p-2.5">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold"><span className="rounded bg-ai px-1 text-[9px] text-white">AI</span> Data Assistant <span className="ml-auto font-medium text-ai">high confidence</span></p>
        <p className="mt-1.5 text-xs leading-snug text-ink/80">"…an increase of roughly 44.5 ppm. Spread across the decade, that works out to about <b>4.5 ppm per year</b>."</p>
      </div>
      <div className="flex gap-1.5 text-[11px] font-semibold">
        <span className="flex-1 rounded-full border border-line bg-card py-1 text-center text-muted">Keep mine · 2.2</span>
        <span className="flex-1 rounded-full bg-ink py-1 text-center text-white">Use the AI's · 4.5</span>
      </div>
      <p className="text-[11px] text-muted">The learner switches, now {EX_PATH.conf2}% sure.</p>
    </div>
  );
}

function StepThreeVisual() {
  const o = OUTCOME_LABELS.swayed;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span>Truth <b className="text-truth">2.2 ppm/yr</b></span>
        <span className="rounded-full bg-bad-wash px-2 py-0.5 text-[11px] font-semibold text-bad">{o.label}</span>
      </div>
      <Comparison item={EX} legend={false} who="Learner" marks={{ initial: EX_PATH.initial, ai: EX.ai.answer, final: EX_PATH.final }} />
      <div>
        <div className="flex justify-between text-[11px] text-muted"><span>Trust for next item</span><span className="tabular-nums">{EX_PATH.trustBefore} → <b className="text-bad">{EX_PATH.trustAfter}</b></span></div>
        <div className="relative mt-1 h-1.5 rounded-full bg-wash">
          <div className="absolute inset-y-0 left-0 rounded-full bg-ink/15" style={{ width: `${EX_PATH.trustBefore}%` }} />
          <div className="absolute inset-y-0 left-0 rounded-full bg-ink" style={{ width: `${EX_PATH.trustAfter}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ---------------- error types & personas ---------------- */

export function ErrorTypes() {
  const rates = useMemo(() => {
    const m: Record<string, [number, number]> = {};
    for (const s of sessions) for (const t of s.trials) {
      const it = itemById.get(t.itemId)!;
      const o = outcome(it, t);
      if (o !== "swayed" && o !== "resisted") continue;
      const r = (m[it.id] ??= [0, 0]); r[1]++; if (o === "swayed") r[0]++;
    }
    return m;
  }, []);
  const wrong = items.map((it, i) => ({ it, i })).filter(({ it }) => it.ai.errorType !== "none");
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {wrong.map(({ it, i }) => {
        const [s, n] = rates[it.id] ?? [0, 0];
        const rate = n ? s / n : 0;
        return (
          <div key={it.id} className="card flex flex-col p-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ai-wash"><span className="h-2.5 w-2.5 rotate-45 bg-ai" /></span>
            <h4 className="mt-3 font-semibold leading-tight">{ERROR_LABELS[it.ai.errorType].label}</h4>
            <p className="mt-0.5 text-xs text-faint">Item {i + 1} · {it.title}</p>
            <p className="mt-2 flex-1 text-sm leading-snug text-muted">{it.ai.flaw ?? ERROR_LABELS[it.ai.errorType].blurb}</p>
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-muted"><span>Simulated sway rate</span><b className="tabular-nums text-ink">{Math.round(rate * 100)}%</b></div>
              <div className="mt-1 h-1.5 rounded-full bg-wash"><div className="h-full rounded-full bg-ai" style={{ width: `${rate * 100}%` }} /></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PersonaCards() {
  const params = [
    ["Solo skill", (p: (typeof PERSONAS)[number]) => p.skill],
    ["Starting trust", (p: (typeof PERSONAS)[number]) => p.trust0 / 100],
    ["Checks the AI", (p: (typeof PERSONAS)[number]) => p.verify],
    ["Trust learning rate", (p: (typeof PERSONAS)[number]) => p.learningRate],
  ] as const;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {PERSONAS.map((p) => (
        <div key={p.id} className="card relative overflow-hidden p-4">
          <span className="absolute inset-x-0 top-0 h-1" style={{ background: PERSONA_COLORS[p.id] }} />
          <h4 className="flex items-center gap-2 font-semibold"><span className="h-2.5 w-2.5 rounded-full" style={{ background: PERSONA_COLORS[p.id] }} />{p.label}</h4>
          <p className="mt-1 text-sm leading-snug text-muted">{p.blurb}</p>
          <dl className="mt-3 space-y-1.5">
            {params.map(([label, get]) => (
              <div key={label} className="grid grid-cols-[7.5rem_1fr] items-center gap-2 text-[11px]">
                <dt className="text-muted">{label}</dt>
                <dd className="h-1.5 rounded-full bg-wash" title={`${Math.round(get(p) * 100)}%`}>
                  <div className="h-full rounded-full bg-ink/70" style={{ width: `${get(p) * 100}%` }} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
