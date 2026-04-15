"use client";

import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Hammer, Users, TrendingDown, AlertCircle, Bell, Settings,
  ArrowLeft, TrendingUp, Wrench, ClipboardList, FileText,
  BarChart2, HardHat, CheckCircle2, AlertTriangle, Package,
  ChevronRight, Download, Calendar,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";

/* ─────────────────────────────────────────────
   DATA — Meridian Contractors Ltd
───────────────────────────────────────────── */

const revenueData = [
  { month: "Oct", residential: 38200, commercial: 61400 },
  { month: "Nov", residential: 44100, commercial: 58700 },
  { month: "Dec", residential: 29800, commercial: 71200 },
  { month: "Jan", residential: 51300, commercial: 63900 },
  { month: "Feb", residential: 57600, commercial: 74100 },
  { month: "Mar", residential: 63200, commercial: 88400 },
  { month: "Apr", residential: 69000, commercial: 94700 },
];

const labourData = [
  { crew: "Crew A", hours: 174 },
  { crew: "Crew B", hours: 188 },
  { crew: "Crew C", hours: 151 },
  { crew: "Crew D", hours: 196 },
  { crew: "Sub 1",  hours: 112 },
  { crew: "Sub 2",  hours: 97  },
];

const pipelineData = [
  { name: "Quoted",      value: 12, color: "#6366f1" },
  { name: "In Progress", value: 23, color: "#8b5cf6" },
  { name: "Snagging",    value:  6, color: "#f59e0b" },
  { name: "Invoiced",    value: 18, color: "#10b981" },
];

const recentActivity = [
  { event: "Job #2847 — Commercial refurb complete, ready to invoice", time: "14 min ago", type: "success" },
  { event: "Materials flagged: structural steel up 4.2% this week",    time: "1 hr ago",   type: "warning" },
  { event: "Crew B at 97% utilisation — capacity warning triggered",   time: "2 hrs ago",  type: "warning" },
  { event: "Invoice INV-0341 overdue 38 days — auto-escalated",        time: "4 hrs ago",  type: "alert"   },
  { event: "Quote QT-0089 accepted — Avon St. residential extension",  time: "Yesterday",  type: "success" },
];

