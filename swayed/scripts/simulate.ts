/**
 * Generates simulated learner sessions (seeded, reproducible) for the study page.
 * Output: src/data/simulated/sessions.json
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { Scenario, SessionLog } from "../src/shared/schema";
import { simulate } from "../src/shared/simulation";

const SEED = 20261120;
const PER_PERSONA = 40;

const scenario = Scenario.parse(JSON.parse(readFileSync("src/data/scenarios/core.json", "utf8")));
const sessions = simulate(scenario, PER_PERSONA, SEED);
sessions.forEach((s) => SessionLog.parse(s));

mkdirSync("src/data/simulated", { recursive: true });
writeFileSync(
  "src/data/simulated/sessions.json",
  JSON.stringify({ simulated: true, seed: SEED, scenarioId: scenario.id, sessions }),
);
console.log(`simulate: wrote ${sessions.length} sessions (${PER_PERSONA} per persona, seed ${SEED})`);
