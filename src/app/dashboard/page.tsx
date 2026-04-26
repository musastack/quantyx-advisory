"use client";

import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, ComposedChart,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell, CartesianGrid, LineChart, Line,
} from "recharts";
import { Download, ChevronRight, ArrowUpRight, ArrowDownRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import RevenueTrendChart from "../components/RevenueTrendChart";

/* ═══════════════════════════════════════════════════════════
   MERIDIAN ADVISORY PARTNERS  ·  Q1 FY2025
═══════════════════════════════════════════════════════════ */

// 15 months Jan 24 → Mar 25
const monthly = [
  { m: "Jan 24", rev: 3120, ebitda: 24.1, budget: 3200 },
  { m: "Feb 24", rev: 3280, ebitda: 25.4, budget: 3300 },
  { m: "Mar 24", rev: 3490, ebitda: 26.8, budget: 3400 },
  { m: "Apr 24", rev: 3350, ebitda: 24.9, budget: 3500 },
  { m: "May 24", rev: 3620, ebitda: 27.2, budget: 3600 },
  { m: "Jun 24", rev: 3780, ebitda: 28.1, budget: 3700 },
  { m: "Jul 24", rev: 3690, ebitda: 27.0, budget: 3800 },
  { m: "Aug 24", rev: 3850, ebitda: 28.8, budget: 3900 },
  { m: "Sep 24", rev: 4040, ebitda: 29.4, budget: 4000 },
  { m: "Oct 24", rev: 4120, ebitda: 30.1, budget: 4100 },
  { m: "Nov 24", rev: 4250, ebitda: 31.0, budget: 4200 },
  { m: "Dec 24", rev: 4080, ebitda: 28.6, budget: 4300 },
  { m: "Jan 25", rev: 4190, ebitda: 30.4, budget: 4300 },
  { m: "Feb 25", rev: 4320, ebitda: 31.2, budget: 4400 },
  { m: "Mar 25", rev: 4490, ebitda: 32.1, budget: 4500 },
];

// Service lines
const services = [
  { name: "Corporate Restructuring", value: 18400, color: "#6366f1", pct: 31.8 },
  { name: "M&A Advisory",            value: 16200, color: "#8b5cf6", pct: 28.0 },
  { name: "Forensic & Disputes",     value: 11600, color: "#06b6d4", pct: 20.1 },
  { name: "PE Advisory",             value:  8100, color: "#10b981", pct: 14.0 },
  { name: "Valuations",              value:  3500, color: "#f59e0b", pct:  6.1 },
];

// Service line monthly (Apr 24 → Mar 25, £000)
const slMonthly = [
  { m: "Apr", restr: 560, ma: 480, forensic: 340, pe: 270, val: 110 },
  { m: "May", restr: 590, ma: 510, forensic: 360, pe: 285, val: 115 },
  { m: "Jun", restr: 620, ma: 540, forensic: 370, pe: 300, val: 120 },
  { m: "Jul", restr: 600, ma: 520, forensic: 355, pe: 290, val: 115 },
  { m: "Aug", restr: 640, ma: 550, forensic: 385, pe: 310, val: 125 },
  { m: "Sep", restr: 680, ma: 580, forensic: 405, pe: 330, val: 130 },
  { m: "Oct", restr: 700, ma: 600, forensic: 415, pe: 340, val: 135 },
  { m: "Nov", restr: 730, ma: 625, forensic: 430, pe: 355, val: 140 },
  { m: "Dec", restr: 710, ma: 600, forensic: 410, pe: 340, val: 135 },
  { m: "Jan", restr: 720, ma: 615, forensic: 425, pe: 345, val: 138 },
  { m: "Feb", restr: 745, ma: 640, forensic: 440, pe: 360, val: 142 },
  { m: "Mar", restr: 780, ma: 665, forensic: 460, pe: 375, val: 145 },
];

const yearlyAvg = Math.round(monthly.slice(3).reduce((s, d) => s + d.rev, 0) / 12); // Apr 24–Mar 25

// Top customers (YTD £000)
const topCustomers = [
  { name: "Apex Capital Group",     ytd: 4280, qtr: 1420, sector: "PE Advisory",   color: "#6366f1" },
  { name: "Meridian Holdings",      ytd: 3940, qtr: 1310, sector: "M&A Advisory",  color: "#8b5cf6" },
  { name: "Forsythe & Partners",    ytd: 3620, qtr: 1190, sector: "Restructuring", color: "#06b6d4" },
  { name: "Quanta Ventures",        ytd: 3180, qtr: 1050, sector: "PE Advisory",   color: "#10b981" },
  { name: "Blackmere Corp",         ytd: 2940, qtr:  980, sector: "M&A Advisory",  color: "#eab308" },
  { name: "Summit Infrastructure",  ytd: 2760, qtr:  920, sector: "Forensic",      color: "#f97316" },
  { name: "Clearwater Capital",     ytd: 2480, qtr:  830, sector: "Restructuring", color: "#a78bfa" },
  { name: "Ironstone Advisory",     ytd: 2210, qtr:  740, sector: "Valuations",    color: "#34d399" },
];

// Grades
const grades = [
  { grade: "Partner",  count: 18, target: 18, util: 61, targetUtil: 58, rate: 950 },
  { grade: "Director", count: 32, target: 34, util: 74, targetUtil: 70, rate: 680 },
  { grade: "Manager",  count: 51, target: 52, util: 79, targetUtil: 80, rate: 480 },
  { grade: "Analyst",  count: 41, target: 45, util: 82, targetUtil: 85, rate: 310 },
];

// Debtor aging buckets (£000)
const debtorBuckets = [
  { label: "Current  0–30d", short: "0–30d", value: 2840, color: "#22c55e", pct: 15.1 },
  { label: "31–60 days",     short: "31–60d", value: 4120, color: "#eab308", pct: 21.8 },
  { label: "61–90 days",     short: "61–90d", value: 3280, color: "#f97316", pct: 17.4 },
  { label: "91+ days",       short: "91+d",   value: 8640, color: "#ef4444", pct: 45.7 },
];

// Debtor aging trend (6 months, £000)
const debtorTrend = [
  { m: "Oct", d0: 2200, d31: 3800, d61: 3100, d91: 7200 },
  { m: "Nov", d0: 2400, d31: 3900, d61: 3200, d91: 7600 },
  { m: "Dec", d0: 2600, d31: 4000, d61: 3100, d91: 7900 },
  { m: "Jan", d0: 2700, d31: 4050, d61: 3200, d91: 8200 },
  { m: "Feb", d0: 2780, d31: 4100, d61: 3250, d91: 8400 },
  { m: "Mar", d0: 2840, d31: 4120, d61: 3280, d91: 8640 },
];

const totalDebtors = debtorBuckets.reduce((s, b) => s + b.value, 0); // £18,880k
const currentCash  = 9200; // £9.2M in £000

// P&L summary
const pl = [
  { label: "Revenue",          value: 4490, prev: 4320, pct: null,  isGross: false, isEbitda: false, isNet: false },
  { label: "Cost of Delivery", value: 1841, prev: 1793, pct: null,  isGross: false, isEbitda: false, isNet: false },
  { label: "Gross Profit",     value: 2649, prev: 2527, pct: 59.0,  isGross: true,  isEbitda: false, isNet: false },
  { label: "Staff & Benefits", value:  875, prev:  862, pct: null,  isGross: false, isEbitda: false, isNet: false },
  { label: "Overhead",         value:  333, prev:  328, pct: null,  isGross: false, isEbitda: false, isNet: false },
  { label: "EBITDA",           value: 1441, prev: 1337, pct: 32.1,  isGross: false, isEbitda: true,  isNet: false },
  { label: "D&A & Finance",    value:  178, prev:  175, pct: null,  isGross: false, isEbitda: false, isNet: false },
  { label: "Net Profit",       value: 1263, prev: 1162, pct: 28.1,  isGross: false, isEbitda: false, isNet: true  },
];

/* ═══════════════════════════════════════════════════════════
   ANIMATION
═══════════════════════════════════════════════════════════ */

function useCountUp(target: number, duration = 1600, delay = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    let r: number;
    t = setTimeout(() => {
      const s = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - s) / duration, 1);
        setV(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) r = requestAnimationFrame(tick); else setV(target);
      };
      r = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(r); };
  }, [target, duration, delay]);
  return v;
}

