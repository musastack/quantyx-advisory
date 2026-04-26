"use client";

import { useState, useEffect, useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine, Cell,
} from "recharts";
import {
  TrendingUp, TrendingDown, AlertTriangle, DollarSign,
  Users, FileText, BarChart2, Zap, Clock, Activity,
  Minus, ChevronDown, ChevronUp, Home, ArrowRight,
  Printer, Download,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

/* ══════════════════════════════════════════════════════════
   DATASET  —  BTG Advisory Group · Mar 2025
══════════════════════════════════════════════════════════ */

const plData = [
  { month: "Apr", revenue: 9850,  gp: 5983, ebitda: 2127, ebitdaM: 21.6, budget: null   },
  { month: "May", revenue: 9972,  gp: 6073, ebitda: 2075, ebitdaM: 20.8, budget: null   },
  { month: "Jun", revenue: 9860,  gp: 5817, ebitda: 2024, ebitdaM: 20.5, budget: null   },
  { month: "Jul", revenue: 10090, gp: 5983, ebitda: 1887, ebitdaM: 18.7, budget: null   },
  { month: "Aug", revenue: 10020, gp: 5952, ebitda: 2084, ebitdaM: 20.8, budget: null   },
  { month: "Sep", revenue: 10300, gp: 6057, ebitda: 1978, ebitdaM: 19.2, budget: null   },
  { month: "Oct", revenue: 10330, gp: 6291, ebitda: 2138, ebitdaM: 20.7, budget: 10550  },
  { month: "Nov", revenue: 10560, gp: 6431, ebitda: 2184, ebitdaM: 20.7, budget: 10520  },
  { month: "Dec", revenue: 10670, gp: 6412, ebitda: 2091, ebitdaM: 19.6, budget: 10970  },
  { month: "Jan", revenue: 10490, gp: 6294, ebitda: 2127, ebitdaM: 20.3, budget: 10990  },
  { month: "Feb", revenue: 10510, gp: 6359, ebitda: 2207, ebitdaM: 21.0, budget: 10260  },
  { month: "Mar", revenue: 10570, gp: 6427, ebitda: 2336, ebitdaM: 22.1, budget: 11090  },
];

const bvaData = [
  { month: "Oct", budget: 10550, actual: 10330, variance: -220 },
  { month: "Nov", budget: 10520, actual: 10560, variance:  40  },
  { month: "Dec", budget: 10970, actual: 10670, variance: -300 },
  { month: "Jan", budget: 10990, actual: 10490, variance: -500 },
  { month: "Feb", budget: 10260, actual: 10510, variance:  250 },
  { month: "Mar", budget: 11090, actual: 10570, variance: -520 },
];

const recData = [
  { month: "Oct", debtors: 75740, aged91: 70650, lockup: 110 },
  { month: "Nov", debtors: 77620, aged91: 72290, lockup: 119 },
  { month: "Dec", debtors: 80610, aged91: 73880, lockup: 122 },
  { month: "Jan", debtors: 83310, aged91: 75740, lockup: 125 },
  { month: "Feb", debtors: 86380, aged91: 77610, lockup: 119 },
  { month: "Mar", debtors: 89180, aged91: 80590, lockup: 118 },
];

const wipData = [
  { month: "Oct", wip: 44940 },
  { month: "Nov", wip: 47430 },
  { month: "Dec", wip: 45180 },
  { month: "Jan", wip: 42390 },
  { month: "Feb", wip: 40340 },
  { month: "Mar", wip: 39120 },
];

const hcData = [
  { month: "Nov", headcount: 716, feeEarners: 543 },
  { month: "Dec", headcount: 715, feeEarners: 542 },
  { month: "Jan", headcount: 717, feeEarners: 543 },
  { month: "Feb", headcount: 721, feeEarners: 544 },
  { month: "Mar", headcount: 724, feeEarners: 541 },
  { month: "Apr", headcount: 725, feeEarners: 542 },
];

const utilisationHeatmap = [
  { grade: "Partner",       target: 55.0, Oct: 55.2, Nov: 56.0, Dec: 57.1, Jan: 55.8, Feb: 56.2, Mar: 56.9 },
  { grade: "Director",      target: 65.0, Oct: 64.8, Nov: 65.5, Dec: 66.2, Jan: 64.9, Feb: 65.1, Mar: 65.8 },
  { grade: "Sr. Manager",   target: 72.0, Oct: 72.1, Nov: 73.0, Dec: 74.2, Jan: 72.8, Feb: 72.5, Mar: 73.1 },
  { grade: "Manager",       target: 77.0, Oct: 77.5, Nov: 78.1, Dec: 79.0, Jan: 78.2, Feb: 77.9, Mar: 78.3 },
  { grade: "Sr. Associate", target: 80.0, Oct: 79.8, Nov: 80.5, Dec: 81.0, Jan: 80.1, Feb: 79.8, Mar: 80.4 },
  { grade: "Associate",     target: 82.0, Oct: 81.8, Nov: 82.1, Dec: 82.5, Jan: 81.5, Feb: 80.9, Mar: 81.1 },
];
const heatmapMonths = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"] as const;

const serviceLines = [
  { name: "CVL",                    revenue: 8180, color: "#6366f1" },
  { name: "Administration",         revenue: 7050, color: "#8b5cf6" },
  { name: "Restructuring Advisory", revenue: 3800, color: "#06b6d4" },
  { name: "LPA Receivership",       revenue: 2970, color: "#10b981" },
  { name: "Fixed Charge Recv.",     revenue: 2640, color: "#f59e0b" },
  { name: "Creditor Services",      revenue: 2630, color: "#f43f5e" },
  { name: "MVL",                    revenue: 2430, color: "#a78bfa" },
  { name: "Property Valuation",     revenue: 1870, color: "#34d399" },
];

const waterfallData = [
  { name: "Revenue",      base: 0,    amount: 10570, type: "positive" },
  { name: "Cost of Sales",base: 6427, amount: 4143,  type: "negative" },
  { name: "Gross Profit", base: 0,    amount: 6427,  type: "total"    },
  { name: "Staff Costs",  base: 3617, amount: 2810,  type: "negative" },
  { name: "Overhead",     base: 3037, amount: 580,   type: "negative" },
  { name: "Technology",   base: 2817, amount: 220,   type: "negative" },
  { name: "Other Opex",   base: 2336, amount: 481,   type: "negative" },
  { name: "EBITDA",       base: 0,    amount: 2336,  type: "total"    },
  { name: "D&A + Tax",    base: 1790, amount: 546,   type: "negative" },
  { name: "Net Profit",   base: 0,    amount: 1790,  type: "total"    },
];

const kpiData = [
  { name: "Revenue",          current: "£10.57M", raw: 10570,  prev: "£10.51M", delta: "+£60k",  pct: "+0.6%",  up: true,  status: "red"   as const, target: "£11.09M", why: "CVL intake soft — 3rd consecutive budget miss. YTD shortfall £1.4M.",        spark: [10490,10510,10570], icon: DollarSign,    accent: "#f43f5e" },
  { name: "Gross Margin %",   current: "60.8%",   raw: 60.8,   prev: "60.5%",   delta: "+0.3pp", pct: "+0.5%",  up: true,  status: "amber" as const, target: "62.0%",   why: "Improved case mix — more CVL (high margin) replacing lower-margin work.",    spark: [60.0,60.5,60.8],   icon: TrendingUp,    accent: "#8b5cf6" },
  { name: "EBITDA %",         current: "22.1%",   raw: 22.1,   prev: "21.0%",   delta: "+1.1pp", pct: "+5.2%",  up: true,  status: "amber" as const, target: "22.5%",   why: "Recovery from 18.7% Jul low — 3-month improvement from opex discipline.",   spark: [20.3,21.0,22.1],   icon: BarChart2,     accent: "#6366f1" },
  { name: "Net Profit",       current: "£1.79M",  raw: 1790,   prev: "£1.68M",  delta: "+£110k", pct: "+6.5%",  up: true,  status: "amber" as const, target: "£2.24M",  why: "Revenue up £60k + opex savings of £61k — strongest net profit since Oct.",   spark: [1550,1680,1790],   icon: TrendingUp,    accent: "#10b981" },
  { name: "Cash Balance",     current: "£3.95M",  raw: 3950,   prev: "£3.81M",  delta: "+£140k", pct: "+3.7%",  up: true,  status: "amber" as const, target: "£5.00M",  why: "Recovering from Jan trough — net profit conversion improving.",              spark: [3720,3810,3950],   icon: DollarSign,    accent: "#0ea5e9" },
  { name: "Working Capital",  current: "£7.70M",  raw: 7700,   prev: "£7.45M",  delta: "+£250k", pct: "+3.4%",  up: true,  status: "red"   as const, target: "£9.00M",  why: "Current liabilities stable — AR growth and WIP conversion driving increase.", spark: [7200,7450,7700],   icon: Zap,           accent: "#f59e0b" },
  { name: "Lockup Days",      current: "118d",    raw: 118,    prev: "119d",    delta: "–1d",    pct: "–0.8%",  up: true,  status: "red"   as const, target: "90d",     why: "Slow improvement from 125d Jan peak — debtor collections still lagging.",    spark: [125,119,118],      icon: Clock,         accent: "#f43f5e" },
  { name: "Debtors >91 Days", current: "£80.6M",  raw: 80590,  prev: "£77.6M",  delta: "+£3.0M", pct: "+3.8%",  up: false, status: "red"   as const, target: "£60.0M",  why: "91+ bucket growing monthly — insolvency cycles extend timescales.",          spark: [75740,77610,80590],icon: AlertTriangle,  accent: "#f43f5e" },
  { name: "Headcount",        current: "724",     raw: 724,    prev: "721",     delta: "+3",     pct: "+0.4%",  up: true,  status: "green" as const, target: "730",     why: "Steady growth trajectory — 4 hires in Mar across Manager/Associate grades.",spark: [717,721,724],      icon: Users,         accent: "#10b981" },
  { name: "Creditor Days",    current: "41d",     raw: 41,     prev: "43d",     delta: "–2d",    pct: "–4.7%",  up: true,  status: "green" as const, target: "45d",     why: "Faster supplier payments improving vendor relationships — within benchmark.", spark: [45,43,41],         icon: FileText,      accent: "#10b981" },
];

const plDetail = [
  { label: "Revenue",               curr: 10570, prev: 10510, budget: 11090, sub: false, total: false, indent: 0 },
  { label: "Cost of Sales",         curr: 4143,  prev: 4151,  budget: 4210,  sub: false, total: false, indent: 0 },
  { label: "Gross Profit",          curr: 6427,  prev: 6359,  budget: 6880,  sub: true,  total: false, indent: 0 },
  { label: "Staff Costs",           curr: 2810,  prev: 2830,  budget: 2750,  sub: false, total: false, indent: 1 },
  { label: "Overhead & Premises",   curr: 580,   prev: 591,   budget: 590,   sub: false, total: false, indent: 1 },
  { label: "Technology & Systems",  curr: 220,   prev: 218,   budget: 225,   sub: false, total: false, indent: 1 },
  { label: "Professional Fees",     curr: 312,   prev: 295,   budget: 320,   sub: false, total: false, indent: 1 },
  { label: "Other Opex",            curr: 169,   prev: 218,   budget: 175,   sub: false, total: false, indent: 1 },
  { label: "Total Opex",            curr: 4091,  prev: 4152,  budget: 4060,  sub: true,  total: false, indent: 0 },
  { label: "EBITDA",                curr: 2336,  prev: 2207,  budget: 2820,  sub: true,  total: false, indent: 0 },
  { label: "Depreciation & Amort.", curr: 127,   prev: 125,   budget: 130,   sub: false, total: false, indent: 1 },
  { label: "Finance Costs",         curr: 210,   prev: 215,   budget: 210,   sub: false, total: false, indent: 1 },
  { label: "Tax Provision",         curr: 209,   prev: 187,   budget: 240,   sub: false, total: false, indent: 1 },
  { label: "Net Profit",            curr: 1790,  prev: 1680,  budget: 2240,  sub: false, total: true,  indent: 0 },
];

const serviceLineMonthly = [
  { month: "Oct", CVL: 1340, Admin: 1150, Restructuring: 625, LPA: 490, Creditor: 432, MVL: 398, Other: 895  },
  { month: "Nov", CVL: 1380, Admin: 1175, Restructuring: 650, LPA: 503, Creditor: 440, MVL: 406, Other: 1006 },
  { month: "Dec", CVL: 1395, Admin: 1195, Restructuring: 635, LPA: 498, Creditor: 438, MVL: 400, Other: 1109 },
  { month: "Jan", CVL: 1350, Admin: 1158, Restructuring: 620, LPA: 488, Creditor: 428, MVL: 395, Other: 1051 },
  { month: "Feb", CVL: 1385, Admin: 1180, Restructuring: 640, LPA: 495, Creditor: 435, MVL: 402, Other: 973  },
  { month: "Mar", CVL: 1420, Admin: 1210, Restructuring: 658, LPA: 510, Creditor: 442, MVL: 415, Other: 915  },
];

const debtorAging = [
  { month: "Oct", d0_30: 1190, d31_60: 2080, d61_90: 1820, d91plus: 70650 },
  { month: "Nov", d0_30: 1290, d31_60: 2160, d61_90: 1880, d91plus: 72290 },
  { month: "Dec", d0_30: 1430, d31_60: 2280, d61_90: 1920, d91plus: 73880 },
  { month: "Jan", d0_30: 1660, d31_60: 2430, d61_90: 1850, d91plus: 75740 },
  { month: "Feb", d0_30: 1900, d31_60: 2600, d61_90: 1620, d91plus: 77610 },
  { month: "Mar", d0_30: 2110, d31_60: 2760, d61_90: 1640, d91plus: 80590 },
];

const gradeHeadcount = [
  { grade: "Partner",       count: 42,  target: 40,  chargeRate: 850, color: "#6366f1" },
  { grade: "Director",      count: 68,  target: 70,  chargeRate: 650, color: "#8b5cf6" },
  { grade: "Sr. Manager",   count: 95,  target: 98,  chargeRate: 480, color: "#06b6d4" },
  { grade: "Manager",       count: 142, target: 140, chargeRate: 350, color: "#10b981" },
  { grade: "Sr. Associate", count: 198, target: 200, chargeRate: 250, color: "#f59e0b" },
  { grade: "Associate",     count: 179, target: 180, chargeRate: 175, color: "#f43f5e" },
];

const marginCompositionData = [
  { month: "Apr", cos: 39.3, staff: 26.2, overhead: 5.9, tech: 2.3, other: 4.7, net: 21.6 },
  { month: "May", cos: 39.1, staff: 26.4, overhead: 5.8, tech: 2.2, other: 4.7, net: 20.8 },
  { month: "Jun", cos: 40.9, staff: 26.2, overhead: 5.8, tech: 2.2, other: 4.4, net: 20.5 },
  { month: "Jul", cos: 40.7, staff: 27.5, overhead: 5.8, tech: 2.2, other: 5.1, net: 18.7 },
  { month: "Aug", cos: 40.6, staff: 26.6, overhead: 5.9, tech: 2.2, other: 3.9, net: 20.8 },
  { month: "Sep", cos: 41.2, staff: 25.8, overhead: 5.8, tech: 2.2, other: 4.8, net: 19.2 },
  { month: "Oct", cos: 39.1, staff: 26.6, overhead: 5.7, tech: 2.2, other: 5.7, net: 20.7 },
  { month: "Nov", cos: 39.1, staff: 26.5, overhead: 5.7, tech: 2.2, other: 5.8, net: 20.7 },
  { month: "Dec", cos: 39.9, staff: 26.3, overhead: 5.7, tech: 2.2, other: 6.3, net: 19.6 },
  { month: "Jan", cos: 40.0, staff: 27.0, overhead: 5.7, tech: 2.1, other: 4.9, net: 20.3 },
  { month: "Feb", cos: 39.5, staff: 26.9, overhead: 5.6, tech: 2.1, other: 4.9, net: 21.0 },
  { month: "Mar", cos: 39.2, staff: 26.6, overhead: 5.5, tech: 2.1, other: 4.5, net: 22.1 },
];

/* ══════════════════════════════════════════════════════════
   ANIMATION UTILITIES
══════════════════════════════════════════════════════════ */

function useCountUp(target: number, duration = 1400, delay = 0): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let raf: number;
    timer = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const progress = Math.min((Date.now() - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(target * eased);
        if (progress < 1) raf = requestAnimationFrame(tick);
        else setValue(target);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [target, duration, delay]);
  return value;
}

/* ══════════════════════════════════════════════════════════
   PRIMITIVE COMPONENTS
══════════════════════════════════════════════════════════ */

function AnimatedBar({ pct, color, delay = 0, height = 6 }: { pct: number; color: string; delay?: number; height?: number }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(pct), 80 + delay); return () => clearTimeout(t); }, [pct, delay]);
  return (
    <div style={{ height, background: "rgba(148,163,184,0.15)" }} className="w-full rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${w}%`, background: color, transition: `width 1.1s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms` }} />
    </div>
  );
}

