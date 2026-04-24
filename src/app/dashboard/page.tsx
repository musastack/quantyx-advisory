"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, ComposedChart, Cell, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine,
} from "recharts";
import {
  AlertCircle, Bell, Settings, ArrowLeft, TrendingUp, TrendingDown,
  Users, FileText, BarChart2, Zap, AlertTriangle,
  Download, DollarSign, UserCheck, Clock,
  ChevronRight, Activity, ArrowRight, Minus, Layers,
  Home, ChevronDown, ChevronUp,
  Printer, Trophy, Sliders, Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../ThemeToggle";

/* ─────────────────────────────────────────────
   BTG ADVISORY GROUP — CEO OPERATING SYSTEM
   High-confidence datasets only · Mar 2025
───────────────────────────────────────────── */

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
  { month: "Oct", budget: 10550, actual: 10330 },
  { month: "Nov", budget: 10520, actual: 10560 },
  { month: "Dec", budget: 10970, actual: 10670 },
  { month: "Jan", budget: 10990, actual: 10490 },
  { month: "Feb", budget: 10260, actual: 10510 },
  { month: "Mar", budget: 11090, actual: 10570 },
];

const recData = [
  { month: "Oct", debtors: 75740, aged91: 70650, other: 5090,  lockup: 110 },
  { month: "Nov", debtors: 77620, aged91: 72290, other: 5330,  lockup: 119 },
  { month: "Dec", debtors: 80610, aged91: 73880, other: 6730,  lockup: 122 },
  { month: "Jan", debtors: 83310, aged91: 75740, other: 7570,  lockup: 125 },
  { month: "Feb", debtors: 86380, aged91: 77610, other: 8770,  lockup: 119 },
  { month: "Mar", debtors: 89180, aged91: 80590, other: 8590,  lockup: 118 },
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

// Utilisation heatmap — 6 months × 6 grades
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
  { name: "CVL",                    revenue: 8180 },
  { name: "Administration",         revenue: 7050 },
  { name: "Restructuring Advisory", revenue: 3800 },
  { name: "LPA Receivership",       revenue: 2970 },
  { name: "Fixed Charge Recv.",     revenue: 2640 },
  { name: "Creditor Services",      revenue: 2630 },
  { name: "MVL",                    revenue: 2430 },
  { name: "Property Valuation",     revenue: 1870 },
];

