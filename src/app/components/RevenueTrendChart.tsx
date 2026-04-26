"use client";

import { useState, useMemo } from "react";
import {
  ComposedChart, AreaChart, BarChart,
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

type SeriesKey   = "actual" | "budget" | "forecast" | "priorYear" | "rollingAvg";
type RangeKey    = "3M" | "6M" | "12M" | "15M";
type ChartType   = "area" | "line" | "bar";

/* ─── placeholder data ──────────────────────────────────── */
// Jan 2024 – Mar 2025  (15 months)
const ACTUAL_DEFAULT: Point[] = [
  { month: "Jan 24", value: 3120 },
  { month: "Feb 24", value: 3280 },
  { month: "Mar 24", value: 3490 },
  { month: "Apr 24", value: 3350 },
  { month: "May 24", value: 3620 },
  { month: "Jun 24", value: 3780 },
  { month: "Jul 24", value: 3690 },
  { month: "Aug 24", value: 3850 },
  { month: "Sep 24", value: 4040 },
  { month: "Oct 24", value: 4120 },
  { month: "Nov 24", value: 4250 },
  { month: "Dec 24", value: 4080 },
  { month: "Jan 25", value: 4190 },
  { month: "Feb 25", value: 4320 },
  { month: "Mar 25", value: 4490 },
];

const BUDGET_DEFAULT: Point[] = [
  { month: "Jan 24", value: 3200 },
  { month: "Feb 24", value: 3300 },
  { month: "Mar 24", value: 3400 },
  { month: "Apr 24", value: 3500 },
  { month: "May 24", value: 3600 },
  { month: "Jun 24", value: 3700 },
  { month: "Jul 24", value: 3800 },
  { month: "Aug 24", value: 3900 },
  { month: "Sep 24", value: 4000 },
  { month: "Oct 24", value: 4100 },
  { month: "Nov 24", value: 4200 },
  { month: "Dec 24", value: 4300 },
  { month: "Jan 25", value: 4300 },
  { month: "Feb 25", value: 4400 },
  { month: "Mar 25", value: 4500 },
];

// Forecast: Jan 25 onward (overlaps actuals for realism, extends 3 months)
const FORECAST_DEFAULT: Point[] = [
  { month: "Jan 25", value: 4180 },
  { month: "Feb 25", value: 4310 },
  { month: "Mar 25", value: 4520 },
];

// Prior year: same axis (Jan 24 – Mar 25), offset 12 months from Jan 23 data
const PRIOR_YEAR_DEFAULT: Point[] = [
  { month: "Jan 24", value: 2640 },
  { month: "Feb 24", value: 2780 },
  { month: "Mar 24", value: 2950 },
  { month: "Apr 24", value: 2840 },
  { month: "May 24", value: 3060 },
  { month: "Jun 24", value: 3180 },
  { month: "Jul 24", value: 3090 },
  { month: "Aug 24", value: 3240 },
  { month: "Sep 24", value: 3400 },
  { month: "Oct 24", value: 3470 },
  { month: "Nov 24", value: 3580 },
  { month: "Dec 24", value: 3430 },
  { month: "Jan 25", value: 3540 },
  { month: "Feb 25", value: 3640 },
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

function fmt(v: number) {
  return `£${(v / 1000).toFixed(1)}m`;
}

/* ─── tooltip ───────────────────────────────────────────── */
function ChartTip({
  active, payload, label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#0d1530",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 11,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      <p style={{ color: "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 9, marginBottom: 8 }}>
        {label}
      </p>
      {payload.map((p, i) => {
        if (typeof p.value !== "number" || isNaN(p.value)) return null;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.45)", flex: 1 }}>{p.name}</span>
            <span style={{ color: "#fff", fontWeight: 700, marginLeft: 12 }}>{fmt(p.value)}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── variance tooltip ──────────────────────────────────── */
function VarianceTip({
  active, payload, label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value ?? 0;
  return (
    <div
      style={{
        background: "#0d1530",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 11,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      <p style={{ color: "rgba(255,255,255,0.35)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 9, marginBottom: 6 }}>
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: v >= 0 ? "#6ee7b7" : "#f87171", flexShrink: 0 }} />
        <span style={{ color: v >= 0 ? "#6ee7b7" : "#f87171", fontWeight: 700 }}>
          {v >= 0 ? "+" : ""}{fmt(v)} vs Budget
        </span>
      </div>
    </div>
  );
}

/* ─── toggle button ─────────────────────────────────────── */
function ToggleBtn({
  active,
  onClick,
  children,
  activeColor = "rgba(99,102,241,0.8)",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  activeColor?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "4px 11px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase" as const,
        cursor: "pointer",
        transition: "all 0.15s",
        border: active ? "0.5px solid transparent" : "0.5px solid rgba(255,255,255,0.18)",
        background: active ? activeColor : "transparent",
        color: active ? "#fff" : "rgba(255,255,255,0.38)",
        boxShadow: active ? `0 0 10px ${activeColor}55` : "none",
      }}
    >
      {children}
    </button>
  );
}

/* ─── main component ────────────────────────────────────── */
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

  // build unified monthly lookup
  const forecastMonths = useMemo(() => new Set(forecastData.map(d => d.month)), [forecastData]);

  const rollingData = useMemo(() => rollingAvg(actualData), [actualData]);

  const allMonths = useMemo(() => actualData.map(d => d.month), [actualData]);

  const visibleMonths = useMemo(() => {
    const n = rangeMap[range];
    return allMonths.slice(-n);
  }, [allMonths, range]);

  // find forecast boundary month
  const forecastStart = useMemo(() => {
    return visibleMonths.find(m => forecastMonths.has(m)) ?? null;
  }, [visibleMonths, forecastMonths]);

  // merge all series into one row array
  const chartData = useMemo(() => {
    const budgetMap    = Object.fromEntries(budgetData.map(d => [d.month, d.value]));
    const forecastMap  = Object.fromEntries(forecastData.map(d => [d.month, d.value]));
    const priorMap     = Object.fromEntries(priorYearData.map(d => [d.month, d.value]));
    const rollingMap   = Object.fromEntries(rollingData.map(d => [d.month, d.value]));

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

  // variance data
  const varianceData = useMemo(() => {
    const budgetMap = Object.fromEntries(budgetData.map(d => [d.month, d.value]));
    return visibleMonths.map(m => {
      const act = actualData.find(d => d.month === m)?.value ?? 0;
      const bud = budgetMap[m] ?? 0;
      return { month: m, variance: act - bud };
    });
  }, [visibleMonths, actualData, budgetData]);

  const toggle = (k: SeriesKey) =>
    setSeries(prev => ({ ...prev, [k]: !prev[k] }));

  /* palette */
  const C = {
    actual:     "#6366f1",
    budget:     "#8898c4",
    forecast:   "#06b6d4",
    priorYear:  "#ffffff",
    rollingAvg: "#6ee7b7",
    grid:       "rgba(255,255,255,0.05)",
    tick:       "rgba(255,255,255,0.22)",
  };

  const xTick = { fill: C.tick, fontSize: 9 };
  const yTick = { fill: C.tick, fontSize: 9 };
  const margin = { top: 8, right: 12, bottom: 0, left: 0 };

  /* ── variance view ── */
  if (variance) {
    return (
      <div style={{ background: "#0d1530", borderRadius: 12, padding: "20px 24px" }}>
        <Header
          series={series} toggle={toggle} range={range} setRange={setRange}
          chartType={chartType} setChartType={setChartType}
          variance={variance} setVariance={setVariance}
        />
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={varianceData} margin={margin} barSize={14}>
            <CartesianGrid strokeDasharray="2 4" stroke={C.grid} vertical={false} />
            <XAxis dataKey="month" tick={xTick} axisLine={false} tickLine={false} />
            <YAxis
              orientation="right"
              tick={yTick}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => fmt(v)}
              width={48}
            />
            <Tooltip content={<VarianceTip />} />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
            <Bar dataKey="variance" name="Variance" radius={[3, 3, 0, 0]} isAnimationActive animationDuration={900}>
              {varianceData.map((d, i) => (
                <Cell key={i} fill={d.variance >= 0 ? "#6ee7b7" : "#f87171"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  /* ── normal view ── */
  const commonAxes = (
    <>
      <CartesianGrid strokeDasharray="2 4" stroke={C.grid} vertical={false} />
      <XAxis dataKey="month" tick={xTick} axisLine={false} tickLine={false} />
      <YAxis
        orientation="right"
        tick={yTick}
        axisLine={false}
        tickLine={false}
        tickFormatter={v => fmt(v)}
        width={48}
      />
      <Tooltip content={<ChartTip />} />
      {forecastStart && (
        <ReferenceLine
          x={forecastStart}
          stroke="rgba(6,182,212,0.3)"
          strokeDasharray="4 4"
          strokeWidth={1}
        />
      )}
    </>
  );

  const sharedLines = (
    <>
      {series.priorYear && (
        <Line
          type="monotone"
          dataKey="priorYear"
          name="Prior Year"
          stroke={C.priorYear}
          strokeWidth={1.5}
          strokeOpacity={0.2}
          dot={false}
          connectNulls
          isAnimationActive
          animationDuration={1000}
        />
      )}
      {series.budget && (
        <Line
          type="monotone"
          dataKey="budget"
          name="Budget"
          stroke={C.budget}
          strokeWidth={1.5}
          dot={false}
          connectNulls
          isAnimationActive
          animationDuration={1000}
        />
      )}
      {series.forecast && (
        <Line
          type="monotone"
          dataKey="forecast"
          name="Forecast"
          stroke={C.forecast}
          strokeWidth={2}
          strokeDasharray="5 4"
          dot={false}
          connectNulls
          isAnimationActive
          animationDuration={1000}
        />
      )}
      {series.rollingAvg && (
        <Line
          type="monotone"
          dataKey="rollingAvg"
          name="3M Avg"
          stroke={C.rollingAvg}
          strokeWidth={1.5}
          dot={false}
          connectNulls
          isAnimationActive
          animationDuration={1000}
        />
      )}
    </>
  );

  return (
    <div style={{ background: "#0d1530", borderRadius: 12, padding: "20px 24px" }}>
      <Header
        series={series} toggle={toggle} range={range} setRange={setRange}
        chartType={chartType} setChartType={setChartType}
        variance={variance} setVariance={setVariance}
      />

      <ResponsiveContainer width="100%" height={220}>
        {chartType === "bar" && series.actual ? (
          <ComposedChart data={chartData} margin={margin} barSize={12}>
            {commonAxes}
            {series.actual && (
              <Bar dataKey="actual" name="Actual" fill={C.actual} radius={[3, 3, 0, 0]} isAnimationActive animationDuration={900} />
            )}
            {sharedLines}
          </ComposedChart>
        ) : chartType === "line" || !series.actual ? (
          <ComposedChart data={chartData} margin={margin}>
            {commonAxes}
            {series.actual && (
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke={C.actual}
                strokeWidth={2.5}
                dot={false}
                connectNulls
                isAnimationActive
                animationDuration={1200}
              />
            )}
            {sharedLines}
          </ComposedChart>
        ) : (
          /* area (default) */
          <ComposedChart data={chartData} margin={margin}>
            <defs>
              <linearGradient id="rtcActualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.actual} stopOpacity={0.35} />
                <stop offset="100%" stopColor={C.actual} stopOpacity={0} />
              </linearGradient>
            </defs>
            {commonAxes}
            {series.actual && (
              <Area
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke={C.actual}
                strokeWidth={2.5}
                fill="url(#rtcActualGrad)"
                dot={false}
                connectNulls
                isAnimationActive
                animationDuration={1200}
              />
            )}
            {sharedLines}
          </ComposedChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

/* ─── header / controls ─────────────────────────────────── */
function Header({
  series, toggle, range, setRange, chartType, setChartType, variance, setVariance,
}: {
  series: Record<SeriesKey, boolean>;
  toggle: (k: SeriesKey) => void;
  range: RangeKey;
  setRange: (r: RangeKey) => void;
  chartType: ChartType;
  setChartType: (t: ChartType) => void;
  variance: boolean;
  setVariance: (v: boolean) => void;
}) {
  const seriesDefs: { key: SeriesKey; label: string; color: string }[] = [
    { key: "actual",     label: "Actual",      color: "#6366f1" },
    { key: "budget",     label: "Budget",      color: "#8898c4" },
    { key: "forecast",   label: "Forecast",    color: "#06b6d4" },
    { key: "priorYear",  label: "Prior Year",  color: "rgba(255,255,255,0.5)" },
    { key: "rollingAvg", label: "Rolling Avg", color: "#6ee7b7" },
  ];

  const ranges: RangeKey[]   = ["3M", "6M", "12M", "15M"];
  const types: ChartType[]   = ["area", "line", "bar"];

  return (
    <div style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 10 }}>
      {/* title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", margin: 0 }}>
          Revenue Trend
        </p>
        {/* variance toggle */}
        <ToggleBtn
          active={variance}
          onClick={() => setVariance(!variance)}
          activeColor="#1e3a5f"
        >
          Variance View
        </ToggleBtn>
      </div>

      {/* series + range + chart type */}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
        {/* series toggles */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {seriesDefs.map(s => (
            <ToggleBtn
              key={s.key}
              active={series[s.key]}
              onClick={() => toggle(s.key)}
              activeColor={s.color}
            >
              {s.label}
            </ToggleBtn>
          ))}
        </div>

        <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.1)", margin: "0 4px", flexShrink: 0 }} />

        {/* range */}
        <div style={{ display: "flex", gap: 3 }}>
          {ranges.map(r => (
            <ToggleBtn key={r} active={range === r} onClick={() => setRange(r)}>
              {r}
            </ToggleBtn>
          ))}
        </div>

        {!variance && (
          <>
            <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.1)", margin: "0 4px", flexShrink: 0 }} />
            {/* chart type */}
            <div style={{ display: "flex", gap: 3 }}>
              {types.map(t => (
                <ToggleBtn key={t} active={chartType === t} onClick={() => setChartType(t)}>
                  {t}
                </ToggleBtn>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
