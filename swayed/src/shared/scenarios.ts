import { Scenario } from "./schema";

const files = import.meta.glob("../data/scenarios/*.json", { eager: true, import: "default" });

/** All scenarios, validated at load time so a bad item fails loudly. */
export const scenarios: Scenario[] = Object.entries(files).map(([path, raw]) => {
  const parsed = Scenario.safeParse(raw);
  if (!parsed.success) throw new Error(`Invalid scenario ${path}: ${parsed.error.message}`);
  return parsed.data;
});
