import { describe, expect, it } from "vitest";
import raw from "../data/scenarios/core.json";
import { Scenario, type TrialLog } from "./schema";
import { isCorrect, outcome, weightOfAdvice, trustUpdate } from "./metrics";

const item = Scenario.parse(raw).items[0];
const trial = (init: number, rev: number, trustAfter = 40): TrialLog => ({
  itemId: item.id,
  initial: { answer: init, confidence: 70, rtMs: 1000 },
  trustBefore: 60,
  revised: { answer: rev, confidence: 70, rtMs: 1000 },
  calibration: { attribution: "trusted-ai-too-much", trustAfter },
});

describe("metrics", () => {
  it("scores numeric answers with tolerance", () => {
    expect(isCorrect(item, 2.4)).toBe(true);
    expect(isCorrect(item, 2.6)).toBe(false);
  });
  it("classifies a correct learner pulled to a wrong AI as swayed", () => {
    expect(outcome(item, trial(2.2, 4.5))).toBe("swayed");
    expect(outcome(item, trial(2.2, 2.2))).toBe("resisted");
  });
  it("computes weight of advice", () => {
    expect(weightOfAdvice(item, trial(2.2, 4.5))).toBe(1);
    expect(weightOfAdvice(item, trial(2.2, 2.2))).toBe(0);
  });
  it("flags trust dropping after a wrong AI as appropriate", () => {
    expect(trustUpdate(item, trial(2.2, 4.5, 40)).appropriate).toBe(true);
    expect(trustUpdate(item, trial(2.2, 4.5, 80)).appropriate).toBe(false);
  });
});
