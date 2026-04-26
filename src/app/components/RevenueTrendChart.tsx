"use client";

import { useState, useMemo } from "react";
import {
  ComposedChart,
  Area, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
  ResponsiveContainer, Cell,
} from "recharts";

/* ─── types ─────────────────────────────────────────────── */
type Point = { month: string; value: number };

interface Props {
  actualData?:    Point[];
  budgetData?:    Point[];
  forecastData?:  Point[];
  priorYearData?: Point[];
}

type SeriesKey = "actual" | "budget" | "forecast" | "priorYear" | "rollingAvg";
type RangeKey  = "3M" | "6M" | "12M" | "15M";
type ChartType = "area" | "line" | "bar";

/* ─── placeholder data ──────────────────────────────────── */
const ACTUAL_DEFAULT: Point[] = [
  { month: "Jan 24", value: 3120 }, { month: "Feb 24", value: 3280 },
  { month: "Mar 24", value: 3490 }, { month: "Apr 24", value: 3350 },
  { month: "May 24", value: 3620 }, { month: "Jun 24", value: 3780 },
  { month: "Jul 24", value: 3690 }, { month: "Aug 24", value: 3850 },
  { month: "Sep 24", value: 4040 }, { month: "Oct 24", value: 4120 },
  { month: "Nov 24", value: 4250 }, { month: "Dec 24", value: 4080 },
  { month: "Jan 25", value: 4190 }, { month: "Feb 25", value: 4320 },
  { month: "Mar 25", value: 4490 },
];

const BUDGET_DEFAULT: Point[] = [
  { month: "Jan 24", value: 3200 }, { month: "Feb 24", value: 3300 },
  { month: "Mar 24", value: 3400 }, { month: "Apr 24", value: 3500 },
  { month: "May 24", value: 3600 }, { month: "Jun 24", value: 3700 },
  { month: "Jul 24", value: 3800 }, { month: "Aug 24", value: 3900 },
  { month: "Sep 24", value: 4000 }, { month: "Oct 24", value: 4100 },
  { month: "Nov 24", value: 4200 }, { month: "Dec 24", value: 4300 },
  { month: "Jan 25", value: 4300 }, { month: "Feb 25", value: 4400 },
  { month: "Mar 25", value: 4500 },
];

const FORECAST_DEFAULT: Point[] = [
  { month: "Jan 25", value: 4180 },
  { month: "Feb 25", value: 4310 },
  { month: "Mar 25", value: 4520 },
];

const PRIOR_YEAR_DEFAULT: Point[] = [
  { month: "Jan 24", value: 2640 }, { month: "Feb 24", value: 2780 },
  { month: "Mar 24", value: 2950 }, { month: "Apr 24", value: 2840 },
  { month: "May 24", value: 3060 }, { month: "Jun 24", value: 3180 },
  { month: "Jul 24", value: 3090 }, { month: "Aug 24", value: 3240 },
  { month: "Sep 24", value: 3400 }, { month: "Oct 24", value: 3470 },
  { month: "Nov 24", value: 3580 }, { month: "Dec 24", value: 3430 },
  { month: "Jan 25", value: 3540 }, { month: "Feb 25", value: 3640 },
  { month: "Mar 25", value: 3790 },
];

/* ─── helpers ───────────────────────────────────────────── */
function rollingAvg(data: Point[], window = 3): Point[] {
  return data.map((d, i) => {
    if (i < window - 1) return { month: d.month, value: NaN };
    const slice = data.slice(i - window + 1, i + 1);
    const avg = slice.reduce((s, p) => s + p.value, 0) / window;
    return { month: d.month, value: Math.round(avg) };
  });
}

function fmt(v: number) { return `£${(v / 1000).toFixed(1)}m`; }

/* ─── series palette ─────────────────────────────────────── */
const C = {
  actual:     "#6ee7b7",
  budget:     "#60a5fa",
  forecast:   "#f59e0b",
  priorYear:  "#8898c4",
  rollingAvg: "#e879f9",
  grid:       "rgba(255,255,255,0.04)",
  tick:       "#5a6a9a",
};