// All 10 KPI cards — full spec data (all 11 required fields each)
const kpiData = [
  {
    name: "Revenue", current: "£10.57M", currentRaw: 10570, prev: "£10.51M", prevRaw: 10510,
    absChange: "+£60k", pctChange: "+0.6%", pctUp: true,
    target: "£11.09M", varTarget: "–£520k (–4.7%)", varTargetUp: false,
    trend3: [{ m: "Jan", v: "£10.49M" }, { m: "Feb", v: "£10.51M" }, { m: "Mar", v: "£10.57M" }],
    trendLabel: "Flat" as const, status: "red" as const,
    why: "CVL intake soft — 3rd consecutive miss, YTD shortfall £1.4M vs budget.",
    spark: [10490, 10510, 10570], icon: DollarSign,
    accent: "bg-rose-500", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10",
  },
  {
    name: "Gross Margin %", current: "60.8%", currentRaw: 60.8, prev: "60.5%", prevRaw: 60.5,
    absChange: "+0.3pp", pctChange: "+0.5%", pctUp: true,
    target: "62.0%", varTarget: "–1.2pp below target", varTargetUp: false,
    trend3: [{ m: "Jan", v: "60.0%" }, { m: "Feb", v: "60.5%" }, { m: "Mar", v: "60.8%" }],
    trendLabel: "Improving" as const, status: "amber" as const,
    why: "Improved case mix — more CVL (high margin) replacing fixed-charge receivership (lower margin).",
    spark: [60.0, 60.5, 60.8], icon: TrendingUp,
    accent: "bg-violet-500", color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/10",
  },
  {
    name: "Operating Margin %", current: "20.9%", currentRaw: 20.9, prev: "19.8%", prevRaw: 19.8,
    absChange: "+1.1pp", pctChange: "+5.6%", pctUp: true,
    target: "22.0%", varTarget: "–1.1pp below target", varTargetUp: false,
    trend3: [{ m: "Jan", v: "18.5%" }, { m: "Feb", v: "19.8%" }, { m: "Mar", v: "20.9%" }],
    trendLabel: "Improving" as const, status: "amber" as const,
    why: "Total opex fell £61k MoM — staff costs down £20k and other opex down £49k from cost discipline.",
    spark: [18.5, 19.8, 20.9], icon: Activity,
    accent: "bg-emerald-500", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    name: "EBITDA %", current: "22.1%", currentRaw: 22.1, prev: "21.0%", prevRaw: 21.0,
    absChange: "+1.1pp", pctChange: "+5.2%", pctUp: true,
    target: "22.5%", varTarget: "–0.4pp below target", varTargetUp: false,
    trend3: [{ m: "Jan", v: "20.3%" }, { m: "Feb", v: "21.0%" }, { m: "Mar", v: "22.1%" }],
    trendLabel: "Improving" as const, status: "amber" as const,
    why: "Recovery from 18.7% Jul 24 low — sustained 3-month improvement driven by opex control.",
    spark: [20.3, 21.0, 22.1], icon: BarChart2,
    accent: "bg-indigo-500", color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10",
  },
  {
    name: "Net Profit", current: "£1.79M", currentRaw: 1790, prev: "£1.68M", prevRaw: 1680,
    absChange: "+£110k", pctChange: "+6.5%", pctUp: true,
    target: "£2.24M", varTarget: "–£450k (–20.1%)", varTargetUp: false,
    trend3: [{ m: "Jan", v: "£1.55M" }, { m: "Feb", v: "£1.68M" }, { m: "Mar", v: "£1.79M" }],
    trendLabel: "Improving" as const, status: "amber" as const,
    why: "Revenue up £60k + opex savings of £61k compound into strongest net profit since Oct 24.",
    spark: [1550, 1680, 1790], icon: TrendingUp,
    accent: "bg-emerald-400", color: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    name: "Cash Balance", current: "£3.95M", currentRaw: 3950, prev: "£3.81M", prevRaw: 3810,
    absChange: "+£140k", pctChange: "+3.7%", pctUp: true,
    target: "£5.00M", varTarget: "–£1.05M below target", varTargetUp: false,
    trend3: [{ m: "Jan", v: "£3.72M" }, { m: "Feb", v: "£3.81M" }, { m: "Mar", v: "£3.95M" }],
    trendLabel: "Improving" as const, status: "amber" as const,
    why: "Recovering from Jan trough — net profit conversion improving, collections partially offsetting AR growth.",
    spark: [3720, 3810, 3950], icon: DollarSign,
    accent: "bg-sky-500", color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-500/10",
  },
  {
    name: "Working Capital", current: "£7.70M", currentRaw: 7700, prev: "£7.45M", prevRaw: 7450,
    absChange: "+£250k", pctChange: "+3.4%", pctUp: true,
    target: "£9.00M", varTarget: "–£1.30M below target", varTargetUp: false,
    trend3: [{ m: "Jan", v: "£7.20M" }, { m: "Feb", v: "£7.45M" }, { m: "Mar", v: "£7.70M" }],
    trendLabel: "Improving" as const, status: "red" as const,
    why: "Current liabilities stable while current assets grow — driven by AR increase and WIP conversion.",
    spark: [7200, 7450, 7700], icon: Zap,
    accent: "bg-amber-500", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    name: "Lockup Days", current: "118d", currentRaw: 118, prev: "119d", prevRaw: 119,
    absChange: "–1d", pctChange: "–0.8%", pctUp: true,
    target: "90d", varTarget: "+28d above target", varTargetUp: false,
    trend3: [{ m: "Jan", v: "125d" }, { m: "Feb", v: "119d" }, { m: "Mar", v: "118d" }],
    trendLabel: "Improving" as const, status: "red" as const,
    why: "Slow improvement from 125d Jan peak — WIP converting but debtor collections lagging.",
    spark: [125, 119, 118], icon: Clock,
    accent: "bg-rose-400", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10",
  },
  {
    name: "Debtors >91 Days", current: "£80.6M", currentRaw: 80590, prev: "£77.6M", prevRaw: 77610,
    absChange: "+£3.0M", pctChange: "+3.8%", pctUp: false,
    target: "£60.0M", varTarget: "+£20.6M above target", varTargetUp: false,
    trend3: [{ m: "Jan", v: "£75.7M" }, { m: "Feb", v: "£77.6M" }, { m: "Mar", v: "£80.6M" }],
    trendLabel: "Declining" as const, status: "red" as const,
    why: "91+ bucket growing each month — insolvency case cycles extend timescales but 90% concentration requires intervention.",
    spark: [75740, 77610, 80590], icon: AlertTriangle,
    accent: "bg-rose-600", color: "text-rose-700 dark:text-rose-300", bg: "bg-rose-100 dark:bg-rose-500/15",
  },
  {
    name: "Creditor Days", current: "41d", currentRaw: 41, prev: "43d", prevRaw: 43,
    absChange: "–2d", pctChange: "–4.7%", pctUp: true,
    target: "45d", varTarget: "–4d within target", varTargetUp: true,
    trend3: [{ m: "Jan", v: "45d" }, { m: "Feb", v: "43d" }, { m: "Mar", v: "41d" }],
    trendLabel: "Improving" as const, status: "green" as const,
    why: "Faster supplier payments improving vendor relationships — well within 45-day benchmark.",
    spark: [45, 43, 41], icon: FileText,
    accent: "bg-emerald-500", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
] as const;

// Extended financial metrics Oct–Mar (6 months)
const financialMetrics = [
  { month: "Oct", gpM: 60.9, opMargin: 18.2, ebitdaM: 20.7, netProfit: 1540, cash: 4200, workingCapital: 8100, creditorDays: 42 },
  { month: "Nov", gpM: 60.9, opMargin: 19.1, ebitdaM: 20.7, netProfit: 1620, cash: 4050, workingCapital: 7800, creditorDays: 44 },
  { month: "Dec", gpM: 60.1, opMargin: 17.8, ebitdaM: 19.6, netProfit: 1480, cash: 3880, workingCapital: 7600, creditorDays: 47 },
  { month: "Jan", gpM: 60.0, opMargin: 18.5, ebitdaM: 20.3, netProfit: 1550, cash: 3720, workingCapital: 7200, creditorDays: 45 },
  { month: "Feb", gpM: 60.5, opMargin: 19.8, ebitdaM: 21.0, netProfit: 1680, cash: 3810, workingCapital: 7450, creditorDays: 43 },
  { month: "Mar", gpM: 60.8, opMargin: 20.9, ebitdaM: 22.1, netProfit: 1790, cash: 3950, workingCapital: 7700, creditorDays: 41 },
];

// Service line monthly breakdown (Oct–Mar)
const serviceLineMonthly = [
  { month: "Oct", CVL: 1340, Admin: 1150, Restructuring: 625, LPA: 490, Creditor: 432, MVL: 398, Other: 895 },
  { month: "Nov", CVL: 1380, Admin: 1175, Restructuring: 650, LPA: 503, Creditor: 440, MVL: 406, Other: 1006 },
  { month: "Dec", CVL: 1395, Admin: 1195, Restructuring: 635, LPA: 498, Creditor: 438, MVL: 400, Other: 1109 },
  { month: "Jan", CVL: 1350, Admin: 1158, Restructuring: 620, LPA: 488, Creditor: 428, MVL: 395, Other: 1051 },
  { month: "Feb", CVL: 1385, Admin: 1180, Restructuring: 640, LPA: 495, Creditor: 435, MVL: 402, Other: 973  },
  { month: "Mar", CVL: 1420, Admin: 1210, Restructuring: 658, LPA: 510, Creditor: 442, MVL: 415, Other: 915  },
];

// P&L detail — Mar 25 vs Feb 25
const plDetail = [
  { label: "Revenue",                  curr: 10570, prev: 10510, budget: 11090, isSubtotal: false, isTotal: false, indent: 0 },
  { label: "Cost of Sales",            curr: 4143,  prev: 4151,  budget: 4210,  isSubtotal: false, isTotal: false, indent: 0 },
  { label: "Gross Profit",             curr: 6427,  prev: 6359,  budget: 6880,  isSubtotal: true,  isTotal: false, indent: 0 },
  { label: "Staff Costs",              curr: 2810,  prev: 2830,  budget: 2750,  isSubtotal: false, isTotal: false, indent: 1 },
  { label: "Overhead & Premises",      curr: 580,   prev: 591,   budget: 590,   isSubtotal: false, isTotal: false, indent: 1 },
  { label: "Technology & Systems",     curr: 220,   prev: 218,   budget: 225,   isSubtotal: false, isTotal: false, indent: 1 },
  { label: "Professional Fees",        curr: 312,   prev: 295,   budget: 320,   isSubtotal: false, isTotal: false, indent: 1 },
  { label: "Other Opex",               curr: 169,   prev: 218,   budget: 175,   isSubtotal: false, isTotal: false, indent: 1 },
  { label: "Total Opex",               curr: 4091,  prev: 4152,  budget: 4060,  isSubtotal: true,  isTotal: false, indent: 0 },
  { label: "EBITDA",                   curr: 2336,  prev: 2207,  budget: 2820,  isSubtotal: true,  isTotal: false, indent: 0 },
  { label: "Depreciation & Amort.",    curr: 127,   prev: 125,   budget: 130,   isSubtotal: false, isTotal: false, indent: 1 },
  { label: "Finance Costs",            curr: 210,   prev: 215,   budget: 210,   isSubtotal: false, isTotal: false, indent: 1 },
  { label: "Tax Provision",            curr: 209,   prev: 187,   budget: 240,   isSubtotal: false, isTotal: false, indent: 1 },
  { label: "Net Profit",               curr: 1790,  prev: 1680,  budget: 2240,  isSubtotal: false, isTotal: true,  indent: 0 },
];

// Balance sheet — Mar 25 vs Feb 25

/* ─────────────────────────────────────────────
   SPARKLINE + TREND BADGE
───────────────────────────────────────────── */

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  if (data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const W = 60, H = 24, pad = 2;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / range) * (H - pad * 2);
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

function TrendBadge({ values }: { values: number[] }) {
  const last3 = values.slice(-3);
  const delta = last3[2] - last3[0];
  const flat = Math.abs(delta) < 0.4;
  const up = delta > 0;
  const cfg = flat
    ? { cls: "text-slate-500 bg-slate-100 dark:text-white/40 dark:bg-white/[0.06]", icon: <Minus size={9} />, label: "Flat" }
    : up
      ? { cls: "text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15", icon: <TrendingUp size={9} />, label: "Improving" }
      : { cls: "text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-500/15", icon: <TrendingDown size={9} />, label: "Declining" };
  return (
    <div className="flex items-center gap-2 mt-1.5">
      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${cfg.cls}`}>
        {cfg.icon}{cfg.label}
      </span>
      <span className="text-[10px] text-slate-400 dark:text-white/25">{last3.map(v => `${v}%`).join(" → ")}</span>
    </div>
  );
}

type KpiEntry = typeof kpiData[number];

function RichKpiCard({ k, onDrilldown }: { k: KpiEntry; onDrilldown?: () => void }) {
  const [expanded, setExpanded] = useState(false);

  const statusCfg = {
    green: { dot: "bg-emerald-500", label: "On Track",  text: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-100 dark:bg-emerald-500/15" },
    amber: { dot: "bg-amber-400",   label: "Watch",     text: "text-amber-700 dark:text-amber-300",     bg: "bg-amber-100 dark:bg-amber-500/15"    },
    red:   { dot: "bg-rose-500",    label: "Off Track", text: "text-rose-700 dark:text-rose-300",       bg: "bg-rose-100 dark:bg-rose-500/15"      },
  }[k.status];

  const trendCfg = {
    Improving: { cls: "text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15", icon: <TrendingUp size={9} /> },
    Flat:      { cls: "text-slate-600 bg-slate-100 dark:text-white/40 dark:bg-white/[0.06]",          icon: <Minus size={9} />      },
    Declining: { cls: "text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-500/15",             icon: <TrendingDown size={9}/> },
  }[k.trendLabel];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/[0.09] bg-white dark:bg-[#0b0b17] shadow-sm dark:shadow-none overflow-hidden">
      <div className={`h-[3px] ${k.accent}`} />
      {/* Compact view — always visible */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-7 h-7 rounded-lg ${k.bg} flex items-center justify-center shrink-0`}>
              <k.icon size={13} className={k.color} />
            </div>
            <p className="text-[11px] font-semibold text-slate-700 dark:text-white/70 leading-tight">{k.name}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-md ${statusCfg.text} ${statusCfg.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />{statusCfg.label}
            </span>
            {expanded ? <ChevronUp size={12} className="text-slate-400 dark:text-white/30" /> : <ChevronDown size={12} className="text-slate-400 dark:text-white/30" />}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[1.6rem] font-bold tracking-tight text-slate-900 dark:text-white font-mono leading-none tabular-nums">{k.current}</p>
            <span className={`text-[11px] font-bold font-mono ${k.pctUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
              {k.absChange} ({k.pctChange})
            </span>
          </div>
          <Sparkline data={[...k.spark]} up={k.pctUp} />
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-100 dark:border-white/[0.05] pt-3">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-white/30">
            <span>vs {k.trend3[1].m} 25:</span>
            <span className="font-semibold text-slate-500 dark:text-white/45">{k.prev}</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/[0.05]">
            <span className="text-[10px] text-slate-400 dark:text-white/30">Target: <span className="font-semibold text-slate-600 dark:text-white/50">{k.target}</span></span>
            <span className={`text-[10px] font-semibold ${k.varTargetUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{k.varTarget}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-white/30 flex-wrap">
              {k.trend3.map((t, i) => (
                <span key={i} className="flex items-center gap-0.5">
                  <span className="font-semibold text-slate-600 dark:text-white/50">{t.m}</span> {t.v}
                  {i < k.trend3.length - 1 && <ChevronRight size={8} className="text-slate-300 dark:text-white/15 mx-0.5" />}
                </span>
              ))}
            </div>
            <span className={`inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.5 rounded-md shrink-0 ${trendCfg.cls}`}>
              {trendCfg.icon}{k.trendLabel}
            </span>
          </div>
          <p className="text-[10.5px] text-slate-500 dark:text-white/35 leading-snug border-t border-slate-100 dark:border-white/[0.05] pt-2">{k.why}</p>
          {onDrilldown && (
            <button onClick={onDrilldown} className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline">
              Deep dive <ArrowRight size={10} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────── */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 rounded-2xl border border-slate-200 dark:border-white/[0.09] bg-white dark:bg-[#0b0b17] shadow-sm dark:shadow-none ${className}`}>
      {children}
    </div>
  );
}

function KpiCard({ label, value, verdict, change, up, icon: Icon, color, bg, accent, onDrilldown, sparkData, trend }: {
  label: string; value: string; verdict: string; change: string; up: boolean;
  icon: React.ElementType; color: string; bg: string; accent: string;
  onDrilldown?: () => void; sparkData?: number[]; trend?: number[];
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 dark:border-white/[0.09] bg-white dark:bg-[#0b0b17] shadow-sm dark:shadow-none overflow-hidden ${onDrilldown ? "cursor-pointer hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:shadow-md transition-all" : ""}`}
      onClick={onDrilldown}
    >
      <div className={`h-[3px] ${accent}`} />
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 flex-1 min-w-0 pr-2">{label}</p>
          <div className="flex items-center gap-2 shrink-0">
            {sparkData && <Sparkline data={sparkData} up={up} />}
            <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center`}>
              <Icon size={13} className={color} />
            </div>
          </div>
        </div>
        <p className="text-[1.65rem] font-bold tracking-tight mb-1.5 text-slate-900 dark:text-white font-mono leading-none tabular-nums">{value}</p>
        <div className="flex items-center gap-1.5 mb-1">
          {up ? <TrendingUp size={10} className="text-emerald-500 shrink-0" /> : <TrendingDown size={10} className="text-rose-500 shrink-0" />}
          <span className={`text-[11px] font-semibold ${up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{change}</span>
        </div>
        <p className="text-[10.5px] text-slate-500 dark:text-white/35 leading-snug">{verdict}</p>
        {trend && <TrendBadge values={trend} />}
      </div>
    </div>
  );
}

function Signal({ type, title, detail, action }: { type: "alert" | "warning" | "info"; title: string; detail: string; action?: string }) {
  const styles = {
    alert:   { bg: "bg-rose-50   dark:bg-rose-500/[0.07]   border border-rose-200   dark:border-rose-500/20",   text: "text-rose-700   dark:text-rose-300",   muted: "text-rose-600/70 dark:text-rose-400/60",   icon: <AlertCircle  size={13} className="text-rose-500  shrink-0 mt-0.5" /> },
    warning: { bg: "bg-amber-50  dark:bg-amber-500/[0.07]  border border-amber-200  dark:border-amber-500/20",  text: "text-amber-700  dark:text-amber-300",  muted: "text-amber-600/70 dark:text-amber-400/60",  icon: <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" /> },
    info:    { bg: "bg-indigo-50 dark:bg-indigo-500/[0.07] border border-indigo-200 dark:border-indigo-500/20", text: "text-indigo-700 dark:text-indigo-300", muted: "text-indigo-600/70 dark:text-indigo-400/60", icon: <Activity     size={13} className="text-indigo-500 shrink-0 mt-0.5" /> },
  };
  const s = styles[type];
  return (
    <div className={`signal-card ${s.bg} flex items-start gap-3`}>
      {s.icon}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold ${s.text}`}>{title}</p>
        <p className="text-xs text-slate-500 dark:text-white/40 mt-0.5 leading-snug">{detail}</p>
        {action && <p className={`text-[11px] font-semibold mt-1.5 flex items-center gap-1 ${s.muted}`}><ChevronRight size={10} />{action}</p>}
      </div>
    </div>
  );
}

function SectionHeader({ title, sub, badge }: { title: string; sub: string; badge?: string }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">{title}</h2>
        <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">{sub}</p>
      </div>
      {badge && (
        <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 rounded-full shrink-0">
          {badge}
        </span>
      )}
    </div>
  );
}

function ActionLayer({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const actions = [
    {
      rank: 1, type: "critical" as const,
      area: "Collections",
      title: "Initiate 91+ debtor recovery programme",
      detail: "£80.6M aged 91+ (90% of book). Insolvency cycles explain some aging — 90%+ concentration requires a structured recovery initiative now.",
      owner: "Head of Collections",
      due: "30 Apr 2025",
      impact: "£8–12M recoverable",
      status: "Open",
      action: "Collections board review",
      tab: "Collections & Cash",
    },
    {
      rank: 2, type: "critical" as const,
      area: "Financial",
      title: "CVL pipeline review — 3rd budget miss in 6 months",
      detail: "£520k behind March target. YTD shortfall £1.4M. CVL intake softness is the primary driver — BD strategy review required.",
      owner: "Head of Business Recovery",
      due: "15 Apr 2025",
      impact: "£1.4M YTD gap",
      status: "Open",
      action: "Pipeline review — CVL BD strategy",
      tab: "Financial Performance",
    },
    {
      rank: 3, type: "warning" as const,
      area: "Collections",
      title: "Lockup 28 days above 90-day target",
      detail: "118d vs 90d. Improving from Jan 25 peak of 125d at ~2.5d/month. At this rate, target not reached until late 2025.",
      owner: "CFO",
      due: "Monthly cadence",
      impact: "~£3M/month cost of delay",
      status: "In Progress",
      action: "Track monthly — accelerate collections",
      tab: "Collections & Cash",
    },
  ];

  const statusStyle: Record<string, string> = {
    "Open":        "text-rose-700   bg-rose-100   dark:text-rose-300   dark:bg-rose-500/15",
    "In Progress": "text-amber-700  bg-amber-100  dark:text-amber-300  dark:bg-amber-500/15",
    "Escalated":   "text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-500/15",
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/[0.09] bg-white dark:bg-[#0b0b17] shadow-sm dark:shadow-none overflow-hidden">
      <div className="px-6 pt-5 pb-4 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">Action layer</h2>
          <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">Prioritised decisions · owner · £ impact · deadline</p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/25 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-1 rounded-full shrink-0">
          {actions.filter(a => a.type === "critical").length} critical
        </span>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-white/[0.04]">
        {actions.map((item) => (
          <div key={item.rank} className="p-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
            <div className="flex items-start gap-3">
              <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${item.type === "critical" ? "bg-rose-500 text-white" : "bg-amber-500 text-white"}`}>
                {item.rank}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className={`text-xs font-semibold ${item.type === "critical" ? "text-rose-700 dark:text-rose-300" : "text-amber-700 dark:text-amber-300"}`}>{item.title}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusStyle[item.status]}`}>{item.status}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-white/40 leading-snug mb-2">{item.detail}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] mb-2">
                  <span className="flex items-center gap-1 text-slate-500 dark:text-white/35"><UserCheck size={9} className="shrink-0" />{item.owner}</span>
                  <span className="flex items-center gap-1 text-slate-500 dark:text-white/35"><Clock size={9} className="shrink-0" />{item.due}</span>
                  <span className={`flex items-center gap-1 font-semibold ${item.type === "critical" ? "text-rose-600 dark:text-rose-400" : "text-amber-600 dark:text-amber-400"}`}>
                    <DollarSign size={9} className="shrink-0" />{item.impact}
                  </span>
                </div>
                <button
                  onClick={() => onTabChange(item.tab)}
                  className={`text-[11px] font-semibold flex items-center gap-1 ${item.type === "critical" ? "text-rose-600/80 dark:text-rose-400/70 hover:text-rose-700 dark:hover:text-rose-300" : "text-amber-600/80 dark:text-amber-400/70 hover:text-amber-700 dark:hover:text-amber-300"} transition-colors`}
                >
                  <ArrowRight size={10} />{item.action}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartTooltip({ active, payload, label, formatter }: {
  active?: boolean; payload?: { value?: number; name?: string; color?: string }[];
  label?: string; formatter?: (v: number, n: string) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(10,10,20,0.95)", border: "1px solid rgba(255,255,255,0.08)" }}
         className="rounded-xl px-4 py-3 text-xs shadow-2xl space-y-1">
      <p className="text-white/40 mb-1.5 font-medium">{label}</p>
      {payload.filter(p => p.value != null).map((p, i) => (
        <p key={i} className="font-semibold tabular-nums" style={{ color: p.color || "#6366f1" }}>
          {p.name}: {formatter ? formatter(p.value ?? 0, p.name ?? "") : `£${Number(p.value).toLocaleString("en-GB")}`}
        </p>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMMAND STRIP
───────────────────────────────────────────── */

const PERIODS = ["Oct 24", "Nov 24", "Dec 24", "Jan 25", "Feb 25", "Mar 25"] as const;

const PERIOD_MONTH_NAMES: Record<string, string> = {
  "Oct 24": "October 2024", "Nov 24": "November 2024", "Dec 24": "December 2024",
  "Jan 25": "January 2025", "Feb 25": "February 2025", "Mar 25": "March 2025",
};

function CommandStrip({ activePeriod, onPeriodChange }: { activePeriod: string; onPeriodChange: (p: string) => void }) {
  const periodIdx  = PERIODS.indexOf(activePeriod as typeof PERIODS[number]);
  const plIdx      = 6 + periodIdx; // plData[0-5]=Apr-Sep, plData[6-11]=Oct-Mar
  const selectedPl  = plData[Math.min(plIdx, plData.length - 1)];
  const selectedRec = recData[Math.min(periodIdx, recData.length - 1)];
  const selectedWip = wipData[Math.min(periodIdx, wipData.length - 1)];
  const budgetRow   = bvaData[periodIdx];
  const revVar      = budgetRow
    ? ((selectedPl.revenue - budgetRow.budget) / budgetRow.budget * 100).toFixed(1)
    : null;
  const monthName   = PERIOD_MONTH_NAMES[activePeriod] ?? activePeriod;
  const isLatest    = activePeriod === "Mar 25";

  return (
    <div className="mb-7 relative overflow-hidden rounded-2xl border border-indigo-200 dark:border-indigo-500/20 bg-gradient-to-r from-indigo-50/80 via-white to-white dark:from-indigo-500/[0.07] dark:via-[#0b0b17] dark:to-[#0b0b17] shadow-sm dark:shadow-none">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-violet-50 to-transparent dark:from-violet-500/[0.03] dark:to-transparent" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-300/50 via-violet-300/30 to-transparent dark:from-indigo-500/30 dark:via-violet-500/10 dark:to-transparent" />
      </div>
      <div className="relative p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-[9px] font-bold text-white tracking-tight">BTG</span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-[13px] tracking-tight">BTG Advisory Group</span>
              <span className="text-slate-300 dark:text-white/15 select-none">·</span>
              <span className="text-xs text-slate-400 dark:text-white/35 font-medium">{monthName}</span>
              {isLatest && (
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />Live
                </span>
              )}
              {!isLatest && (
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                  Historical snapshot
                </span>
              )}
            </div>
            <p className="text-[13px] font-semibold text-slate-800 dark:text-white/80 leading-snug mb-1">
              {isLatest ? "Revenue growing. Margin recovering. Debtors need action." : `Snapshot · ${monthName}`}
            </p>
            <p className="text-[12px] text-slate-500 dark:text-white/40 leading-relaxed max-w-2xl">
              £{(selectedPl.revenue / 1000).toFixed(2)}M revenue at {selectedPl.ebitdaM}% EBITDA.{" "}
              £{((selectedRec.debtors + selectedWip.wip) / 1000).toFixed(1)}M locked in debtors and WIP.{" "}
              {revVar !== null ? `Revenue ${Number(revVar) >= 0 ? "+" : ""}${revVar}% vs budget.` : "No budget data for this period."}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 shrink-0">
            {[
              ...(isLatest ? [{ label: "2 critical alerts", cls: "text-rose-700 bg-rose-100 border-rose-300 dark:text-rose-300 dark:bg-rose-500/15 dark:border-rose-500/30" }] : []),
              ...(revVar !== null ? [{
                label: `Rev ${Number(revVar) >= 0 ? "+" : ""}${revVar}% vs budget`,
                cls: Number(revVar) >= 0
                  ? "text-emerald-700 bg-emerald-100 border-emerald-300 dark:text-emerald-300 dark:bg-emerald-500/15 dark:border-emerald-500/30"
                  : "text-amber-700 bg-amber-100 border-amber-300 dark:text-amber-300 dark:bg-amber-500/15 dark:border-amber-500/30",
              }] : []),
              { label: `Lockup ${selectedRec.lockup}d`, cls: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20" },
              { label: `EBITDA ${selectedPl.ebitdaM}%`, cls: "text-emerald-700 bg-emerald-100 border-emerald-300 dark:text-emerald-300 dark:bg-emerald-500/15 dark:border-emerald-500/30" },
            ].map(b => (
              <span key={b.label} className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border ${b.cls} whitespace-nowrap`}>{b.label}</span>
            ))}
          </div>
        </div>

        {/* Period selector */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-indigo-100 dark:border-indigo-500/[0.12]">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 shrink-0">Period</span>
          <div className="flex flex-wrap gap-1">
            {PERIODS.map(p => (
              <button
                key={p}
                onClick={() => onPeriodChange(p)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all ${
                  activePeriod === p
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-500 dark:text-white/35 hover:text-slate-700 dark:hover:text-white/60 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">Synced today · ERP + CRM · high-confidence data only</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOME / LANDING SECTION
───────────────────────────────────────────── */

function HomeSection({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const latest = plData[plData.length - 1];
  const latestRec = recData[recData.length - 1];

  const healthScore = 67;
  const healthColor = "text-amber-600 dark:text-amber-400";
  const healthBg = "border-amber-200 dark:border-amber-500/25 bg-amber-50 dark:bg-amber-500/[0.06]";
  const healthLabel = "Watch";

  const navSections = [
    { label: "KPI Dashboard",         icon: BarChart2,  color: "text-indigo-600 dark:text-indigo-400",  bg: "bg-indigo-50 dark:bg-indigo-500/10",  border: "border-indigo-200 dark:border-indigo-500/20",  desc: "10 KPIs · trend · drill down"    },
    { label: "Financial Performance",  icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400",bg: "bg-emerald-50 dark:bg-emerald-500/10",border: "border-emerald-200 dark:border-emerald-500/20",desc: "Revenue · margin · budget"        },
    { label: "Collections & Cash",     icon: DollarSign, color: "text-rose-600 dark:text-rose-400",     bg: "bg-rose-50 dark:bg-rose-500/10",      border: "border-rose-200 dark:border-rose-500/20",      desc: "Debtors · lockup · forecast"    },
    { label: "People & Capacity",      icon: Users,      color: "text-cyan-600 dark:text-cyan-400",     bg: "bg-cyan-50 dark:bg-cyan-500/10",      border: "border-cyan-200 dark:border-cyan-500/20",      desc: "Utilisation · headcount"            },
    { label: "Service Lines",          icon: Layers,     color: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-500/10",  border: "border-violet-200 dark:border-violet-500/20",  desc: "Revenue by line · leaderboard"      },
    { label: "Key Insights",           icon: Trophy,     color: "text-amber-600 dark:text-amber-400",   bg: "bg-amber-50 dark:bg-amber-500/10",    border: "border-amber-200 dark:border-amber-500/20",    desc: "5 insights · cause & impact"        },
    { label: "Risks & Exceptions",     icon: Zap,        color: "text-rose-600 dark:text-rose-400",     bg: "bg-rose-50 dark:bg-rose-500/10",      border: "border-rose-200 dark:border-rose-500/20",      desc: "All signals · critical flags"        },
    { label: "Reports",                icon: FileText,   color: "text-slate-600 dark:text-slate-400",   bg: "bg-slate-50 dark:bg-white/[0.05]",    border: "border-slate-200 dark:border-white/[0.08]",    desc: "Export · CSV · print view"      },
  ];

  return (
    <div className="space-y-5">

      {/* CEO Daily Brief Banner */}
      <div className="rounded-2xl border border-indigo-200 dark:border-indigo-500/20 bg-gradient-to-br from-indigo-50/90 via-white to-violet-50/30 dark:from-indigo-500/[0.08] dark:via-[#0b0b17] dark:to-violet-500/[0.04] p-7 shadow-sm dark:shadow-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-violet-50/60 to-transparent dark:from-violet-500/[0.03] dark:to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-300/60 via-violet-300/30 to-transparent dark:from-indigo-500/35 dark:via-violet-500/15 dark:to-transparent" />
        <div className="relative flex items-start justify-between gap-6 flex-wrap">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400 mb-2.5">CEO Daily Brief · March 2025</p>
            <h1 className="text-[1.7rem] font-bold tracking-tight text-slate-900 dark:text-white mb-3">{greeting}, BTG Advisory Group.</h1>
            <p className="text-[13.5px] text-slate-600 dark:text-white/55 max-w-2xl leading-relaxed">
              Revenue is{" "}
              <span className="font-semibold text-rose-600 dark:text-rose-400">£520k below March budget</span>
              {" "}— the third consecutive miss, driven by CVL intake softness.
              EBITDA has recovered to{" "}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">22.1%</span>
              , the best level in 12 months.{" "}
              <span className="font-semibold text-rose-600 dark:text-rose-400">£80.6M sits aged 91+ days</span>
              {" "}and requires immediate board-level intervention.
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-3">
            <div className="text-right">
              <p className="text-[11px] text-slate-400 dark:text-white/30">{dateStr}</p>
              <div className="flex items-center gap-1.5 justify-end mt-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Live · synced today</span>
              </div>
            </div>
            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${healthBg}`}>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-white/30 mb-0.5">Business Health</p>
                <p className={`text-[10px] font-bold ${healthColor}`}>{healthLabel}</p>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className={`text-[2.2rem] font-black font-mono tabular-nums leading-none ${healthColor}`}>{healthScore}</span>
                <span className="text-[12px] text-slate-400 dark:text-white/30 font-mono">/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Key Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: "Revenue",       value: `£${(latest.revenue / 1000).toFixed(2)}M`, change: "–4.6% vs budget", up: false, dot: "bg-rose-500",    sub: "Mar 2025"       },
          { label: "EBITDA Margin", value: `${latest.ebitdaM}%`,                           change: "12-month best",    up: true,  dot: "bg-emerald-500", sub: "recovering"     },
          { label: "Cash Balance",  value: "£3.95M",                                    change: "+£140k MoM",      up: true,  dot: "bg-sky-500",     sub: "improving"      },
          { label: "Lockup Days",   value: `${latestRec.lockup}d`,                         change: "28d above target", up: false, dot: "bg-amber-500",   sub: "target: 90d"    },
          { label: "Net Profit",    value: "£1.79M",                                    change: "+£110k MoM",     up: true,  dot: "bg-violet-500",  sub: "best since Oct" },
        ].map((m, i) => (
          <div key={i} className="p-4 rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#0b0b17] shadow-sm dark:shadow-none">
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className={`w-1.5 h-1.5 rounded-full ${m.dot} shrink-0`} />
              <p className="text-[9.5px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/30">{m.label}</p>
            </div>
            <p className="text-[1.45rem] font-bold font-mono tabular-nums leading-none mb-1.5 text-slate-900 dark:text-white">{m.value}</p>
            <div className="flex items-center gap-1 mb-0.5">
              {m.up ? <TrendingUp size={9} className="text-emerald-500 shrink-0" /> : <TrendingDown size={9} className="text-rose-500 shrink-0" />}
              <p className={`text-[10.5px] font-semibold ${m.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{m.change}</p>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-white/25">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Critical Actions — CEO decision panel */}
      <div className="rounded-2xl border-2 border-rose-200 dark:border-rose-500/30 bg-white dark:bg-[#0b0b17] overflow-hidden shadow-sm dark:shadow-none">
        <div className="px-5 py-4 bg-rose-50 dark:bg-rose-500/[0.06] border-b-2 border-rose-200 dark:border-rose-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-rose-500 flex items-center justify-center shrink-0 shadow-sm shadow-rose-500/30">
              <AlertCircle size={14} className="text-white" />
            </div>
            <div>
              <p className="text-[12.5px] font-bold text-rose-800 dark:text-rose-200 tracking-tight">2 decisions required from you today</p>
              <p className="text-[10px] text-rose-600/70 dark:text-rose-400/60">Prioritised by £ impact · owner assigned · deadline set</p>
            </div>
          </div>
          <button onClick={() => onTabChange("Risks & Exceptions")} className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1 hover:underline shrink-0">
            View all <ChevronRight size={11} />
          </button>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-white/[0.04]">
          {[
            {
              rank: 1,
              title: "Initiate 91+ debtor recovery programme",
              detail: "£80.6M aged 91+ — 90.4% of the debtor book. Insolvency cycles explain some aging but this concentration is structural and requires a board-level recovery initiative.",
              owner: "Head of Collections",
              due: "30 Apr 2025",
              impact: "£8–12M recoverable",
              tab: "Collections & Cash",
            },
            {
              rank: 2,
              title: "CVL pipeline review — 3rd consecutive budget miss",
              detail: "£520k behind March target. YTD shortfall £1.4M. CVL intake softness is consistent and not one-off — BD strategy requires review.",
              owner: "Head of Business Recovery",
              due: "15 Apr 2025",
              impact: "£1.4M YTD gap",
              tab: "Financial Performance",
            },
          ].map((a, i) => (
            <div key={i} className="p-5 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
              <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{a.rank}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-slate-900 dark:text-white leading-snug mb-1.5">{a.title}</p>
                <p className="text-[11.5px] text-slate-500 dark:text-white/40 leading-relaxed mb-3">{a.detail}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10.5px]">
                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-white/35"><UserCheck size={9} className="shrink-0" />{a.owner}</span>
                  <span className="flex items-center gap-1.5 text-slate-500 dark:text-white/35"><Clock size={9} className="shrink-0" />Due {a.due}</span>
                  <span className="flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400"><DollarSign size={9} className="shrink-0" />{a.impact}</span>
                  <button onClick={() => onTabChange(a.tab)} className="ml-auto flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                    Deep dive <ArrowRight size={9} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigate to sections */}
      <div>
        <p className="text-[9.5px] font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-white/30 mb-3">Navigate to</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
          {navSections.map(item => (
            <button
              key={item.label}
              onClick={() => onTabChange(item.label)}
              className={`text-left p-4 rounded-xl border ${item.border} ${item.bg} hover:shadow-md transition-all group`}
            >
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/[0.06] flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                <item.icon size={14} className={item.color} />
              </div>
              <p className="text-[12px] font-semibold text-slate-800 dark:text-white/90 mb-0.5 leading-snug">{item.label}</p>
              <p className="text-[9.5px] text-slate-500 dark:text-white/35">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function OverviewSection({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const [activePeriod, setActivePeriod] = useState<string>("Mar 25");

  return (
    <div className="space-y-6">
      <CommandStrip activePeriod={activePeriod} onPeriodChange={setActivePeriod} />

      {/* Executive Summary Strip */}
      <div className="grid grid-cols-3 gap-4 mb-1">
        {[
          { label: "Situation",  text: "Revenue £520k below March budget (3rd miss). EBITDA 22.1% — best in 12 months. 2 critical actions required.", color: "border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/[0.05]", dot: "bg-rose-500" },
          { label: "Momentum",   text: "Margin trajectory positive (+3.4pp since Jul 24 low). WIP converting. Cost discipline working. Cash improving MoM.", color: "border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/[0.05]", dot: "bg-emerald-500" },
          { label: "Risk",       text: "£80.6M aged 91+ (90% of book). Lockup 28 days above target. Contractor reduction creates Q2 capacity risk.", color: "border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/[0.05]", dot: "bg-amber-500" },
        ].map((s, i) => (
          <div key={i} className={`p-4 rounded-xl border ${s.color}`}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${s.dot} shrink-0`} />
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-white/35">{s.label}</p>
            </div>
            <p className="text-[11.5px] text-slate-600 dark:text-white/60 leading-snug">{s.text}</p>
          </div>
        ))}
      </div>

      {/* 10 Rich KPI cards — all 11 required fields each */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {kpiData.slice(0, 5).map((k, i) => (
          <RichKpiCard key={i} k={k}
            onDrilldown={() => onTabChange("Financial Performance")}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {kpiData.slice(5).map((k, i) => (
          <RichKpiCard key={i} k={k}
            onDrilldown={() => onTabChange(
              i === 0 ? "Financial Performance" : i === 1 ? "Financial Performance" : i === 2 ? "Collections & Cash" : i === 3 ? "Collections & Cash" : "Financial Performance"
            )}
          />
        ))}
      </div>

      {/* Revenue vs target chart */}
      <Card>
        <SectionHeader title="Are we hitting revenue target?" sub="Monthly revenue vs budget · Apr 2024 – Mar 2025 · green = above budget · red = below budget" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={plData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis
                tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={52}
                domain={[9000, 12000]}
              />
              <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(2)}M`} />} />
              <Bar dataKey="revenue" name="Revenue" radius={[4, 4, 0, 0]} maxBarSize={38}>
                {plData.map((entry, i) => {
                  const hasBudget = entry.budget != null;
                  const above = hasBudget && entry.revenue >= (entry.budget ?? 0);
                  return (
                    <Cell
                      key={i}
                      fill={!hasBudget ? "#818cf8" : above ? "#10b981" : "#f43f5e"}
                      fillOpacity={!hasBudget ? 0.55 : 0.85}
                    />
                  );
                })}
              </Bar>
              <Line
                type="monotone" dataKey="budget" stroke="#64748b" strokeWidth={2}
                strokeDasharray="6 3" dot={false} name="Budget" connectNulls={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        {/* Variance summary row — Oct to Mar */}
        <div className="grid grid-cols-6 gap-1.5 mb-3">
          {bvaData.map((d) => {
            const diff = d.actual - d.budget;
            const pct  = ((diff / d.budget) * 100).toFixed(1);
            const pos  = diff >= 0;
            return (
              <div key={d.month} className={`rounded-lg p-2 text-center border ${pos ? "border-emerald-200 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/[0.06]" : "border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/[0.05]"}`}>
                <p className="text-[9px] font-semibold text-slate-400 dark:text-white/30 mb-0.5">{d.month}</p>
                <p className={`text-[11px] font-bold font-mono tabular-nums ${pos ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}`}>
                  {pos ? "+" : ""}{(diff / 1000).toFixed(0)}k
                </p>
                <p className={`text-[9px] font-semibold ${pos ? "text-emerald-600/70 dark:text-emerald-400/60" : "text-rose-600/70 dark:text-rose-400/60"}`}>
                  {pos ? "+" : ""}{pct}%
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-6 pt-3 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400 opacity-60" />No budget (Apr–Sep)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Above budget</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" />Below budget</span>
          <span className="flex items-center gap-2 ml-1"><span className="inline-block w-5 border-t-2 border-dashed border-slate-500" />Budget target</span>
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">Nov 24 only above-budget month · cumulative miss Oct–Mar: –£1.4M</span>
        </div>
      </Card>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Action layer */}
        <ActionLayer onTabChange={onTabChange} />

        {/* Cash conversion cycle */}
        <Card className="lg:col-span-2">
          <SectionHeader title="Where is the money?" sub="Cash conversion cycle — revenue to bank · March 2025" />

          {/* Flow */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {[
              { label: "Monthly Revenue", value: "£10.57M", sub: "billed this month", color: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-500/25", bg: "bg-indigo-50 dark:bg-indigo-500/[0.06]", dot: "bg-indigo-500" },
              { label: "WIP Outstanding", value: "£39.1M",  sub: "converting ↓",     color: "text-amber-700  dark:text-amber-300",  border: "border-amber-200  dark:border-amber-500/20",  bg: "bg-amber-50  dark:bg-amber-500/[0.05]",  dot: "bg-amber-400" },
              { label: "Debtors",         value: "£89.2M",  sub: "90% aged 91+ days",color: "text-rose-700   dark:text-rose-300",   border: "border-rose-200   dark:border-rose-500/20",   bg: "bg-rose-50   dark:bg-rose-500/[0.05]",   dot: "bg-rose-500"  },
              { label: "Total Lockup",    value: "£128.3M", sub: "12.1× monthly rev", color: "text-rose-800  dark:text-rose-200",   border: "border-rose-300   dark:border-rose-500/30",   bg: "bg-rose-100  dark:bg-rose-500/[0.08]",   dot: "bg-rose-600"  },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className={`p-3.5 rounded-xl border ${s.border} ${s.bg} h-full`}>
                  <div className={`w-2 h-2 rounded-full ${s.dot} mb-2`} />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-1.5">{s.label}</p>
                  <p className={`text-lg font-bold font-mono tabular-nums ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1">{s.sub}</p>
                </div>
                {i < 3 && (
                  <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight size={14} className="text-slate-300 dark:text-white/20" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Insight callout */}
          <div className="p-4 rounded-xl bg-slate-900 dark:bg-white/[0.04] border border-slate-800 dark:border-white/[0.08]">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 mb-1.5">System insight</p>
            <p className="text-[12.5px] text-white leading-relaxed">
              At current trajectory, lockup will return to 90 days by <span className="text-indigo-300 font-semibold">June 2025</span> if monthly collections improve by 15%. WIP is converting — the critical lever is the 91+ debtor bucket.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FINANCIAL PERFORMANCE SECTION
───────────────────────────────────────────── */

function FinancialSection() {
  const latest    = plData[plData.length - 1];
  const ytdActual = bvaData.reduce((s, d) => s + d.actual, 0);
  const ytdBudget = bvaData.reduce((s, d) => s + d.budget, 0);
  const ytdVar    = ((ytdActual - ytdBudget) / ytdBudget * 100).toFixed(1);
  const [ebitdaView, setEbitdaView] = useState<"line" | "bar" | "area">("line");
  const [bvaView, setBvaView] = useState<"bar" | "line">("bar");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Mar 25 Revenue",  value: `£${(latest.revenue / 1000).toFixed(2)}M`,     sub: "–4.6% vs budget — CVL softness",                       color: "text-rose-600 dark:text-rose-400",       border: "border-rose-200 dark:border-rose-500/20",       bg: "bg-rose-50 dark:bg-white/[0.025]"    },
          { label: "Mar 25 EBITDA",   value: `£${(latest.ebitda / 1000).toFixed(2)}M`,      sub: `${latest.ebitdaM}% margin · best in 12 months`,        color: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-500/20", bg: "bg-emerald-50 dark:bg-white/[0.025]" },
          { label: "YTD vs Budget",   value: `${Number(ytdVar) >= 0 ? "+" : ""}${ytdVar}%`, sub: `£${(ytdActual / 1000).toFixed(1)}M of £${(ytdBudget / 1000).toFixed(1)}M target (6 months)`, color: "text-amber-600 dark:text-amber-400", border: "border-amber-200 dark:border-amber-500/20", bg: "bg-amber-50 dark:bg-white/[0.025]"   },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <p className={`text-2xl font-bold font-mono tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* EBITDA margin trend */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">Is margin improving?</h2>
            <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">EBITDA margin % · Apr 2024 – Mar 2025 · recovering from Jul 24 low</p>
          </div>
          <div className="flex rounded-xl border border-slate-200 dark:border-white/[0.08] overflow-hidden text-[11px] font-semibold">
            {(["line", "bar", "area"] as const).map(v => (
              <button key={v} onClick={() => setEbitdaView(v)} className={`px-3 py-1.5 transition-colors capitalize ${ebitdaView === v ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/[0.04]"}`}>{v}</button>
            ))}
          </div>
        </div>
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={260}>
            {ebitdaView === "line" ? (
              <LineChart data={plData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[16, 24]} tickFormatter={v => `${v}%`} width={38} />
                <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
                <ReferenceLine y={20} stroke="#94a3b8" strokeDasharray="4 2" strokeOpacity={0.5} label={{ value: "20% baseline", fill: "var(--chart-tick)", fontSize: 9, position: "insideTopRight" }} />
                <Line type="monotone" dataKey="ebitdaM" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 3.5, strokeWidth: 0 }} activeDot={{ r: 5 }} name="EBITDA %" />
              </LineChart>
            ) : ebitdaView === "bar" ? (
              <BarChart data={plData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[16, 24]} tickFormatter={v => `${v}%`} width={38} />
                <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
                <ReferenceLine y={20} stroke="#94a3b8" strokeDasharray="4 2" strokeOpacity={0.5} />
                <Bar dataKey="ebitdaM" fill="#8b5cf6" radius={[4,4,0,0]} name="EBITDA %" />
              </BarChart>
            ) : (
              <AreaChart data={plData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="ebitdaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[16, 24]} tickFormatter={v => `${v}%`} width={38} />
                <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
                <Area type="monotone" dataKey="ebitdaM" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#ebitdaGrad)" name="EBITDA %" />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05] flex items-center gap-2">
          <TrendingUp size={11} className="text-emerald-500 shrink-0" />
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400/80">+3.4pp recovery from 18.7% Jul 24 low. Now at 22.1% — above the 20% baseline. Cost discipline and case mix improving.</p>
        </div>
      </Card>

      {/* Budget vs actual */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">Revenue — actual vs budget</h2>
            <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">Oct 2024 – Mar 2025 · 4 of 6 months missed target</p>
          </div>
          <div className="flex rounded-xl border border-slate-200 dark:border-white/[0.08] overflow-hidden text-[11px] font-semibold">
            {(["bar", "line"] as const).map(v => (
              <button key={v} onClick={() => setBvaView(v)} className={`px-3 py-1.5 transition-colors capitalize ${bvaView === v ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/[0.04]"}`}>{v}</button>
            ))}
          </div>
        </div>
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={240}>
            {bvaView === "bar" ? (
              <BarChart data={bvaData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={52} />
                <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(2)}M`} />} />
                <Bar dataKey="budget" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Budget" opacity={0.45} />
                <Bar dataKey="actual" fill="#6366f1" radius={[4, 4, 0, 0]} name="Actual" />
              </BarChart>
            ) : (
              <LineChart data={bvaData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={52} />
                <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(2)}M`} />} />
                <Line type="monotone" dataKey="budget" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 3" dot={false} name="Budget" />
                <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 3 }} name="Actual" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 pt-3 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 opacity-55" />Budget</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />Actual</span>
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">Nov 24 only above-budget month in H2 · cumulative miss: £1.4M</span>
        </div>
      </Card>

      {/* Service lines */}
      <Card>
        <SectionHeader title="Which service lines are driving revenue?" sub="Jan–Mar 2025 combined · source: erp_fact_revenue" badge="8 lines" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={248}>
            <BarChart data={serviceLines} layout="vertical" margin={{ top: 4, right: 48, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} />
              <YAxis dataKey="name" type="category" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} width={128} />
              <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(2)}M (Jan–Mar)`} />} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[0, 4, 4, 0]} name="Revenue"
                label={{ position: "right", fill: "var(--chart-tick)", fontSize: 9, formatter: (v: number) => `${Math.round(v / 32060 * 100)}%` } as any} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05]">
          <p className="text-[11px] text-slate-400 dark:text-white/25">CVL and Administration account for 48% of Q1 revenue. Restructuring Advisory is the third largest at £3.8M — watch this line for economic cycle sensitivity.</p>
        </div>
      </Card>

      {/* Segment split */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Business Recovery (BR)", value: "£8.02M", pct: "75.9%", sub: "Mar 25 · primary segment", color: "text-indigo-700 dark:text-indigo-300", accent: "bg-indigo-500", border: "border-indigo-200 dark:border-indigo-500/20", bg: "bg-indigo-50 dark:bg-white/[0.025]", w: "75.9%" },
          { label: "Personal Advisory (PA)", value: "£2.55M", pct: "24.1%", sub: "Mar 25 · diversification buffer", color: "text-violet-700 dark:text-violet-300", accent: "bg-violet-500", border: "border-violet-200 dark:border-violet-500/20", bg: "bg-violet-50 dark:bg-white/[0.025]", w: "24.1%" },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <div className="flex items-end justify-between mb-3">
              <p className={`text-2xl font-bold font-mono tabular-nums ${s.color}`}>{s.value}</p>
              <p className={`text-lg font-bold font-mono ${s.color} opacity-60`}>{s.pct}</p>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 mb-2">
              <div className={`h-full rounded-full ${s.accent}`} style={{ width: s.w }} />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-white/30">{s.sub}</p>
          </div>
        ))}
      </div>

      <Card>
        <SectionHeader title="Financial signals" sub="System-generated · March 2025" badge="System" />
        <div className="space-y-2.5">
          <Signal type="alert"   title="Revenue –4.6% vs budget (–£520k) · Mar 25"             detail="Third below-budget month in six. YTD £1.4M short. CVL intake down in Q1 — needs pipeline review." />
          <Signal type="warning" title="BR at 75.9% of revenue — sector concentration risk"    detail="PA provides a 24% buffer. BR is insolvency-cycle sensitive. Diversification into Advisory growing well." />
          <Signal type="info"    title="EBITDA 22.1% — recovery trajectory sustained"           detail="Cost per case improving. Above 20% baseline. If revenue recovers to budget, full-year EBITDA target achievable." />
          <Signal type="info"    title="CVL dominates at 26% of Q1 revenue (£8.2M)"            detail="Strong insolvency demand environment. Administration second at 22%. Monitor for saturation." />
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COLLECTIONS & CASH CONVERSION SECTION
───────────────────────────────────────────── */

function CashSection() {
  const latestRec = recData[recData.length - 1];
  const latestWip = wipData[wipData.length - 1];
  const [forecastPeriod, setForecastPeriod] = useState<"6M" | "12M">("6M");
  const [debtorDays, setDebtorDays] = useState(118);
  const [collectionImprovement, setCollectionImprovement] = useState(2.5); // days/month improvement
  const [monthlyRevenue, setMonthlyRevenue] = useState(10.57); // £M

  const forecastMonths = forecastPeriod === "6M" ? 6 : 12;
  const forecastData = Array.from({ length: forecastMonths }, (_, i) => {
    const month = i + 1;
    const projLockup = Math.max(90, debtorDays - collectionImprovement * month);
    const projDebtors = monthlyRevenue * projLockup;
    const projCashCollected = Math.max(0, (latestRec.debtors / 1000) - projDebtors + monthlyRevenue * month);
    return {
      month: ["Apr 25","May 25","Jun 25","Jul 25","Aug 25","Sep 25","Oct 25","Nov 25","Dec 25","Jan 26","Feb 26","Mar 26"][i],
      lockup: Math.round(projLockup),
      debtors: Math.round(projDebtors * 1000),
      cashFlow: Math.round(projCashCollected * 1000),
    };
  });

  return (
    <div className="space-y-5">

      {/* Callout — the shocking stat */}
      <div className="p-6 rounded-2xl bg-slate-900 dark:bg-white/[0.04] border border-slate-800 dark:border-white/[0.07]">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle size={22} className="text-rose-400" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-rose-400 mb-1.5">Priority signal</p>
            <p className="text-[1.4rem] font-bold text-white leading-snug mb-1">
              90% of the £89.2M debtor book is aged 91+ days overdue.
            </p>
            <p className="text-[12.5px] text-white/50 leading-relaxed">
              £80.6M sits beyond 91 days. Insolvency case cycles extend collection timescales — but this concentration requires a structured recovery initiative. At current billings of £10.6M/month, total lockup represents 12.1× monthly revenue.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Debtors",  value: `£${(latestRec.debtors / 1000).toFixed(1)}M`,  sub: "Mar 2025",               color: "text-rose-700 dark:text-rose-400",     border: "border-rose-200 dark:border-rose-500/20",     bg: "bg-rose-50 dark:bg-white/[0.025]"    },
          { label: "Aged 91+ Days",  value: `£${(latestRec.aged91 / 1000).toFixed(1)}M`,   sub: "90.4% of book",          color: "text-rose-700 dark:text-rose-400",     border: "border-rose-200 dark:border-rose-500/20",     bg: "bg-rose-50 dark:bg-white/[0.025]"    },
          { label: "WIP Balance",    value: `£${(latestWip.wip / 1000).toFixed(1)}M`,      sub: "converting · down £8.3M", color: "text-amber-700 dark:text-amber-400",  border: "border-slate-200 dark:border-white/[0.07]",   bg: "bg-white dark:bg-white/[0.025]"      },
          { label: "Lockup Days",    value: `${latestRec.lockup}d`,                         sub: "target: 90d",            color: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-500/20", bg: "bg-indigo-50 dark:bg-white/[0.025]"  },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <p className={`text-2xl font-bold font-mono tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Lockup days — with 90-day reference line */}
      <Card>
        <SectionHeader title="How far are we from the lockup target?" sub="Lockup days · Oct 2024 – Mar 2025 · 90-day target shown" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={recData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[80, 135]} tickFormatter={v => `${v}d`} width={40} />
              <Tooltip content={<ChartTooltip formatter={(v) => `${v} days`} />} />
              <ReferenceLine y={90} stroke="#10b981" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: "90d target", fill: "#10b981", fontSize: 10, position: "insideTopRight" }} />
              <Line type="monotone" dataKey="lockup" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 3.5, strokeWidth: 0 }} activeDot={{ r: 5 }} name="Lockup days" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/[0.05] flex items-start gap-2.5">
          <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-700 dark:text-amber-300/80 leading-relaxed">Gap to target is 28 days (118d vs 90d). Improving from Jan 25 peak of 125d. At current rate of improvement (~2.5d/month), target reached by late 2025 — collections acceleration needed to close gap faster.</p>
        </div>
      </Card>

      {/* Debtor aging trend */}
      <Card>
        <SectionHeader title="Is the aging position improving?" sub="91+ vs current · Oct 2024 – Mar 2025" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={recData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(0)}M`} width={52} />
              <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(1)}M`} />} />
              <Bar dataKey="aged91" stackId="a" fill="#f43f5e" radius={[0, 0, 0, 0]} name="Aged 91+" />
              <Bar dataKey="other"  stackId="a" fill="#6366f1" radius={[4, 4, 0, 0]} name="0–90 days" opacity={0.75} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 pt-3 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" />Aged 91+</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 opacity-75" />0–90 days</span>
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">The 91+ bucket is growing in absolute terms each month</span>
        </div>
      </Card>

      {/* WIP trend */}
      <Card>
        <SectionHeader title="WIP converting — is billing keeping pace?" sub="Closing WIP balance · Oct 2024 – Mar 2025 · declining is good" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={wipData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="wipAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(0)}M`} width={48} />
              <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(1)}M`} />} />
              <Area type="monotone" dataKey="wip" stroke="#f59e0b" strokeWidth={2.5} fill="url(#wipAreaGrad)" name="WIP" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05] flex items-center gap-2">
          <TrendingDown size={11} className="text-emerald-500 shrink-0" />
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400/80">WIP down £8.3M since Nov 24 peak. Cases progressing to billing — positive. The conversion is happening. Collections is where value is being lost.</p>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Collections signals" sub="Automated exception monitoring" badge="System" />
        <div className="space-y-2.5">
          <Signal type="alert"   title="£80.6M aged 91+ — 90.4% of total debtor book"               detail="Structurally elevated. Insolvency case cycles explain some aging, but concentration at 90%+ requires intervention." />
          <Signal type="alert"   title="Lockup £128.3M — up £21M (+20%) since Oct 24"               detail="Debtor growth outpacing WIP conversion. Total lockup now 12.1× monthly revenue. Board-level visibility recommended." />
          <Signal type="warning" title="Lockup 28 days above 90-day target — closing slowly"        detail="At current 2.5d/month improvement rate, target not reached until late 2025. Collections acceleration needed." />
          <Signal type="info"    title="WIP declining £8.3M — cases are converting to bills"        detail="Nov 24 peak £47.4M → Mar 25 £39.1M. The operational process is working. Collections is the single bottleneck." />
        </div>
      </Card>

      {/* Forecasted cashflow */}
      <Card>
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">Forecasted cashflow</h2>
            <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">Based on current debtor days, collection rate, and average billing</p>
          </div>
          <div className="flex rounded-xl border border-slate-200 dark:border-white/[0.08] overflow-hidden text-[11px] font-semibold">
            {(["6M", "12M"] as const).map(v => (
              <button key={v} onClick={() => setForecastPeriod(v)} className={`px-3 py-1.5 transition-colors ${forecastPeriod === v ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/[0.04]"}`}>{v}</button>
            ))}
          </div>
        </div>

        {/* Settings panel */}
        <div className="mb-5 p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-1.5 mb-3">
            <Sliders size={11} className="text-slate-400 dark:text-white/30" />
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">Forecast assumptions — adjust to model scenarios</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 dark:text-white/40 block mb-1.5">Current debtor days: <span className="text-indigo-600 dark:text-indigo-400">{debtorDays}d</span></label>
              <input type="range" min={60} max={180} value={debtorDays} onChange={e => setDebtorDays(Number(e.target.value))} className="w-full accent-indigo-600 h-1.5" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 dark:text-white/40 block mb-1.5">Monthly improvement: <span className="text-indigo-600 dark:text-indigo-400">{collectionImprovement}d/mo</span></label>
              <input type="range" min={0} max={10} step={0.5} value={collectionImprovement} onChange={e => setCollectionImprovement(Number(e.target.value))} className="w-full accent-indigo-600 h-1.5" />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 dark:text-white/40 block mb-1.5">Monthly billing: <span className="text-indigo-600 dark:text-indigo-400">£{monthlyRevenue.toFixed(1)}M</span></label>
              <input type="range" min={8} max={14} step={0.1} value={monthlyRevenue} onChange={e => setMonthlyRevenue(Number(e.target.value))} className="w-full accent-indigo-600 h-1.5" />
            </div>
          </div>
        </div>

        {/* Forecast chart */}
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={forecastData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} dy={6} />
            <YAxis yAxisId="left" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}d`} width={36} domain={[80, 140]} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(0)}M`} width={44} />
            <Tooltip content={<ChartTooltip formatter={(v, n) => n === "Lockup days" ? `${v}d` : `£${(Number(v) / 1000).toFixed(1)}M`} />} />
            <ReferenceLine yAxisId="left" y={90} stroke="#10b981" strokeDasharray="5 3" strokeWidth={1.5} label={{ value: "90d target", fill: "#10b981", fontSize: 9, position: "insideTopRight" }} />
            <Line yAxisId="left" type="monotone" dataKey="lockup" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 3 }} name="Lockup days" />
            <Line yAxisId="right" type="monotone" dataKey="debtors" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="Debtors £" />
          </LineChart>
        </ResponsiveContainer>

        {/* Forecast table summary */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                <th className="text-left pb-2 text-[9px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25">Month</th>
                {forecastData.map(d => <th key={d.month} className="text-right pb-2 text-[9px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25">{d.month}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 dark:border-white/[0.04]">
                <td className="py-2 text-slate-500 dark:text-white/40">Lockup days</td>
                {forecastData.map(d => <td key={d.month} className={`py-2 text-right font-mono font-semibold tabular-nums ${d.lockup <= 90 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{d.lockup}d</td>)}
              </tr>
              <tr>
                <td className="py-2 text-slate-500 dark:text-white/40">Debtors</td>
                {forecastData.map(d => <td key={d.month} className="py-2 text-right font-mono tabular-nums text-slate-600 dark:text-white/60">£{(d.debtors / 1000).toFixed(0)}M</td>)}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-400 dark:text-white/25 mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.05]">Forecast based on current trajectory + your assumptions above. Adjust the sliders to model different scenarios.</p>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PEOPLE & CAPACITY SECTION
───────────────────────────────────────────── */

function PeopleSection() {
  const latestHC  = hcData[hcData.length - 1];
  const firstHC   = hcData[0];
  const netChange = latestHC.headcount - firstHC.headcount;
  const avgUtil   = utilisationHeatmap.reduce((s, g) => s + g.Mar, 0) / utilisationHeatmap.length;
  const avgTarget = utilisationHeatmap.reduce((s, g) => s + g.target, 0) / utilisationHeatmap.length;
  const [utilView, setUtilView] = useState<"heatmap" | "bar" | "table">("heatmap");
  const [hcView, setHcView] = useState<"area" | "bar">("area");

  const utilBarData = utilisationHeatmap.map(g => ({
    grade: g.grade.replace("Sr. ", "Sr."),
    actual: g.Mar,
    target: g.target,
    delta: g.Mar - g.target,
  }));

  function cellColor(util: number, target: number) {
    const delta = util - target;
    if (delta >= 1)    return "bg-emerald-500/80 dark:bg-emerald-500/70 text-white";
    if (delta >= -0.5) return "bg-emerald-200/80 dark:bg-emerald-500/30 text-emerald-800 dark:text-emerald-200";
    if (delta >= -2)   return "bg-amber-200/80 dark:bg-amber-500/30 text-amber-800 dark:text-amber-200";
    return "bg-rose-200/80 dark:bg-rose-500/30 text-rose-800 dark:text-rose-200";
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Headcount", value: `${latestHC.headcount}`,   sub: `${netChange >= 0 ? "+" : ""}${netChange} since Nov · stable`, color: "text-slate-900 dark:text-white",         border: "border-slate-200 dark:border-white/[0.07]",   bg: "bg-white dark:bg-white/[0.025]"      },
          { label: "Fee Earners",     value: `${latestHC.feeEarners}`,  sub: `${Math.round(latestHC.feeEarners / latestHC.headcount * 100)}% of total headcount`,  color: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-500/20", bg: "bg-indigo-50 dark:bg-white/[0.025]"  },
          { label: "Avg Utilisation", value: `${avgUtil.toFixed(1)}%`,  sub: `vs ${avgTarget.toFixed(1)}% target · +0.6pp`,                 color: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-500/20", bg: "bg-emerald-50 dark:bg-white/[0.025]" },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <p className={`text-2xl font-bold font-mono tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Utilisation chart */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">Are we utilising people effectively?</h2>
            <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">Utilisation by grade · Oct 2024 – Mar 2025 · green = at/above target</p>
          </div>
          <div className="flex rounded-xl border border-slate-200 dark:border-white/[0.08] overflow-hidden text-[11px] font-semibold">
            {(["heatmap", "bar", "table"] as const).map(v => (
              <button key={v} onClick={() => setUtilView(v)} className={`px-3 py-1.5 transition-colors capitalize ${utilView === v ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/[0.04]"}`}>{v}</button>
            ))}
          </div>
        </div>

        {utilView === "bar" && (
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={utilBarData} layout="vertical" margin={{ top: 4, right: 60, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[40, 90]} />
                <YAxis dataKey="grade" type="category" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} width={88} />
                <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
                <Bar dataKey="target" fill="#94a3b8" radius={[0,4,4,0]} name="Target" opacity={0.4} />
                <Bar dataKey="actual" fill="#10b981" radius={[0,4,4,0]} name="Actual"
                  label={{ position: "right", fill: "var(--chart-tick)", fontSize: 9, formatter: (v: number) => `${v.toFixed(1)}%` } as any} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {utilView === "table" && (
          <div className="mb-4 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                  <th className="text-left pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">Grade</th>
                  <th className="text-right pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">Target</th>
                  <th className="text-right pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">Mar 25</th>
                  <th className="text-right pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">vs Target</th>
                  <th className="text-right pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">6M Avg</th>
                </tr>
              </thead>
              <tbody>
                {utilisationHeatmap.map((row, i) => {
                  const monthVals = heatmapMonths.map(m => row[m]);
                  const avg = monthVals.reduce((s, v) => s + v, 0) / monthVals.length;
                  const delta = row.Mar - row.target;
                  return (
                    <tr key={i} className="border-b border-slate-100 dark:border-white/[0.04]">
                      <td className="py-2.5 font-semibold text-slate-800 dark:text-white/80">{row.grade}</td>
                      <td className="py-2.5 text-right font-mono tabular-nums text-slate-500 dark:text-white/40">{row.target}%</td>
                      <td className={`py-2.5 text-right font-mono tabular-nums font-semibold ${delta >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{row.Mar}%</td>
                      <td className={`py-2.5 text-right font-mono tabular-nums text-[10px] ${delta >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{delta >= 0 ? "+" : ""}{delta.toFixed(1)}pp</td>
                      <td className="py-2.5 text-right font-mono tabular-nums text-slate-500 dark:text-white/40">{avg.toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Heatmap — original view, shown when utilView === "heatmap" */}
        {utilView === "heatmap" && (
        <><div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 pb-3 w-32">Grade</th>
                <th className="text-center text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 pb-3 w-10">Target</th>
                {heatmapMonths.map(m => (
                  <th key={m} className="text-center text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 pb-3 px-1">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-1.5">
              {utilisationHeatmap.map((row, i) => (
                <tr key={i} className={i < utilisationHeatmap.length - 1 ? "border-b border-slate-100 dark:border-white/[0.04]" : ""}>
                  <td className="py-2.5 pr-4">
                    <span className="text-[12px] font-semibold text-slate-800 dark:text-white">{row.grade}</span>
                  </td>
                  <td className="py-2.5 text-center">
                    <span className="text-[11px] font-mono text-slate-400 dark:text-white/30">{row.target}%</span>
                  </td>
                  {heatmapMonths.map(m => {
                    const val = row[m];
                    const cls = cellColor(val, row.target);
                    return (
                      <td key={m} className="py-2.5 px-1">
                        <div className={`rounded-lg py-1.5 text-center font-mono font-semibold text-[11px] ${cls}`}>
                          {val.toFixed(1)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.05] flex items-center gap-4 text-[10px] text-slate-400 dark:text-white/25">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500/80" />At/above target</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-200/80 dark:bg-amber-500/30" />Slightly below</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-200/80 dark:bg-rose-500/30" />Below target</span>
          <span className="ml-auto">Mar 25: Associates only grade below target (–0.9pp)</span>
        </div>
        </>)}
      </Card>

      {/* Headcount trend */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">Headcount — Nov 2024 to Apr 2025</h2>
            <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">Total and fee earners · CRM · stable growth, no attrition spike</p>
          </div>
          <div className="flex rounded-xl border border-slate-200 dark:border-white/[0.08] overflow-hidden text-[11px] font-semibold">
            {(["area", "bar"] as const).map(v => (
              <button key={v} onClick={() => setHcView(v)} className={`px-3 py-1.5 transition-colors capitalize ${hcView === v ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/[0.04]"}`}>{v}</button>
            ))}
          </div>
        </div>
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={230}>
            {hcView === "area" ? (<AreaChart data={hcData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.14} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="feGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[500, 760]} width={36} />
              <Tooltip content={<ChartTooltip formatter={(v, n) => `${v} ${n.toLowerCase()}`} />} />
              <Area type="monotone" dataKey="headcount"  stroke="#6366f1" strokeWidth={2.5} fill="url(#hcGrad)" name="Headcount" />
              <Area type="monotone" dataKey="feeEarners" stroke="#10b981" strokeWidth={2}   fill="url(#feGrad)"  name="Fee earners" />
            </AreaChart>) : (
            <BarChart data={hcData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[500, 760]} width={36} />
              <Tooltip content={<ChartTooltip formatter={(v, n) => `${v} ${n.toLowerCase()}`} />} />
              <Bar dataKey="headcount"  fill="#6366f1" radius={[4,4,0,0]} name="Headcount" />
              <Bar dataKey="feeEarners" fill="#10b981" radius={[4,4,0,0]} name="Fee earners" />
            </BarChart>)}
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 pt-2 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />Total headcount</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Fee earners</span>
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">Apr 26: 725 total · 542 fee earners (74.8% ratio)</span>
        </div>
      </Card>

      <Card>
        <SectionHeader title="People signals" sub="System-generated flags" badge="System" />
        <div className="space-y-2.5">
          <Signal type="warning" title="Associate utilisation 81.1% — 0.9pp below 82% target"         detail="Only grade below target across all months. Monitor case intake volume vs associate capacity heading into Q2." />
          <Signal type="info"    title="Partners 56.9% vs 55% target — ahead across all 6 months"     detail="Consistent above-target performance. Fee earner-to-partner leverage ratio healthy at current headcount." />
          <Signal type="info"    title="Headcount +9 in 6 months — controlled, no attrition signal"   detail="725 total. No leavers spike in any month. Stable trajectory supports H2 revenue growth target." />
          <Signal type="info"    title="Productivity improving — EBITDA recovery with stable headcount" detail="22.1% EBITDA margin achieved without headcount growth. Positive leverage: output per FTE increasing." />
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   RISKS & EXCEPTIONS SECTION
───────────────────────────────────────────── */

function AlertsSection({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const critical = [
    { area: "Collections", title: "£80.6M aged 91+ — 90.4% of debtor book",           detail: "Insolvency case cycles drive aging but 90%+ is structurally elevated. Targeted recovery strategy required now." },
    { area: "Financial",   title: "Revenue –4.6% vs budget in Mar 25 (–£520k)",        detail: "Third miss in six months. YTD £1.4M behind plan. CVL intake volume softness is the driver." },
  ];

  const warnings = [
    { area: "Collections", title: "Total lockup £128.3M — up £21M since Oct 24",       detail: "WIP declining (positive) but debtor growth outpacing. Cash conversion pressure building. Board visibility recommended." },
    { area: "Collections", title: "Lockup 118d — 28 days above 90-day target",         detail: "Improving from Jan 25 peak of 125d at ~2.5d/month. At this rate, target not reached until late 2025." },
    { area: "People",      title: "Associate utilisation 81.1% — 0.9pp below target",  detail: "Only grade below target. Monitor Q2 intake volume to determine whether this is capacity or demand." },
    { area: "Financial",   title: "BR at 75.9% of revenue — sector concentration",     detail: "PA at 24.1% provides buffer. BR is insolvency-cycle sensitive. Advisory diversification growing." },
  ];

  const intelligence = [
    { area: "Financial",   title: "EBITDA 22.1% — recovery trajectory sustained",      detail: "Above 20% baseline. Cost per case improving. Revenue recovery to budget makes full-year target achievable." },
    { area: "Collections", title: "WIP £39.1M declining — conversion is happening",    detail: "Down £8.3M from Nov peak. Cases billing through. Collections is the single remaining bottleneck." },
    { area: "People",      title: "5 of 6 grades above utilisation target",            detail: "Broad-based performance. Partner utilisation 56.9% vs 55% target. Healthy fee earner leverage." },
    { area: "Financial",   title: "CVL 26% of Q1 revenue — strong demand environment", detail: "£8.2M in 3 months. Administration second at £7.1M. Insolvency market conditions remain favourable." },
  ];

  const reports = [
    { name: "March 2025 — P&L Summary",         type: "Financial",   updated: "Today", filename: "mar2025_pl.csv",          csv: `Category,£\nRevenue,10570000\nGross Profit,6427000\nEBITDA,2336000\nEBITDA Margin,22.1%\n` },
    { name: "March 2025 — Budget vs Actual",     type: "Financial",   updated: "Today", filename: "mar2025_bva.csv",         csv: `Month,Budget,Actual,Variance\nOct,10550000,10330000,-2.1%\nNov,10520000,10560000,+0.4%\nDec,10970000,10670000,-2.8%\nJan,10990000,10490000,-4.6%\nFeb,10260000,10510000,+2.5%\nMar,11090000,10570000,-4.6%\n` },
    { name: "March 2025 — Debtors & WIP",        type: "Collections", updated: "Today", filename: "mar2025_lockup.csv",      csv: `Month,Debtors,Aged 91+,WIP,Lockup Days\nOct,75740000,70650000,44940000,110\nNov,77620000,72290000,47430000,119\nDec,80610000,73880000,45180000,122\nJan,83310000,75740000,42390000,125\nFeb,86380000,77610000,40340000,119\nMar,89180000,80590000,39120000,118\n` },
    { name: "March 2025 — Utilisation by Grade", type: "People",      updated: "Today", filename: "mar2025_utilisation.csv", csv: `Grade,Actual,Target,Delta\nPartner,56.9%,55.0%,+1.9pp\nDirector,65.8%,65.0%,+0.8pp\nSr. Manager,73.1%,72.0%,+1.1pp\nManager,78.3%,77.0%,+1.3pp\nSr. Associate,80.4%,80.0%,+0.4pp\nAssociate,81.1%,82.0%,-0.9pp\n` },
  ];

  const insights = [
    { num: "01", type: "critical" as const, title: "Collections crisis: £80.6M stuck in 91+ days — cash conversion at structural risk", cause: "Insolvency case cycles extend collection timescales, but 90.4% of the debtor book aged beyond 91 days is structural, not cyclical. AR grew +£2.8M in March alone with no offsetting collection acceleration.", impact: "At current trajectory, total lockup reaches £135M+ by June 2025. Each additional month of 91+ growth costs approximately £3M in working capital availability." },
    { num: "02", type: "warning"  as const, title: "Revenue £1.4M below YTD budget — CVL volume the single biggest risk", cause: "CVL intake has been soft for 3 consecutive months. Budget assumed £1.6M/month from CVL; actual is averaging £1.38M. The shortfall of £220k/month is consistent, not one-off.", impact: "If CVL run rate doesn't recover by Q2 FY26, the full-year revenue miss will widen to £2.4–2.8M. EBITDA impact at current margins: approximately £500–600k below full-year target." },
    { num: "03", type: "positive" as const, title: "Operating margin hit 20.9% — 3-month recovery trend is real and accelerating", cause: "Total opex fell £61k MoM (staff –£20k, contractors –£48k, premises –£11k) against flat revenue. The 18.5% → 19.8% → 20.9% trend represents 2.4pp recovery in 3 months.", impact: "If this margin trajectory holds, the firm is on track to reach the 22.0% target by May 2025. Each additional percentage point = approximately £106k/month of EBITDA improvement." },
    { num: "04", type: "positive" as const, title: "WIP declining to £39.1M — operational billing pipeline is healthy", cause: "WIP fell from £47.4M (Nov peak) to £39.1M in March — a £8.3M reduction in 4 months. Cases are progressing to billing stage. The conversion pipeline is functioning correctly.", impact: "If the remaining £39.1M WIP converts at the historical rate, it would add approximately £13M of revenue over the next 90 days. Collections is the single constraint on cash conversion." },
    { num: "05", type: "warning"  as const, title: "Contractor cost reduction saves £48k but creates capacity risk heading into Q2", cause: "Two fixed-term contractors rolled off in February and were not replaced. Combined saving: £48k/month. However, these contractors supported case administration in CVL and Administration — the two highest-revenue lines.", impact: "If CVL and Administration case volumes increase (as expected), the firm may face a capacity constraint by May–June 2025. A hire decision now would take 6–8 weeks to operationalise." },
  ];

  const typeCfg = {
    critical: { bar: "bg-rose-500",    badge: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/25",    label: "Critical"  },
    warning:  { bar: "bg-amber-400",   badge: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/25",  label: "Watch"     },
    positive: { bar: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/25", label: "Positive" },
  };

  return (
    <div className="space-y-5">

      {/* Action layer at top */}
      <ActionLayer onTabChange={onTabChange} />

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Critical",     value: `${critical.length}`,     color: "text-rose-700   dark:text-rose-400",   bg: "bg-rose-100   dark:bg-rose-500/10"   },
          { label: "Warnings",     value: `${warnings.length}`,     color: "text-amber-700  dark:text-amber-400",  bg: "bg-amber-100  dark:bg-amber-500/10"  },
          { label: "Intelligence", value: `${intelligence.length}`, color: "text-indigo-700 dark:text-indigo-400", bg: "bg-indigo-100 dark:bg-indigo-500/10" },
        ].map(s => (
          <Card key={s.label} className="!p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
              <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.value} {s.label.toLowerCase()}</p>
              <p className="text-xs text-slate-500 dark:text-white/35">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <SectionHeader title="Critical & warnings" sub="All exception signals — March 2025" badge={`${critical.length + warnings.length} signals`} />
        <div className="space-y-2.5">
          {[...critical.map(s => ({ ...s, type: "alert" as const })), ...warnings.map(s => ({ ...s, type: "warning" as const }))].map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 w-24 shrink-0 pt-1">{s.area}</span>
              <div className="flex-1"><Signal type={s.type} title={s.title} detail={s.detail} /></div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Intelligence" sub="Positive signals and opportunities" />
        <div className="space-y-2.5">
          {intelligence.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 w-24 shrink-0 pt-1">{s.area}</span>
              <div className="flex-1"><Signal type="info" title={s.title} detail={s.detail} /></div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Export reports" sub="Auto-generated · updated daily from source systems" badge={`${reports.length} reports`} />
        <div className="space-y-2.5">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.04] hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                <FileText size={14} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{r.name}</p>
                <p className="text-xs text-slate-500 dark:text-white/35">{r.type} · Updated {r.updated}</p>
              </div>
              <button
                onClick={() => { const b = new Blob([r.csv], { type: "text/csv" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = r.filename; a.click(); URL.revokeObjectURL(u); }}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-white/35 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
              >
                <Download size={13} />Export
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Deep insights */}
      <Card>
        <SectionHeader title="Key financial insights" sub="System-generated · cause + impact analysis · March 2025" badge="5 insights" />
        <div className="space-y-3">
          {insights.map((ins, i) => {
            const cfg = typeCfg[ins.type];
            return (
              <div key={i} className="rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden">
                <div className={`h-[2px] ${cfg.bar}`} />
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-[1.4rem] font-black text-slate-100 dark:text-white/10 leading-none font-mono shrink-0 select-none">{ins.num}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-2">
                        <p className="font-semibold text-[12.5px] text-slate-900 dark:text-white leading-snug flex-1">{ins.title}</p>
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0 ${cfg.badge}`}>{cfg.label}</span>
                      </div>
                      <div className="grid lg:grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.025] border border-slate-100 dark:border-white/[0.05]">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-1">Cause</p>
                          <p className="text-[11px] text-slate-600 dark:text-white/60 leading-relaxed">{ins.cause}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.025] border border-slate-100 dark:border-white/[0.05]">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-1">Impact</p>
                          <p className="text-[11px] text-slate-600 dark:text-white/60 leading-relaxed">{ins.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   REPORTS SECTION
───────────────────────────────────────────── */

function ReportsSection() {
  const [printMode, setPrintMode] = useState(false);

  const reportDefs = [
    {
      name: "March 2025 — P&L Summary", type: "Financial", filename: "mar2025_pl.csv",
      csv: `Category,£000\nRevenue,10570\nCost of Sales,4143\nGross Profit,6427\nTotal Opex,4091\nEBITDA,2336\nEBITDA Margin,22.1%\nDepreciation,127\nFinance Costs,210\nTax Provision,209\nNet Profit,1790\n`,
    },
    {
      name: "March 2025 — Budget vs Actual", type: "Financial", filename: "mar2025_bva.csv",
      csv: `Month,Budget £000,Actual £000,Variance £000,Variance %\nOct,10550,10330,-220,-2.1%\nNov,10520,10560,+40,+0.4%\nDec,10970,10670,-300,-2.8%\nJan,10990,10490,-500,-4.6%\nFeb,10260,10510,+250,+2.5%\nMar,11090,10570,-520,-4.6%\n`,
    },
    {
      name: "March 2025 — Debtors & Lockup", type: "Collections", filename: "mar2025_lockup.csv",
      csv: `Month,Total Debtors £000,Aged 91+ £000,WIP £000,Lockup Days\nOct,75740,70650,44940,110\nNov,77620,72290,47430,119\nDec,80610,73880,45180,122\nJan,83310,75740,42390,125\nFeb,86380,77610,40340,119\nMar,89180,80590,39120,118\n`,
    },
    {
      name: "March 2025 — Utilisation by Grade", type: "People", filename: "mar2025_utilisation.csv",
      csv: `Grade,Target %,Oct %,Nov %,Dec %,Jan %,Feb %,Mar %,vs Target\nPartner,55.0,55.2,56.0,57.1,55.8,56.2,56.9,+1.9pp\nDirector,65.0,64.8,65.5,66.2,64.9,65.1,65.8,+0.8pp\nSr. Manager,72.0,72.1,73.0,74.2,72.8,72.5,73.1,+1.1pp\nManager,77.0,77.5,78.1,79.0,78.2,77.9,78.3,+1.3pp\nSr. Associate,80.0,79.8,80.5,81.0,80.1,79.8,80.4,+0.4pp\nAssociate,82.0,81.8,82.1,82.5,81.5,80.9,81.1,-0.9pp\n`,
    },
    {
      name: "March 2025 — Service Line Revenue", type: "Financial", filename: "mar2025_servicelines.csv",
      csv: `Service Line,Oct £000,Nov £000,Dec £000,Jan £000,Feb £000,Mar £000,MoM %,6M Total £000\nCVL,1340,1380,1395,1350,1385,1420,+2.5%,8270\nAdministration,1150,1175,1195,1158,1180,1210,+2.5%,7068\nRestructuring,625,650,635,620,640,658,+2.8%,3828\nLPA Receivership,490,503,498,488,495,510,+3.0%,2984\nCreditor Svcs,432,440,438,428,435,442,+1.6%,2615\nMVL,398,406,400,395,402,415,+3.2%,2416\nOther,895,1006,1109,1051,973,915,-6.0%,5949\n`,
    },
  ];

  function downloadCsv(r: typeof reportDefs[0]) {
    const b = new Blob([r.csv], { type: "text/csv" });
    const u = URL.createObjectURL(b);
    const a = document.createElement("a");
    a.href = u; a.download = r.filename; a.click();
    URL.revokeObjectURL(u);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">Financial reports</h2>
          <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">Auto-generated · updated daily · formatted for financial accounting</p>
        </div>
        <button
          onClick={() => setPrintMode(p => !p)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] px-3 py-1.5 rounded-lg transition-colors"
        >
          <Printer size={12} /> {printMode ? "Normal view" : "Print view"}
        </button>
      </div>

      {/* P&L Report */}
      <div className={`rounded-2xl border ${printMode ? "border-slate-400 bg-white dark:bg-white text-slate-900" : "border-slate-200 dark:border-white/[0.09] bg-white dark:bg-[#0b0b17]"} shadow-sm overflow-hidden`}>
        {printMode && (
          <div className="px-8 py-5 border-b border-slate-200 flex items-start justify-between">
            <div>
              <p className="text-lg font-bold text-slate-900">BTG Advisory Group</p>
              <p className="text-sm text-slate-600">Profit & Loss Statement — March 2025</p>
              <p className="text-xs text-slate-400 mt-0.5">Prepared by: CEO Operating System · Confidential</p>
            </div>
            <div className="text-right text-xs text-slate-500">
              <p>Period: March 2025</p>
              <p>Prepared: {new Date().toLocaleDateString("en-GB")}</p>
            </div>
          </div>
        )}
        <div className={printMode ? "px-8 py-4" : "px-6 py-5"}>
          {!printMode && <SectionHeader title="P&L Statement — March 2025" sub="vs February 2025 vs budget · £000" badge="Financial" />}
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/[0.08]">
                  <th className="text-left pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">Line Item</th>
                  <th className="text-right pb-3 pr-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">Mar 25 £000</th>
                  <th className="text-right pb-3 pr-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">Feb 25 £000</th>
                  <th className="text-right pb-3 pr-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">Budget £000</th>
                  <th className="text-right pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">vs Budget</th>
                </tr>
              </thead>
              <tbody>
                {plDetail.map((row, i) => {
                  const isIncome = ["Revenue", "Gross Profit", "EBITDA", "Net Profit"].includes(row.label);
                  const budgetVar = row.curr - row.budget;
                  const goodVar = isIncome ? budgetVar >= 0 : budgetVar <= 0;
                  return (
                    <tr key={i} className={`${row.isTotal ? "border-t-2 border-slate-300 dark:border-white/[0.15]" : row.isSubtotal ? "border-t border-slate-200 dark:border-white/[0.08]" : ""} ${i < plDetail.length - 1 ? "border-b border-slate-100 dark:border-white/[0.04]" : ""}`}>
                      <td className={`py-2.5 ${row.indent > 0 ? "pl-5" : ""} ${row.isSubtotal || row.isTotal ? "font-bold text-slate-900 dark:text-white" : "text-slate-700 dark:text-white/70"}`}>{row.label}</td>
                      <td className={`py-2.5 text-right pr-4 font-mono tabular-nums ${row.isSubtotal || row.isTotal ? "font-bold text-slate-900 dark:text-white" : "text-slate-700 dark:text-white/70"}`}>{(row.curr / 1000).toFixed(0)}</td>
                      <td className="py-2.5 text-right pr-4 font-mono tabular-nums text-[11px] text-slate-500 dark:text-white/40">{(row.prev / 1000).toFixed(0)}</td>
                      <td className="py-2.5 text-right pr-4 font-mono tabular-nums text-[11px] text-slate-400 dark:text-white/30">{(row.budget / 1000).toFixed(0)}</td>
                      <td className={`py-2.5 text-right font-mono tabular-nums text-[11px] font-semibold ${goodVar ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {budgetVar >= 0 ? "+" : ""}{(budgetVar / 1000).toFixed(0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-6 py-3 border-t border-slate-100 dark:border-white/[0.05] flex items-center justify-between">
          <p className="text-[10px] text-slate-400 dark:text-white/25">All figures in £000 · Source: ERP system · High-confidence data only</p>
          <button onClick={() => downloadCsv(reportDefs[0])} className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
            <Download size={12} /> Export CSV
          </button>
        </div>
      </div>

      {/* Other available reports */}
      <Card>
        <SectionHeader title="Available reports" sub="Export CSV · updated daily" badge={`${reportDefs.length} reports`} />
        <div className="space-y-2">
          {reportDefs.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.04] hover:shadow-sm transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                <FileText size={14} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{r.name}</p>
                <p className="text-xs text-slate-500 dark:text-white/35">{r.type} · Updated today</p>
              </div>
              <button onClick={() => downloadCsv(r)} className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-white/35 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0">
                <Download size={13} /> Export
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   P&L DEEP DIVE SECTION
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   SERVICE LINE DEEP DIVE SECTION
───────────────────────────────────────────── */

const slMonths = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"] as const;
const slLines = [
  { name: "CVL",            data: [1340, 1380, 1395, 1350, 1385, 1420], target: 1500, color: "#6366f1" },
  { name: "Administration", data: [1150, 1175, 1195, 1158, 1180, 1210], target: 1300, color: "#8b5cf6" },
  { name: "Restructuring",  data: [625,  650,  635,  620,  640,  658],  target: 700,  color: "#06b6d4" },
  { name: "LPA Receivership",data:[490,  503,  498,  488,  495,  510],  target: 520,  color: "#10b981" },
  { name: "Creditor Svcs",  data: [432,  440,  438,  428,  435,  442],  target: 460,  color: "#f59e0b" },
  { name: "MVL",            data: [398,  406,  400,  395,  402,  415],  target: 430,  color: "#f43f5e" },
  { name: "Other",          data: [895, 1006, 1109, 1051,  973,  915],  target: 1000, color: "#94a3b8" },
];

function ServiceLineDeepSection() {
  const [view, setView]           = useState<"table" | "stacked" | "trend" | "mix" | "leaderboard">("table");
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const totalPerMonth = slMonths.map((_, mi) => slLines.reduce((s, l) => s + l.data[mi], 0));

  // Trend data: one object per month with each service line as a key
  const trendData = slMonths.map((m, mi) => {
    const row: Record<string, string | number> = { month: m };
    slLines.forEach(sl => { row[sl.name] = sl.data[mi]; });
    return row;
  });

  // Donut mix data for Mar 25
  const mixData   = slLines.map(sl => ({ name: sl.name, value: sl.data[5], color: sl.color }));
  const totalMar  = slLines.reduce((s, l) => s + l.data[5], 0);

  // Monthly momentum matrix (MoM % changes Nov–Mar)
  const momMonths = slMonths.slice(1);
  const momMatrix = slLines.map(sl => ({
    name: sl.name, color: sl.color,
    moms: slMonths.slice(1).map((_, i) => (sl.data[i + 1] - sl.data[i]) / sl.data[i] * 100),
  }));

  function momColor(v: number) {
    if (v >= 2)    return "bg-emerald-500/80 dark:bg-emerald-500/70 text-white";
    if (v >= 0)    return "bg-emerald-200/70 dark:bg-emerald-500/25 text-emerald-800 dark:text-emerald-200";
    if (v >= -2)   return "bg-amber-200/70 dark:bg-amber-500/25 text-amber-800 dark:text-amber-200";
    return "bg-rose-200/70 dark:bg-rose-500/25 text-rose-800 dark:text-rose-200";
  }

  return (
    <div className="space-y-5">

      {/* Summary KPI strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Top line — CVL",     value: "£1.42M",       sub: "+2.5% MoM · 25.6% of revenue",            color: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-500/20", bg: "bg-indigo-50 dark:bg-white/[0.025]"  },
          { label: "Fastest growth",     value: "Restructuring", sub: "+2.8% MoM · trend 625→658 in 6 months",  color: "text-cyan-700 dark:text-cyan-300",     border: "border-cyan-200 dark:border-cyan-500/20",     bg: "bg-cyan-50 dark:bg-white/[0.025]"    },
          { label: "Concentration risk", value: "CVL + Admin",   sub: "48% of total revenue — sector exposure",  color: "text-rose-700 dark:text-rose-400",     border: "border-rose-200 dark:border-rose-500/20",     bg: "bg-rose-50 dark:bg-white/[0.025]"    },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-2">{s.label}</p>
            <p className={`text-xl font-bold font-mono tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main view card — 4 tabs */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">Revenue by service line</h2>
            <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">Oct 2024 – Mar 2025 · £000</p>
          </div>
          <div className="flex rounded-xl border border-slate-200 dark:border-white/[0.08] overflow-hidden text-[11px] font-semibold">
            {(["table", "stacked", "trend", "mix", "leaderboard"] as const).map(v => (
              <button key={v} onClick={() => { setView(v); setActiveLine(null); }}
                className={`px-3 py-1.5 transition-colors capitalize ${view === v ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/[0.04]"}`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        {view === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                  <th className="text-left pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 w-32">Service Line</th>
                  {slMonths.map(m => <th key={m} className="text-right pb-3 pr-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">{m}</th>)}
                  <th className="text-right pb-3 pr-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">MoM %</th>
                  <th className="text-right pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">Share</th>
                  <th className="text-right pb-3 pl-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">Trend</th>
                </tr>
              </thead>
              <tbody>
                {slLines.map((sl, i) => {
                  const mom       = (((sl.data[5] - sl.data[4]) / sl.data[4]) * 100).toFixed(1);
                  const share     = ((sl.data[5] / totalPerMonth[5]) * 100).toFixed(1);
                  const momNum    = parseFloat(mom);
                  const sixDelta  = sl.data[5] - sl.data[0];
                  const trendDir  = sixDelta > 20 ? "Growing" : sixDelta < -20 ? "Declining" : "Flat";
                  const trendCls  = trendDir === "Growing" ? "text-emerald-600 dark:text-emerald-400" : trendDir === "Declining" ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-white/40";
                  return (
                    <tr key={i} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                      <td className="py-2.5 font-semibold text-slate-800 dark:text-white/80">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm shrink-0" style={{ background: sl.color }} />{sl.name}</span>
                      </td>
                      {sl.data.map((v, mi) => (
                        <td key={mi} className="py-2.5 text-right pr-2 font-mono tabular-nums text-slate-600 dark:text-white/60">{v}</td>
                      ))}
                      <td className={`py-2.5 text-right pr-2 font-mono font-semibold tabular-nums ${momNum >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {momNum >= 0 ? "+" : ""}{mom}%
                      </td>
                      <td className="py-2.5 text-right pr-2 font-mono tabular-nums text-slate-500 dark:text-white/40">{share}%</td>
                      <td className={`py-2.5 text-right pl-3 text-[10px] font-semibold ${trendCls}`}>{trendDir}</td>
                    </tr>
                  );
                })}
                <tr className="bg-slate-50 dark:bg-white/[0.02] font-semibold">
                  <td className="py-2.5 text-slate-900 dark:text-white">Total</td>
                  {totalPerMonth.map((t, mi) => (
                    <td key={mi} className="py-2.5 text-right pr-2 font-mono tabular-nums text-slate-900 dark:text-white">{t}</td>
                  ))}
                  <td className="py-2.5 text-right pr-2 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    +{(((totalPerMonth[5] - totalPerMonth[4]) / totalPerMonth[4]) * 100).toFixed(1)}%
                  </td>
                  <td className="py-2.5 text-right pr-2 text-slate-400 dark:text-white/30">100%</td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* STACKED BAR */}
        {view === "stacked" && (
          <>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={serviceLineMonthly} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v/1000).toFixed(1)}M`} width={52} />
                <Tooltip content={<ChartTooltip formatter={v => `£${v}k`} />} />
                <Bar dataKey="CVL"          stackId="a" fill="#6366f1" name="CVL" />
                <Bar dataKey="Admin"        stackId="a" fill="#8b5cf6" name="Administration" />
                <Bar dataKey="Restructuring" stackId="a" fill="#06b6d4" name="Restructuring" />
                <Bar dataKey="LPA"          stackId="a" fill="#10b981" name="LPA" />
                <Bar dataKey="Creditor"     stackId="a" fill="#f59e0b" name="Creditor" />
                <Bar dataKey="MVL"          stackId="a" fill="#f43f5e" name="MVL" />
                <Bar dataKey="Other"        stackId="a" fill="#94a3b8" name="Other" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.05]">
              {slLines.map(sl => (
                <span key={sl.name} className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-white/35">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: sl.color }} />{sl.name}
                </span>
              ))}
            </div>
          </>
        )}

        {/* TREND LINES — click legend to focus */}
        {view === "trend" && (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {slLines.map(sl => (
                <button
                  key={sl.name}
                  onClick={() => setActiveLine(activeLine === sl.name ? null : sl.name)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all ${
                    activeLine === sl.name
                      ? "text-white border-transparent shadow-sm"
                      : activeLine
                        ? "text-slate-400 dark:text-white/25 border-slate-200 dark:border-white/[0.07]"
                        : "text-slate-600 dark:text-white/60 border-slate-200 dark:border-white/[0.07] hover:border-slate-300 dark:hover:border-white/15 bg-white dark:bg-transparent"
                  }`}
                  style={activeLine === sl.name ? { background: sl.color, borderColor: sl.color } : {}}
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: activeLine === sl.name ? "rgba(255,255,255,0.8)" : sl.color }} />
                  {sl.name}
                </button>
              ))}
              {activeLine && (
                <button onClick={() => setActiveLine(null)} className="text-[11px] text-slate-400 dark:text-white/25 hover:text-slate-600 dark:hover:text-white/50 px-2 transition-colors">
                  Clear
                </button>
              )}
            </div>
            <p className="text-[10px] text-slate-400 dark:text-white/25 mb-3">Click a line to focus · hover for values</p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${v}k`} width={52} />
                <Tooltip content={<ChartTooltip formatter={v => `£${v}k`} />} />
                {slLines.map(sl => (
                  <Line
                    key={sl.name}
                    dataKey={sl.name}
                    stroke={sl.color}
                    strokeWidth={activeLine === sl.name ? 3 : activeLine ? 1 : 2}
                    strokeOpacity={activeLine && activeLine !== sl.name ? 0.18 : 1}
                    dot={activeLine === sl.name ? { fill: sl.color, r: 4, strokeWidth: 0 } : false as any}
                    activeDot={activeLine && activeLine !== sl.name ? false as any : { r: 5, fill: sl.color, strokeWidth: 0 }}
                    name={sl.name}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </>
        )}

        {/* MIX — donut + share bars */}
        {view === "mix" && (
          <div className="grid grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-3 text-center">Mar 25 revenue mix</p>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={mixData}
                    cx="50%" cy="50%"
                    innerRadius={65} outerRadius={105}
                    paddingAngle={2}
                    dataKey="value"
                    onClick={(_, index) => setActiveLine(mixData[index].name === activeLine ? null : mixData[index].name)}
                    style={{ cursor: "pointer" }}
                  >
                    {mixData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={entry.color}
                        fillOpacity={activeLine === entry.name ? 1 : activeLine ? 0.22 : 0.85}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip formatter={v => `£${(Number(v)/1000).toFixed(2)}M`} />} />
                </PieChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-slate-400 dark:text-white/25 text-center mt-1">Click a segment to highlight</p>
            </div>
            <div className="space-y-1.5">
              {mixData.map(d => {
                const pct = (d.value / totalMar * 100).toFixed(1);
                const isActive = activeLine === d.name;
                return (
                  <button
                    key={d.name}
                    onClick={() => setActiveLine(activeLine === d.name ? null : d.name)}
                    className="w-full text-left p-2.5 rounded-xl border transition-all"
                    style={isActive
                      ? { borderColor: d.color + "50", background: d.color + "12" }
                      : { borderColor: "transparent" }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-white/70 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                        {d.name}
                      </span>
                      <span className="text-[11px] font-bold font-mono text-slate-800 dark:text-white/80 tabular-nums">{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.08]">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: d.color }} />
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-white/25 mt-1 tabular-nums font-mono">£{(d.value/1000).toFixed(2)}M</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* LEADERBOARD */}
        {view === "leaderboard" && (
          <div className="space-y-2">
            {[...slLines]
              .sort((a, b) => b.data[5] - a.data[5])
              .map((sl, rank) => {
                const mom = ((sl.data[5] - sl.data[4]) / sl.data[4] * 100);
                const sixTotal = sl.data.reduce((s, v) => s + v, 0);
                const share = (sl.data[5] / slLines.reduce((s, l) => s + l.data[5], 0) * 100);
                const vsTarget = sl.data[5] - sl.target;
                return (
                  <div key={sl.name} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm" style={{ background: sl.color + "22", color: sl.color }}>
                      {rank + 1}
                    </div>
                    <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: sl.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white/90">{sl.name}</p>
                      <p className="text-[10px] text-slate-400 dark:text-white/30">{share.toFixed(1)}% of revenue</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold font-mono tabular-nums text-slate-900 dark:text-white">£{(sl.data[5]/1000).toFixed(2)}M</p>
                      <p className="text-[10px] text-slate-400 dark:text-white/30">Mar 25</p>
                    </div>
                    <div className="text-right shrink-0 w-16">
                      <p className={`text-xs font-bold font-mono tabular-nums ${mom >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{mom >= 0 ? "+" : ""}{mom.toFixed(1)}%</p>
                      <p className="text-[10px] text-slate-400 dark:text-white/30">MoM</p>
                    </div>
                    <div className="text-right shrink-0 w-16">
                      <p className={`text-xs font-bold font-mono tabular-nums ${vsTarget >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{vsTarget >= 0 ? "+" : ""}£{Math.abs(vsTarget)}k</p>
                      <p className="text-[10px] text-slate-400 dark:text-white/30">vs target</p>
                    </div>
                    <div className="text-right shrink-0 w-20">
                      <p className="text-xs font-mono tabular-nums text-slate-500 dark:text-white/40">£{(sixTotal/1000).toFixed(1)}M</p>
                      <p className="text-[10px] text-slate-400 dark:text-white/30">6M total</p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </Card>

      {/* vs Target — bullet chart */}
      <Card>
        <SectionHeader title="Performance vs target" sub="Mar 25 actual as % of 6-month run-rate target · gap in £000" />
        <div className="space-y-3.5 mt-1">
          {slLines.map(sl => {
            const pct = sl.data[5] / sl.target * 100;
            const gap = sl.data[5] - sl.target;
            const over = gap >= 0;
            return (
              <div key={sl.name} className="flex items-center gap-4">
                <div className="w-28 shrink-0 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: sl.color }} />
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-white/70 truncate">{sl.name}</span>
                </div>
                <div className="flex-1 relative h-5 rounded-lg bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
                  <div
                    className="h-full rounded-lg transition-all duration-700"
                    style={{ width: `${Math.min(pct, 100)}%`, background: sl.color, opacity: over ? 0.9 : 0.65 }}
                  />
                </div>
                <div className="w-12 text-right shrink-0">
                  <span className="text-[11px] font-bold font-mono tabular-nums text-slate-700 dark:text-white/70">{pct.toFixed(0)}%</span>
                </div>
                <div className="w-20 text-right shrink-0">
                  <span className={`text-[11px] font-semibold font-mono tabular-nums ${over ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {over ? "+" : ""}£{Math.abs(gap)}k
                  </span>
                </div>
                <div className="w-16 text-right shrink-0">
                  <span className="text-[10px] text-slate-400 dark:text-white/25 font-mono">tgt £{sl.target}k</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.05] flex items-center gap-3 text-[11px] text-slate-400 dark:text-white/25">
          <div className="flex items-center gap-1.5"><span className="inline-block w-8 h-2.5 rounded bg-indigo-400 opacity-70" />Full colour = above target</div>
          <div className="flex items-center gap-1.5"><span className="inline-block w-8 h-2.5 rounded bg-rose-400 opacity-50" />Faded = below target</div>
          <span className="ml-auto">All lines currently tracking below 6-month targets · CVL largest absolute gap at –£80k</span>
        </div>
      </Card>

      {/* Monthly momentum heatmap */}
      <Card>
        <SectionHeader title="Monthly momentum" sub="MoM % change by service line · Nov 2024 – Mar 2025" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 w-36">Service Line</th>
                {momMonths.map(m => (
                  <th key={m} className="text-center pb-3 px-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">{m}</th>
                ))}
                <th className="text-right pb-3 pl-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">6m Δ</th>
              </tr>
            </thead>
            <tbody>
              {momMatrix.map((row, i) => {
                const sixM = (slLines[i].data[5] - slLines[i].data[0]) / slLines[i].data[0] * 100;
                return (
                  <tr key={i} className={i < momMatrix.length - 1 ? "border-b border-slate-100 dark:border-white/[0.04]" : ""}>
                    <td className="py-2.5 pr-4">
                      <span className="text-[12px] font-semibold text-slate-800 dark:text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: row.color }} />
                        {row.name}
                      </span>
                    </td>
                    {row.moms.map((v, mi) => (
                      <td key={mi} className="py-2.5 px-1">
                        <div className={`rounded-lg py-1.5 text-center font-mono font-semibold text-[10px] ${momColor(v)}`}>
                          {v >= 0 ? "+" : ""}{v.toFixed(1)}%
                        </div>
                      </td>
                    ))}
                    <td className="py-2.5 pl-4 text-right">
                      <span className={`text-[11px] font-bold font-mono tabular-nums ${sixM >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {sixM >= 0 ? "+" : ""}{sixM.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.05] flex flex-wrap items-center gap-4 text-[10px] text-slate-400 dark:text-white/25">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500/80" />≥ +2%</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-200/70 dark:bg-emerald-500/25" />0 – 2%</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-200/70 dark:bg-amber-500/25" />–2 – 0%</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-200/70 dark:bg-rose-500/25" />Below –2%</span>
        </div>
      </Card>

      {/* Insights */}
      <Card>
        <SectionHeader title="Service line insights" sub="System-generated · March 2025" badge="3 insights" />
        <div className="space-y-2.5">
          <Signal type="alert"   title="CVL + Administration = 48% of revenue — concentration risk"
            detail="CVL £1.42M (25.6%) + Admin £1.21M (21.8%) = £2.63M. Both lines are insolvency-cycle sensitive. An economic shift reducing insolvency volumes would directly pressure 48% of the book." />
          <Signal type="info"    title="Restructuring Advisory growing — 6-month trend £625k → £658k (+5.3%)"
            detail="Steady growth driven by corporate distress advisory demand. Now £658k in Mar, running ahead of the other mid-tier lines. Capacity should be protected to capitalise on market tailwinds." />
          <Signal type="warning" title="Other revenue declined £158k MoM (–16.2%) — largest monthly swing"
            detail="Other services fell from £973k in Feb to £915k in Mar. This line includes ad hoc engagements and is volatile. Needs categorisation to understand if this is timing or structural decline." />
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FINANCIAL MOVEMENTS SECTION
───────────────────────────────────────────── */

const movementsData = [
  { item: "Revenue",          curr: 10570, prev: 10510, why: "Modest £60k uplift MoM; CVL volume soft — 3rd consecutive miss vs £11.09M budget." },
  { item: "Cost of Sales",    curr: 4143,  prev: 4151,  why: "Marginal £8k reduction in direct case costs — slight improvement in fee earner leverage." },
  { item: "Staff Costs",      curr: 2810,  prev: 2830,  why: "£20k reduction from lower overtime and deferred hirings; headcount flat at 724." },
  { item: "Contractor Costs", curr: 420,   prev: 468,   why: "£48k reduction as 2 fixed-term contractors rolled off in mid-February, not replaced." },
  { item: "Technology / Software", curr: 220, prev: 218, why: "Marginal £2k increase from annual licence renewal; no new tooling added." },
  { item: "Premises & Overhead", curr: 580, prev: 591,  why: "£11k saving from energy tariff renegotiation effective March." },
  { item: "Professional Fees", curr: 312,  prev: 295,   why: "+£17k increase from external legal advice on a complex administration case." },
  { item: "Accounts Receivable", curr: 89180, prev: 86380, why: "+£2.8M increase — new billings exceeding collections; 91+ bucket growing." },
  { item: "Accounts Payable", curr: 4810,  prev: 4920,  why: "–£110k reduction from early settlement of November supplier invoices." },
  { item: "Cash",             curr: 3950,  prev: 3810,  why: "+£140k net cash improvement — net profit conversion partially offset by AR growth." },
];

function FinancialMovementsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-5">
      <Card>
        <SectionHeader title="Key financial movements" sub="Mar 25 vs Feb 25 · with driver explanation · £000" />
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                {["Line Item", "Mar 25", "Feb 25", "Change £", "Change %", "Why it changed"].map(h => (
                  <th key={h} className={`pb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 ${h === "Line Item" ? "text-left w-36" : h === "Why it changed" ? "text-left pl-4" : "text-right pr-4"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {movementsData.map((row, i) => {
                const delta = row.curr - row.prev;
                const pct = ((delta / row.prev) * 100).toFixed(1);
                const isAsset = ["Accounts Receivable","Cash"].includes(row.item);
                const isCost = ["Cost of Sales","Staff Costs","Contractor Costs","Technology / Software","Premises & Overhead","Professional Fees","Accounts Payable"].includes(row.item);
                const good = isAsset ? (row.item === "Cash" ? delta >= 0 : delta <= 0) : isCost ? delta <= 0 : delta >= 0;
                return (
                  <tr key={i} className="border-b border-slate-100 dark:border-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                    <td className="py-2.5 font-semibold text-slate-800 dark:text-white/80">{row.item}</td>
                    <td className="py-2.5 text-right pr-4 font-mono tabular-nums text-slate-700 dark:text-white/70">{(row.curr/1000).toFixed(0)}</td>
                    <td className="py-2.5 text-right pr-4 font-mono tabular-nums text-slate-400 dark:text-white/30">{(row.prev/1000).toFixed(0)}</td>
                    <td className={`py-2.5 text-right pr-4 font-mono tabular-nums font-semibold ${good ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {delta >= 0 ? "+" : ""}{(delta/1000).toFixed(0)}
                    </td>
                    <td className={`py-2.5 text-right pr-4 font-mono tabular-nums text-[11px] ${good ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {delta >= 0 ? "+" : ""}{pct}%
                    </td>
                    <td className="py-2.5 pl-4 text-[11px] text-slate-500 dark:text-white/40 leading-snug max-w-xs">{row.why}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Driver Breakdown — 3 key movements */}
      <Card>
        <SectionHeader title="Driver breakdown" sub="3 key movements — deeper analysis" badge="Deep" />
        <div className="space-y-5">

          {/* Revenue breakdown */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">Revenue — by service line and volume vs pricing</p>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
                <p className="text-[10px] font-semibold text-slate-400 dark:text-white/30 uppercase tracking-widest mb-2">Volume effect</p>
                <p className="text-[13px] font-semibold text-slate-800 dark:text-white/80">+£42k (+0.4%)</p>
                <p className="text-[11px] text-slate-500 dark:text-white/40 mt-1">2 additional CVL cases filed in late Feb billed in Mar. Administration completions +3 cases.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
                <p className="text-[10px] font-semibold text-slate-400 dark:text-white/30 uppercase tracking-widest mb-2">Rate / pricing effect</p>
                <p className="text-[13px] font-semibold text-slate-800 dark:text-white/80">+£18k (+0.2%)</p>
                <p className="text-[11px] text-slate-500 dark:text-white/40 mt-1">Marginal rate improvement in Restructuring Advisory — renegotiated 2 retainers at 4% above prior rate.</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b border-slate-100 dark:border-white/[0.06]">
                  {["Service Line","Mar","Feb","Δ £k","Δ %","Driver"].map(h => <th key={h} className={`pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 ${h==="Service Line"?"text-left":"text-right pr-3"} ${h==="Driver"?"text-left pl-3 pr-0":""}`}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {[
                    ["CVL",           1420, 1385, "+2.5%", "2 additional case filings"],
                    ["Administration",1210, 1180, "+2.5%", "3 additional completions"],
                    ["Restructuring", 658,  640,  "+2.8%", "Rate uplift on 2 retainers"],
                    ["Other",         915,  973,  "–6.0%", "Ad hoc engagement timing gap"],
                  ].map(([name, curr, prev, pct, driver], i) => {
                    const d = (curr as number) - (prev as number);
                    return (
                      <tr key={i} className="border-b border-slate-100 dark:border-white/[0.04]">
                        <td className="py-2 font-semibold text-slate-700 dark:text-white/70">{name}</td>
                        <td className="py-2 text-right pr-3 font-mono">{curr}</td>
                        <td className="py-2 text-right pr-3 font-mono text-slate-400 dark:text-white/30">{prev}</td>
                        <td className={`py-2 text-right pr-3 font-mono font-semibold ${d>=0?"text-emerald-600 dark:text-emerald-400":"text-rose-600 dark:text-rose-400"}`}>{d>=0?"+":""}{d}</td>
                        <td className={`py-2 text-right pr-3 font-mono text-[10px] ${d>=0?"text-emerald-600 dark:text-emerald-400":"text-rose-600 dark:text-rose-400"}`}>{pct}</td>
                        <td className="py-2 text-left pl-3 text-slate-500 dark:text-white/40">{driver}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-white/[0.05]" />

          {/* Staff + contractor costs breakdown */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">Staff + Contractor Costs — by type (£68k total saving)</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Salary (fixed)",     curr: 2390, prev: 2390, note: "Unchanged — no new hires or leavers in March" },
                { label: "Overtime / Flex",    curr: 420,  prev: 440,  note: "–£20k: lower weekend working vs Feb deadlines" },
                { label: "Contractors",        curr: 420,  prev: 468,  note: "–£48k: 2 FTCs rolled off, not replaced" },
              ].map((r, i) => {
                const d = r.curr - r.prev;
                return (
                  <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
                    <p className="text-[10px] font-semibold text-slate-400 dark:text-white/30 uppercase tracking-widest mb-1.5">{r.label}</p>
                    <p className="text-[13px] font-bold font-mono text-slate-900 dark:text-white">£{(r.curr/1000).toFixed(0)}k</p>
                    <p className={`text-[11px] font-semibold mt-0.5 ${d<=0?"text-emerald-600 dark:text-emerald-400":"text-rose-600 dark:text-rose-400"}`}>
                      {d<=0?"":"+"}{d===0?"–":d}k
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1 leading-snug">{r.note}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-white/[0.05]" />

          {/* AR breakdown */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-3">Accounts Receivable +£2.8M — by aging bucket</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "0–30 days",   curr: 3290, prev: 3180, note: "Normal billing cycle — current month invoices" },
                { label: "31–90 days",  curr: 5300, prev: 5590, note: "–£290k: some mid-range debts collected" },
                { label: "91+ days",    curr: 80590,prev: 77610,note: "+£2.98M: insolvency cases extending — intervention required" },
              ].map((r, i) => {
                const d = r.curr - r.prev;
                const bad = d > 0 && i === 2;
                return (
                  <div key={i} className={`p-3.5 rounded-xl border ${i===2?"border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/[0.05]":"border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]"}`}>
                    <p className="text-[10px] font-semibold text-slate-400 dark:text-white/30 uppercase tracking-widest mb-1.5">{r.label}</p>
                    <p className={`text-[13px] font-bold font-mono ${i===2?"text-rose-700 dark:text-rose-300":"text-slate-900 dark:text-white"}`}>£{(r.curr/1000).toFixed(1)}M</p>
                    <p className={`text-[11px] font-semibold mt-0.5 ${bad?"text-rose-600 dark:text-rose-400":d<=0?"text-emerald-600 dark:text-emerald-400":"text-amber-600 dark:text-amber-400"}`}>
                      {d>=0?"+":""}{(d/1000).toFixed(1)}M
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1 leading-snug">{r.note}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INSIGHTS SECTION (EXACTLY 5)
───────────────────────────────────────────── */

function InsightsSection() {
  const insights = [
    {
      num: "01", type: "critical" as const,
      title: "Collections crisis: £80.6M stuck in 91+ days — cash conversion at structural risk",
      cause: "Insolvency case cycles extend collection timescales, but 90.4% of the debtor book aged beyond 91 days is structural, not cyclical. AR grew +£2.8M in March alone with no offsetting collection acceleration.",
      impact: "At current trajectory, total lockup reaches £135M+ by June 2025. Each additional month of 91+ growth at this rate costs approximately £3M in working capital availability, constraining the firm's ability to invest in growth or service debt.",
    },
    {
      num: "02", type: "warning" as const,
      title: "Revenue £1.4M below YTD budget — CVL volume the single biggest risk",
      cause: "CVL intake has been soft for 3 consecutive months. Budget assumed £1.6M/month from CVL; actual is averaging £1.38M. The shortfall of £220k/month is consistent, not one-off, suggesting demand or pipeline conversion is underperforming.",
      impact: "If CVL run rate doesn't recover to budget levels by Q2 FY26, the full-year revenue miss will widen to an estimated £2.4–2.8M. EBITDA impact at current margins: approximately £500–600k below full-year target.",
    },
    {
      num: "03", type: "positive" as const,
      title: "Operating margin hit 20.9% — 3-month recovery trend is real and accelerating",
      cause: "Total opex fell £61k MoM (staff –£20k, contractors –£48k, premises –£11k) against flat revenue. This is cost discipline, not revenue mix. The 18.5% → 19.8% → 20.9% trend represents 2.4pp recovery in 3 months.",
      impact: "If this margin trajectory holds, the firm is on track to reach the 22.0% target by May 2025. Each additional percentage point of operating margin at current revenue = approximately £106k/month of EBITDA improvement.",
    },
    {
      num: "04", type: "positive" as const,
      title: "WIP declining to £39.1M — operational billing pipeline is healthy",
      cause: "WIP fell from £47.4M (Nov peak) to £39.1M in March — a £8.3M reduction in 4 months. Cases are progressing to billing stage. The conversion pipeline is functioning correctly.",
      impact: "If the remaining £39.1M WIP converts at the historical rate, it would add approximately £13M of revenue over the next 90 days. The operational process is not the bottleneck — collections is the constraint on cash conversion.",
    },
    {
      num: "05", type: "warning" as const,
      title: "Contractor cost reduction saves £48k but creates capacity risk heading into Q2",
      cause: "Two fixed-term contractors rolled off in February and were not replaced. Combined saving: £48k/month. However, these contractors supported case administration in CVL and Administration service lines — the two highest-revenue lines.",
      impact: "If CVL and Administration case volumes increase (as expected with insolvency market conditions), the firm may face a capacity constraint by May–June 2025. A hire decision made now would take 6–8 weeks to operationalise — the window is closing.",
    },
  ];

  const typeCfg = {
    critical: { bar: "bg-rose-500",    badge: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/25",    label: "Critical"  },
    warning:  { bar: "bg-amber-400",   badge: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/25",  label: "Watch"     },
    positive: { bar: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/25", label: "Positive" },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">Key financial insights</h2>
          <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">System-generated · March 2025 · cause + impact analysis</p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest border px-2.5 py-1 rounded-full text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/10">5 insights</span>
      </div>

      {insights.map((ins, i) => {
        const cfg = typeCfg[ins.type];
        return (
          <div key={i} className="rounded-2xl border border-slate-200 dark:border-white/[0.09] bg-white dark:bg-[#0b0b17] shadow-sm dark:shadow-none overflow-hidden">
            <div className={`h-[3px] ${cfg.bar}`} />
            <div className="p-5">
              <div className="flex items-start gap-4">
                <span className="text-[1.8rem] font-black text-slate-100 dark:text-white/10 leading-none font-mono shrink-0 select-none">{ins.num}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    <p className="font-semibold text-[13.5px] text-slate-900 dark:text-white leading-snug flex-1">{ins.title}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0 ${cfg.badge}`}>{cfg.label}</span>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.025] border border-slate-100 dark:border-white/[0.05]">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-1.5">Cause — Why it happened</p>
                      <p className="text-[11.5px] text-slate-600 dark:text-white/60 leading-relaxed">{ins.cause}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.025] border border-slate-100 dark:border-white/[0.05]">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-1.5">Impact — What it means</p>
                      <p className="text-[11.5px] text-slate-600 dark:text-white/60 leading-relaxed">{ins.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PLSection() {
  const [view, setView] = useState<"table" | "trend">("table");
  const isIncome = (label: string) => ["Revenue", "Gross Profit", "EBITDA", "Net Profit"].includes(label);

  return (
    <div className="space-y-5">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Revenue",      value: "£10.57M", vs: "–4.6% vs budget", sub: "£520k miss · CVL softness",    color: "text-rose-700 dark:text-rose-400",     border: "border-rose-200 dark:border-rose-500/20",     bg: "bg-rose-50 dark:bg-white/[0.025]"    },
          { label: "Gross Profit", value: "£6.43M",  vs: "+£68k vs Feb",     sub: "60.8% margin",                 color: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-500/20", bg: "bg-indigo-50 dark:bg-white/[0.025]"  },
          { label: "EBITDA",       value: "£2.34M",  vs: "+£129k vs Feb",    sub: "22.1% margin · 12-month best", color: "text-emerald-700 dark:text-emerald-300",border: "border-emerald-200 dark:border-emerald-500/20",bg: "bg-emerald-50 dark:bg-white/[0.025]"},
          { label: "Net Profit",   value: "£1.79M",  vs: "+£110k vs Feb",    sub: "16.9% net margin",             color: "text-violet-700 dark:text-violet-300", border: "border-violet-200 dark:border-violet-500/20", bg: "bg-violet-50 dark:bg-white/[0.025]"  },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-2">{s.label}</p>
            <p className={`text-2xl font-bold font-mono tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-[11px] font-semibold text-slate-600 dark:text-white/50 mt-1">{s.vs}</p>
            <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* View toggle + P&L table */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">P&L statement</h2>
            <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">Mar 25 vs Feb 25 vs budget · all figures £000</p>
          </div>
          <div className="flex rounded-xl border border-slate-200 dark:border-white/[0.08] overflow-hidden text-[11px] font-semibold">
            {(["table", "trend"] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 transition-colors ${view === v ? "bg-indigo-600 text-white" : "text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/[0.04]"}`}>
                {v === "table" ? "Table" : "Trend"}
              </button>
            ))}
          </div>
        </div>

        {view === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/[0.06]">
                  <th className="text-left text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 pb-3 w-48">Line item</th>
                  <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 pb-3 pr-4">Mar 25</th>
                  <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 pb-3 pr-4">Feb 25</th>
                  <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 pb-3 pr-4">Var £</th>
                  <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 pb-3 pr-4">Var %</th>
                  <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 pb-3">Budget</th>
                </tr>
              </thead>
              <tbody>
                {plDetail.map((row, i) => {
                  const varAmt = row.curr - row.prev;
                  const varPct = ((varAmt / row.prev) * 100).toFixed(1);
                  const budgetVar = row.curr - row.budget;
                  const goodVar = isIncome(row.label) ? varAmt >= 0 : varAmt <= 0;
                  const isHighlight = row.isSubtotal || row.isTotal;
                  return (
                    <tr key={i} className={`border-b border-slate-100 dark:border-white/[0.04] ${isHighlight ? "bg-slate-50 dark:bg-white/[0.02]" : ""}`}>
                      <td className={`py-2.5 ${row.indent === 1 ? "pl-4" : ""}`}>
                        <span className={`${isHighlight ? "font-semibold text-slate-900 dark:text-white" : "text-slate-600 dark:text-white/60"} ${row.isTotal ? "text-[13px]" : ""}`}>
                          {row.label}
                        </span>
                      </td>
                      <td className={`py-2.5 text-right pr-4 font-mono tabular-nums ${isHighlight ? "font-semibold text-slate-900 dark:text-white" : "text-slate-700 dark:text-white/70"}`}>
                        {(row.curr / 1000).toFixed(0)}
                      </td>
                      <td className="py-2.5 text-right pr-4 font-mono tabular-nums text-slate-400 dark:text-white/30">
                        {(row.prev / 1000).toFixed(0)}
                      </td>
                      <td className={`py-2.5 text-right pr-4 font-mono tabular-nums font-semibold ${goodVar ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {varAmt >= 0 ? "+" : ""}{(varAmt / 1000).toFixed(0)}
                      </td>
                      <td className={`py-2.5 text-right pr-4 font-mono tabular-nums text-[11px] ${goodVar ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {varAmt >= 0 ? "+" : ""}{varPct}%
                      </td>
                      <td className={`py-2.5 text-right font-mono tabular-nums text-[11px] ${budgetVar >= 0 && isIncome(row.label) ? "text-emerald-600 dark:text-emerald-400" : budgetVar < 0 && isIncome(row.label) ? "text-rose-600 dark:text-rose-400" : "text-slate-400 dark:text-white/30"}`}>
                        {(row.budget / 1000).toFixed(0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {view === "trend" && (
          <div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={plData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={52} />
                <Tooltip content={<ChartTooltip formatter={v => `£${(v / 1000).toFixed(2)}M`} />} />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={false} name="Revenue" />
                <Line type="monotone" dataKey="gp"      stroke="#10b981" strokeWidth={2} dot={false} name="Gross Profit" />
                <Line type="monotone" dataKey="ebitda"  stroke="#f59e0b" strokeWidth={2} dot={false} name="EBITDA" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-5 pt-3 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-white/35">
              <span className="flex items-center gap-1.5"><span className="w-3 h-[2px] bg-indigo-500 rounded" />Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-[2px] bg-emerald-500 rounded" />Gross Profit</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-[2px] bg-amber-500 rounded" />EBITDA</span>
            </div>
          </div>
        )}
      </Card>

      {/* Service line monthly — stacked bar */}
      <Card>
        <SectionHeader title="Revenue by service line" sub="Monthly breakdown Oct 2024 – Mar 2025 · £000" badge="6 lines" />
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={serviceLineMonthly} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
            <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={52} />
            <Tooltip content={<ChartTooltip formatter={v => `£${v}k`} />} />
            <Bar dataKey="CVL"          stackId="a" fill="#6366f1" name="CVL"           radius={[0,0,0,0]} />
            <Bar dataKey="Admin"        stackId="a" fill="#8b5cf6" name="Administration" />
            <Bar dataKey="Restructuring"stackId="a" fill="#06b6d4" name="Restructuring"  />
            <Bar dataKey="LPA"          stackId="a" fill="#10b981" name="LPA"            />
            <Bar dataKey="Creditor"     stackId="a" fill="#f59e0b" name="Creditor Svcs"  />
            <Bar dataKey="MVL"          stackId="a" fill="#f43f5e" name="MVL"            />
            <Bar dataKey="Other"        stackId="a" fill="#94a3b8" name="Other"          radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3 border-t border-slate-100 dark:border-white/[0.05] text-[10px] text-slate-500 dark:text-white/35">
          {[["CVL","#6366f1"],["Admin","#8b5cf6"],["Restructuring","#06b6d4"],["LPA","#10b981"],["Creditor","#f59e0b"],["MVL","#f43f5e"],["Other","#94a3b8"]].map(([n,c]) => (
            <span key={n} className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm shrink-0" style={{background:c}} />{n}</span>
          ))}
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">CVL + Admin = 48% of revenue · Restructuring growing +5% MoM</span>
        </div>
      </Card>

      {/* Insights */}
      <Card>
        <SectionHeader title="P&L insights" sub="System-generated · March 2025" badge="System" />
        <div className="space-y-2.5">
          <Signal type="info"    title="EBITDA 22.1% — cost discipline driving margin recovery"   detail="Total opex down £61k MoM despite revenue growth. Staff costs reduced £20k. Other opex fell £49k. Margin now above 20% baseline." />
          <Signal type="alert"   title="Revenue –4.6% vs budget — CVL volume the driver"          detail="Third consecutive miss. YTD shortfall £1.4M. CVL at £1.42M this month — tracking below the £1.6M monthly run rate implied by budget." />
          <Signal type="info"    title="Net profit £1.79M — strongest month since Oct 24"         detail="16.9% net margin. Revenue recovery + opex discipline = compounding effect. Full-year target achievable if revenue gap closes." />
          <Signal type="warning" title="Restructuring Advisory growing 5% MoM — monitor capacity" detail="£658k in Mar vs £620k in Jan. Strong insolvency market driving demand. Ensure fee earner capacity is aligned to growth trajectory." />
        </div>
      </Card>
    </div>
  );
}




/* ─────────────────────────────────────────────
   NAV CONFIG
───────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: "Home",                   icon: Home       },
  { label: "KPI Dashboard",          icon: BarChart2  },
  { label: "Financial Performance",  icon: TrendingUp },
  { label: "Collections & Cash",     icon: DollarSign },
  { label: "People & Capacity",      icon: Users      },
  { label: "Service Lines",          icon: Layers     },
  { label: "Key Insights",           icon: Trophy     },
  { label: "Risks & Exceptions",     icon: Zap        },
  { label: "Reports",                icon: FileText   },
];

const SECTION_HEADERS: Record<string, { title: string; sub: string }> = {
  "Home":                   { title: "BTG Advisory Group",                  sub: "CEO operating system · March 2025 · high-confidence data only"       },
  "KPI Dashboard":          { title: "KPI dashboard — March 2025",          sub: "BTG Advisory Group · 10 KPIs · filter, expand, drill down"           },
  "Financial Performance":  { title: "Financial performance",               sub: "Revenue, EBITDA, budget vs actual · multiple chart views"            },
  "Collections & Cash":     { title: "Collections & cash conversion",       sub: "Debtors aging, lockup days, WIP pipeline · 6 & 12 month forecast"   },
  "People & Capacity":      { title: "People & capacity",                   sub: "Headcount, fee earners, utilisation · heatmap & bar chart views"     },
  "Service Lines":          { title: "Service line revenue",                sub: "Monthly breakdown · growth rates · contribution % · leaderboard"     },
  "Risks & Exceptions":     { title: "Risks & exceptions",                  sub: "Critical signals · insights · action items · all system flags"       },
  "Key Insights":           { title: "Key financial insights",                sub: "5 system-generated insights · cause + impact analysis · Mar 2025"     },
  "Reports":                { title: "Financial reports",                   sub: "Export-ready · formatted for financial accounting · updated daily"   },
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const header     = SECTION_HEADERS[activeTab];
  const alertCount = 2;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05050f] text-slate-900 dark:text-white">

      {/* Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside className={`fixed left-0 top-0 h-full w-60 border-r border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#07070f] flex flex-col z-50 shadow-sm dark:shadow-none transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-5 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20 dark:shadow-indigo-500/30">
              <span className="text-[10px] font-bold text-white tracking-tight">BTG</span>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-[13px] text-slate-900 dark:text-white leading-tight tracking-tight">BTG Advisory Group</p>
              <p className="text-[10px] text-slate-400 dark:text-white/30">CEO · Mar 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 shadow-sm shadow-emerald-500/50" />
            <p className="text-[11px] text-slate-500 dark:text-white/35">Live · synced today</p>
          </div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300 dark:text-white/18">CEO operating system</p>
        </div>

        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isAlerts = item.label === "Risks & Exceptions";
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => { setActiveTab(item.label); setMobileOpen(false); }}
                className={`relative w-full text-left px-3 py-2.5 rounded-xl transition-all text-sm flex items-center justify-between gap-2 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold dark:bg-indigo-500/[0.14] dark:text-indigo-300"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/[0.05]"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-r-full bg-indigo-500 dark:bg-indigo-400" />
                )}
                <div className="flex items-center gap-2.5">
                  <item.icon size={14} className="shrink-0" />
                  {item.label}
                </div>
                {isAlerts && (
                  <span className="text-[9px] font-bold bg-rose-500 text-white rounded-full w-4 h-4 flex items-center justify-center shrink-0 shadow-sm">{alertCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-white/[0.05] space-y-3">
          {/* Data trust layer */}
          <div className="px-3 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
            <p className="text-[9px] font-semibold text-slate-400 dark:text-white/25 uppercase tracking-widest mb-1.5">Data trust</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-white/35">ERP (P&L)</span>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Today</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-white/35">CRM (Headcount)</span>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Today</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-white/35">Debtors ledger</span>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Today</span>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-white/[0.05]">
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-1.5 py-0.5 rounded-md">
                Demo data
              </span>
            </div>
          </div>
          <div className="px-3 py-3 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-500/[0.08] dark:to-violet-500/[0.04] border border-indigo-200 dark:border-indigo-500/20">
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400 mb-2">Powered by</p>
            <Image src="/logo.png" alt="Quantyx Advisory" width={120} height={30} className="object-contain dark:brightness-[1.15]" />
            <p className="text-[10px] text-indigo-600/60 dark:text-indigo-400/50 mt-1.5 font-medium">CEO Operating System · v2.0</p>
          </div>
          <Link href="/" className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white/60 transition-colors px-1">
            <ArrowLeft size={12} />Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-60">
        <header className="sticky top-0 z-30 h-[54px] border-b border-slate-200 dark:border-white/[0.07] bg-white/95 dark:bg-[#05050f]/95 backdrop-blur-md flex items-center justify-between px-6 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] dark:shadow-none">
          <div>
            <h1 className="font-semibold text-[13.5px] text-slate-900 dark:text-white tracking-tight leading-tight">{header.title}</h1>
            <p className="text-[10.5px] text-slate-400 dark:text-white/28 leading-tight mt-0.5">{header.sub} · {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/[0.06] transition-all lg:hidden"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Open menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="2" y1="4" x2="14" y2="4" /><line x1="2" y1="8" x2="14" y2="8" /><line x1="2" y1="12" x2="14" y2="12" />
              </svg>
            </button>
            <ThemeToggle />
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/[0.06] transition-all">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-[#05050f]" />
            </button>
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/[0.06] transition-all">
              <Settings size={16} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md ml-1">CEO</div>
          </div>
        </header>

        <main className="p-6 lg:p-8 max-w-[1440px]">
          {activeTab === "Home"                  && <HomeSection       onTabChange={setActiveTab} />}
          {activeTab === "KPI Dashboard"         && <OverviewSection   onTabChange={setActiveTab} />}
          {activeTab === "Financial Performance" && <FinancialSection  />}
          {activeTab === "Collections & Cash"    && <CashSection       />}
          {activeTab === "People & Capacity"     && <PeopleSection     />}
          {activeTab === "Service Lines"         && <ServiceLineDeepSection />}
          {activeTab === "Risks & Exceptions"    && <AlertsSection     onTabChange={setActiveTab} />}
          {activeTab === "Reports"               && <ReportsSection    />}
          {activeTab === "Key Insights"          && <InsightsSection />}

          <div className="flex flex-col items-center gap-2 pt-10 pb-6">
            <Image src="/logo.png" alt="Quantyx Advisory" width={96} height={24} className="object-contain opacity-40 dark:opacity-25 dark:brightness-[2]" />
            <p className="text-[11px] text-slate-400 dark:text-white/18">
              Quantyx Advisory · CEO Operating System · Demo environment · High-confidence data only.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
