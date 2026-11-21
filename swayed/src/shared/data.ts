import simulated from "../data/simulated/sessions.json";
import type { SessionLog } from "./schema";
import { scenarios } from "./scenarios";
import { profile, type Profile } from "./metrics";
import { PERSONAS } from "./simulation";

export const scenario = scenarios.find((s) => s.id === "core")!;
export const items = scenario.items;
export const itemById = new Map(items.map((i) => [i.id, i]));
export const sessions = (simulated as { sessions: SessionLog[] }).sessions;

/** Mean reliance profile of each simulated persona. */
export const centroids: Record<string, Profile> = Object.fromEntries(
  PERSONAS.map((p) => {
    const ps = sessions.filter((s) => s.persona === p.id).map((s) => profile(items, s.trials));
    const keys = Object.keys(ps[0]) as (keyof Profile)[];
    return [p.id, Object.fromEntries(keys.map((k) => [k, ps.reduce((a, b) => a + b[k], 0) / ps.length])) as Profile];
  }),
);