const kpis = [
  { label: "Active Jobs",       value: "23",     change: "+3 this week",       up: true,  icon: Hammer,       color: "text-indigo-600 dark:text-indigo-400",  bg: "bg-indigo-100 dark:bg-indigo-500/10",  sub: "across 4 crews"            },
  { label: "Labour Utilisation",value: "87.4%",  change: "Target: 85%",        up: true,  icon: Users,        color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-500/10", sub: "this week"                },
  { label: "Materials Margin",  value: "18.3%",  change: "-1.2pp vs last month",up:false, icon: Wrench,       color: "text-violet-600 dark:text-violet-400",  bg: "bg-violet-100 dark:bg-violet-500/10",  sub: "blended across all jobs"  },
  { label: "Overdue Invoices",  value: "£34,200",change: "4 accounts >30 days", up:false, icon: AlertCircle,  color: "text-rose-600 dark:text-rose-400",      bg: "bg-rose-100 dark:bg-rose-500/10",      sub: "oldest: 38 days"          },
];

/* ─────────────────────────────────────────────
   JOB TRACKER DATA
───────────────────────────────────────────── */

const jobs = [
  { id: "#2841", client: "Avonside Commercial",  name: "Office Fit-Out — Block C",      crew: "Crew A", status: "on-track" as const, pct: 78,  budget: 64000,  actual: 49200, due: "14 Apr", flag: null },
  { id: "#2847", client: "Redfield Logistics",   name: "Warehouse Structural Refurb",   crew: "Crew B", status: "complete" as const, pct: 100, budget: 48500,  actual: 47100, due: "10 Apr", flag: null },
  { id: "#2851", client: "Hartley Council",       name: "Civic Centre Renovation",       crew: "Crew C", status: "at-risk"  as const, pct: 43,  budget: 112000, actual: 53800, due: "02 May", flag: "Labour 11% over estimate" },
  { id: "#2855", client: "Metro Property Group",  name: "Residential Block — Phase 2",  crew: "Crew A", status: "on-track" as const, pct: 29,  budget: 87000,  actual: 26100, due: "28 May", flag: null },
  { id: "#2859", client: "Prestige Retail",       name: "High Street Unit Refit",        crew: "Sub 1",  status: "delayed"  as const, pct: 15,  budget: 31000,  actual: 6200,  due: "19 Apr", flag: "Site access delayed — contractor issue" },
  { id: "#2863", client: "Quantum Workspace",     name: "Rooftop Extension — M1",        crew: "Crew D", status: "on-track" as const, pct: 62,  budget: 54000,  actual: 33100, due: "24 Apr", flag: null },
  { id: "#2867", client: "Barton Industrial",     name: "Factory Mezzanine Install",     crew: "Crew D", status: "at-risk"  as const, pct: 88,  budget: 39000,  actual: 37200, due: "13 Apr", flag: "Materials shortage — steel brackets" },
];

const JOB_STATUS = {
  "on-track": { label: "On Track",  pill: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/25", bar: "bg-emerald-500", row: "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]" },
  "at-risk":  { label: "At Risk",   pill: "text-amber-700  bg-amber-100  border-amber-200  dark:text-amber-400  dark:bg-amber-500/10  dark:border-amber-500/25",  bar: "bg-amber-500",   row: "border-amber-200 bg-amber-50 dark:border-amber-500/15 dark:bg-amber-500/[0.025]" },
  "delayed":  { label: "Delayed",   pill: "text-rose-700   bg-rose-100   border-rose-200   dark:text-rose-400   dark:bg-rose-500/10   dark:border-rose-500/25",   bar: "bg-rose-500",    row: "border-rose-200  bg-rose-50  dark:border-rose-500/15  dark:bg-rose-500/[0.025]"  },
  "complete": { label: "Complete",  pill: "text-indigo-700 bg-indigo-100 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/25", bar: "bg-indigo-500",  row: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/[0.04]" },
  "starting": { label: "Starting",  pill: "text-slate-600  bg-slate-100  border-slate-200  dark:text-white/50   dark:bg-white/10      dark:border-white/10",       bar: "bg-slate-400",   row: "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]" },
};

/* ─────────────────────────────────────────────
   CREW DATA
───────────────────────────────────────────── */

const crews = [
  { name: "Crew A", lead: "D. Hartley", jobs: 7, hours: 174, capacity: 200, pct: 87, status: "available"     as const },
  { name: "Crew B", lead: "R. Osei",    jobs: 6, hours: 188, capacity: 200, pct: 94, status: "near-capacity" as const },
  { name: "Crew C", lead: "M. Patel",   jobs: 5, hours: 151, capacity: 200, pct: 76, status: "available"     as const },
  { name: "Crew D", lead: "S. Nwosu",   jobs: 8, hours: 196, capacity: 200, pct: 98, status: "overallocated" as const },
];

const CREW_STATUS = {
  "available":     { label: "Available",     pill: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20", bar: "bg-emerald-500 dark:bg-emerald-400", value: "text-emerald-700 dark:text-emerald-300" },
  "near-capacity": { label: "Near Capacity", pill: "text-amber-700   bg-amber-100   border-amber-200   dark:text-amber-400   dark:bg-amber-500/10   dark:border-amber-500/20",   bar: "bg-amber-500   dark:bg-amber-400",   value: "text-amber-700   dark:text-amber-300"   },
  "overallocated": { label: "Overallocated", pill: "text-rose-700    bg-rose-100    border-rose-200    dark:text-rose-400    dark:bg-rose-500/10    dark:border-rose-500/20",    bar: "bg-rose-500    dark:bg-rose-400",    value: "text-rose-700    dark:text-rose-300"    },
};

/* ─────────────────────────────────────────────
   MATERIALS DATA
───────────────────────────────────────────── */

const materials = [
  { material: "Structural Steel — I-Beams",    job: "#2851", jobName: "Civic Centre Renovation",       committed: 28400, estimate: 24100, variance: 17.8, severity: "over"        as const, note: "Steel prices up 4.2% — unbudgeted quantity increase" },
  { material: "Concrete Block & Mortar",       job: "#2863", jobName: "Rooftop Extension — M1",        committed: 9800,  estimate: 9200,  variance: 6.5,  severity: "watch"       as const, note: "Within tolerance — flagged for monitoring" },
  { material: "Steel Brackets & Fixings",      job: "#2867", jobName: "Factory Mezzanine Install",     committed: 5100,  estimate: 5100,  variance: 0,    severity: "supply-risk" as const, note: "Supplier delay — 5-day lead time extension confirmed" },
  { material: "Plasterboard & Insulation",     job: "#2841", jobName: "Office Fit-Out — Block C",      committed: 7600,  estimate: 7100,  variance: 7.0,  severity: "watch"       as const, note: "Slight overrun due to waste on irregular walls" },
];

const MAT_SEVERITY = {
  "over":        { label: "Over Budget",  pill: "text-rose-700   bg-rose-100   border-rose-200   dark:text-rose-300   dark:bg-rose-500/15   dark:border-rose-500/20",   icon: "text-rose-600   dark:text-rose-400"   },
  "watch":       { label: "Watch",        pill: "text-amber-700  bg-amber-100  border-amber-200  dark:text-amber-300  dark:bg-amber-500/15  dark:border-amber-500/20",  icon: "text-amber-600  dark:text-amber-400"  },
  "supply-risk": { label: "Supply Risk",  pill: "text-violet-700 bg-violet-100 border-violet-200 dark:text-violet-300 dark:bg-violet-500/15 dark:border-violet-500/20", icon: "text-violet-600 dark:text-violet-400" },
};

/* ─────────────────────────────────────────────
   INVOICING DATA
───────────────────────────────────────────── */

const invoices = [
  { id: "INV-0341", client: "Hartley Council",      job: "#2839", amount: 18400, issued: "03 Mar", due: "02 Apr", status: "overdue" as const, age: 38   },
  { id: "INV-0344", client: "Metro Property Group", job: "#2831", amount: 6100,  issued: "14 Mar", due: "13 Apr", status: "overdue" as const, age: 27   },
  { id: "INV-0348", client: "Avonside Commercial",  job: "#2837", amount: 9750,  issued: "21 Mar", due: "20 Apr", status: "pending" as const, age: null },
  { id: "INV-0351", client: "Barton Industrial",    job: "#2842", amount: 22300, issued: "28 Mar", due: "27 Apr", status: "pending" as const, age: null },
  { id: "INV-0354", client: "Quantum Workspace",    job: "#2846", amount: 14800, issued: "01 Apr", due: "01 May", status: "pending" as const, age: null },
  { id: "INV-0356", client: "Redfield Logistics",   job: "#2847", amount: 47100, issued: "10 Apr", due: "10 May", status: "draft"   as const, age: null },
  { id: "INV-0338", client: "Prestige Retail",      job: "#2826", amount: 31200, issued: "14 Feb", due: "16 Mar", status: "paid"    as const, age: null },
  { id: "INV-0335", client: "Metro Property Group", job: "#2820", amount: 54700, issued: "07 Feb", due: "09 Mar", status: "paid"    as const, age: null },
];

const INV_STATUS = {
  "overdue": { label: "Overdue", pill: "text-rose-700   bg-rose-100   border-rose-200   dark:text-rose-300   dark:bg-rose-500/15   dark:border-rose-500/20",   row: "border-rose-200  bg-rose-50  dark:border-rose-500/15"  },
  "pending": { label: "Pending", pill: "text-amber-700  bg-amber-100  border-amber-200  dark:text-amber-300  dark:bg-amber-500/15  dark:border-amber-500/20",  row: "border-slate-200 bg-white     dark:border-white/[0.07]" },
  "draft":   { label: "Draft",   pill: "text-slate-500  bg-slate-100  border-slate-200  dark:text-white/40   dark:bg-white/10      dark:border-white/10",       row: "border-slate-200 bg-white     dark:border-white/[0.07]" },
  "paid":    { label: "Paid",    pill: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-500/15 dark:border-emerald-500/20", row: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/10" },
};

/* ─────────────────────────────────────────────
   REPORTS DATA
───────────────────────────────────────────── */

const reports = [
  { name: "April 2026 — P&L Summary",          type: "Financial",  updated: "Today",  icon: BarChart2,     filename: "apr2026_pl_summary.csv",         csv: `Category,Amount (£)\nRevenue,148200\nCost of Sales,82400\nGross Profit,65800\nOperating Expenses,31200\nEBITDA,34600\nDepreciation,4800\nNet Profit,29800\n` },
  { name: "Q1 2026 — Crew Utilisation Report",  type: "Labour",     updated: "01 Apr", icon: HardHat,       filename: "q1_2026_crew_utilisation.csv",    csv: `Employee,Role,Billable Hours,Total Hours,Utilisation %\nJames Thornton,Site Supervisor,148,160,92.5\nLaura Simmons,Electrician,134,160,83.8\nDan Okafor,Plumber,152,160,95.0\nSophie Wells,Labourer,120,160,75.0\nRaj Patel,Electrician,141,160,88.1\nMike Carter,Site Supervisor,155,160,96.9\n` },
  { name: "April 2026 — Job Profitability",     type: "Operations", updated: "Today",  icon: ClipboardList, filename: "apr2026_job_profitability.csv",   csv: `Job ID,Client,Revenue (£),Labour Cost (£),Materials Cost (£),Gross Profit (£),Margin %\nJOB-2041,Hartley Homes,18400,7200,4100,7100,38.6\nJOB-2042,Pinnacle Developments,32100,12800,8400,10900,34.0\nJOB-2043,Orion Build Group,9800,3900,2200,3700,37.8\nJOB-2044,Crest Contractors,21500,9100,5600,6800,31.6\nJOB-2045,Bluewave Projects,15200,6300,3800,5100,33.6\n` },
  { name: "March 2026 — Materials Variance",    type: "Materials",  updated: "02 Apr", icon: Wrench,        filename: "mar2026_materials_variance.csv", csv: `Material,Budgeted (£),Actual (£),Variance (£),Variance %\nStructural Steel,14200,15800,-1600,-11.3\nConcrete Mix,8400,8100,300,3.6\nElectrical Cable,5200,5600,-400,-7.7\nPVC Piping,3100,2950,150,4.8\nPlasterboard,4800,5200,-400,-8.3\nInsulation,2600,2450,150,5.8\nFixings & Fasteners,1800,1920,-120,-6.7\n` },
  { name: "Q1 2026 — Invoice Ageing Analysis",  type: "Finance",    updated: "31 Mar", icon: FileText,      filename: "q1_2026_invoice_ageing.csv",     csv: `Client,Invoice Ref,Amount (£),Issue Date,Due Date,Days Overdue,Status\nHartley Homes,INV-1041,9200,03 Jan,31 Jan,0,Paid\nPinnacle Developments,INV-1042,18400,10 Jan,07 Feb,0,Paid\nOrion Build Group,INV-1043,7600,18 Feb,18 Mar,13,Overdue\nCrest Contractors,INV-1044,12100,01 Mar,29 Mar,2,Overdue\nBluewave Projects,INV-1045,5400,15 Mar,12 Apr,0,Current\nHartley Homes,INV-1046,11300,22 Mar,19 Apr,0,Current\n` },
  { name: "YTD 2026 — Revenue by Client",       type: "Financial",  updated: "Today",  icon: TrendingUp,    filename: "ytd2026_revenue_by_client.csv",  csv: `Client,Jan (£),Feb (£),Mar (£),Apr (£),YTD Total (£)\nHartley Homes,18200,21400,19800,20500,79900\nPinnacle Developments,32100,28600,34200,31500,126400\nOrion Build Group,9400,11200,8900,10100,39600\nCrest Contractors,15800,14200,17400,16200,63600\nBluewave Projects,8600,9800,11200,12400,42000\n` },
];

/* ─────────────────────────────────────────────
   CUSTOM TOOLTIP — Revenue
───────────────────────────────────────────── */

function RevTooltip({ active, payload, label }: { active?: boolean; payload?: { value?: number; name?: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--chart-tooltip-bg)", border: `1px solid var(--chart-tooltip-bd)` }}
         className="rounded-xl px-4 py-3 text-xs shadow-xl space-y-1">
      <p className="text-white/40 mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-medium" style={{ color: i === 0 ? "#6366f1" : "#10b981" }}>
          {p.name === "residential" ? "Residential" : "Commercial"}: £{Number(p.value).toLocaleString("en-GB")}
        </p>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CARD WRAPPER (shared)
───────────────────────────────────────────── */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none ${className}`}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   TAB SECTIONS
───────────────────────────────────────────── */

function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="!p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-500 dark:text-white/40 uppercase tracking-wide font-medium">{kpi.label}</p>
              <div className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                <kpi.icon size={15} className={kpi.color} />
              </div>
            </div>
            <p className="text-2xl font-bold mb-1 tracking-tight text-slate-900 dark:text-white">{kpi.value}</p>
            <div className="flex items-center gap-1.5">
              {kpi.up
                ? <TrendingUp  size={12} className="text-emerald-500 dark:text-emerald-400" />
                : <TrendingDown size={12} className="text-rose-500 dark:text-rose-400" />
              }
              <span className={`text-xs font-medium ${kpi.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-white/25 mt-0.5">{kpi.sub}</p>
          </Card>
        ))}
      </div>

      {/* Revenue chart */}
      <Card>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="font-semibold text-sm text-slate-900 dark:text-white">Revenue by project type</h2>
            <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">Residential vs Commercial · Oct 2025 – Apr 2026</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-white/40">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" />Residential</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Commercial</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
              </linearGradient>
              <linearGradient id="comGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false}
              tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`} width={42} />
            <Tooltip content={<RevTooltip />} />
            <Area type="monotone" dataKey="residential" stroke="#6366f1" strokeWidth={2} fill="url(#resGrad)" />
            <Area type="monotone" dataKey="commercial"  stroke="#10b981" strokeWidth={2} fill="url(#comGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <h2 className="font-semibold text-sm mb-0.5 text-slate-900 dark:text-white">Labour hours by crew</h2>
          <p className="text-xs text-slate-400 dark:text-white/35 mb-6">Current week · capacity = 200 hrs</p>
          <ResponsiveContainer width="100%" height={185}>
            <BarChart data={labourData} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis dataKey="crew" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--chart-tooltip-bg)", border: `1px solid var(--chart-tooltip-bd)`, borderRadius: 8, fontSize: 12, color: "#fff" }}
                formatter={(value) => [`${value} hrs`, "Hours"]}
              />
              <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                {labourData.map((entry, i) => (
                  <Cell key={i} fill={entry.hours >= 185 ? "#f59e0b" : "#6366f1"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-amber-600 dark:text-amber-400/70 mt-3">⚠ Crew B and Crew D above 185 hrs — capacity threshold</p>
        </Card>

        <Card>
          <h2 className="font-semibold text-sm mb-0.5 text-slate-900 dark:text-white">Job pipeline</h2>
          <p className="text-xs text-slate-400 dark:text-white/35 mb-4">59 jobs total</p>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={pipelineData} cx="50%" cy="50%" innerRadius={38} outerRadius={58} paddingAngle={3} dataKey="value">
                {pipelineData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: "var(--chart-tooltip-bg)", border: `1px solid var(--chart-tooltip-bd)`, borderRadius: 8, fontSize: 12, color: "#fff" }}
                formatter={(value) => [`${value} jobs`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pipelineData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-slate-500 dark:text-white/50">{d.name}</span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity feed */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-sm text-slate-900 dark:text-white">Automated alerts &amp; activity</h2>
            <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">Threshold rules applied across jobs, crew, materials &amp; invoicing</p>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 rounded-full">
            Custom logic
          </span>
        </div>
        <div className="space-y-2">
          {recentActivity.map((item, i) => (
            <div key={i} className={`flex items-center justify-between py-3 px-4 rounded-xl border ${
              item.type === "success" ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/15 dark:bg-emerald-500/[0.05]" :
              item.type === "alert"   ? "border-rose-200   bg-rose-50   dark:border-rose-500/15   dark:bg-rose-500/[0.05]"    :
                                       "border-amber-200  bg-amber-50  dark:border-amber-500/15  dark:bg-amber-500/[0.05]"
            }`}>
              <div className="flex items-center gap-3">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  item.type === "success" ? "bg-emerald-500 dark:bg-emerald-400" :
                  item.type === "alert"   ? "bg-rose-500   dark:bg-rose-400"    :
                                           "bg-amber-500  dark:bg-amber-400"
                }`} />
                <span className="text-sm text-slate-700 dark:text-white/75">{item.event}</span>
              </div>
              <span className="text-xs text-slate-400 dark:text-white/30 shrink-0 ml-4 whitespace-nowrap">{item.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function JobTrackerSection() {
  const atRisk  = jobs.filter((j) => j.status === "at-risk" || j.status === "delayed").length;
  const onTrack = jobs.filter((j) => j.status === "on-track").length;
  const done    = jobs.filter((j) => j.status === "complete").length;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "On Track",          value: onTrack, color: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-500/10" },
          { label: "At Risk / Delayed", value: atRisk,  color: "text-rose-700    dark:text-rose-400",    bg: "bg-rose-100    dark:bg-rose-500/10"    },
          { label: "Complete",          value: done,    color: "text-indigo-700  dark:text-indigo-400",  bg: "bg-indigo-100  dark:bg-indigo-500/10"  },
        ].map((s) => (
          <Card key={s.label} className="!p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
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
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-sm text-slate-900 dark:text-white">Active Job Tracker</h2>
            <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">{jobs.length} jobs shown · sorted by risk</p>
          </div>
        </div>
        <div className="space-y-3">
          {[...jobs].sort((a, b) => {
            const order = { delayed: 0, "at-risk": 1, "on-track": 2, starting: 3, complete: 4 };
            return order[a.status] - order[b.status];
          }).map((job) => {
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
                    <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${s.pill}`}>
                      {s.label}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-white/30 flex items-center gap-1">
                      <Calendar size={11} />{job.due}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] text-slate-400 dark:text-white/35 mb-1">
                      <span>Progress</span><span>{job.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10">
                      <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${job.pct}%` }} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-slate-700 dark:text-white/70">
                      £{job.actual.toLocaleString("en-GB")} <span className="text-slate-400 dark:text-white/25 font-normal">/ £{job.budget.toLocaleString("en-GB")}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-white/30">cost vs budget ({costPct}%)</p>
                  </div>
                </div>
                {job.flag && (
                  <div className="mt-3 flex items-center gap-2 text-[11px] text-amber-700 dark:text-amber-300/80">
                    <AlertTriangle size={11} className="shrink-0 text-amber-500 dark:text-amber-400" />
                    {job.flag}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function LabourSection() {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {crews.map((crew) => {
          const s = CREW_STATUS[crew.status];
          return (
            <Card key={crew.name} className="!p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-sm text-slate-900 dark:text-white">{crew.name}</p>
                  <p className="text-xs text-slate-400 dark:text-white/35">{crew.lead}</p>
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${s.pill}`}>
                  {s.label}
                </span>
              </div>
              <p className={`text-2xl font-bold mb-1 ${s.value}`}>{crew.pct}%</p>
              <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/10 mb-3">
                <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${Math.min(crew.pct, 100)}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-400 dark:text-white/30">Hours</p>
                  <p className="font-semibold text-slate-800 dark:text-white">{crew.hours} / {crew.capacity}</p>
                </div>
                <div>
                  <p className="text-slate-400 dark:text-white/30">Active jobs</p>
                  <p className="font-semibold text-slate-800 dark:text-white">{crew.jobs}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <h2 className="font-semibold text-sm mb-0.5 text-slate-900 dark:text-white">Labour hours by crew</h2>
        <p className="text-xs text-slate-400 dark:text-white/35 mb-6">Current week · capacity = 200 hrs per crew</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={labourData} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="crew" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 220]} />
            <Tooltip
              contentStyle={{ background: "var(--chart-tooltip-bg)", border: `1px solid var(--chart-tooltip-bd)`, borderRadius: 8, fontSize: 12, color: "#fff" }}
              formatter={(value) => [`${value} hrs`, "Hours"]}
            />
            <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
              {labourData.map((entry, i) => (
                <Cell key={i} fill={entry.hours >= 195 ? "#f43f5e" : entry.hours >= 185 ? "#f59e0b" : "#6366f1"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-5 mt-3 text-[11px] text-slate-500 dark:text-white/40">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" />Normal</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"  />Near capacity (&gt;185h)</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"   />Overallocated (&gt;195h)</span>
        </div>
        <p className="text-[10px] text-amber-600 dark:text-amber-400/70 mt-2">⚠ Crew B (188 hrs) and Crew D (196 hrs) at or above capacity threshold</p>
      </Card>

      <Card>
        <h2 className="font-semibold text-sm mb-4 text-slate-900 dark:text-white">Labour alerts this week</h2>
        <div className="space-y-2">
          {[
            { msg: "Crew D at 98% utilisation — consider redistributing jobs", type: "alert"   },
            { msg: "Crew B exceeded 185 hr threshold — capacity warning triggered", type: "warning" },
            { msg: "Subcontractor Sub 2 under-utilised at 97 hrs — review allocation", type: "info" },
          ].map((a, i) => (
            <div key={i} className={`flex items-center gap-3 py-3 px-4 rounded-xl border text-sm ${
              a.type === "alert"   ? "border-rose-200   bg-rose-50   text-rose-700   dark:border-rose-500/15   dark:bg-rose-500/[0.05]   dark:text-rose-300"   :
              a.type === "warning" ? "border-amber-200  bg-amber-50  text-amber-700  dark:border-amber-500/15  dark:bg-amber-500/[0.05]  dark:text-amber-300"  :
                                    "border-slate-200  bg-slate-50  text-slate-600  dark:border-white/[0.07]  dark:bg-white/[0.02]      dark:text-white/50"
            }`}>
              <AlertTriangle size={14} className="shrink-0" />
              {a.msg}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MaterialsSection() {
  const totalCommitted = materials.reduce((s, m) => s + m.committed, 0);
  const totalEstimate  = materials.reduce((s, m) => s + m.estimate,  0);
  const overallVariance = ((totalCommitted - totalEstimate) / totalEstimate * 100).toFixed(1);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Committed", value: `£${totalCommitted.toLocaleString("en-GB")}`, color: "text-slate-900 dark:text-white",     border: "border-slate-200 dark:border-white/[0.07]", bg: "bg-white dark:bg-white/[0.025]" },
          { label: "Total Estimated", value: `£${totalEstimate.toLocaleString("en-GB")}`,  color: "text-slate-900 dark:text-white",     border: "border-slate-200 dark:border-white/[0.07]", bg: "bg-white dark:bg-white/[0.025]" },
          { label: "Overall Variance",value: `+${overallVariance}%`,                       color: "text-amber-600  dark:text-amber-400", border: "border-amber-200  dark:border-amber-500/20",  bg: "bg-amber-50 dark:bg-amber-500/[0.05]" },
        ].map((s) => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-xs text-slate-500 dark:text-white/40 mb-2">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-sm text-slate-900 dark:text-white">Material cost alerts</h2>
            <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">Flagged lines across active jobs</p>
          </div>
        </div>
        <div className="space-y-3">
          {materials.map((m, i) => {
            const s = MAT_SEVERITY[m.severity];
            return (
              <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Package size={13} className={s.icon} />
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{m.material}</p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/35">{m.job} · {m.jobName}</p>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border shrink-0 ${s.pill}`}>
                    {s.label}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs mt-3">
                  <div>
                    <p className="text-slate-400 dark:text-white/30 mb-0.5">Committed</p>
                    <p className="font-semibold text-slate-800 dark:text-white">£{m.committed.toLocaleString("en-GB")}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-white/30 mb-0.5">Estimate</p>
                    <p className="font-semibold text-slate-800 dark:text-white">£{m.estimate.toLocaleString("en-GB")}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-white/30 mb-0.5">Variance</p>
                    <p className={`font-semibold ${m.variance > 0 ? "text-rose-600 dark:text-rose-400" : "text-slate-600 dark:text-white/70"}`}>
                      {m.variance > 0 ? `+${m.variance}%` : "—"}
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-white/40 mt-2 border-t border-slate-100 dark:border-white/5 pt-2">{m.note}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function InvoicingSection() {
  const overdue = invoices.filter((i) => i.status === "overdue");
  const pending = invoices.filter((i) => i.status === "pending");
  const overdueTotal = overdue.reduce((s, i) => s + i.amount, 0);
  const pendingTotal = pending.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Overdue",    value: `£${overdueTotal.toLocaleString("en-GB")}`,  sub: `${overdue.length} invoices`, color: "text-rose-700   dark:text-rose-400",    border: "border-rose-200   dark:border-rose-500/20",    bg: "bg-rose-50    dark:bg-white/[0.025]" },
          { label: "Pending",    value: `£${pendingTotal.toLocaleString("en-GB")}`,  sub: `${pending.length} invoices`, color: "text-amber-700  dark:text-amber-400",   border: "border-slate-200  dark:border-white/[0.07]",   bg: "bg-white      dark:bg-white/[0.025]" },
          { label: "Draft",      value: `£${invoices.filter(i=>i.status==="draft").reduce((s,i)=>s+i.amount,0).toLocaleString("en-GB")}`, sub: "1 invoice", color: "text-slate-500 dark:text-white/50", border: "border-slate-200 dark:border-white/[0.07]", bg: "bg-white dark:bg-white/[0.025]" },
          { label: "Paid (YTD)", value: `£${invoices.filter(i=>i.status==="paid").reduce((s,i)=>s+i.amount,0).toLocaleString("en-GB")}`, sub: `${invoices.filter(i=>i.status==="paid").length} invoices`, color: "text-emerald-700 dark:text-emerald-400", border: "border-slate-200 dark:border-white/[0.07]", bg: "bg-white dark:bg-white/[0.025]" },
        ].map((s) => (
          <div key={s.label} className={`p-5 rounded-2xl border ${s.border} ${s.bg} shadow-sm dark:shadow-none`}>
            <p className="text-xs text-slate-500 dark:text-white/40 mb-2">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 dark:text-white/30 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-sm text-slate-900 dark:text-white">All invoices</h2>
            <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">Sorted by status · most urgent first</p>
          </div>
        </div>
        <div className="space-y-2">
          {[...invoices].sort((a, b) => {
            const order = { overdue: 0, pending: 1, draft: 2, paid: 3 };
            return order[a.status] - order[b.status];
          }).map((inv) => {
            const s = INV_STATUS[inv.status];
            return (
              <div key={inv.id} className={`flex items-center gap-4 p-4 rounded-xl border ${s.row}`}>
                <div className="w-24 shrink-0">
                  <p className="text-xs font-mono text-slate-400 dark:text-white/50">{inv.id}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">{inv.client}</p>
                  <p className="text-xs text-slate-500 dark:text-white/35">{inv.job} · Due {inv.due}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">£{inv.amount.toLocaleString("en-GB")}</p>
                  {inv.age && <p className="text-[11px] text-rose-600 dark:text-rose-400">{inv.age} days overdue</p>}
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border shrink-0 ${s.pill}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function downloadCSV(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function ReportsSection() {
  return (
    <div className="space-y-5">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-sm text-slate-900 dark:text-white">Available reports</h2>
            <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">Auto-generated · updated daily from live data</p>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 rounded-full">
            6 reports
          </span>
        </div>
        <div className="space-y-3">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center shrink-0">
                <r.icon size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{r.name}</p>
                <p className="text-xs text-slate-500 dark:text-white/35">{r.type} · Updated {r.updated}</p>
              </div>
              <button
                onClick={() => downloadCSV(r.filename, r.csv)}
                className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/40 hover:text-slate-700 dark:hover:text-white transition-colors shrink-0"
              >
                <Download size={13} />Export
              </button>
              <button className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors shrink-0">
                View<ChevronRight size={13} />
              </button>
            </div>
          ))}
        </div>
      </Card>
      <div className="p-5 rounded-2xl border border-indigo-200 dark:border-indigo-500/15 bg-indigo-50 dark:bg-indigo-500/[0.04] text-center">
        <p className="text-xs text-indigo-600 dark:text-indigo-300/60">
          All reports are generated automatically from connected data sources. Export functionality and scheduled delivery available in the full production build.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: "Overview",         icon: BarChart2     },
  { label: "Job Tracker",      icon: ClipboardList },
  { label: "Labour & Crews",   icon: HardHat       },
  { label: "Materials & Cost", icon: Wrench        },
  { label: "Invoicing",        icon: FileText      },
  { label: "Reports",          icon: BarChart2     },
];

const SECTION_HEADERS: Record<string, { title: string; sub: string }> = {
  "Overview":         { title: "Overview — April 2026",         sub: "Meridian Contractors Ltd · Operations Dashboard"    },
  "Job Tracker":      { title: "Job Tracker",                   sub: "23 active jobs across 4 crews · sorted by risk"    },
  "Labour & Crews":   { title: "Labour & Crews",                sub: "Current week · crew utilisation and hours"         },
  "Materials & Cost": { title: "Materials & Cost",              sub: "Flagged cost variances and supply risks"            },
  "Invoicing":        { title: "Invoicing",                     sub: "Outstanding, overdue, and recent invoices"         },
  "Reports":          { title: "Reports",                       sub: "Auto-generated operational and financial reports"   },
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const header = SECTION_HEADERS[activeTab];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05050f] text-slate-900 dark:text-white">

      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 h-full w-60 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#08080f] flex flex-col z-40 hidden lg:flex shadow-sm dark:shadow-none">
        <div className="p-5 border-b border-slate-100 dark:border-white/5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-1">Custom dashboard</p>
          <span className="font-bold text-base text-slate-900 dark:text-white">Meridian Contractors</span>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <p className="text-xs text-slate-400 dark:text-white/40">Live · synced 4 min ago</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-0.5 text-sm">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center gap-2.5 ${
                activeTab === item.label
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5"
              }`}
            >
              <item.icon size={14} className="shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-white/5 space-y-3">
          <div className="px-3 py-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/[0.07] border border-indigo-200 dark:border-indigo-500/20">
            <p className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400/80 uppercase tracking-widest mb-0.5">Built by</p>
            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">Quantyx Advisory</p>
            <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">Bespoke · Apr 2026</p>
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
        <header className="sticky top-0 z-30 h-14 border-b border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#05050f]/80 backdrop-blur-md flex items-center justify-between px-6">
          <div>
            <h1 className="font-semibold text-sm text-slate-900 dark:text-white">{header.title}</h1>
            <p className="text-xs text-slate-400 dark:text-white/30">{header.sub}</p>
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
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
              MC
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === "Overview"         && <OverviewSection   />}
          {activeTab === "Job Tracker"      && <JobTrackerSection />}
          {activeTab === "Labour & Crews"   && <LabourSection     />}
          {activeTab === "Materials & Cost" && <MaterialsSection  />}
          {activeTab === "Invoicing"        && <InvoicingSection  />}
          {activeTab === "Reports"          && <ReportsSection    />}

          <div className="text-center pt-6 pb-4">
            <p className="text-xs text-slate-400 dark:text-white/20">
              This dashboard was built from scratch by{" "}
              <span className="text-indigo-600 dark:text-indigo-400/60 font-medium">Quantyx Advisory</span>
              {" "}for Meridian Contractors Ltd — every metric, rule, and data source configured to their exact operational needs.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