/* ═══════════════════════════════════════════════════════════
   PRIMITIVES
═══════════════════════════════════════════════════════════ */

// Donut with self-drawing animation
function Donut({ data, size = 180, sw = 24 }: {
  data: { value: number; color: string; label?: string }[];
  size?: number; sw?: number;
}) {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 200); return () => clearTimeout(t); }, []);
  const r = (size - sw) / 2, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0);
  let cum = 0;
  const arcs = data.map(d => {
    const pct = d.value / total, start = cum;
    cum += pct;
    return { ...d, dash: pct * circ, offset: circ * (1 - start) };
  });
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={sw} />
      {arcs.map((a, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={a.color} strokeWidth={sw - 3} strokeLinecap="butt"
          strokeDasharray={go ? `${a.dash} ${circ - a.dash}` : `0 ${circ}`}
          strokeDashoffset={a.offset}
          style={{ transition: `stroke-dasharray 1s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s` }}
        />
      ))}
    </svg>
  );
}

// Utilisation bar with target tick marker
function UtilBar({ actual, target, color, delay = 0 }: {
  actual: number; target: number; color: string; delay?: number;
}) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(actual), 100 + delay); return () => clearTimeout(t); }, [actual, delay]);
  return (
    <div className="relative h-[8px] rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
      {/* Filled actual bar */}
      <div className="absolute inset-y-0 left-0 rounded-full"
        style={{ width: `${w}%`, background: color, transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}
      />
      {/* Target tick — white vertical line at exact target% position */}
      <div className="absolute top-[-5px] bottom-[-5px] w-[2px] rounded-full"
        style={{ left: `${target}%`, transform: "translateX(-50%)", background: "rgba(255,255,255,0.55)" }}
      />
    </div>
  );
}

