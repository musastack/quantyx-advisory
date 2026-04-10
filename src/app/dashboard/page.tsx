"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Hammer,
  Users,
  TrendingDown,
  AlertCircle,
  Bell,
  Settings,
  ArrowLeft,
  TrendingUp,
  Wrench,
  ClipboardList,
  FileText,
  BarChart2,
  HardHat,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   DATA — Meridian Contractors Ltd
   (Custom-built dashboard, Quantyx Advisory)
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
  { crew: "Crew A",  hours: 174 },
  { crew: "Crew B",  hours: 188 },
  { crew: "Crew C",  hours: 151 },
  { crew: "Crew D",  hours: 196 },
  { crew: "Sub 1",   hours: 112 },
  { crew: "Sub 2",   hours: 97  },
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
  {
    label:   "Active Jobs",
    value:   "23",
    change:  "+3 this week",
    up:      true,
    icon:    Hammer,
    color:   "text-indigo-400",
    bg:      "bg-indigo-500/10",
    sub:     "across 4 crews",
  },
  {
    label:   "Labour Utilisation",
    value:   "87.4%",
    change:  "Target: 85%",
    up:      true,
    icon:    Users,
    color:   "text-emerald-400",
    bg:      "bg-emerald-500/10",
    sub:     "this week",
  },
  {
    label:   "Materials Margin",
    value:   "18.3%",
    change:  "-1.2pp vs last month",
    up:      false,
    icon:    Wrench,
    color:   "text-violet-400",
    bg:      "bg-violet-500/10",
    sub:     "blended across all jobs",
  },
  {
    label:   "Overdue Invoices",
    value:   "£34,200",
    change:  "4 accounts >30 days",
    up:      false,
    icon:    AlertCircle,
    color:   "text-rose-400",
    bg:      "bg-rose-500/10",
    sub:     "oldest: 38 days",
  },
];

/* ─────────────────────────────────────────────
   CUSTOM TOOLTIP — Revenue
───────────────────────────────────────────── */

