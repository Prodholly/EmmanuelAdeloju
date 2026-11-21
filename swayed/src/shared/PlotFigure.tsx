import { useEffect, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";

/** Spreads end-of-line labels apart so they never overlap (values on the y scale). */
export function dodge<T extends { trust: number }>(rows: T[], gap: number): (T & { labelY: number })[] {
  const sorted = [...rows].sort((a, b) => a.trust - b.trust).map((r) => ({ ...r, labelY: r.trust }));
  for (let i = 1; i < sorted.length; i++)
    if (sorted[i].labelY - sorted[i - 1].labelY < gap) sorted[i].labelY = sorted[i - 1].labelY + gap;
  return sorted;
}

/** Renders an Observable Plot chart that resizes with its container. */
export function PlotFigure({
  make,
  height,
  className,
  label,
}: {
  /** builds plot options for a given width */
  make: (width: number) => Plot.PlotOptions;
  height?: number;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current!;
    const ro = new ResizeObserver(([e]) => setWidth(Math.floor(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!width) return;
    const chart = Plot.plot({
      width: Math.max(width, 260),
      height,
      style: { fontFamily: "var(--font-sans)", fontSize: "12px", color: "#5b5e66", background: "transparent", overflow: "visible" },
      ...make(width),
    });
    ref.current!.replaceChildren(chart);
    return () => chart.remove();
  }, [make, width, height]);

  return <div ref={ref} className={className} role="img" aria-label={label} />;
}
