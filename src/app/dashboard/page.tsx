"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine,
} from "recharts";
import {
  AlertCircle, Bell, Settings, ArrowLeft, TrendingUp, TrendingDown,
  Users, FileText, BarChart2, Zap, AlertTriangle,
  Download, DollarSign, UserCheck, Clock,
  ChevronRight, Activity, ArrowRight, Minus,
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
const bsAssets = [
  { label: "Cash & Equivalents",   curr: 3950,   prev: 3810,   group: "current" },
  { label: "Accounts Receivable",  curr: 89180,  prev: 86380,  group: "current" },
  { label: "WIP",                  curr: 39120,  prev: 40340,  group: "current" },
  { label: "Other Current Assets", curr: 2140,   prev: 2090,   group: "current" },
  { label: "Fixed Assets (net)",   curr: 4820,   prev: 4947,   group: "fixed"   },
  { label: "Total Assets",         curr: 139210, prev: 137567, group: "total"   },
];
const bsLiabilities = [
  { label: "Accounts Payable",    curr: 4810,  prev: 4920,  group: "current" },
  { label: "Accruals",            curr: 2840,  prev: 2790,  group: "current" },
  { label: "Short-term Debt",     curr: 6200,  prev: 6200,  group: "current" },
  { label: "Other Current Liab.", curr: 1820,  prev: 1780,  group: "current" },
  { label: "Long-term Debt",      curr: 12400, prev: 12610, group: "long"    },
  { label: "Total Liabilities",   curr: 28070, prev: 28300, group: "total"   },
];
const bsEquity = [
  { label: "Share Capital",     curr: 5000,   prev: 5000,   group: "equity" },
  { label: "Retained Earnings", curr: 106140, prev: 104267, group: "equity" },
  { label: "Total Equity",      curr: 111140, prev: 109267, group: "total"  },
];

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

function CommandStrip() {
  const [activePeriod, setActivePeriod] = useState<string>("Mar 25");
  const latest    = plData[plData.length - 1];
  const latestRec = recData[recData.length - 1];

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
              <span className="text-xs text-slate-400 dark:text-white/35 font-medium">March 2025</span>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse" />Live
              </span>
            </div>
            <p className="text-[13px] font-semibold text-slate-800 dark:text-white/80 leading-snug mb-1">
              Revenue growing. Margin recovering. Debtors need action.
            </p>
            <p className="text-[12px] text-slate-500 dark:text-white/40 leading-relaxed max-w-2xl">
              £{(latest.revenue / 1000).toFixed(2)}M revenue MTD at {latest.ebitdaM}% EBITDA — best margin in 12 months. £{((latestRec.debtors + wipData[wipData.length - 1].wip) / 1000).toFixed(1)}M locked in debtors and WIP. Collections is the strategic priority.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 shrink-0">
            {[
              { label: "2 critical alerts",    cls: "text-rose-700   bg-rose-100   border-rose-300   dark:text-rose-300   dark:bg-rose-500/15   dark:border-rose-500/30"    },
              { label: "Rev –4.6% vs target",  cls: "text-amber-700  bg-amber-100  border-amber-300  dark:text-amber-300  dark:bg-amber-500/15  dark:border-amber-500/30"   },
              { label: `Lockup ${latestRec.lockup}d`, cls: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20" },
              { label: `EBITDA ${latest.ebitdaM}%`,   cls: "text-emerald-700 bg-emerald-100 border-emerald-300 dark:text-emerald-300 dark:bg-emerald-500/15 dark:border-emerald-500/30" },
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
                onClick={() => setActivePeriod(p)}
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
   OVERVIEW SECTION
───────────────────────────────────────────── */

function OverviewSection({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const latest    = plData[plData.length - 1];
  const latestRec = recData[recData.length - 1];
  const latestHC  = hcData[hcData.length - 1];
  const latestFM  = financialMetrics[financialMetrics.length - 1];
  const avgUtil   = utilisationHeatmap.reduce((s, g) => s + g.Mar, 0) / utilisationHeatmap.length;

  return (
    <div className="space-y-6">
      <CommandStrip />

      {/* 10 KPI cards — 5 per row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <KpiCard
          label="Revenue MTD" value={`£${(latest.revenue / 1000).toFixed(2)}M`}
          change="–4.6% vs £11.09M target" verdict="£520k below budget — CVL softness"
          up={false} icon={DollarSign}
          color="text-rose-600 dark:text-rose-400" bg="bg-rose-100 dark:bg-rose-500/10" accent="bg-rose-500"
          sparkData={plData.slice(-6).map(d => d.revenue)}
          onDrilldown={() => onTabChange("Financial Performance")}
        />
        <KpiCard
          label="Gross Margin %" value={`${latestFM.gpM}%`}
          change="+0.3pp vs Feb" verdict="Stable above 60% for 6 months"
          up={true} icon={TrendingUp}
          color="text-violet-600 dark:text-violet-400" bg="bg-violet-100 dark:bg-violet-500/10" accent="bg-violet-500"
          sparkData={financialMetrics.map(d => d.gpM)}
          trend={financialMetrics.slice(-3).map(d => d.gpM)}
          onDrilldown={() => onTabChange("P&L Deep Dive")}
        />
        <KpiCard
          label="Operating Margin" value={`${latestFM.opMargin}%`}
          change="+1.1pp vs Feb · 6-month best" verdict="Recovery from 17.8% Dec low"
          up={true} icon={Activity}
          color="text-emerald-600 dark:text-emerald-400" bg="bg-emerald-100 dark:bg-emerald-500/10" accent="bg-emerald-500"
          sparkData={financialMetrics.map(d => d.opMargin)}
          trend={financialMetrics.slice(-3).map(d => d.opMargin)}
          onDrilldown={() => onTabChange("P&L Deep Dive")}
        />
        <KpiCard
          label="EBITDA Margin" value={`${latest.ebitdaM}%`}
          change="+1.1pp vs Feb · 12-month best" verdict="Recovery from 18.7% Jul 24 low"
          up={true} icon={BarChart2}
          color="text-indigo-600 dark:text-indigo-400" bg="bg-indigo-100 dark:bg-indigo-500/10" accent="bg-indigo-500"
          sparkData={financialMetrics.map(d => d.ebitdaM)}
          trend={financialMetrics.slice(-3).map(d => d.ebitdaM)}
          onDrilldown={() => onTabChange("Financial Performance")}
        />
        <KpiCard
          label="Net Profit" value={`£${(latestFM.netProfit / 1000).toFixed(2)}M`}
          change="+£110k vs Feb (+6.5%)" verdict="Strongest month since Oct 24"
          up={true} icon={TrendingUp}
          color="text-emerald-600 dark:text-emerald-400" bg="bg-emerald-100 dark:bg-emerald-500/10" accent="bg-emerald-400"
          sparkData={financialMetrics.map(d => d.netProfit)}
          onDrilldown={() => onTabChange("P&L Deep Dive")}
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <KpiCard
          label="Cash Balance" value={`£${(latestFM.cash / 1000).toFixed(2)}M`}
          change="+£140k vs Feb" verdict="Recovering from £3.72M Jan low"
          up={true} icon={DollarSign}
          color="text-sky-600 dark:text-sky-400" bg="bg-sky-100 dark:bg-sky-500/10" accent="bg-sky-400"
          sparkData={financialMetrics.map(d => d.cash)}
          onDrilldown={() => onTabChange("Balance Sheet")}
        />
        <KpiCard
          label="Working Capital" value={`£${(latestFM.workingCapital / 1000).toFixed(1)}M`}
          change="+£250k vs Feb" verdict="Improving from £7.2M Jan trough"
          up={true} icon={Zap}
          color="text-indigo-600 dark:text-indigo-400" bg="bg-indigo-100 dark:bg-indigo-500/10" accent="bg-indigo-400"
          sparkData={financialMetrics.map(d => d.workingCapital)}
          onDrilldown={() => onTabChange("Balance Sheet")}
        />
        <KpiCard
          label="Lockup Days" value={`${latestRec.lockup}d`}
          change="28 days above 90-day target" verdict="Peaked 125d Jan · improving"
          up={false} icon={Clock}
          color="text-amber-600 dark:text-amber-400" bg="bg-amber-100 dark:bg-amber-500/10" accent="bg-amber-400"
          sparkData={recData.map(d => d.lockup)}
          onDrilldown={() => onTabChange("Collections & Cash")}
        />
        <KpiCard
          label="Debtors 91+ Days" value={`£${(latestRec.aged91 / 1000).toFixed(1)}M`}
          change="90.4% of debtor book" verdict="Concentration risk — recovery needed"
          up={false} icon={AlertTriangle}
          color="text-rose-600 dark:text-rose-400" bg="bg-rose-100 dark:bg-rose-500/10" accent="bg-rose-500"
          sparkData={recData.map(d => d.aged91 / 1000)}
          onDrilldown={() => onTabChange("Collections & Cash")}
        />
        <KpiCard
          label="Creditor Days" value={`${latestFM.creditorDays}d`}
          change="–2d vs Feb · improving" verdict="Below 45-day benchmark"
          up={true} icon={FileText}
          color="text-slate-600 dark:text-slate-400" bg="bg-slate-100 dark:bg-slate-500/10" accent="bg-slate-400"
          sparkData={financialMetrics.map(d => d.creditorDays)}
          onDrilldown={() => onTabChange("Balance Sheet")}
        />
      </div>

      {/* Revenue vs target chart */}
      <Card>
        <SectionHeader title="Are we hitting revenue target?" sub="Monthly revenue vs budget · Apr 2024 – Mar 2025 · budget overlay from Oct 24" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={plData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={52} />
              <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(2)}M`} />} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue" />
              <Line type="monotone" dataKey="budget"  stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="5 3" dot={false} name="Budget" connectNulls={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 pt-3 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />Revenue</span>
          <span className="flex items-center gap-2"><span className="inline-block w-5 border-t-2 border-dashed border-rose-500" />Budget target</span>
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">Nov 24 only month above budget in past 6 · Mar 25 miss: –£520k</span>
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
        <SectionHeader title="Is margin improving?" sub="EBITDA margin % · Apr 2024 – Mar 2025 · recovering from Jul 24 low" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={plData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[16, 24]} tickFormatter={v => `${v}%`} width={38} />
              <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
              <ReferenceLine y={20} stroke="#94a3b8" strokeDasharray="4 2" strokeOpacity={0.5} label={{ value: "20% baseline", fill: "var(--chart-tick)", fontSize: 9, position: "insideTopRight" }} />
              <Line type="monotone" dataKey="ebitdaM" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 3.5, strokeWidth: 0 }} activeDot={{ r: 5, fill: "#8b5cf6" }} name="EBITDA margin" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05] flex items-center gap-2">
          <TrendingUp size={11} className="text-emerald-500 shrink-0" />
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400/80">+3.4pp recovery from 18.7% Jul 24 low. Now at 22.1% — above the 20% baseline. Cost discipline and case mix improving.</p>
        </div>
      </Card>

      {/* Budget vs actual */}
      <Card>
        <SectionHeader title="Revenue — actual vs budget" sub="Oct 2024 – Mar 2025 · 4 of 6 months missed target" badge="6 months" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={bvaData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={52} />
              <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(2)}M`} />} />
              <Bar dataKey="budget" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Budget"  opacity={0.45} />
              <Bar dataKey="actual" fill="#6366f1" radius={[4, 4, 0, 0]} name="Actual"  />
            </BarChart>
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

      {/* Utilisation heatmap */}
      <Card>
        <SectionHeader title="Are we utilising people effectively?" sub="Utilisation heatmap — grade × month · Oct 2024 – Mar 2025 · green = at/above target" />
        <div className="overflow-x-auto">
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
      </Card>

      {/* Headcount trend */}
      <Card>
        <SectionHeader title="Headcount — Nov 2025 to Apr 2026" sub="Total and fee earners · CRM · stable growth, no attrition spike" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={hcData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
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
            </AreaChart>
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

function AlertsSection() {
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

  return (
    <div className="space-y-5">
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
    </div>
  );
}

/* ─────────────────────────────────────────────
   P&L DEEP DIVE SECTION
───────────────────────────────────────────── */

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
        <SectionHeader title="P&L insights" sub="System-generated · March 2025" badge="AI" />
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
   BALANCE SHEET SECTION
───────────────────────────────────────────── */

function BalanceSheetSection() {
  const fmt = (v: number) => v >= 1000 ? `£${(v / 1000).toFixed(1)}M` : `£${v}k`;
  const chg = (curr: number, prev: number) => {
    const d = curr - prev;
    const pct = ((d / prev) * 100).toFixed(1);
    return { d, pct, up: d >= 0 };
  };

  function BSRow({ label, curr, prev, group }: { label: string; curr: number; prev: number; group: string }) {
    const { d, pct, up } = chg(curr, prev);
    const isTotal = group === "total";
    return (
      <tr className={`border-b border-slate-100 dark:border-white/[0.04] ${isTotal ? "bg-slate-50 dark:bg-white/[0.02]" : ""}`}>
        <td className={`py-2.5 pl-2 ${isTotal ? "font-semibold text-slate-900 dark:text-white" : "text-slate-600 dark:text-white/60"} text-[12px]`}>{label}</td>
        <td className={`py-2.5 text-right pr-4 font-mono tabular-nums text-[12px] ${isTotal ? "font-semibold text-slate-900 dark:text-white" : "text-slate-700 dark:text-white/70"}`}>{fmt(curr)}</td>
        <td className="py-2.5 text-right pr-4 font-mono tabular-nums text-[11px] text-slate-400 dark:text-white/30">{fmt(prev)}</td>
        <td className={`py-2.5 text-right font-mono tabular-nums text-[11px] font-semibold ${up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
          {d >= 0 ? "+" : ""}{fmt(Math.abs(d))}
        </td>
        <td className={`py-2.5 text-right pl-4 font-mono tabular-nums text-[10px] ${up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
          {d >= 0 ? "+" : ""}{pct}%
        </td>
      </tr>
    );
  }

  function BSBlock({ title, rows }: { title: string; rows: typeof bsAssets }) {
    return (
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-3 px-2">{title}</p>
        <table className="w-full text-xs mb-1">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/[0.06]">
              <th className="text-left text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 pb-2 pl-2 w-48">Item</th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 pb-2 pr-4">Mar 25</th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 pb-2 pr-4">Feb 25</th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 pb-2">Change</th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 pb-2 pl-4">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => <BSRow key={i} {...r} />)}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Assets",    value: "£139.2M", change: "+£1.6M vs Feb", up: true,  color: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-500/20", bg: "bg-indigo-50 dark:bg-white/[0.025]"  },
          { label: "Total Equity",    value: "£111.1M", change: "+£1.9M vs Feb", up: true,  color: "text-emerald-700 dark:text-emerald-300",border: "border-emerald-200 dark:border-emerald-500/20",bg: "bg-emerald-50 dark:bg-white/[0.025]"},
          { label: "Net Debt",        value: "£14.7M",  change: "–£210k vs Feb", up: true,  color: "text-sky-700 dark:text-sky-300",        border: "border-sky-200 dark:border-sky-500/20",       bg: "bg-sky-50 dark:bg-white/[0.025]"     },
          { label: "Working Capital", value: "£7.7M",   change: "+£250k vs Feb", up: true,  color: "text-violet-700 dark:text-violet-300",  border: "border-violet-200 dark:border-violet-500/20", bg: "bg-violet-50 dark:bg-white/[0.025]"  },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-2">{s.label}</p>
            <p className={`text-2xl font-bold font-mono tabular-nums ${s.color}`}>{s.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {s.up ? <TrendingUp size={10} className="text-emerald-500" /> : <TrendingDown size={10} className="text-rose-500" />}
              <p className="text-[11px] text-slate-500 dark:text-white/35">{s.change}</p>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <SectionHeader title="Balance sheet" sub="Mar 25 vs Feb 25 · all figures unaudited" />
        <div className="space-y-6">
          <BSBlock title="Assets" rows={bsAssets} />
          <BSBlock title="Liabilities" rows={bsLiabilities} />
          <BSBlock title="Equity" rows={bsEquity} />
        </div>
      </Card>

      <Card>
        <SectionHeader title="Balance sheet signals" sub="System-generated · March 2025" badge="System" />
        <div className="space-y-2.5">
          <Signal type="alert"   title="Accounts receivable £89.2M — up £2.8M MoM (+3.2%)"     detail="Debtor growth outpacing collections. 90% aged 91+ days. Structural collections intervention required." />
          <Signal type="info"    title="WIP declining — £39.1M vs £40.3M in Feb"                detail="Cases converting to bills. Good operational indicator. The collections pipeline is healthy — the cash is in AR." />
          <Signal type="info"    title="Total equity £111.1M — strengthening MoM"               detail="Retained earnings +£1.87M in March driven by net profit. Balance sheet healthy with 4x equity/debt ratio." />
          <Signal type="warning" title="Short-term debt £6.2M — unchanged for 3 months"         detail="Review refinancing options if lockup resolution releases cash. Current facility may be surplus to requirements by Q3." />
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAV CONFIG
───────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: "Executive Summary",     icon: BarChart2  },
  { label: "Financial Performance", icon: TrendingUp },
  { label: "P&L Deep Dive",         icon: FileText   },
  { label: "Collections & Cash",    icon: DollarSign },
  { label: "Balance Sheet",         icon: Activity   },
  { label: "People & Capacity",     icon: Users      },
  { label: "Risks & Exceptions",    icon: Zap        },
];

const SECTION_HEADERS: Record<string, { title: string; sub: string }> = {
  "Executive Summary":     { title: "Executive summary — March 2025",     sub: "BTG Advisory Group · CEO operating system"                     },
  "Financial Performance": { title: "Financial performance",              sub: "Revenue, EBITDA, budget vs actual, service lines"              },
  "P&L Deep Dive":         { title: "P&L deep dive",                      sub: "Full income statement · Mar vs Feb vs budget · service line breakdown" },
  "Collections & Cash":    { title: "Collections & cash conversion",      sub: "Debtors aging, lockup days, WIP pipeline"                     },
  "Balance Sheet":         { title: "Balance sheet",                      sub: "Assets, liabilities, equity · Mar 25 vs Feb 25"               },
  "People & Capacity":     { title: "People & capacity",                  sub: "Headcount, fee earners, utilisation heatmap"                  },
  "Risks & Exceptions":    { title: "Risks & exceptions",                 sub: "All system-generated signals and reports"                     },
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Executive Summary");
  const header     = SECTION_HEADERS[activeTab];
  const alertCount = 2;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05050f] text-slate-900 dark:text-white">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-60 border-r border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#07070f] flex flex-col z-40 hidden lg:flex shadow-sm dark:shadow-none">
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
                onClick={() => setActiveTab(item.label)}
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
          <div className="px-3 py-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.07]">
            <p className="text-[9px] font-semibold text-slate-400 dark:text-white/25 uppercase tracking-widest mb-2">Built by</p>
            <Image src="/logo.png" alt="Quantyx Advisory" width={120} height={30} className="object-contain dark:brightness-[1.15]" />
            <p className="text-[10px] text-slate-400 dark:text-white/25 mt-1.5">Bespoke system · Mar 2025</p>
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
            <p className="text-[10.5px] text-slate-400 dark:text-white/28 leading-tight mt-0.5">{header.sub}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/[0.06] transition-all">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-[#05050f]" />
            </button>
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/[0.06] transition-all">
              <Settings size={16} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md ml-1">BTG</div>
          </div>
        </header>

        <main className="p-6 lg:p-8 max-w-[1440px]">
          {activeTab === "Executive Summary"     && <OverviewSection onTabChange={setActiveTab} />}
          {activeTab === "Financial Performance" && <FinancialSection  />}
          {activeTab === "P&L Deep Dive"         && <PLSection         />}
          {activeTab === "Balance Sheet"          && <BalanceSheetSection />}
          {activeTab === "Collections & Cash"    && <CashSection       />}
          {activeTab === "People & Capacity"     && <PeopleSection     />}
          {activeTab === "Risks & Exceptions"    && <AlertsSection     />}

          <div className="flex flex-col items-center gap-2 pt-10 pb-6">
            <Image src="/logo.png" alt="Quantyx Advisory" width={96} height={24} className="object-contain opacity-40 dark:opacity-25 dark:brightness-[2]" />
            <p className="text-[11px] text-slate-400 dark:text-white/18">
              Built for BTG Advisory Group — high-confidence datasets only. Decision-oriented, not data-oriented.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
