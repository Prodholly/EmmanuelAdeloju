# Swayed — how AI sways data reasoning

An interactive data-sensemaking tool and a companion study page. It addresses one guiding question:
**When does AI help or hurt data reasoning?**

Everything is predetermined and simulated. No API is called, and no data leaves the browser.

## The trial loop (one per item)

| Step | Learner sees | Learner does | Logged |
|---|---|---|---|
| 1. Reason alone | Dataset, chart, question | Answers and sets confidence | `initial` |
| 2. AI weighs in | The AI's answer and a fluent rationale (sometimes deliberately wrong) | Keeps or revises the answer and sets confidence | `revised`, `trustBefore` |
| 3. Ground truth | The objective answer, derived from the data, with its working | Says why they were right or wrong and recalibrates trust in the AI | `calibration` |

Each trial gets one of eight outcomes, crossing whether the AI was right with whether the learner changed their answer. For example, *swayed* means the learner was right, the AI was wrong, and the learner switched to the wrong answer. *Helped* means the learner was wrong, the AI was right, and the learner corrected their answer. See `src/shared/metrics.ts`.

### Measures
- **Outcome rates:** swayed, resisted, helped, missed-help, and the other four.
- **Weight of Advice** (Yaniv, 2004), for numeric items: how far the learner moved toward the AI, from 0 (not at all) to 1 (fully).
- **Calibration:** Brier score of the final answer's confidence.
- **Trust updating:** whether trust moves appropriately after the reveal (down after a wrong AI).
- **Error-type sensitivity:** which kinds of AI error sway people most. The types are misread-axis, extrapolation, causal-leap, cherry-pick, base-rate, overgeneralization and arithmetic.

## Two pages

| Path | Served at | Purpose |
|---|---|---|
| `play/index.html` → `src/tool/` | `/tools/swayed/play/` | The tool. Anyone can play it; the session log stays in the browser and can be downloaded as JSON. |
| `index.html` → `src/study/` | `/tools/swayed/` | The project page, modeled on eye-for-ai.hasel.dev: hero, metric glossary, interactive explorer of simulated outcomes, per-session replay, and download of the simulated dataset. |

## Simulated data
`scripts/simulate.ts` generates seeded, reproducible sessions from learner **personas**. Planned personas are an AI-steered learner, a self-sufficient learner, a verifier, and a calibrated learner, in the spirit of the AIRELI reliance personas. Each persona has a skill level, a baseline trust, a sensitivity to how confident the AI sounds, and a trust-update rule. The output goes to `src/data/simulated/sessions.json`, which the study page reads. The page labels all of this clearly as **simulated**, not human-subjects data.

## Stack
| Need | Choice | Why |
|---|---|---|
| Build | Vite 8 + TypeScript | Fast, multi-page, static output for GitHub Pages |
| UI | React 19 + Tailwind CSS 4 | Component-based, precise design tokens |
| Motion | `motion` (Framer Motion) | Step transitions and the reveal moments |
| Charts | Observable Plot, with D3 for custom marks | Publication-quality charts with little code |
| Data integrity | Zod | Every scenario is validated at load, so a malformed item fails the build |
| Tests | Vitest | Scoring and simulation logic are unit-tested |
| Simulation | tsx | Runs the TypeScript simulator during the build |

## Layout
```
swayed/                  ← source (excluded from Jekyll)
  index.html             study page entry
  play/index.html        tool entry
  scripts/simulate.ts    simulated-session generator
  src/shared/            schema, metrics, scenario loader, styles
  src/data/scenarios/    item bank (JSON)
  src/data/simulated/    generated sessions
  src/tool/              tool UI
  src/study/             study page UI
tools/swayed/            ← built output, published by Jekyll (do not edit by hand)
```

## Commands
```bash
cd swayed
npm install
npm run dev        # http://localhost:5173/EmmanuelAdeloju/tools/swayed/  (tool at /play/)
npm test
npm run build      # simulate, typecheck, build into ../tools/swayed
```

## Before publishing
- **Check the real-data values against their sources.** Five items use real public data, rounded and adapted from memory of the published series: NOAA Mauna Loa CO₂, NASA GISTEMP, NSIDC September sea ice, CDC/NCHS life expectancy, and the WWF-Mexico monarch survey. Each ground truth is computed from the values shown, so the items are internally consistent. The individual numbers should still be checked against the current releases.
- The vaccine, pond and decay items use illustrative data and are labelled that way.
- Persona parameters and item difficulty live in `src/shared/simulation.ts`. Change them, then run `npm run build` to regenerate the data.
