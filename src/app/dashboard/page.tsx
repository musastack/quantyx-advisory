"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line,
} from "recharts";
import {
  AlertCircle, Bell, Settings, ArrowLeft, TrendingUp, TrendingDown,
  Hammer, Users, FileText, BarChart2, Zap, AlertTriangle, CheckCircle2,
  Download, DollarSign, Package, UserCheck, ShieldAlert, Clock,
  ChevronRight, Activity,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

/* ─────────────────────────────────────────────
   MERIDIAN CONTRACTORS — DATASET
   £8.4m revenue · Commercial & residential electrical
───────────────────────────────────────────── */

const revenueData = [
  { month: "Oct", revenue: 99600,  gp: 38800, margin: 38.9 },
  { month: "Nov", revenue: 102800, gp: 39100, margin: 38.0 },
  { month: "Dec", revenue: 101000, gp: 37200, margin: 36.8 },
  { month: "Jan", revenue: 115200, gp: 43800, margin: 38.0 },
  { month: "Feb", revenue: 131700, gp: 48500, margin: 36.8 },
  { month: "Mar", revenue: 151600, gp: 54500, margin: 35.9 },
  { month: "Apr", revenue: 163700, gp: 57400, margin: 35.1 },
];

const cashFlowData = [
  { week: "03 Mar", inflow: 84200,  outflow: 91400,  balance: 142600 },
  { week: "10 Mar", inflow: 112400, outflow: 78900,  balance: 176100 },
  { week: "17 Mar", inflow: 67800,  outflow: 94200,  balance: 149700 },
  { week: "24 Mar", inflow: 143200, outflow: 88700,  balance: 204200 },
  { week: "31 Mar", inflow: 58400,  outflow: 102100, balance: 160500 },
  { week: "07 Apr", inflow: 91700,  outflow: 86300,  balance: 165900 },
  { week: "14 Apr", inflow: 48200,  outflow: 97800,  balance: 116300 },
  { week: "21 Apr", inflow: 134500, outflow: 89200,  balance: 161600 },
];

const customers = [
  { name: "Avonside Commercial",  revenue: 312400, gp: 118700, margin: 38.0, jobs: 14, wip: 49200,  overdue: 0,     pct: 37.1, risk: "low"    as const },
  { name: "Hartley Council",      revenue: 198600, gp: 61600,  margin: 31.0, jobs: 8,  wip: 53800,  overdue: 18400, pct: 23.6, risk: "medium" as const },
  { name: "Metro Property Group", revenue: 142100, gp: 56800,  margin: 40.0, jobs: 6,  wip: 26100,  overdue: 6100,  pct: 16.9, risk: "low"    as const },
  { name: "Barton Industrial",    revenue: 98400,  gp: 27600,  margin: 28.1, jobs: 5,  wip: 37200,  overdue: 0,     pct: 11.7, risk: "high"   as const },
  { name: "Prestige Retail",      revenue: 74200,  gp: 22300,  margin: 30.1, jobs: 4,  wip: 6200,   overdue: 31200, pct: 8.8,  risk: "high"   as const },
  { name: "Quantum Workspace",    revenue: 15800,  gp: 5800,   margin: 36.7, jobs: 1,  wip: 33100,  overdue: 0,     pct: 1.9,  risk: "low"    as const },
];

const invoices = [
  { id: "INV-0341", client: "Hartley Council",      job: "#2839", amount: 18400, issued: "03 Mar", due: "02 Apr", status: "overdue" as const, age: 38   },
  { id: "INV-0339", client: "Prestige Retail",       job: "#2826", amount: 31200, issued: "14 Feb", due: "16 Mar", status: "overdue" as const, age: 52   },
  { id: "INV-0344", client: "Metro Property Group",  job: "#2831", amount: 6100,  issued: "14 Mar", due: "13 Apr", status: "overdue" as const, age: 27   },
  { id: "INV-0348", client: "Avonside Commercial",   job: "#2837", amount: 9750,  issued: "21 Mar", due: "20 Apr", status: "pending" as const, age: null },
  { id: "INV-0351", client: "Barton Industrial",     job: "#2842", amount: 22300, issued: "28 Mar", due: "27 Apr", status: "pending" as const, age: null },
  { id: "INV-0354", client: "Quantum Workspace",     job: "#2846", amount: 14800, issued: "01 Apr", due: "01 May", status: "pending" as const, age: null },
  { id: "INV-0356", client: "Avonside Commercial",   job: "#2847", amount: 47100, issued: "10 Apr", due: "10 May", status: "draft"   as const, age: null },
  { id: "INV-0338", client: "Metro Property Group",  job: "#2820", amount: 54700, issued: "07 Feb", due: "09 Mar", status: "paid"    as const, age: null },
];

const jobs = [
  { id: "#2841", client: "Avonside Commercial",  name: "Office Fit-Out — Block C",     crew: "Crew A", status: "on-track" as const, pct: 78,  budget: 64000,  actual: 49200, due: "14 Apr", flag: null,                              margin: 38.2 },
  { id: "#2847", client: "Avonside Commercial",  name: "Warehouse Structural Refurb",  crew: "Crew B", status: "complete" as const, pct: 100, budget: 48500,  actual: 47100, due: "10 Apr", flag: null,                              margin: 35.1 },
  { id: "#2851", client: "Hartley Council",       name: "Civic Centre Renovation",      crew: "Crew C", status: "at-risk"  as const, pct: 43,  budget: 112000, actual: 53800, due: "02 May", flag: "Labour 11% over estimate",         margin: 29.4 },
  { id: "#2855", client: "Metro Property Group",  name: "Residential Block — Phase 2", crew: "Crew A", status: "on-track" as const, pct: 29,  budget: 87000,  actual: 26100, due: "28 May", flag: null,                              margin: 41.2 },
  { id: "#2859", client: "Prestige Retail",       name: "High Street Unit Refit",       crew: "Sub 1",  status: "delayed"  as const, pct: 15,  budget: 31000,  actual: 6200,  due: "19 Apr", flag: "Site access delayed",              margin: 22.1 },
  { id: "#2863", client: "Quantum Workspace",     name: "Rooftop Extension — M1",       crew: "Crew D", status: "on-track" as const, pct: 62,  budget: 54000,  actual: 33100, due: "24 Apr", flag: null,                              margin: 37.8 },
  { id: "#2867", client: "Barton Industrial",     name: "Factory Mezzanine Install",    crew: "Crew D", status: "at-risk"  as const, pct: 88,  budget: 39000,  actual: 37200, due: "13 Apr", flag: "Materials shortage — steel brackets", margin: 19.2 },
];

const crews = [
  { name: "Crew A", lead: "D. Hartley", jobs: 7, hours: 174, capacity: 200, pct: 87, status: "available"     as const },
  { name: "Crew B", lead: "R. Osei",    jobs: 6, hours: 188, capacity: 200, pct: 94, status: "near-capacity" as const },
  { name: "Crew C", lead: "M. Patel",   jobs: 5, hours: 151, capacity: 200, pct: 76, status: "available"     as const },
  { name: "Crew D", lead: "S. Nwosu",   jobs: 8, hours: 196, capacity: 200, pct: 98, status: "overallocated" as const },
];

const materials = [
  { material: "Structural Steel — I-Beams",  job: "#2851", committed: 28400, estimate: 24100, variance: 17.8, severity: "over"        as const },
  { material: "Steel Brackets & Fixings",    job: "#2867", committed: 5100,  estimate: 5100,  variance: 0,    severity: "supply-risk" as const },
  { material: "Concrete Block & Mortar",     job: "#2863", committed: 9800,  estimate: 9200,  variance: 6.5,  severity: "watch"       as const },
  { material: "Plasterboard & Insulation",   job: "#2841", committed: 7600,  estimate: 7100,  variance: 7.0,  severity: "watch"       as const },
];

const stockAtRisk = [
  { sku: "STL-I-200",  name: "Structural I-Beams (200mm)",  value: 38400, days: 94, status: "critical" as const },
  { sku: "CBL-3C-100", name: "3-Core Cable (100m rolls)",   value: 17600, days: 67, status: "watch"    as const },
  { sku: "DIS-32A",    name: "32A Distribution Boards",     value: 9800,  days: 45, status: "watch"    as const },
  { sku: "CON-BLOCK",  name: "Concrete Blocks (20kg bags)", value: 6200,  days: 38, status: "monitor"  as const },
];

const reports = [
  { name: "April 2026 — P&L Summary",         type: "Financial",  updated: "Today",  filename: "apr2026_pl_summary.csv",       csv: `Category,Amount (£)\nRevenue,163700\nCost of Sales,106300\nGross Profit,57400\nOperating Expenses,28100\nEBITDA,29300\n` },
  { name: "Q1 2026 — Crew Utilisation",        type: "Labour",     updated: "01 Apr", filename: "q1_2026_crew_utilisation.csv", csv: `Crew,Hours,Capacity,Utilisation %\nCrew A,174,200,87\nCrew B,188,200,94\nCrew C,151,200,76\nCrew D,196,200,98\n` },
  { name: "April 2026 — Job Profitability",    type: "Operations", updated: "Today",  filename: "apr2026_job_profitability.csv",csv: `Job ID,Client,Budget (£),Actual (£),Margin %\n#2841,Avonside Commercial,64000,49200,38.2\n#2851,Hartley Council,112000,53800,29.4\n#2867,Barton Industrial,39000,37200,19.2\n` },
  { name: "April 2026 — Invoice Ageing",       type: "Finance",    updated: "Today",  filename: "apr2026_invoice_ageing.csv",   csv: `Invoice,Client,Amount (£),Days Overdue,Status\nINV-0341,Hartley Council,18400,38,Overdue\nINV-0339,Prestige Retail,31200,52,Overdue\nINV-0344,Metro Property Group,6100,27,Overdue\n` },
  { name: "April 2026 — Customer Margin",      type: "Commercial", updated: "Today",  filename: "apr2026_customer_margin.csv",  csv: `Client,Revenue (£),GP (£),Margin %\nAvonside Commercial,312400,118700,38.0\nHartley Council,198600,61600,31.0\nBarton Industrial,98400,27600,28.1\n` },
];

/* 4-week cash forecast
   Base: overdue collected w/e 28 Apr
   Downside: overdue remains unpaid (£49.6k gap maintained) */
const cashForecastData = [
  { week: "21 Apr",  base: 161600, downside: 161600 },
  { week: "28 Apr",  base: 197000, downside: 147400 },
  { week: "05 May",  base: 213200, downside: 163600 },
  { week: "12 May",  base: 209300, downside: 159700 },
  { week: "19 May",  base: 256200, downside: 206600 },
];

/* Projected final margin on at-risk jobs */
const jobOutlook = [
  { id: "#2851", name: "Civic Centre Renovation",  client: "Hartley Council",   current: 29.4, projLow: 24, projHigh: 27, driver: "Labour overrun — £8–12k above estimate at current burn rate", pct: 43  },
  { id: "#2859", name: "High Street Unit Refit",    client: "Prestige Retail",   current: 22.1, projLow: 14, projHigh: 18, driver: "Prelim costs accumulating daily — delay unresolved, VO not agreed", pct: 15 },
  { id: "#2867", name: "Factory Mezzanine Install", client: "Barton Industrial", current: 19.2, projLow: 16, projHigh: 19, driver: "Steel bracket shortage — £3–5k additional cost likely before close", pct: 88 },
];

/* ─────────────────────────────────────────────
   STATUS MAPS
───────────────────────────────────────────── */

const JOB_STATUS = {
  "on-track": { label: "On track",  pill: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/25", bar: "bg-emerald-500", row: "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]" },
  "at-risk":  { label: "At risk",   pill: "text-amber-700  bg-amber-100  border-amber-200  dark:text-amber-400  dark:bg-amber-500/10  dark:border-amber-500/25",  bar: "bg-amber-500",   row: "border-amber-200 bg-amber-50 dark:border-amber-500/15 dark:bg-amber-500/[0.025]" },
  "delayed":  { label: "Delayed",   pill: "text-rose-700   bg-rose-100   border-rose-200   dark:text-rose-400   dark:bg-rose-500/10   dark:border-rose-500/25",   bar: "bg-rose-500",    row: "border-rose-200  bg-rose-50  dark:border-rose-500/15  dark:bg-rose-500/[0.025]"  },
  "complete": { label: "Complete",  pill: "text-indigo-700 bg-indigo-100 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/25", bar: "bg-indigo-500",  row: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/[0.04]" },
};

const CREW_STATUS = {
  "available":     { label: "Available",     pill: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20", bar: "bg-emerald-500", value: "text-emerald-700 dark:text-emerald-300" },
  "near-capacity": { label: "Near capacity", pill: "text-amber-700   bg-amber-100   border-amber-200   dark:text-amber-400   dark:bg-amber-500/10   dark:border-amber-500/20",   bar: "bg-amber-500",   value: "text-amber-700   dark:text-amber-300"   },
  "overallocated": { label: "Overallocated", pill: "text-rose-700    bg-rose-100    border-rose-200    dark:text-rose-400    dark:bg-rose-500/10    dark:border-rose-500/20",    bar: "bg-rose-500",    value: "text-rose-700    dark:text-rose-300"    },
};

const INV_STATUS = {
  "overdue": { label: "Overdue", pill: "text-rose-700   bg-rose-100   border-rose-200   dark:text-rose-300   dark:bg-rose-500/15   dark:border-rose-500/20",   row: "border-rose-200  bg-rose-50  dark:border-rose-500/15"  },
  "pending": { label: "Pending", pill: "text-amber-700  bg-amber-100  border-amber-200  dark:text-amber-300  dark:bg-amber-500/15  dark:border-amber-500/20",  row: "border-slate-200 bg-white     dark:border-white/[0.07]" },
  "draft":   { label: "Draft",   pill: "text-slate-500  bg-slate-100  border-slate-200  dark:text-white/40   dark:bg-white/10      dark:border-white/10",       row: "border-slate-200 bg-white     dark:border-white/[0.07]" },
  "paid":    { label: "Paid",    pill: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-500/15 dark:border-emerald-500/20", row: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/10" },
};

const CUST_RISK = {
  "low":    { label: "Low risk",  pill: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20" },
  "medium": { label: "Watch",     pill: "text-amber-700   bg-amber-100   border-amber-200   dark:text-amber-400   dark:bg-amber-500/10   dark:border-amber-500/20"   },
  "high":   { label: "Attention", pill: "text-rose-700    bg-rose-100    border-rose-200    dark:text-rose-400    dark:bg-rose-500/10    dark:border-rose-500/20"    },
};

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

function KpiCard({ label, value, sub, change, up, icon: Icon, color, bg, glow }: {
  label: string; value: string; sub: string; change: string; up: boolean;
  icon: React.ElementType; color: string; bg: string; glow: string;
}) {
  return (
    <Card className={`!p-6 ${glow}`}>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">{label}</p>
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
          <Icon size={17} className={color} />
        </div>
      </div>
      <p className="text-[2rem] font-bold tracking-tight mb-2 text-slate-900 dark:text-white font-mono leading-none">{value}</p>
      <div className="flex items-center gap-1.5 mb-1">
        {up
          ? <TrendingUp  size={11} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
          : <TrendingDown size={11} className="text-rose-500 dark:text-rose-400 shrink-0" />
        }
        <span className={`text-xs font-medium ${up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{change}</span>
      </div>
      <p className="text-[11px] text-slate-400 dark:text-white/25">{sub}</p>
    </Card>
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
   TAB SECTIONS
───────────────────────────────────────────── */

function OverviewSection() {
  const overdue      = invoices.filter(i => i.status === "overdue");
  const overdueTotal = overdue.reduce((s, i) => s + i.amount, 0);
  const atRisk       = jobs.filter(j => j.status === "at-risk" || j.status === "delayed").length;
  const avgMargin    = revenueData[revenueData.length - 1].margin.toFixed(1);
  const cashBalance  = cashFlowData[cashFlowData.length - 1].balance;
  const wipTotal     = customers.reduce((s, c) => s + c.wip, 0);
  const stockRisk    = stockAtRisk.filter(s => s.days >= 60).reduce((a, s) => a + s.value, 0);

  return (
    <div className="space-y-6">

      {/* 6-KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard label="Cash balance"        value={`£${(cashBalance/1000).toFixed(0)}k`}      change="–£4.6k vs last week"  up={false} icon={DollarSign}   color="text-indigo-600 dark:text-indigo-400"  bg="bg-indigo-100 dark:bg-indigo-500/10"  glow="glow-indigo" sub="as of 21 Apr" />
        <KpiCard label="Overdue receivables" value={`£${(overdueTotal/1000).toFixed(0)}k`}     change={`${overdue.length} invoices open`} up={false} icon={AlertCircle}  color="text-rose-600 dark:text-rose-400"     bg="bg-rose-100 dark:bg-rose-500/10"     glow="glow-rose"   sub={`oldest: ${Math.max(...overdue.map(i=>i.age??0))} days`} />
        <KpiCard label="Gross margin"        value={`${avgMargin}%`}                            change="–0.8pp vs last month" up={false} icon={TrendingDown}  color="text-violet-600 dark:text-violet-400" bg="bg-violet-100 dark:bg-violet-500/10" glow=""            sub="Apr 2026 · declining" />
        <KpiCard label="Jobs at risk"        value={`${atRisk}`}                                change="of 7 active jobs"     up={false} icon={ShieldAlert}  color="text-amber-600 dark:text-amber-400"   bg="bg-amber-100 dark:bg-amber-500/10"   glow="glow-amber"  sub="delayed or over budget" />
        <KpiCard label="Unbilled WIP"        value={`£${(wipTotal/1000).toFixed(0)}k`}         change="across 6 active jobs" up={false} icon={FileText}     color="text-sky-600 dark:text-sky-400"       bg="bg-sky-100 dark:bg-sky-500/10"       glow=""            sub="invoiceable pipeline" />
        <KpiCard label="Stock at risk"       value={`£${(stockRisk/1000).toFixed(0)}k`}        change="items >60 days idle"  up={false} icon={Package}      color="text-orange-600 dark:text-orange-400" bg="bg-orange-100 dark:bg-orange-500/10" glow=""            sub="review and reallocate" />
      </div>

      {/* Revenue chart */}
      <Card>
        <SectionHeader title="Revenue and gross margin" sub="Oct 2025 – Apr 2026 · Meridian Contractors Ltd" />
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="gpGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10b981" stopOpacity={0.14} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v/1000).toFixed(0)}k`} width={44} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" name="Revenue" />
            <Area type="monotone" dataKey="gp"      stroke="#10b981" strokeWidth={2} fill="url(#gpGrad)"  name="Gross profit" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-5 mt-3 text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" />Revenue</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Gross profit</span>
        </div>
      </Card>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* What needs attention */}
        <Card className="lg:col-span-1">
          <SectionHeader title="What needs attention" sub="Exception signals — this week" badge="Live" />
          <div className="space-y-2.5">
            <Signal type="alert"
              title={`£${(overdueTotal/1000).toFixed(0)}k overdue — ${overdue.length} invoices unpaid`}
              detail="INV-0339 (Prestige Retail) is 52 days overdue. INV-0341 (Hartley Council) at 38 days. Combined: £49.6k."
              action="Review receivables" />
            <Signal type="alert"
              title="Crew D overallocated — 196 hrs across 8 jobs"
              detail="At 98% capacity. Two jobs (#2867, #2863) at risk of slipping before week end."
              action="Replan crew" />
            <Signal type="warning"
              title="Gross margin declining — down 3.8pp since October"
              detail="Three jobs below 30% margin are compressing the blended rate. Volume growth is masking the deterioration." />
            <Signal type="warning"
              title="£38.4k of stock idle for 90+ days — structural I-beams"
              detail="STL-I-200 unallocated since procurement in Jan. Tied-up working capital with no current demand signal." />
            <Signal type="warning"
              title="Receipts w/e 14 Apr: £48.2k vs £97.8k outflows"
              detail="Cash balance fell to 8-week low (£116.3k). Collecting INV-0339 and INV-0341 this week adds £49.6k." />
            <Signal type="info"
              title="£47.1k completed work not yet invoiced — Avonside"
              detail="Job #2847 complete. Draft INV-0356 ready to raise. Invoicing now improves month-end cash position."
              action="Raise invoice" />
            <Signal type="info"
              title="Avonside at 37.1% of revenue — concentration risk"
              detail="Single client accounts for over a third of YTD revenue. No performance issues, but dependency is high." />
          </div>
        </Card>

        {/* Cash trend */}
        <Card className="lg:col-span-2">
          <SectionHeader title="Cash balance — rolling 8 weeks" sub="Weekly position · bank account view" />
          <ResponsiveContainer width="100%" height={195}>
            <LineChart data={cashFlowData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="week" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v/1000).toFixed(0)}k`} width={48} />
              <Tooltip content={<ChartTooltip />} />
              <Line type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 3 }} name="Cash balance" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/[0.05] flex items-start gap-2.5">
            <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-700 dark:text-amber-300/80 leading-relaxed">Balance dropped to £116k w/e 14 Apr — lowest in 8 weeks. Outflows exceeded inflows by £49.6k. Collecting INV-0339 and INV-0341 this week would recover £49.6k.</p>
          </div>
        </Card>

      </div>
    </div>
  );
}

function CashSection() {
  const overdue      = invoices.filter(i => i.status === "overdue");
  const pending      = invoices.filter(i => i.status === "pending");
  const overdueTotal = overdue.reduce((s, i) => s + i.amount, 0);
  const pendingTotal = pending.reduce((s, i) => s + i.amount, 0);
  const wipTotal     = customers.reduce((s, c) => s + c.wip, 0);
  const debtorDays   = Math.round((overdueTotal / (163700 / 30)));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Overdue",       value: `£${(overdueTotal/1000).toFixed(1)}k`, sub: `${overdue.length} invoices`,  color: "text-rose-700   dark:text-rose-400",   border: "border-rose-200   dark:border-rose-500/20",   bg: "bg-rose-50    dark:bg-white/[0.025]" },
          { label: "Pending",       value: `£${(pendingTotal/1000).toFixed(1)}k`, sub: `${pending.length} invoices`,  color: "text-amber-700  dark:text-amber-400",  border: "border-slate-200  dark:border-white/[0.07]",  bg: "bg-white      dark:bg-white/[0.025]" },
          { label: "WIP unbilled",  value: `£${(wipTotal/1000).toFixed(1)}k`,     sub: "across active jobs",          color: "text-violet-700 dark:text-violet-400", border: "border-slate-200  dark:border-white/[0.07]",  bg: "bg-white      dark:bg-white/[0.025]" },
          { label: "Debtor days",   value: `${debtorDays}d`,                      sub: "vs 30-day terms",             color: "text-indigo-700 dark:text-indigo-300", border: "border-indigo-200 dark:border-indigo-500/20", bg: "bg-indigo-50  dark:bg-white/[0.025]" },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <Card>
        <SectionHeader title="Weekly cash flow" sub="Inflow vs outflow · 8-week view" />
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={cashFlowData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="week" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v/1000).toFixed(0)}k`} width={48} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="inflow"  fill="#6366f1" radius={[3,3,0,0]} name="Inflow"  />
            <Bar dataKey="outflow" fill="#f43f5e" radius={[3,3,0,0]} name="Outflow" opacity={0.7} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-5 mt-3 text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" />Inflow</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" />Outflow</span>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Invoice register" sub="Sorted by urgency — overdue first" />
        <div className="space-y-2">
          {[...invoices].sort((a,b) => { const o={overdue:0,pending:1,draft:2,paid:3}; return o[a.status]-o[b.status]; }).map(inv => {
            const s = INV_STATUS[inv.status];
            return (
              <div key={inv.id} className={`flex items-center gap-4 p-3.5 rounded-xl border ${s.row}`}>
                <p className="text-xs font-mono text-slate-400 dark:text-white/40 w-20 shrink-0">{inv.id}</p>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">{inv.client}</p>
                  <p className="text-xs text-slate-500 dark:text-white/35">{inv.job} · Due {inv.due}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold font-mono text-slate-900 dark:text-white">£{inv.amount.toLocaleString("en-GB")}</p>
                  {inv.age && <p className="text-[11px] text-rose-600 dark:text-rose-400">{inv.age}d overdue</p>}
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border shrink-0 ${s.pill}`}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4-week cash forecast */}
      <Card>
        <SectionHeader title="4-week cash forecast" sub="Projected balance — base case vs downside if overdue remains unpaid" badge="Forecast" />
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={cashForecastData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="week" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `£${(v/1000).toFixed(0)}k`} width={48} />
            <Tooltip content={<ChartTooltip />} />
            <Line type="monotone" dataKey="base"     stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 3 }} name="Base case" />
            <Line type="monotone" dataKey="downside" stroke="#f43f5e" strokeWidth={1.5} strokeDasharray="5 3" dot={{ fill: "#f43f5e", r: 2 }} name="Downside" />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-3 mb-4 text-[11px] text-slate-500 dark:text-white/35">
          <span className="flex items-center gap-1.5"><span className="inline-block w-5 h-0.5 bg-indigo-500 rounded" />Base — overdue collected w/e 28 Apr</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-5 h-px bg-rose-500 rounded" style={{ borderTop: "2px dashed" }} />Downside — overdue unpaid</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/[0.05]">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400/70 mb-1.5">Base case — 19 May close</p>
            <p className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-300">£256.2k</p>
            <p className="text-[11px] text-slate-500 dark:text-white/35 mt-0.5">Overdue collected + normal trading</p>
          </div>
          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/[0.05]">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400/70 mb-1.5">Downside — 19 May close</p>
            <p className="text-xl font-bold font-mono text-rose-700 dark:text-rose-300">£206.6k</p>
            <p className="text-[11px] text-slate-500 dark:text-white/35 mt-0.5">£49.6k gap if overdue stays unpaid</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
            <p className="text-slate-400 dark:text-white/30 mb-1">Expected receipts — this week</p>
            <p className="font-bold font-mono text-slate-800 dark:text-white">£32,050</p>
            <p className="text-slate-400 dark:text-white/25 text-[10px] mt-0.5">INV-0348 (£9.8k) + INV-0351 (£22.3k)</p>
          </div>
          <div className="p-3 rounded-lg border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/[0.04]">
            <p className="text-slate-400 dark:text-white/30 mb-1">Overdue recoverable if chased</p>
            <p className="font-bold font-mono text-indigo-700 dark:text-indigo-300">£49,600</p>
            <p className="text-slate-400 dark:text-white/25 text-[10px] mt-0.5">INV-0339 (£31.2k) + INV-0341 (£18.4k)</p>
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Cash risk signals" sub="Automated exception monitoring" badge="System" />
        <div className="space-y-2.5">
          <Signal type="alert"   title="INV-0339 — Prestige Retail, 52 days overdue (£31,200)" detail="Exceeds 45-day escalation threshold. Auto-chaser sent. Recommend direct contact — site delay dispute may complicate collection." />
          <Signal type="alert"   title="INV-0341 — Hartley Council, 38 days overdue (£18,400)" detail="Public sector client — payment terms 30 days. PO confirmation outstanding. Query raised, awaiting finance team response." />
          <Signal type="warning" title="Cash balance at 8-week low — £116.3k (w/e 14 Apr)"     detail="Outflows exceeded inflows by £49.6k. Recovery expected if overdue invoices collected this week." />
          <Signal type="warning" title="Late payment concentration — 55.8% of overdue from one client" detail="Prestige Retail accounts for £31.2k of £55.7k total overdue. Single-client debt risk elevated." />
          <Signal type="info"    title="£165.2k WIP eligible for invoicing across 4 jobs"       detail="Raising these now would materially improve the month-end cash position and reduce WIP exposure." />
        </div>
      </Card>
    </div>
  );
}

function MarginSection() {
  const latestMargin  = revenueData[revenueData.length-1].margin;
  const firstMargin   = revenueData[0].margin;
  const marginDelta   = (latestMargin - firstMargin).toFixed(1);
  const lowMarginJobs = jobs.filter(j => j.margin < 30);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Apr revenue",      value: "£163,700", sub: "+8.0% vs Mar",           color: "text-slate-900 dark:text-white",         border: "border-slate-200 dark:border-white/[0.07]", bg: "bg-white dark:bg-white/[0.025]" },
          { label: "Apr gross profit", value: "£57,400",  sub: "+5.3% vs Mar",           color: "text-emerald-700 dark:text-emerald-300", border: "border-slate-200 dark:border-white/[0.07]", bg: "bg-white dark:bg-white/[0.025]" },
          { label: "Apr gross margin", value: `${latestMargin}%`, sub: `${marginDelta}pp since Oct · declining`, color: "text-rose-600 dark:text-rose-400", border: "border-rose-200 dark:border-rose-500/20", bg: "bg-rose-50 dark:bg-white/[0.025]" },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <Card>
        <SectionHeader title="Gross margin trend" sub="Oct 2025 – Apr 2026 · monthly" />
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[30,45]} tickFormatter={v => `${v}%`} width={40} />
            <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
            <Line type="monotone" dataKey="margin" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 3 }} name="Margin %" />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-[11px] text-rose-600 dark:text-rose-400/80 mt-3 flex items-center gap-1.5"><AlertTriangle size={11} className="shrink-0" /> Margin has compressed –3.8pp since Oct. Three low-margin jobs are the primary driver.</p>
      </Card>

      <Card>
        <SectionHeader title="Margin leaks — jobs below 35% gross margin" sub={`${lowMarginJobs.length} jobs flagged — ranked by severity`} badge="Exception" />
        <div className="space-y-3">
          {jobs.filter(j => j.margin < 35).sort((a,b) => a.margin - b.margin).map(job => {
            const costPct = Math.round((job.actual / job.budget) * 100);
            return (
              <div key={job.id} className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
                <div className="flex items-center justify-between gap-4 mb-2.5">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{job.name}</p>
                    <p className="text-xs text-slate-500 dark:text-white/35">{job.client} · {job.id}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xl font-bold font-mono ${job.margin < 25 ? "text-rose-600 dark:text-rose-400" : "text-amber-600 dark:text-amber-400"}`}>{job.margin}%</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/30">gross margin</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div><p className="text-slate-400 dark:text-white/30">Budget</p><p className="font-semibold text-slate-800 dark:text-white">£{job.budget.toLocaleString("en-GB")}</p></div>
                  <div><p className="text-slate-400 dark:text-white/30">Actual</p><p className="font-semibold text-slate-800 dark:text-white">£{job.actual.toLocaleString("en-GB")}</p></div>
                  <div><p className="text-slate-400 dark:text-white/30">Cost burn</p><p className={`font-semibold ${costPct > 90 ? "text-rose-600 dark:text-rose-400" : "text-slate-800 dark:text-white"}`}>{costPct}%</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Job margin outlook */}
      <Card>
        <SectionHeader title="Job margin outlook" sub="Projected final margin on flagged jobs — at current run-rate" badge="Forward view" />
        <div className="space-y-3">
          {jobOutlook.map(j => (
            <div key={j.id} className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
              <div className="flex items-start justify-between gap-4 mb-2.5">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{j.name}</p>
                  <p className="text-xs text-slate-500 dark:text-white/35">{j.client} · {j.id} · {j.pct}% complete</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mb-0.5">Now</p>
                    <p className={`text-sm font-bold font-mono ${j.current < 25 ? "text-rose-600 dark:text-rose-400" : "text-amber-600 dark:text-amber-400"}`}>{j.current}%</p>
                  </div>
                  <span className="text-slate-300 dark:text-white/15 text-lg">→</span>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mb-0.5">Projected</p>
                    <p className={`text-sm font-bold font-mono ${j.projHigh < 20 ? "text-rose-600 dark:text-rose-400" : "text-amber-600 dark:text-amber-400"}`}>{j.projLow}–{j.projHigh}%</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <AlertTriangle size={11} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 dark:text-white/40 leading-snug">{j.driver}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 dark:text-white/25 mt-4">Projections based on current cost burn rate and known risk factors. Subject to variation order outcomes and site conditions.</p>
      </Card>

      <Card>
        <SectionHeader title="Margin intelligence" sub="System-generated signals" badge="System" />
        <div className="space-y-2.5">
          <Signal type="alert"   title="Job #2867 — Factory Mezzanine at 19.2% margin"    detail="Steel bracket shortage adding cost. 88% complete. Risk of further slippage — variation order not yet agreed with client." />
          <Signal type="alert"   title="Job #2859 — Prestige Retail at 22.1% margin"       detail="Site access delays adding unbudgeted prelim costs. Client yet to agree variation order covering delay costs." />
          <Signal type="warning" title="Blended margin down –3.8pp since Oct 2025"         detail="Volume growth is masking margin erosion. Three jobs below 30% are compressing the overall rate month-on-month." />
          <Signal type="info"    title="Metro Property Group jobs averaging 40.6% margin"  detail="Highest-margin client with no overdue debt. Prioritising capacity allocation here would improve the blended rate." />
        </div>
      </Card>
    </div>
  );
}

function OperationsSection() {
  const atRisk  = jobs.filter(j => j.status === "at-risk" || j.status === "delayed").length;
  const onTrack = jobs.filter(j => j.status === "on-track").length;
  const done    = jobs.filter(j => j.status === "complete").length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "On track",          value: onTrack, color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-500/10" },
          { label: "At risk / delayed", value: atRisk,  color: "text-rose-700    dark:text-rose-400",    bg: "bg-rose-100    dark:bg-rose-500/10"    },
          { label: "Complete",          value: done,    color: "text-indigo-700  dark:text-indigo-400",  bg: "bg-indigo-100  dark:bg-indigo-500/10"  },
        ].map(s => (
          <Card key={s.label} className="!p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
              <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.value} jobs</p>
              <p className="text-xs text-slate-500 dark:text-white/35">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <SectionHeader title="Active job tracker" sub={`${jobs.length} jobs · sorted by risk`} />
        <div className="space-y-2.5">
          {[...jobs].sort((a,b) => { const o={"delayed":0,"at-risk":1,"on-track":2,"complete":3}; return (o[a.status]??3)-(o[b.status]??3); }).map(job => {
            const s = JOB_STATUS[job.status];
            const costPct = Math.round((job.actual / job.budget) * 100);
            return (
              <div key={job.id} className={`p-4 rounded-xl border ${s.row}`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono text-slate-400 dark:text-white/35 shrink-0">{job.id}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">{job.name}</p>
                      <p className="text-xs text-slate-500 dark:text-white/40">{job.client} · {job.crew}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${s.pill}`}>{s.label}</span>
                    <span className={`text-xs font-mono font-semibold ${job.margin < 28 ? "text-rose-600 dark:text-rose-400" : "text-slate-600 dark:text-white/50"}`}>{job.margin}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] text-slate-400 dark:text-white/35 mb-1"><span>Progress</span><span>{job.pct}%</span></div>
                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10">
                      <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${job.pct}%` }} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold font-mono text-slate-700 dark:text-white/70">£{job.actual.toLocaleString("en-GB")} <span className="text-slate-400 dark:text-white/25 font-normal">/ £{job.budget.toLocaleString("en-GB")}</span></p>
                    <p className="text-[10px] text-slate-400 dark:text-white/30">cost vs budget ({costPct}%)</p>
                  </div>
                </div>
                {job.flag && <div className="mt-2.5 flex items-center gap-2 text-[11px] text-amber-700 dark:text-amber-300/80"><AlertTriangle size={11} className="shrink-0 text-amber-500" />{job.flag}</div>}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <SectionHeader title="Crew capacity" sub="Current week · 200 hrs per crew" />
          <div className="space-y-4">
            {crews.map(crew => {
              const s = CREW_STATUS[crew.status];
              return (
                <div key={crew.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{crew.name}</span>
                      <span className="text-xs text-slate-400 dark:text-white/30">{crew.lead}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold font-mono ${s.value}`}>{crew.pct}%</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.pill}`}>{s.label}</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10">
                    <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${Math.min(crew.pct, 100)}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1">{crew.hours} hrs · {crew.jobs} active jobs</p>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Materials flags" sub="Cost variances and supply risks" />
          <div className="space-y-3">
            {materials.map((m, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{m.material}</p>
                    <p className="text-[11px] text-slate-400 dark:text-white/35">{m.job}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${
                    m.severity === "over" ? "text-rose-700 bg-rose-100 border-rose-200 dark:text-rose-300 dark:bg-rose-500/15 dark:border-rose-500/20" :
                    m.severity === "supply-risk" ? "text-violet-700 bg-violet-100 border-violet-200 dark:text-violet-300 dark:bg-violet-500/15 dark:border-violet-500/20" :
                    "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-300 dark:bg-amber-500/15 dark:border-amber-500/20"
                  }`}>{m.severity === "over" ? "Over budget" : m.severity === "supply-risk" ? "Supply risk" : "Watch"}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div><p className="text-slate-400 dark:text-white/30">Committed</p><p className="font-semibold font-mono text-slate-800 dark:text-white">£{m.committed.toLocaleString("en-GB")}</p></div>
                  <div><p className="text-slate-400 dark:text-white/30">Estimate</p><p className="font-semibold font-mono text-slate-800 dark:text-white">£{m.estimate.toLocaleString("en-GB")}</p></div>
                  <div><p className="text-slate-400 dark:text-white/30">Variance</p><p className={`font-semibold ${m.variance > 0 ? "text-rose-600 dark:text-rose-400" : "text-slate-600 dark:text-white/60"}`}>{m.variance > 0 ? `+${m.variance}%` : "—"}</p></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Stock at risk */}
      <Card>
        <SectionHeader title="Stock at risk — slow-moving inventory" sub="Items with no allocation or movement in 30+ days" badge="Exception" />
        <div className="space-y-2.5">
          {stockAtRisk.map((s, i) => (
            <div key={i} className={`flex items-center gap-4 p-3.5 rounded-xl border ${
              s.status === "critical" ? "border-rose-200 bg-rose-50 dark:border-rose-500/15 dark:bg-rose-500/[0.04]" :
              s.status === "watch" ? "border-amber-200 bg-amber-50 dark:border-amber-500/15 dark:bg-amber-500/[0.03]" :
              "border-slate-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.02]"
            }`}>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.name}</p>
                <p className="text-xs text-slate-500 dark:text-white/35">{s.sku} · {s.days} days without movement</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold font-mono text-slate-900 dark:text-white">£{s.value.toLocaleString("en-GB")}</p>
                <p className={`text-[11px] ${s.status === "critical" ? "text-rose-600 dark:text-rose-400" : "text-amber-600 dark:text-amber-400"}`}>{s.status === "critical" ? "Reallocate or return" : s.status === "watch" ? "Monitor" : "Low risk"}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Operational bottlenecks" sub="System-generated flags" badge="Live" />
        <div className="space-y-2.5">
          <Signal type="alert"   title="Crew D overallocated — 196 hrs, 8 active jobs"        detail="At 98% utilisation. Factory Mezzanine (#2867) at risk of slipping if no reallocation before end of week." />
          <Signal type="alert"   title="Job #2859 delayed — site access issue, 15% complete"  detail="Prestige Retail. Prelim costs accumulating daily. Variation order required to protect margin." />
          <Signal type="warning" title="Steel bracket shortage — 5-day lead time confirmed"    detail="Affects #2867. Factory Mezzanine completion date at risk. Alternative supplier not yet sourced." />
          <Signal type="warning" title="Job #2851 at 43% complete, labour already 11% over"   detail="Civic Centre Renovation. Current trajectory puts final cost £8–12k above budget." />
        </div>
      </Card>

      {/* Capacity and delivery outlook */}
      <Card>
        <SectionHeader title="Capacity and delivery outlook" sub="Forward risk signals — next 4 weeks" badge="Forecast" />
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {[
            { label: "Crew D — capacity eases",    value: "~24 Apr",   sub: "Jobs #2863 and #2867 closing",        color: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-500/20", bg: "bg-amber-50 dark:bg-amber-500/[0.04]" },
            { label: "Crew B — available from",    value: "~12 May",   sub: "#2847 complete, #2841 closing",       color: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-500/20", bg: "bg-emerald-50 dark:bg-emerald-500/[0.04]" },
            { label: "Invoicing backlog",           value: "£165k",     sub: "Unbilled — ready to raise now",      color: "text-violet-700 dark:text-violet-300", border: "border-violet-200 dark:border-violet-500/20", bg: "bg-violet-50 dark:bg-violet-500/[0.04]" },
            { label: "Stock reallocation window",  value: "by May",    sub: "I-beams — no demand signal beyond", color: "text-rose-700 dark:text-rose-300", border: "border-rose-200 dark:border-rose-500/20", bg: "bg-rose-50 dark:bg-rose-500/[0.04]" },
          ].map(s => (
            <div key={s.label} className={`p-4 rounded-xl border ${s.border} ${s.bg}`}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/30 mb-2">{s.label}</p>
              <p className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-slate-500 dark:text-white/35 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2.5">
          <Signal type="warning" title="Two jobs likely to slip past due date if Crew D not reallocated" detail="Jobs #2863 (due 24 Apr) and #2867 (due 13 Apr) both dependent on Crew D at 98% capacity. Completion risk is high." />
          <Signal type="info"    title="Invoicing backlog — £165k ready to bill this week"               detail="Four jobs are at or past the point where invoicing is appropriate. Clearing the backlog improves cash and reduces WIP risk." />
          <Signal type="info"    title="Steel I-beams — supplier return window closes end of May"         detail="£38.4k of unallocated stock. If no demand materialises by 31 May, return to supplier is recommended." />
        </div>
      </Card>
    </div>
  );
}

function CustomersSection() {
  const topClient     = customers[0];
  const concentration = topClient.pct.toFixed(1);
  const highRisk      = customers.filter(c => c.risk === "high");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Top client revenue share",  value: `${concentration}%`, sub: topClient.name,                color: "text-amber-600 dark:text-amber-400",  border: "border-amber-200 dark:border-amber-500/20",  bg: "bg-amber-50 dark:bg-white/[0.025]"  },
          { label: "Clients requiring action",  value: `${highRisk.length}`, sub: "overdue or below-margin",    color: "text-rose-600 dark:text-rose-400",    border: "border-rose-200 dark:border-rose-500/20",    bg: "bg-rose-50 dark:bg-white/[0.025]"   },
          { label: "Avg gross margin — blended", value: "34.8%",             sub: "across all clients · YTD",   color: "text-slate-900 dark:text-white",       border: "border-slate-200 dark:border-white/[0.07]",  bg: "bg-white dark:bg-white/[0.025]"     },
        ].map(s => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      <Card>
        <SectionHeader title="Client profitability — YTD" sub="Revenue, margin, WIP, and overdue exposure" />
        <div className="space-y-2.5">
          {customers.map((c, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">{i+1}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{c.name}</p>
                    <p className="text-xs text-slate-500 dark:text-white/35">{c.jobs} jobs · {c.pct}% of revenue</p>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${CUST_RISK[c.risk].pill}`}>{CUST_RISK[c.risk].label}</span>
              </div>
              <div className="grid grid-cols-4 gap-3 text-xs">
                <div><p className="text-slate-400 dark:text-white/30">Revenue</p><p className="font-semibold font-mono text-slate-800 dark:text-white">£{(c.revenue/1000).toFixed(0)}k</p></div>
                <div><p className="text-slate-400 dark:text-white/30">Gross profit</p><p className="font-semibold font-mono text-slate-800 dark:text-white">£{(c.gp/1000).toFixed(0)}k</p></div>
                <div><p className="text-slate-400 dark:text-white/30">Margin</p><p className={`font-semibold font-mono ${c.margin < 30 ? "text-rose-600 dark:text-rose-400" : c.margin >= 38 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-800 dark:text-white"}`}>{c.margin}%</p></div>
                <div><p className="text-slate-400 dark:text-white/30">Overdue</p><p className={`font-semibold font-mono ${c.overdue > 0 ? "text-rose-600 dark:text-rose-400" : "text-slate-400 dark:text-white/30"}`}>{c.overdue > 0 ? `£${(c.overdue/1000).toFixed(1)}k` : "—"}</p></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader title="Customers to chase" sub="Debt, risk, and concentration signals" badge="System" />
        <div className="space-y-2.5">
          <Signal type="alert"   title="Prestige Retail — £31,200 overdue, 52 days"            detail="Lowest-margin client (30.1%) and highest overdue exposure. Site delay dispute may affect collectability. Direct contact needed." action="Chase now" />
          <Signal type="alert"   title="Hartley Council — £18,400 overdue, 38 days"            detail="PO confirmation outstanding. £53.8k additional WIP at risk if not invoiced this week." action="Chase now" />
          <Signal type="warning" title="Barton Industrial — margin at 28.1%, below threshold"  detail="Second-lowest margin client. Factory Mezzanine has materials shortage — further margin deterioration likely before job closes." />
          <Signal type="warning" title="Avonside Commercial — 37.1% revenue concentration"     detail="Single client accounts for over a third of YTD revenue. No current issues — but dependency risk if relationship deteriorates." />
          <Signal type="info"    title="Metro Property Group — 40.0% margin, no overdue debt"  detail="Consistent high-margin performer. Prioritising capacity allocation here would improve the blended rate across the portfolio." />
        </div>
      </Card>
    </div>
  );
}

function AlertsSection() {
  const allSignals = [
    { type: "alert"   as const, area: "Cash",       title: "INV-0339 — Prestige Retail, 52 days overdue",            detail: "£31,200. Exceeds 45-day threshold. Direct contact required." },
    { type: "alert"   as const, area: "Operations", title: "Crew D overallocated — 196 hrs this week",               detail: "98% utilisation. 8 active jobs. Reallocation required." },
    { type: "alert"   as const, area: "Margin",     title: "Job #2867 — Factory Mezzanine at 19.2% gross margin",    detail: "88% complete. Steel shortage adding cost. Completion at risk." },
    { type: "alert"   as const, area: "Cash",       title: "INV-0341 — Hartley Council, 38 days overdue",            detail: "£18,400. PO confirmation outstanding." },
    { type: "warning" as const, area: "Margin",     title: "Gross margin down –3.8pp since October",                 detail: "Three jobs below 30% compressing the blended rate." },
    { type: "warning" as const, area: "Operations", title: "Job #2851 — labour 11% over estimate at 43% complete",   detail: "Civic Centre. Projected overrun £8–12k at current burn." },
    { type: "warning" as const, area: "Stock",      title: "£38.4k stock idle for 90+ days — I-beams unallocated",   detail: "STL-I-200 procured in Jan. No demand signal. Reallocation or return recommended." },
    { type: "warning" as const, area: "Customers",  title: "Avonside Commercial — 37.1% revenue concentration",      detail: "Single-client dependency risk. Relationship review recommended." },
    { type: "info"    as const, area: "Cash",       title: "£165.2k WIP eligible for invoicing across 4 jobs",       detail: "Raising these now would materially improve month-end cash." },
    { type: "info"    as const, area: "Customers",  title: "Metro Property Group — 40.0% margin, no overdue debt",   detail: "Highest-value client. Capacity prioritisation recommended." },
  ];

  const alerts   = allSignals.filter(s => s.type === "alert");
  const warnings = allSignals.filter(s => s.type === "warning");
  const info     = allSignals.filter(s => s.type === "info");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Critical alerts", value: alerts.length,   color: "text-rose-700   dark:text-rose-400",   border: "border-rose-200   dark:border-rose-500/20",   bg: "bg-rose-50    dark:bg-white/[0.025]" },
          { label: "Warnings",        value: warnings.length, color: "text-amber-700  dark:text-amber-400",  border: "border-amber-200  dark:border-amber-500/20",  bg: "bg-amber-50   dark:bg-white/[0.025]" },
          { label: "Intelligence",    value: info.length,     color: "text-indigo-700 dark:text-indigo-400", border: "border-indigo-200 dark:border-indigo-500/20", bg: "bg-indigo-50  dark:bg-white/[0.025]" },
        ].map(s => (
          <div key={s.label} className={`p-6 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-white/35 mb-3">{s.label}</p>
            <p className={`text-4xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <Card>
        <SectionHeader title="Critical alerts" sub="Require immediate action" badge={`${alerts.length} open`} />
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
        <SectionHeader title="Warnings" sub="Monitor and address this week" />
        <div className="space-y-2.5">
          {warnings.map((s, i) => (
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
        <SectionHeader title="Available reports" sub="Auto-generated · updated daily from live data" badge={`${reports.length} reports`} />
        <div className="space-y-2.5">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                <FileText size={14} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{r.name}</p>
                <p className="text-xs text-slate-500 dark:text-white/35">{r.type} · Updated {r.updated}</p>
              </div>
              <button
                onClick={() => { const b=new Blob([r.csv],{type:"text/csv"}); const u=URL.createObjectURL(b); const a=document.createElement("a"); a.href=u; a.download=r.filename; a.click(); URL.revokeObjectURL(u); }}
                className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/40 hover:text-slate-700 dark:hover:text-white transition-colors shrink-0"
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
  { label: "Overview",           icon: BarChart2  },
  { label: "Cash & Receivables", icon: DollarSign },
  { label: "Sales & Margin",     icon: TrendingUp },
  { label: "Operations",         icon: Hammer     },
  { label: "Customers",          icon: UserCheck  },
  { label: "Alerts",             icon: Zap        },
];

const SECTION_HEADERS: Record<string, { title: string; sub: string }> = {
  "Overview":           { title: "Executive overview — April 2026",   sub: "Meridian Contractors Ltd · Custom operating system"         },
  "Cash & Receivables": { title: "Cash & receivables",                sub: "Cash position, overdue invoices, and WIP pipeline"          },
  "Sales & Margin":     { title: "Sales & gross margin",              sub: "Revenue performance and margin intelligence"                },
  "Operations":         { title: "Operations",                        sub: "Jobs, crews, labour utilisation, materials, stock, and forward outlook" },
  "Customers":          { title: "Customer profitability",            sub: "Client margin, overdue exposure, and concentration risk"    },
  "Alerts":             { title: "Alerts & exception monitoring",     sub: "All system-generated signals across the business"           },
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const header     = SECTION_HEADERS[activeTab];
  const alertCount = 4;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05050f] text-slate-900 dark:text-white">

      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 h-full w-60 border-r border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#07070f] flex flex-col z-40 hidden lg:flex shadow-sm dark:shadow-none">

        {/* Client identity */}
        <div className="p-5 border-b border-slate-100 dark:border-white/[0.06]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-[11px] font-bold text-white">MC</span>
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm text-slate-900 dark:text-white leading-tight">Meridian Contractors</p>
              <p className="text-[10px] text-slate-400 dark:text-white/30">Ltd</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <p className="text-[11px] text-slate-400 dark:text-white/35">Live · synced 4 min ago</p>
          </div>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-300 dark:text-white/20 mt-3">Custom operating system</p>
        </div>

        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isAlerts = item.label === "Alerts";
            return (
              <button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all text-sm flex items-center justify-between gap-2 ${
                  activeTab === item.label
                    ? "bg-indigo-50 text-indigo-700 font-medium dark:bg-indigo-500/15 dark:text-indigo-300"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon size={14} className="shrink-0" />
                  {item.label}
                </div>
                {isAlerts && (
                  <span className="text-[9px] font-bold bg-rose-500 text-white rounded-full w-4 h-4 flex items-center justify-center shrink-0">{alertCount}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-white/[0.05] space-y-3">
          <div className="px-3 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/[0.08] border border-indigo-100 dark:border-indigo-500/20">
            <p className="text-[9px] font-semibold text-indigo-500 dark:text-indigo-400/70 uppercase tracking-widest mb-0.5">Built by</p>
            <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Quantyx Advisory</p>
            <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">Bespoke system · Apr 2026</p>
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

      {/* ── Main ── */}
      <div className="lg:ml-60">

        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 border-b border-slate-200 dark:border-white/[0.07] bg-white/90 dark:bg-[#05050f]/90 backdrop-blur-md flex items-center justify-between px-6">
          <div>
            <h1 className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight">{header.title}</h1>
            <p className="text-[11px] text-slate-400 dark:text-white/30">{header.sub}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <button className="relative p-2 text-slate-400 hover:text-slate-700 dark:text-white/40 dark:hover:text-white transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-700 dark:text-white/40 dark:hover:text-white transition-colors">
              <Settings size={17} />
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
              MC
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === "Overview"           && <OverviewSection   />}
          {activeTab === "Cash & Receivables" && <CashSection       />}
          {activeTab === "Sales & Margin"     && <MarginSection     />}
          {activeTab === "Operations"         && <OperationsSection />}
          {activeTab === "Customers"          && <CustomersSection  />}
          {activeTab === "Alerts"             && <AlertsSection     />}

          <div className="text-center pt-8 pb-4">
            <p className="text-xs text-slate-400 dark:text-white/20">
              Built by{" "}
              <span className="text-indigo-600 dark:text-indigo-400/60 font-medium">Quantyx Advisory</span>
              {" "}for Meridian Contractors Ltd — every metric, alert, and data source configured to their exact operational needs.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
