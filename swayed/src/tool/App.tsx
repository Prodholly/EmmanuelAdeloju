import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { items } from "../shared/data";
import type { Answer, Item, TrialLog, SessionLog } from "../shared/schema";
import { isCorrect } from "../shared/metrics";
import { ATTRIBUTIONS, DOMAIN_LABELS, ERROR_LABELS, OUTCOME_LABELS, formatAnswer } from "../shared/labels";
import { outcome } from "../shared/metrics";
import { Comparison, DataChart, DataTable } from "../shared/ItemViews";
import { Summary } from "./Summary";

type Step = 1 | 2 | 3;
type Draft = {
  initial?: { answer: Answer; confidence: number; rtMs: number };
  revised?: { answer: Answer; confidence: number; rtMs: number };
};

const STUDY_URL = import.meta.env.BASE_URL;

/* In-progress sessions are kept in this browser only, so a refresh doesn't lose work. */
const KEY = "swayed-progress-v1";
type Saved = { trust0: number; trials: TrialLog[]; session: { id: string; startedAt: string } };
function loadSaved(): Saved | null {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return v && Array.isArray(v.trials) && v.trials.length > 0 && v.trials.length < items.length ? v : null;
  } catch { return null; }
}
function store(v: Saved | null) {
  try { if (v) localStorage.setItem(KEY, JSON.stringify(v)); else localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
}

export function App() {
  const [phase, setPhase] = useState<"intro" | "trial" | "summary">("intro");
  const [trust0, setTrust0] = useState(50);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<Draft>({});
  const [trials, setTrials] = useState<TrialLog[]>([]);
  const [session, setSession] = useState(() => ({ id: `H-${Date.now().toString(36)}`, startedAt: new Date().toISOString() }));
  const [saved, setSaved] = useState(loadSaved);
  const [stepStart, setStepStart] = useState(() => performance.now());

  const item = items[index];
  const trustBefore = index === 0 ? trust0 : trials[index - 1].calibration.trustAfter;

  useEffect(() => {
    setStepStart(performance.now());
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index, step, phase]);

  useEffect(() => {
    if (phase === "trial" && trials.length) store({ trust0, trials, session });
    if (phase === "summary") { store(null); setSaved(null); }
  }, [phase, trials, trust0, session]);

  const log: SessionLog = { sessionId: session.id, scenarioId: "core", persona: "human", startedAt: session.startedAt, trials };

  if (phase === "intro")
    return (
      <Intro trust={trust0} setTrust={setTrust0} saved={saved}
        onStart={() => { store(null); setSaved(null); setPhase("trial"); }}
        onResume={(v) => { setTrust0(v.trust0); setTrials(v.trials); setSession(v.session); setIndex(v.trials.length); setStep(1); setDraft({}); setPhase("trial"); }} />
    );
  if (phase === "summary")
    return (
      <Summary
        log={log}
        onRestart={() => {
          setTrials([]); setIndex(0); setStep(1); setDraft({}); setPhase("intro");
        }}
      />
    );

  const elapsed = () => Math.round(performance.now() - stepStart);

  return (
    <div className="min-h-screen">
      <Header index={index} step={step} />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <section className="card p-5 sm:p-6 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-faint">
            <span>{DOMAIN_LABELS[item.domain]}</span>
            <span aria-hidden>·</span>
            <span>Item {index + 1} of {items.length}</span>
          </div>
          <h1 className="mt-1.5 font-serif text-2xl font-semibold leading-tight sm:text-[1.7rem]">{item.title}</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.context}</p>
          <div className="mt-4"><DataChart item={item} /></div>
          <DataTable item={item} />
        </section>

        <section aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-${step}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {step === 1 && (
                <StepOne
                  item={item}
                  onSubmit={(answer, confidence) => {
                    setDraft({ initial: { answer, confidence, rtMs: elapsed() } });
                    setStep(2);
                  }}
                />
              )}
              {step === 2 && draft.initial && (
                <StepTwo
                  item={item}
                  initial={draft.initial}
                  onSubmit={(answer, confidence) => {
                    setDraft((d) => ({ ...d, revised: { answer, confidence, rtMs: elapsed() } }));
                    setStep(3);
                  }}
                />
              )}
              {step === 3 && draft.initial && draft.revised && (
                <StepThree
                  item={item}
                  initial={draft.initial.answer}
                  final={draft.revised.answer}
                  trustBefore={trustBefore}
                  last={index === items.length - 1}
                  onSubmit={(calibration) => {
                    const t: TrialLog = { itemId: item.id, initial: draft.initial!, trustBefore, revised: draft.revised!, calibration };
                    setTrials((ts) => [...ts, t]);
                    setDraft({});
                    if (index === items.length - 1) setPhase("summary");
                    else { setIndex(index + 1); setStep(1); }
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}

/* ---------------- chrome ---------------- */

function Header({ index, step }: { index: number; step: Step }) {
  const steps = ["Your read", "AI's read", "Ground truth"];
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <a href={STUDY_URL} className="font-serif text-lg font-semibold">Swayed</a>
        <ol className="flex items-center gap-1.5 text-xs sm:text-sm">
          {steps.map((s, i) => {
            const n = (i + 1) as Step;
            const state = n < step ? "done" : n === step ? "now" : "next";
            return (
              <li key={s} className="flex items-center gap-1.5">
                <span className={`flex h-6 items-center gap-1.5 rounded-full px-2.5 font-medium ${
                  state === "now" ? "bg-ink text-white" : state === "done" ? "bg-wash text-ink" : "text-faint"}`}>
                  <span className="tabular-nums">{n}</span>
                  <span className="hidden sm:inline">{s}</span>
                </span>
                {i < 2 && <span className="text-faint" aria-hidden>→</span>}
              </li>
            );
          })}
        </ol>
        <div className="flex w-full gap-1 sm:w-48" aria-label={`Item ${index + 1} of ${items.length}`}>
          {items.map((_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full ${i < index ? "bg-ink" : i === index ? "bg-ink/40" : "bg-line"}`} />
          ))}
        </div>
      </div>
    </header>
  );
}

function Intro({ trust, setTrust, onStart, saved, onResume }: {
  trust: number; setTrust: (n: number) => void; onStart: () => void; saved: Saved | null; onResume: (v: Saved) => void;
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20">
      <a href={STUDY_URL} className="text-sm font-medium text-muted hover:text-ink">← About the study</a>
      <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight sm:text-5xl">Read the data. Weigh the AI. Face the truth.</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        You'll work through {items.length} short data tasks from climate science, health, ecology and physics.
        On each one, you answer on your own first. Then an AI assistant gives its answer, and you can change yours.
        Finally, you see the correct answer.
      </p>
      <ol className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          ["1", "Your read", "Answer from the chart and data alone, and say how sure you are."],
          ["2", "AI's read", "See what the AI concludes. Keep your answer or change it."],
          ["3", "Ground truth", "See the correct answer, reflect on what happened, and adjust your trust."],
        ].map(([n, t, d]) => (
          <li key={n} className="card p-4">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">{n}</span>
            <h2 className="mt-3 font-semibold">{t}</h2>
            <p className="mt-1 text-sm leading-snug text-muted">{d}</p>
          </li>
        ))}
      </ol>
      <div className="card mt-8 p-5">
        <label htmlFor="trust0" className="font-semibold">Before you start: how much do you trust AI assistants to read data correctly?</label>
        <TrustSlider id="trust0" value={trust} onChange={setTrust} />
      </div>
      <p className="mt-5 text-sm text-faint">
        About 8 minutes. Nothing you enter leaves your browser. The AI here is simulated, and its answers were written in advance.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {saved && (
          <button onClick={() => onResume(saved)} className="rounded-full bg-ink px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-ink/90">
            Resume at item {saved.trials.length + 1} of {items.length} →
          </button>
        )}
        <button onClick={onStart}
          className={saved ? "rounded-full border border-ink px-6 py-3 font-semibold transition hover:bg-ink hover:text-white"
            : "rounded-full bg-ink px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2"}>
          {saved ? "Start over" : "Start the first task →"}
        </button>
      </div>
    </main>
  );
}

/* ---------------- step 1 ---------------- */

function StepOne({ item, onSubmit }: { item: Item; onSubmit: (a: Answer, c: number) => void }) {
  const [answer, setAnswer] = useState<Answer | undefined>();
  const [conf, setConf] = useState(50);
  return (
    <Panel eyebrow="Step 1 · On your own" title={item.question.prompt}>
      <AnswerInput item={item} value={answer} onChange={setAnswer} />
      <Confidence value={conf} onChange={setConf} />
      <PrimaryButton disabled={answer === undefined} onClick={() => onSubmit(answer!, conf)}>Lock in my answer</PrimaryButton>
    </Panel>
  );
}

/* ---------------- step 2 ---------------- */

function StepTwo({ item, initial, onSubmit }: { item: Item; initial: { answer: Answer; confidence: number }; onSubmit: (a: Answer, c: number) => void }) {
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState<Answer>(initial.answer);
  const [conf, setConf] = useState(initial.confidence);
  return (
    <Panel eyebrow="Step 2 · The AI weighs in" title={item.question.prompt}>
      <div className="flex items-center gap-2 rounded-xl border border-learner/30 bg-learner-wash px-3.5 py-2.5 text-sm">
        <span className="h-2.5 w-2.5 rounded-full border-2 border-learner bg-white" />
        <span className="text-muted">Your answer:</span>
        <b>{formatAnswer(item, initial.answer)}</b>
        <span className="ml-auto text-muted tabular-nums">{initial.confidence}% sure</span>
      </div>

      <AIMessage item={item} onDone={() => setRevealed(true)} />

      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-5">
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold">Your final answer</h3>
                <div className="flex gap-1.5">
                  <SmallButton active={answer === initial.answer} onClick={() => setAnswer(initial.answer)}>Keep mine</SmallButton>
                  <SmallButton active={answer === item.ai.answer} onClick={() => setAnswer(item.ai.answer)}>Use the AI's</SmallButton>
                </div>
              </div>
              <AnswerInput item={item} value={answer} onChange={(a) => a !== undefined && setAnswer(a)} />
            </div>
            <Confidence value={conf} onChange={setConf} />
            <PrimaryButton onClick={() => onSubmit(answer, conf)}>Submit final answer</PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </Panel>
  );
}

function AIMessage({ item, onDone }: { item: Item; onDone: () => void }) {
  const text = item.ai.rationale;
  const [thinking, setThinking] = useState(true);
  const [n, setN] = useState(0);
  const done = !thinking && n >= text.length;

  useEffect(() => {
    const t = setTimeout(() => setThinking(false), 1100);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (thinking || n >= text.length) return;
    const t = setTimeout(() => setN((v) => Math.min(text.length, v + 3)), 14);
    return () => clearTimeout(t);
  }, [thinking, n, text.length]);
  useEffect(() => { if (done) onDone(); }, [done, onDone]);

  return (
    <div className="mt-5 mb-6 rounded-2xl border border-ai/25 bg-ai-wash p-4" onClick={() => { setThinking(false); setN(text.length); }}>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ai text-xs font-bold text-white" aria-hidden>AI</span>
        <span className="text-sm font-semibold">Data Assistant</span>
        {done && (
          <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-ai">
            {item.ai.statedConfidence} confidence
          </span>
        )}
      </div>
      {thinking ? (
        <div className="mt-3 flex gap-1" aria-label="AI is thinking">
          {[0, 1, 2].map((i) => (
            <motion.span key={i} className="h-2 w-2 rounded-full bg-ai/60"
              animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
          ))}
        </div>
      ) : (
        <>
          <p className="mt-3 text-[15px] leading-relaxed">{text.slice(0, n)}{!done && <span className="animate-pulse">▍</span>}</p>
          {done && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 flex items-center gap-2 border-t border-ai/15 pt-3 text-sm">
              <span className="h-2.5 w-2.5 rotate-45 bg-ai" />
              <span className="text-muted">AI's answer:</span>
              <b>{formatAnswer(item, item.ai.answer)}</b>
            </motion.p>
          )}
        </>
      )}
      {!done && <p className="mt-2 text-xs text-faint">Click to skip</p>}
    </div>
  );
}

/* ---------------- step 3 ---------------- */

function StepThree({ item, initial, final, trustBefore, last, onSubmit }: {
  item: Item; initial: Answer; final: Answer; trustBefore: number; last: boolean;
  onSubmit: (c: TrialLog["calibration"]) => void;
}) {
  const [attribution, setAttribution] = useState<TrialLog["calibration"]["attribution"] | undefined>();
  const [trust, setTrust] = useState(trustBefore);
  const [note, setNote] = useState("");
  const correct = isCorrect(item, final);
  const aiRight = item.ai.errorType === "none";
  const o = useMemo(
    () => outcome(item, { itemId: item.id, initial: { answer: initial, confidence: 0, rtMs: 0 }, trustBefore, revised: { answer: final, confidence: 0, rtMs: 0 }, calibration: { attribution: "other", trustAfter: 0 } }),
    [item, initial, final, trustBefore],
  );
  const info = OUTCOME_LABELS[o];

  return (
    <Panel eyebrow="Step 3 · Ground truth" title={`The answer is ${formatAnswer(item, item.groundTruth.answer)}`}>
      <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={`rounded-xl px-4 py-3 ${correct ? "bg-truth-wash" : "bg-bad-wash"}`}>
        <p className={`text-sm font-semibold ${correct ? "text-truth" : "text-bad"}`}>
          {correct ? "✓ Your final answer was right" : "✗ Your final answer was off"} · The AI was {aiRight ? "right" : "wrong"}
        </p>
        <p className="mt-0.5 text-sm text-ink/80">{info.sentence}</p>
      </motion.div>

      <div className="mt-5"><Comparison item={item} marks={{ initial, ai: item.ai.answer, final }} /></div>
      <p className="mt-4 text-[15px] leading-relaxed"><span className="font-semibold text-truth">Why: </span>{item.groundTruth.explanation}</p>
      {item.ai.flaw ? (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="mt-4 flex gap-3 rounded-xl border border-ai/25 bg-ai-wash px-4 py-3 text-sm">
          <span className="mt-1 h-2.5 w-2.5 shrink-0 rotate-45 bg-ai" />
          <div>
            <p className="font-semibold text-ai">What the AI got wrong: {ERROR_LABELS[item.ai.errorType].label}</p>
            <p className="mt-0.5 leading-relaxed">{item.ai.flaw}</p>
          </div>
        </motion.div>
      ) : (
        <p className="mt-4 text-sm text-muted"><span className="font-semibold text-ai">The AI was right this time.</span> Its reasoning matched the data.</p>
      )}

      <div className="mt-6 space-y-5 border-t border-line pt-5">
        <fieldset>
          <legend className="font-semibold">What best explains your final answer?</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {ATTRIBUTIONS.map((a) => (
              <OptionCard key={a.id} name="attr" checked={attribution === a.id} onChange={() => setAttribution(a.id)} label={a.label} small />
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="trust" className="font-semibold">How much will you trust the AI on the next item?</label>
          <p className="text-sm text-muted">Before this item you were at {trustBefore}.</p>
          <TrustSlider id="trust" value={trust} onChange={setTrust} />
        </div>
        <div>
          <label htmlFor="note" className="text-sm font-medium text-muted">A note to yourself (optional)</label>
          <textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} rows={2}
            className="mt-1 w-full rounded-lg border border-line bg-card px-3 py-2 text-sm outline-none focus:border-ink" />
        </div>
        <PrimaryButton disabled={!attribution} onClick={() => onSubmit({ attribution: attribution!, trustAfter: trust, ...(note.trim() ? { note: note.trim() } : {}) })}>
          {last ? "See my results →" : "Next item →"}
        </PrimaryButton>
      </div>
    </Panel>
  );
}

/* ---------------- inputs ---------------- */

function Panel({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <form className="card p-5 sm:p-6" onSubmit={(e) => e.preventDefault()}>
      <p className="text-xs font-semibold uppercase tracking-wide text-faint">{eyebrow}</p>
      <h2 className="mt-1.5 mb-5 text-xl font-semibold leading-snug">{title}</h2>
      {children}
    </form>
  );
}

function AnswerInput({ item, value, onChange }: { item: Item; value: Answer | undefined; onChange: (a: Answer | undefined) => void }) {
  const q = item.question;
  const [text, setText] = useState(value === undefined ? "" : String(value));
  // sync from outside (e.g. "Use the AI's") without clobbering partial input like "2."
  useEffect(() => {
    if (value === undefined) return;
    setText((t) => (t.trim() !== "" && Number(t) === value ? t : String(value)));
  }, [value]);

  if (q.kind === "choice") {
    return (
      <div className="grid gap-2" role="radiogroup">
        {q.options.map((o) => (
          <OptionCard key={o.id} name={`q-${item.id}`} checked={value === o.id} onChange={() => onChange(o.id)} label={o.label} />
        ))}
      </div>
    );
  }
  const commit = (s: string) => {
    setText(s);
    const v = Number(s);
    onChange(s.trim() !== "" && Number.isFinite(v) && v >= q.min && v <= q.max ? v : undefined);
  };
  const outOfRange = text.trim() !== "" && (Number.isNaN(Number(text)) || Number(text) < q.min || Number(text) > q.max);
  return (
    <div>
      <div className="flex items-stretch overflow-hidden rounded-xl border border-line bg-card focus-within:border-ink">
        <input type="number" inputMode="decimal" step={q.step} min={q.min} max={q.max} value={text} placeholder="Type a number"
          onChange={(e) => commit(e.target.value)} aria-label={`Answer in ${q.unit}`}
          className="w-full bg-transparent px-4 py-3 text-2xl font-semibold tabular-nums outline-none placeholder:text-base placeholder:font-normal placeholder:text-faint" />
        <span className="flex items-center bg-wash px-4 text-sm font-medium text-muted whitespace-nowrap">{q.unit}</span>
      </div>
      <p className={`mt-1.5 text-xs ${outOfRange ? "text-bad" : "text-faint"}`}>
        {outOfRange ? `Enter a value between ${q.min} and ${q.max}.` : `Between ${q.min} and ${q.max}.`}
      </p>
    </div>
  );
}

function OptionCard({ name, checked, onChange, label, small }: { name: string; checked: boolean; onChange: () => void; label: string; small?: boolean }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 rounded-xl border transition ${small ? "px-3 py-2 text-sm" : "px-4 py-3"} ${
      checked ? "border-ink bg-ink/[0.03] shadow-[inset_0_0_0_1px_var(--color-ink)]" : "border-line bg-card hover:border-faint"}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1 accent-[var(--color-ink)]" />
      <span className="leading-snug">{label}</span>
    </label>
  );
}

function Confidence({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="my-6">
      <div className="flex items-baseline justify-between">
        <label htmlFor="conf" className="font-semibold">How sure are you?</label>
        <span className="text-lg font-semibold tabular-nums">{value}%</span>
      </div>
      <input id="conf" type="range" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-3 w-full" />
      <div className="mt-1 flex justify-between text-xs text-faint"><span>Pure guess</span><span>Certain</span></div>
    </div>
  );
}

function TrustSlider({ id, value, onChange }: { id: string; value: number; onChange: (n: number) => void }) {
  return (
    <div className="mt-3">
      <div className="flex items-center gap-4">
        <input id={id} type="range" min={0} max={100} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
        <span className="w-10 text-right text-lg font-semibold tabular-nums">{value}</span>
      </div>
      <div className="mt-1 flex justify-between pr-14 text-xs text-faint"><span>Not at all</span><span>Completely</span></div>
    </div>
  );
}

function PrimaryButton({ children, disabled, onClick }: { children: React.ReactNode; disabled?: boolean; onClick: () => void }) {
  return (
    <button type="submit" disabled={disabled} onClick={onClick}
      className="w-full rounded-full bg-ink px-5 py-3 font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2">
      {children}
      {!disabled && <span className="ml-2 hidden text-xs font-normal opacity-50 sm:inline">Enter ↵</span>}
    </button>
  );
}

function SmallButton({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-ink bg-ink text-white" : "border-line bg-card text-muted hover:border-faint"}`}>
      {children}
    </button>
  );
}