/* ─── tooltips ──────────────────────────────────────────── */
function ChartTip({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const visible = payload.filter(p => typeof p.value === "number" && !isNaN(p.value));
  if (!visible.length) return null;
  return (
    <div style={{ background: "#1e2d5a", borderRadius: 8, padding: "10px 14px", fontSize: 11, minWidth: 160 }}>
      <p style={{ color: "#fff", fontWeight: 500, fontSize: 12, marginBottom: 8, marginTop: 0 }}>{label}</p>
      {visible.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < visible.length - 1 ? 5 : 0 }}>
          <span style={{ width: 3, height: 12, borderRadius: 1, background: p.color, flexShrink: 0 }} />
          <span style={{ color: "#8898c4", flex: 1, fontSize: 11 }}>{p.name}</span>
          <span style={{ color: "#fff", fontWeight: 500, fontSize: 11, marginLeft: 8 }}>{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

function VarianceTip({ active, payload, label }: {
  active?: boolean; payload?: { value: number }[]; label?: string;
}) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value ?? 0;
  const col = v >= 0 ? "#6ee7b7" : "#f87171";
  return (
    <div style={{ background: "#1e2d5a", borderRadius: 8, padding: "10px 14px", fontSize: 11, minWidth: 160 }}>
      <p style={{ color: "#fff", fontWeight: 500, fontSize: 12, marginBottom: 8, marginTop: 0 }}>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 12, borderRadius: 1, background: col, flexShrink: 0 }} />
        <span style={{ color: "#8898c4", flex: 1 }}>vs Budget</span>
        <span style={{ color: col, fontWeight: 500, marginLeft: 8 }}>{v >= 0 ? "+" : ""}{fmt(v)}</span>
      </div>
    </div>
  );
}

/* ─── pill button ────────────────────────────────────────── */
function Pill({
  active, onClick, children, accent = "#6382ff", danger = false,
}: {
  active: boolean; onClick: () => void; children: React.ReactNode;
  accent?: string; danger?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const activeBg    = danger ? "rgba(248,113,113,0.15)" : `${accent}28`;
  const activeBorder= danger ? "rgba(248,113,113,0.5)"  : `${accent}80`;
  const activeColor = danger ? "#fca5a5"                : "#fff";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "4px 11px", borderRadius: 20, fontSize: 10, fontWeight: 600,
        letterSpacing: "0.07em", textTransform: "uppercase" as const,
        cursor: "pointer", transition: "all 0.12s", lineHeight: 1.3,
        background: active ? activeBg : hovered ? "rgba(255,255,255,0.05)" : "transparent",
        color: active ? activeColor : "#8898c4",
        border: `1px solid ${active ? activeBorder : "rgba(255,255,255,0.12)"}`,
        outline: "none",
      }}
    >
      {children}
    </button>
  );
}

/* ─── insight banner ─────────────────────────────────────── */
function InsightBanner({ actual, budget, priorYear }: {
  actual: Point[]; budget: Point[]; priorYear: Point[];
}) {
  const latest  = actual[actual.length - 1];
  const prev    = actual[actual.length - 2];
  const budPt   = budget.find(d => d.month === latest?.month);
  const priorPt = priorYear.find(d => d.month === latest?.month);
  if (!latest) return null;

  const momPct  = prev    ? ((latest.value - prev.value)    / prev.value    * 100).toFixed(1) : null;
  const budVar  = budPt   ? latest.value - budPt.value : null;
  const yoyPct  = priorPt ? ((latest.value - priorPt.value) / priorPt.value * 100).toFixed(1) : null;

  const insights: { text: string; color: string }[] = [];
  if (momPct) insights.push({
    text: `${latest.month}: ${fmt(latest.value)} — ${+momPct >= 0 ? "+" : ""}${momPct}% MoM`,
    color: +momPct >= 0 ? "#6ee7b7" : "#f87171",
  });
  if (yoyPct) insights.push({
    text: `${+yoyPct >= 0 ? "+" : ""}${yoyPct}% vs same month last year`,
    color: +yoyPct >= 0 ? "#6ee7b7" : "#f87171",
  });
  if (budVar !== null) insights.push({
    text: `${budVar >= 0 ? "+" : ""}${fmt(budVar)} vs budget`,
    color: budVar >= 0 ? "#60a5fa" : "#f87171",
  });

  return (
    <div style={{
      display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14,
      padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
    }}>
      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a6a9a", marginRight: 4 }}>
        Snapshot
      </span>
      {insights.map((ins, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <span style={{ color: "rgba(255,255,255,0.12)", fontSize: 11 }}>·</span>}
          <span style={{ fontSize: 11, color: ins.color, fontWeight: 500 }}>{ins.text}</span>
        </span>
      ))}
    </div>
  );
}

/* ─── controls ───────────────────────────────────────────── */
const SERIES_DEFS: { key: SeriesKey; label: string; color: string }[] = [
  { key: "actual",     label: "Actual",      color: C.actual     },
  { key: "budget",     label: "Budget",      color: C.budget     },
  { key: "forecast",   label: "Forecast",    color: C.forecast   },
  { key: "priorYear",  label: "Prior Year",  color: C.priorYear  },
  { key: "rollingAvg", label: "Rolling Avg", color: C.rollingAvg },
];

