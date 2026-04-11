"use client";

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
} from "lucide-react";
import type {
  InventoryCoDashboard,
  ActiveJob,
  CrewStatus,
  MaterialAlert,
} from "@/lib/inventoryco";

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

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 shrink-0">
        {label}
      </p>
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
          Revenue:{" "}
          <span className="text-violet-300">{fmt(payload[0]?.value ?? 0)}</span>
        </p>
        <p className="text-white/60">
          Profit:{" "}
          <span className="text-emerald-400">{fmt(payload[1]?.value ?? 0)}</span>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOP KPI CARD — large business metric
───────────────────────────────────────────── */

function TopKPI({
  label,
  value,
  delta,
  deltaPositive,
  sub,
  accent,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  sub: string;
  accent: "indigo" | "violet" | "emerald" | "amber" | "rose" | "sky";
}) {
  const accentMap = {
    indigo:  { icon: "text-indigo-600 dark:text-indigo-400",  delta: "text-indigo-600 dark:text-indigo-300" },
    violet:  { icon: "text-violet-600 dark:text-violet-400",  delta: "text-violet-600 dark:text-violet-300" },
    emerald: { icon: "text-emerald-600 dark:text-emerald-400", delta: "text-emerald-600 dark:text-emerald-300" },
    amber:   { icon: "text-amber-600 dark:text-amber-400",    delta: "text-amber-600 dark:text-amber-300" },
    rose:    { icon: "text-rose-600 dark:text-rose-400",      delta: "text-rose-600 dark:text-rose-300" },
    sky:     { icon: "text-sky-600 dark:text-sky-400",        delta: "text-sky-600 dark:text-sky-300" },
  };
  const a = accentMap[accent];

  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none flex flex-col gap-2">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">
        {label}
      </p>
      <div className="flex items-end gap-2.5 mt-1">
        <p className="text-3xl font-bold tracking-tight leading-none text-slate-900 dark:text-white">
          {value}
        </p>
        {delta && (
          <span className={`text-sm font-semibold mb-0.5 flex items-center gap-0.5 ${
            deltaPositive !== false ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
          }`}>
            {deltaPositive !== false ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {delta}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400 dark:text-white/35 leading-relaxed">{sub}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   KPI CARD — financial (large, with gradient value)
───────────────────────────────────────────── */

function KPICard({
  label,
  value,
  sub,
  positive,
}: {
  label: string;
  value: string;
  sub: string;
  positive: boolean | null;
}) {
  return (
    <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#07070e] shadow-sm dark:shadow-none flex flex-col gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">
        {label}
      </p>
      <p className="text-4xl font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-white/70">
        {value}
      </p>
      <div className="flex items-center gap-1.5 mt-auto pt-1 border-t border-slate-100 dark:border-white/[0.06]">
        {positive === true && (
          <TrendingUp size={11} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
        )}
        {positive === false && (
          <AlertTriangle size={11} className="text-amber-600 dark:text-amber-400 shrink-0" />
        )}
        {positive === null && (
          <Minus size={11} className="text-slate-300 dark:text-white/20 shrink-0" />
        )}
        <span
          className={`text-xs ${
            positive === true
              ? "text-emerald-600 dark:text-emerald-400 font-medium"
              : positive === false
              ? "text-amber-600 dark:text-amber-400 font-medium"
              : "text-slate-400 dark:text-white/30"
          }`}
        >
          {sub}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD — operational (compact)
───────────────────────────────────────────── */

type StatState = "good" | "warn" | "alert" | "neutral";

function StatCard({
  label,
  value,
  sub,
  state = "neutral",
  icon: Icon,
}: {
  label: string;
  value: string;
  sub: string;
  state?: StatState;
  icon?: React.ElementType;
}) {
  const borderBg: Record<StatState, string> = {
    good:    "border-emerald-400/30 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/[0.04]",
    warn:    "border-amber-400/30 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/[0.04]",
    alert:   "border-rose-400/30 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/[0.04]",
    neutral: "border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025]",
  };
  const valueColor: Record<StatState, string> = {
    good:    "text-emerald-700 dark:text-emerald-300",
    warn:    "text-amber-700 dark:text-amber-300",
    alert:   "text-rose-700 dark:text-rose-300",
    neutral: "text-slate-900 dark:text-white",
  };

  return (
    <div className={`p-5 rounded-xl border shadow-sm dark:shadow-none ${borderBg[state]} flex flex-col gap-2.5`}>
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">
          {label}
        </p>
        {Icon && (
          <Icon
            size={13}
            className={
              state === "good"    ? "text-emerald-500/60" :
              state === "warn"    ? "text-amber-500/60" :
              state === "alert"   ? "text-rose-500/60" :
              "text-slate-300 dark:text-white/15"
            }
          />
        )}
      </div>
      <p className={`text-3xl font-bold tracking-tight leading-none ${valueColor[state]}`}>
        {value}
      </p>
      <p className="text-xs text-slate-400 dark:text-white/35 mt-auto">{sub}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   JOB ROW
───────────────────────────────────────────── */

const JOB_STATUS = {
  "on-track": {
    label: "On Track",
    pill: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/25",
    bar: "bg-emerald-500 dark:bg-emerald-400",
    row: "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]",
    dot: "bg-emerald-500",
  },
  "at-risk": {
    label: "At Risk",
    pill: "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/25",
    bar: "bg-amber-500 dark:bg-amber-400",
    row: "border-amber-300/50 bg-amber-50 dark:border-amber-500/15 dark:bg-amber-500/[0.025]",
    dot: "bg-amber-500",
  },
  delayed: {
    label: "Delayed",
    pill: "text-rose-700 bg-rose-100 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/25",
    bar: "bg-rose-500 dark:bg-rose-400",
    row: "border-rose-300/50 bg-rose-50 dark:border-rose-500/15 dark:bg-rose-500/[0.025]",
    dot: "bg-rose-500",
  },
  complete: {
    label: "Complete",
    pill: "text-indigo-700 bg-indigo-100 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/25",
    bar: "bg-indigo-500 dark:bg-indigo-400",
    row: "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]",
    dot: "bg-indigo-500",
  },
  starting: {
    label: "Starting",
    pill: "text-sky-700 bg-sky-100 border-sky-200 dark:text-sky-400 dark:bg-sky-500/10 dark:border-sky-500/25",
    bar: "bg-sky-500 dark:bg-sky-400",
    row: "border-slate-200 bg-white dark:border-white/[0.06] dark:bg-white/[0.02]",
    dot: "bg-sky-500",
  },
};

function JobRow({ job }: { job: ActiveJob }) {
  const s = JOB_STATUS[job.status];
  const overBudget = job.actual_cost_gbp > job.budget_gbp;

  return (
    <div className={`p-5 rounded-xl border shadow-sm dark:shadow-none ${s.row}`}>
      <div className="flex items-start gap-4">
        {/* Status dot */}
        <div className="mt-1.5 shrink-0">
          <div className={`w-2 h-2 rounded-full ${s.dot}`} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Top */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-mono font-medium text-slate-400 dark:text-white/30">
                  {job.job_id}
                </span>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.pill}`}>
                  {s.label}
                </span>
                {job.risk_flag && (
                  <span className="text-[10px] font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/10 border border-amber-300/60 dark:border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertTriangle size={9} className="shrink-0" />
                    {job.risk_flag}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{job.name}</p>
              <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">{job.client}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-semibold text-slate-600 dark:text-white/60">{job.crew}</p>
              <p className="text-xs text-slate-400 dark:text-white/25 mt-0.5">Due {job.due_date}</p>
            </div>
          </div>

          {/* Bottom: progress + budget */}
          <div className="grid grid-cols-2 gap-4">
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-medium text-slate-400 dark:text-white/30">Progress</span>
                <span className="text-[10px] font-bold text-slate-600 dark:text-white/60">{job.pct_complete}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/[0.07]">
                <div className={`h-1.5 rounded-full ${s.bar} transition-all`} style={{ width: `${job.pct_complete}%` }} />
              </div>
            </div>

            {/* Budget vs actual */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-medium text-slate-400 dark:text-white/30">Budget vs actual</span>
                {overBudget && <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">Over</span>}
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-xs font-bold ${overBudget ? "text-rose-600 dark:text-rose-400" : "text-slate-700 dark:text-white/70"}`}>
                  {fmtk(job.actual_cost_gbp)}
                </span>
                <span className="text-xs text-slate-400 dark:text-white/30 font-normal">/ {fmtk(job.budget_gbp)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  },
  "near-capacity": {
    label: "Near capacity",
    color: "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20",
    bar: "bg-amber-500 dark:bg-amber-400",
  },
  overallocated: {
    label: "Overallocated",
    color: "text-rose-700 bg-rose-100 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20",
    bar: "bg-rose-500 dark:bg-rose-400",
  },
};

function CrewCard({ crew }: { crew: CrewStatus }) {
  const s = CREW_STATUS[crew.status];

  return (
    <div className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{crew.name}</p>
          <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">{crew.lead}</p>
        </div>
        <span className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border shrink-0 ${s.color}`}>
          {s.label}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1">Active jobs</p>
          <p className="text-xl font-bold leading-none text-slate-900 dark:text-white">{crew.jobs_active}</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1">Hours / week</p>
          <p className="text-xl font-bold leading-none text-slate-900 dark:text-white">
            {crew.hours_this_week}
            <span className="text-sm text-slate-400 dark:text-white/30 font-normal">/{crew.capacity_hours}</span>
          </p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 dark:text-white/30 mb-1">Utilisation</p>
          <p className="text-xl font-bold leading-none text-slate-900 dark:text-white">{crew.utilisation_pct}%</p>
        </div>
      </div>

      <div>
        <div className="h-2 rounded-full bg-slate-200 dark:bg-white/[0.07]">
          <div className={`h-2 rounded-full ${s.bar} transition-all`} style={{ width: `${crew.utilisation_pct}%` }} />
        </div>
      </div>
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
    border: "border-rose-300/50 bg-rose-50 dark:border-rose-500/15 dark:bg-rose-500/[0.03]",
  },
  watch: {
    label: "Watch",
    pill: "text-amber-700 bg-amber-100 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20",
    border: "border-amber-300/50 bg-amber-50 dark:border-amber-500/15 dark:bg-amber-500/[0.03]",
  },
  "supply-risk": {
    label: "Supply risk",
    pill: "text-orange-700 bg-orange-100 border-orange-200 dark:text-orange-400 dark:bg-orange-500/10 dark:border-orange-500/20",
    border: "border-orange-300/50 bg-orange-50 dark:border-orange-500/15 dark:bg-orange-500/[0.03]",
  },
};

function MaterialRow({ mat }: { mat: MaterialAlert }) {
  const s = MAT_SEVERITY[mat.severity];

  return (
    <div className={`p-4 rounded-xl border ${s.border}`}>
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{mat.material}</p>
          <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">
            {mat.job_id} · {mat.job_name}
          </p>
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
   INSIGHT CARD
───────────────────────────────────────────── */

function InsightCard({
  text,
  action,
  severity,
}: {
  text: string;
  action: string;
  severity: "warn" | "alert" | "info";
}) {
  const map = {
    warn:  { bar: "bg-amber-500",  icon: "text-amber-600 dark:text-amber-400",  bg: "border-amber-300/50 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.06]" },
    alert: { bar: "bg-rose-500",   icon: "text-rose-600 dark:text-rose-400",    bg: "border-rose-300/50 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.06]" },
    info:  { bar: "bg-indigo-500", icon: "text-indigo-600 dark:text-indigo-400", bg: "border-slate-200 bg-white dark:border-white/[0.08] dark:bg-white/[0.025]" },
  };
  const m = map[severity];

  return (
    <div className={`p-4 rounded-xl border ${m.bg} flex items-start gap-3`}>
      <div className={`w-0.5 self-stretch rounded-full ${m.bar} shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-white/85 leading-snug mb-1">{text}</p>
        <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{action}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */

export default function InsightLayer({
  data,
}: {
  data: InventoryCoDashboard;
}) {
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

  return (
    <div className="space-y-12">

      {/* Source badge */}
      <div className="flex items-center gap-2">
        <Database
          size={13}
          className={source === "supabase" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-white/25"}
        />
        <span className={`text-xs font-medium ${source === "supabase" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-white/25"}`}>
          {source === "supabase"
            ? "Commercial data live — Supabase · Operational data illustrative"
            : "Demo — all data illustrative · built on real-world architecture"}
        </span>
      </div>

      {/* ══════════════════════════════════════
          LIVE INSIGHT STATEMENTS (TOP)
      ══════════════════════════════════════ */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap size={13} className="text-amber-500" />
          <p className="text-xs font-semibold text-slate-600 dark:text-white/50 uppercase tracking-widest">Live insights — auto-generated from data</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <InsightCard
            severity="alert"
            text="Two active jobs are over labour budget by more than 10%"
            action="Identify margin issues before they impact profitability — now surfaced automatically rather than discovered at job close."
          />
          <InsightCard
            severity="alert"
            text="One high-value project is at risk due to material shortages"
            action="Supply delay flagged 3 days before it would have appeared in a manual review. Gives time to act."
          />
          <InsightCard
            severity="warn"
            text="Crew C is nearing full allocation next week"
            action="Make staffing decisions with confidence — spot over-commitment before it affects delivery."
          />
          <InsightCard
            severity="warn"
            text="Material cost variance is reducing margin on retrofit work"
            action="Committed spend tracked against estimates across all active jobs. Overruns visible in real time."
          />
        </div>
      </div>

      {/* ══════════════════════════════════════
          TOP KPI ROW — 6 primary metrics
      ══════════════════════════════════════ */}
      <div>
        <SectionLabel label="Business Overview" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <TopKPI
            label="Revenue"
            value={fmt(kpis.totalRevenue)}
            delta={revenueGrowthPct ? `+${revenueGrowthPct}%` : undefined}
            deltaPositive={true}
            sub="6-month total · growing"
            accent="indigo"
          />
          <TopKPI
            label="Gross Profit"
            value={fmt(kpis.totalProfit)}
            delta={`${pct(kpis.grossMarginPct)} margin`}
            deltaPositive={true}
            sub="from centralised model"
            accent="emerald"
          />
          <TopKPI
            label="Active Jobs"
            value={String(operationalKPIs.active_jobs)}
            sub="across all crews this period"
            accent="violet"
          />
          <TopKPI
            label="Jobs At Risk"
            value={String(operationalKPIs.jobs_at_risk)}
            sub="flagged for management review"
            accent="amber"
          />
          <TopKPI
            label="Crew Utilisation"
            value={`${operationalKPIs.crew_utilisation_pct}%`}
            sub="average across active crews"
            accent="sky"
          />
          <TopKPI
            label="Materials Committed"
            value={fmtk(operationalKPIs.materials_committed_gbp)}
            sub="allocated to active jobs"
            accent="rose"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════
          FINANCIAL DETAIL
      ══════════════════════════════════════ */}
      <div>
        <SectionLabel label="Financial Performance" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            label="Total Revenue"
            value={fmt(kpis.totalRevenue)}
            sub={revenueGrowthPct ? `+${revenueGrowthPct}% over period` : "6-month total"}
            positive={true}
          />
          <KPICard
            label="Gross Profit"
            value={fmt(kpis.totalProfit)}
            sub={`${pct(kpis.grossMarginPct)} margin`}
            positive={true}
          />
          <KPICard
            label="Inventory Value"
            value={fmt(kpis.inventoryValue)}
            sub="at cost across all SKUs"
            positive={null}
          />
          <KPICard
            label="Low Stock Alerts"
            value={`${kpis.lowStockCount} SKUs`}
            sub="below reorder level"
            positive={kpis.lowStockCount === 0 ? null : false}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════
          OPERATIONAL METRICS
      ══════════════════════════════════════ */}
      <div>
        <SectionLabel label="Operational Status" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Active Jobs" value={String(operationalKPIs.active_jobs)} sub="across all crews this period" state="neutral" icon={Briefcase} />
          <StatCard label="Jobs At Risk" value={String(operationalKPIs.jobs_at_risk)} sub="flagged for review" state={operationalKPIs.jobs_at_risk > 0 ? "warn" : "good"} icon={AlertCircle} />
          <StatCard label="Labour Hours — This Week" value={String(operationalKPIs.labour_hours_week)} sub="logged across all crews" state="neutral" icon={Clock} />
          <StatCard
            label="Crew Utilisation"
            value={`${operationalKPIs.crew_utilisation_pct}%`}
            sub="average across 3 active crews"
            state={operationalKPIs.crew_utilisation_pct > 95 ? "alert" : operationalKPIs.crew_utilisation_pct > 88 ? "warn" : "neutral"}
            icon={Users}
          />
          <StatCard label="Materials Committed" value={fmtk(operationalKPIs.materials_committed_gbp)} sub="allocated to active jobs" state="neutral" icon={Package} />
          <StatCard
            label="Cost Variance"
            value={`+${operationalKPIs.cost_variance_pct}%`}
            sub="actuals vs estimates across jobs"
            state={operationalKPIs.cost_variance_pct > 10 ? "alert" : operationalKPIs.cost_variance_pct > 5 ? "warn" : "good"}
            icon={TrendingUp}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════
          REVENUE TREND
      ══════════════════════════════════════ */}
      <div>
        <SectionLabel label="Revenue Trend" />
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
          <div className="flex items-start justify-between mb-6 gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Monthly revenue & profit — Oct 2025 to Mar 2026</p>
              <p className="text-xs text-slate-400 dark:text-white/35 mt-1">Served from centralised data model. No manual assembly.</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-white/40 shrink-0">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500" />Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" />Profit</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
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

      {/* ══════════════════════════════════════
          JOB TRACKER
      ══════════════════════════════════════ */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 shrink-0">Job Tracker</p>
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/[0.06]" />
          <span className="text-[10px] font-medium text-slate-400 dark:text-white/25 shrink-0">
            {operationalKPIs.active_jobs} active projects · sorted by risk
          </span>
        </div>

        {/* Status legend */}
        <div className="flex flex-wrap gap-3 mb-4">
          {[
            { label: "On Track",  dot: "bg-emerald-500" },
            { label: "At Risk",   dot: "bg-amber-500" },
            { label: "Delayed",   dot: "bg-rose-500" },
            { label: "Complete",  dot: "bg-indigo-500" },
            { label: "Starting",  dot: "bg-sky-500" },
          ].map((s) => (
            <span key={s.label} className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/30">
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
              {s.label}
            </span>
          ))}
        </div>

        <div className="space-y-3">
          {activeJobs.map((job) => (
            <JobRow key={job.job_id} job={job} />
          ))}
        </div>

        {/* Decision microcopy */}
        <p className="text-xs text-slate-400 dark:text-white/25 mt-4 text-center">
          Spot operational bottlenecks early — job status, crew load, and budget variance updated automatically.
        </p>
      </div>

      {/* ══════════════════════════════════════
          LABOUR & CREWS  |  MATERIALS & COST
      ══════════════════════════════════════ */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Labour & Crews */}
        <div>
          <SectionLabel label="Labour & Crews" />
          <div className="space-y-3">
            {crewStatuses.map((crew) => (
              <CrewCard key={crew.name} crew={crew} />
            ))}
          </div>
          <div className="mt-3 p-4 rounded-xl border border-amber-300/40 dark:border-white/[0.06] bg-amber-50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={12} className="text-amber-600 dark:text-amber-400" />
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">Crew C nearing full allocation next week</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-white/35 leading-relaxed">
              Make staffing and scheduling decisions with confidence — crew capacity visible before it becomes a problem.
            </p>
          </div>
        </div>

        {/* Materials & Cost */}
        <div>
          <SectionLabel label="Materials & Cost Exposure" />
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
              12 of 15 active material lines tracking at or below estimate. Only flagged lines shown.
            </p>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════
          PRODUCT PERFORMANCE  |  INVENTORY ALERTS
      ══════════════════════════════════════ */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Top products */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
          <div className="mb-6">
            <SectionLabel label="Product Performance" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white -mt-2">Top products — gross profit</p>
          </div>
          <div className="space-y-5">
            {topProducts.map((p) => (
              <div key={p.product_name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="min-w-0">
                    <span className="text-sm font-medium truncate block text-slate-900 dark:text-white">{p.product_name}</span>
                    <span className="text-xs text-slate-400 dark:text-white/25">{p.category}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-xs text-slate-400 dark:text-white/30">{pct(p.margin_pct)}</span>
                    <span className="text-sm font-semibold text-slate-600 dark:text-white/70">{fmt(p.profit)}</span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/[0.06]">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all" style={{ width: `${p.bar}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory alerts */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
          <div className="mb-6">
            <SectionLabel label="Inventory Alerts" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white -mt-2">Auto-generated · below reorder level</p>
          </div>
          {lowStockItems.length === 0 ? (
            <div className="flex items-center gap-3 text-sm text-emerald-700 dark:text-emerald-400 p-4 rounded-xl border border-emerald-300/50 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/[0.07]">
              <Package size={14} /> All products above reorder level
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockItems.map((a) => (
                <div
                  key={a.product_name}
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    a.severity === "critical"
                      ? "border-rose-300/50 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.07]"
                      : "border-amber-300/50 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.07]"
                  }`}
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
          <p className="text-[11px] text-slate-400 dark:text-white/20 mt-5 leading-relaxed font-mono">WHERE stock_level &lt; reorder_level</p>
        </div>

      </div>

      {/* ══════════════════════════════════════
          CLOSING STATEMENT
      ══════════════════════════════════════ */}
      <div className="border-t border-slate-200 dark:border-white/[0.06] pt-10">
        <div className="p-8 rounded-2xl border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/[0.05] text-center">
          <p className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
            This is the level of operational visibility we build for our clients.
          </p>
          <p className="text-sm text-slate-500 dark:text-white/45 max-w-xl mx-auto leading-relaxed">
            Every number above comes from the same centralised data model — updated automatically, no manual reporting, no version conflicts. Financial and operational data in one place.
          </p>
        </div>
      </div>

    </div>
  );
}
