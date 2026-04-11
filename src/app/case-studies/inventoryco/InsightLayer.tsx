"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronRight,
  Activity,
  BarChart2,
  Briefcase,
  Package,
  Database,
  X,
} from "lucide-react";
import type {
  InventoryCoDashboard,
  ActiveJob,
} from "@/lib/inventoryco";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

type Tab = "financial" | "products" | "jobs" | "inventory";
type TimePeriod = "week" | "month" | "last";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function fmt(n: number) {
  return "£" + Math.round(n).toLocaleString("en-GB");
}
function fmtk(n: number) {
  return "£" + (n / 1000).toFixed(1) + "k";
}
function pct(n: number) {
  return n.toFixed(1) + "%";
}

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */

function SectionLabel({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="shrink-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">
          {label}
        </p>
        {sub && (
          <p className="text-[10px] text-slate-300 dark:text-white/20 mt-0.5">{sub}</p>
        )}
      </div>
      <div className="h-px flex-1 bg-slate-200 dark:bg-white/[0.06]" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   INSIGHT CARD
───────────────────────────────────────────── */

function InsightCard({
  text,
  action,
  severity,
  index,
}: {
  text: string;
  action: string;
  severity: "warn" | "alert" | "info";
  index: number;
}) {
  const map = {
    warn:  { bar: "bg-amber-500", bg: "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.05]",   num: "text-amber-600 dark:text-amber-400" },
    alert: { bar: "bg-rose-500",  bg: "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.05]",       num: "text-rose-600 dark:text-rose-400" },
    info:  { bar: "bg-indigo-500",bg: "border-slate-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.025]",         num: "text-indigo-600 dark:text-indigo-400" },
  };
  const m = map[severity];
  return (
    <div className={`p-4 rounded-xl border ${m.bg} flex items-start gap-3`}>
      <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
        <span className={`text-[10px] font-bold ${m.num} w-4 text-center`}>{index}</span>
        <div className={`w-0.5 flex-1 rounded-full ${m.bar} min-h-[20px]`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 dark:text-white/90 leading-snug mb-1.5">{text}</p>
        <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{action}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHART TOOLTIP
───────────────────────────────────────────── */

function RevenueTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-4 py-3 text-sm shadow-xl"
      style={{
        background: "var(--chart-tooltip-bg)",
        border: "1px solid var(--chart-tooltip-bd)",
      }}
    >
      <p className="text-white/40 text-xs mb-2">{label}</p>
      <div className="space-y-1">
        <p className="text-white font-medium">
          Revenue: <span className="text-violet-300">{fmt(payload[0]?.value ?? 0)}</span>
        </p>
        <p className="text-white/60">
          Profit: <span className="text-emerald-400">{fmt(payload[1]?.value ?? 0)}</span>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   JOB STATUS CONFIG
───────────────────────────────────────────── */

const JOB_STATUS = {
  "on-track": {
    label: "On Track",
    pill: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/25",
    bar: "bg-emerald-500 dark:bg-emerald-400",
    row: "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]",
    selectedRow: "border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/[0.05]",
    dot: "bg-emerald-500",
  },
  "at-risk": {
    label: "At Risk",
    pill: "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/25",
    bar: "bg-amber-500 dark:bg-amber-400",
    row: "border-amber-200 bg-amber-50 dark:border-amber-500/15 dark:bg-amber-500/[0.025]",
    selectedRow: "border-amber-400 bg-amber-100 dark:border-amber-500/40 dark:bg-amber-500/[0.08]",
    dot: "bg-amber-500",
  },
  delayed: {
    label: "Delayed",
    pill: "text-rose-700 bg-rose-100 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/25",
    bar: "bg-rose-500 dark:bg-rose-400",
    row: "border-rose-200 bg-rose-50 dark:border-rose-500/15 dark:bg-rose-500/[0.025]",
    selectedRow: "border-rose-400 bg-rose-100 dark:border-rose-500/40 dark:bg-rose-500/[0.08]",
    dot: "bg-rose-500",
  },
  complete: {
    label: "Complete",
    pill: "text-indigo-700 bg-indigo-100 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/25",
    bar: "bg-indigo-500 dark:bg-indigo-400",
    row: "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]",
    selectedRow: "border-indigo-300 bg-indigo-50 dark:border-indigo-500/30 dark:bg-indigo-500/[0.06]",
    dot: "bg-indigo-500",
  },
  starting: {
    label: "Starting",
    pill: "text-sky-700 bg-sky-100 border-sky-200 dark:text-sky-400 dark:bg-sky-500/10 dark:border-sky-500/25",
    bar: "bg-sky-500 dark:bg-sky-400",
    row: "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]",
    selectedRow: "border-sky-300 bg-sky-50 dark:border-sky-500/30 dark:bg-sky-500/[0.05]",
    dot: "bg-sky-500",
  },
};

/* ─────────────────────────────────────────────
   JOB DETAIL PANEL
───────────────────────────────────────────── */

function JobDetailPanel({ job, onClose }: { job: ActiveJob; onClose: () => void }) {
  const s = JOB_STATUS[job.status];
  const overBudget = job.actual_cost_gbp > job.budget_gbp;
  const budgetUsedPct = Math.min((job.actual_cost_gbp / job.budget_gbp) * 100, 100);
  const labourCost = job.labour_cost_gbp ?? Math.round(job.actual_cost_gbp * 0.62);
  const materialsCost = job.materials_cost_gbp ?? Math.round(job.actual_cost_gbp * 0.38);
  const labourPct = Math.round((labourCost / job.actual_cost_gbp) * 100);
  const matPct = 100 - labourPct;
  const marginPct = job.margin_pct ?? Math.round(((job.budget_gbp - job.actual_cost_gbp) / job.budget_gbp) * 100 * 10) / 10;
  const labourHours = job.labour_hours ?? Math.round(labourCost / 110);
  const profitAtBudget = job.budget_gbp * marginPct / 100;

  return (
    <div className="mt-2 mb-1 rounded-2xl border-2 border-indigo-300 dark:border-indigo-500/40 bg-white dark:bg-[#0c0c18] shadow-lg dark:shadow-none overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-3 flex-wrap">
          <div className={`w-2 h-2 rounded-full ${s.dot}`} />
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-white/40">{job.job_id}</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{job.name}</span>
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.pill}`}>{s.label}</span>
        </div>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white/70 transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="p-5 grid md:grid-cols-2 gap-5">
        {/* Left: financials */}
        <div className="space-y-5">
          {/* Budget vs actual */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Budget consumed</span>
              <span className={`text-xs font-bold ${overBudget ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-white/70"}`}>
                {budgetUsedPct.toFixed(0)}% of {fmtk(job.budget_gbp)}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
              <div className={`h-2.5 rounded-full transition-all ${overBudget ? "bg-rose-500" : "bg-indigo-500 dark:bg-indigo-400"}`} style={{ width: `${budgetUsedPct}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-slate-400 dark:text-white/25">Actual: {fmtk(job.actual_cost_gbp)}</span>
              <span className="text-[10px] text-slate-400 dark:text-white/25">Budget: {fmtk(job.budget_gbp)}</span>
            </div>
          </div>

          {/* Cost breakdown */}
          <div>
            <p className="text-xs font-semibold text-slate-600 dark:text-white/60 mb-3">Cost breakdown</p>
            <div className="space-y-2.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-slate-500 dark:text-white/40">Labour</span>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-white/70">{fmtk(labourCost)} · {labourPct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.07]">
                  <div className="h-1.5 rounded-full bg-violet-500 dark:bg-violet-400" style={{ width: `${labourPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-slate-500 dark:text-white/40">Materials</span>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-white/70">{fmtk(materialsCost)} · {matPct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.07]">
                  <div className="h-1.5 rounded-full bg-sky-500 dark:bg-sky-400" style={{ width: `${matPct}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Completion */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Completion</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{job.pct_complete}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
              <div className={`h-2 rounded-full ${s.bar} transition-all`} style={{ width: `${job.pct_complete}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-slate-400 dark:text-white/25">Start: {job.start_date}</span>
              <span className="text-[10px] text-slate-400 dark:text-white/25">Due: {job.due_date}</span>
            </div>
          </div>
        </div>

        {/* Right: key metrics + risk */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3.5 rounded-xl border ${marginPct >= 15 ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/[0.04]" : marginPct >= 5 ? "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.04]" : "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.04]"}`}>
              <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Est. Margin</p>
              <p className={`text-xl font-bold ${marginPct >= 15 ? "text-emerald-700 dark:text-emerald-300" : marginPct >= 5 ? "text-amber-700 dark:text-amber-300" : "text-rose-700 dark:text-rose-300"}`}>
                {marginPct.toFixed(1)}%
              </p>
              <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">on budget</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
              <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Profit (est.)</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{fmtk(profitAtBudget)}</p>
              <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">at budget margin</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
              <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Labour hrs</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{labourHours}</p>
              <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">logged to date</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
              <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Crew</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{job.crew}</p>
              <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">{job.client}</p>
            </div>
          </div>

          {job.risk_flag ? (
            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/25 bg-amber-50 dark:bg-amber-500/[0.06]">
              <div className="flex items-start gap-2">
                <AlertTriangle size={12} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">Risk flag</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">{job.risk_flag}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/[0.04]">
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-emerald-600 dark:text-emerald-400" />
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">No active risk flags</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   JOB CARD
───────────────────────────────────────────── */

function JobCard({ job, selected, onSelect }: { job: ActiveJob; selected: boolean; onSelect: (id: string | null) => void }) {
  const s = JOB_STATUS[job.status];
  const overBudget = job.actual_cost_gbp > job.budget_gbp;
  const marginPct = job.margin_pct ?? Math.round(((job.budget_gbp - job.actual_cost_gbp) / job.budget_gbp) * 100 * 10) / 10;
  const marginColor = marginPct >= 15 ? "text-emerald-600 dark:text-emerald-400" : marginPct >= 5 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400";

  return (
    <div>
      <div
        onClick={() => onSelect(selected ? null : job.job_id)}
        className={`p-4 rounded-xl border shadow-sm dark:shadow-none cursor-pointer transition-all hover:shadow-md dark:hover:border-white/15 ${selected ? s.selectedRow : s.row}`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-1.5 shrink-0">
            <div className={`w-2 h-2 rounded-full ${s.dot}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-white/30">{job.job_id}</span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.pill}`}>{s.label}</span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{job.name}</p>
                <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">{job.client} · {job.crew}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold ${marginColor}`}>{marginPct.toFixed(0)}%</p>
                <p className="text-[9px] text-slate-400 dark:text-white/25 uppercase tracking-wider">Margin</p>
              </div>
            </div>
            <div className="flex gap-4 mt-3 pt-2.5 border-t border-slate-100 dark:border-white/[0.05]">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">Budget</p>
                <p className="text-xs font-bold text-slate-600 dark:text-white/60">{fmtk(job.budget_gbp)}</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">Actual cost</p>
                <p className={`text-xs font-bold ${overBudget ? "text-rose-600 dark:text-rose-400" : "text-slate-600 dark:text-white/60"}`}>{fmtk(job.actual_cost_gbp)}</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">Complete</p>
                <p className="text-xs font-bold text-slate-600 dark:text-white/60">{job.pct_complete}%</p>
              </div>
              {job.risk_flag && (
                <div className="ml-auto flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <AlertTriangle size={11} />
                  <span className="text-[10px] font-semibold">{job.risk_flag}</span>
                </div>
              )}
              <div className="ml-auto shrink-0">
                {selected ? <ChevronDown size={14} className="text-indigo-500 dark:text-indigo-400" /> : <ChevronRight size={14} className="text-slate-300 dark:text-white/20" />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selected && <JobDetailPanel job={job} onClose={() => onSelect(null)} />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function InsightLayer({ data }: { data: InventoryCoDashboard }) {
  const [activeTab, setActiveTab] = useState<Tab>("financial");
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("month");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const { kpis, operationalKPIs, monthlyRevenue, topProducts, lowStockItems, activeJobs, source } = data;

  const totalCost = kpis.totalRevenue - kpis.totalProfit;
  const revenueGrowthPct = monthlyRevenue.length >= 2
    ? (((monthlyRevenue.at(-1)!.revenue - monthlyRevenue[0].revenue) / monthlyRevenue[0].revenue) * 100).toFixed(0)
    : null;

  const activeOnlyJobs = activeJobs.filter((j) => j.status !== "complete");
  const totalJobBudget = activeOnlyJobs.reduce((s, j) => s + j.budget_gbp, 0);
  const totalJobActual = activeOnlyJobs.reduce((s, j) => s + j.actual_cost_gbp, 0);
  const jobsSortedByMargin = [...activeOnlyJobs].sort((a, b) => {
    const mA = a.margin_pct ?? ((a.budget_gbp - a.actual_cost_gbp) / a.budget_gbp * 100);
    const mB = b.margin_pct ?? ((b.budget_gbp - b.actual_cost_gbp) / b.budget_gbp * 100);
    return mA - mB;
  });

  const timePeriods: { id: TimePeriod; label: string }[] = [
    { id: "week",  label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "last",  label: "Last Month" },
  ];

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "financial",  label: "Financial",       icon: Activity   },
    { id: "products",   label: "Products",        icon: BarChart2  },
    { id: "jobs",       label: "Jobs & Margin",   icon: Briefcase  },
    { id: "inventory",  label: "Inventory",       icon: Package    },
  ];

  return (
    <div className="space-y-0">

      {/* ── SYSTEM CHROME ── */}
      <div className="rounded-t-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c18] shadow-sm dark:shadow-none overflow-hidden">

        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-white/[0.08]" />
            <p className="text-xs font-semibold text-slate-500 dark:text-white/40">InventoryCo · Financial Operating Layer</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 dark:text-white/25">Live</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 dark:bg-white/[0.04] rounded-lg p-0.5 border border-slate-200 dark:border-white/[0.07]">
              {timePeriods.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setTimePeriod(p.id)}
                  className={`px-3 py-1.5 text-[11px] font-semibold rounded-md transition-all ${timePeriod === p.id ? "bg-white dark:bg-white/[0.08] text-slate-800 dark:text-white shadow-sm" : "text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/50"}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5 border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] rounded-lg px-3 py-1.5">
              <Database size={11} className={source === "supabase" ? "text-emerald-500" : "text-slate-400 dark:text-white/25"} />
              <span className={`text-[10px] font-semibold ${source === "supabase" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-white/25"}`}>
                {source === "supabase" ? "Supabase" : "Demo"}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-slate-100 dark:border-white/[0.06] px-5 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-3 text-xs font-semibold transition-all border-b-2 -mb-px whitespace-nowrap ${activeTab === tab.id ? "border-indigo-500 text-indigo-600 dark:text-indigo-400" : "border-transparent text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/50"}`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="p-6">

          {/* ════ FINANCIAL TAB ════ */}
          {activeTab === "financial" && (
            <div className="space-y-8">

              {/* Hero financial metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">
                {[
                  { label: "Revenue",       value: fmt(kpis.totalRevenue),  sub: "6-month total",           accent: false },
                  { label: "Cost of Sales", value: fmt(totalCost),          sub: "direct costs, 6 months",  accent: false },
                  { label: "Gross Profit",  value: fmt(kpis.totalProfit),   sub: "after direct costs",      accent: true  },
                  { label: "Gross Margin",  value: pct(kpis.grossMarginPct),sub: "blended, all products",   accent: true  },
                ].map((m) => (
                  <div key={m.label} className={`p-7 flex flex-col gap-3 ${m.accent ? "bg-emerald-50 dark:bg-emerald-500/[0.05]" : "bg-white dark:bg-[#07070e]"}`}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">
                      {m.label}
                    </p>
                    <p className={`text-3xl md:text-4xl font-bold tracking-tight leading-none ${m.accent ? "text-emerald-700 dark:text-emerald-300" : "text-slate-900 dark:text-white"}`}>
                      {m.value}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-white/35">{m.sub}</p>
                  </div>
                ))}
              </div>

              {/* Trend chart */}
              <div>
                <SectionLabel label="Revenue & Profit Trend" sub="Oct 2025 – Mar 2026 · auto-generated from data model" />
                <div className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-4 mb-4 text-xs text-slate-400 dark:text-white/40">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500" />Revenue</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Profit</span>
                    {revenueGrowthPct && (
                      <span className="ml-auto flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <ArrowUpRight size={13} /> +{revenueGrowthPct}% revenue growth over period
                      </span>
                    )}
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                      <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`} width={42} />
                      <Tooltip content={<RevenueTooltip />} />
                      <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#revGrad)" dot={{ fill: "#8b5cf6", r: 3, strokeWidth: 0 }} />
                      <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fill="url(#profGrad)" dot={{ fill: "#10b981", r: 3, strokeWidth: 0 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Financial insights */}
              <div>
                <SectionLabel label="Financial Insights" />
                <div className="grid sm:grid-cols-2 gap-3">
                  <InsightCard
                    index={1}
                    severity="info"
                    text={`Revenue grew ${revenueGrowthPct}% over 6 months — from £54k to £100k per month.`}
                    action="Growth is real and tracked from the same data model. No manual reporting needed to see this trend."
                  />
                  <InsightCard
                    index={2}
                    severity="warn"
                    text="Gross margin at 28.4% — Emergency Exit Sign (17.8%) and Commercial Batten (22.4%) are pulling the blended margin down."
                    action="Two product categories are underperforming on margin. Pricing or mix adjustment would improve blended profitability."
                  />
                  <InsightCard
                    index={3}
                    severity="alert"
                    text="Material cost variance of +6.8% across active jobs is reducing job-level profit on current portfolio."
                    action="Two jobs are tracking over labour and material estimates. Margin erosion is visible now — not at job close."
                  />
                </div>
              </div>
            </div>
          )}

          {/* ════ PRODUCTS TAB ════ */}
          {activeTab === "products" && (
            <div className="space-y-8">

              {/* Summary callout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">
                {[
                  { label: "Products tracked",    value: String(topProducts.length), sub: "in this period" },
                  { label: "Total revenue",        value: fmt(topProducts.reduce((s, p) => s + p.revenue, 0)), sub: "across all products" },
                  { label: "Total profit",         value: fmt(topProducts.reduce((s, p) => s + p.profit,  0)), sub: "gross, all products" },
                  { label: "Best margin",          value: pct(Math.max(...topProducts.map(p => p.margin_pct))), sub: "highest product margin" },
                ].map((m) => (
                  <div key={m.label} className="bg-white dark:bg-[#07070e] p-6 flex flex-col gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">{m.label}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{m.value}</p>
                    <p className="text-xs text-slate-400 dark:text-white/35">{m.sub}</p>
                  </div>
                ))}
              </div>

              <SectionLabel label="Revenue, Profit & Margin — By Product" />

              <div className="space-y-3">
                {[...topProducts].sort((a, b) => b.profit - a.profit).map((p, i) => {
                  const maxRevenue = Math.max(...topProducts.map(x => x.revenue));
                  const revBar = Math.round((p.revenue / maxRevenue) * 100);
                  const marginGood = p.margin_pct >= 30;
                  const marginWarn = p.margin_pct >= 20 && p.margin_pct < 30;
                  const marginColor = marginGood ? "text-emerald-600 dark:text-emerald-400" : marginWarn ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400";
                  const barColor = marginGood ? "bg-emerald-500" : marginWarn ? "bg-amber-500" : "bg-rose-500";

                  return (
                    <div key={p.product_name} className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-white/25 w-4">#{i + 1}</span>
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{p.product_name}</p>
                            <span className="text-[10px] text-slate-400 dark:text-white/30 border border-slate-200 dark:border-white/[0.08] px-2 py-0.5 rounded-full shrink-0">{p.category}</span>
                          </div>
                        </div>
                        <span className={`text-base font-bold shrink-0 ${marginColor}`}>{pct(p.margin_pct)}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">Revenue</p>
                          <p className="text-sm font-bold text-slate-700 dark:text-white/70">{fmt(p.revenue)}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">Gross Profit</p>
                          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{fmt(p.profit)}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">Margin</p>
                          <p className={`text-sm font-bold ${marginColor}`}>{pct(p.margin_pct)}</p>
                        </div>
                      </div>
                      {/* Revenue bar */}
                      <div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/[0.06]">
                          <div className={`h-1.5 rounded-full transition-all ${barColor}`} style={{ width: `${revBar}%` }} />
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-white/25 mt-1">Revenue share relative to top product</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Top vs worst callout */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/[0.05]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Highest margin</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {topProducts.reduce((best, p) => p.margin_pct > best.margin_pct ? p : best).product_name}
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {pct(Math.max(...topProducts.map(p => p.margin_pct)))}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-white/40 mt-1">Best performing product on margin</p>
                </div>
                <div className="p-5 rounded-xl border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/[0.05]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-2">Lowest margin</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {topProducts.reduce((worst, p) => p.margin_pct < worst.margin_pct ? p : worst).product_name}
                  </p>
                  <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
                    {pct(Math.min(...topProducts.map(p => p.margin_pct)))}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-white/40 mt-1">Pulling blended margin below 30% target</p>
                </div>
              </div>
            </div>
          )}

          {/* ════ JOBS & MARGIN TAB ════ */}
          {activeTab === "jobs" && (
            <div className="space-y-6">

              {/* Financial summary of active jobs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">
                {[
                  { label: "Total job budget",  value: fmt(totalJobBudget),  sub: `${activeOnlyJobs.length} active jobs`,   accent: false },
                  { label: "Actual cost to date",value: fmt(totalJobActual),  sub: "committed across portfolio",             accent: false },
                  { label: "Jobs at risk",       value: String(operationalKPIs.jobs_at_risk), sub: "flagged — margin below target", accent: true },
                ].map((m) => (
                  <div key={m.label} className={`p-6 flex flex-col gap-2 ${m.accent ? "bg-amber-50 dark:bg-amber-500/[0.05]" : "bg-white dark:bg-[#07070e]"}`}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">{m.label}</p>
                    <p className={`text-2xl font-bold ${m.accent ? "text-amber-700 dark:text-amber-300" : "text-slate-900 dark:text-white"}`}>{m.value}</p>
                    <p className="text-xs text-slate-400 dark:text-white/35">{m.sub}</p>
                  </div>
                ))}
              </div>

              <SectionLabel label="Jobs by Margin — Lowest First" sub="Click any job to see cost breakdown and risk detail" />

              <div className="space-y-2">
                {jobsSortedByMargin.map((job) => (
                  <JobCard
                    key={job.job_id}
                    job={job}
                    selected={selectedJobId === job.job_id}
                    onSelect={setSelectedJobId}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ════ INVENTORY TAB ════ */}
          {activeTab === "inventory" && (
            <div className="space-y-6">

              {/* Inventory hero */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">
                {[
                  { label: "Inventory value",  value: fmt(kpis.inventoryValue),         sub: "at cost across all SKUs",         accent: false },
                  { label: "Low stock alerts",  value: String(kpis.lowStockCount) + " SKUs", sub: "below reorder level",         accent: kpis.lowStockCount > 0 },
                  { label: "Cost variance",    value: `+${operationalKPIs.cost_variance_pct}%`, sub: "materials: actuals vs estimates", accent: true },
                ].map((m) => (
                  <div key={m.label} className={`p-6 flex flex-col gap-2 ${m.accent ? "bg-rose-50 dark:bg-rose-500/[0.05]" : "bg-white dark:bg-[#07070e]"}`}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">{m.label}</p>
                    <p className={`text-2xl font-bold ${m.accent ? "text-rose-700 dark:text-rose-300" : "text-slate-900 dark:text-white"}`}>{m.value}</p>
                    <p className="text-xs text-slate-400 dark:text-white/35">{m.sub}</p>
                  </div>
                ))}
              </div>

              <SectionLabel label="Stock Alerts — Below Reorder Level" sub="Auto-generated · revenue impact noted" />

              <div className="space-y-3">
                {lowStockItems.map((a) => {
                  const product = topProducts.find(p => p.product_name === a.product_name);
                  const revenueAtRisk = product ? product.revenue : null;
                  return (
                    <div
                      key={a.product_name}
                      className={`p-5 rounded-xl border ${a.severity === "critical" ? "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.06]" : "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.06]"}`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <AlertTriangle size={14} className={a.severity === "critical" ? "text-rose-600 dark:text-rose-400 shrink-0" : "text-amber-600 dark:text-amber-400 shrink-0"} />
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{a.product_name}</p>
                            <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">
                              {a.stock_level} units in stock · Reorder level: {a.reorder_level} units
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold shrink-0 px-2.5 py-1 rounded-full border ${a.severity === "critical" ? "text-rose-700 bg-rose-100 border-rose-200 dark:text-rose-300 dark:bg-rose-500/10 dark:border-rose-500/25" : "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-300 dark:bg-amber-500/10 dark:border-amber-500/25"}`}>
                          {a.severity === "critical" ? "Critical" : "Low stock"}
                        </span>
                      </div>
                      {/* Stock level bar */}
                      <div className="mb-3">
                        <div className="h-2 rounded-full bg-slate-200/70 dark:bg-white/[0.08] overflow-hidden">
                          <div
                            className={`h-2 rounded-full transition-all ${a.severity === "critical" ? "bg-rose-500" : "bg-amber-500"}`}
                            style={{ width: `${Math.min((a.stock_level / a.reorder_level) * 100, 100)}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-white/25 mt-1">
                          {((a.stock_level / a.reorder_level) * 100).toFixed(0)}% of reorder level
                        </p>
                      </div>
                      {revenueAtRisk && (
                        <p className="text-xs text-slate-600 dark:text-white/50">
                          <span className="font-semibold">Revenue at risk:</span> {fmt(revenueAtRisk)} generated from this product last period.
                          {a.severity === "critical" && " Stock exhaustion will pause revenue from this line until restocked."}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── CLOSING STATEMENT ── */}
      <div className="mt-6 p-8 rounded-2xl border border-indigo-200 dark:border-indigo-500/25 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-500/[0.06] dark:to-violet-500/[0.04] text-center">
        <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
          This is the level of financial and operational visibility we build for our clients.
        </p>
        <p className="text-sm text-slate-500 dark:text-white/45 max-w-xl mx-auto leading-relaxed">
          Revenue, margin, cost, and inventory — from one centralised data model. Updated automatically. No manual reporting. No version conflicts.
        </p>
      </div>
    </div>
  );
}
