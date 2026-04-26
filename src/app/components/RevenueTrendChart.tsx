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

const FORECAST_DEFAULT: Point[] = [
  { month: "Jan 25", value: 4180 },
  { month: "Feb 25", value: 4310 },
  { month: "Mar 25", value: 4520 },
];

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

/* ─── tooltip ───────────────────────────────────────────── */
function ChartTip({
  active, payload, label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const visible = payload.filter(p => typeof p.value === "number" && !isNaN(p.value));
  if (!visible.length) return null;
  return (
    <div style={{
      background: "#1e2d5a",
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 11,
      minWidth: 160,
    }}>
      <p style={{ color: "#ffffff", fontWeight: 500, fontSize: 12, marginBottom: 8, marginTop: 0 }}>
        {label}
      </p>
      {visible.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < visible.length - 1 ? 5 : 0 }}>
          <span style={{ width: 3, height: 12, borderRadius: 1, background: p.color, flexShrink: 0 }} />
          <span style={{ color: "#8898c4", flex: 1, fontSize: 11 }}>{p.name}</span>
          <span style={{ color: "#ffffff", fontWeight: 500, fontSize: 11, marginLeft: 8 }}>{fmt(p.value)}</span>
        </div>
      ))}
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
  const col = v >= 0 ? "#6ee7b7" : "#f87171";
  return (
    <div style={{
      background: "#1e2d5a",
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 11,
      minWidth: 160,
    }}>
      <p style={{ color: "#ffffff", fontWeight: 500, fontSize: 12, marginBottom: 8, marginTop: 0 }}>
        {label}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 3, height: 12, borderRadius: 1, background: col, flexShrink: 0 }} />
        <span style={{ color: "#8898c4", flex: 1 }}>vs Budget</span>
        <span style={{ color: col, fontWeight: 500, marginLeft: 8 }}>
          {v >= 0 ? "+" : ""}{fmt(v)}
        </span>
      </div>
    </div>
  );
}

/* ─── toggle button ─────────────────────────────────────── */
type BtnVariant = "series" | "range" | "chartType" | "variance";

function Btn({
  active,
  onClick,
  children,
  variant = "range",
  seriesColor,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: BtnVariant;
  seriesColor?: string;
}) {
  const [hovered, setHovered] = useState(false);

  let bg = "transparent";
  let borderColor = "rgba(255,255,255,0.12)";
  let color = "#8898c4";
  let borderBottom = "0.5px solid rgba(255,255,255,0.12)";
  let borderTop = "0.5px solid rgba(255,255,255,0.12)";
  let borderLeft = "0.5px solid rgba(255,255,255,0.12)";
  let borderRight = "0.5px solid rgba(255,255,255,0.12)";

  if (hovered && !active) {
    bg = "rgba(255,255,255,0.05)";
  }

  if (active) {
    if (variant === "variance") {
      bg = "rgba(248,113,113,0.15)";
      borderColor = "rgba(248,113,113,0.5)";
      color = "#fca5a5";
      borderTop = `0.5px solid ${borderColor}`;
      borderLeft = `0.5px solid ${borderColor}`;
      borderRight = `0.5px solid ${borderColor}`;
      borderBottom = `0.5px solid ${borderColor}`;
    } else if (variant === "series" && seriesColor) {
      bg = "rgba(99,130,255,0.2)";
      color = "#ffffff";
      borderTop = "0.5px solid rgba(99,130,255,0.5)";
      borderLeft = "0.5px solid rgba(99,130,255,0.5)";
      borderRight = "0.5px solid rgba(99,130,255,0.5)";
      borderBottom = `3px solid ${seriesColor}`;
    } else {
      bg = "rgba(99,130,255,0.2)";
      borderColor = "rgba(99,130,255,0.5)";
      color = "#ffffff";
      borderTop = `0.5px solid ${borderColor}`;
      borderLeft = `0.5px solid ${borderColor}`;
      borderRight = `0.5px solid ${borderColor}`;
      borderBottom = `0.5px solid ${borderColor}`;
    }
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "5px 12px",
        borderRadius: 20,
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        cursor: "pointer",
        transition: "background 0.12s, color 0.12s",
        background: bg,
        color,
        borderTop,
        borderLeft,
        borderRight,
        borderBottom,
        outline: "none",
        boxShadow: "none",
        lineHeight: 1.2,
      }}
    >
      {children}
    </button>
  );
}

/* ─── header / controls ─────────────────────────────────── */
const SERIES_DEFS: { key: SeriesKey; label: string; color: string }[] = [
  { key: "actual",     label: "Actual",      color: C.actual     },
  { key: "budget",     label: "Budget",      color: C.budget     },
  { key: "forecast",   label: "Forecast",    color: C.forecast   },
  { key: "priorYear",  label: "Prior Year",  color: C.priorYear  },
  { key: "rollingAvg", label: "Rolling Avg", color: C.rollingAvg },
];

const RANGES: RangeKey[]  = ["3M", "6M", "12M", "15M"];
const TYPES: ChartType[]  = ["area", "line", "bar"];

