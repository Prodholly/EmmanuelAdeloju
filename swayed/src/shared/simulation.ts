import type { ErrorType, Item, Scenario, SessionLog, TrialLog } from "./schema";
import { isCorrect } from "./metrics";

/** Small seeded PRNG (mulberry32) so every build produces identical data. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface Persona {
  id: string;
  label: string;
  blurb: string;
  /** base probability of reasoning correctly alone */
  skill: number;
  /** starting trust in the AI, 0–100 */
  trust0: number;
  /** probability of checking the AI's claim against the data */
  verify: number;
  /** log-odds shift toward adopting the AI's answer */
  adoptBias: number;
  /** how strongly trust moves after a ground-truth reveal (0–1) */
  learningRate: number;
  /** shift applied to self-reported confidence */
  confidenceShift: number;
}

/** Reliance personas, loosely inspired by the AIRELI taxonomy (Alakmeh et al., ICPC '26). */
export const PERSONAS: Persona[] = [
  {
    id: "ai-steered",
    label: "AI-steered",
    blurb: "Leans on the AI and rarely checks its claims against the data.",
    skill: 0.45, trust0: 80, verify: 0.15, adoptBias: 1.3, learningRate: 0.08, confidenceShift: -10,
  },
  {
    id: "self-sufficient",
    label: "Self-sufficient",
    blurb: "Works it out alone and often sets the AI aside, whether it is right or wrong.",
    skill: 0.7, trust0: 35, verify: 0.35, adoptBias: -1.5, learningRate: 0.15, confidenceShift: 10,
  },
  {
    id: "verifier",
    label: "Verifier",
    blurb: "Checks the AI's reasoning against the data before deciding.",
    skill: 0.65, trust0: 60, verify: 0.75, adoptBias: 0, learningRate: 0.3, confidenceShift: 0,
  },
  {
    id: "calibrated",
    label: "Calibrated",
    blurb: "Adjusts trust sharply after each reveal, so reliance tracks the AI's record.",
    skill: 0.6, trust0: 60, verify: 0.45, adoptBias: 0, learningRate: 0.6, confidenceShift: 0,
  },
];

/** How easy each AI error is to catch (multiplies the verify probability). */
export const DETECTABILITY: Record<ErrorType, number> = {
  none: 1,
  arithmetic: 1.2,
  "misread-axis": 0.85,
  extrapolation: 0.9,
  "causal-leap": 0.8,
  "cherry-pick": 0.85,
  "base-rate": 0.6,
  overgeneralization: 0.8,
};