// Half-donut gauge
function Gauge({ value, target, label }: { value: number; target: number; label: string }) {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 300); return () => clearTimeout(t); }, []);
  const r = 60, sw = 10, cx = 80, cy = 74;
  const clamp = (v: number) => Math.min(Math.max(v, 0), 100) / 100;
  const p = clamp(go ? value : 0), tp = clamp(target);
  const color = value >= target ? "#22c55e" : value >= target * 0.95 ? "#eab308" : "#ef4444";
  function arc(pct: number) { const a = Math.PI * (1 - pct); return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) }; }
  const L = arc(0), R = arc(1), F = arc(p), T = arc(tp);
  const big = p > 0.5 ? 1 : 0;
  const ang = Math.PI * (1 - tp);
  const r1 = r - sw / 2 - 2, r2 = r + sw / 2 + 2;
  return (
    <div className="flex flex-col items-center">
      <svg width={cx * 2} height={cy + sw + 6} className="overflow-visible">
        <path d={`M${L.x.toFixed(1)},${L.y.toFixed(1)} A${r},${r} 0 0,1 ${R.x.toFixed(1)},${R.y.toFixed(1)}`}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={sw} strokeLinecap="round" />
        {p > 0 && <path d={`M${L.x.toFixed(1)},${L.y.toFixed(1)} A${r},${r} 0 ${big},1 ${F.x.toFixed(1)},${F.y.toFixed(1)}`}
          fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s" }} />}
        <line x1={(cx + r1 * Math.cos(ang)).toFixed(1)} y1={(cy - r1 * Math.sin(ang)).toFixed(1)}
          x2={(cx + r2 * Math.cos(ang)).toFixed(1)} y2={(cy - r2 * Math.sin(ang)).toFixed(1)}
          stroke="rgba(255,255,255,0.45)" strokeWidth={2} strokeLinecap="round" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="22" fontWeight="900"
          fontFamily="ui-monospace,monospace" fill={color}>{value}%</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)"
          letterSpacing="0.1em" style={{ textTransform: "uppercase" }}>{label}</text>
        <text x={T.x} y={T.y - 7} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.35)">{target}%</text>
      </svg>
    </div>
  );
}

// Chart tooltip
function Tip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 text-xs shadow-2xl" style={{ background: "#111127", border: "1px solid rgba(255,255,255,0.1)" }}>
      <p className="font-bold mb-2 text-white/40 tracking-widest uppercase text-[9px]">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-3 mb-0.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-white/50 text-[11px]">{p.name}</span>
          <span className="font-bold text-white ml-auto text-[11px]">
            {typeof p.value === "number" && p.value > 500
              ? `£${(p.value / 1000).toFixed(2)}M`
              : typeof p.value === "number" && p.value < 100
                ? `${p.value.toFixed(1)}%`
                : `£${p.value.toLocaleString()}k`}
          </span>
        </div>
      ))}
    </div>
  );
}

// Shared card shell
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
      {children}
    </div>
  );
}

