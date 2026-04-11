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
  TrendingUp,
  AlertTriangle,
  Minus,
  Package,
  Database,
  Users,
  Clock,
  Briefcase,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  ChevronDown,
  ChevronRight,
  Activity,
  DollarSign,
  BarChart2,
  Layers,
  X,
} from "lucide-react";
import type {
  InventoryCoDashboard,
  ActiveJob,
  CrewStatus,
  MaterialAlert,
} from "@/lib/inventoryco";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

type Tab = "overview" | "jobs" | "labour" | "finance";
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

function SectionLabel({ label, count }: { label: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 shrink-0">
        {label}
      </p>
      {count !== undefined && (
        <span className="text-[10px] font-bold text-slate-400 dark:text-white/25 shrink-0">
          {count}
        </span>
      )}
      <div className="h-px flex-1 bg-slate-200 dark:bg-white/[0.06]" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVENUE TOOLTIP
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
   TOP KPI CARD
───────────────────────────────────────────── */

function TopKPI({
  label,
  value,
  delta,
  deltaPositive,
  sub,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  sub: string;
}) {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none flex flex-col gap-2">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">
        {label}
      </p>
      <div className="flex items-end gap-2 mt-1">
        <p className="text-2xl font-bold tracking-tight leading-none text-slate-900 dark:text-white">
          {value}
        </p>
        {delta && (
          <span
            className={`text-xs font-semibold mb-0.5 flex items-center gap-0.5 ${
              deltaPositive !== false
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {deltaPositive !== false ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {delta}
          </span>
        )}
      </div>
      <p className="text-[11px] text-slate-400 dark:text-white/35">{sub}</p>
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

  return (
    <div className="mt-2 mb-1 rounded-2xl border-2 border-indigo-300 dark:border-indigo-500/40 bg-white dark:bg-[#0c0c18] shadow-lg dark:shadow-none overflow-hidden">

      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${s.dot}`} />
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-white/40">{job.job_id}</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{job.name}</span>
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.pill}`}>
            {s.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white/70 transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      <div className="p-5 grid md:grid-cols-2 gap-5">

        {/* Left: progress + cost breakdown */}
        <div className="space-y-5">

          {/* Overall progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Completion</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{job.pct_complete}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
              <div
                className={`h-2.5 rounded-full ${s.bar} transition-all`}
                style={{ width: `${job.pct_complete}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-slate-400 dark:text-white/25">Start: {job.start_date}</span>
              <span className="text-[10px] text-slate-400 dark:text-white/25">Due: {job.due_date}</span>
            </div>
          </div>

          {/* Budget vs actual */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Budget consumed</span>
              <span className={`text-xs font-bold ${overBudget ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-white/70"}`}>
                {budgetUsedPct.toFixed(0)}% of {fmtk(job.budget_gbp)}
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all ${overBudget ? "bg-rose-500" : "bg-indigo-500 dark:bg-indigo-400"}`}
                style={{ width: `${budgetUsedPct}%` }}
              />
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
        </div>

        {/* Right: key metrics + flags */}
        <div className="space-y-4">

          {/* Metric grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
              <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Labour hrs</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{labourHours}</p>
              <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">hrs logged to date</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
              <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Crew</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{job.crew}</p>
              <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">{job.client}</p>
            </div>
            <div className={`p-3.5 rounded-xl border ${marginPct >= 15 ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/[0.04]" : marginPct >= 5 ? "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.04]" : "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.04]"}`}>
              <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Est. Margin</p>
              <p className={`text-xl font-bold ${marginPct >= 15 ? "text-emerald-700 dark:text-emerald-300" : marginPct >= 5 ? "text-amber-700 dark:text-amber-300" : "text-rose-700 dark:text-rose-300"}`}>
                {marginPct.toFixed(1)}%
              </p>
              <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">on budget</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
              <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Materials</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{fmtk(materialsCost)}</p>
              <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">committed to date</p>
            </div>
          </div>

          {/* Risk flags */}
          {job.risk_flag ? (
            <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/25 bg-amber-50 dark:bg-amber-500/[0.06]">
              <div className="flex items-start gap-2">
                <AlertTriangle size={12} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">Risk flag</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">{job.risk_flag}</p>
                  <p className="text-[11px] text-slate-500 dark:text-white/35 mt-1 leading-relaxed">
                    Identify margin issues before they impact profitability — flagged automatically from job data.
                  </p>
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
   JOB CARD (clickable)
───────────────────────────────────────────── */

function JobCard({
  job,
  selected,
  onSelect,
}: {
  job: ActiveJob;
  selected: boolean;
  onSelect: (id: string | null) => void;
}) {
  const s = JOB_STATUS[job.status];
  const overBudget = job.actual_cost_gbp > job.budget_gbp;
  const marginPct = job.margin_pct ?? Math.round(((job.budget_gbp - job.actual_cost_gbp) / job.budget_gbp) * 100 * 10) / 10;

  return (
    <div>
      <div
        onClick={() => onSelect(selected ? null : job.job_id)}
        className={`p-5 rounded-xl border shadow-sm dark:shadow-none cursor-pointer transition-all hover:shadow-md dark:hover:border-white/15 ${
          selected ? s.selectedRow : s.row
        }`}
      >
        <div className="flex items-start gap-3">
          {/* Status dot */}
          <div className="mt-1.5 shrink-0">
            <div className={`w-2 h-2 rounded-full ${s.dot}`} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Top row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-white/30">{job.job_id}</span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.pill}`}>
                    {s.label}
                  </span>
                  {job.risk_flag && (
                    <span className="text-[10px] font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/10 border border-amber-300/60 dark:border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle size={8} className="shrink-0" />
                      {job.risk_flag}
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{job.name}</p>
                <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">{job.client}</p>
              </div>
              <div className="text-right shrink-0 flex flex-col items-end gap-1">
                <p className="text-xs font-semibold text-slate-600 dark:text-white/60">{job.crew}</p>
                <p className="text-xs text-slate-400 dark:text-white/25">Due {job.due_date}</p>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  marginPct >= 15
                    ? "text-emerald-700 dark:text-emerald-400"
                    : marginPct >= 5
                    ? "text-amber-700 dark:text-amber-400"
                    : "text-rose-700 dark:text-rose-400"
                }`}>
                  {marginPct.toFixed(0)}% margin
                </span>
              </div>
            </div>

            {/* Bottom: progress + budget */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-medium text-slate-400 dark:text-white/30">Progress</span>
                  <span className="text-[10px] font-bold text-slate-600 dark:text-white/60">{job.pct_complete}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/[0.07]">
                  <div className={`h-1.5 rounded-full ${s.bar} transition-all`} style={{ width: `${job.pct_complete}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-medium text-slate-400 dark:text-white/30">Budget vs actual</span>
                  {overBudget && <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">Over</span>}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-xs font-bold ${overBudget ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-white/70"}`}>
                    {fmtk(job.actual_cost_gbp)}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-white/30">/ {fmtk(job.budget_gbp)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expand indicator */}
          <div className="shrink-0 mt-1">
            {selected
              ? <ChevronDown size={14} className="text-indigo-500 dark:text-indigo-400" />
              : <ChevronRight size={14} className="text-slate-300 dark:text-white/20" />
            }
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && <JobDetailPanel job={job} onClose={() => onSelect(null)} />}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CREW CARD
───────────────────────────────────────────── */

const CREW_STATUS = {
  available: {
    label: "Available",
    color: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20",
    bar: "bg-emerald-500 dark:bg-emerald-400",
    capacityNote: "Capacity available for new starts",
  },
  "near-capacity": {
    label: "Near capacity",
    color: "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20",
    bar: "bg-amber-500 dark:bg-amber-400",
    capacityNote: "Limited bandwidth — monitor before scheduling",
  },
  overallocated: {
    label: "Overallocated",
    color: "text-rose-700 bg-rose-100 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20",
    bar: "bg-rose-500 dark:bg-rose-400",
    capacityNote: "Over capacity — review job schedule",
  },
};

function CrewCard({ crew }: { crew: CrewStatus }) {
  const s = CREW_STATUS[crew.status];
  const remainingHours = crew.capacity_hours - crew.hours_this_week;

  return (
    <div className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
      <div className="flex items-start justify-between gap-2 mb-4">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{crew.name}</p>
          <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">Lead: {crew.lead}</p>
        </div>
        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border shrink-0 ${s.color}`}>
          {s.label}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 font-semibold uppercase tracking-widest">Jobs</p>
          <p className="text-xl font-bold leading-none text-slate-900 dark:text-white">{crew.jobs_active}</p>
          <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">active</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 font-semibold uppercase tracking-widest">Hours</p>
          <p className="text-xl font-bold leading-none text-slate-900 dark:text-white">
            {crew.hours_this_week}
            <span className="text-xs text-slate-400 dark:text-white/30 font-normal">/{crew.capacity_hours}</span>
          </p>
          <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">{remainingHours > 0 ? `${remainingHours} remaining` : "At capacity"}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 font-semibold uppercase tracking-widest">Util.</p>
          <p className={`text-xl font-bold leading-none ${crew.utilisation_pct >= 95 ? "text-rose-700 dark:text-rose-300" : crew.utilisation_pct >= 88 ? "text-amber-700 dark:text-amber-300" : "text-emerald-700 dark:text-emerald-300"}`}>
            {crew.utilisation_pct}%
          </p>
          <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5">this week</p>
        </div>
      </div>

      {/* Utilisation bar */}
      <div className="mb-3">
        <div className="h-2 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
          <div className={`h-2 rounded-full ${s.bar} transition-all`} style={{ width: `${crew.utilisation_pct}%` }} />
        </div>
      </div>

      <p className="text-[11px] text-slate-400 dark:text-white/30 leading-relaxed">{s.capacityNote}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MATERIAL ROW
───────────────────────────────────────────── */

const MAT_SEVERITY = {
  over: {
    label: "Over budget",
    pill: "text-rose-700 bg-rose-100 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20",
    border: "border-rose-200 bg-rose-50 dark:border-rose-500/15 dark:bg-rose-500/[0.03]",
  },
  watch: {
    label: "Watch",
    pill: "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20",
    border: "border-amber-200 bg-amber-50 dark:border-amber-500/15 dark:bg-amber-500/[0.03]",
  },
  "supply-risk": {
    label: "Supply risk",
    pill: "text-orange-700 bg-orange-100 border-orange-200 dark:text-orange-400 dark:bg-orange-500/10 dark:border-orange-500/20",
    border: "border-orange-200 bg-orange-50 dark:border-orange-500/15 dark:bg-orange-500/[0.03]",
  },
};

function MaterialRow({ mat }: { mat: MaterialAlert }) {
  const s = MAT_SEVERITY[mat.severity];

  return (
    <div className={`p-4 rounded-xl border ${s.border}`}>
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{mat.material}</p>
          <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">{mat.job_id} · {mat.job_name}</p>
        </div>
        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border shrink-0 ${s.pill}`}>
          {s.label}
        </span>
      </div>
      {mat.severity !== "supply-risk" ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs mb-2">
          <span className="text-slate-500 dark:text-white/40">
            Committed: <span className="text-slate-700 dark:text-white/70 font-semibold">{fmt(mat.committed_gbp)}</span>
          </span>
          <span className="text-slate-300 dark:text-white/20">·</span>
          <span className="text-slate-500 dark:text-white/40">Estimate: {fmt(mat.estimate_gbp)}</span>
          <span className="text-slate-300 dark:text-white/20">·</span>
          <span className="font-bold text-rose-600 dark:text-rose-400">+{mat.variance_pct.toFixed(1)}% over</span>
        </div>
      ) : (
        <p className="text-xs text-slate-500 dark:text-white/40 mb-2">Committed: {fmt(mat.committed_gbp)}</p>
      )}
      <p className="text-[11px] text-slate-400 dark:text-white/30 italic leading-relaxed">{mat.note}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */

export default function InsightLayer({ data }: { data: InventoryCoDashboard }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("month");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const {
    kpis,
    operationalKPIs,
    monthlyRevenue,
    topProducts,
    lowStockItems,
    activeJobs,
    crewStatuses,
    materialAlerts,
    source,
  } = data;

  const revenueGrowthPct =
    monthlyRevenue.length >= 2
      ? (
          ((monthlyRevenue.at(-1)!.revenue - monthlyRevenue[0].revenue) /
            monthlyRevenue[0].revenue) *
          100
        ).toFixed(0)
      : null;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview",  label: "Overview",          icon: Activity },
    { id: "jobs",      label: "Job Tracker",        icon: Briefcase },
    { id: "labour",    label: "Labour & Materials", icon: Users },
    { id: "finance",   label: "Finance",            icon: BarChart2 },
  ];

  const timePeriods: { id: TimePeriod; label: string }[] = [
    { id: "week",  label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "last",  label: "Last Month" },
  ];

  return (
    <div className="space-y-0">

      {/* ══════════════════════════════════════
          SYSTEM CHROME — toolbar
      ══════════════════════════════════════ */}
      <div className="rounded-t-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c18] shadow-sm dark:shadow-none overflow-hidden">

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
            </div>
            <div className="h-4 w-px bg-slate-200 dark:bg-white/[0.08]" />
            <p className="text-xs font-semibold text-slate-500 dark:text-white/40">InventoryCo · Operations</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 dark:text-white/25">Live</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Time filter */}
            <div className="flex items-center bg-slate-100 dark:bg-white/[0.04] rounded-lg p-0.5 border border-slate-200 dark:border-white/[0.07]">
              {timePeriods.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setTimePeriod(p.id)}
                  className={`px-3 py-1.5 text-[11px] font-semibold rounded-md transition-all ${
                    timePeriod === p.id
                      ? "bg-white dark:bg-white/[0.08] text-slate-800 dark:text-white shadow-sm"
                      : "text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/50"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Source badge */}
            <div className="flex items-center gap-1.5 border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] rounded-lg px-3 py-1.5">
              <Database size={11} className={source === "supabase" ? "text-emerald-500" : "text-slate-400 dark:text-white/25"} />
              <span className={`text-[10px] font-semibold ${source === "supabase" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-white/25"}`}>
                {source === "supabase" ? "Supabase" : "Demo"}
              </span>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center border-b border-slate-100 dark:border-white/[0.06] px-5 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-3 text-xs font-semibold transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/50"
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="p-6">

          {/* ══ OVERVIEW TAB ══ */}
          {activeTab === "overview" && (
            <div className="space-y-8">

              {/* Insight engine */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={13} className="text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/40">Insight engine</span>
                  <span className="text-[10px] text-slate-300 dark:text-white/20">— auto-generated from live data</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <InsightCard index={1} severity="alert"
                    text="Two active jobs are over labour budget by more than 10%"
                    action="J-1042 and J-1055 are tracking above labour estimate — now surfaced automatically rather than discovered at job close."
                  />
                  <InsightCard index={2} severity="alert"
                    text="One high-value project is at risk due to material shortages"
                    action="Emergency Exit & Safety Packs delayed at source, affecting J-1051. Surfaced 3 days before a manual review would have caught it."
                  />
                  <InsightCard index={3} severity="warn"
                    text="Crew C is nearing full allocation next week"
                    action="At 94% utilisation — limited capacity for new job starts. Make staffing decisions with confidence before it becomes a problem."
                  />
                  <InsightCard index={4} severity="warn"
                    text="Material cost variance is reducing margin on retrofit work"
                    action="LED Panel Pro units required additional on-site units — committed spend 18.2% above estimate on J-1042."
                  />
                  <InsightCard index={5} severity="info"
                    text="Stock delays affecting project delivery timelines"
                    action="Outdoor Floodlight stock at 27% of reorder level — critical shortfall that could delay upcoming site works."
                  />
                </div>
              </div>

              {/* KPI overview */}
              <div>
                <SectionLabel label="Business Overview" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <TopKPI label="Revenue" value={fmt(kpis.totalRevenue)} delta={revenueGrowthPct ? `+${revenueGrowthPct}%` : undefined} deltaPositive={true} sub="6-month total" />
                  <TopKPI label="Gross Profit" value={fmt(kpis.totalProfit)} delta={`${pct(kpis.grossMarginPct)} margin`} deltaPositive={true} sub="from centralised model" />
                  <TopKPI label="Active Jobs" value={String(operationalKPIs.active_jobs)} sub="across all crews" />
                  <TopKPI label="Jobs at Risk" value={String(operationalKPIs.jobs_at_risk)} deltaPositive={false} sub="flagged for review" />
                  <TopKPI label="Crew Utilisation" value={`${operationalKPIs.crew_utilisation_pct}%`} sub="average, all crews" />
                  <TopKPI label="Labour hrs / wk" value={String(operationalKPIs.labour_hours_week)} sub="logged this week" />
                  <TopKPI label="Materials Committed" value={fmtk(operationalKPIs.materials_committed_gbp)} sub="to active jobs" />
                  <TopKPI label="Cost Variance" value={`+${operationalKPIs.cost_variance_pct}%`} deltaPositive={false} sub="actuals vs estimates" />
                </div>
              </div>

              {/* Revenue chart */}
              <div>
                <SectionLabel label="Revenue Trend" />
                <div className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] shadow-sm dark:shadow-none">
                  <div className="flex items-start justify-between mb-5 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">Monthly revenue & profit — Oct 2025 to Mar 2026</p>
                      <p className="text-xs text-slate-400 dark:text-white/35 mt-1">Served from centralised data model. No manual assembly.</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-white/40 shrink-0">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500" />Revenue</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Profit</span>
                    </div>
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
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                      <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`} width={42} />
                      <Tooltip content={<RevenueTooltip />} />
                      <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} fill="url(#revGrad)" />
                      <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fill="url(#profGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ══ JOB TRACKER TAB ══ */}
          {activeTab === "jobs" && (
            <div className="space-y-5">

              {/* Summary bar */}
              <div className="flex flex-wrap gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
                {[
                  { label: "Active", count: activeJobs.filter(j => j.status !== "complete").length, color: "text-indigo-600 dark:text-indigo-400" },
                  { label: "On Track", count: activeJobs.filter(j => j.status === "on-track").length, color: "text-emerald-600 dark:text-emerald-400" },
                  { label: "At Risk", count: activeJobs.filter(j => j.status === "at-risk").length, color: "text-amber-600 dark:text-amber-400" },
                  { label: "Delayed", count: activeJobs.filter(j => j.status === "delayed").length, color: "text-rose-600 dark:text-rose-400" },
                  { label: "Complete", count: activeJobs.filter(j => j.status === "complete").length, color: "text-slate-500 dark:text-white/40" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${s.color}`}>{s.count}</span>
                    <span className="text-xs text-slate-400 dark:text-white/30">{s.label}</span>
                  </div>
                ))}
                <div className="ml-auto text-xs text-slate-400 dark:text-white/25 self-center">
                  Click a job to see full detail
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "On Track", dot: "bg-emerald-500" },
                  { label: "At Risk",  dot: "bg-amber-500" },
                  { label: "Delayed",  dot: "bg-rose-500" },
                  { label: "Complete", dot: "bg-indigo-500" },
                  { label: "Starting", dot: "bg-sky-500" },
                ].map((s) => (
                  <span key={s.label} className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/30">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                ))}
              </div>

              {/* Job cards */}
              <div className="space-y-2">
                {activeJobs.map((job) => (
                  <JobCard
                    key={job.job_id}
                    job={job}
                    selected={selectedJobId === job.job_id}
                    onSelect={setSelectedJobId}
                  />
                ))}
              </div>

              <p className="text-xs text-slate-400 dark:text-white/25 text-center pt-2">
                Spot operational bottlenecks early — job status, crew load, and budget variance updated automatically.
              </p>
            </div>
          )}

          {/* ══ LABOUR & MATERIALS TAB ══ */}
          {activeTab === "labour" && (
            <div className="space-y-8">

              {/* Crew summary */}
              <div>
                <div className="flex items-center gap-4 mb-5 p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Total capacity</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">480 hrs</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/25">3 crews · this week</p>
                  </div>
                  <div className="h-10 w-px bg-slate-200 dark:bg-white/[0.06]" />
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Hours logged</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{operationalKPIs.labour_hours_week}</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/25">across all crews</p>
                  </div>
                  <div className="h-10 w-px bg-slate-200 dark:bg-white/[0.06]" />
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Avg utilisation</p>
                    <p className="text-lg font-bold text-amber-700 dark:text-amber-300">{operationalKPIs.crew_utilisation_pct}%</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/25">nearing capacity</p>
                  </div>
                  <div className="h-10 w-px bg-slate-200 dark:bg-white/[0.06]" />
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Active jobs</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{operationalKPIs.active_jobs}</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/25">{operationalKPIs.jobs_at_risk} at risk</p>
                  </div>
                </div>

                <SectionLabel label="Crew Status" count={crewStatuses.length} />
                <div className="grid md:grid-cols-3 gap-4">
                  {crewStatuses.map((crew) => (
                    <CrewCard key={crew.name} crew={crew} />
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-xl border border-amber-200 dark:border-white/[0.06] bg-amber-50 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle size={12} className="text-amber-600 dark:text-amber-400" />
                    <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Crew C nearing full allocation next week</p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-white/35 leading-relaxed">
                    Make staffing and scheduling decisions with confidence — crew capacity visible before it becomes a delivery problem.
                  </p>
                </div>
              </div>

              {/* Materials */}
              <div>
                <div className="flex items-center gap-4 mb-5 p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]">
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Materials committed</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{fmtk(operationalKPIs.materials_committed_gbp)}</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/25">across active jobs</p>
                  </div>
                  <div className="h-10 w-px bg-slate-200 dark:bg-white/[0.06]" />
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Cost variance</p>
                    <p className="text-lg font-bold text-amber-700 dark:text-amber-300">+{operationalKPIs.cost_variance_pct}%</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/25">actuals vs estimates</p>
                  </div>
                  <div className="h-10 w-px bg-slate-200 dark:bg-white/[0.06]" />
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1 uppercase tracking-widest font-semibold">Active alerts</p>
                    <p className="text-lg font-bold text-rose-700 dark:text-rose-300">{materialAlerts.length}</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/25">flagged lines</p>
                  </div>
                </div>

                <SectionLabel label="Materials & Cost Exposure" count={materialAlerts.length} />
                <div className="space-y-3">
                  {materialAlerts.map((mat) => (
                    <MaterialRow key={mat.job_id + mat.material} mat={mat} />
                  ))}
                </div>
                <div className="mt-3 p-4 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle size={12} className="text-slate-400 dark:text-white/30" />
                    <p className="text-xs font-semibold text-slate-500 dark:text-white/50">All other materials within estimate</p>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-white/30 leading-relaxed">
                    12 of 15 active material lines tracking at or below estimate. Only flagged lines shown above.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ══ FINANCE TAB ══ */}
          {activeTab === "finance" && (
            <div className="space-y-8">

              {/* Financial KPIs */}
              <div>
                <SectionLabel label="Financial Performance" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Revenue", value: fmt(kpis.totalRevenue), sub: revenueGrowthPct ? `+${revenueGrowthPct}% over period` : "6-month total", positive: true },
                    { label: "Gross Profit",  value: fmt(kpis.totalProfit),  sub: `${pct(kpis.grossMarginPct)} margin`,         positive: true },
                    { label: "Inventory Value", value: fmt(kpis.inventoryValue), sub: "at cost across all SKUs",               positive: null },
                    { label: "Low Stock Alerts", value: `${kpis.lowStockCount} SKUs`, sub: "below reorder level",              positive: kpis.lowStockCount === 0 ? null : false },
                  ].map((card) => (
                    <div key={card.label} className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none flex flex-col gap-3">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">{card.label}</p>
                      <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{card.value}</p>
                      <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-white/[0.06]">
                        {card.positive === true  && <TrendingUp  size={11} className="text-emerald-600 dark:text-emerald-400" />}
                        {card.positive === false && <AlertTriangle size={11} className="text-amber-600 dark:text-amber-400" />}
                        {card.positive === null  && <Minus size={11} className="text-slate-300 dark:text-white/20" />}
                        <span className={`text-xs ${card.positive === true ? "text-emerald-600 dark:text-emerald-400 font-medium" : card.positive === false ? "text-amber-600 dark:text-amber-400 font-medium" : "text-slate-400 dark:text-white/30"}`}>
                          {card.sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Products + Inventory side by side */}
              <div className="grid md:grid-cols-2 gap-4">

                {/* Top products */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
                  <SectionLabel label="Product Performance" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white -mt-2 mb-5">Top products — gross profit</p>
                  <div className="space-y-4">
                    {topProducts.map((p) => (
                      <div key={p.product_name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="min-w-0">
                            <span className="text-xs font-semibold truncate block text-slate-900 dark:text-white">{p.product_name}</span>
                            <span className="text-[10px] text-slate-400 dark:text-white/25">{p.category}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-3">
                            <span className="text-[10px] text-slate-400 dark:text-white/30">{pct(p.margin_pct)}</span>
                            <span className="text-xs font-bold text-slate-700 dark:text-white/70">{fmt(p.profit)}</span>
                          </div>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/[0.06]">
                          <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-400" style={{ width: `${p.bar}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inventory alerts */}
                <div className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
                  <SectionLabel label="Inventory Alerts" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white -mt-2 mb-5">Auto-generated · below reorder level</p>
                  {lowStockItems.length === 0 ? (
                    <div className="flex items-center gap-3 text-sm text-emerald-700 dark:text-emerald-400 p-4 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/[0.07]">
                      <Package size={14} /> All products above reorder level
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {lowStockItems.map((a) => (
                        <div
                          key={a.product_name}
                          className={`p-4 rounded-xl border flex items-center justify-between ${a.severity === "critical" ? "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.07]" : "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.07]"}`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <AlertTriangle size={13} className={a.severity === "critical" ? "text-rose-600 dark:text-rose-400 shrink-0" : "text-amber-600 dark:text-amber-400 shrink-0"} />
                            <div className="min-w-0">
                              <span className="text-sm font-medium truncate block text-slate-900 dark:text-white">{a.product_name}</span>
                              <span className="text-xs text-slate-400 dark:text-white/30">{a.stock_level} / {a.reorder_level} units</span>
                            </div>
                          </div>
                          <span className={`text-xs font-semibold shrink-0 ml-3 ${a.severity === "critical" ? "text-rose-700 dark:text-rose-400" : "text-amber-700 dark:text-amber-400"}`}>
                            {a.severity === "critical" ? "Critical" : "Low stock"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-[11px] text-slate-400 dark:text-white/20 mt-5 font-mono">WHERE stock_level &lt; reorder_level</p>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* ══════════════════════════════════════
          CLOSING STATEMENT
      ══════════════════════════════════════ */}
      <div className="mt-6 p-8 rounded-2xl border border-indigo-200 dark:border-indigo-500/25 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-500/[0.06] dark:to-violet-500/[0.04] text-center">
        <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
          This is the level of operational visibility we build for our clients.
        </p>
        <p className="text-sm text-slate-500 dark:text-white/45 max-w-xl mx-auto leading-relaxed">
          Every number above — financial, operational, and job-level — comes from the same centralised data model. Updated automatically. No manual reporting. No version conflicts.
        </p>
      </div>

    </div>
  );
}
