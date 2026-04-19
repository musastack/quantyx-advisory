"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";
import {
  AlertCircle, Bell, Settings, ArrowLeft, TrendingUp, TrendingDown,
  Users, FileText, BarChart2, Zap, AlertTriangle,
  Download, DollarSign, UserCheck, Clock,
  ChevronRight, Activity,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

/* ─────────────────────────────────────────────
   BTG ADVISORY GROUP — CEO DASHBOARD
   Core datasets (HIGH confidence, SunSystems / CRM):
     erp_fact_pl_monthly · erp_fact_budget_vs_actual
     erp_fact_revenue · erp_fact_receivables_monthly
     erp_fact_wip_monthly · crm_fact_headcount_monthly
     crm_fact_employee_utilisation_monthly · erp_fact_targets_detailed
   Excluded (low quality / too granular):
     crm_fact_cases (nulls, staging inconsistencies)
     erp_fact_billing_detailed (EMP-OLD refs, granular noise)
     dim tables (reference only)
   Latest closed period: March 2025
───────────────────────────────────────────── */

// P&L monthly — Apr 2024 – Mar 2025 (£000s)
const plData = [
  { month: "Apr", revenue: 9850,  gp: 5983, ebitda: 2127, ebitdaM: 21.6 },
  { month: "May", revenue: 9972,  gp: 6073, ebitda: 2075, ebitdaM: 20.8 },
  { month: "Jun", revenue: 9860,  gp: 5817, ebitda: 2024, ebitdaM: 20.5 },
  { month: "Jul", revenue: 10090, gp: 5983, ebitda: 1887, ebitdaM: 18.7 },
  { month: "Aug", revenue: 10020, gp: 5952, ebitda: 2084, ebitdaM: 20.8 },
  { month: "Sep", revenue: 10300, gp: 6057, ebitda: 1978, ebitdaM: 19.2 },
  { month: "Oct", revenue: 10330, gp: 6291, ebitda: 2138, ebitdaM: 20.7 },
  { month: "Nov", revenue: 10560, gp: 6431, ebitda: 2184, ebitdaM: 20.7 },
  { month: "Dec", revenue: 10670, gp: 6412, ebitda: 2091, ebitdaM: 19.6 },
  { month: "Jan", revenue: 10490, gp: 6294, ebitda: 2127, ebitdaM: 20.3 },
  { month: "Feb", revenue: 10510, gp: 6359, ebitda: 2207, ebitdaM: 21.0 },
  { month: "Mar", revenue: 10570, gp: 6427, ebitda: 2336, ebitdaM: 22.1 },
];

// Budget vs actual — Oct 2024 – Mar 2025 (£000s)
const bvaData = [
  { month: "Oct", budget: 10550, actual: 10330 },
  { month: "Nov", budget: 10520, actual: 10560 },
  { month: "Dec", budget: 10970, actual: 10670 },
  { month: "Jan", budget: 10990, actual: 10490 },
  { month: "Feb", budget: 10260, actual: 10510 },
  { month: "Mar", budget: 11090, actual: 10570 },
];

// Receivables — Oct 2024 – Mar 2025 (£000s)
const recData = [
  { month: "Oct", debtors: 75740, aged91: 70650, other: 5090,  lockup: 110 },
  { month: "Nov", debtors: 77620, aged91: 72290, other: 5330,  lockup: 119 },
  { month: "Dec", debtors: 80610, aged91: 73880, other: 6730,  lockup: 122 },
  { month: "Jan", debtors: 83310, aged91: 75740, other: 7570,  lockup: 125 },
  { month: "Feb", debtors: 86380, aged91: 77610, other: 8770,  lockup: 119 },
  { month: "Mar", debtors: 89180, aged91: 80590, other: 8590,  lockup: 118 },
];

// WIP — Oct 2024 – Mar 2025 (£000s)
const wipData = [
  { month: "Oct", wip: 44940 },
  { month: "Nov", wip: 47430 },
  { month: "Dec", wip: 45180 },
  { month: "Jan", wip: 42390 },
  { month: "Feb", wip: 40340 },
  { month: "Mar", wip: 39120 },
];

// Headcount — Nov 2025 – Apr 2026
const hcData = [
  { month: "Nov", headcount: 716, feeEarners: 543 },
  { month: "Dec", headcount: 715, feeEarners: 542 },
  { month: "Jan", headcount: 717, feeEarners: 543 },
  { month: "Feb", headcount: 721, feeEarners: 544 },
  { month: "Mar", headcount: 724, feeEarners: 541 },
  { month: "Apr", headcount: 725, feeEarners: 542 },
];

// Utilisation by grade — Mar 2025
const utilisationData = [
  { grade: "Partner",       util: 56.9, target: 55.0 },
  { grade: "Director",      util: 65.8, target: 65.0 },
  { grade: "Sr. Manager",   util: 73.1, target: 72.0 },
  { grade: "Manager",       util: 78.3, target: 77.0 },
  { grade: "Sr. Associate", util: 80.4, target: 80.0 },
  { grade: "Associate",     util: 81.1, target: 82.0 },
];

// Revenue by service line — Jan–Mar 2025 combined (£000s)
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

function KpiCard({ label, value, sub, change, up, icon: Icon, color, bg, glow, accent }: {
  label: string; value: string; sub: string; change: string; up: boolean;
  icon: React.ElementType; color: string; bg: string; glow: string; accent?: string;
}) {
  return (
    <div className={`rounded-2xl border border-slate-200 dark:border-white/[0.09] bg-white dark:bg-[#0b0b17] shadow-sm dark:shadow-none overflow-hidden ${glow}`}>
      {accent && <div className={`h-[3px] ${accent}`} />}
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">{label}</p>
          <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
            <Icon size={17} className={color} />
          </div>
        </div>
        <p className="text-[2rem] font-bold tracking-tight mb-2.5 text-slate-900 dark:text-white font-mono leading-none">{value}</p>
        <div className="flex items-center gap-1.5 mb-1.5">
          {up
            ? <TrendingUp  size={11} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
            : <TrendingDown size={11} className="text-rose-500 dark:text-rose-400 shrink-0" />
          }
          <span className={`text-xs font-semibold ${up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{change}</span>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-white/25 leading-snug">{sub}</p>
      </div>
    </div>
  );
}

function Signal({ type, title, detail, action }: { type: "alert" | "warning" | "info"; title: string; detail: string; action?: string }) {
  const styles = {
    alert:   { border: "border-l-rose-500",   bg: "bg-rose-50   dark:bg-rose-500/[0.07]   border border-rose-200   dark:border-rose-500/20",   text: "text-rose-700   dark:text-rose-300",   icon: <AlertCircle size={13} className="text-rose-500 shrink-0 mt-0.5" /> },
    warning: { border: "border-l-amber-500",  bg: "bg-amber-50  dark:bg-amber-500/[0.07]  border border-amber-200  dark:border-amber-500/20",  text: "text-amber-700  dark:text-amber-300",  icon: <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" /> },
    info:    { border: "border-l-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/[0.07] border border-indigo-200 dark:border-indigo-500/20", text: "text-indigo-700 dark:text-indigo-300", icon: <Activity size={13} className="text-indigo-500 shrink-0 mt-0.5" /> },
  };
  const s = styles[type];
  return (
    <div className={`signal-card ${s.border} ${s.bg} flex items-start gap-3`}>
      {s.icon}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-semibold ${s.text}`}>{title}</p>
        <p className="text-xs text-slate-500 dark:text-white/40 mt-0.5 leading-snug">{detail}</p>
        {action && <p className={`text-[11px] font-semibold mt-1.5 flex items-center gap-1 ${s.text}`}><ChevronRight size={10} />{action}</p>}
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

function ChartTooltip({ active, payload, label, formatter }: {
  active?: boolean; payload?: { value?: number; name?: string; color?: string }[];
  label?: string; formatter?: (v: number, n: string) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--chart-tooltip-bg)", border: "1px solid var(--chart-tooltip-bd)" }}
         className="rounded-xl px-4 py-3 text-xs shadow-xl space-y-1">
      <p className="text-white/40 mb-1.5 font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-semibold" style={{ color: p.color || "#6366f1" }}>
          {formatter ? formatter(p.value ?? 0, p.name ?? "") : `£${Number(p.value).toLocaleString("en-GB")}`}
        </p>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMMAND STRIP
───────────────────────────────────────────── */

function CommandStrip() {
  const latest    = plData[plData.length - 1];
  const latestRec = recData[recData.length - 1];
  const ytdActual = bvaData.reduce((s, d) => s + d.actual, 0);
  const ytdBudget = bvaData.reduce((s, d) => s + d.budget, 0);
  const ytdVar    = ((ytdActual - ytdBudget) / ytdBudget * 100).toFixed(1);

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
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />Live
              </span>
            </div>
            <p className="text-[12.5px] text-slate-600 dark:text-white/45 leading-relaxed max-w-2xl">
              Revenue £{(latest.revenue / 1000).toFixed(2)}M MTD — EBITDA margin {latest.ebitdaM}%, best in 12 months. YTD revenue {Number(ytdVar) >= 0 ? "+" : ""}{ytdVar}% vs budget. Debtors at £{(latestRec.debtors / 1000).toFixed(1)}M with 90% aged 91+ days — lockup risk requires board attention.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 shrink-0">
            {[
              { label: "2 critical alerts",      cls: "text-rose-700   bg-rose-100   border-rose-300   dark:text-rose-300   dark:bg-rose-500/15   dark:border-rose-500/30"    },
              { label: "Rev –4.6% vs budget",    cls: "text-amber-700  bg-amber-100  border-amber-300  dark:text-amber-300  dark:bg-amber-500/15  dark:border-amber-500/30"   },
              { label: `Lockup ${latestRec.lockup}d`, cls: "text-rose-600   bg-rose-50    border-rose-200   dark:text-rose-400   dark:bg-rose-500/10   dark:border-rose-500/20"  },
              { label: `EBITDA ${latest.ebitdaM}%`,   cls: "text-emerald-700 bg-emerald-100 border-emerald-300 dark:text-emerald-300 dark:bg-emerald-500/15 dark:border-emerald-500/30" },
            ].map(b => (
              <span key={b.label} className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border ${b.cls} whitespace-nowrap`}>{b.label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   OVERVIEW SECTION
───────────────────────────────────────────── */

function OverviewSection() {
  const latest    = plData[plData.length - 1];
  const latestRec = recData[recData.length - 1];
  const latestHC  = hcData[hcData.length - 1];
  const avgUtil   = utilisationData.reduce((s, g) => s + g.util, 0) / utilisationData.length;

  return (
    <div className="space-y-6">
      <CommandStrip />

      {/* 6-KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard label="Revenue MTD"     value={`£${(latest.revenue / 1000).toFixed(2)}M`}                change="vs £11.09M budget (–4.6%)"          up={false} icon={DollarSign} color="text-rose-600 dark:text-rose-400"     bg="bg-rose-100 dark:bg-rose-500/10"     glow="glow-rose"   accent="bg-rose-500"    sub="March 2025 · SunSystems" />
        <KpiCard label="EBITDA Margin"   value={`${latest.ebitdaM}%`}                                     change="+1.1pp vs Feb · best in 12 months"  up={true}  icon={TrendingUp} color="text-emerald-600 dark:text-emerald-400" bg="bg-emerald-100 dark:bg-emerald-500/10" glow=""            accent="bg-emerald-500" sub={`£${(latest.ebitda / 1000).toFixed(2)}M EBITDA`} />
        <KpiCard label="Lockup Days"     value={`${latestRec.lockup}d`}                                   change="+8d since Oct · debtors £89.2M"      up={false} icon={Clock}      color="text-amber-600 dark:text-amber-400"   bg="bg-amber-100 dark:bg-amber-500/10"   glow="glow-amber"  accent="bg-amber-400"   sub="90% aged 91+ days" />
        <KpiCard label="Utilisation"     value={`${avgUtil.toFixed(1)}%`}                                 change="vs 74.6% target · marginally ahead"  up={true}  icon={UserCheck}  color="text-indigo-600 dark:text-indigo-400" bg="bg-indigo-100 dark:bg-indigo-500/10" glow="glow-indigo" accent="bg-indigo-500"   sub="March 2025 · all grades" />
        <KpiCard label="Headcount"       value={`${latestHC.headcount}`}                                  change="+9 in 6 months · stable"             up={true}  icon={Users}      color="text-sky-600 dark:text-sky-400"       bg="bg-sky-100 dark:bg-sky-500/10"       glow=""            accent="bg-sky-400"     sub={`${latestHC.feeEarners} fee earners`} />
        <KpiCard label="Gross Margin"    value={`${(latest.gp / latest.revenue * 100).toFixed(1)}%`}      change="+0.8pp vs Feb · stable"              up={true}  icon={BarChart2}  color="text-violet-600 dark:text-violet-400" bg="bg-violet-100 dark:bg-violet-500/10" glow=""            accent="bg-violet-500"  sub="March 2025" />
      </div>

      {/* Revenue + EBITDA chart */}
      <Card>
        <SectionHeader title="Revenue and EBITDA — trailing 12 months" sub="Apr 2024 – Mar 2025 · ERP SunSystems · both segments combined" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={plData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="ebiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.14} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={52} />
              <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(2)}M`} />} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" name="Revenue" />
              <Area type="monotone" dataKey="ebitda"  stroke="#10b981" strokeWidth={2}   fill="url(#ebiGrad)"  name="EBITDA" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 pt-2 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />Revenue</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />EBITDA</span>
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">Mar 25: £10.57M revenue · £2.34M EBITDA · 22.1% margin</span>
        </div>
      </Card>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Attention signals */}
        <div className="lg:col-span-1 rounded-2xl border border-slate-200 dark:border-white/[0.09] bg-white dark:bg-[#0b0b17] shadow-sm dark:shadow-none overflow-hidden">
          <div className="px-6 pt-5 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white">What needs attention</h2>
                <p className="text-xs text-slate-400 dark:text-white/30 mt-0.5">Exception signals — March 2025</p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/25 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-1 rounded-full">2 alerts</span>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400/70 mb-2 px-1">Critical</p>
              <div className="space-y-2">
                <Signal type="alert"
                  title="£80.6M debtors aged 91+ days — 90.4% of book"
                  detail="Total debtor book £89.2M. Insolvency case cycles are extending aging. Lockup 118 days and growing since Oct 24."
                  action="Review receivables" />
                <Signal type="alert"
                  title="Revenue –4.6% vs budget — £520k shortfall"
                  detail="Budget £11.09M, actual £10.57M. Third below-budget month in last six. YTD –1.1% (£1.4M behind plan)."
                  action="Review pipeline" />
              </div>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-amber-500 dark:text-amber-400/70 mb-2 px-1">Warnings</p>
              <div className="space-y-2">
                <Signal type="warning"
                  title="Lockup 118d — up 8 days since October"
                  detail="Debtors growing faster than collections. WIP converting but debtors not clearing. Typical target ~90 days." />
                <Signal type="warning"
                  title="Associate utilisation 81.1% — 0.9pp below target"
                  detail="Only grade below target. All others at or above. Monitor case intake vs associate capacity." />
              </div>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400/70 mb-2 px-1">Intelligence</p>
              <div className="space-y-2">
                <Signal type="info"
                  title="EBITDA 22.1% — best margin in 12 months"
                  detail="Recovery from 18.7% low in Jul 24. Cost discipline driving improvement. Sustain through H2." />
                <Signal type="info"
                  title="WIP £39.1M declining — converting to billings"
                  detail="Down £8.3M since Nov 24 peak. Cases progressing. Positive near-term cash signal if collections improve." />
              </div>
            </div>
          </div>
        </div>

        {/* Debtors + WIP overview chart */}
        <Card className="lg:col-span-2">
          <SectionHeader title="Debtors and WIP — Oct 2024 to Mar 2025" sub="Total lockup = £128.3M at Mar 25 (debtors + WIP)" />
          <div className="mt-1 mb-2">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={recData.map((r, i) => ({ month: r.month, debtors: r.debtors, wip: wipData[i].wip }))}
                margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
              >
                <defs>
                  <linearGradient id="debGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="wipGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.14} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} dy={6} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(0)}M`} width={48} />
                <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(1)}M`} />} />
                <Area type="monotone" dataKey="debtors" stroke="#6366f1" strokeWidth={2.5} fill="url(#debGrad)" name="Debtors" />
                <Area type="monotone" dataKey="wip"     stroke="#f59e0b" strokeWidth={2}   fill="url(#wipGrad)"  name="WIP" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 pt-2 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-white/35">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />Debtors</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />WIP</span>
            <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">Debtors rising · WIP converting ✓ · lockup pressure building</span>
          </div>
        </Card>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FINANCIAL SECTION
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
          { label: "Mar 25 Revenue",  value: `£${(latest.revenue / 1000).toFixed(2)}M`,  sub: "–4.6% vs budget",                                    color: "text-rose-600 dark:text-rose-400",       border: "border-rose-200 dark:border-rose-500/20",       bg: "bg-rose-50 dark:bg-white/[0.025]"    },
          { label: "Mar 25 EBITDA",   value: `£${(latest.ebitda / 1000).toFixed(2)}M`,   sub: `${latest.ebitdaM}% margin · best in 12 months`,      color: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-500/20", bg: "bg-emerald-50 dark:bg-white/[0.025]" },
          { label: "YTD vs Budget",   value: `${Number(ytdVar) >= 0 ? "+" : ""}${ytdVar}%`, sub: `£${(ytdActual / 1000).toFixed(1)}M of £${(ytdBudget / 1000).toFixed(1)}M target`, color: "text-amber-600 dark:text-amber-400", border: "border-amber-200 dark:border-amber-500/20", bg: "bg-amber-50 dark:bg-white/[0.025]"   },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* EBITDA margin trend */}
      <Card>
        <SectionHeader title="EBITDA margin — trailing 12 months" sub="Apr 2024 – Mar 2025 · recovering from Jul 24 low of 18.7%" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={plData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[16, 24]} tickFormatter={v => `${v}%`} width={38} />
              <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
              <Line type="monotone" dataKey="ebitdaM" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 3.5, strokeWidth: 0 }} activeDot={{ r: 5, fill: "#8b5cf6" }} name="EBITDA margin" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05] flex items-center gap-2">
          <TrendingUp size={11} className="text-emerald-500 shrink-0" />
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400/80">Margin recovered to 22.1% in Mar 25 — up +3.4pp from Jul 24 low. Cost discipline and case mix improvement driving recovery.</p>
        </div>
      </Card>

      {/* Budget vs actual */}
      <Card>
        <SectionHeader title="Revenue — budget vs actual" sub="Oct 2024 – Mar 2025 · SunSystems vs plan" badge="6 months" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={bvaData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={52} />
              <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(2)}M`} />} />
              <Bar dataKey="budget" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Budget" opacity={0.5} />
              <Bar dataKey="actual" fill="#6366f1" radius={[4, 4, 0, 0]} name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 pt-3 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 opacity-60" />Budget</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />Actual</span>
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">Nov 24 only month above budget in H2 · Mar 25 –£520k</span>
        </div>
      </Card>

      {/* Service lines */}
      <Card>
        <SectionHeader title="Revenue by service line — Jan–Mar 2025" sub="3-month combined · source: erp_fact_revenue" badge="8 lines" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={serviceLines} layout="vertical" margin={{ top: 4, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} />
              <YAxis dataKey="name" type="category" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} width={128} />
              <Tooltip content={<ChartTooltip formatter={(v) => `£${(v / 1000).toFixed(2)}M (3 months)`} />} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[0, 4, 4, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05]">
          <p className="text-[11px] text-slate-400 dark:text-white/25">CVL and Administration account for 50% of 3-month revenue. Restructuring Advisory at £3.8M is the third largest line.</p>
        </div>
      </Card>

      {/* Segment split */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Business Recovery (BR)", value: "£8.02M", pct: "75.9%", sub: "Mar 25 · dominant segment", color: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-500/20", bg: "bg-indigo-50 dark:bg-white/[0.025]", bar: "bg-indigo-500", barW: "75.9%" },
          { label: "Personal Advisory (PA)", value: "£2.55M", pct: "24.1%", sub: "Mar 25 · diversification buffer", color: "text-violet-700 dark:text-violet-300", border: "border-violet-200 dark:border-violet-500/20", bg: "bg-violet-50 dark:bg-white/[0.025]", bar: "bg-violet-500", barW: "24.1%" },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <div className="flex items-end justify-between mb-3">
              <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
              <p className={`text-lg font-bold font-mono ${s.color} opacity-70`}>{s.pct}</p>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 mb-2">
              <div className={`h-full rounded-full ${s.bar}`} style={{ width: s.barW }} />
            </div>
            <p className="text-[11px] text-slate-400 dark:text-white/30">{s.sub}</p>
          </div>
        ))}
      </div>

      <Card>
        <SectionHeader title="Financial signals" sub="System-generated alerts · March 2025" badge="System" />
        <div className="space-y-2.5">
          <Signal type="alert"   title="Revenue –4.6% vs budget in Mar 25 (–£520k)"              detail="Third below-budget month in last six. YTD shortfall £1.4M vs plan. CVL volume softness in Q1 primary driver." />
          <Signal type="warning" title="BR segment 75.9% of revenue — sector concentration risk"  detail="Personal Advisory at 24.1% provides a buffer but BR dominance creates sensitivity to insolvency market cycles." />
          <Signal type="info"    title="EBITDA 22.1% — recovery trajectory sustained"             detail="Up from 18.7% Jul 24 low. Cost per case improving. If revenue recovers to budget, full-year EBITDA target is achievable." />
          <Signal type="info"    title="CVL most productive service line at £8.2M (3 months)"     detail="CVL accounts for 26% of Q1 combined revenue. Administration second at 22%. Both driven by BR segment." />
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CASH & WORKING CAPITAL SECTION
───────────────────────────────────────────── */

function CashSection() {
  const latestRec = recData[recData.length - 1];
  const latestWip = wipData[wipData.length - 1];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Total Debtors",  value: `£${(latestRec.debtors / 1000).toFixed(1)}M`,  sub: "Mar 2025",               color: "text-rose-700 dark:text-rose-400",     border: "border-rose-200 dark:border-rose-500/20",     bg: "bg-rose-50 dark:bg-white/[0.025]"    },
          { label: "Aged 91+ Days",  value: `£${(latestRec.aged91 / 1000).toFixed(1)}M`,   sub: "90.4% of debtor book",   color: "text-rose-700 dark:text-rose-400",     border: "border-rose-200 dark:border-rose-500/20",     bg: "bg-rose-50 dark:bg-white/[0.025]"    },
          { label: "WIP Balance",    value: `£${(latestWip.wip / 1000).toFixed(1)}M`,      sub: "declining — converting", color: "text-amber-700 dark:text-amber-400",   border: "border-slate-200 dark:border-white/[0.07]",   bg: "bg-white dark:bg-white/[0.025]"      },
          { label: "Lockup Days",    value: `${latestRec.lockup}d`,                         sub: "target: ~90 days",       color: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-500/20", bg: "bg-indigo-50 dark:bg-white/[0.025]"  },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Debtor aging — stacked bar */}
      <Card>
        <SectionHeader title="Debtor aging — 91+ days vs current" sub="Oct 2024 – Mar 2025 · source: erp_fact_receivables_monthly" />
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
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" />Aged 91+ days</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 opacity-75" />0–90 days</span>
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">Mar 25: 90.4% of debtors overdue 91+ — structurally elevated</span>
        </div>
      </Card>

      {/* Lockup days trend */}
      <Card>
        <SectionHeader title="Lockup days trend" sub="Oct 2024 – Mar 2025 · improving from Jan 25 peak" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={recData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[90, 135]} tickFormatter={v => `${v}d`} width={40} />
              <Tooltip content={<ChartTooltip formatter={(v) => `${v} days`} />} />
              <Line type="monotone" dataKey="lockup" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 3.5, strokeWidth: 0 }} activeDot={{ r: 5, fill: "#6366f1" }} name="Lockup days" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/[0.05] flex items-start gap-2.5">
          <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-700 dark:text-amber-300/80 leading-relaxed">Peaked at 125 days in Jan 25 — now improving at 118 days. Target ~90 days. Driven by insolvency case duration, not billing failure. Structured collections initiative needed on the 91+ bucket.</p>
        </div>
      </Card>

      {/* WIP trend */}
      <Card>
        <SectionHeader title="WIP balance — Oct 2024 to Mar 2025" sub="Closing WIP monthly · source: erp_fact_wip_monthly" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={185}>
            <AreaChart data={wipData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="wipAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.18} />
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
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400/80">WIP down £8.3M since Nov 24 peak (£47.4M → £39.1M). Cases progressing to billing — positive near-term cash conversion signal.</p>
        </div>
      </Card>

      {/* Total lockup position */}
      <div className="rounded-2xl border border-indigo-100 dark:border-indigo-500/[0.18] bg-white dark:bg-[#0b0b17] shadow-sm dark:shadow-none overflow-hidden">
        <div className="h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-400" />
        <div className="p-6">
          <SectionHeader title="Total lockup position — March 2025" sub="Debtors + WIP combined · £128.3M" badge="Snapshot" />
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/[0.05]">
              <p className="text-[9px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400/70 mb-2">Total lockup</p>
              <p className="text-2xl font-bold font-mono text-indigo-700 dark:text-indigo-300">£128.3M</p>
              <p className="text-[11px] text-slate-500 dark:text-white/35 mt-1">Debtors £89.2M + WIP £39.1M</p>
            </div>
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/[0.05]">
              <p className="text-[9px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400/70 mb-2">High-risk debtors</p>
              <p className="text-2xl font-bold font-mono text-rose-700 dark:text-rose-300">£80.6M</p>
              <p className="text-[11px] text-slate-500 dark:text-white/35 mt-1">Aged 91+ days · priority review</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
              <p className="text-slate-400 dark:text-white/30 mb-1.5">Debtor growth (Oct 24 → Mar 25)</p>
              <p className="font-bold font-mono text-slate-800 dark:text-white">+£13.4M (+17.7%)</p>
              <p className="text-slate-400 dark:text-white/25 text-[10px] mt-0.5">£75.7M → £89.2M · growing 6 consecutive months</p>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/[0.04]">
              <p className="text-slate-400 dark:text-white/30 mb-1.5">WIP reduction (Nov 24 → Mar 25)</p>
              <p className="font-bold font-mono text-emerald-700 dark:text-emerald-300">–£8.3M (–17.5%)</p>
              <p className="text-slate-400 dark:text-white/25 text-[10px] mt-0.5">£47.4M → £39.1M · converting to billings ✓</p>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <SectionHeader title="Cash & working capital signals" sub="Automated exception monitoring" badge="System" />
        <div className="space-y-2.5">
          <Signal type="alert"   title="£80.6M aged 91+ — 90.4% of total debtor book"                   detail="Insolvency case lifecycles extend collection timescales, but 90%+ in this bucket exceeds normal range. Targeted collections review required." />
          <Signal type="alert"   title="Total lockup £128.3M (debtors + WIP) — up £21M since Oct 24"    detail="WIP declining is positive but debtor growth outpacing. Cash conversion urgency high. Board visibility recommended." />
          <Signal type="warning" title="Lockup 118 days — 28 days above typical 90-day target"          detail="Improving from Jan 25 peak of 125 days. Positive trajectory but pace of improvement needs acceleration." />
          <Signal type="info"    title="WIP £39.1M declining — cases progressing to billing stage"       detail="Down £8.3M from Nov 24 peak. If collected, near-term cash improves materially. Monitor debtor conversion rate." />
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PEOPLE SECTION
───────────────────────────────────────────── */

function PeopleSection() {
  const latestHC   = hcData[hcData.length - 1];
  const firstHC    = hcData[0];
  const netChange  = latestHC.headcount - firstHC.headcount;
  const avgUtil    = utilisationData.reduce((s, g) => s + g.util, 0) / utilisationData.length;
  const avgTarget  = utilisationData.reduce((s, g) => s + g.target, 0) / utilisationData.length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Headcount", value: `${latestHC.headcount}`,            sub: `${netChange >= 0 ? "+" : ""}${netChange} since Nov · stable growth`,    color: "text-slate-900 dark:text-white",         border: "border-slate-200 dark:border-white/[0.07]",   bg: "bg-white dark:bg-white/[0.025]"      },
          { label: "Fee Earners",     value: `${latestHC.feeEarners}`,           sub: `${Math.round(latestHC.feeEarners / latestHC.headcount * 100)}% of headcount`, color: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-500/20", bg: "bg-indigo-50 dark:bg-white/[0.025]"  },
          { label: "Avg Utilisation", value: `${avgUtil.toFixed(1)}%`,           sub: `vs ${avgTarget.toFixed(1)}% target (+0.6pp)`,                            color: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-500/20", bg: "bg-emerald-50 dark:bg-white/[0.025]" },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Headcount trend */}
      <Card>
        <SectionHeader title="Headcount — Nov 2025 to Apr 2026" sub="Total headcount and fee earners · CRM" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={hcData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="hcGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="feGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.14} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[500, 760]} tickFormatter={v => `${v}`} width={36} />
              <Tooltip content={<ChartTooltip formatter={(v, n) => `${v} ${n.toLowerCase()}`} />} />
              <Area type="monotone" dataKey="headcount"  stroke="#6366f1" strokeWidth={2.5} fill="url(#hcGrad)" name="Headcount" />
              <Area type="monotone" dataKey="feeEarners" stroke="#10b981" strokeWidth={2}   fill="url(#feGrad)"  name="Fee earners" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 pt-2 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />Total headcount</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Fee earners</span>
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">Apr 26: 725 total · 542 fee earners (74.8%)</span>
        </div>
      </Card>

      {/* Utilisation bar chart — actual vs target by grade */}
      <Card>
        <SectionHeader title="Utilisation by grade vs target — March 2025" sub="Avg actual vs avg target · crm_fact_employee_utilisation_monthly" />
        <div className="mt-1 mb-2">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={utilisationData} margin={{ top: 8, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="grade" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} dy={6} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[45, 90]} tickFormatter={v => `${v}%`} width={38} />
              <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
              <Bar dataKey="target" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Target"  opacity={0.5} />
              <Bar dataKey="util"   fill="#6366f1" radius={[4, 4, 0, 0]} name="Actual"  />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 pt-3 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 opacity-60" />Target</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />Actual</span>
          <span className="ml-auto text-[10px] text-slate-400 dark:text-white/20">5 of 6 grades at or above target · Associates only grade below (–0.9pp)</span>
        </div>
      </Card>

      {/* Grade detail */}
      <Card>
        <SectionHeader title="Utilisation detail by grade" sub="March 2025 · actual vs target vs variance" />
        <div className="space-y-2">
          {utilisationData.map((g, i) => {
            const delta   = g.util - g.target;
            const isBelow = delta < 0;
            return (
              <div key={i} className={`p-4 rounded-xl border transition-all ${isBelow ? "border-rose-200 bg-rose-50 dark:border-rose-500/15 dark:bg-rose-500/[0.025]" : "border-slate-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.02]"}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isBelow ? "bg-rose-100 dark:bg-rose-500/10" : "bg-indigo-100 dark:bg-indigo-500/10"}`}>
                      <span className={`text-[10px] font-bold ${isBelow ? "text-rose-600 dark:text-rose-400" : "text-indigo-600 dark:text-indigo-400"}`}>{i + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{g.grade}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className={`text-xs font-semibold font-mono ${isBelow ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>{delta >= 0 ? "+" : ""}{delta.toFixed(1)}pp</span>
                    <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">{g.util}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10">
                      <div className={`h-full rounded-full ${isBelow ? "bg-rose-400" : "bg-indigo-500"}`} style={{ width: `${(g.util / 90) * 100}%` }} />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 shrink-0">Target {g.target}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <SectionHeader title="People signals" sub="System-generated flags" badge="System" />
        <div className="space-y-2.5">
          <Signal type="warning" title="Associate utilisation 81.1% — 0.9pp below 82% target"              detail="Only grade below target. 5 of 6 grades performing at or above. Monitor case intake volume vs associate capacity." />
          <Signal type="info"    title="Partner utilisation 56.9% vs 55.0% target — ahead"                 detail="Partners performing above target. Fee earner-to-partner leverage ratio healthy at current headcount levels." />
          <Signal type="info"    title="Headcount grew +9 over 6 months — controlled growth"               detail="725 total (542 fee earners). Stable trajectory with no attrition spike. Supports H2 revenue growth target." />
          <Signal type="info"    title="Revenue per FTE improving alongside EBITDA recovery"                detail="EBITDA margin improvement to 22.1% suggests productivity gains outpacing headcount additions. Positive leverage trend." />
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ALERTS SECTION
───────────────────────────────────────────── */

function AlertsSection() {
  const alerts = [
    { area: "Cash",      type: "alert"   as const, title: "£80.6M debtors aged 91+ — 90.4% of book",             detail: "Critical lockup concentration. Insolvency case cycles driving aging. Targeted recovery strategy required." },
    { area: "Financial", type: "alert"   as const, title: "Revenue –4.6% vs budget in Mar 25 (–£520k)",           detail: "Third below-budget month in last six. YTD shortfall £1.4M. CVL volume softness primary driver." },
    { area: "Cash",      type: "warning" as const, title: "Total lockup £128.3M — up £21M since Oct 24",          detail: "WIP declining (positive) but debtor growth outpacing. Cash conversion pressure building month-on-month." },
    { area: "Cash",      type: "warning" as const, title: "Lockup 118 days — 28 days above 90-day target",        detail: "Improving from Jan 25 peak of 125 days. Trajectory positive but pace needs acceleration." },
    { area: "People",    type: "warning" as const, title: "Associate utilisation 81.1% — 0.9pp below target",     detail: "Only grade below target. Case volume intake monitoring required to assess capacity position." },
    { area: "Financial", type: "warning" as const, title: "BR segment 75.9% of revenue — concentration risk",    detail: "Personal Advisory at 24.1% provides buffer but BR dominance creates sector sensitivity." },
  ];

  const info = [
    { area: "Financial", type: "info" as const, title: "EBITDA 22.1% — best margin in 12 months",               detail: "Recovery from 18.7% Jul 24 low. If revenue recovers to budget, full-year EBITDA target is achievable." },
    { area: "Cash",      type: "info" as const, title: "WIP £39.1M declining — £8.3M reduction since Nov peak",  detail: "Cases progressing to billing. If collected, near-term cash generation improves materially." },
    { area: "People",    type: "info" as const, title: "5 of 6 grades at or above utilisation target",           detail: "Broad-based performance. Partner utilisation 56.9% vs 55% target. Healthy fee earner leverage." },
    { area: "Financial", type: "info" as const, title: "CVL most productive line at £8.2M (3 months)",           detail: "CVL accounts for 26% of Q1 revenue. Strong insolvency demand environment persisting." },
  ];

  const reports = [
    { name: "March 2025 — P&L Summary",          type: "Financial", updated: "Today", filename: "mar2025_pl_summary.csv",          csv: `Category,Amount (£)\nRevenue,10570000\nGross Profit,6427000\nEBITDA,2336000\nEBITDA Margin %,22.1\n` },
    { name: "March 2025 — Budget vs Actual",      type: "Financial", updated: "Today", filename: "mar2025_budget_vs_actual.csv",    csv: `Month,Budget,Actual,Variance %\nOct,10550000,10330000,-2.1\nNov,10520000,10560000,0.4\nDec,10970000,10670000,-2.8\nJan,10990000,10490000,-4.6\nFeb,10260000,10510000,2.5\nMar,11090000,10570000,-4.6\n` },
    { name: "March 2025 — Debtors & WIP",         type: "Cash",      updated: "Today", filename: "mar2025_debtors_wip.csv",         csv: `Month,Debtors,Aged 91+,WIP,Lockup Days\nOct,75740000,70650000,44940000,110\nNov,77620000,72290000,47430000,119\nDec,80610000,73880000,45180000,122\nJan,83310000,75740000,42390000,125\nFeb,86380000,77610000,40340000,119\nMar,89180000,80590000,39120000,118\n` },
    { name: "March 2025 — Utilisation by Grade",  type: "People",    updated: "Today", filename: "mar2025_utilisation_grade.csv",   csv: `Grade,Actual %,Target %,Variance pp\nPartner,56.9,55.0,+1.9\nDirector,65.8,65.0,+0.8\nSr. Manager,73.1,72.0,+1.1\nManager,78.3,77.0,+1.3\nSr. Associate,80.4,80.0,+0.4\nAssociate,81.1,82.0,-0.9\n` },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Critical alerts", value: "2", color: "text-rose-700   dark:text-rose-400",   bg: "bg-rose-100   dark:bg-rose-500/10"   },
          { label: "Warnings",        value: "4", color: "text-amber-700  dark:text-amber-400",  bg: "bg-amber-100  dark:bg-amber-500/10"  },
          { label: "Intelligence",    value: "4", color: "text-indigo-700 dark:text-indigo-400", bg: "bg-indigo-100 dark:bg-indigo-500/10" },
        ].map(s => (
          <Card key={s.label} className="!p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
              <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.value} signals</p>
              <p className="text-xs text-slate-500 dark:text-white/35">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <SectionHeader title="Critical & warnings" sub="All exception signals — March 2025" badge="6 signals" />
        <div className="space-y-2.5">
          {alerts.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 w-20 shrink-0 pt-1">{s.area}</span>
              <div className="flex-1"><Signal type={s.type} title={s.title} detail={s.detail} /></div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Intelligence" sub="Opportunities and positive signals" />
        <div className="space-y-2.5">
          {info.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 w-20 shrink-0 pt-1">{s.area}</span>
              <div className="flex-1"><Signal type={s.type} title={s.title} detail={s.detail} /></div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Available reports" sub="Auto-generated · updated daily from source systems" badge={`${reports.length} reports`} />
        <div className="space-y-2.5">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] transition-all hover:bg-white dark:hover:bg-white/[0.04] hover:shadow-sm">
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
   NAV CONFIG
───────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: "Overview",   icon: BarChart2  },
  { label: "Financial",  icon: TrendingUp },
  { label: "Cash & WC",  icon: DollarSign },
  { label: "People",     icon: Users      },
  { label: "Alerts",     icon: Zap        },
];

const SECTION_HEADERS: Record<string, { title: string; sub: string }> = {
  "Overview":  { title: "Executive overview — March 2025",  sub: "BTG Advisory Group · CEO operating system"             },
  "Financial": { title: "Financial performance",            sub: "P&L, budget vs actual, service line breakdown"         },
  "Cash & WC": { title: "Cash & working capital",           sub: "Debtors aging, WIP balance, lockup days"               },
  "People":    { title: "People & utilisation",             sub: "Headcount, fee earners, utilisation by grade"          },
  "Alerts":    { title: "Alerts & exception monitoring",    sub: "All system-generated signals across the business"       },
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
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
            const isAlerts = item.label === "Alerts";
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
          <div className="px-3 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/[0.08] border border-indigo-100 dark:border-indigo-500/20">
            <p className="text-[9px] font-semibold text-indigo-500 dark:text-indigo-400/70 uppercase tracking-widest mb-0.5">Built by</p>
            <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Quantyx Advisory</p>
            <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">Bespoke system · Mar 2025</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white/60 transition-colors px-1"
          >
            <ArrowLeft size={12} />
            Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-60">

        {/* Top bar */}
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md ml-1">
              BTG
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8 max-w-[1440px]">
          {activeTab === "Overview"  && <OverviewSection  />}
          {activeTab === "Financial" && <FinancialSection />}
          {activeTab === "Cash & WC" && <CashSection      />}
          {activeTab === "People"    && <PeopleSection    />}
          {activeTab === "Alerts"    && <AlertsSection    />}

          <div className="text-center pt-10 pb-6">
            <p className="text-[11px] text-slate-400 dark:text-white/18">
              Built by{" "}
              <span className="text-indigo-600 dark:text-indigo-400/50 font-semibold">Quantyx Advisory</span>
              {" "}for BTG Advisory Group — high-confidence datasets only (ERP SunSystems + CRM). Low-quality sources excluded.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
