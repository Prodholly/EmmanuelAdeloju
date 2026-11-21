import { useCallback, useState } from "react";
import * as Plot from "@observablehq/plot";
import { scaleLinear } from "d3";
import { motion } from "motion/react";
import { PlotFigure } from "./PlotFigure";
import type { Answer, Item } from "./schema";
import { formatAnswer } from "./labels";

const DATA_INK = "#3a3f4b";

function colLabel(item: Item, key: string) {
  const c = item.dataset.columns.find((c) => c.key === key);
  return c ? (c.unit ? `${c.label} (${c.unit})` : c.label) : key;
}

/** The task's data chart (the stimulus). */
export function DataChart({ item, height = 300 }: { item: Item; height?: number }) {
  const make = useCallback(
    (w: number): Plot.PlotOptions => {
      const { chart, dataset } = item;
      const rows = dataset.rows;
      const isYear = /year|hour/i.test(chart.x);
      const xLabel = colLabel(item, chart.x);
      const yLabel = colLabel(item, chart.y);
      const tip = Plot.tip(rows, Plot.pointer({ x: chart.x, y: chart.y, channels: tipChannels(item), format: { x: false, y: false } }));
      const base = {
        marginLeft: 56, marginBottom: 40, marginTop: 24, marginRight: 16,
        x: { label: xLabel, labelAnchor: "center" as const, labelOffset: 34, tickFormat: isYear ? "d" : undefined, ticks: w < 480 ? 5 : undefined },
        y: {
          label: `↑ ${yLabel}`, grid: true, nice: true,
          ...(chart.yLog ? { type: "log" as const, ticks: [50, 100, 200, 400, 800, 1600], tickFormat: "~s" } : {}),
        },
      };
      if (chart.type === "bar") {
        return {
          ...base,
          x: { label: xLabel, labelAnchor: "center", labelOffset: 34, padding: 0.45 },
          y: { label: `↑ ${yLabel}`, grid: true, nice: true },
          marks: [
            Plot.barY(rows, { x: chart.x, y: chart.y, fill: DATA_INK, rx: 4, insetTop: 0 }),
            Plot.text(rows, { x: chart.x, y: chart.y, text: (d) => String(d[chart.y]), dy: -10, fill: "#16181d", fontWeight: 600, fontSize: 13 }),
            Plot.ruleY([0], { stroke: "#c9c5bc" }),
            Plot.tip(rows, Plot.pointerX({ x: chart.x, y: chart.y, channels: tipChannels(item), format: { x: false, y: false } })),
          ],
        };
      }
      if (chart.type === "scatter") {
        return {
          ...base,
          marks: [
            Plot.dot(rows, { x: chart.x, y: chart.y, r: 6, fill: DATA_INK, stroke: "white", strokeWidth: 2 }),
            Plot.text(rows, { x: chart.x, y: chart.y, text: (d) => String(d.pond ?? ""), dx: 10, textAnchor: "start", fill: "#8a8d94", fontSize: 11 }),
            tip,
          ],
        };
      }
      return {
        ...base,
        marks: [
          Plot.lineY(rows, { x: chart.x, y: chart.y, stroke: DATA_INK, strokeWidth: 2, curve: "linear" }),
          Plot.dot(rows, { x: chart.x, y: chart.y, r: 4.5, fill: "white", stroke: DATA_INK, strokeWidth: 2 }),
          tip,
        ],
      };
    },
    [item],
  );
  return <PlotFigure make={make} height={height} label={`Chart: ${item.title}`} />;
}

function tipChannels(item: Item) {
  return Object.fromEntries(item.dataset.columns.map((c) => [c.unit ? `${c.label} (${c.unit})` : c.label, c.key]));
}

