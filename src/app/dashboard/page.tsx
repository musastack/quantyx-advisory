"use client";

import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, ComposedChart,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell, CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown, Minus, Download, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────
   MERIDIAN ADVISORY PARTNERS  ·  Q1 FY2025
───────────────────────────────────────────────────────── */

// 15 months of monthly revenue (£000) — Jan 24 to Mar 25
const monthly = [
  { m: "Jan", rev: 3120, ebitda: 24.1, budget: 3200 },
  { m: "Feb", rev: 3280, ebitda: 25.4, budget: 3300 },
  { m: "Mar", rev: 3490, ebitda: 26.8, budget: 3400 },
  { m: "Apr", rev: 3350, ebitda: 24.9, budget: 3500 },
  { m: "May", rev: 3620, ebitda: 27.2, budget: 3600 },
  { m: "Jun", rev: 3780, ebitda: 28.1, budget: 3700 },
  { m: "Jul", rev: 3690, ebitda: 27.0, budget: 3800 },
  { m: "Aug", rev: 3850, ebitda: 28.8, budget: 3900 },
  { m: "Sep", rev: 4040, ebitda: 29.4, budget: 4000 },
  { m: "Oct", rev: 4120, ebitda: 30.1, budget: 4100 },
  { m: "Nov", rev: 4250, ebitda: 31.0, budget: 4200 },
  { m: "Dec", rev: 4080, ebitda: 28.6, budget: 4300 },
  { m: "Jan", rev: 4190, ebitda: 30.4, budget: 4300 },
  { m: "Feb", rev: 4320, ebitda: 31.2, budget: 4400 },
  { m: "Mar", rev: 4490, ebitda: 32.1, budget: 4500 },
];

// Service line breakdown (£000 YTD)
const services = [
  { name: "Corporate Restructuring", value: 18400, color: "#6366f1", pct: 31.8 },
  { name: "M&A Advisory",            value: 16200, color: "#8b5cf6", pct: 28.0 },
  { name: "Forensic & Disputes",     value: 11600, color: "#06b6d4", pct: 20.1 },
  { name: "PE Advisory",             value:  8100, color: "#10b981", pct: 14.0 },
  { name: "Valuations",              value:  3500, color: "#f59e0b", pct:  6.1 },
];

// Headcount by grade
const grades = [
  { grade: "Partner",  count: 18, target: 18, util: 61, targetUtil: 58, rate: 950 },
  { grade: "Director", count: 32, target: 34, util: 74, targetUtil: 70, rate: 680 },
  { grade: "Manager",  count: 51, target: 52, util: 79, targetUtil: 80, rate: 480 },
  { grade: "Analyst",  count: 41, target: 45, util: 82, targetUtil: 85, rate: 310 },
];

// P&L summary — current month (Mar 25)
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

/* ─────────────────────────────────────────────────────────
   ANIMATION
───────────────────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────────────────
   ANIMATED DONUT
───────────────────────────────────────────────────────── */