// Pill tab selector
function Pills<T extends string>({ options, active, onChange, color = "#6366f1" }: {
  options: { id: T; label: string }[]; active: T; onChange: (id: T) => void; color?: string;
}) {
  return (
    <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
      {options.map(o => (
        <button key={o.id} onClick={() => onChange(o.id)}
          className="px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150"
          style={active === o.id
            ? { background: color, color: "#fff", boxShadow: `0 0 12px ${color}40` }
            : { color: "rgba(255,255,255,0.35)" }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: OVERVIEW
═══════════════════════════════════════════════════════════ */
function Overview() {
  const rev  = useCountUp(12800, 1600, 200);
  const marg = useCountUp(31.2,  1400, 400);
  const cash = useCountUp(9.2,   1400, 600);

  const kpis = [
    { label: "Q1 Revenue",    display: `£${(rev / 1000).toFixed(2)}M`,  delta: "+18.4%", up: true  },
    { label: "EBITDA Margin", display: `${marg.toFixed(1)}%`,            delta: "+3.2pp", up: true  },
    { label: "Cash",          display: `£${cash.toFixed(1)}M`,           delta: "+£1.4M", up: true  },
    { label: "Lockup Days",   display: "94d",                            delta: "–6d",    up: true  },
  ];

  const signals = [
    { color: "#ef4444", text: "M&A pipeline coverage fell to 1.8× — target 2.5×. Review deal sourcing before end of April." },
    { color: "#eab308", text: "Analyst utilisation 82% vs 85% target for 3 consecutive months — capacity review needed." },
    { color: "#22c55e", text: "EBITDA 32.1% this month — highest in 15 months. Cost discipline to be sustained in Q2." },
  ];

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg,#0c0c24 0%,#12103a 50%,#080f2a 100%)" }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(99,102,241,0.35) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative grid lg:grid-cols-2">
          <div className="p-10 lg:p-14">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-8"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-300">Live · March 2025</span>
            </div>
            <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Q1 FY2025 Revenue</p>
            <p className="text-[4.5rem] font-black tracking-tight text-white leading-none tabular-nums">
              £{(rev / 1000).toFixed(2)}M
            </p>
            <div className="flex items-center gap-4 mt-5">
              <span className="text-emerald-400 font-bold text-lg flex items-center gap-1"><ArrowUpRight size={16} />+18.4% YoY</span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>vs £10.8M Q1 FY24</span>
            </div>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>On track vs £57.6M annual target · 22.2% delivered</p>
          </div>
          <div className="px-8 py-10 lg:px-10 flex flex-col justify-center">
            <RevenueTrendChart />
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <Card key={i} className="p-7">
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{k.label}</p>
            <p className="text-[2.2rem] font-black text-white tabular-nums leading-none">{k.display}</p>
            <div className={`flex items-center gap-1.5 mt-3 text-sm font-semibold ${k.up ? "text-emerald-400" : "text-rose-400"}`}>
              {k.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {k.delta} <span className="font-normal text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>vs prior quarter</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 p-7">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>EBITDA Margin</p>
              <p className="text-white font-bold text-sm mt-0.5">15-month trend</p>
            </div>
            <div className="text-right">
              <p className="text-[2rem] font-black text-white tabular-nums">32.1%</p>
              <p className="text-emerald-400 text-xs font-semibold">+3.2pp YoY</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={monthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="eG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 8 }} axisLine={false} tickLine={false} interval={2} />
              <YAxis domain={[22, 34]} tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} width={30} />
              <Tooltip content={<Tip />} />
              <ReferenceLine y={28} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="ebitda" stroke="#22c55e" strokeWidth={2.5} fill="url(#eG)" dot={false} name="EBITDA %" isAnimationActive animationDuration={1400} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2 p-7">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Revenue Mix</p>
          <p className="text-white font-bold text-sm mb-6">YTD by practice</p>
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <Donut data={services} size={150} sw={20} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[9px] tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Total</p>
                <p className="text-[1rem] font-black text-white tabular-nums">£57.8M</p>
              </div>
            </div>
            <div className="w-full space-y-2">
              {services.map((s, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="text-[11px] flex-1 truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{s.name}</span>
                  <span className="text-[11px] font-bold text-white tabular-nums">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Signals */}
      <Card>
        <div className="px-7 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Signals requiring attention</p>
        </div>
        {signals.map((s, i) => (
          <div key={i} className="flex items-start gap-4 px-7 py-4 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: s.color }} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{s.text}</p>
            <ChevronRight size={14} className="shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.15)" }} />
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: REVENUE
═══════════════════════════════════════════════════════════ */

function Revenue() {
  return (
    <div className="space-y-5">
      {/* Summary tiles */}
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { label: "March Revenue",  value: "£4.49M", delta: "+£0.17M MoM",  note: "vs Feb 2025",       up: true,  accent: "#6366f1" },
          { label: "YTD vs Budget",  value: "–£0.8M", delta: "–1.4% miss",   note: "£57.8M vs £58.6M",  up: false, accent: "#ef4444" },
          { label: "Annual Avg/mo",  value: `£${(yearlyAvg / 1000).toFixed(2)}M`, delta: "+12.1% vs prior yr", note: "Apr 24–Mar 25", up: true, accent: "#22c55e" },
        ].map((c, i) => (
          <div key={i} className="rounded-2xl p-7 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: c.accent }} />
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{c.label}</p>
            <p className="text-[2.6rem] font-black text-white tabular-nums leading-none">{c.value}</p>
            <div className={`flex items-center gap-2 mt-3 font-semibold text-sm ${c.up ? "text-emerald-400" : "text-rose-400"}`}>
              {c.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {c.delta} <span className="font-normal text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>{c.note}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Budget vs Actuals | vs Annual Average */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Budget vs Actuals */}
        <Card className="lg:col-span-3 p-7">
          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Actual vs Budget</p>
            <p className="text-white font-bold text-sm mt-0.5">Monthly — Apr 24 to Mar 25</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={monthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false}
                tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={42} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="rev" radius={[4, 4, 0, 0]} name="Actual" isAnimationActive animationDuration={1000}>
                {monthly.map((d, i) => <Cell key={i} fill={d.rev >= d.budget ? "#6366f1" : "#ef4444"} fillOpacity={0.85} />)}
              </Bar>
              <Line type="monotone" dataKey="budget" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5}
                strokeDasharray="5 3" dot={false} name="Budget" isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3 justify-end">
            {[{ color: "#6366f1", l: "Above budget" }, { color: "#ef4444", l: "Below budget" }, { color: "rgba(255,255,255,0.3)", l: "Budget line" }].map(lg => (
              <div key={lg.l} className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: lg.color }} />{lg.l}
              </div>
            ))}
          </div>
        </Card>

        {/* vs Annual Average */}
        <Card className="lg:col-span-2 p-7">
          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>vs Annual Average</p>
            <p className="text-white font-bold text-sm mt-0.5">Avg £{(yearlyAvg / 1000).toFixed(2)}M/mo</p>
          </div>
          <ResponsiveContainer width="100%" height={148}>
            <AreaChart data={monthly.slice(3)} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="avgG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 8 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 8 }} axisLine={false} tickLine={false}
                tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={38} />
              <Tooltip content={<Tip />} />
              <ReferenceLine y={yearlyAvg} stroke="rgba(255,255,255,0.3)" strokeDasharray="5 3" strokeWidth={1.5} />
              <Area type="monotone" dataKey="rev" stroke="#6366f1" strokeWidth={2.5} fill="url(#avgG)"
                dot={{ fill: "#6366f1", r: 2.5, strokeWidth: 0 }} name="Revenue" isAnimationActive animationDuration={1200} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {monthly.slice(3).slice(-6).map((d, i) => {
              const diff = d.rev - yearlyAvg;
              return (
                <div key={i} className="rounded-lg p-2 text-center" style={{ background: diff >= 0 ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)" }}>
                  <p className="text-[8px] mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{d.m}</p>
                  <p className={`text-[10px] font-bold tabular-nums ${diff >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {diff >= 0 ? "+" : ""}£{Math.round(diff / 100) / 10}M
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Row 2: By Service Line | Top Customers */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Service Line Breakdown */}
        <Card className="lg:col-span-3 p-7">
          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Revenue by Service Line</p>
            <p className="text-white font-bold text-sm mt-0.5">Monthly contribution — Apr 24 to Mar 25</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={slMonthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false}
                tickFormatter={v => `£${v}k`} width={42} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="restr"    stackId="a" fill="#6366f1" fillOpacity={0.9} name="Restructuring" isAnimationActive animationDuration={900} />
              <Bar dataKey="ma"       stackId="a" fill="#8b5cf6" fillOpacity={0.9} name="M&A Advisory"  isAnimationActive animationDuration={900} />
              <Bar dataKey="forensic" stackId="a" fill="#06b6d4" fillOpacity={0.9} name="Forensic"      isAnimationActive animationDuration={900} />
              <Bar dataKey="pe"       stackId="a" fill="#10b981" fillOpacity={0.9} name="PE Advisory"   isAnimationActive animationDuration={900} />
              <Bar dataKey="val"      stackId="a" fill="#f59e0b" fillOpacity={0.9} name="Valuations"    isAnimationActive animationDuration={900} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-3">
            {services.map(s => (
              <div key={s.name} className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />{s.name}
              </div>
            ))}
          </div>
        </Card>

        {/* Top Customers */}
        <Card className="lg:col-span-2 p-7">
          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Top Clients</p>
            <p className="text-white font-bold text-sm mt-0.5">YTD revenue — £000s</p>
          </div>
          <div className="space-y-4">
            {topCustomers.map((c, i) => {
              const maxYtd = topCustomers[0].ytd;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <p className="text-[11px] font-semibold text-white truncate max-w-[140px]">{c.name}</p>
                      <p className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{c.sector}</p>
                    </div>
                    <p className="text-[12px] font-black text-white tabular-nums shrink-0">£{(c.ytd / 1000).toFixed(1)}M</p>
                  </div>
                  <div className="space-y-1">
                    <div className="relative h-[6px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${(c.ytd / maxYtd) * 100}%`, background: c.color, opacity: 0.9,
                          transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms` }} />
                    </div>
                    <div className="relative h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${(c.qtr / maxYtd) * 100}%`, background: c.color, opacity: 0.35,
                          transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 60 + 100}ms` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-1.5 text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              <div className="w-2 h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.5)" }} /> YTD
            </div>
            <div className="flex items-center gap-1.5 text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              <div className="w-2 h-1 rounded-sm" style={{ background: "rgba(255,255,255,0.25)" }} /> Q1 only
            </div>
          </div>
        </Card>
      </div>

      {/* P&L table */}
      <Card className="overflow-hidden">
        <div className="px-7 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>P&L Summary</p>
          <p className="text-white font-bold text-sm mt-0.5">March 2025</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {["", "Current", "Prior Month", "Margin", "MoM"].map(h => (
                <th key={h} className={`px-7 py-3 text-[9px] font-bold tracking-widest uppercase ${h === "" ? "text-left" : "text-right"}`}
                  style={{ color: "rgba(255,255,255,0.2)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pl.map((row, i) => {
              const mom = ((row.value - row.prev) / row.prev) * 100;
              const spec = row.isGross || row.isEbitda || row.isNet;
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.035)", background: spec ? "rgba(255,255,255,0.025)" : undefined }}>
                  <td className={`px-7 py-3.5 ${spec ? "font-bold text-white" : "font-medium"}`}
                    style={{ color: spec ? undefined : "rgba(255,255,255,0.5)" }}>{row.label}</td>
                  <td className="px-7 py-3.5 text-right tabular-nums font-bold text-white">£{row.value.toLocaleString()}k</td>
                  <td className="px-7 py-3.5 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.3)" }}>£{row.prev.toLocaleString()}k</td>
                  <td className="px-7 py-3.5 text-right tabular-nums font-semibold" style={{ color: row.pct ? "#6366f1" : "rgba(255,255,255,0.15)" }}>
                    {row.pct ? `${row.pct}%` : "—"}
                  </td>
                  <td className={`px-7 py-3.5 text-right tabular-nums font-semibold ${mom >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {mom >= 0 ? "+" : ""}{mom.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: PEOPLE
═══════════════════════════════════════════════════════════ */

function People() {
  const avgUtil = grades.reduce((s, g) => s + g.util, 0) / grades.length;
  const avgTgt  = grades.reduce((s, g) => s + g.targetUtil, 0) / grades.length;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Headcount", value: "142",    delta: "+8 this quarter", up: true  },
          { label: "Fee Earners",     value: "108",    delta: "+5 this quarter", up: true  },
          { label: "Revenue / FTE",   value: "£29.3k", delta: "+£3.1k MoM",      up: true  },
        ].map((k, i) => (
          <Card key={i} className="p-7">
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{k.label}</p>
            <p className="text-[2.4rem] font-black text-white tabular-nums leading-none">{k.value}</p>
            <p className="mt-2 text-sm font-semibold text-emerald-400 flex items-center gap-1"><ArrowUpRight size={13} />{k.delta}</p>
          </Card>
        ))}
      </div>

      {/* Gauge + util bars */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-8 flex flex-col items-center">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-6 self-start" style={{ color: "rgba(255,255,255,0.3)" }}>Average Utilisation</p>
          <Gauge value={parseFloat(avgUtil.toFixed(1))} target={parseFloat(avgTgt.toFixed(1))} label="avg utilisation" />
          <div className="mt-5 grid grid-cols-2 gap-3 w-full">
            {[
              { label: "Above target", count: grades.filter(g => g.util >= g.targetUtil).length, color: "#22c55e" },
              { label: "Below target", count: grades.filter(g => g.util < g.targetUtil).length,  color: "#ef4444" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-3 text-center" style={{ background: `${s.color}12`, border: `1px solid ${s.color}20` }}>
                <p className="text-[1.5rem] font-black tabular-nums" style={{ color: s.color }}>{s.count}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Utilisation by Grade</p>
          <p className="text-white/40 text-[10px] mb-6">Bar shows actual · white line = target</p>
          <div className="space-y-8">
            {grades.map((g, i) => {
              const color = g.util >= g.targetUtil ? "#22c55e" : g.util >= g.targetUtil * 0.97 ? "#eab308" : "#ef4444";
              const diff  = g.util - g.targetUtil;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">{g.grade}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>target {g.targetUtil}%</span>
                      <span className="text-sm font-black tabular-nums" style={{ color }}>{g.util}%</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${diff >= 0 ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"}`}>
                        {diff >= 0 ? "+" : ""}{diff}pp
                      </span>
                    </div>
                  </div>
                  <UtilBar actual={g.util} target={g.targetUtil} color={color} delay={i * 90} />
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            White tick mark = target threshold
          </p>
        </Card>
      </div>

      {/* Headcount trend + grade table */}
      <div className="grid lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 p-7">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Headcount Trend</p>
          <p className="text-white font-bold text-sm mb-6">Last 6 months</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={[{m:"Oct",hc:128},{m:"Nov",hc:131},{m:"Dec",hc:130},{m:"Jan",hc:134},{m:"Feb",hc:138},{m:"Mar",hc:142}]}
              margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="hcG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis domain={[120, 150]} tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="hc" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#hcG)"
                dot={{ fill: "#8b5cf6", r: 3, strokeWidth: 0 }} name="Headcount" isAnimationActive animationDuration={1200} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <div className="px-7 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Grade Breakdown</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {["Grade", "Count", "Tgt", "Rate/hr"].map(h => (
                  <th key={h} className={`px-5 py-3 text-[9px] font-bold tracking-widest uppercase ${h === "Grade" ? "text-left" : "text-right"}`}
                    style={{ color: "rgba(255,255,255,0.2)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-5 py-3.5 font-semibold text-white">{g.grade}</td>
                  <td className={`px-5 py-3.5 text-right font-bold tabular-nums ${g.count >= g.target ? "text-emerald-400" : "text-rose-400"}`}>{g.count}</td>
                  <td className="px-5 py-3.5 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.3)" }}>{g.target}</td>
                  <td className="px-5 py-3.5 text-right tabular-nums font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>£{g.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: DEBTORS
═══════════════════════════════════════════════════════════ */

function Debtors() {
  // Forecast sliders
  const [recovery91, setRecovery91]       = useState(25);   // % of 91+ recovered
  const [lockupReduction, setLockupReduction] = useState(14); // days to reduce lockup (0–34)
  const [accel3190, setAccel3190]         = useState(20);   // % of 31-90d accelerated

  // Cash freed calculations
  const currentLockup  = 94;
  const monthlyRev     = 4490;
  const lockupTarget   = currentLockup - lockupReduction;    // derived: e.g. 94 - 14 = 80
  const cashFrom91     = Math.round(debtorBuckets[3].value * recovery91 / 100);
  const cashFromLockup = Math.round((lockupReduction / 30) * monthlyRev);
  const cashFrom3190   = Math.round((debtorBuckets[1].value + debtorBuckets[2].value) * accel3190 / 100);
  const totalFreed     = cashFrom91 + cashFromLockup + cashFrom3190;
  const projectedCash  = currentCash + totalFreed;

  return (
    <div className="space-y-5">
      {/* Header stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Debtors",   value: `£${(totalDebtors / 1000).toFixed(1)}M`, delta: "+£0.6M MoM", up: false, accent: "#ef4444" },
          { label: "91+ Days",        value: "£8.64M",  delta: "+£0.24M MoM",  up: false, accent: "#ef4444" },
          { label: "Lockup Days",     value: "94d",     delta: "+4d vs target", up: false, accent: "#eab308" },
          { label: "Current Cash",    value: "£9.20M",  delta: "+£1.4M QoQ",   up: true,  accent: "#22c55e" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: s.accent }} />
            <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>{s.label}</p>
            <p className="text-[1.9rem] font-black text-white tabular-nums leading-none">{s.value}</p>
            <div className={`flex items-center gap-1 mt-2 text-[11px] font-semibold ${s.up ? "text-emerald-400" : "text-rose-400"}`}>
              {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Aging breakdown + trend */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Donut + legend */}
        <Card className="lg:col-span-2 p-7">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Debtor Aging Mix</p>
          <p className="text-white font-bold text-sm mb-6">March 2025</p>
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <Donut data={debtorBuckets} size={170} sw={22} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[9px] tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Total</p>
                <p className="text-[1.1rem] font-black text-white tabular-nums">£{(totalDebtors / 1000).toFixed(1)}M</p>
              </div>
            </div>
            <div className="w-full space-y-3">
              {debtorBuckets.map((b, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: b.color }} />
                      <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{b.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-white tabular-nums">£{(b.value / 1000).toFixed(1)}M</span>
                      <span className="text-[10px] tabular-nums w-10 text-right" style={{ color: "rgba(255,255,255,0.3)" }}>{b.pct}%</span>
                    </div>
                  </div>
                  <div className="relative h-[4px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${b.pct}%`, background: b.color, opacity: 0.75,
                        transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Aging trend stacked bar */}
        <Card className="lg:col-span-3 p-7">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Aging Trend</p>
          <p className="text-white font-bold text-sm mb-6">6-month view — Oct 24 to Mar 25</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={debtorTrend} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false}
                tickFormatter={v => `£${(v / 1000).toFixed(0)}M`} width={36} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="d0"  stackId="a" fill="#22c55e" fillOpacity={0.85} name="0–30d"  isAnimationActive animationDuration={900} />
              <Bar dataKey="d31" stackId="a" fill="#eab308" fillOpacity={0.85} name="31–60d" isAnimationActive animationDuration={900} />
              <Bar dataKey="d61" stackId="a" fill="#f97316" fillOpacity={0.85} name="61–90d" isAnimationActive animationDuration={900} />
              <Bar dataKey="d91" stackId="a" fill="#ef4444" fillOpacity={0.9}  name="91+d"   isAnimationActive animationDuration={900} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 flex-wrap">
            {[{ color: "#22c55e", l: "0–30d" }, { color: "#eab308", l: "31–60d" }, { color: "#f97316", l: "61–90d" }, { color: "#ef4444", l: "91+d" }].map(lg => (
              <div key={lg.l} className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: lg.color }} />{lg.l}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Cash Forecast Tool */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="px-7 py-5 border-b flex items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <SlidersHorizontal size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Cash Forecast Tool</p>
            <p className="text-white font-bold text-sm mt-0.5">Adjust levers to see potential cash released</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 divide-x" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {/* Sliders */}
          <div className="p-7 space-y-8">
            {/* Slider 1 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-white">Recover 91+ day debtors</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Current 91+ balance: £8.64M</p>
                </div>
                <span className="text-lg font-black tabular-nums" style={{ color: "#ef4444" }}>{recovery91}%</span>
              </div>
              <input type="range" min={0} max={80} value={recovery91} onChange={e => setRecovery91(+e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#ef4444", background: `linear-gradient(to right, #ef4444 ${recovery91/80*100}%, rgba(255,255,255,0.1) ${recovery91/80*100}%)` }}
              />
              <div className="flex justify-between text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                <span>0%</span><span>80%</span>
              </div>
              <p className="mt-2 text-[11px] font-semibold text-emerald-400">
                +£{(cashFrom91 / 1000).toFixed(2)}M freed
              </p>
            </div>

            {/* Slider 2 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-white">Reduce lockup days</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Current: 94d · target: {lockupTarget}d · each day ≈ £{Math.round(monthlyRev / 30)}k</p>
                </div>
                <span className="text-lg font-black tabular-nums" style={{ color: "#eab308" }}>–{lockupReduction}d</span>
              </div>
              <input type="range" min={0} max={34} value={lockupReduction} onChange={e => setLockupReduction(+e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#eab308", background: `linear-gradient(to right, #eab308 ${lockupReduction / 34 * 100}%, rgba(255,255,255,0.1) ${lockupReduction / 34 * 100}%)` }}
              />
              <div className="flex justify-between text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                <span>0 days (no change)</span><span>34 days (max)</span>
              </div>
              <p className="mt-2 text-[11px] font-semibold text-emerald-400">
                +£{(cashFromLockup / 1000).toFixed(2)}M freed ({lockupReduction} day improvement → target {lockupTarget}d)
              </p>
            </div>

            {/* Slider 3 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-white">Accelerate 31–90 day collection</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>31–90d balance: £{((debtorBuckets[1].value + debtorBuckets[2].value) / 1000).toFixed(1)}M</p>
                </div>
                <span className="text-lg font-black tabular-nums" style={{ color: "#f97316" }}>{accel3190}%</span>
              </div>
              <input type="range" min={0} max={60} value={accel3190} onChange={e => setAccel3190(+e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#f97316", background: `linear-gradient(to right, #f97316 ${accel3190/60*100}%, rgba(255,255,255,0.1) ${accel3190/60*100}%)` }}
              />
              <div className="flex justify-between text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                <span>0%</span><span>60%</span>
              </div>
              <p className="mt-2 text-[11px] font-semibold text-emerald-400">
                +£{(cashFrom3190 / 1000).toFixed(2)}M freed
              </p>
            </div>
          </div>

          {/* Result panel */}
          <div className="p-7 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>Projected outcome</p>

              <div className="space-y-4 mb-8">
                {[
                  { label: "Current Cash Position",      value: `£${(currentCash / 1000).toFixed(2)}M`,     color: "rgba(255,255,255,0.4)" },
                  { label: "91+ Recovery",               value: `+£${(cashFrom91 / 1000).toFixed(2)}M`,     color: "#ef4444" },
                  { label: "Lockup Improvement",         value: `+£${(cashFromLockup / 1000).toFixed(2)}M`, color: "#eab308" },
                  { label: "31–90d Acceleration",        value: `+£${(cashFrom3190 / 1000).toFixed(2)}M`,   color: "#f97316" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{r.label}</span>
                    <span className="text-sm font-bold tabular-nums" style={{ color: r.color }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Big result */}
            <div className="rounded-2xl p-6 text-center" style={{ background: totalFreed > 0 ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${totalFreed > 0 ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.07)"}` }}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Total Cash Released</p>
              <p className="text-[2.8rem] font-black tabular-nums text-emerald-400 leading-none">
                +£{(totalFreed / 1000).toFixed(2)}M
              </p>
              <div className="mt-3 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-[10px] mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Projected cash balance</p>
                <p className="text-[1.6rem] font-black tabular-nums text-white">
                  £{(projectedCash / 1000).toFixed(2)}M
                </p>
                <p className="text-emerald-400 text-xs font-semibold mt-1">
                  vs £{(currentCash / 1000).toFixed(1)}M today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: REPORTS
═══════════════════════════════════════════════════════════ */

function Reports() {
  const docs = [
    { title: "Q1 Board Pack",        sub: "Full board-ready PDF · 28 pages",   color: "#6366f1", ready: true  },
    { title: "P&L Statement",        sub: "Mar 2025 · with prior comparisons",  color: "#8b5cf6", ready: true  },
    { title: "Cash Flow Forecast",   sub: "6-month forward projection",          color: "#06b6d4", ready: true  },
    { title: "Utilisation Report",   sub: "Grade × month heatmap",              color: "#22c55e", ready: true  },
    { title: "Budget Variance Pack", sub: "Q1 actual vs budget deep-dive",      color: "#eab308", ready: false },
    { title: "Investor Summary",     sub: "1-page KPI summary — ready Apr 5",   color: "#ef4444", ready: false },
  ];

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {docs.map((d, i) => (
          <Card key={i} className="p-7 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${d.color}18` }}>
                <Download size={15} style={{ color: d.color }} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{d.title}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{d.sub}</p>
              </div>
            </div>
            <button className="w-full rounded-xl py-2.5 text-[11px] font-bold tracking-wide transition-all duration-150"
              style={d.ready
                ? { background: `${d.color}20`, color: d.color, border: `1px solid ${d.color}30` }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.07)", cursor: "default" }}>
              {d.ready ? "Download PDF" : "Generating…"}
            </button>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Detailed P&L</p>
            <p className="text-white font-bold text-sm mt-0.5">March 2025</p>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {["Line Item", "Mar 25", "Feb 25", "Margin", "MoM Change"].map(h => (
                <th key={h} className={`px-8 py-3 text-[9px] font-bold tracking-widest uppercase ${h === "Line Item" ? "text-left" : "text-right"}`}
                  style={{ color: "rgba(255,255,255,0.2)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pl.map((row, i) => {
              const mom = ((row.value - row.prev) / row.prev) * 100;
              const spec = row.isGross || row.isEbitda || row.isNet;
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.035)", background: spec ? "rgba(255,255,255,0.025)" : undefined }}>
                  <td className={`px-8 py-3.5 ${spec ? "font-bold text-white" : "font-medium"}`}
                    style={{ color: spec ? undefined : "rgba(255,255,255,0.5)" }}>{row.label}</td>
                  <td className="px-8 py-3.5 text-right font-bold tabular-nums text-white">£{row.value.toLocaleString()}k</td>
                  <td className="px-8 py-3.5 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.3)" }}>£{row.prev.toLocaleString()}k</td>
                  <td className="px-8 py-3.5 text-right tabular-nums font-semibold" style={{ color: row.pct ? "#6366f1" : "rgba(255,255,255,0.15)" }}>
                    {row.pct ? `${row.pct}%` : "—"}
                  </td>
                  <td className={`px-8 py-3.5 text-right tabular-nums font-semibold ${mom >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {mom >= 0 ? "+" : ""}{mom.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════ */

type Tab = "overview" | "revenue" | "people" | "debtors" | "reports";

const TABS: { id: Tab; label: string; dot?: string }[] = [
  { id: "overview", label: "Overview"  },
  { id: "revenue",  label: "Revenue"   },
  { id: "people",   label: "People"    },
  { id: "debtors",  label: "Debtors",  dot: "#ef4444" },
  { id: "reports",  label: "Reports"   },
];

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen" style={{ background: "#09090f", color: "rgba(255,255,255,0.85)" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl"
        style={{ background: "rgba(9,9,15,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1280px] mx-auto px-8 h-14 flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-black text-[12px]">Q</span>
            </div>
            <span className="font-black text-[13px] text-white tracking-tight">Meridian</span>
          </Link>

          <nav className="flex gap-1">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150 flex items-center gap-1.5"
                style={tab === t.id
                  ? { background: "rgba(99,102,241,0.18)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)" }
                  : { color: "rgba(255,255,255,0.35)", border: "1px solid transparent" }}>
                {t.label}
                {t.dot && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.dot }} />}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              March 2025
            </div>
            <Link href="/" className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}>
              ← Back
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-8 py-10">
        {tab === "overview" && <Overview />}
        {tab === "revenue"  && <Revenue />}
        {tab === "people"   && <People />}
        {tab === "debtors"  && <Debtors />}
        {tab === "reports"  && <Reports />}
      </main>
    </div>
  );
}
