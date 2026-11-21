import { useCallback, useMemo, useState } from "react";
import * as Plot from "@observablehq/plot";
import { itemById, items, scenario, sessions } from "../shared/data";
import type { SessionLog } from "../shared/schema";
import { isCorrect, outcome, trustUpdate, weightOfAdvice, type Outcome } from "../shared/metrics";
import { DOMAIN_LABELS, ERROR_LABELS, OUTCOME_LABELS, PERSONA_COLORS, formatAnswer } from "../shared/labels";
import { PERSONAS } from "../shared/simulation";
import { PlotFigure, dodge } from "../shared/PlotFigure";
import { ThreeMoments, ErrorTypes, PersonaCards } from "./Design";
import { Replay } from "./Replay";

const PLAY_URL = import.meta.env.BASE_URL + "play/";
const SITE_URL = "/EmmanuelAdeloju/";
const personaLabel = (id: string) => PERSONAS.find((p) => p.id === id)?.label ?? id;

type Row = { s: SessionLog; t: SessionLog["trials"][number]; item: (typeof items)[number]; o: Outcome; i: number };
const allRows: Row[] = sessions.flatMap((s) =>
  s.trials.map((t, i) => { const item = itemById.get(t.itemId)!; return { s, t, item, o: outcome(item, t), i }; }),
);

export function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <main className="mx-auto max-w-6xl space-y-20 px-4 pb-24 sm:px-6">
        <Design />
        <Metrics />
        <Explore />
        <ReplaySection />
        <ItemBank />
        <DataAndCite />
      </main>
      <footer className="border-t border-line py-8 text-center text-sm text-faint">
        © 2026 Emmanuel Adeloju · <a className="underline hover:text-ink" href={SITE_URL}>Back to main site</a>
      </footer>
    </div>
  );
}

/* ---------------- top ---------------- */