function Donut({ data, size = 180, sw = 24 }: { data: typeof services; size?: number; sw?: number }) {
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

/* ─────────────────────────────────────────────────────────
   ANIMATED HORIZONTAL BAR
───────────────────────────────────────────────────────── */

function Bar2({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 100 + delay); return () => clearTimeout(t); }, [pct, delay]);
  return (
    <div className="relative h-[6px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
      <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${w}%`, background: color, transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   GAUGE — half-circle SVG
───────────────────────────────────────────────────────── */

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
      <svg width={cx * 2} height={cy + sw + 6} className="overflow-visible" style={{ transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)" }}>
        <path d={`M${L.x.toFixed(1)},${L.y.toFixed(1)} A${r},${r} 0 0,1 ${R.x.toFixed(1)},${R.y.toFixed(1)}`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={sw} strokeLinecap="round" />
        {p > 0 && <path d={`M${L.x.toFixed(1)},${L.y.toFixed(1)} A${r},${r} 0 ${big},1 ${F.x.toFixed(1)},${F.y.toFixed(1)}`} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" style={{ transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s" }} />}
        <line x1={(cx + r1 * Math.cos(ang)).toFixed(1)} y1={(cy - r1 * Math.sin(ang)).toFixed(1)} x2={(cx + r2 * Math.cos(ang)).toFixed(1)} y2={(cy - r2 * Math.sin(ang)).toFixed(1)} stroke="rgba(255,255,255,0.4)" strokeWidth={2} strokeLinecap="round" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="22" fontWeight="900" fontFamily="ui-monospace,monospace" fill={color}>{value}%</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)" letterSpacing="0.1em" style={{ textTransform: "uppercase" }}>{label}</text>
        <text x={T.x} y={T.y - 7} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.35)">{target}%</text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TOOLTIP
───────────────────────────────────────────────────────── */

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
            {p.value > 100 ? `£${(p.value / 1000).toFixed(1)}M` : `${p.value.toFixed(1)}%`}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TABS
───────────────────────────────────────────────────────── */

type Tab = "overview" | "revenue" | "people" | "reports";

/* ─────────────────────────────────────────────────────────
   TAB: OVERVIEW
───────────────────────────────────────────────────────── */

function Overview() {
  // Count-up hero numbers
  const rev  = useCountUp(12800, 1600, 200);
  const marg = useCountUp(31.2,  1400, 400);
  const cash = useCountUp(9.2,   1400, 600);

  const kpis = [
    { label: "Q1 Revenue",   display: `£${(rev / 1000).toFixed(2)}M`,  delta: "+18.4%", up: true  },
    { label: "EBITDA Margin",display: `${marg.toFixed(1)}%`,             delta: "+3.2pp", up: true  },
    { label: "Cash",         display: `£${cash.toFixed(1)}M`,            delta: "+£1.4M", up: true  },
    { label: "Lockup Days",  display: "94d",                             delta: "–6d",    up: true  },
  ];

  const signals = [
    { color: "#ef4444", text: "M&A pipeline coverage fell to 1.8× — target 2.5×. Review deal sourcing before end of April." },
    { color: "#eab308", text: "Analyst utilisation 82% vs 85% target for 3 consecutive months — capacity review needed." },
    { color: "#22c55e", text: "EBITDA 32.1% this month — highest in 15 months. Cost discipline to be sustained in Q2." },
  ];

  return (
    <div className="space-y-6">
      {/* ── HERO ── */}
      <div className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg,#0c0c24 0%,#12103a 50%,#080f2a 100%)" }}>
        {/* dot grid */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(99,102,241,0.35) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative grid lg:grid-cols-2 gap-0">
          {/* left */}
          <div className="p-10 lg:p-14">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-8" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}>
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
            <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              On track vs £57.6M annual target · 22.2% delivered
            </p>
          </div>
          {/* right — inline mini chart */}
          <div className="px-6 py-10 lg:px-10 flex flex-col justify-center">
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>15-Month Revenue Trend</p>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={monthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip content={<Tip />} />
                <Area type="monotone" dataKey="rev" stroke="#6366f1" strokeWidth={2} fill="url(#heroGrad)" dot={false} name="Revenue" isAnimationActive animationDuration={1400} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── KPI ROW ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{k.label}</p>
            <p className="text-[2.2rem] font-black text-white tabular-nums leading-none">{k.display}</p>
            <div className={`flex items-center gap-1.5 mt-3 text-sm font-semibold ${k.up ? "text-emerald-400" : "text-rose-400"}`}>
              {k.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {k.delta} <span className="font-normal text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>vs prior quarter</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* EBITDA trend — left, wider */}
        <div className="lg:col-span-3 rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
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
                <linearGradient id="eGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis domain={[22, 34]} tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} width={30} />
              <Tooltip content={<Tip />} />
              <ReferenceLine y={28} stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="ebitda" stroke="#22c55e" strokeWidth={2.5} fill="url(#eGrad)" dot={false} name="EBITDA %" isAnimationActive animationDuration={1400} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service mix — right, narrower */}
        <div className="lg:col-span-2 rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Revenue Mix</p>
          <p className="text-white font-bold text-sm mb-6">YTD by practice</p>
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <Donut data={services} size={160} sw={22} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[9px] tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Total</p>
                <p className="text-[1.1rem] font-black text-white tabular-nums">£57.8M</p>
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
        </div>
      </div>

      {/* ── SIGNALS ── */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
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
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TAB: REVENUE
───────────────────────────────────────────────────────── */

function Revenue() {
  return (
    <div className="space-y-6">
      {/* hero metric pair */}
      <div className="grid lg:grid-cols-2 gap-4">
        {[
          { label: "March Revenue",  value: "£4.49M", delta: "+£0.17M",  note: "vs Feb 2025",      up: true,  accent: "#6366f1" },
          { label: "YTD vs Budget",  value: "–£0.8M", delta: "–1.4%",    note: "£57.8M vs £58.6M", up: false, accent: "#ef4444" },
        ].map((c, i) => (
          <div key={i} className="rounded-2xl p-8 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: c.accent }} />
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{c.label}</p>
            <p className="text-[3rem] font-black text-white tabular-nums leading-none">{c.value}</p>
            <div className={`flex items-center gap-2 mt-3 font-semibold text-sm ${c.up ? "text-emerald-400" : "text-rose-400"}`}>
              {c.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {c.delta}
              <span className="font-normal text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>{c.note}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue vs Budget chart */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Revenue vs Budget</p>
        <p className="text-white font-bold text-sm mb-6">Monthly · Jan 24 – Mar 25</p>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={monthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={38} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="rev" radius={[4, 4, 0, 0]} name="Actual" isAnimationActive animationDuration={1000}>
              {monthly.map((d, i) => <Cell key={i} fill={d.rev >= d.budget ? "#6366f1" : "#ef4444"} fillOpacity={0.8} />)}
            </Bar>
            <Bar dataKey="budget" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 3" name="Budget" isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex gap-5 mt-4 justify-end">
          {[{ color: "#6366f1", l: "Above budget" }, { color: "#ef4444", l: "Below budget" }, { color: "rgba(255,255,255,0.3)", l: "Budget line" }].map(lg => (
            <div key={lg.l} className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              <div className="w-2 h-2 rounded-full" style={{ background: lg.color }} />{lg.l}
            </div>
          ))}
        </div>
      </div>

      {/* P&L table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="px-7 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>P&L Summary</p>
          <p className="text-white font-bold text-sm mt-0.5">March 2025</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {["", "Current", "Prior Month", "Margin", "MoM"].map(h => (
                <th key={h} className={`px-7 py-3 text-[9px] font-bold tracking-widest uppercase ${h === "" ? "text-left" : "text-right"}`} style={{ color: "rgba(255,255,255,0.25)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pl.map((row, i) => {
              const mom = ((row.value - row.prev) / row.prev) * 100;
              const isSpecial = row.isGross || row.isEbitda || row.isNet;
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: isSpecial ? "rgba(255,255,255,0.03)" : "transparent" }}>
                  <td className={`px-7 py-3.5 ${isSpecial ? "font-bold text-white" : "font-medium"}`} style={{ color: isSpecial ? undefined : "rgba(255,255,255,0.55)" }}>
                    {row.label}
                  </td>
                  <td className={`px-7 py-3.5 text-right tabular-nums font-bold ${row.isNet ? "text-white" : "text-white"}`}>£{row.value.toLocaleString()}k</td>
                  <td className="px-7 py-3.5 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.35)" }}>£{row.prev.toLocaleString()}k</td>
                  <td className="px-7 py-3.5 text-right tabular-nums font-semibold" style={{ color: row.pct ? "#6366f1" : "rgba(255,255,255,0.2)" }}>
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
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TAB: PEOPLE
───────────────────────────────────────────────────────── */

function People() {
  const avgUtil = grades.reduce((s, g) => s + g.util, 0) / grades.length;
  const avgTgt  = grades.reduce((s, g) => s + g.targetUtil, 0) / grades.length;

  return (
    <div className="space-y-6">
      {/* top stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Headcount", value: "142",     delta: "+8 this quarter",  up: true  },
          { label: "Fee Earners",     value: "108",     delta: "+5 this quarter",  up: true  },
          { label: "Revenue / FTE",   value: "£29.3k",  delta: "+£3.1k MoM",       up: true  },
        ].map((k, i) => (
          <div key={i} className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{k.label}</p>
            <p className="text-[2.4rem] font-black text-white tabular-nums leading-none">{k.value}</p>
            <p className="mt-2 text-sm font-semibold text-emerald-400 flex items-center gap-1"><ArrowUpRight size={13} />{k.delta}</p>
          </div>
        ))}
      </div>

      {/* Gauge + bars */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Gauge */}
        <div className="rounded-2xl p-8 flex flex-col items-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-6 self-start" style={{ color: "rgba(255,255,255,0.3)" }}>Average Utilisation</p>
          <Gauge value={parseFloat(avgUtil.toFixed(1))} target={parseFloat(avgTgt.toFixed(1))} label="Avg utilisation" />
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
        </div>

        {/* Grade bars */}
        <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>Utilisation by Grade</p>
          <div className="space-y-7">
            {grades.map((g, i) => {
              const color = g.util >= g.targetUtil ? "#22c55e" : g.util >= g.targetUtil * 0.97 ? "#eab308" : "#ef4444";
              const diff  = g.util - g.targetUtil;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-white">{g.grade}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>tgt {g.targetUtil}%</span>
                      <span className="text-sm font-black tabular-nums" style={{ color }}>{g.util}%</span>
                      <span className={`text-[10px] font-bold ${diff >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{diff >= 0 ? "+" : ""}{diff}pp</span>
                    </div>
                  </div>
                  <Bar2 pct={g.util} color={color} delay={i * 80} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* headcount chart + grade table */}
      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Headcount Trend</p>
          <p className="text-white font-bold text-sm mb-6">Last 6 months</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={[{m:"Oct",hc:128},{m:"Nov",hc:131},{m:"Dec",hc:130},{m:"Jan",hc:134},{m:"Feb",hc:138},{m:"Mar",hc:142}]} margin={{ top:5, right:5, bottom:0, left:0 }}>
              <defs>
                <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis domain={[120, 150]} tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="hc" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#hcGrad)" dot={{ fill: "#8b5cf6", r: 3 }} name="Headcount" isAnimationActive animationDuration={1200} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="px-7 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Grade Breakdown</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {["Grade", "Count", "Tgt", "Rate"].map(h => (
                  <th key={h} className={`px-5 py-3 text-[9px] font-bold tracking-widest uppercase ${h === "Grade" ? "text-left" : "text-right"}`} style={{ color: "rgba(255,255,255,0.2)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => {
                const ok = g.count >= g.target;
                return (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td className="px-5 py-3.5 font-semibold text-white">{g.grade}</td>
                    <td className={`px-5 py-3.5 text-right font-bold tabular-nums ${ok ? "text-emerald-400" : "text-rose-400"}`}>{g.count}</td>
                    <td className="px-5 py-3.5 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.3)" }}>{g.target}</td>
                    <td className="px-5 py-3.5 text-right tabular-nums font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>£{g.rate}/h</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TAB: REPORTS
───────────────────────────────────────────────────────── */

function Reports() {
  const docs = [
    { title: "Q1 Board Pack",         sub: "Full board-ready PDF · 28 pages",  color: "#6366f1", ready: true  },
    { title: "P&L Statement",         sub: "Mar 2025 · with prior comparisons", color: "#8b5cf6", ready: true  },
    { title: "Cash Flow Forecast",    sub: "6-month forward projection",         color: "#06b6d4", ready: true  },
    { title: "Utilisation Report",    sub: "Grade × month heatmap",             color: "#22c55e", ready: true  },
    { title: "Budget Variance Pack",  sub: "Q1 actual vs budget deep-dive",     color: "#eab308", ready: false },
    { title: "Investor Summary",      sub: "1-page KPI summary — ready Apr 5",  color: "#f43f5e", ready: false },
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {docs.map((d, i) => (
          <div key={i} className="rounded-2xl p-7 flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${d.color}18` }}>
                <Download size={15} style={{ color: d.color }} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{d.title}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{d.sub}</p>
              </div>
            </div>
            <button
              className="w-full rounded-xl py-2.5 text-[11px] font-bold tracking-wide transition-all duration-150"
              style={d.ready
                ? { background: `${d.color}20`, color: d.color, border: `1px solid ${d.color}30` }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.07)", cursor: "default" }}>
              {d.ready ? "Download PDF" : "Generating…"}
            </button>
          </div>
        ))}
      </div>

      {/* print P&L */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Detailed P&L</p>
            <p className="text-white font-bold text-sm mt-0.5">March 2025 · print view</p>
          </div>
          <button className="flex items-center gap-2 text-[11px] font-semibold px-4 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>
            Print
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {["Line Item", "Mar 25", "Feb 25", "Margin", "MoM Change"].map(h => (
                <th key={h} className={`px-8 py-3 text-[9px] font-bold tracking-widest uppercase ${h === "Line Item" ? "text-left" : "text-right"}`} style={{ color: "rgba(255,255,255,0.2)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pl.map((row, i) => {
              const mom = ((row.value - row.prev) / row.prev) * 100;
              const spec = row.isGross || row.isEbitda || row.isNet;
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.035)", background: spec ? "rgba(255,255,255,0.025)" : undefined }}>
                  <td className={`px-8 py-3.5 ${spec ? "font-bold text-white" : "font-medium"}`} style={{ color: spec ? undefined : "rgba(255,255,255,0.5)" }}>{row.label}</td>
                  <td className="px-8 py-3.5 text-right font-bold tabular-nums text-white">£{row.value.toLocaleString()}k</td>
                  <td className="px-8 py-3.5 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.3)" }}>£{row.prev.toLocaleString()}k</td>
                  <td className="px-8 py-3.5 text-right tabular-nums font-semibold" style={{ color: row.pct ? "#6366f1" : "rgba(255,255,255,0.15)" }}>{row.pct ? `${row.pct}%` : "—"}</td>
                  <td className={`px-8 py-3.5 text-right tabular-nums font-semibold ${mom >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{mom >= 0 ? "+" : ""}{mom.toFixed(1)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   ROOT PAGE
───────────────────────────────────────────────────────── */

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview"  },
  { id: "revenue",  label: "Revenue"   },
  { id: "people",   label: "People"    },
  { id: "reports",  label: "Reports"   },
];

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen" style={{ background: "#09090f", color: "rgba(255,255,255,0.85)" }}>
      {/* ── TOP BAR ── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(9,9,15,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1280px] mx-auto px-8 h-14 flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-black text-[12px]">Q</span>
            </div>
            <span className="font-black text-[13px] text-white tracking-tight">Meridian</span>
          </Link>

          {/* Nav */}
          <nav className="flex gap-1">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150"
                style={tab === t.id
                  ? { background: "rgba(99,102,241,0.18)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)" }
                  : { color: "rgba(255,255,255,0.35)", border: "1px solid transparent" }}>
                {t.label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              March 2025
            </div>
            <Link href="/" className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}>
              ← Back to site
            </Link>
          </div>
        </div>
      </header>

      {/* ── CONTENT ── */}
      <main className="max-w-[1280px] mx-auto px-8 py-10">
        {tab === "overview" && <Overview />}
        {tab === "revenue"  && <Revenue />}
        {tab === "people"   && <People />}
        {tab === "reports"  && <Reports />}
      </main>
    </div>
  );
}
