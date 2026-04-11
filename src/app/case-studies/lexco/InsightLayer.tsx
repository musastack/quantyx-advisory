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
  X,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import type { LexCoDashboard, Matter, Timekeeper } from "@/lib/lexco";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

type Tab = "financial" | "matters" | "wip" | "utilisation";

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

function SectionLabel({ label, sub, count }: { label: string; sub?: string; count?: number }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 shrink-0">
        {label}
      </p>
      {sub && (
        <span className="text-[10px] text-slate-400 dark:text-white/25 shrink-0">{sub}</span>
      )}
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

function MatterDetailPanel({ matter, onClose }: { matter: Matter; onClose: () => void }) {
  const s = MATTER_STATUS[matter.status];
  const totalValue = matter.wip_gbp + matter.billed_gbp;
  const budgetUsedPct = Math.min((totalValue / matter.budget_gbp) * 100, 100);
  const wipPct = totalValue > 0 ? Math.round((matter.wip_gbp / totalValue) * 100) : 0;
  const billedPct = 100 - wipPct;
  const recoveryGood = matter.recovery_rate_pct >= 85;
  const recoveryWarn = matter.recovery_rate_pct >= 70 && matter.recovery_rate_pct < 85;
  const marginGood = matter.margin_pct >= 30;
  const marginWarn = matter.margin_pct >= 15 && matter.margin_pct < 30;
  const estProfit = matter.billed_gbp * (matter.margin_pct / 100);

  return (
    <div className="mt-2 mb-1 rounded-2xl border-2 border-indigo-300 dark:border-indigo-500/40 bg-white dark:bg-[#0c0c18] shadow-lg dark:shadow-none overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
        <div className="flex items-center gap-3 flex-wrap">
          <div className={`w-2 h-2 rounded-full ${s.dot}`} />
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-white/40">
            {matter.matter_id}
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{matter.name}</span>
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.pill}`}>
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
        {/* Left: financials */}
        <div className="space-y-5">
          {/* Budget consumed */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Budget consumed</span>
              <span className="text-xs font-bold text-slate-700 dark:text-white/70">
                {budgetUsedPct.toFixed(0)}% of {fmtk(matter.budget_gbp)}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
              <div className={`h-2.5 rounded-full transition-all ${s.bar}`} style={{ width: `${budgetUsedPct}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-slate-400 dark:text-white/25">Opened: {matter.open_date}</span>
              <span className="text-[10px] text-slate-400 dark:text-white/25">Close: {matter.target_close}</span>
            </div>
          </div>

          {/* WIP vs Billed */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-white/60">WIP vs Billed</span>
              <span className="text-xs text-slate-500 dark:text-white/40">Total: {fmtk(totalValue)}</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">WIP (unbilled)</span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-white/60">{fmtk(matter.wip_gbp)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
                  <div className="h-1.5 rounded-full bg-amber-400 dark:bg-amber-500 transition-all" style={{ width: `${wipPct}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Billed</span>
                  <span className="text-[10px] font-bold text-slate-700 dark:text-white/60">{fmtk(matter.billed_gbp)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
                  <div className="h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 transition-all" style={{ width: `${billedPct}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Recovery rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-white/60">Recovery rate</span>
              <span className={`text-xs font-bold ${recoveryGood ? "text-emerald-600 dark:text-emerald-400" : recoveryWarn ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}`}>
                {pct(matter.recovery_rate_pct)}
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all ${recoveryGood ? "bg-emerald-500" : recoveryWarn ? "bg-amber-400" : "bg-rose-500"}`}
                style={{ width: `${matter.recovery_rate_pct}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-rose-400 dark:text-rose-500">0% — 70% critical</span>
              <span className="text-[10px] text-emerald-500">85%+ target</span>
            </div>
          </div>
        </div>

        {/* Right: financial metrics grid + risk */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/30 mb-1">Billed Revenue</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">{fmtk(matter.billed_gbp)}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/30 mb-1">Margin</p>
              <p className={`text-base font-bold ${marginGood ? "text-emerald-600 dark:text-emerald-400" : marginWarn ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}`}>
                {pct(matter.margin_pct)}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/30 mb-1">Est. Profit</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">{fmtk(estProfit)}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/30 mb-1">Hours</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">{matter.hours_recorded}h</p>
            </div>
          </div>

          {/* Department / Partner */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-white/40 border border-slate-200 dark:border-white/[0.05]">
              {matter.department}
            </span>
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-white/40 border border-slate-200 dark:border-white/[0.05]">
              {matter.partner}
            </span>
          </div>

          {/* Risk flag */}
          {matter.risk_flag && (
            <div className="p-3 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.05]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                Risk Flag
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-300/70 leading-relaxed">
                {matter.risk_flag}
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
  onClick,
}: {
  matter: Matter;
  selected: boolean;
  onClick: () => void;
}) {
  const s = MATTER_STATUS[matter.status];
  const marginGood = matter.margin_pct >= 30;
  const marginWarn = matter.margin_pct >= 15 && matter.margin_pct < 30;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-xl border px-4 py-3 transition-all ${
        selected ? s.selectedRow : s.row
      } hover:shadow-sm`}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
          <span className="text-xs font-mono text-slate-400 dark:text-white/30">{matter.matter_id}</span>
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.pill}`}
          >
            {s.label}
          </span>
        </div>
        <span
          className={`text-sm font-bold ${
            marginGood
              ? "text-emerald-600 dark:text-emerald-400"
              : marginWarn
              ? "text-amber-600 dark:text-amber-400"
              : "text-rose-600 dark:text-rose-400"
          }`}
        >
          {pct(matter.margin_pct)} margin
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-white/90 leading-snug">
        {matter.name}
      </p>
      <p className="text-[11px] text-slate-400 dark:text-white/35 mt-0.5">
        {matter.client} · {matter.department}
      </p>

      <div className="mt-3 flex gap-4 flex-wrap">
        <div>
          <p className="text-[10px] text-slate-400 dark:text-white/30">Billed</p>
          <p className="text-xs font-bold text-slate-700 dark:text-white/70">{fmtk(matter.billed_gbp)}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 dark:text-white/30">WIP</p>
          <p className="text-xs font-bold text-amber-600 dark:text-amber-400">{fmtk(matter.wip_gbp)}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 dark:text-white/30">Budget</p>
          <p className="text-xs font-bold text-slate-700 dark:text-white/70">{fmtk(matter.budget_gbp)}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 dark:text-white/30">Recovery</p>
          <p className={`text-xs font-bold ${matter.recovery_rate_pct >= 85 ? "text-emerald-600 dark:text-emerald-400" : matter.recovery_rate_pct >= 70 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}`}>
            {pct(matter.recovery_rate_pct)}
          </p>
        </div>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────
   TIMEKEEPER CARD
───────────────────────────────────────────── */

function TimekeeperCard({ tk }: { tk: Timekeeper }) {
  const utilGood = tk.utilisation_pct >= 65 && tk.utilisation_pct < 95;
  const utilOver = tk.utilisation_pct >= 95;
  const utilLow = tk.utilisation_pct < 65;

  const barColour = utilOver
    ? "bg-rose-500 dark:bg-rose-400"
    : utilLow
    ? "bg-amber-400 dark:bg-amber-500"
    : "bg-emerald-500 dark:bg-emerald-400";

  const utilColour = utilOver
    ? "text-rose-600 dark:text-rose-400"
    : utilLow
    ? "text-amber-600 dark:text-amber-400"
    : "text-emerald-600 dark:text-emerald-400";

  const roleLabel: Record<string, string> = {
    partner: "Partner",
    "senior-associate": "Senior Associate",
    associate: "Associate",
    trainee: "Trainee",
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] p-4 space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{tk.name}</p>
          <p className="text-[11px] text-slate-400 dark:text-white/35 mt-0.5">
            {roleLabel[tk.role]} · {tk.department}
          </p>
        </div>
        <span className={`text-sm font-bold ${utilColour}`}>{pct(tk.utilisation_pct)}</span>
      </div>

      {/* Utilisation bar */}
      <div>
        <div className="flex justify-between text-[10px] text-slate-400 dark:text-white/30 mb-1.5">
          <span>{tk.billable_hours_month}h billable</span>
          <span>{tk.capacity_hours_month}h capacity</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all ${barColour}`}
            style={{ width: `${Math.min(tk.utilisation_pct, 100)}%` }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        <div className="text-center">
          <p className="text-xs font-bold text-slate-800 dark:text-white/80">{tk.billable_hours_month}h</p>
          <p className="text-[10px] text-slate-400 dark:text-white/30 mt-0.5">Billable</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-slate-800 dark:text-white/80">{tk.non_billable_hours_month}h</p>
          <p className="text-[10px] text-slate-400 dark:text-white/30 mt-0.5">Non-billable</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{fmtk(tk.chargeable_value_gbp)}</p>
          <p className="text-[10px] text-slate-400 dark:text-white/30 mt-0.5">Revenue</p>
        </div>
      </div>

      {utilOver && (
        <p className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">
          At or over capacity — billing risk if quality suffers
        </p>
      )}
      {utilLow && (
        <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
          Under-utilised — revenue per seat below target
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEES TOOLTIP
───────────────────────────────────────────── */

function FeesTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[var(--chart-tooltip-bd)] bg-[var(--chart-tooltip-bg)] px-3.5 py-3 shadow-xl text-xs">
      <p className="font-bold text-slate-900 dark:text-white mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-6">
          <span className="text-slate-500 dark:text-white/50 capitalize">{p.dataKey === "billed" ? "Fees billed" : "Target"}</span>
          <span className="font-bold text-slate-900 dark:text-white">{fmtk(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export default function InsightLayer({ data }: { data: LexCoDashboard }) {
  const [activeTab, setActiveTab] = useState<Tab>("financial");
  const [selectedMatterId, setSelectedMatterId] = useState<string | null>(null);

  const { kpis, matters, timekeepers, wipAging, monthlyFees } = data;

  /* ── Derived financial figures ── */
  const estRealisationPct = kpis.realisation_rate_pct;
  // Estimate cost from matter margins (weighted by billed value)
  const totalBilled = matters.reduce((s, m) => s + m.billed_gbp, 0);
  const totalWIPValue = matters.reduce((s, m) => s + m.wip_gbp, 0);
  const weightedMargin = matters.reduce((s, m) => s + m.margin_pct * m.billed_gbp, 0) / (totalBilled || 1);
  const estProfit = kpis.fees_billed_month_gbp * (weightedMargin / 100);
  const estCost = kpis.fees_billed_month_gbp - estProfit;
  const estMarginPct = weightedMargin;

  /* ── Matters sorted by margin ascending (worst first) ── */
  const mattersSortedByMargin = [...matters].sort((a, b) => a.margin_pct - b.margin_pct);
  const atRiskMatters = matters.filter((m) => m.status === "at-risk" || m.status === "delayed");
  const atRiskWIP = atRiskMatters.reduce((s, m) => s + m.wip_gbp, 0);

  /* ── WIP at-risk buckets ── */
  const wipAtRisk = wipAging.filter((w) => w.at_risk);
  const totalAtRiskWIP = wipAtRisk.reduce((s, w) => s + w.value_gbp, 0);
  const totalWIPAging = wipAging.reduce((s, w) => s + w.value_gbp, 0);

  /* ── Utilisation totals ── */
  const totalChargeable = timekeepers.reduce((s, t) => s + t.chargeable_value_gbp, 0);
  const totalBillableHours = timekeepers.reduce((s, t) => s + t.billable_hours_month, 0);
  const totalNonBillable = timekeepers.reduce((s, t) => s + t.non_billable_hours_month, 0);
  const avgUtilisation = timekeepers.reduce((s, t) => s + t.utilisation_pct, 0) / timekeepers.length;

  const tabs: { id: Tab; label: string }[] = [
    { id: "financial",   label: "Financial" },
    { id: "matters",     label: "Matters & Margin" },
    { id: "wip",         label: "WIP & Billing" },
    { id: "utilisation", label: "Utilisation" },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0d0d1a] shadow-xl dark:shadow-none overflow-hidden">
      {/* ── Tab Bar ── */}
      <div className="flex items-center gap-1 px-4 pt-4 pb-0 border-b border-slate-200 dark:border-white/[0.06] overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => { setActiveTab(t.id); setSelectedMatterId(null); }}
            className={`shrink-0 px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 transition-all ${
              activeTab === t.id
                ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/[0.07]"
                : "border-transparent text-slate-500 dark:text-white/40 hover:text-slate-700 dark:hover:text-white/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-5 md:p-6 space-y-8">

        {/* ══════════════════════════════════════
            TAB 1 — FINANCIAL
        ══════════════════════════════════════ */}
        {activeTab === "financial" && (
          <>
            {/* Hero metrics */}
            <div>
              <SectionLabel label="Financial Performance" sub="current month" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">
                {/* Fees Billed */}
                <div className="bg-white dark:bg-[#0d0d1a] p-5 flex flex-col gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">
                    Fees Billed
                  </p>
                  <p className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                    {fmtk(kpis.fees_billed_month_gbp)}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-white/35">February 2025</p>
                </div>

                {/* Est. Cost */}
                <div className="bg-white dark:bg-[#0d0d1a] p-5 flex flex-col gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">
                    Est. Cost
                  </p>
                  <p className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                    {fmtk(estCost)}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-white/35">Derived from matter margins</p>
                </div>

                {/* Est. Profit */}
                <div className="bg-emerald-50 dark:bg-emerald-500/[0.05] p-5 flex flex-col gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400/70">
                    Est. Profit
                  </p>
                  <p className="text-3xl md:text-4xl font-bold tracking-tight text-emerald-700 dark:text-emerald-300 leading-none">
                    {fmtk(estProfit)}
                  </p>
                  <p className="text-[11px] text-emerald-600/70 dark:text-emerald-400/50">Gross profit this month</p>
                </div>

                {/* Margin */}
                <div className="bg-emerald-50 dark:bg-emerald-500/[0.05] p-5 flex flex-col gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400/70">
                    Margin
                  </p>
                  <p className="text-3xl md:text-4xl font-bold tracking-tight text-emerald-700 dark:text-emerald-300 leading-none">
                    {pct(estMarginPct)}
                  </p>
                  <p className="text-[11px] text-emerald-600/70 dark:text-emerald-400/50">
                    Realisation {pct(estRealisationPct)}
                  </p>
                </div>
              </div>
            </div>

            {/* Secondary KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total WIP",         value: fmtk(kpis.total_wip_gbp),          sub: "unbilled across all matters" },
                { label: "Billable Hours",     value: kpis.billable_hours_month.toLocaleString() + "h", sub: "recorded this month" },
                { label: "Write-offs YTD",     value: fmtk(kpis.write_offs_gbp),          sub: "revenue not recovered" },
                { label: "At-Risk WIP",        value: fmtk(atRiskWIP),                     sub: `across ${atRiskMatters.length} flagged matters` },
              ].map((k) => (
                <div key={k.label} className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-2">{k.label}</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white leading-none">{k.value}</p>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1.5">{k.sub}</p>
                </div>
              ))}
            </div>

            {/* Monthly fees chart */}
            <div>
              <SectionLabel label="Monthly Fees Billed vs Target" />
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyFees} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="lc-billed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="var(--chart-1)" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="lc-target" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="var(--chart-4)" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="var(--chart-4)" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--chart-tick)" }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(v) => "£" + (v / 1000) + "k"} tick={{ fontSize: 10, fill: "var(--chart-tick)" }} axisLine={false} tickLine={false} width={44} />
                    <Tooltip content={<FeesTooltip />} />
                    <Area type="monotone" dataKey="target" stroke="var(--chart-4)" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#lc-target)" dot={false} />
                    <Area type="monotone" dataKey="billed" stroke="var(--chart-1)" strokeWidth={2} fill="url(#lc-billed)" dot={false} activeDot={{ r: 4, fill: "var(--chart-1)" }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Financial insights */}
            <div>
              <SectionLabel label="Financial Insights" />
              <div className="space-y-3">
                <InsightCard
                  index={1}
                  severity="alert"
                  text={`£${Math.round(kpis.write_offs_gbp / 1000)}k written off this year — equivalent to ${((kpis.write_offs_gbp / kpis.fees_billed_month_gbp) * 100).toFixed(0)}% of a month's billings.`}
                  action="Identify the matters driving write-offs and address recovery rate issues before they compound."
                />
                <InsightCard
                  index={2}
                  severity="warn"
                  text={`£${Math.round(totalAtRiskWIP / 1000)}k WIP in aging buckets (61+ days) — at elevated write-off risk if matters stall further.`}
                  action="Billing cycle review needed: flag stalled matters and issue interim invoices to convert WIP to recognised revenue."
                />
                <InsightCard
                  index={3}
                  severity="info"
                  text={`Realisation rate of ${pct(kpis.realisation_rate_pct)} — for every £100 of time recorded, £${kpis.realisation_rate_pct.toFixed(0)} is actually billed. ${kpis.realisation_rate_pct < 90 ? "Below the 90% target." : "On target."}`}
                  action="Improving realisation by 5 percentage points on current billing volumes would recover approximately £27k per month."
                />
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════
            TAB 2 — MATTERS & MARGIN
        ══════════════════════════════════════ */}
        {activeTab === "matters" && (
          <>
            {/* Summary hero */}
            <div>
              <SectionLabel label="Matter Revenue Summary" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">
                <div className="bg-white dark:bg-[#0d0d1a] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-2">Total Billed</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{fmtk(totalBilled)}</p>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1">{matters.length} matters</p>
                </div>
                <div className="bg-white dark:bg-[#0d0d1a] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-2">Total WIP</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{fmtk(totalWIPValue)}</p>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1">unbilled across all matters</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-500/[0.05] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400/70 mb-2">Avg Margin</p>
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{pct(weightedMargin)}</p>
                  <p className="text-[10px] text-emerald-600/70 dark:text-emerald-400/50 mt-1">weighted by billed value</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-500/[0.04] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400/70 mb-2">At Risk</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{atRiskMatters.length}</p>
                  <p className="text-[10px] text-amber-600/70 dark:text-amber-400/50 mt-1">{fmtk(atRiskWIP)} WIP exposed</p>
                </div>
              </div>
            </div>

            {/* Matter list */}
            <div>
              <SectionLabel label="Matters by Margin" sub="lowest margin first" count={matters.length} />
              <div className="space-y-2">
                {mattersSortedByMargin.map((matter) => (
                  <div key={matter.matter_id}>
                    <MatterCard
                      matter={matter}
                      selected={selectedMatterId === matter.matter_id}
                      onClick={() =>
                        setSelectedMatterId(
                          selectedMatterId === matter.matter_id ? null : matter.matter_id
                        )
                      }
                    />
                    {selectedMatterId === matter.matter_id && (
                      <MatterDetailPanel
                        matter={matter}
                        onClose={() => setSelectedMatterId(null)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════
            TAB 3 — WIP & BILLING
        ══════════════════════════════════════ */}
        {activeTab === "wip" && (
          <>
            {/* WIP headline */}
            <div>
              <SectionLabel label="WIP Financial Exposure" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">
                <div className="bg-white dark:bg-[#0d0d1a] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-2">Total WIP</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{fmtk(kpis.total_wip_gbp)}</p>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1">unbilled time across all matters</p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-500/[0.05] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400/70 mb-2">At-Risk WIP</p>
                  <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">{fmtk(totalAtRiskWIP)}</p>
                  <p className="text-[10px] text-rose-600/70 dark:text-rose-400/50 mt-1">61+ days — write-off risk</p>
                </div>
                <div className="bg-white dark:bg-[#0d0d1a] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-2">Write-offs YTD</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{fmtk(kpis.write_offs_gbp)}</p>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1">revenue not recovered</p>
                </div>
              </div>
            </div>

            {/* WIP aging buckets */}
            <div>
              <SectionLabel label="WIP Aging" sub="by days outstanding" />
              <div className="space-y-3">
                {wipAging.map((bucket) => {
                  const sharePct = (bucket.value_gbp / totalWIPAging) * 100;
                  return (
                    <div
                      key={bucket.label}
                      className={`p-4 rounded-xl border ${
                        bucket.at_risk
                          ? "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.04]"
                          : "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <div className="flex items-center gap-2.5">
                          {bucket.at_risk && (
                            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider px-2 py-0.5 bg-rose-100 dark:bg-rose-500/10 rounded-full border border-rose-200 dark:border-rose-500/20">
                              At Risk
                            </span>
                          )}
                          <span className="text-sm font-bold text-slate-800 dark:text-white/90">{bucket.label}</span>
                          <span className="text-xs text-slate-400 dark:text-white/35">{bucket.days}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{fmtk(bucket.value_gbp)}</p>
                          <p className="text-[10px] text-slate-400 dark:text-white/30">{bucket.count} matters</p>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all ${bucket.at_risk ? "bg-rose-500 dark:bg-rose-400" : "bg-indigo-400 dark:bg-indigo-500"}`}
                          style={{ width: `${sharePct}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <span className="text-[10px] text-slate-400 dark:text-white/30">
                          {sharePct.toFixed(0)}% of total WIP
                        </span>
                        {bucket.at_risk && (
                          <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">
                            Partial write-off risk
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Billed vs unbilled */}
            <div>
              <SectionLabel label="Billed vs Unbilled — All Matters" />
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/[0.05]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">Total Billed</p>
                  <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{fmtk(totalBilled)}</p>
                  <p className="text-[10px] text-indigo-600/70 dark:text-indigo-400/50 mt-1">recognised revenue</p>
                </div>
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.05]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">Total WIP</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{fmtk(totalWIPValue)}</p>
                  <p className="text-[10px] text-amber-600/70 dark:text-amber-400/50 mt-1">unbilled — conversion risk</p>
                </div>
              </div>
              {/* Relative bar */}
              <div className="mt-4">
                <div className="flex rounded-full overflow-hidden h-3">
                  <div
                    className="bg-indigo-400 dark:bg-indigo-500 transition-all"
                    style={{ width: `${(totalBilled / (totalBilled + totalWIPValue)) * 100}%` }}
                  />
                  <div
                    className="bg-amber-400 dark:bg-amber-500 transition-all"
                    style={{ width: `${(totalWIPValue / (totalBilled + totalWIPValue)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                    {((totalBilled / (totalBilled + totalWIPValue)) * 100).toFixed(0)}% billed
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                    {((totalWIPValue / (totalBilled + totalWIPValue)) * 100).toFixed(0)}% WIP
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════════
            TAB 4 — UTILISATION
        ══════════════════════════════════════ */}
        {activeTab === "utilisation" && (
          <>
            {/* Utilisation hero */}
            <div>
              <SectionLabel label="Team Revenue & Capacity" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">
                <div className="bg-emerald-50 dark:bg-emerald-500/[0.05] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400/70 mb-2">Revenue Generated</p>
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{fmtk(totalChargeable)}</p>
                  <p className="text-[10px] text-emerald-600/70 dark:text-emerald-400/50 mt-1">chargeable value this month</p>
                </div>
                <div className="bg-white dark:bg-[#0d0d1a] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-2">Avg Utilisation</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{pct(avgUtilisation)}</p>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1">across {timekeepers.length} fee earners</p>
                </div>
                <div className="bg-white dark:bg-[#0d0d1a] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-2">Billable Hours</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalBillableHours}h</p>
                  <p className="text-[10px] text-slate-400 dark:text-white/30 mt-1">recorded this month</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-500/[0.04] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400/70 mb-2">Non-Billable</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{totalNonBillable}h</p>
                  <p className="text-[10px] text-amber-600/70 dark:text-amber-400/50 mt-1">
                    {((totalNonBillable / (totalBillableHours + totalNonBillable)) * 100).toFixed(0)}% of total hours
                  </p>
                </div>
              </div>
            </div>

            {/* Revenue per timekeeper bar chart */}
            <div>
              <SectionLabel label="Revenue by Fee Earner" sub="chargeable value this month" />
              <div className="space-y-3">
                {[...timekeepers]
                  .sort((a, b) => b.chargeable_value_gbp - a.chargeable_value_gbp)
                  .map((tk) => {
                    const sharePct = (tk.chargeable_value_gbp / totalChargeable) * 100;
                    const revenuePerHour = tk.billable_hours_month > 0
                      ? tk.chargeable_value_gbp / tk.billable_hours_month
                      : 0;
                    return (
                      <div key={tk.name} className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02]">
                        <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                          <div>
                            <span className="text-sm font-semibold text-slate-800 dark:text-white/90">{tk.name}</span>
                            <span className="ml-2 text-[10px] text-slate-400 dark:text-white/30 capitalize">{tk.role.replace("-", " ")}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{fmtk(tk.chargeable_value_gbp)}</p>
                            <p className="text-[10px] text-slate-400 dark:text-white/30">£{Math.round(revenuePerHour)}/hr effective</p>
                          </div>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                          <div
                            className="h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 transition-all"
                            style={{ width: `${sharePct}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 dark:text-white/25 mt-1.5">
                          {sharePct.toFixed(0)}% of team revenue · {pct(tk.utilisation_pct)} utilisation
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Timekeeper cards */}
            <div>
              <SectionLabel label="Fee Earner Detail" count={timekeepers.length} />
              <div className="grid sm:grid-cols-2 gap-3">
                {timekeepers.map((tk) => (
                  <TimekeeperCard key={tk.name} tk={tk} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Closing statement ── */}
        <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06]">
          <p className="text-xs text-slate-400 dark:text-white/30 leading-relaxed text-center">
            This is the level of financial and billing visibility we build for professional services firms —
            matter profitability, WIP exposure, and revenue per fee earner in one unified view.
          </p>
        </div>
      </div>
    </div>
  );
}