function Nav() {
  return (
    <nav className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="font-serif text-lg font-semibold">Swayed</a>
        <div className="flex items-center gap-1 text-sm">
          {[["#design", "Design"], ["#metrics", "Metrics"], ["#explore", "Explore"], ["#replay", "Replay"], ["#data", "Data"]].map(([h, l]) => (
            <a key={h} href={h} className="hidden rounded-full px-3 py-1.5 text-muted hover:bg-wash hover:text-ink sm:inline">{l}</a>
          ))}
          <a href={PLAY_URL} className="ml-1 rounded-full bg-ink px-4 py-1.5 font-semibold text-white hover:bg-ink/90">Try it</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const trials = allRows.length;
  return (
    <header id="top" className="mx-auto max-w-6xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20">
      <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-ai" /> Interactive simulation <span aria-hidden>·</span> Human–AI data sensemaking
      </p>
      <h1 className="mt-5 max-w-4xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
        Swayed: when AI helps or hurts data reasoning
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
        Learners read real science data, commit to an answer, see an AI assistant's answer (which is deliberately wrong on
        five of eight items), and then see the objective ground truth. The tool records where the AI pulls reasoning off course,
        where it helps, and how trust recalibrates afterwards.
      </p>
      <div className="mt-7 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-semibold text-white">EA</span>
        <div className="leading-tight">
          <p className="font-semibold">Emmanuel Adeloju</p>
          <p className="text-sm text-muted">Learning, Literacies &amp; Technologies · Arizona State University</p>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={PLAY_URL} className="rounded-full bg-ink px-6 py-3 font-semibold text-white shadow-sm hover:bg-ink/90">Try the tool →</a>
        <a href="#explore" className="rounded-full border border-ink px-6 py-3 font-semibold hover:bg-ink hover:text-white">Explore the data</a>
      </div>
      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
        {[
          [String(items.length), "data tasks across four sciences"],
          [String(items.filter((i) => i.ai.errorType !== "none").length), "deliberate AI errors, each a different kind"],
          ["3", "decisions per task: alone, with AI, after truth"],
          [trials.toLocaleString(), "simulated trials to explore"],
        ].map(([v, l]) => (
          <div key={l} className="bg-card px-5 py-4">
            <dt className="sr-only">{l}</dt>
            <dd className="font-serif text-3xl font-semibold tabular-nums">{v}</dd>
            <dd className="mt-0.5 text-sm leading-snug text-muted">{l}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex gap-3 rounded-2xl border border-learner/30 bg-learner-wash p-4 text-sm leading-relaxed sm:items-center">
        <span className="mt-0.5 shrink-0 rounded-md bg-learner px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white sm:mt-0">Simulated</span>
        <p>
          The {sessions.length} sessions ({trials.toLocaleString()} trials) on this page come from a seeded simulation of four learner types.
          They show the study design and analysis. <b>They are not data from human participants.</b> The AI is not live either:
          every answer it gives was written in advance.
        </p>
      </div>
    </header>
  );
}

function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-faint">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {intro && <div className="mt-3 max-w-3xl text-[17px] leading-relaxed text-muted">{intro}</div>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

/* ---------------- design ---------------- */

function Design() {
  return (
    <Section id="design" eyebrow="Study design" title="Three moments on every item"
      intro={<>The design adapts the judge–advisor paradigm from advice-taking research. Every answer is checked against a ground truth that follows from the data, so the AI's influence can be measured directly instead of judged by opinion.</>}>
      <ThreeMoments />
      <div className="mt-14">
        <h3 className="text-xl font-semibold">Five ways the AI is wrong</h3>
        <p className="mt-1 max-w-3xl text-[15px] text-muted">Each wrong item contains one well-known reasoning error, delivered in the same fluent, confident voice as the AI's correct answers.</p>
        <div className="mt-5"><ErrorTypes /></div>
      </div>
      <div className="mt-14">
        <h3 className="text-xl font-semibold">Four simulated learner types</h3>
        <p className="mt-1 max-w-3xl text-[15px] text-muted">Loosely inspired by reliance personas in human–AI programming research. Each type is defined by four parameters, and the simulator draws 40 sessions from each.</p>
        <div className="mt-5"><PersonaCards /></div>
      </div>
    </Section>
  );
}

/* ---------------- metrics ---------------- */

function Metrics() {
  const grid: [Outcome, Outcome][] = [["resisted", "confirmed"], ["swayed", "talked-out"], ["self-corrected", "helped"], ["misled-or-stuck", "missed-help"]];
  const rowLabels = ["Right → right", "Right → wrong", "Wrong → right", "Wrong → wrong"];
  return (
    <Section id="metrics" eyebrow="Key metrics explained" title="What counts as being swayed"
      intro="Each trial lands in one of eight outcomes. Two things decide which one: whether the AI was right, and how the learner's answer changed between step 1 and step 2.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="card overflow-x-auto p-2 sm:p-4">
          <table className="w-full min-w-[30rem] text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-3 py-2 font-medium text-faint">Learner: first → final</th>
                <th className="px-3 py-2"><span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rotate-45 bg-ai" /> AI wrong</span></th>
                <th className="px-3 py-2">AI right</th>
              </tr>
            </thead>
            <tbody>
              {grid.map((pair, r) => (
                <tr key={r} className="border-t border-line align-top">
                  <td className="px-3 py-3 font-mono text-xs text-muted whitespace-nowrap">{rowLabels[r]}</td>
                  {pair.map((o) => (
                    <td key={o} className="px-3 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${OUTCOME_LABELS[o].tone === "good" ? "bg-truth-wash text-truth" : "bg-bad-wash text-bad"}`}>{OUTCOME_LABELS[o].label}</span>
                      <p className="mt-1.5 leading-snug text-muted">{OUTCOME_LABELS[o].sentence.replace(/\byou\b/gi, "the learner").replace(/\byour\b/gi, "their")}</p>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <dl className="grid gap-3">
          {[
            ["Sway rate", "Of trials where the learner was right on their own and the AI was wrong, the share that ended wrong."],
            ["Help rate", "Of trials where the learner was wrong on their own and the AI was right, the share that ended right."],
            ["Weight of Advice", "For number questions: how far the answer moved toward the AI's, from 0 (ignored it) to 1 (fully adopted it)."],
            ["Appropriate trust update", "After the ground truth is shown, trust falls if the AI was wrong and does not fall if it was right."],
          ].map(([t, d]) => (
            <div key={t} className="card p-4">
              <dt className="font-semibold">{t}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

/* ---------------- explorer ---------------- */

const pct = (a: number, b: number) => (b ? `${Math.round((a / b) * 100)}%` : "—");

function Explore() {
  const [persona, setPersona] = useState<string>("all");
  const rows = useMemo(() => (persona === "all" ? allRows : allRows.filter((r) => r.s.persona === persona)), [persona]);

  const swayed = rows.filter((r) => r.o === "swayed").length;
  const resisted = rows.filter((r) => r.o === "resisted").length;
  const helped = rows.filter((r) => r.o === "helped").length;
  const missed = rows.filter((r) => r.o === "missed-help").length;
  const woas = rows.map((r) => weightOfAdvice(r.item, r.t)).filter((w): w is number => w !== undefined);
  const woaWrong = rows.filter((r) => r.item.ai.errorType !== "none").map((r) => weightOfAdvice(r.item, r.t)).filter((w): w is number => w !== undefined);
  const appropriate = rows.filter((r) => trustUpdate(r.item, r.t).appropriate).length;
  const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

  return (
    <Section id="explore" eyebrow="Interactive research data" title="Explore the simulated outcomes"
      intro={<>Filter by learner type to see how reliance changes the AI's effect. Hover any mark for exact values. Every number is computed in your browser from the session logs you can download below.</>}>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by learner type">
        {[{ id: "all", label: "All learners" }, ...PERSONAS].map((p) => (
          <button key={p.id} onClick={() => setPersona(p.id)} aria-pressed={persona === p.id}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
              persona === p.id ? "border-ink bg-ink text-white" : "border-line bg-card text-muted hover:border-faint"}`}>
            {p.id !== "all" && <span className="h-2.5 w-2.5 rounded-full" style={{ background: PERSONA_COLORS[p.id] }} />}
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Sway rate" value={pct(swayed, swayed + resisted)} sub={`${swayed} of ${swayed + resisted} right-then-wrong-AI trials`} tone="bad" />
        <Stat label="Help rate" value={pct(helped, helped + missed)} sub={`${helped} of ${helped + missed} wrong-then-right-AI trials`} tone="good" />
        <Stat label="Weight of Advice" value={mean(woas).toFixed(2)} sub={`${mean(woaWrong).toFixed(2)} when the AI was wrong`} />
        <Stat label="Appropriate trust updates" value={pct(appropriate, rows.length)} sub={`${rows.length.toLocaleString()} trials`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Did seeing the AI make learners more or less accurate?"
          sub="Each row is one task. The hollow dot shows the share of learners who got it right on their own (step 1). The filled dot shows the share who got it right after seeing the AI's answer (step 2). The arrow between them is the AI's effect: an arrow pointing left means accuracy fell, and one pointing right means it rose. Hover a row for the counts.">
          <ItemEffectChart rows={rows} />
        </ChartCard>
        <ChartCard title="Which AI errors sway learners most" sub="Sway rate by error type: the share of initially correct learners who switched to a wrong answer.">
          <ErrorChart rows={rows} />
        </ChartCard>
        <ChartCard title="Trust across the session" sub="Mean trust in the AI before each item, by learner type. Shaded columns mark items where the AI was wrong.">
          <TrustChart persona={persona} />
        </ChartCard>
        <ChartCard title="How far learners move toward the AI" sub="Weight of Advice on number questions, one dot per trial. 0 = kept their own answer, 1 = took the AI's. The tick marks the mean.">
          <WoaChart persona={persona} />
        </ChartCard>
      </div>
    </Section>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub: string; tone?: "good" | "bad" }) {
  return (
    <div className="card p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-1 font-serif text-4xl font-semibold tabular-nums ${tone === "bad" ? "text-bad" : tone === "good" ? "text-truth" : ""}`}>{value}</p>
      <p className="mt-1 text-xs leading-snug text-faint">{sub}</p>
    </div>
  );
}

function ChartCard({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <figure className="card p-5 sm:p-6">
      <figcaption>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm leading-snug text-muted">{sub}</p>
      </figcaption>
      <div className="mt-4">{children}</div>
    </figure>
  );
}

function ItemEffectChart({ rows }: { rows: Row[] }) {
  const data = useMemo(() => items.map((item, idx) => {
    const rs = rows.filter((r) => r.item.id === item.id);
    const n = rs.length;
    const alone = rs.filter((r) => isCorrect(item, r.t.initial.answer)).length;
    const final = rs.filter((r) => isCorrect(item, r.t.revised.answer)).length;
    const rightToWrong = rs.filter((r) => isCorrect(item, r.t.initial.answer) && !isCorrect(item, r.t.revised.answer)).length;
    const wrongToRight = rs.filter((r) => !isCorrect(item, r.t.initial.answer) && isCorrect(item, r.t.revised.answer)).length;
    const before = n ? alone / n : 0, after = n ? final / n : 0;
    return {
      label: `${idx + 1}. ${item.title}`, item, wrong: item.ai.errorType !== "none",
      n, alone, final, rightToWrong, wrongToRight, before, after, delta: Math.round((after - before) * 100),
    };
  }), [rows]);

  const avg = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : 0);
  const fellWhenWrong = avg(data.filter((d) => d.wrong).map((d) => d.delta));
  const roseWhenRight = avg(data.filter((d) => !d.wrong).map((d) => d.delta));
  const pts = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : "±"}${Math.abs(v)} pts`;

  const tipText = (d: (typeof data)[number]) => [
    d.label,
    d.wrong
      ? `AI was WRONG: ${ERROR_LABELS[d.item.ai.errorType].label}. It answered "${formatAnswer(d.item, d.item.ai.answer)}".`
      : `AI was RIGHT. It answered "${formatAnswer(d.item, d.item.ai.answer)}".`,
    `Correct answer: ${formatAnswer(d.item, d.item.groundTruth.answer)}`,
    "",
    `On their own: ${d.alone} of ${d.n} learners correct (${Math.round(d.before * 100)}%)`,
    `After seeing the AI: ${d.final} of ${d.n} correct (${Math.round(d.after * 100)}%)`,
    `Change: ${pts(d.delta)} (percentage points)`,
    "",
    `${d.rightToWrong} learner${d.rightToWrong === 1 ? "" : "s"} went from right to wrong`,
    `${d.wrongToRight} learner${d.wrongToRight === 1 ? "" : "s"} went from wrong to right`,
  ].join("\n");

  const make = useCallback((w: number): Plot.PlotOptions => ({
    marginLeft: Math.min(210, w * 0.4), marginRight: 70, marginTop: 8, marginBottom: 40,
    x: { domain: [0, 1], tickFormat: "%", grid: true, label: "Share of learners with the correct answer →", labelAnchor: "right", labelOffset: 34 },
    y: { domain: data.map((d) => d.label), label: null, tickFormat: (l: string) => (w < 460 ? l.slice(0, 22) + (l.length > 22 ? "…" : "") : l) },
    marks: [
      Plot.arrow(data, { x1: "before", x2: "after", y: "label", stroke: (d) => (d.delta < 0 ? "#c03a39" : "#0f7a3d"), strokeWidth: 2, headLength: 7, inset: 7 }),
      Plot.dot(data, { x: "before", y: "label", r: 5.5, stroke: "#eb6834", strokeWidth: 2.5, fill: "white" }),
      Plot.dot(data, { x: "after", y: "label", r: 5, fill: "#eb6834", stroke: "white", strokeWidth: 2 }),
      Plot.dot(data.filter((d) => d.wrong), { x: 1, y: "label", symbol: "diamond2", fill: "#6250d6", r: 4, dx: 12 }),
      Plot.text(data, { x: 1, y: "label", text: (d) => pts(d.delta), dx: 22, textAnchor: "start", fill: "#16181d", fontWeight: 600, fontSize: 11 }),
      Plot.tip(data, Plot.pointerY({ x: "after", y: "label", title: tipText, maxRadius: 60 })),
    ],
  }), [data]);

  return (
    <>
      <ul className="-mt-1 mb-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
        <li className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full border-2 border-learner bg-white" />Correct on their own</li>
        <li className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-learner" />Correct after seeing the AI</li>
        <li className="flex items-center gap-1.5"><span className="font-bold text-bad">←</span>Accuracy fell</li>
        <li className="flex items-center gap-1.5"><span className="font-bold text-truth">→</span>Accuracy rose</li>
        <li className="flex items-center gap-1.5"><span className="h-2 w-2 rotate-45 bg-ai" />The AI gave a wrong answer on this task</li>
      </ul>
      <PlotFigure make={make} height={320} label="Share of learners correct on their own and after seeing the AI, per task" />
      <p className="mt-3 rounded-lg bg-wash px-3 py-2 text-sm leading-snug">
        <b>Reading it:</b> when the AI was wrong (◆), accuracy changed by <b className="text-bad">{pts(fellWhenWrong)}</b> on average.
        When it was right, accuracy changed by <b className="text-truth">{pts(roseWhenRight)}</b>. The number on the right of each row is that task's change.
      </p>
    </>
  );
}

function ErrorChart({ rows }: { rows: Row[] }) {
  const data = useMemo(() => {
    const types = [...new Set(items.filter((i) => i.ai.errorType !== "none").map((i) => i.ai.errorType))];
    return types.map((e) => {
      const rs = rows.filter((r) => r.item.ai.errorType === e && (r.o === "swayed" || r.o === "resisted"));
      const s = rs.filter((r) => r.o === "swayed").length;
      return { label: ERROR_LABELS[e].label, rate: rs.length ? s / rs.length : 0, n: rs.length, s };
    }).sort((a, b) => b.rate - a.rate);
  }, [rows]);
  const make = useCallback((): Plot.PlotOptions => ({
    marginLeft: 130, marginRight: 44, marginTop: 8,
    x: { domain: [0, 1], tickFormat: "%", grid: true, label: "Sway rate →", labelAnchor: "right" },
    y: { domain: data.map((d) => d.label), label: null, padding: 0.35 },
    marks: [
      Plot.barX(data, { x: "rate", y: "label", fill: "#6250d6", rx: 4 }),
      Plot.text(data, { x: "rate", y: "label", text: (d) => `${Math.round(d.rate * 100)}%`, dx: 6, textAnchor: "start", fill: "#16181d", fontWeight: 600 }),
      Plot.ruleX([0], { stroke: "#c9c5bc" }),
      Plot.tip(data, Plot.pointerY({ x: "rate", y: "label", title: (d) => `${d.label}\n${d.s} of ${d.n} swayed` })),
    ],
  }), [data]);
  return <PlotFigure make={make} height={260} label="Sway rate by AI error type" />;
}

function TrustChart({ persona }: { persona: string }) {
  const data = useMemo(() => PERSONAS.flatMap((p) => {
    const ss = sessions.filter((s) => s.persona === p.id);
    return Array.from({ length: items.length + 1 }, (_, x) => ({
      id: p.id, label: p.label, x,
      trust: ss.reduce((a, s) => a + (x < items.length ? s.trials[x].trustBefore : s.trials[x - 1].calibration.trustAfter), 0) / ss.length,
    }));
  }), []);
  const make = useCallback((w: number): Plot.PlotOptions => {
    const wrongCols = items.map((it, i) => ({ x: i + 1, wrong: it.ai.errorType !== "none" })).filter((d) => d.wrong);
    const op = (id: string) => (persona === "all" || persona === id ? 1 : 0.18);
    return {
      marginLeft: 36, marginRight: w < 480 ? 12 : 92, marginBottom: 34,
      x: { label: null, ticks: items.length + 1, tickFormat: (x: number) => (x === 0 ? "Start" : `#${x}`) },
      y: { domain: [0, 100], grid: true, label: "↑ Trust" },
      marks: [
        Plot.ruleX(wrongCols, { x: "x", stroke: "#efecfb", strokeWidth: Math.max(8, w / 30) }),
        Plot.line(data, { x: "x", y: "trust", z: "id", stroke: (d) => PERSONA_COLORS[d.id], strokeWidth: 2.5, strokeOpacity: (d) => op(d.id) }),
        Plot.dot(data, { x: "x", y: "trust", fill: (d) => PERSONA_COLORS[d.id], stroke: "white", strokeWidth: 1.5, r: 3.5, fillOpacity: (d) => op(d.id), strokeOpacity: (d) => op(d.id) }),
        ...(w < 480 ? [] : [Plot.text(dodge(data.filter((d) => d.x === items.length), 7), { x: "x", y: "labelY", text: "label", dx: 8, textAnchor: "start", fill: "#5b5e66", fontSize: 11, fillOpacity: (d) => op(d.id) })]),
        Plot.tip(data, Plot.pointer({ x: "x", y: "trust", title: (d) => `${d.label}\n${d.x === 0 ? "Start" : `Before item ${d.x + 1 > items.length ? "end" : d.x + 1}`}: ${Math.round(d.trust)}` })),
      ],
    };
  }, [data, persona]);
  return (
    <>
      <PlotFigure make={make} height={280} label="Mean trust across items by learner type" />
      <Legend />
    </>
  );
}

function Legend() {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
      {PERSONAS.map((p) => (
        <li key={p.id} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full" style={{ background: PERSONA_COLORS[p.id] }} />{p.label}</li>
      ))}
    </ul>
  );
}

function WoaChart({ persona }: { persona: string }) {
  const data = useMemo(() => allRows
    .filter((r) => persona === "all" || r.s.persona === persona)
    .map((r, k) => ({ persona: personaLabel(r.s.persona), id: r.s.persona, woa: weightOfAdvice(r.item, r.t), wrong: r.item.ai.errorType !== "none", jitter: ((k * 9301 + 49297) % 233280) / 233280 }))
    .filter((d): d is typeof d & { woa: number } => d.woa !== undefined), [persona]);
  const make = useCallback((): Plot.PlotOptions => ({
    marginLeft: 110, marginTop: 8, marginBottom: 36,
    x: { domain: [0, 1], grid: true, label: "Weight of Advice →", labelAnchor: "right" },
    y: { domain: [0, 1], axis: null },
    fy: { domain: PERSONAS.map((p) => p.label).filter((l) => persona === "all" || l === personaLabel(persona)), label: null, padding: 0.12 },
    marks: [
      Plot.frame({ stroke: "#efece5", anchor: "bottom" }),
      Plot.dot(data, { x: "woa", y: (d) => 0.15 + d.jitter * 0.7, fy: "persona", r: 3, fill: (d) => PERSONA_COLORS[d.id], fillOpacity: 0.45 }),
      Plot.tickX(data, Plot.groupZ({ x: "mean" }, { x: "woa", fy: "persona", stroke: "#16181d", strokeWidth: 2.5 })),
      Plot.tip(data, Plot.pointer({ x: "woa", y: (d) => 0.15 + d.jitter * 0.7, fy: "persona", title: (d) => `${d.persona}\nWOA ${d.woa.toFixed(2)}\nAI ${d.wrong ? "wrong" : "right"}` })),
    ],
  }), [data, persona]);
  return <PlotFigure make={make} height={persona === "all" ? 280 : 130} label="Weight of Advice distribution by learner type" />;
}

/* ---------------- replay ---------------- */

function ReplaySection() {
  return (
    <Section id="replay" eyebrow="Single sessions" title="Replay a simulated session"
      intro="Pick a learner type and press play to watch one session unfold: what the learner answered alone, what the AI said, what they changed, and how the truth shifted their trust. Step through it at your own pace, or click any point on the timeline.">
      <Replay />
    </Section>
  );
}

/* ---------------- item bank ---------------- */

function ItemBank() {
  return (
    <Section id="items" eyebrow="Materials" title="The item bank"
      intro={<>Five items adapted from public science datasets and three illustrative datasets built for teaching. Each has a ground truth that can be computed from the data. Item definitions are open: <code className="rounded bg-wash px-1.5 py-0.5 text-sm">{scenario.id}.json</code>.</>}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <article key={item.id} className="card flex flex-col p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-faint">#{i + 1} · {DOMAIN_LABELS[item.domain]}</p>
            <h3 className="mt-1 font-semibold leading-snug">{item.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-snug text-muted">{item.question.prompt}</p>
            <details className="group mt-4 rounded-lg bg-wash px-3 py-2 text-sm">
              <summary className="cursor-pointer list-none font-medium text-muted group-open:mb-2">
                <span className="inline-block transition-transform group-open:rotate-90">›</span> AI vs. truth
              </summary>
              <p><span className="font-semibold text-ai">AI:</span> {formatAnswer(item, item.ai.answer)}</p>
              <p className="mt-1"><span className="font-semibold text-truth">Truth:</span> {formatAnswer(item, item.groundTruth.answer)}</p>
              <p className="mt-2 text-xs text-muted">{item.ai.errorType === "none" ? "The AI is correct here." : `Error: ${ERROR_LABELS[item.ai.errorType].label}`}</p>
            </details>
            <p className="mt-3 text-[11px] leading-snug text-faint">{item.dataset.source}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- data & cite ---------------- */

const BIBTEX = `@misc{adeloju2026swayed,
  title        = {Swayed: An Interactive Simulation of How AI Answers Sway Data Reasoning},
  author       = {Adeloju, Emmanuel},
  year         = {2026},
  howpublished = {\\url{https://prodholly.github.io/EmmanuelAdeloju/tools/swayed/}},
  note         = {Interactive tool with simulated session data}
}`;

function save(name: string, text: string, type: string) {
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([text], { type })), download: name });
  a.click();
  URL.revokeObjectURL(a.href);
}

function toCsv() {
  const head = ["session_id", "persona", "trial", "item_id", "ai_error_type", "ai_answer", "truth", "initial_answer", "initial_confidence", "initial_correct",
    "revised_answer", "revised_confidence", "revised_correct", "outcome", "weight_of_advice", "trust_before", "trust_after", "attribution"];
  const lines = allRows.map(({ s, t, item, o, i }) => [
    s.sessionId, s.persona, i + 1, item.id, item.ai.errorType, item.ai.answer, item.groundTruth.answer,
    t.initial.answer, t.initial.confidence, isCorrect(item, t.initial.answer),
    t.revised.answer, t.revised.confidence, isCorrect(item, t.revised.answer),
    o, weightOfAdvice(item, t)?.toFixed(3) ?? "", t.trustBefore, t.calibration.trustAfter, t.calibration.attribution,
  ].join(","));
  return [head.join(","), ...lines].join("\n");
}

function DataAndCite() {
  const [copied, setCopied] = useState(false);
  return (
    <Section id="data" eyebrow="Explore the data" title="Download and cite"
      intro="The simulated sessions are generated with a fixed seed, so every build produces the same data. Use them to try out analyses before collecting human data.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card min-w-0 p-6">
          <h3 className="font-semibold">Simulated dataset</h3>
          <p className="mt-1 text-sm text-muted">{sessions.length} sessions · {allRows.length.toLocaleString()} trials · 4 learner types · seed 20261120</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={() => save("swayed-trials.csv", toCsv(), "text/csv")} className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink/90">Trials (CSV)</button>
            <button onClick={() => save("swayed-sessions.json", JSON.stringify({ simulated: true, seed: 20261120, sessions }, null, 2), "application/json")}
              className="rounded-full border border-ink px-5 py-2.5 text-sm font-semibold hover:bg-ink hover:text-white">Sessions (JSON)</button>
            <button onClick={() => save("swayed-items.json", JSON.stringify(scenario, null, 2), "application/json")}
              className="rounded-full border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-faint">Item bank (JSON)</button>
          </div>
        </div>
        <div className="card min-w-0 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Cite</h3>
            <button onClick={() => navigator.clipboard.writeText(BIBTEX).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); })}
              className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted hover:border-faint">{copied ? "Copied ✓" : "Copy BibTeX"}</button>
          </div>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-wash p-3 text-xs leading-relaxed text-muted">{BIBTEX}</pre>
        </div>
      </div>
    </Section>
  );
}