function Controls({
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
  return (
    <div style={{ marginBottom: 12 }}>
      {/* section header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a6a9a" }}>
          Revenue Trend
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span
            className="animate-pulse"
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ee7b7", display: "inline-block", flexShrink: 0 }}
          />
          <span style={{ fontSize: 11, color: "#8898c4" }}>Q1 FY2025 · Live</span>
        </div>
      </div>

      {/* row 1: series toggles left, variance right */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {SERIES_DEFS.map(s => (
            <Btn
              key={s.key}
              active={series[s.key]}
              onClick={() => toggle(s.key)}
              variant="series"
              seriesColor={s.color}
            >
              {s.label}
            </Btn>
          ))}
        </div>
        <Btn active={variance} onClick={() => setVariance(!variance)} variant="variance">
          Variance View
        </Btn>
      </div>

      {/* row 2: range left, chart type right */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {RANGES.map(r => (
            <Btn key={r} active={range === r} onClick={() => setRange(r)} variant="range">
              {r}
            </Btn>
          ))}
        </div>
        {!variance && (
          <div style={{ display: "flex", gap: 6 }}>
            {TYPES.map(t => (
              <Btn key={t} active={chartType === t} onClick={() => setChartType(t)} variant="chartType">
                {t}
              </Btn>
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

  const visibleMonths = useMemo(() => {
    const n = rangeMap[range];
    return allMonths.slice(-n);
  }, [allMonths, range]);

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
      const bud = budgetMap[m] ?? 0;
      return { month: m, variance: act - bud };
    });
  }, [visibleMonths, actualData, budgetData]);

  const toggle = (k: SeriesKey) =>
    setSeries(prev => ({ ...prev, [k]: !prev[k] }));

  /* shared axis/grid props */
  const xTick   = { fill: C.tick, fontSize: 11 };
  const yTick   = { fill: C.tick, fontSize: 11 };
  const margin  = { top: 10, right: 56, bottom: 0, left: 0 };
  const gridEl  = <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false} />;
  const xAxis   = <XAxis dataKey="month" tick={xTick} axisLine={false} tickLine={false} />;
  const yAxis   = (
    <YAxis
      orientation="right"
      tick={yTick}
      axisLine={false}
      tickLine={false}
      tickFormatter={v => fmt(v)}
      width={52}
    />
  );

  /* forecast boundary label renderer */
  const forecastLabel = ({ viewBox }: { viewBox?: { x?: number; y?: number } }) => {
    const x = viewBox?.x ?? 0;
    const y = viewBox?.y ?? 0;
    return (
      <text x={x + 5} y={y + 13} fill="#5a6a9a" fontSize={10} fontFamily="inherit">
        Forecast →
      </text>
    );
  };

  const forecastLine = forecastStart ? (
    <ReferenceLine
      x={forecastStart}
      stroke="rgba(255,255,255,0.15)"
      strokeDasharray="3 3"
      strokeWidth={1}
      label={forecastLabel}
    />
  ) : null;

  /* shared non-actual lines */
  const sharedLines = (
    <>
      {series.priorYear && (
        <Line
          type="monotone"
          dataKey="priorYear"
          name="Prior Year"
          stroke={C.priorYear}
          strokeWidth={1}
          strokeOpacity={0.5}
          dot={false}
          connectNulls
          isAnimationActive
          animationDuration={1000}
          legendType="none"
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
          legendType="none"
        />
      )}
      {series.forecast && (
        <Line
          type="monotone"
          dataKey="forecast"
          name="Forecast"
          stroke={C.forecast}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          dot={false}
          connectNulls
          isAnimationActive
          animationDuration={1000}
          legendType="none"
        />
      )}
      {series.rollingAvg && (
        <Line
          type="monotone"
          dataKey="rollingAvg"
          name="Rolling Avg"
          stroke={C.rollingAvg}
          strokeWidth={1.5}
          dot={false}
          connectNulls
          isAnimationActive
          animationDuration={1000}
          legendType="none"
        />
      )}
    </>
  );

  return (
    <div style={{ background: "#0d1530", borderRadius: 12, padding: "28px 32px" }}>
      <Controls
        series={series} toggle={toggle}
        range={range} setRange={setRange}
        chartType={chartType} setChartType={setChartType}
        variance={variance} setVariance={setVariance}
      />

      {/* ── variance view ── */}
      {variance ? (
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={varianceData} margin={margin} barSize={14}>
            {gridEl}{xAxis}{yAxis}
            <Tooltip content={<VarianceTip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            <Bar dataKey="variance" name="Variance" radius={[3, 3, 0, 0]} isAnimationActive animationDuration={900} legendType="none">
              {varianceData.map((d, i) => (
                <Cell key={i} fill={d.variance >= 0 ? "#6ee7b7" : "#f87171"} />
              ))}
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      ) : chartType === "bar" ? (
        /* ── bar mode ── */
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={chartData} margin={margin} barSize={12}>
            {gridEl}{xAxis}{yAxis}
            <Tooltip content={<ChartTip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            {forecastLine}
            {series.actual && (
              <Bar dataKey="actual" name="Actual" fill={C.actual} radius={[3, 3, 0, 0]} isAnimationActive animationDuration={900} legendType="none" />
            )}
            {sharedLines}
          </ComposedChart>
        </ResponsiveContainer>
      ) : chartType === "line" ? (
        /* ── line mode ── */
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={chartData} margin={margin}>
            {gridEl}{xAxis}{yAxis}
            <Tooltip content={<ChartTip />} cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }} />
            {forecastLine}
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
                legendType="none"
              />
            )}
            {sharedLines}
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        /* ── area mode (default) ── */
        <ResponsiveContainer width="100%" height={280}>
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
                legendType="none"
              />
            )}
            {sharedLines}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
