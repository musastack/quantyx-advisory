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
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Users,
  BarChart2,
  Activity,
  X,
} from "lucide-react";
import type { LexCoDashboard, Matter, Timekeeper } from "@/lib/lexco";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

type Tab = "overview" | "matters" | "time" | "finance";
type TimePeriod = "week" | "month" | "last";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function fmt(n: number) {
  return "£" + Math.round(n).toLocaleString("en-GB");
}
function fmtk(n: number) {
  if (n >= 1_000_000) return "£" + (n / 1_000_000).toFixed(2) + "m";
  return "£" + (n / 1000).toFixed(0) + "k";
}
function pct(n: number) {
  return n.toFixed(1) + "%";
}

/* ─────────────────────────────────────────────
   MATTER STATUS CONFIG
───────────────────────────────────────────── */

const MATTER_STATUS = {
  "on-track": {
    label: "On Track",
    pill:  "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/25",
    dot:   "bg-emerald-500",
    row:   "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]",
    selectedRow: "border-emerald-300 bg-emerald-50 dark:border-emerald-500/30 dark:bg-emerald-500/[0.05]",
    bar:   "bg-emerald-500 dark:bg-emerald-400",
  },
  "at-risk": {
    label: "At Risk",
    pill:  "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/25",
    dot:   "bg-amber-500",
    row:   "border-amber-200 bg-amber-50 dark:border-amber-500/15 dark:bg-amber-500/[0.025]",
    selectedRow: "border-amber-400 bg-amber-100 dark:border-amber-500/40 dark:bg-amber-500/[0.08]",
    bar:   "bg-amber-500 dark:bg-amber-400",
  },
  "delayed": {
    label: "Delayed",
    pill:  "text-rose-700 bg-rose-100 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/25",
    dot:   "bg-rose-500",
    row:   "border-rose-200 bg-rose-50 dark:border-rose-500/15 dark:bg-rose-500/[0.025]",
    selectedRow: "border-rose-400 bg-rose-100 dark:border-rose-500/40 dark:bg-rose-500/[0.08]",
    bar:   "bg-rose-500 dark:bg-rose-400",
  },
  "complete": {
    label: "Complete",
    pill:  "text-indigo-700 bg-indigo-100 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/25",
    dot:   "bg-indigo-400",
    row:   "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]",
    selectedRow: "border-indigo-300 bg-indigo-50 dark:border-indigo-500/30 dark:bg-indigo-500/[0.06]",
    bar:   "bg-indigo-500 dark:bg-indigo-400",
  },
  "billing-pending": {
    label: "Billing Pending",
    pill:  "text-violet-700 bg-violet-100 border-violet-200 dark:text-violet-400 dark:bg-violet-500/10 dark:border-violet-500/25",
    dot:   "bg-violet-500",
    row:   "border-violet-200 bg-violet-50 dark:border-violet-500/15 dark:bg-violet-500/[0.025]",
    selectedRow: "border-violet-400 bg-violet-100 dark:border-violet-500/40 dark:bg-violet-500/[0.08]",
    bar:   "bg-violet-500 dark:bg-violet-400",
  },
};

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
            {deltaPositive !== false ? (
              <ArrowUpRight size={12} />
            ) : (
              <ArrowDownRight size={12} />
            )}
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
    warn: {
      bar: "bg-amber-500",
      bg:  "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.05]",
      num: "text-amber-600 dark:text-amber-400",
    },
    alert: {
      bar: "bg-rose-500",
      bg:  "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.05]",
      num: "text-rose-600 dark:text-rose-400",
    },
    info: {
      bar: "bg-indigo-500",
      bg:  "border-slate-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.025]",
      num: "text-indigo-600 dark:text-indigo-400",
    },
  };
  const m = map[severity];
  return (
    <div className={`p-4 rounded-xl border ${m.bg} flex items-start gap-3`}>
      <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
        <span className={`text-[10px] font-bold ${m.num} w-4 text-center`}>{index}</span>
        <div className={`w-0.5 flex-1 rounded-full ${m.bar} min-h-[20px]`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 dark:text-white/90 leading-snug mb-1.5">
          {text}
        </p>
        <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{action}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MATTER DETAIL PANEL
───────────────────────────────────────────── */

function MatterDetailPanel({
  matter,
  onClose,
}: {
  matter: Matter;
  onClose: () => void;
}) {
  const s = MATTER_STATUS[matter.status];
  const totalValue = matter.wip_gbp + matter.billed_gbp;
  const budgetUsedPct = Math.min((totalValue / matter.budget_gbp) * 100, 100);
  const wipPct = totalValue > 0 ? Math.round((matter.wip_gbp / totalValue) * 100) : 0;
  const billedPct = 100 - wipPct;
  const recoveryGood = matter.recovery_rate_pct >= 85;
  const recoveryWarn = matter.recovery_rate_pct >= 70 && matter.recovery_rate_pct < 85;
  const marginGood = matter.margin_pct >= 30;
  const marginWarn = matter.margin_pct >= 15 && matter.margin_pct < 30;

  return (
    <div className="mt-2 mb-1 rounded-2xl border-2 border-indigo-300 dark:border-indigo-500/40 bg-white dark:bg-[#0c0c18] shadow-lg dark:shadow-none overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-3 flex-wrap">
          <div className={`w-2 h-2 rounded-full ${s.dot}`} />
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-white/40">
            {matter.matter_id}
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {matter.name}
          </span>
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.pill}`}
          >
            {s.label}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white/70 transition-colors shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      <div className="p-5 grid md:grid-cols-2 gap-5">
        {/* Left: WIP, billing, recovery */}
        <div className="space-y-5">
          {/* Budget consumed */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-white/60">
                Budget consumed
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-white/70">
                {budgetUsedPct.toFixed(0)}% of {fmtk(matter.budget_gbp)}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all ${s.bar}`}
                style={{ width: `${budgetUsedPct}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-slate-400 dark:text-white/25">
                Opened: {matter.open_date}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-white/25">
                Close: {matter.target_close}
              </span>
            </div>
          </div>

          {/* WIP vs Billed */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-white/60">
                WIP vs Billed
              </span>
              <span className="text-xs text-slate-500 dark:text-white/40">
                Total recorded: {fmtk(totalValue)}
              </span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                    WIP (unbilled)
                  </span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-white/60">
                    {fmtk(matter.wip_gbp)}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-amber-400 dark:bg-amber-500 transition-all"
                    style={{ width: `${wipPct}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                    Billed
                  </span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-white/60">
                    {fmtk(matter.billed_gbp)}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 transition-all"
                    style={{ width: `${billedPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recovery rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-white/60">
                Recovery rate
              </span>
              <span
                className={`text-xs font-bold ${
                  recoveryGood
                    ? "text-emerald-600 dark:text-emerald-400"
                    : recoveryWarn
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {pct(matter.recovery_rate_pct)}
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all ${
                  recoveryGood
                    ? "bg-emerald-500"
                    : recoveryWarn
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
                style={{ width: `${matter.recovery_rate_pct}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 dark:text-white/25 mt-1">
              {recoveryGood
                ? "Healthy recovery — billing on track"
                : recoveryWarn
                ? "Below target — monitor billing closely"
                : "Below 70% threshold — escalation required"}
            </p>
          </div>
        </div>

        {/* Right: metrics grid + risk flag */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Hours recorded",
                value: matter.hours_recorded.toLocaleString(),
                sub:   "this matter",
                valColor: "text-slate-900 dark:text-white",
              },
              {
                label: "Est. margin",
                value: pct(matter.margin_pct),
                sub:   marginGood ? "Healthy" : marginWarn ? "Acceptable" : "Below target",
                valColor: marginGood
                  ? "text-emerald-600 dark:text-emerald-400"
                  : marginWarn
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-rose-600 dark:text-rose-400",
              },
              {
                label: "Partner",
                value: matter.partner,
                sub:   matter.department,
                valColor: "text-slate-900 dark:text-white",
              },
              {
                label: "Client",
                value: matter.client.split(" ").slice(0, 2).join(" "),
                sub:   matter.client,
                valColor: "text-slate-900 dark:text-white",
              },
            ].map((metric) => (
              <div
                key={metric.label}
                className="p-3 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02]"
              >
                <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-1">
                  {metric.label}
                </p>
                <p className={`text-sm font-bold leading-tight truncate ${metric.valColor}`}>
                  {metric.value}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-white/25 mt-0.5 truncate">
                  {metric.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Risk flag */}
          {matter.risk_flag ? (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl border border-amber-200 dark:border-amber-500/25 bg-amber-50 dark:bg-amber-500/[0.06]">
              <AlertTriangle
                size={13}
                className="text-amber-500 shrink-0 mt-0.5"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-0.5">
                  Risk Flag
                </p>
                <p className="text-xs text-slate-600 dark:text-white/50 leading-relaxed">
                  {matter.risk_flag}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/[0.05]">
              <CheckCircle size={13} className="text-emerald-500 shrink-0" />
              <p className="text-xs text-slate-600 dark:text-white/50">
                No active risk flags — matter progressing as expected.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MATTER CARD
───────────────────────────────────────────── */

function MatterCard({
  matter,
  selected,
  onSelect,
}: {
  matter: Matter;
  selected: boolean;
  onSelect: (id: string | null) => void;
}) {
  const s = MATTER_STATUS[matter.status];
  const recoveryColor =
    matter.recovery_rate_pct >= 85
      ? "text-emerald-600 dark:text-emerald-400"
      : matter.recovery_rate_pct >= 70
      ? "text-amber-600 dark:text-amber-400"
      : "text-rose-600 dark:text-rose-400";

  return (
    <div
      className={`rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md dark:hover:border-white/15 ${
        selected ? s.selectedRow : s.row
      }`}
      onClick={() => onSelect(selected ? null : matter.matter_id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-white/30">
              {matter.matter_id}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.pill}`}
            >
              {s.label}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {matter.name}
          </p>
          <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">
            {matter.client} · {matter.department}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-right">
            <p className={`text-sm font-bold ${recoveryColor}`}>
              {pct(matter.recovery_rate_pct)}
            </p>
            <p className="text-[9px] text-slate-400 dark:text-white/25 uppercase tracking-wider">
              Recovery
            </p>
          </div>
          {selected ? (
            <ChevronDown size={14} className="text-slate-400" />
          ) : (
            <ChevronRight size={14} className="text-slate-300 dark:text-white/25" />
          )}
        </div>
      </div>
      <div className="flex gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-white/[0.05] flex-wrap">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">
            WIP
          </p>
          <p className="text-sm font-bold text-amber-600 dark:text-amber-400">
            {fmtk(matter.wip_gbp)}
          </p>
        </div>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">
            Billed
          </p>
          <p className="text-sm font-bold text-slate-700 dark:text-white/70">
            {fmtk(matter.billed_gbp)}
          </p>
        </div>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">
            Budget
          </p>
          <p className="text-sm font-bold text-slate-500 dark:text-white/40">
            {fmtk(matter.budget_gbp)}
          </p>
        </div>
        <div className="ml-auto">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">
            Margin
          </p>
          <p
            className={`text-sm font-bold ${
              matter.margin_pct >= 30
                ? "text-emerald-600 dark:text-emerald-400"
                : matter.margin_pct >= 15
                ? "text-amber-600 dark:text-amber-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {matter.margin_pct}%
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TIMEKEEPER CARD
───────────────────────────────────────────── */

function TimekeeperCard({ tk }: { tk: Timekeeper }) {
  const overloaded  = tk.utilisation_pct >= 95;
  const nearCap     = tk.utilisation_pct >= 85;
  const healthy     = tk.utilisation_pct >= 65;

  const utilizationColor = overloaded
    ? "text-rose-600 dark:text-rose-400"
    : nearCap
    ? "text-amber-600 dark:text-amber-400"
    : healthy
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-slate-400 dark:text-white/35";

  const barColor = overloaded
    ? "bg-rose-500"
    : nearCap
    ? "bg-amber-500"
    : healthy
    ? "bg-emerald-500"
    : "bg-slate-300 dark:bg-white/20";

  const roleLabel: Record<Timekeeper["role"], string> = {
    partner: "Partner",
    "senior-associate": "Senior Associate",
    associate: "Associate",
    trainee: "Trainee",
  };

  const totalHours = tk.billable_hours_month + tk.non_billable_hours_month;
  const remainingHours = tk.capacity_hours_month - totalHours;
  const capacityNote = overloaded
    ? "At capacity — no remaining availability"
    : nearCap
    ? `${remainingHours}h remaining — near capacity`
    : `${remainingHours}h remaining this month`;

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{tk.name}</p>
          <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">
            {roleLabel[tk.role]} · {tk.department}
          </p>
        </div>
        <span className={`text-base font-bold ${utilizationColor}`}>
          {pct(tk.utilisation_pct)}
        </span>
      </div>

      {/* Utilisation bar */}
      <div className="mb-3">
        <div className="h-2 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden mb-1">
          <div
            className={`h-2 rounded-full transition-all ${barColor}`}
            style={{ width: `${Math.min(tk.utilisation_pct, 100)}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400 dark:text-white/25">{capacityNote}</p>
      </div>

      {/* Stats */}
      <div className="flex gap-4 pt-3 border-t border-slate-100 dark:border-white/[0.05]">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">
            Billable
          </p>
          <p className="text-sm font-bold text-slate-700 dark:text-white/70">
            {tk.billable_hours_month}h
          </p>
        </div>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">
            Non-Bill.
          </p>
          <p className="text-sm font-bold text-slate-500 dark:text-white/40">
            {tk.non_billable_hours_month}h
          </p>
        </div>
        <div className="ml-auto">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/25 mb-0.5">
            Value (mo.)
          </p>
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {fmtk(tk.chargeable_value_gbp)}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEES CHART TOOLTIP
───────────────────────────────────────────── */

function FeesTooltip({
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
          Billed:{" "}
          <span className="text-indigo-300">{fmt(payload[0]?.value ?? 0)}</span>
        </p>
        <p className="text-white/60">
          Target:{" "}
          <span className="text-white/40">{fmt(payload[1]?.value ?? 0)}</span>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function LexCoInsightLayer({
  data,
}: {
  data: LexCoDashboard;
}) {
  const [activeTab, setActiveTab]       = useState<Tab>("overview");
  const [timePeriod, setTimePeriod]     = useState<TimePeriod>("month");
  const [selectedMatterId, setSelectedMatterId] = useState<string | null>(null);

  const timePeriods: { id: TimePeriod; label: string }[] = [
    { id: "week",  label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "last",  label: "Last Month" },
  ];

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview",          icon: Activity  },
    { id: "matters",  label: "Matter Tracker",    icon: Briefcase },
    { id: "time",     label: "Time & Utilisation",icon: Users     },
    { id: "finance",  label: "Finance",           icon: BarChart2 },
  ];

  const { kpis, matters, timekeepers, wipAging, monthlyFees } = data;
  const selectedMatter = matters.find((m) => m.matter_id === selectedMatterId) ?? null;

  const statusCounts = {
    "on-track":       matters.filter((m) => m.status === "on-track").length,
    "at-risk":        matters.filter((m) => m.status === "at-risk").length,
    "delayed":        matters.filter((m) => m.status === "delayed").length,
    "billing-pending":matters.filter((m) => m.status === "billing-pending").length,
    "complete":       matters.filter((m) => m.status === "complete").length,
  };

  const totalBillable    = timekeepers.reduce((s, t) => s + t.billable_hours_month, 0);
  const totalNonBillable = timekeepers.reduce((s, t) => s + t.non_billable_hours_month, 0);
  const totalCapacity    = timekeepers.reduce((s, t) => s + t.capacity_hours_month, 0);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] overflow-hidden shadow-xl dark:shadow-none">

      {/* ── SYSTEM CHROME ── */}
      <div className="bg-white dark:bg-[#0c0c18] border-b border-slate-200 dark:border-white/[0.07] px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-white/40">
            Lex &amp; Co LLP — Partner Portal
          </span>
          <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {timePeriods.map((p) => (
            <button
              key={p.id}
              onClick={() => setTimePeriod(p.id)}
              className={`text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                timePeriod === p.id
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
                  : "text-slate-400 dark:text-white/30 hover:text-slate-600 dark:hover:text-white/60"
              }`}
            >
              {p.label}
            </button>
          ))}
          <span className="ml-1 text-[10px] text-slate-300 dark:text-white/20 border border-slate-200 dark:border-white/[0.08] px-2 py-1 rounded">
            Clio · Xero · Postgres
          </span>
        </div>
      </div>

      {/* ── TAB NAVIGATION ── */}
      <div className="bg-slate-50 dark:bg-[#0a0a15] border-b border-slate-200 dark:border-white/[0.07] px-4 flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "text-indigo-600 dark:text-indigo-400 border-indigo-500 dark:border-indigo-400 bg-white dark:bg-[#0c0c18]"
                : "text-slate-400 dark:text-white/35 border-transparent hover:text-slate-600 dark:hover:text-white/60"
            }`}
          >
            <tab.icon size={13} />
            <span className="hidden sm:block">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="bg-slate-50 dark:bg-[#08080f] p-5 space-y-6 min-h-[520px]">

        {/* ════ OVERVIEW ════ */}
        {activeTab === "overview" && (
          <>
            <SectionLabel label="Insight Engine" count={5} />
            <div className="grid sm:grid-cols-2 gap-3">
              <InsightCard
                index={1}
                severity="alert"
                text="£300k of WIP is over 60 days unbilled — significant write-off risk."
                action="M-209 (£88k, 90+ days) and M-198 (£42k) account for the largest exposures. Immediate billing review and partner sign-off required."
              />
              <InsightCard
                index={2}
                severity="warn"
                text="Two matters showing recovery rates below 70% — below firm target of 85%."
                action="M-204 (66.7%) and M-219 (68.2%) both have active client disputes. Partner review recommended before further time is recorded."
              />
              <InsightCard
                index={3}
                severity="warn"
                text="Tom Bradley is at 95% utilisation — approaching unsustainable capacity."
                action="No headroom for new matter allocation. Consider redistributing litigation support before new instructions are accepted."
              />
              <InsightCard
                index={4}
                severity="info"
                text="Fees billed this month: £540k — 1.9% above February target."
                action="Corporate and Real Estate departments are driving performance. Pipeline remains strong with M-244 approaching final billing stage."
              />
              <InsightCard
                index={5}
                severity="warn"
                text="Billing delays are extending average WIP cycle to 47 days across the firm."
                action="Three matters have WIP aging beyond 60 days. Fee earner sign-off on final invoices outstanding for M-198 and M-209."
              />
            </div>

            <SectionLabel label="KPIs — This Month" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              <TopKPI
                label="Total WIP"
                value={fmtk(kpis.total_wip_gbp)}
                delta="+£48k vs last month"
                deltaPositive={false}
                sub="Unbilled work in progress — firm-wide"
              />
              <TopKPI
                label="Fees Billed (Month)"
                value={fmtk(kpis.fees_billed_month_gbp)}
                delta="+1.9% vs target"
                deltaPositive
                sub="Feb 2025 · Target: £530k"
              />
              <TopKPI
                label="Realisation Rate"
                value={pct(kpis.realisation_rate_pct)}
                delta="-1.8pp vs last month"
                deltaPositive={false}
                sub="Billed fees vs recorded time value"
              />
              <TopKPI
                label="Utilisation Rate"
                value={pct(kpis.utilisation_rate_pct)}
                sub="Billable hours as % of capacity"
              />
              <TopKPI
                label="Billable Hours"
                value={kpis.billable_hours_month.toLocaleString()}
                delta="+3.2% vs last month"
                deltaPositive
                sub="Fee-earner hours recorded this month"
              />
              <TopKPI
                label="Write-offs (YTD)"
                value={fmtk(kpis.write_offs_gbp)}
                delta="+£8k vs prior period"
                deltaPositive={false}
                sub="Year to date — all matters"
              />
            </div>

            <SectionLabel label="Monthly Fees Billed" />
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#0c0c18] p-5">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  data={monthlyFees}
                  margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="billedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="var(--chart-grid)"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "var(--chart-tick)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--chart-tick)", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<FeesTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="billed"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#billedGrad)"
                    dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="var(--chart-grid)"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="none"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-[10px] text-slate-400 dark:text-white/25 text-center mt-3">
                — Solid line: Fees Billed · · · Dashed: Monthly target
              </p>
            </div>
          </>
        )}

        {/* ════ MATTER TRACKER ════ */}
        {activeTab === "matters" && (
          <>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: "On Track",        count: statusCounts["on-track"],        color: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/25" },
                { label: "At Risk",         count: statusCounts["at-risk"],         color: "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/25" },
                { label: "Delayed",         count: statusCounts["delayed"],         color: "text-rose-700 bg-rose-100 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/25" },
                { label: "Billing Pending", count: statusCounts["billing-pending"], color: "text-violet-700 bg-violet-100 border-violet-200 dark:text-violet-400 dark:bg-violet-500/10 dark:border-violet-500/25" },
                { label: "Complete",        count: statusCounts["complete"],        color: "text-indigo-700 bg-indigo-100 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/25" },
              ].map((st) => (
                <div
                  key={st.label}
                  className={`flex items-center gap-1.5 text-[10px] font-semibold px-3 py-1.5 rounded-full border ${st.color}`}
                >
                  <span>{st.count}</span>
                  <span className="opacity-70">{st.label}</span>
                </div>
              ))}
              <p className="ml-auto text-[10px] text-slate-400 dark:text-white/25 shrink-0">
                Click a matter to expand
              </p>
            </div>

            <SectionLabel label="Active Matters" count={matters.length} />
            <div className="space-y-2">
              {matters.map((matter) => (
                <div key={matter.matter_id}>
                  <MatterCard
                    matter={matter}
                    selected={selectedMatterId === matter.matter_id}
                    onSelect={setSelectedMatterId}
                  />
                  {selectedMatterId === matter.matter_id && selectedMatter && (
                    <MatterDetailPanel
                      matter={selectedMatter}
                      onClose={() => setSelectedMatterId(null)}
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ════ TIME & UTILISATION ════ */}
        {activeTab === "time" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Total Billable",
                  value: totalBillable + "h",
                  sub: "this month, all fee-earners",
                },
                {
                  label: "Non-Billable",
                  value: totalNonBillable + "h",
                  sub: "admin, BD, training",
                },
                {
                  label: "Avg Utilisation",
                  value: pct(kpis.utilisation_rate_pct),
                  sub: "across all timekeepers",
                },
                {
                  label: "Total Capacity",
                  value: totalCapacity + "h",
                  sub: "available hours this month",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 mt-0.5">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>

            <SectionLabel label="Fee-Earner Utilisation" count={timekeepers.length} />
            <div className="grid sm:grid-cols-2 gap-3">
              {timekeepers.map((tk) => (
                <TimekeeperCard key={tk.name} tk={tk} />
              ))}
            </div>

            <SectionLabel label="Hour Distribution — Billable vs Non-Billable" />
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#0c0c18] p-5">
              <div className="space-y-4">
                {timekeepers.map((tk) => {
                  const totalHours = tk.billable_hours_month + tk.non_billable_hours_month;
                  const billPct = Math.round(
                    (tk.billable_hours_month / totalHours) * 100
                  );
                  return (
                    <div key={tk.name}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-700 dark:text-white/70">
                          {tk.name}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-white/30">
                          {tk.billable_hours_month}h billable / {totalHours}h total
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden flex">
                        <div
                          className="h-2 bg-indigo-500 dark:bg-indigo-400 transition-all"
                          style={{ width: `${billPct}%` }}
                        />
                        <div
                          className="h-2 bg-slate-200 dark:bg-white/[0.12] transition-all"
                          style={{ width: `${100 - billPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-2 rounded bg-indigo-500 dark:bg-indigo-400" />
                  <span className="text-[10px] text-slate-400 dark:text-white/30">
                    Billable
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-2 rounded bg-slate-200 dark:bg-white/20" />
                  <span className="text-[10px] text-slate-400 dark:text-white/30">
                    Non-Billable
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ════ FINANCE ════ */}
        {activeTab === "finance" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Total WIP",
                  value: fmtk(kpis.total_wip_gbp),
                  sub: "unbilled, firm-wide",
                },
                {
                  label: "Fees Billed (Mo.)",
                  value: fmtk(kpis.fees_billed_month_gbp),
                  sub: "Feb 2025",
                },
                {
                  label: "Write-offs YTD",
                  value: fmtk(kpis.write_offs_gbp),
                  sub: "all matters",
                },
                {
                  label: "Realisation",
                  value: pct(kpis.realisation_rate_pct),
                  sub: "vs 90% target",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 mt-0.5">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>

            <SectionLabel label="WIP Aging" />
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#0c0c18] p-5 space-y-5">
              <p className="text-xs text-slate-500 dark:text-white/40">
                How long recorded work has sat unbilled across all active matters
              </p>
              {(() => {
                const maxVal = Math.max(...wipAging.map((b) => b.value_gbp));
                return wipAging.map((bucket) => (
                  <div key={bucket.label}>
                    <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-bold ${
                            bucket.at_risk
                              ? "text-rose-600 dark:text-rose-400"
                              : "text-slate-700 dark:text-white/70"
                          }`}
                        >
                          {bucket.label}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-white/30">
                          ({bucket.days})
                        </span>
                        {bucket.at_risk && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400 border border-rose-300 dark:border-rose-500/30 px-1.5 py-0.5 rounded">
                            At Risk
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-sm font-bold ${
                            bucket.at_risk
                              ? "text-rose-600 dark:text-rose-400"
                              : "text-slate-700 dark:text-white/70"
                          }`}
                        >
                          {fmtk(bucket.value_gbp)}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-white/25 ml-2">
                          {bucket.count} matters
                        </span>
                      </div>
                    </div>
                    <div className="h-3 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          bucket.at_risk
                            ? "bg-rose-500 dark:bg-rose-400"
                            : "bg-indigo-500 dark:bg-indigo-400"
                        }`}
                        style={{
                          width: `${(bucket.value_gbp / maxVal) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ));
              })()}
              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05]">
                <p className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1.5">
                  <AlertTriangle size={12} />
                  £300k (61+ days combined) is at risk of write-off — immediate billing action required.
                </p>
              </div>
            </div>

            <SectionLabel label="Matter Profitability" />
            <div className="space-y-2">
              {[...matters]
                .sort((a, b) => b.margin_pct - a.margin_pct)
                .map((matter) => {
                  const marginColor =
                    matter.margin_pct >= 35
                      ? "text-emerald-600 dark:text-emerald-400"
                      : matter.margin_pct >= 20
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-rose-600 dark:text-rose-400";
                  const barColor =
                    matter.margin_pct >= 35
                      ? "bg-emerald-500"
                      : matter.margin_pct >= 20
                      ? "bg-amber-500"
                      : "bg-rose-500";
                  return (
                    <div
                      key={matter.matter_id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02]"
                    >
                      <div className="w-16 shrink-0">
                        <p className="text-[9px] font-mono text-slate-400 dark:text-white/25">
                          {matter.matter_id}
                        </p>
                        <p className={`text-sm font-bold ${marginColor}`}>
                          {matter.margin_pct}%
                        </p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white/80 truncate">
                          {matter.name}
                        </p>
                        <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${barColor} transition-all`}
                            style={{ width: `${matter.margin_pct}%` }}
                          />
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs font-bold text-slate-600 dark:text-white/60">
                          {fmtk(matter.billed_gbp)}
                        </p>
                        <p className="text-[9px] text-slate-400 dark:text-white/25">
                          billed
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>

      {/* ── CLOSING STATEMENT ── */}
      <div className="border-t border-slate-200 dark:border-white/[0.07] bg-white dark:bg-[#0c0c18] p-6 md:p-8 text-center">
        <p className="text-base md:text-lg font-bold text-slate-700 dark:text-white/80 leading-snug max-w-2xl mx-auto">
          This is the level of financial and operational visibility we build for
          professional services firms.
        </p>
        <p className="text-xs text-slate-400 dark:text-white/30 mt-3">
          WIP tracking · Matter profitability · Realisation rates · Utilisation management · Billing delay alerts
        </p>
      </div>
    </div>
  );
}