/** Collapsible data table with source note. */
export function DataTable({ item }: { item: Item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-sm font-medium text-muted hover:text-ink inline-flex items-center gap-1.5"
        aria-expanded={open}
      >
        <span className={`transition-transform ${open ? "rotate-90" : ""}`}>›</span>
        {open ? "Hide" : "Show"} data table
      </button>
      {open && (
        <div className="mt-2 overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-sm tabular-nums">
            <thead className="bg-wash text-left text-muted">
              <tr>
                {item.dataset.columns.map((c) => (
                  <th key={c.key} className="px-3 py-2 font-medium whitespace-nowrap">
                    {c.label}
                    {c.unit && <span className="text-faint font-normal"> ({c.unit})</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.dataset.rows.map((r, i) => (
                <tr key={i} className="border-t border-line">
                  {item.dataset.columns.map((c) => (
                    <td key={c.key} className="px-3 py-1.5">
                      {typeof r[c.key] === "number" && !/year/i.test(c.key) ? (r[c.key] as number).toLocaleString() : r[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-2 text-xs text-faint">Source: {item.dataset.source}</p>
    </div>
  );
}

/* ---------- comparison of answers vs ground truth ---------- */

type Marks = { initial: Answer; ai: Answer; final: Answer };
/** Which marks are visible. Lets the replay build the picture up one phase at a time. */
export type Reveal = { initial: boolean; ai: boolean; final: boolean; truth: boolean };
const ALL: Reveal = { initial: true, ai: true, final: true, truth: true };
const pop = { initial: { opacity: 0, scale: 0.4 }, animate: { opacity: 1, scale: 1 }, transition: { type: "spring" as const, stiffness: 380, damping: 22 } };

/** Number line (numeric items) or option grid (choice items) showing every answer against the truth. */
export function Comparison({ item, marks, compact = false, show = ALL, who = "You", legend = true }: {
  item: Item; marks: Marks; compact?: boolean; show?: Reveal; who?: string; legend?: boolean;
}) {
  return item.question.kind === "numeric" ? (
    <NumberLine item={item} marks={marks} compact={compact} show={show} who={who} legend={legend} />
  ) : (
    <OptionGrid item={item} marks={marks} compact={compact} show={show} who={who} />
  );
}

function NumberLine({ item, marks, compact, show, who, legend }: { item: Item; marks: Marks; compact: boolean; show: Reveal; who: string; legend: boolean }) {
  const q = item.question as Extract<Item["question"], { kind: "numeric" }>;
  const truth = item.groundTruth.answer as number;
  // domain covers every mark (revealed or not) so nothing jumps as marks appear
  const vals = [marks.initial, marks.ai, marks.final, truth - q.tolerance, truth + q.tolerance] as number[];
  let lo = Math.min(...vals), hi = Math.max(...vals);
  const pad = Math.max((hi - lo) * 0.15, q.step * 4);
  lo = Math.max(q.min, lo - pad);
  hi = Math.min(q.max, hi + pad);
  // Lanes: AI diamond sits above the axis so it never hides behind the learner's markers;
  // the learner's first → final move is drawn as an arc below the axis.
  const W = compact ? 600 : 480, H = compact ? 60 : 84, padX = 18;
  const aiY = compact ? 10 : 14, axisY = compact ? 32 : 40;
  const x = scaleLinear().domain([lo, hi]).range([padX, W - padX]).nice();
  const ticks = x.ticks(compact ? 4 : 6);
  const xi = x(marks.initial as number), xf = x(marks.final as number), xa = x(marks.ai as number);
  const arrowId = `arr-${item.id}-${compact ? "c" : "f"}-${Math.round(xi)}-${Math.round(xf)}`;

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" role="img"
        aria-label={`${who} first ${marks.initial}, AI ${marks.ai}, ${who} final ${marks.final}, truth ${truth}`}>
        {show.truth && (
          <motion.rect initial={{ opacity: 0 }} animate={{ opacity: 1 }} x={x(truth - q.tolerance)} y={aiY - 8}
            width={Math.max(3, x(truth + q.tolerance) - x(truth - q.tolerance))} height={axisY - aiY + 22} rx={4} fill="var(--color-truth-wash)" />
        )}
        <line x1={padX} x2={W - padX} y1={axisY} y2={axisY} stroke="#c9c5bc" strokeWidth={1.5} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} x2={x(t)} y1={axisY + 4} y2={axisY + 8} stroke="#c9c5bc" />
            {!compact && <text x={x(t)} y={axisY + 36} textAnchor="middle" fontSize={11} fill="#8a8d94">{t}</text>}
          </g>
        ))}
        {show.truth && (
          <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35 }}
            x1={x(truth)} x2={x(truth)} y1={aiY - 8} y2={axisY + 14} stroke="var(--color-truth)" strokeWidth={2.5} />
        )}
        {show.final && Math.abs(xf - xi) > 4 && (
          <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
            d={`M${xi},${axisY + 9} Q${(xi + xf) / 2},${axisY + 30} ${xf},${axisY + 9}`} fill="none"
            stroke="var(--color-learner)" strokeWidth={1.5} strokeDasharray="3 3" markerEnd={`url(#${arrowId})`} />
        )}
        <defs>
          <marker id={arrowId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--color-learner)" />
          </marker>
        </defs>
        {show.ai && (
          <motion.g {...pop} style={{ transformOrigin: `${xa}px ${aiY}px` }}>
            <line x1={xa} x2={xa} y1={aiY} y2={axisY} stroke="var(--color-ai)" strokeWidth={1.5} strokeDasharray="2 2" />
            <rect x={xa - 6} y={aiY - 6} width={12} height={12} transform={`rotate(45 ${xa} ${aiY})`} fill="var(--color-ai)" stroke="white" strokeWidth={2} />
          </motion.g>
        )}
        {show.initial && (
          <motion.circle {...pop} cx={xi} cy={axisY} r={7} fill="white" stroke="var(--color-learner)" strokeWidth={2.5} />
        )}
        {show.final && (
          <motion.circle {...pop} cx={xf} cy={axisY} r={5.5} fill="var(--color-learner)" stroke="white" strokeWidth={2} />
        )}
      </svg>
      {!compact && legend && <Legend item={item} marks={marks} show={show} who={who} />}
    </div>
  );
}

function Legend({ item, marks, show, who }: { item: Item; marks: Marks; show: Reveal; who: string }) {
  const hidden = <b className="text-faint">…</b>;
  return (
    <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm [&>li]:whitespace-nowrap">
      <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full border-2 border-learner bg-white" /> <span className="text-muted">{who}, first</span> {show.initial ? <b className="tabular-nums">{fmtShort(item, marks.initial)}</b> : hidden}</li>
      <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rotate-45 bg-ai" /> <span className="text-muted">AI</span> {show.ai ? <b className="tabular-nums">{fmtShort(item, marks.ai)}</b> : hidden}</li>
      <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-learner" /> <span className="text-muted">{who}, final</span> {show.final ? <b className="tabular-nums">{fmtShort(item, marks.final)}</b> : hidden}</li>
      <li className="flex items-center gap-2"><span className="h-3.5 w-1 rounded bg-truth" /> <span className="text-muted">Truth</span> {show.truth ? <b className="tabular-nums text-truth">{fmtShort(item, item.groundTruth.answer)}</b> : hidden}</li>
    </ul>
  );
}

const fmtShort = (item: Item, a: Answer) => (item.question.kind === "numeric" ? String(a) : formatAnswer(item, a));

function OptionGrid({ item, marks, compact, show, who }: { item: Item; marks: Marks; compact: boolean; show: Reveal; who: string }) {
  const q = item.question as Extract<Item["question"], { kind: "choice" }>;
  return (
    <ul className={compact ? "space-y-1" : "space-y-2"}>
      {q.options.map((o) => {
        const isTruth = show.truth && o.id === item.groundTruth.answer;
        return (
          <li key={o.id}
            className={`flex flex-wrap items-center gap-2 rounded-lg border transition-colors duration-300 ${compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"} ${isTruth ? "border-truth/40 bg-truth-wash" : "border-line bg-card"}`}>
            <span className={`flex-1 min-w-[10rem] ${isTruth ? "font-medium" : "text-muted"}`}>{o.label}</span>
            {show.initial && marks.initial === o.id && <Chip kind="initial" who={who} />}
            {show.ai && marks.ai === o.id && <Chip kind="ai" who={who} />}
            {show.final && marks.final === o.id && <Chip kind="final" who={who} />}
            {isTruth && <Chip kind="truth" who={who} />}
          </li>
        );
      })}
    </ul>
  );
}

function Chip({ kind, who }: { kind: "initial" | "ai" | "final" | "truth"; who: string }) {
  const cfg = {
    initial: [`${who}, first`, "border border-learner text-learner bg-white"],
    ai: ["AI", "bg-ai text-white"],
    final: [`${who}, final`, "bg-learner text-white"],
    truth: ["✓ Truth", "bg-truth text-white"],
  }[kind];
  return (
    <motion.span {...pop} className={`rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap ${cfg[1]}`}>{cfg[0]}</motion.span>
  );
}