function AnimatedDonut({ segments, size = 140, sw = 18 }: { segments: { value: number; color: string; label: string }[]; size?: number; sw?: number }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 300); return () => clearTimeout(t); }, []);
  const r = (size - sw) / 2;
  const cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const total = segments.reduce((s, g) => s + g.value, 0);
  let cum = 0;
  const arcs = segments.map(seg => {
    const pct = seg.value / total;
    const start = cum;
    cum += pct;
    return { ...seg, dash: pct * circ, offset: circ * (1 - start) };
  });
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth={sw} />
      {arcs.map((arc, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={arc.color}
          strokeWidth={sw - 2} strokeLinecap="butt"
          strokeDasharray={ready ? `${arc.dash} ${circ - arc.dash}` : `0 ${circ}`}
          strokeDashoffset={arc.offset}
          style={{ transition: `stroke-dasharray 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s` }}
        />
      ))}
    </svg>
  );
}

function GaugeMeter({ value, target }: { value: number; target: number }) {
  const r = 54, sw = 11, cx = 78, cy = 72;
  const clamp = (v: number) => Math.min(Math.max(v, 0), 100);
  const pct  = clamp(value) / 100;
  const tpct = clamp(target) / 100;
  const color = value >= target ? "#10b981" : value >= target * 0.94 ? "#f59e0b" : "#f43f5e";
  function pt(p: number) { const ang = Math.PI * (1 - p); return { x: cx + r * Math.cos(ang), y: cy - r * Math.sin(ang) }; }
  const L = pt(0), R = pt(1), F = pt(pct), T = pt(tpct);
  const trackD = `M ${L.x.toFixed(1)},${L.y.toFixed(1)} A ${r},${r} 0 0,1 ${R.x.toFixed(1)},${R.y.toFixed(1)}`;
  const fillD  = pct <= 0 ? "" : `M ${L.x.toFixed(1)},${L.y.toFixed(1)} A ${r},${r} 0 ${pct > 0.5 ? 1 : 0},1 ${F.x.toFixed(1)},${F.y.toFixed(1)}`;
  const angT = Math.PI * (1 - tpct);
  const r1 = r - sw / 2 - 2, r2 = r + sw / 2 + 2;
  return (
    <svg width={cx * 2} height={cy + sw + 4} viewBox={`0 0 ${cx * 2} ${cy + sw + 4}`} className="overflow-visible">
      <path d={trackD} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth={sw} strokeLinecap="round" />
      {pct > 0 && <path d={fillD} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />}
      <line
        x1={(cx + r1 * Math.cos(angT)).toFixed(1)} y1={(cy - r1 * Math.sin(angT)).toFixed(1)}
        x2={(cx + r2 * Math.cos(angT)).toFixed(1)} y2={(cy - r2 * Math.sin(angT)).toFixed(1)}
        stroke="#94a3b8" strokeWidth={2} strokeLinecap="round"
      />
      <text x={cx} y={cy - 2} textAnchor="middle" dominantBaseline="middle" fontSize="19" fontWeight="900" fontFamily="ui-monospace,monospace" fill={color}>{value.toFixed(1)}%</text>
      <text x={cx} y={cy + 13} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#94a3b8" letterSpacing="0.1em" style={{ textTransform: "uppercase" }}>vs {target}% target</text>
      <text x={L.x} y={L.y + 12} textAnchor="middle" fontSize="8" fill="#64748b">0%</text>
      <text x={R.x} y={R.y + 12} textAnchor="end" fontSize="8" fill="#64748b">100%</text>
      <text x={T.x} y={T.y - 8} textAnchor="middle" fontSize="8" fill="#94a3b8">{target}%</text>
    </svg>
  );
}

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  if (data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const W = 56, H = 22, p = 2;
  const pts = data.map((v, i) => {
    const x = p + (i / (data.length - 1)) * (W - p * 2);
    const y = H - p - ((v - min) / range) * (H - p * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const color = up ? "#10b981" : "#f43f5e";
  const last = pts.split(" ").at(-1)!.split(",");
  return (
    <svg width={W} height={H} className="overflow-visible shrink-0">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

function StatusPill({ s }: { s: "green" | "amber" | "red" }) {
  const cfg = {
    green: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    amber: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    red:   "bg-rose-500/15 text-rose-400 border border-rose-500/20",
  };
  const label = { green: "On Track", amber: "Watch", red: "Off Track" };
  return <span className={`text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-full ${cfg[s]}`}>{label[s]}</span>;
}

interface TooltipProps { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string; }
function ChartTip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d0d1a] border border-white/10 rounded-xl px-3.5 py-2.5 shadow-2xl text-xs min-w-[130px]">
      <p className="text-white/40 font-semibold uppercase tracking-[0.1em] text-[9px] mb-2">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-4 mb-0.5">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.color }} />
            <span className="text-white/50">{p.name}</span>
          </span>
          <span className="font-bold text-white">
            {typeof p.value === "number" && p.value > 1000 ? `£${(p.value / 1000).toFixed(0)}k` :
             typeof p.value === "number" && p.value < 200  ? `${p.value.toFixed(1)}%` : p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   GLASS CARD
══════════════════════════════════════════════════════════ */

function GCard({ children, className = "", accent }: { children: React.ReactNode; className?: string; accent?: string }) {
  return (
    <div className={`relative rounded-2xl border overflow-hidden ${className}
      bg-white border-slate-200 shadow-sm
      dark:bg-white/[0.03] dark:border-white/[0.07] dark:shadow-none`}>
      {accent && <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accent }} />}
      {children}
    </div>
  );
}

function SHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h2>
      {sub && <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5 font-medium">{sub}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   KPI CARD  (expandable)
══════════════════════════════════════════════════════════ */

type KpiEntry = typeof kpiData[number];

function KpiCard({ k }: { k: KpiEntry }) {
  const [open, setOpen] = useState(false);
  const Icon = k.icon;
  return (
    <GCard accent={k.accent} className="cursor-pointer select-none">
      <div className="p-4" onClick={() => setOpen(!open)}>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${k.accent}20` }}>
              <Icon size={13} style={{ color: k.accent }} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-white/35">{k.name}</span>
          </div>
          <StatusPill s={k.status} />
        </div>
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="text-[1.6rem] font-black tracking-tight text-slate-900 dark:text-white font-mono leading-none">{k.current}</div>
            <div className={`text-[11px] font-bold mt-1 ${k.up ? "text-emerald-500" : "text-rose-500"}`}>{k.delta} MoM</div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Sparkline data={k.spark} up={k.up} />
            <span className="text-[10px] text-slate-400 dark:text-white/25">prev {k.prev}</span>
          </div>
        </div>
      </div>
      {open && (
        <div className="px-4 pb-4 border-t border-slate-100 dark:border-white/[0.06] pt-3">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-slate-50 dark:bg-white/[0.04] rounded-xl p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-white/30 mb-0.5">Target</div>
              <div className="text-[13px] font-bold text-slate-900 dark:text-white">{k.target}</div>
            </div>
            <div className="bg-slate-50 dark:bg-white/[0.04] rounded-xl p-2.5">
              <div className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-white/30 mb-0.5">vs Prev</div>
              <div className={`text-[13px] font-bold ${k.up ? "text-emerald-500" : "text-rose-500"}`}>{k.pct}</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-white/40 leading-relaxed">{k.why}</p>
        </div>
      )}
      <div className="flex justify-center pb-1.5">
        <div className="text-slate-300 dark:text-white/15">{open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}</div>
      </div>
    </GCard>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION: OVERVIEW
══════════════════════════════════════════════════════════ */

function OverviewSection() {
  const heroKpis = [
    { label: "Monthly Revenue",  value: "£10.57M", delta: "+£60k MoM",  deltaUp: true,  note: "–4.7% vs budget",      accent: "linear-gradient(90deg,#6366f1,#8b5cf6)" },
    { label: "EBITDA Margin",    value: "22.1%",   delta: "+1.1pp MoM", deltaUp: true,  note: "–0.4pp vs target",     accent: "linear-gradient(90deg,#8b5cf6,#06b6d4)" },
    { label: "Cash Balance",     value: "£3.95M",  delta: "+£140k MoM", deltaUp: true,  note: "–£1.05M vs target",    accent: "linear-gradient(90deg,#0ea5e9,#6366f1)" },
    { label: "Lockup Days",      value: "118d",    delta: "–1d MoM",    deltaUp: true,  note: "+28d above 90d target", accent: "linear-gradient(90deg,#f43f5e,#f59e0b)" },
  ];

  const alerts = [
    { rag: "red",   text: "91+ debtor balance £80.6M — £20.6M above target. Initiate recovery programme.", icon: "🔴" },
    { rag: "red",   text: "CVL revenue 3rd consecutive budget miss — YTD shortfall £1.4M.",                icon: "🔴" },
    { rag: "amber", text: "Lockup 28 days above 90d target — recovery pace 2.5d/month.",                  icon: "🟡" },
    { rag: "green", text: "EBITDA 22.1% — highest in 12 months. Sustain cost discipline.",                icon: "🟢" },
  ];

  return (
    <div>
      {/* Always-dark hero band */}
      <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "linear-gradient(135deg,#05050f 0%,#0d0d1f 50%,#080814 100%)" }}>
        <div className="px-6 pt-5 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">Live · Mar 2025</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <span className="text-[10px] text-white/25 font-medium">BTG Advisory Group — CEO Operating System</span>
          </div>
        </div>
        <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {heroKpis.map(h => (
            <div key={h.label} className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.04] p-5 flex flex-col gap-2 hover:bg-white/[0.07] transition-colors duration-200">
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: h.accent }} />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">{h.label}</span>
              <span className="text-[2rem] font-black tracking-tight text-white font-mono leading-none">{h.value}</span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[11px] font-bold ${h.deltaUp ? "text-emerald-400" : "text-rose-400"}`}>{h.delta}</span>
                <span className="text-[10px] text-white/25 font-medium">{h.note}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Narrative */}
        <div className="mx-5 mb-4 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-3">
          <p className="text-[12px] text-indigo-200/70 leading-relaxed italic">
            Revenue £10.57M — £520k below budget for the third consecutive month. EBITDA 22.1%, the highest in 12 months, driven by cost discipline. Collections remain the key risk with £80.6M aged 91+ days.
          </p>
        </div>
        {/* Alerts */}
        <div className="mx-5 mb-5 space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[11px] font-medium ${
              a.rag === "red"   ? "bg-rose-500/10 border border-rose-500/20 text-rose-300" :
              a.rag === "amber" ? "bg-amber-500/10 border border-amber-500/20 text-amber-300" :
                                  "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
            }`}>
              <span>{a.icon}</span><span>{a.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <SHead title="KPI Scorecard" sub="Mar 2025 · Click any card to expand detail" />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {kpiData.map(k => <KpiCard key={k.name} k={k} />)}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION: FINANCIAL PERFORMANCE
══════════════════════════════════════════════════════════ */

function FinancialSection() {
  const [view, setView] = useState<"ebitda" | "revenue" | "waterfall" | "margin" | "table">("ebitda");
  const wfColor = (type: string) => type === "positive" ? "#6366f1" : type === "total" ? "#8b5cf6" : "#f43f5e";
  const views   = ["ebitda", "revenue", "waterfall", "margin", "table"] as const;
  const labels  = ["EBITDA Trend", "Revenue vs Budget", "P&L Waterfall", "Margin Mix", "P&L Table"];

  return (
    <div>
      <SHead title="Financial Performance" sub="Apr 2024 – Mar 2025 · 12-month view" />
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "YTD Revenue",   value: "£123.2M", delta: "+4.1% YoY",   up: true,  accent: "#6366f1" },
          { label: "YTD EBITDA",    value: "£23.3M",  delta: "18.9% margin", up: true,  accent: "#8b5cf6" },
          { label: "YTD vs Budget", value: "–£1.4M",  delta: "–1.1% miss",   up: false, accent: "#f43f5e" },
        ].map(s => (
          <GCard key={s.label} accent={s.accent} className="p-4">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-white/30 mb-2">{s.label}</div>
            <div className="text-[1.4rem] font-black font-mono text-slate-900 dark:text-white">{s.value}</div>
            <div className={`text-[11px] font-bold mt-1 ${s.up ? "text-emerald-500" : "text-rose-500"}`}>{s.delta}</div>
          </GCard>
        ))}
      </div>

      <div className="flex gap-1.5 mb-4 flex-wrap">
        {views.map((v, i) => (
          <button key={v} onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150 ${
              view === v ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/[0.05] dark:text-white/40 dark:hover:bg-white/[0.09]"
            }`}>{labels[i]}</button>
        ))}
      </div>

      <GCard className="p-5">
        {view === "ebitda" && (
          <>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-4">EBITDA Margin % · 12 months</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={plData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="ebitdaG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[17, 24]} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} width={36} />
                <Tooltip content={<ChartTip />} />
                <ReferenceLine y={20} stroke="#f59e0b" strokeDasharray="4 3" strokeWidth={1} label={{ value: "20% ref", position: "right", fontSize: 9, fill: "#f59e0b" }} />
                <Area type="monotone" dataKey="ebitdaM" stroke="#6366f1" strokeWidth={2.5} fill="url(#ebitdaG)" dot={false} activeDot={{ r: 5, fill: "#6366f1" }} name="EBITDA %" isAnimationActive animationDuration={1200} />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
        {view === "revenue" && (
          <>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-4">Revenue vs Budget · Oct–Mar</p>
            <ResponsiveContainer width="100%" height={280}>
              <ComposedChart data={bvaData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `£${v / 1000}M`} width={42} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="actual" name="Actual" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={900}>
                  {bvaData.map((d, i) => <Cell key={i} fill={d.actual >= d.budget ? "#10b981" : "#f43f5e"} fillOpacity={0.85} />)}
                </Bar>
                <Line type="monotone" dataKey="budget" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 3" dot={false} name="Budget" isAnimationActive animationDuration={1200} />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-6 gap-1.5">
              {bvaData.map(d => (
                <div key={d.month} className={`rounded-lg p-2 text-center ${d.variance >= 0 ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
                  <div className="text-[9px] text-slate-400 dark:text-white/30">{d.month}</div>
                  <div className={`text-[11px] font-bold ${d.variance >= 0 ? "text-emerald-500" : "text-rose-500"}`}>{d.variance >= 0 ? "+" : ""}{d.variance}k</div>
                </div>
              ))}
            </div>
          </>
        )}
        {view === "waterfall" && (
          <>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-4">P&L Bridge — Mar 2025 (£000)</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={waterfallData} margin={{ top: 10, right: 10, bottom: 40, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} angle={-35} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={40} tickFormatter={v => `£${v / 1000}M`} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="base"   stackId="a" fill="transparent" isAnimationActive={false} />
                <Bar dataKey="amount" stackId="a" radius={[4, 4, 0, 0]} name="Amount" isAnimationActive animationDuration={1000}>
                  {waterfallData.map((d, i) => <Cell key={i} fill={wfColor(d.type)} fillOpacity={0.9} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3 justify-center text-[10px]">
              {[{ color: "#6366f1", label: "Revenue" }, { color: "#f43f5e", label: "Deduction" }, { color: "#8b5cf6", label: "Subtotal" }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} /><span className="text-slate-500 dark:text-white/30">{l.label}</span></div>
              ))}
            </div>
          </>
        )}
        {view === "margin" && (
          <>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-4">Margin Composition — % of Revenue</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={marginCompositionData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} width={32} />
                <Tooltip content={<ChartTip />} />
                {[
                  { k: "cos",      color: "#f43f5e", name: "Cost of Sales" },
                  { k: "staff",    color: "#f59e0b", name: "Staff"         },
                  { k: "overhead", color: "#8b5cf6", name: "Overhead"      },
                  { k: "tech",     color: "#06b6d4", name: "Technology"    },
                  { k: "other",    color: "#94a3b8", name: "Other Opex"    },
                  { k: "net",      color: "#10b981", name: "Net Profit"    },
                ].map(b => (
                  <Bar key={b.k} dataKey={b.k} stackId="a" fill={b.color} fillOpacity={0.85} name={b.name} isAnimationActive animationDuration={1000} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
        {view === "table" && (
          <div className="overflow-x-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-4">P&L Detail — Mar 2025</p>
            <table className="w-full text-[12px] text-left">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                  {["Line Item", "Mar 25", "Feb 25", "Budget", "Var £", "Var %"].map(h => (
                    <th key={h} className="pb-2 pr-4 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {plDetail.map((row, i) => {
                  const varE = row.curr - row.budget;
                  const varP = varE / row.budget * 100;
                  return (
                    <tr key={i} className={`border-b ${row.total ? "border-indigo-200/30 dark:border-indigo-500/20" : "border-slate-50 dark:border-white/[0.03]"} ${row.sub ? "bg-slate-50/50 dark:bg-white/[0.02]" : ""}`}>
                      <td className={`py-2 pr-4 ${row.total ? "font-black text-slate-900 dark:text-white/95" : row.sub ? "font-bold text-slate-700 dark:text-white/80" : "font-medium text-slate-600 dark:text-white/55"}`}
                        style={{ paddingLeft: row.indent ? `${row.indent * 16 + 8}px` : "8px" }}>
                        {row.label}
                      </td>
                      <td className={`py-2 pr-4 font-mono ${row.total ? "font-black text-slate-900 dark:text-white/95" : "font-semibold text-slate-800 dark:text-white/70"}`}>£{row.curr.toLocaleString()}</td>
                      <td className="py-2 pr-4 font-mono text-slate-500 dark:text-white/35">£{row.prev.toLocaleString()}</td>
                      <td className="py-2 pr-4 font-mono text-slate-400 dark:text-white/25">£{row.budget.toLocaleString()}</td>
                      <td className={`py-2 pr-4 font-semibold font-mono ${varE >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{varE >= 0 ? "+" : ""}{varE.toLocaleString()}</td>
                      <td className={`py-2 font-semibold font-mono ${varP >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{varP >= 0 ? "+" : ""}{varP.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </GCard>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION: CASH & COLLECTIONS
══════════════════════════════════════════════════════════ */

function CashSection() {
  const [view, setView] = useState<"aging" | "lockup" | "wip">("aging");

  const agingMix = [
    { label: "Current (0–30d)", value: 2110,  color: "#10b981" },
    { label: "31–60 Days",      value: 2760,  color: "#f59e0b" },
    { label: "61–90 Days",      value: 1640,  color: "#f97316" },
    { label: "91+ Days",        value: 80590, color: "#f43f5e" },
  ];
  const totalDebtors = agingMix.reduce((s, a) => s + a.value, 0);

  return (
    <div>
      <SHead title="Cash & Collections" sub="Debtor aging · Lockup days · WIP conversion" />

      <div className="rounded-2xl overflow-hidden mb-6 p-5" style={{ background: "linear-gradient(135deg,#05050f,#0d0d1f)" }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Debtors",  value: "£89.2M", delta: "+£2.8M MoM", up: false, accent: "#f43f5e" },
            { label: "Aged 91+ Days",  value: "£80.6M", delta: "+£3.0M MoM", up: false, accent: "#f43f5e" },
            { label: "Lockup Days",    value: "118d",   delta: "–1d MoM",    up: true,  accent: "#f59e0b" },
            { label: "WIP Balance",    value: "£39.1M", delta: "–£1.2M MoM", up: true,  accent: "#6366f1" },
          ].map(s => (
            <div key={s.label} className="relative pt-3">
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-full" style={{ background: s.accent }} />
              <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/35 mb-1">{s.label}</div>
              <div className="text-[1.5rem] font-black font-mono text-white">{s.value}</div>
              <div className={`text-[11px] font-bold mt-0.5 ${s.up ? "text-emerald-400" : "text-rose-400"}`}>{s.delta}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-1.5 mb-4">
        {(["aging", "lockup", "wip"] as const).map((v, i) => (
          <button key={v} onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${view === v ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/[0.09]"}`}>
            {["Debtor Aging", "Lockup Trend", "WIP Conversion"][i]}
          </button>
        ))}
      </div>

      <GCard className="p-5">
        {view === "aging" && (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center gap-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30">Debtor Mix — Mar 2025</p>
              <div className="relative">
                <AnimatedDonut segments={agingMix} size={180} sw={22} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[9px] uppercase tracking-[0.12em] text-slate-400 dark:text-white/30">Total</span>
                  <span className="text-[1rem] font-black font-mono text-slate-900 dark:text-white">£{(totalDebtors / 1000).toFixed(0)}k</span>
                </div>
              </div>
              <div className="space-y-2 w-full max-w-[220px]">
                {agingMix.map((a, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: a.color }} />
                    <span className="text-[11px] text-slate-500 dark:text-white/40 flex-1">{a.label}</span>
                    <span className="text-[11px] font-bold text-slate-900 dark:text-white font-mono">£{(a.value / 1000).toFixed(0)}k</span>
                    <span className="text-[10px] text-slate-400 dark:text-white/25 w-9 text-right">{(a.value / totalDebtors * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-3">6-Month Aging Trend</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={debtorAging} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} width={38} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="d0_30"   stackId="a" fill="#10b981" fillOpacity={0.85} name="0–30d"  isAnimationActive animationDuration={900} />
                  <Bar dataKey="d31_60"  stackId="a" fill="#f59e0b" fillOpacity={0.85} name="31–60d" isAnimationActive animationDuration={900} />
                  <Bar dataKey="d61_90"  stackId="a" fill="#f97316" fillOpacity={0.85} name="61–90d" isAnimationActive animationDuration={900} />
                  <Bar dataKey="d91plus" stackId="a" fill="#f43f5e" fillOpacity={0.9}  name="91+d"   isAnimationActive animationDuration={900} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {view === "lockup" && (
          <>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-4">Lockup Days · Oct–Mar</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={recData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="lockupG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis domain={[85, 130]} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}d`} width={36} />
                <Tooltip content={<ChartTip />} />
                <ReferenceLine y={90} stroke="#10b981" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: "90d target", position: "right", fontSize: 9, fill: "#10b981" }} />
                <Area type="monotone" dataKey="lockup" stroke="#f43f5e" strokeWidth={2.5} fill="url(#lockupG)" dot={{ fill: "#f43f5e", r: 4 }} name="Lockup Days" isAnimationActive animationDuration={1200} />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
        {view === "wip" && (
          <>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-4">WIP Balance · Oct–Mar (£000)</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={wipData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="wipG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(0)}M`} width={42} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="wip" stroke="#6366f1" strokeWidth={2.5} fill="url(#wipG)" dot={{ fill: "#6366f1", r: 4 }} name="WIP" isAnimationActive animationDuration={1200} />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
      </GCard>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION: PEOPLE & CAPACITY
══════════════════════════════════════════════════════════ */

function PeopleSection() {
  const [view, setView] = useState<"util" | "pyramid" | "heatmap">("util");
  const avgUtil   = utilisationHeatmap.reduce((s, g) => s + g.Mar, 0) / utilisationHeatmap.length;
  const avgTarget = utilisationHeatmap.reduce((s, g) => s + g.target, 0) / utilisationHeatmap.length;

  return (
    <div>
      <SHead title="People & Capacity" sub="Mar 2025 · 724 headcount · 541 fee earners" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Headcount", value: "724",    delta: "+3 MoM",  up: true,  accent: "#6366f1" },
          { label: "Fee Earners",     value: "541",    delta: "–3 MoM",  up: false, accent: "#8b5cf6" },
          { label: "Avg Utilisation", value: "78.3%",  delta: "+0.4pp",  up: true,  accent: "#10b981" },
          { label: "Revenue / FTE",   value: "£19.5k", delta: "+£0.2k",  up: true,  accent: "#0ea5e9" },
        ].map(s => (
          <GCard key={s.label} accent={s.accent} className="p-4">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-white/30 mb-2">{s.label}</div>
            <div className="text-[1.4rem] font-black font-mono text-slate-900 dark:text-white">{s.value}</div>
            <div className={`text-[11px] font-bold mt-1 ${s.up ? "text-emerald-500" : "text-rose-500"}`}>{s.delta}</div>
          </GCard>
        ))}
      </div>

      <div className="flex gap-1.5 mb-4">
        {(["util", "pyramid", "heatmap"] as const).map((v, i) => (
          <button key={v} onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${view === v ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/[0.09]"}`}>
            {["Utilisation by Grade", "Headcount Pyramid", "Utilisation Heatmap"][i]}
          </button>
        ))}
      </div>

      <GCard className="p-5">
        {view === "util" && (
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col items-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-3">Average Utilisation vs Target</p>
              <GaugeMeter value={parseFloat(avgUtil.toFixed(1))} target={parseFloat(avgTarget.toFixed(1))} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-4">Mar 2025 by Grade</p>
              <div className="space-y-4">
                {utilisationHeatmap.map((g, i) => {
                  const pct   = g.Mar;
                  const above = pct >= g.target;
                  const color = above ? "#10b981" : pct >= g.target * 0.97 ? "#f59e0b" : "#f43f5e";
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-white/60">{g.grade}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 dark:text-white/30">tgt {g.target}%</span>
                          <span className="text-[12px] font-black font-mono" style={{ color }}>{pct}%</span>
                        </div>
                      </div>
                      <AnimatedBar pct={pct} color={color} delay={i * 80} height={7} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {view === "pyramid" && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-5">Headcount Pyramid — Mar 2025</p>
            <div className="space-y-3">
              {gradeHeadcount.map((g, i) => {
                const max  = 250;
                const bPct = (g.count / max) * 100;
                const tPct = (g.target / max) * 100;
                const diff = g.count - g.target;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-white/40 w-[100px] text-right shrink-0">{g.grade}</span>
                    <div className="flex-1 relative h-7">
                      <div className="absolute inset-y-0 left-0 rounded-lg opacity-20" style={{ width: `${tPct}%`, background: g.color }} />
                      <div className="absolute inset-y-0 left-0 rounded-lg" style={{ width: `${bPct}%`, background: g.color, opacity: 0.85, transition: `width 1.1s cubic-bezier(0.34,1.56,0.64,1) ${i * 80}ms` }} />
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[13px] font-black font-mono text-slate-900 dark:text-white w-8">{g.count}</span>
                      <span className={`text-[10px] font-bold ${diff >= 0 ? "text-emerald-500" : "text-rose-500"}`}>{diff >= 0 ? "+" : ""}{diff}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/[0.06]">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-3">Avg Charge Rate by Grade</p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {gradeHeadcount.map((g, i) => (
                  <div key={i} className="rounded-xl p-2.5 text-center" style={{ background: `${g.color}15`, border: `1px solid ${g.color}25` }}>
                    <div className="text-[8px] font-bold uppercase tracking-wider mb-0.5" style={{ color: g.color }}>{g.grade.split(" ").pop()}</div>
                    <div className="text-[13px] font-black font-mono text-slate-900 dark:text-white">£{g.chargeRate}</div>
                    <div className="text-[9px] text-slate-400 dark:text-white/25">/hr</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {view === "heatmap" && (
          <div className="overflow-x-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-4">Utilisation Heatmap — 6 months</p>
            <table className="w-full text-[11px]">
              <thead>
                <tr>
                  <th className="pb-3 pr-4 text-left text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30">Grade</th>
                  <th className="pb-3 pr-2 text-center text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30">Tgt</th>
                  {heatmapMonths.map(m => <th key={m} className="pb-3 px-2 text-center text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30">{m}</th>)}
                </tr>
              </thead>
              <tbody>
                {utilisationHeatmap.map((row, ri) => (
                  <tr key={ri}>
                    <td className="py-1.5 pr-4 font-semibold text-slate-600 dark:text-white/60 whitespace-nowrap">{row.grade}</td>
                    <td className="py-1.5 pr-2 text-center font-mono text-slate-400 dark:text-white/30">{row.target}%</td>
                    {heatmapMonths.map(m => {
                      const v     = row[m] as number;
                      const delta = v - row.target;
                      const bg    = delta >= 1 ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300" : delta >= 0 ? "bg-sky-500/15 text-sky-600 dark:text-sky-300" : delta >= -1 ? "bg-amber-500/20 text-amber-600 dark:text-amber-300" : "bg-rose-500/20 text-rose-600 dark:text-rose-300";
                      return (
                        <td key={m} className="py-1 px-1">
                          <div className={`rounded-lg px-2 py-1 text-center font-mono font-bold text-[11px] ${bg}`}>
                            {v.toFixed(1)}%
                            <div className="text-[8px] font-normal opacity-70">{delta >= 0 ? "+" : ""}{delta.toFixed(1)}</div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GCard>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION: SERVICE LINES
══════════════════════════════════════════════════════════ */

function ServiceSection() {
  const [view, setView] = useState<"leaderboard" | "trend" | "mix">("leaderboard");
  const total = serviceLines.reduce((s, l) => s + l.revenue, 0);
  const slColors = ["#6366f1","#8b5cf6","#06b6d4","#10b981","#f59e0b","#f43f5e","#a78bfa","#34d399"];

  return (
    <div>
      <SHead title="Service Lines" sub="YTD Apr 2024 – Mar 2025 · 8 practice areas" />
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Top Line (CVL)",     value: "£8.18M", pct: "25.8%", accent: "#6366f1" },
          { label: "Restructuring Rev.", value: "£3.80M", pct: "11.9%", accent: "#8b5cf6" },
          { label: "MVL Revenue",        value: "£2.43M", pct: "7.6%",  accent: "#10b981" },
        ].map(s => (
          <GCard key={s.label} accent={s.accent} className="p-4">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-white/30 mb-2">{s.label}</div>
            <div className="text-[1.3rem] font-black font-mono text-slate-900 dark:text-white">{s.value}</div>
            <div className="text-[11px] text-slate-400 dark:text-white/30 mt-0.5">{s.pct} of revenue</div>
          </GCard>
        ))}
      </div>

      <div className="flex gap-1.5 mb-4">
        {(["leaderboard", "trend", "mix"] as const).map((v, i) => (
          <button key={v} onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${view === v ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500 dark:bg-white/[0.05] dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/[0.09]"}`}>
            {["Leaderboard", "Monthly Trend", "Revenue Mix"][i]}
          </button>
        ))}
      </div>

      <GCard className="p-5">
        {view === "leaderboard" && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-5">YTD Revenue by Service Line (£000)</p>
            <div className="space-y-4">
              {serviceLines.map((sl, i) => {
                const pct = (sl.revenue / total) * 100;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: sl.color }} />
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-white/60 w-[160px] shrink-0">{sl.name}</span>
                    <div className="flex-1">
                      <AnimatedBar pct={pct * (100 / 26)} color={sl.color} delay={i * 70} height={8} />
                    </div>
                    <span className="text-[12px] font-black font-mono text-slate-900 dark:text-white w-[58px] text-right">£{sl.revenue.toLocaleString()}k</span>
                    <span className="text-[10px] text-slate-400 dark:text-white/25 w-[38px] text-right">{pct.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {view === "trend" && (
          <>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30 mb-4">Monthly Revenue by Service Line (£000)</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceLineMonthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `£${v}k`} width={42} />
                <Tooltip content={<ChartTip />} />
                {(["CVL","Admin","Restructuring","LPA","Creditor","MVL","Other"] as const).map((k, i) => (
                  <Bar key={k} dataKey={k} stackId="a" fill={slColors[i]} fillOpacity={0.85} isAnimationActive animationDuration={900} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
        {view === "mix" && (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center">
              <AnimatedDonut segments={serviceLines.map(s => ({ value: s.revenue, color: s.color, label: s.name }))} size={200} sw={26} />
            </div>
            <div className="space-y-2">
              {serviceLines.map((sl, i) => (
                <div key={i} className="flex items-center justify-between gap-2 rounded-xl px-3 py-2" style={{ background: `${sl.color}10`, border: `1px solid ${sl.color}20` }}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: sl.color }} />
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-white/70">{sl.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-black font-mono text-slate-900 dark:text-white">£{sl.revenue.toLocaleString()}k</span>
                    <span className="text-[10px] w-9 text-right" style={{ color: sl.color }}>{((sl.revenue / total) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </GCard>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION: RISKS & ALERTS
══════════════════════════════════════════════════════════ */

function AlertsSection() {
  const alerts = [
    { rank: 1, rag: "red",   area: "Collections",   action: "Initiate 91+ debtor recovery programme",  detail: "£80.6M aged 91+ days — £20.6M above £60M target. Assign recovery lead by 4 Apr.", impact: "£8–12M recoverable in 90 days", icon: "🔴" },
    { rank: 2, rag: "red",   area: "Revenue",        action: "CVL pipeline emergency review",            detail: "3rd consecutive budget miss — £1.4M YTD shortfall. Requires intake strategy review.",   impact: "£520k/month revenue at risk",  icon: "🔴" },
    { rank: 3, rag: "amber", area: "Liquidity",      action: "Accelerate lockup reduction to 90d",       detail: "118d vs 90d target — each 1-day reduction releases ~£350k. Current pace: 2.5d/month.", impact: "£9.8M tied in excess lockup",  icon: "🟡" },
    { rank: 4, rag: "amber", area: "Staffing",       action: "Director grade 2 below headcount target",  detail: "68 Directors vs 70 target — hire or promote 2 by end Q1 FY26.",                       impact: "Revenue capacity risk £1.3M",  icon: "🟡" },
    { rank: 5, rag: "green", area: "Profitability",  action: "Lock in EBITDA discipline for Q1 FY26",    detail: "22.1% — highest in 12 months. Staff costs down £20k. Sustain for Q1 budget.",            impact: "On track — maintain",          icon: "🟢" },
  ];

  const insights = [
    { title: "Cost Discipline Working",   text: "Total opex fell £61k MoM. If sustained through Q1 FY26, full-year savings of £732k.",      color: "#10b981" },
    { title: "WIP Conversion Improving",  text: "WIP fell £1.2M to £39.1M — debtors converting faster. Sustain billing cadence.",            color: "#6366f1" },
    { title: "Creditor Days Healthy",     text: "41 days — 4 days inside 45d benchmark. Good supplier relationships maintained.",            color: "#8b5cf6" },
    { title: "Net Profit Trajectory",     text: "3-month trend: £1.55M → £1.68M → £1.79M. On track for £2M+ in Q1 FY26 at current pace.", color: "#06b6d4" },
  ];

  return (
    <div>
      <SHead title="Risks & Exceptions" sub="CEO attention items · Mar 2025" />
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/[0.04] p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-500">2 items require CEO action before 4 Apr</span>
        </div>
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className={`flex gap-4 rounded-xl p-4 ${
              a.rag === "red"   ? "bg-rose-500/10 border border-rose-500/20" :
              a.rag === "amber" ? "bg-amber-500/10 border border-amber-500/20" :
                                  "bg-emerald-500/10 border border-emerald-500/20"
            }`}>
              <div className="flex items-start gap-3 flex-1">
                <span className="text-lg leading-none">{a.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-full ${
                      a.rag === "red" ? "bg-rose-500/20 text-rose-400" : a.rag === "amber" ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
                    }`}>{a.area}</span>
                    <span className="text-[9px] text-slate-400 dark:text-white/25">#{a.rank}</span>
                  </div>
                  <p className="text-[12px] font-bold text-slate-900 dark:text-white">{a.action}</p>
                  <p className="text-[11px] text-slate-500 dark:text-white/40 mt-0.5">{a.detail}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">Impact</div>
                <div className="text-[11px] font-bold text-slate-700 dark:text-white/70">{a.impact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-white/30 mb-3">Key Insights</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {insights.map((ins, i) => (
          <GCard key={i} className="p-4" accent={ins.color}>
            <p className="text-[12px] font-bold text-slate-900 dark:text-white mb-1 pt-2">{ins.title}</p>
            <p className="text-[11px] text-slate-500 dark:text-white/40 leading-relaxed">{ins.text}</p>
          </GCard>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION: REPORTS
══════════════════════════════════════════════════════════ */

function ReportsSection() {
  const reports = [
    { name: "P&L Statement",      desc: "Mar 2025 vs Feb 2025 vs Budget", icon: FileText,  color: "#6366f1" },
    { name: "KPI Scorecard",      desc: "10 KPIs with targets & trend",   icon: BarChart2, color: "#8b5cf6" },
    { name: "Cash Flow Report",   desc: "Collections & WIP conversion",   icon: DollarSign,color: "#0ea5e9" },
    { name: "Headcount Report",   desc: "Grade analysis & utilisation",   icon: Users,     color: "#10b981" },
    { name: "Budget Variance",    desc: "Oct–Mar actual vs budget",       icon: Activity,  color: "#f59e0b" },
    { name: "Service Line Detail",desc: "8 practice areas breakdown",     icon: Zap,       color: "#a78bfa" },
  ];

  return (
    <div>
      <SHead title="Reports & Exports" sub="Print-ready management packs · Mar 2025" />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3 mb-6">
        {reports.map((r, i) => {
          const Icon = r.icon;
          return (
            <GCard key={i} accent={r.color} className="p-4">
              <div className="flex items-center gap-3 mb-3 pt-1">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${r.color}20` }}>
                  <Icon size={15} style={{ color: r.color }} />
                </div>
                <div>
                  <div className="text-[12px] font-bold text-slate-900 dark:text-white">{r.name}</div>
                  <div className="text-[10px] text-slate-400 dark:text-white/30">{r.desc}</div>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 text-[11px] font-semibold border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-white/50 hover:border-slate-300 dark:hover:border-white/[0.15] transition-colors">
                <Download size={11} /> Download PDF
              </button>
            </GCard>
          );
        })}
      </div>
      <GCard className="p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-white/30">Print-Ready P&L — Mar 2025</p>
          <button className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-white/40 hover:text-slate-700 dark:hover:text-white/70 transition-colors">
            <Printer size={12} /> Print
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                {["", "Mar 25", "Feb 25", "Budget", "Var £", "Var %"].map(h => (
                  <th key={h} className={`pb-2 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-white/30 ${h === "" ? "text-left" : "text-right pr-2"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plDetail.map((row, i) => {
                const v  = row.curr - row.budget;
                const vp = v / row.budget * 100;
                return (
                  <tr key={i} className={`border-b ${row.total ? "border-indigo-200/40 dark:border-indigo-500/20" : "border-slate-50 dark:border-white/[0.03]"} ${row.sub ? "bg-slate-50/60 dark:bg-white/[0.02]" : ""}`}>
                    <td className={`py-2 ${row.total ? "font-black text-slate-900 dark:text-white/95" : row.sub ? "font-bold text-slate-700 dark:text-white/80" : "text-slate-600 dark:text-white/60"}`}
                      style={{ paddingLeft: row.indent ? `${row.indent * 14 + 8}px` : "8px" }}>{row.label}</td>
                    <td className={`py-2 pr-2 text-right font-mono ${row.total ? "font-black text-slate-900 dark:text-white/95" : "text-slate-800 dark:text-white/75"}`}>£{row.curr.toLocaleString()}</td>
                    <td className="py-2 pr-2 text-right font-mono text-slate-500 dark:text-white/35">£{row.prev.toLocaleString()}</td>
                    <td className="py-2 pr-2 text-right font-mono text-slate-400 dark:text-white/25">£{row.budget.toLocaleString()}</td>
                    <td className={`py-2 pr-2 text-right font-mono font-semibold ${v >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{v >= 0 ? "+" : ""}{v.toLocaleString()}</td>
                    <td className={`py-2 text-right font-mono font-semibold ${vp >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{vp >= 0 ? "+" : ""}{vp.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GCard>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   NAV CONFIG
══════════════════════════════════════════════════════════ */

type Section = "overview" | "financial" | "cash" | "people" | "services" | "alerts" | "reports";

const navItems: { id: Section; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: "overview",  label: "Overview",           icon: Home          },
  { id: "financial", label: "Financial P&L",      icon: BarChart2     },
  { id: "cash",      label: "Cash & Collections", icon: DollarSign,  badge: "⚠" },
  { id: "people",    label: "People",             icon: Users         },
  { id: "services",  label: "Service Lines",      icon: Zap           },
  { id: "alerts",    label: "Risks",              icon: AlertTriangle, badge: "2" },
  { id: "reports",   label: "Reports",            icon: FileText      },
];

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */

export default function DashboardPage() {
  const [active, setActive]     = useState<Section>("overview");
  const [sideOpen, setSideOpen] = useState(true);

  const sectionMap: Record<Section, React.ReactNode> = {
    overview:  <OverviewSection />,
    financial: <FinancialSection />,
    cash:      <CashSection />,
    people:    <PeopleSection />,
    services:  <ServiceSection />,
    alerts:    <AlertsSection />,
    reports:   <ReportsSection />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#05050f]">
      {/* ── SIDEBAR ── */}
      <aside className={`shrink-0 flex flex-col border-r border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#080814] transition-all duration-200 ${sideOpen ? "w-[220px]" : "w-[58px]"}`}>
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-slate-100 dark:border-white/[0.06] gap-3 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <span className="text-white font-black text-[12px]">Q</span>
          </div>
          {sideOpen && <span className="font-black text-[13px] text-slate-900 dark:text-white tracking-tight">Quantyx</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const Icon     = item.icon;
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => setActive(item.id)} title={!sideOpen ? item.label : undefined}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[12px] font-semibold transition-all duration-150 relative ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                    : "text-slate-500 dark:text-white/40 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white"
                }`}>
                <Icon size={15} className="shrink-0" />
                {sideOpen && <span className="truncate">{item.label}</span>}
                {item.badge && sideOpen && (
                  <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-rose-500/15 text-rose-500"}`}>{item.badge}</span>
                )}
                {item.badge && !sideOpen && (
                  <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-rose-500 text-[7px] text-white font-bold flex items-center justify-center">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-white/[0.06] shrink-0 space-y-2">
          <div className="flex items-center gap-2 justify-between">
            <ThemeToggle />
            <button onClick={() => setSideOpen(!sideOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 dark:text-white/30 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors border border-slate-200 dark:border-white/[0.08]">
              <ArrowRight size={13} className={`transition-transform duration-200 ${sideOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
          {sideOpen && (
            <Link href="/" className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-white/25 hover:text-slate-600 dark:hover:text-white/50 transition-colors font-medium">
              <ArrowRight size={10} className="rotate-180" /> Back to site
            </Link>
          )}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#080814]">
          <div>
            <span className="text-[13px] font-bold text-slate-900 dark:text-white">{navItems.find(n => n.id === active)?.label}</span>
            <span className="ml-2 text-[11px] text-slate-400 dark:text-white/25">BTG Advisory Group · Mar 2025</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-white/25 font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live data</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            {sectionMap[active]}
          </div>
        </main>
      </div>
    </div>
  );
}
