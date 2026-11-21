import type { Answer, Item, TrialLog } from "./schema";

/** Is an answer correct against the item's ground truth? */
export function isCorrect(item: Item, answer: Answer): boolean {
  const truth = item.groundTruth.answer;
  if (item.question.kind === "numeric") {
    return typeof answer === "number" && Math.abs(answer - (truth as number)) <= item.question.tolerance;
  }
  return answer === truth;
}

/**
 * Outcome of one trial: what the AI did to the learner's answer.
 *
 *              AI wrong                      AI right
 *  init ✓ → ✓  resisted                      confirmed
 *  init ✓ → ✗  swayed      (harmful)         talked-out (rare)
 *  init ✗ → ✓  self-corrected                helped     (beneficial)
 *  init ✗ → ✗  misled-or-stuck               missed-help
 */
export type Outcome =
  | "resisted"
  | "swayed"
  | "self-corrected"
  | "misled-or-stuck"
  | "confirmed"
  | "talked-out"
  | "helped"
  | "missed-help";

export function outcome(item: Item, t: TrialLog): Outcome {
  const aiRight = item.ai.errorType === "none";
  const a = isCorrect(item, t.initial.answer);
  const b = isCorrect(item, t.revised.answer);
  if (!aiRight) {
    if (a && b) return "resisted";
    if (a && !b) return "swayed";
    if (!a && b) return "self-corrected";
    return "misled-or-stuck";
  }
  if (a && b) return "confirmed";
  if (a && !b) return "talked-out";
  if (!a && b) return "helped";
  return "missed-help";
}

/**
 * Weight of Advice (Yaniv, 2004) for numeric items:
 * 0 = ignored the AI, 1 = fully adopted the AI's answer.
 * Undefined when the initial answer already equals the AI's.
 */
export function weightOfAdvice(item: Item, t: TrialLog): number | undefined {
  if (item.question.kind !== "numeric") return undefined;
  const init = t.initial.answer as number;
  const rev = t.revised.answer as number;
  const ai = item.ai.answer as number;
  if (ai === init) return undefined;
  return Math.min(1, Math.max(0, (rev - init) / (ai - init)));
}

/** Did the learner switch to the AI's answer on a choice item? */
export function adoptedAI(item: Item, t: TrialLog): boolean {
  if (item.question.kind === "numeric") return (weightOfAdvice(item, t) ?? 0) >= 0.5;
  return t.initial.answer !== item.ai.answer && t.revised.answer === item.ai.answer;
}

/** Brier score of the final answer's confidence (lower is better calibrated). */
export function brier(item: Item, t: TrialLog): number {
  const p = t.revised.confidence / 100;
  const y = isCorrect(item, t.revised.answer) ? 1 : 0;
  return (p - y) ** 2;
}

/**
 * Trust update after the ground-truth reveal.
 * "Appropriate" = trust goes down after a wrong AI and does not go down after a right one.
 */
export function trustUpdate(item: Item, t: TrialLog) {
  const delta = t.calibration.trustAfter - t.trustBefore;
  const aiRight = item.ai.errorType === "none";
  const appropriate = aiRight ? delta >= 0 : delta < 0;
  return { delta, appropriate };
}

/** Reliance profile used to compare a learner with the simulated personas. */
export function profile(items: Item[], trials: TrialLog[]) {
  const byId = new Map(items.map((i) => [i.id, i]));
  let wrongN = 0, wrongAdopt = 0, rightN = 0, rightAdopt = 0, initC = 0, finalC = 0, trust = 0;
  for (const t of trials) {
    const item = byId.get(t.itemId);
    if (!item) continue;
    if (isCorrect(item, t.initial.answer)) initC++;
    if (isCorrect(item, t.revised.answer)) finalC++;
    trust += t.trustBefore;
    const disagreed = item.question.kind === "numeric"
      ? Math.abs((t.initial.answer as number) - (item.ai.answer as number)) > 1e-9
      : t.initial.answer !== item.ai.answer;
    if (!disagreed) continue;
    if (item.ai.errorType === "none") { rightN++; if (adoptedAI(item, t)) rightAdopt++; }
    else { wrongN++; if (adoptedAI(item, t)) wrongAdopt++; }
  }
  const n = Math.max(1, trials.length);
  return {
    adoptWhenWrong: wrongN ? wrongAdopt / wrongN : 0.5,
    adoptWhenRight: rightN ? rightAdopt / rightN : 0.5,
    initialAccuracy: initC / n,
    finalAccuracy: finalC / n,
    meanTrust: trust / n / 100,
  };
}
export type Profile = ReturnType<typeof profile>;

/** Nearest persona by Euclidean distance on the reliance features. */
export function nearest(p: Profile, centroids: Record<string, Profile>) {
  const keys: (keyof Profile)[] = ["adoptWhenWrong", "adoptWhenRight", "initialAccuracy", "meanTrust"];
  let best = "", bestD = Infinity;
  for (const [id, c] of Object.entries(centroids)) {
    const d = Math.hypot(...keys.map((k) => p[k] - c[k]));
    if (d < bestD) { bestD = d; best = id; }
  }
  return best;
}