function RevTooltip({ active, payload, label }: { active?: boolean; payload?: { value?: number; name?: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0f0f1a] border border-white/10 rounded-xl px-4 py-3 text-xs shadow-xl space-y-1">
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
   PAGE
───────────────────────────────────────────── */

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#05050f] text-white">

      {/* ── Sidebar ── */}
      <aside className="fixed left-0 top-0 h-full w-60 border-r border-white/5 bg-[#08080f] flex flex-col z-40 hidden lg:flex">
        <div className="p-5 border-b border-white/5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">Custom dashboard</p>
          <span className="font-bold text-base text-white">Meridian Contractors</span>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <p className="text-xs text-white/40">Live · synced 4 min ago</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-0.5 text-sm">
          {[
            { label: "Overview",        icon: BarChart2,    active: true  },
            { label: "Job Tracker",     icon: ClipboardList,              },
            { label: "Labour & Crews",  icon: HardHat,                    },
            { label: "Materials & Cost",icon: Wrench,                     },
            { label: "Invoicing",       icon: FileText,                   },
            { label: "Reports",         icon: BarChart2,                  },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center gap-2.5 ${
                item.active
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={14} className="shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-3">
          <div className="px-3 py-2.5 rounded-lg bg-indigo-500/[0.07] border border-indigo-500/20">
            <p className="text-[10px] font-semibold text-indigo-400/80 uppercase tracking-widest mb-0.5">
              Built by
            </p>
            <p className="text-xs font-semibold text-indigo-300">Quantyx Advisory</p>
            <p className="text-[10px] text-white/25 mt-0.5">Bespoke · Apr 2026</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors px-1"
          >
            <ArrowLeft size={12} />
            Back to site
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="lg:ml-60">

        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 border-b border-white/5 bg-[#05050f]/80 backdrop-blur-md flex items-center justify-between px-6">
          <div>
            <h1 className="font-semibold text-sm">Overview — April 2026</h1>
            <p className="text-xs text-white/30">Meridian Contractors Ltd · Operations Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-white/40 hover:text-white transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            </button>
            <button className="p-2 text-white/40 hover:text-white transition-colors">
              <Settings size={17} />
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
              MC
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">

          {/* KPI cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-white/40 uppercase tracking-wide font-medium">{kpi.label}</p>
                  <div className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                    <kpi.icon size={15} className={kpi.color} />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1 tracking-tight">{kpi.value}</p>
                <div className="flex items-center gap-1.5">
                  {kpi.up
                    ? <TrendingUp  size={12} className="text-emerald-400" />
                    : <TrendingDown size={12} className="text-rose-400"   />
                  }
                  <span className={`text-xs font-medium ${kpi.up ? "text-emerald-400" : "text-rose-400"}`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-[11px] text-white/25 mt-0.5">{kpi.sub}</p>
              </div>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.025]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-semibold text-sm">Revenue by project type</h2>
                <p className="text-xs text-white/35 mt-0.5">Residential vs Commercial · Oct 2025 – Apr 2026</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" />Residential</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Commercial</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="comGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`} width={42} />
                <Tooltip content={<RevTooltip />} />
                <Area type="monotone" dataKey="residential" stroke="#6366f1" strokeWidth={2}   fill="url(#resGrad)" />
                <Area type="monotone" dataKey="commercial"  stroke="#10b981" strokeWidth={2}   fill="url(#comGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom row */}
          <div className="grid lg:grid-cols-3 gap-5">

            {/* Labour hours by crew */}
            <div className="lg:col-span-2 p-6 rounded-2xl border border-white/[0.07] bg-white/[0.025]">
              <h2 className="font-semibold text-sm mb-0.5">Labour hours by crew</h2>
              <p className="text-xs text-white/35 mb-6">Current week · capacity = 200 hrs</p>
              <ResponsiveContainer width="100%" height={185}>
                <BarChart data={labourData} margin={{ top: 0, right: 0, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="crew" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                    formatter={(value) => [`${value} hrs`, "Hours"]}
                  />
                  <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]}>
                    {labourData.map((entry, i) => (
                      <Cell key={i} fill={entry.hours >= 185 ? "#f59e0b" : "#6366f1"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-amber-400/70 mt-3">⚠ Crew B and Crew D above 185 hrs — capacity threshold</p>
            </div>

            {/* Job pipeline */}
            <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.025]">
              <h2 className="font-semibold text-sm mb-0.5">Job pipeline</h2>
              <p className="text-xs text-white/35 mb-4">59 jobs total</p>
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie data={pipelineData} cx="50%" cy="50%" innerRadius={38} outerRadius={58} paddingAngle={3} dataKey="value">
                    {pipelineData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                    formatter={(value) => [`${value} jobs`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {pipelineData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                      <span className="text-white/50">{d.name}</span>
                    </div>
                    <span className="font-semibold">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity feed */}
          <div className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.025]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-semibold text-sm">Automated alerts &amp; activity</h2>
                <p className="text-xs text-white/35 mt-0.5">Threshold rules applied across jobs, crew, materials &amp; invoicing</p>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                Custom logic
              </span>
            </div>
            <div className="space-y-2">
              {recentActivity.map((item, i) => (
                <div key={i} className={`flex items-center justify-between py-3 px-4 rounded-xl border transition-colors ${
                  item.type === "success" ? "border-emerald-500/15 bg-emerald-500/[0.05]" :
                  item.type === "alert"   ? "border-rose-500/15   bg-rose-500/[0.05]"    :
                                           "border-amber-500/15  bg-amber-500/[0.05]"
                }`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      item.type === "success" ? "bg-emerald-400" :
                      item.type === "alert"   ? "bg-rose-400"    :
                                               "bg-amber-400"
                    }`} />
                    <span className="text-sm text-white/75">{item.event}</span>
                  </div>
                  <span className="text-xs text-white/30 shrink-0 ml-4 whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center pb-4">
            <p className="text-xs text-white/20">
              This dashboard was built from scratch by{" "}
              <span className="text-indigo-400/60 font-medium">Quantyx Advisory</span>
              {" "}for Meridian Contractors Ltd — every metric, rule, and data source configured to their exact operational needs.
            </p>
          </div>

        </main>
      </div>
    </div>
  );
}