/** How easy each item is to get right alone (multiplies skill). */
const EASE: Record<string, number> = {
  "co2-rate": 1.1, "temp-change": 1.3, "vaccine-rate": 0.85, "pond-cause": 1.0,
  "sea-ice": 1.2, "decay-log": 0.7, "life-expectancy": 1.2, monarchs: 1.1,
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
const CONF_LOGIT = { low: -0.5, medium: 0, high: 0.5 } as const;

function snap(item: Item, v: number) {
  if (item.question.kind !== "numeric") return v;
  const { step, min, max } = item.question;
  const decimals = (step.toString().split(".")[1] ?? "").length;
  return Number(clamp(Math.round(v / step) * step, min, max).toFixed(decimals));
}

function initialAnswer(item: Item, correct: boolean, r: () => number) {
  const q = item.question;
  const aiWrong = item.ai.errorType !== "none";
  if (q.kind === "numeric") {
    const truth = item.groundTruth.answer as number;
    if (correct) return snap(item, truth + (r() * 2 - 1) * q.tolerance * 0.8);
    // shared misconception: the learner makes the same mistake the AI does
    if (aiWrong && r() < 0.35) return item.ai.answer as number;
    const span = (q.max - q.min) * 0.25;
    const dir = r() < 0.5 ? -1 : 1;
    let v = snap(item, truth + dir * (q.tolerance * 2 + r() * span));
    if (isCorrect(item, v)) v = snap(item, truth - dir * (q.tolerance * 3 + r() * span));
    return v;
  }
  const truth = item.groundTruth.answer as string;
  if (correct) return truth;
  if (aiWrong && r() < 0.4) return item.ai.answer as string;
  const wrong = q.options.map((o) => o.id).filter((id) => id !== truth);
  return wrong[Math.floor(r() * wrong.length)];
}

function simulateTrial(item: Item, p: Persona, trust: number, r: () => number): TrialLog {
  const aiRight = item.ai.errorType === "none";
  const pInit = clamp(p.skill * (EASE[item.id] ?? 1), 0.05, 0.95);
  const init = initialAnswer(item, r() < pInit, r);
  const initCorrect = isCorrect(item, init);
  const initConf = Math.round(clamp((initCorrect ? 55 + r() * 35 : 35 + r() * 40) + p.confidenceShift, 5, 99));

  // --- seeing the AI ---
  let revised = init;
  let revConf = initConf;
  const agrees = item.question.kind === "numeric"
    ? Math.abs((init as number) - (item.ai.answer as number)) < 1e-9
    : init === item.ai.answer;

  if (!agrees) {
    const checked = r() < p.verify * DETECTABILITY[item.ai.errorType] * (initCorrect ? 1 : 0.6);
    let pAdopt = sigmoid(p.adoptBias + 3 * (trust / 100 - 0.5) + CONF_LOGIT[item.ai.statedConfidence] - 2 * (initConf / 100 - 0.5));
    if (checked) pAdopt = aiRight ? Math.max(pAdopt, 0.85) : pAdopt * 0.1;
    const adopt = r() < pAdopt;

    if (item.question.kind === "numeric") {
      const woa = adopt ? (r() < 0.5 ? 1 : 0.7 + r() * 0.3) : r() < 0.6 ? 0 : r() * 0.25;
      revised = snap(item, (init as number) + woa * ((item.ai.answer as number) - (init as number)));
      // checking a wrong AI sometimes surfaces the learner's own mistake
      if (!adopt && checked && !initCorrect && r() < 0.3) revised = item.groundTruth.answer;
    } else {
      revised = adopt ? item.ai.answer : init;
      if (!adopt && checked && !initCorrect && r() < 0.3) revised = item.groundTruth.answer;
    }
    revConf = adopt
      ? Math.round(clamp(50 + (item.ai.statedConfidence === "high" ? 20 : 8) + r() * 20 + p.confidenceShift / 2, 5, 99))
      : Math.round(clamp(initConf + (checked ? 6 : -4) + (r() * 6 - 3), 5, 99));
  } else {
    revConf = Math.round(clamp(initConf + 8 + r() * 8, 5, 99));
  }

  // --- ground truth reveal ---
  const finalCorrect = isCorrect(item, revised);
  const movedToAI = revised !== init && (item.question.kind === "choice" ? revised === item.ai.answer : true);
  const attribution: TrialLog["calibration"]["attribution"] = finalCorrect
    ? "i-was-right"
    : !aiRight && movedToAI
      ? "trusted-ai-too-much"
      : aiRight
        ? "should-have-trusted-ai"
        : r() < 0.6 ? "misread-data" : "guessed";

  const target = aiRight ? 100 : 0;
  const trustAfter = Math.round(clamp(trust + p.learningRate * (target - trust) * 0.6 + (r() * 6 - 3), 0, 100));

  return {
    itemId: item.id,
    initial: { answer: init, confidence: initConf, rtMs: Math.round(15000 + r() * r() * 50000) },
    trustBefore: Math.round(trust),
    revised: { answer: revised, confidence: revConf, rtMs: Math.round(5000 + r() * r() * 22000) },
    calibration: { attribution, trustAfter },
  };
}

export function simulate(scenario: Scenario, perPersona: number, seed: number): SessionLog[] {
  const r = rng(seed);
  const sessions: SessionLog[] = [];
  const start = Date.UTC(2026, 9, 1);
  let n = 0;
  for (const p of PERSONAS) {
    for (let i = 0; i < perPersona; i++) {
      let trust = clamp(p.trust0 + (r() * 20 - 10), 0, 100);
      const trials: TrialLog[] = [];
      for (const item of scenario.items) {
        const t = simulateTrial(item, p, trust, r);
        trials.push(t);
        trust = t.calibration.trustAfter;
      }
      n++;
      sessions.push({
        sessionId: `S${String(n).padStart(3, "0")}`,
        scenarioId: scenario.id,
        persona: p.id,
        startedAt: new Date(start + n * 3_600_000 * 5).toISOString(),
        trials,
      });
    }
  }
  return sessions;
}
