import type { Answer, ErrorType, Item } from "./schema";
import type { Outcome } from "./metrics";

export const ERROR_LABELS: Record<ErrorType, { label: string; blurb: string }> = {
  none: { label: "Correct", blurb: "The AI's answer matched the ground truth." },
  arithmetic: { label: "Arithmetic slip", blurb: "A plain computation error inside otherwise sensible reasoning." },
  "misread-axis": { label: "Misread axis", blurb: "The AI read a logarithmic or scaled axis as if it were linear." },
  extrapolation: { label: "Extrapolation", blurb: "The AI extended a trend beyond the range of the data." },
  "causal-leap": { label: "Causal leap", blurb: "The AI turned a correlation into a cause-and-effect claim." },
  "cherry-pick": { label: "Cherry-picking", blurb: "The AI built its claim on a convenient slice of the data." },
  "base-rate": { label: "Base-rate neglect", blurb: "The AI compared raw counts and ignored the group sizes." },
  overgeneralization: { label: "Overgeneralization", blurb: "The AI claimed more than the data can support." },
};

export const OUTCOME_LABELS: Record<Outcome, { label: string; sentence: string; tone: "good" | "bad" | "neutral" }> = {
  resisted: { label: "Resisted", sentence: "The AI was wrong, and you held your ground.", tone: "good" },
  swayed: { label: "Swayed", sentence: "You were right, but the AI's wrong answer pulled you off course.", tone: "bad" },
  "self-corrected": { label: "Self-corrected", sentence: "The AI was wrong, but questioning it led you to the right answer.", tone: "good" },
  "misled-or-stuck": { label: "Misled or stuck", sentence: "The AI was wrong, and your final answer was too.", tone: "bad" },
  confirmed: { label: "Confirmed", sentence: "You and the AI were both right.", tone: "good" },
  "talked-out": { label: "Talked out of it", sentence: "You and the AI were both right, but you changed to a wrong answer anyway.", tone: "bad" },
  helped: { label: "Helped", sentence: "You started off wrong, and the AI's correct answer helped you fix it.", tone: "good" },
  "missed-help": { label: "Missed help", sentence: "The AI was right, but you didn't take its answer.", tone: "bad" },
};

export const ATTRIBUTIONS = [
  { id: "i-was-right", label: "I reasoned it through correctly" },
  { id: "trusted-ai-too-much", label: "I trusted the AI too much" },
  { id: "should-have-trusted-ai", label: "I should have trusted the AI" },
  { id: "misread-data", label: "I misread the data or chart" },
  { id: "guessed", label: "I was mostly guessing" },
  { id: "other", label: "Something else" },
] as const;

export const DOMAIN_LABELS: Record<Item["domain"], string> = {
  climate: "Climate",
  ecology: "Ecology",
  health: "Health",
  "physical-science": "Physical science",
  society: "Society",
};

export function formatAnswer(item: Item, a: Answer): string {
  const q = item.question;
  if (q.kind === "numeric") {
    const decimals = (q.step.toString().split(".")[1] ?? "").length;
    return `${(a as number).toFixed(decimals)} ${q.unit}`;
  }
  return q.options.find((o) => o.id === a)?.label ?? String(a);
}

/** Short label for choice answers in compact views. */
export function shortAnswer(item: Item, a: Answer): string {
  const full = formatAnswer(item, a);
  return full.length > 42 ? full.slice(0, 40).trimEnd() + "…" : full;
}

/** Categorical slots in fixed order (validated reference palette, light mode). */
export const PERSONA_COLORS: Record<string, string> = {
  "ai-steered": "#2a78d6",
  "self-sufficient": "#eb6834",
  verifier: "#1baf7a",
  calibrated: "#eda100",
};