const RANGES: RangeKey[]  = ["3M", "6M", "12M", "15M"];
const CHART_TYPES: { id: ChartType; label: string }[] = [
  { id: "area", label: "∿ Area"    },
  { id: "line", label: "— Line"    },
  { id: "bar",  label: "▊ Columns" },
];

function Controls({
  series, toggle, range, setRange, chartType, setChartType, variance, setVariance,
}: {
  series: Record<SeriesKey, boolean>;
  toggle: (k: SeriesKey) => void;
  range: RangeKey; setRange: (r: RangeKey) => void;
  chartType: ChartType; setChartType: (t: ChartType) => void;
  variance: boolean; setVariance: (v: boolean) => void;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a6a9a" }}>
            Revenue Trend
          </span>
          <span style={{ fontSize: 10, color: "#8898c4", marginLeft: 10 }}>
            Toggle series · choose range · switch view
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span className="animate-pulse" style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ee7b7", display: "inline-block" }} />
          <span style={{ fontSize: 11, color: "#8898c4" }}>Q1 FY2025 · Live</span>
        </div>
      </div>

      {/* series toggles + variance */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5a6a9a", marginRight: 2 }}>
            Series:
          </span>
          {SERIES_DEFS.map(s => (
            <Pill key={s.key} active={series[s.key]} onClick={() => toggle(s.key)} accent={s.color}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, display: "inline-block", flexShrink: 0 }} />
                {s.label}
              </span>
            </Pill>
          ))}
        </div>
        <Pill active={variance} onClick={() => setVariance(!variance)} danger>
          ⇅ Variance
        </Pill>
      </div>

      {/* range + chart type */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5a6a9a", marginRight: 2 }}>
            Range:
          </span>
          {RANGES.map(r => (
            <Pill key={r} active={range === r} onClick={() => setRange(r)}>{r}</Pill>
          ))}
        </div>
        {!variance && (
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5a6a9a", marginRight: 2 }}>
              View:
            </span>
            {CHART_TYPES.map(t => (
              <Pill key={t.id} active={chartType === t.id} onClick={() => setChartType(t.id)}>{t.label}</Pill>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── main component ─────────────────────────────────────── */
export default function RevenueTrendChart({
  actualData    = ACTUAL_DEFAULT,
  budgetData    = BUDGET_DEFAULT,
  forecastData  = FORECAST_DEFAULT,
  priorYearData = PRIOR_YEAR_DEFAULT,
}: Props) {
  const [series, setSeries]       = useState<Record<SeriesKey, boolean>>({
    actual: true, budget: true, forecast: true, priorYear: false, rollingAvg: false,
  });
  const [range, setRange]         = useState<RangeKey>("15M");
  const [chartType, setChartType] = useState<ChartType>("area");
  const [variance, setVariance]   = useState(false);

  const rangeMap: Record<RangeKey, number> = { "3M": 3, "6M": 6, "12M": 12, "15M": 15 };
  const forecastMonths = useMemo(() => new Set(forecastData.map(d => d.month)), [forecastData]);
  const rollingData    = useMemo(() => rollingAvg(actualData), [actualData]);
  const allMonths      = useMemo(() => actualData.map(d => d.month), [actualData]);

  const visibleMonths = useMemo(() => allMonths.slice(-rangeMap[range]), [allMonths, range]);

  const forecastStart = useMemo(
    () => visibleMonths.find(m => forecastMonths.has(m)) ?? null,
    [visibleMonths, forecastMonths],
  );

  const chartData = useMemo(() => {
    const budgetMap   = Object.fromEntries(budgetData.map(d => [d.month, d.value]));
    const forecastMap = Object.fromEntries(forecastData.map(d => [d.month, d.value]));
    const priorMap    = Object.fromEntries(priorYearData.map(d => [d.month, d.value]));
    const rollingMap  = Object.fromEntries(rollingData.map(d => [d.month, d.value]));
    return visibleMonths.map(m => {
      const act = actualData.find(d => d.month === m)?.value ?? NaN;
      return {
        month:      m,
        actual:     forecastMonths.has(m) ? NaN : act,
        budget:     budgetMap[m]   ?? NaN,
        forecast:   forecastMap[m] ?? NaN,
        priorYear:  priorMap[m]    ?? NaN,
        rollingAvg: rollingMap[m]  ?? NaN,
      };
    });
  }, [visibleMonths, actualData, budgetData, forecastData, priorYearData, rollingData, forecastMonths]);

  const varianceData = useMemo(() => {
    const budgetMap = Object.fromEntries(budgetData.map(d => [d.month, d.value]));
    return visibleMonths.map(m => {
      const act = actualData.find(d => d.month === m)?.value ?? 0;
      return { month: m, variance: act - (budgetMap[m] ?? 0) };
    });
  }, [visibleMonths, actualData, budgetData]);

  const toggle = (k: SeriesKey) => setSeries(prev => ({ ...prev, [k]: !prev[k] }));

  const xTick  = { fill: C.tick, fontSize: 11 };
  const yTick  = { fill: C.tick, fontSize: 11 };
  const margin = { top: 10, right: 56, bottom: 0, left: 0 };
  const gridEl = <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />;
  const xAxis  = <XAxis dataKey="month" tick={xTick} axisLine={false} tickLine={false} />;
  const yAxis  = <YAxis orientation="right" tick={yTick} axisLine={false} tickLine={false} tickFormatter={v => fmt(v)} width={52} />;

  const forecastLabel = ({ viewBox }: { viewBox?: { x?: number; y?: number } }) => (
    <text x={(viewBox?.x ?? 0) + 5} y={(viewBox?.y ?? 0) + 13} fill="#5a6a9a" fontSize={10} fontFamily="inherit">
      Forecast →
    </text>
  );

  const forecastLine = forecastStart ? (
    <ReferenceLine x={forecastStart} stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" strokeWidth={1} label={forecastLabel} />
  ) : null;

  const sharedLines = (
    <>
      {series.priorYear  && <Line type="monotone" dataKey="priorYear"  name="Prior Year"  stroke={C.priorYear}  strokeWidth={1}   strokeOpacity={0.5} dot={false} connectNulls isAnimationActive animationDuration={1000} legendType="none" />}
      {series.budget     && <Line type="monotone" dataKey="budget"     name="Budget"      stroke={C.budget}     strokeWidth={1.5} dot={false} connectNulls isAnimationActive animationDuration={1000} legendType="none" />}
      {series.forecast   && <Line type="monotone" dataKey="forecast"   name="Forecast"    stroke={C.forecast}   strokeWidth={1.5} strokeDasharray="4 4" dot={false} connectNulls isAnimationActive animationDuration={1000} legendType="none" />}
      {series.rollingAvg && <Line type="monotone" dataKey="rollingAvg" name="Rolling Avg" stroke={C.rollingAvg} strokeWidth={1.5} dot={false} connectNulls isAnimationActive animationDuration={1000} legendType="none" />}
    </>
  );

  return (
    <div style={{ padding: 0 }}>
      <Controls
        series={series} toggle={toggle}
        range={range} setRange={setRange}
        chartType={chartType} setChartType={setChartType}
        variance={variance} setVariance={setVariance}
      />
      <InsightBanner actual={actualData} budget={budgetData} priorYear={priorYearData} />

      {variance ? (
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={varianceData} margin={margin} barSize={14}>
            {gridEl}{xAxis}{yAxis}
            <Tooltip content={<VarianceTip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            <Bar dataKey="variance" name="Variance" radius={[3, 3, 0, 0]} isAnimationActive animationDuration={900} legendType="none">
              {varianceData.map((d, i) => <Cell key={i} fill={d.variance >= 0 ? "#6ee7b7" : "#f87171"} />)}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      ) : chartType === "bar" ? (
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={chartData} margin={margin} barSize={12}>
            {gridEl}{xAxis}{yAxis}
            <Tooltip content={<ChartTip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            {forecastLine}
            {series.actual && <Bar dataKey="actual" name="Actual" fill={C.actual} radius={[3, 3, 0, 0]} isAnimationActive animationDuration={900} legendType="none" />}
            {sharedLines}
          </ComposedChart>
        </ResponsiveContainer>
      ) : chartType === "line" ? (
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={chartData} margin={margin}>
            {gridEl}{xAxis}{yAxis}
            <Tooltip content={<ChartTip />} cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }} />
            {forecastLine}
            {series.actual && <Line type="monotone" dataKey="actual" name="Actual" stroke={C.actual} strokeWidth={2.5} dot={false} connectNulls isAnimationActive animationDuration={1200} legendType="none" />}
            {sharedLines}
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={chartData} margin={margin}>
            <defs>
              <linearGradient id="rtcActualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.actual} stopOpacity={0.22} />
                <stop offset="100%" stopColor={C.actual} stopOpacity={0} />
              </linearGradient>
            </defs>
            {gridEl}{xAxis}{yAxis}
            <Tooltip content={<ChartTip />} cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }} />
            {forecastLine}
            {series.actual && (
              <Area type="monotone" dataKey="actual" name="Actual" stroke={C.actual} strokeWidth={2.5}
                fill="url(#rtcActualGrad)" dot={false} connectNulls isAnimationActive animationDuration={1200} legendType="none" />
            )}
            {sharedLines}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
