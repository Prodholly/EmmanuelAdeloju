import { z } from "zod";

/**
 * Swayed — data model.
 *
 * Every item is fully predetermined: the dataset, the objective ground truth
 * (derivable from the data), and the AI's answer (sometimes deliberately wrong).
 * No API is ever called.
 */

/** Ways the simulated AI can be deliberately wrong. */
export const ErrorType = z.enum([
  "none", // AI is correct
  "misread-axis", // wrong scale, units, or log axis
  "extrapolation", // extends a trend beyond the data
  "causal-leap", // treats correlation as causation
  "cherry-pick", // uses a subset of the data
  "base-rate", // ignores group sizes / denominators
  "overgeneralization", // claims more than the data supports
  "arithmetic", // plain computation slip
]);
export type ErrorType = z.infer<typeof ErrorType>;

/** Sensemaking move the item mainly exercises. */
export const Move = z.enum(["notice", "compare", "quantify", "explain", "evaluate-claim", "predict"]);

const Column = z.object({ key: z.string(), label: z.string(), unit: z.string().optional() });

export const Chart = z.object({
  type: z.enum(["line", "scatter", "bar", "dot"]),
  x: z.string(),
  y: z.string(),
  series: z.string().optional(),
  yLog: z.boolean().optional(),
});

const NumericQuestion = z.object({
  kind: z.literal("numeric"),
  prompt: z.string(),
  unit: z.string(),
  /** answers within ±tolerance of the truth count as correct */
  tolerance: z.number().nonnegative(),
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
});

const ChoiceQuestion = z.object({
  kind: z.literal("choice"),
  prompt: z.string(),
  options: z.array(z.object({ id: z.string(), label: z.string() })).min(2),
});

export const Question = z.discriminatedUnion("kind", [NumericQuestion, ChoiceQuestion]);
export type Question = z.infer<typeof Question>;

/** Answer value: a number for numeric items, an option id for choice items. */
export const Answer = z.union([z.number(), z.string()]);
export type Answer = z.infer<typeof Answer>;

export const Item = z.object({
  id: z.string(),
  title: z.string(),
  domain: z.enum(["climate", "ecology", "health", "physical-science", "society"]),
  move: Move,
  context: z.string(),
  dataset: z.object({
    source: z.string(), // provenance note shown to learners
    columns: z.array(Column),
    rows: z.array(z.record(z.string(), z.union([z.number(), z.string()]))),
  }),
  chart: Chart,
  question: Question,
  groundTruth: z.object({
    answer: Answer,
    /** how the truth follows from the data, shown on reveal */
    explanation: z.string(),
  }),
  ai: z.object({
    answer: Answer,
    errorType: ErrorType,
    /** the AI's fluent, confident-sounding rationale */
    rationale: z.string(),
    statedConfidence: z.enum(["low", "medium", "high"]),
    /** for wrong answers: exactly what the AI got wrong, shown at the reveal */
    flaw: z.string().optional(),
  }),
});
export type Item = z.infer<typeof Item>;

export const Scenario = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  items: z.array(Item).min(1),
});
export type Scenario = z.infer<typeof Scenario>;

/* ---------- logs ---------- */

const Judgment = z.object({
  answer: Answer,
  confidence: z.number().min(0).max(100),
  rtMs: z.number().nonnegative(),
});

/** What the learner does after the ground truth is revealed. */
export const CalibrationResponse = z.object({
  /** how they explain the gap between their final answer and the truth */
  attribution: z.enum([
    "i-was-right",
    "trusted-ai-too-much",
    "should-have-trusted-ai",
    "misread-data",
    "guessed",
    "other",
  ]),
  /** trust in the AI for the next item, 0–100 */
  trustAfter: z.number().min(0).max(100),
  /** free-text note (optional) */
  note: z.string().optional(),
});

export const TrialLog = z.object({
  itemId: z.string(),
  initial: Judgment, // before seeing AI
  trustBefore: z.number().min(0).max(100),
  revised: Judgment, // after seeing AI
  calibration: CalibrationResponse, // after seeing ground truth
});
export type TrialLog = z.infer<typeof TrialLog>;

export const SessionLog = z.object({
  sessionId: z.string(),
  scenarioId: z.string(),
  /** simulated persona name, or "human" for real play-throughs */
  persona: z.string(),
  startedAt: z.string(),
  trials: z.array(TrialLog),
});
export type SessionLog = z.infer<typeof SessionLog>;
