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
    <div className="flex items-center gap-3 mb-5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 shrink-0">
        {label}
      </p>
      <div className="h-px flex-1 bg-white/[0.06]" />
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
    <div className="bg-[#0f0f1a] border border-white/10 rounded-xl px-4 py-3 text-sm shadow-xl">
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
   KPI CARD — financial (large)
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
    <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#07070e] flex flex-col gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
        {label}
      </p>
      <p className="text-4xl font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
        {value}
      </p>
      <div className="flex items-center gap-1.5 mt-auto pt-1 border-t border-white/[0.06]">
        {positive === true && (
          <TrendingUp size={11} className="text-emerald-400 shrink-0" />
        )}
        {positive === false && (
          <AlertTriangle size={11} className="text-amber-400 shrink-0" />
        )}
        {positive === null && (
          <Minus size={11} className="text-white/20 shrink-0" />
        )}
        <span
          className={`text-xs ${
            positive === true
              ? "text-emerald-400 font-medium"
              : positive === false
              ? "text-amber-400 font-medium"
              : "text-white/30"
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
    good:    "border-emerald-500/20 bg-emerald-500/[0.04]",
    warn:    "border-amber-500/20   bg-amber-500/[0.04]",
    alert:   "border-rose-500/20   bg-rose-500/[0.04]",
    neutral: "border-white/[0.07]  bg-white/[0.025]",
  };
  const valueColor: Record<StatState, string> = {
    good:    "text-emerald-300",
    warn:    "text-amber-300",
    alert:   "text-rose-300",
    neutral: "text-white",
  };

  return (
    <div
      className={`p-5 rounded-xl border ${borderBg[state]} flex flex-col gap-2.5`}
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
          {label}
        </p>
        {Icon && (
          <Icon
            size={13}
            className={
              state === "good"
                ? "text-emerald-500/60"
                : state === "warn"
                ? "text-amber-500/60"
                : state === "alert"
                ? "text-rose-500/60"
                : "text-white/15"
            }
          />
        )}
      </div>
      <p
        className={`text-3xl font-bold tracking-tight leading-none ${valueColor[state]}`}
      >
        {value}
      </p>
      <p className="text-xs text-white/35 mt-auto">{sub}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   JOB ROW
───────────────────────────────────────────── */

const JOB_STATUS = {
  "on-track": {
    label: "On Track",
    pill: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    bar: "bg-emerald-400",
    row: "border-white/[0.06] bg-white/[0.02]",
  },
  "at-risk": {
    label: "At Risk",
    pill: "text-amber-400 bg-amber-500/10 border-amber-500/25",
    bar: "bg-amber-400",
    row: "border-amber-500/15 bg-amber-500/[0.025]",
  },
  delayed: {
    label: "Delayed",
    pill: "text-rose-400 bg-rose-500/10 border-rose-500/25",
    bar: "bg-rose-400",
    row: "border-rose-500/15 bg-rose-500/[0.025]",
  },
  complete: {
    label: "Complete",
    pill: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
    bar: "bg-indigo-400",
    row: "border-white/[0.06] bg-white/[0.02]",
  },
  starting: {
    label: "Starting",
    pill: "text-sky-400 bg-sky-500/10 border-sky-500/25",
    bar: "bg-sky-400",
    row: "border-white/[0.06] bg-white/[0.02]",
  },
};

function JobRow({ job }: { job: ActiveJob }) {
  const s = JOB_STATUS[job.status];

  return (
    <div className={`p-5 rounded-xl border ${s.row}`}>
      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono text-white/30">
              {job.job_id}
            </span>
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.pill}`}
            >
              {s.label}
            </span>
          </div>
          <p className="text-sm font-semibold leading-tight">{job.name}</p>
          <p className="text-xs text-white/35 mt-0.5">{job.client}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs font-medium text-white/50">{job.crew}</p>
          <p className="text-xs text-white/25 mt-0.5">Due {job.due_date}</p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-center gap-5 flex-wrap">
        {/* Progress */}
        <div className="flex-1 min-w-[130px]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-white/30 font-medium">
              Progress
            </span>
            <span className="text-[10px] font-semibold text-white/50">
              {job.pct_complete}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.07]">
            <div
              className={`h-1.5 rounded-full ${s.bar} transition-all`}
              style={{ width: `${job.pct_complete}%` }}
            />
          </div>
        </div>

        {/* Cost vs budget */}
        <div className="shrink-0">
          <p className="text-[10px] text-white/30 font-medium mb-0.5">
            Cost vs budget
          </p>
          <p className="text-xs font-semibold">
            {fmtk(job.actual_cost_gbp)}
            <span className="text-white/30 font-normal">
              {" "}
              / {fmtk(job.budget_gbp)}
            </span>
          </p>
        </div>

        {/* Risk flag */}
        {job.risk_flag && (
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-1.5 shrink-0">
            <AlertTriangle size={10} className="text-amber-400 shrink-0" />
            <span className="text-[11px] font-medium text-amber-300">
              {job.risk_flag}
            </span>
          </div>
        )}
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
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    bar: "bg-emerald-400",
  },
  "near-capacity": {
    label: "Near capacity",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    bar: "bg-amber-400",
  },
  overallocated: {
    label: "Overallocated",
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    bar: "bg-rose-400",
  },
};

function CrewCard({ crew }: { crew: CrewStatus }) {
  const s = CREW_STATUS[crew.status];

  return (
    <div className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.025] flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold">{crew.name}</p>
          <p className="text-xs text-white/35 mt-0.5">{crew.lead}</p>
        </div>
        <span
          className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border shrink-0 ${s.color}`}
        >
          {s.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] text-white/30 mb-1">Active jobs</p>
          <p className="text-2xl font-bold leading-none">{crew.jobs_active}</p>
        </div>
        <div>
          <p className="text-[10px] text-white/30 mb-1">Hours this week</p>
          <p className="text-2xl font-bold leading-none">
            {crew.hours_this_week}
            <span className="text-sm text-white/30 font-normal">
              /{crew.capacity_hours}
            </span>
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1.5">
          <p className="text-[10px] text-white/30">Utilisation</p>
          <p className="text-[10px] font-semibold text-white/50">
            {crew.utilisation_pct}%
          </p>
        </div>
        <div className="h-2 rounded-full bg-white/[0.07]">
          <div
            className={`h-2 rounded-full ${s.bar}`}
            style={{ width: `${crew.utilisation_pct}%` }}
          />
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
    pill: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    border: "border-rose-500/15 bg-rose-500/[0.03]",
  },
  watch: {
    label: "Watch",
    pill: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    border: "border-amber-500/15 bg-amber-500/[0.03]",
  },
  "supply-risk": {
    label: "Supply risk",
    pill: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    border: "border-orange-500/15 bg-orange-500/[0.03]",
  },
};

function MaterialRow({ mat }: { mat: MaterialAlert }) {
  const s = MAT_SEVERITY[mat.severity];

  return (
    <div className={`p-4 rounded-xl border ${s.border}`}>
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{mat.material}</p>
          <p className="text-xs text-white/35 mt-0.5">
            {mat.job_id} · {mat.job_name}
          </p>
        </div>
        <span
          className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border shrink-0 ${s.pill}`}
        >
          {s.label}
        </span>
      </div>

      {mat.severity !== "supply-risk" ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs mb-2">
          <span className="text-white/40">
            Committed:{" "}
            <span className="text-white/70 font-semibold">
              {fmt(mat.committed_gbp)}
            </span>
          </span>
          <span className="text-white/20">·</span>
          <span className="text-white/40">
            Estimate: {fmt(mat.estimate_gbp)}
          </span>
          <span className="text-white/20">·</span>
          <span className="font-semibold text-rose-400">
            +{mat.variance_pct.toFixed(1)}%
          </span>
        </div>
      ) : (
        <p className="text-xs text-white/40 mb-2">
          Committed: {fmt(mat.committed_gbp)}
        </p>
      )}

      <p className="text-[11px] text-white/30 italic leading-relaxed">
        {mat.note}
      </p>
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
    <div className="space-y-14">

      {/* Source badge */}
      <div className="flex items-center gap-2">
        <Database
          size={13}
          className={
            source === "supabase" ? "text-emerald-400" : "text-white/25"
          }
        />
        <span
          className={`text-xs font-medium ${
            source === "supabase" ? "text-emerald-400" : "text-white/25"
          }`}
        >
          {source === "supabase"
            ? "Commercial data live — Supabase · Operational data illustrative"
            : "Demo — all data illustrative"}
        </span>
      </div>

      {/* ══════════════════════════════════════
          FINANCIAL PERFORMANCE
      ══════════════════════════════════════ */}
      <div>
        <SectionLabel label="Financial Performance" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            label="Total Revenue"
            value={fmt(kpis.totalRevenue)}
            sub={
              revenueGrowthPct
                ? `+${revenueGrowthPct}% over period`
                : "6-month total"
            }
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
          OPERATIONAL STATUS
      ══════════════════════════════════════ */}
      <div>
        <SectionLabel label="Operational Status" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            label="Active Jobs"
            value={String(operationalKPIs.active_jobs)}
            sub="across all crews this period"
            state="neutral"
            icon={Briefcase}
          />
          <StatCard
            label="Jobs At Risk"
            value={String(operationalKPIs.jobs_at_risk)}
            sub="flagged for review"
            state={operationalKPIs.jobs_at_risk > 0 ? "warn" : "good"}
            icon={AlertCircle}
          />
          <StatCard
            label="Labour Hours — This Week"
            value={String(operationalKPIs.labour_hours_week)}
            sub="logged across all crews"
            state="neutral"
            icon={Clock}
          />
          <StatCard
            label="Crew Utilisation"
            value={`${operationalKPIs.crew_utilisation_pct}%`}
            sub="average across 3 active crews"
            state={
              operationalKPIs.crew_utilisation_pct > 90
                ? "warn"
                : operationalKPIs.crew_utilisation_pct > 95
                ? "alert"
                : "neutral"
            }
            icon={Users}
          />
          <StatCard
            label="Materials Committed"
            value={fmtk(operationalKPIs.materials_committed_gbp)}
            sub="allocated to active jobs"
            state="neutral"
            icon={Package}
          />
          <StatCard
            label="Cost Variance"
            value={`+${operationalKPIs.cost_variance_pct}%`}
            sub="actuals vs estimates across jobs"
            state={
              operationalKPIs.cost_variance_pct > 10
                ? "alert"
                : operationalKPIs.cost_variance_pct > 5
                ? "warn"
                : "good"
            }
            icon={TrendingUp}
          />
        </div>
      </div>

      {/* ══════════════════════════════════════
          MANAGEMENT INSIGHTS
      ══════════════════════════════════════ */}
      <div>
        <SectionLabel label="Management Insights" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              tag: "Revenue insight",
              cardBorder: "border-violet-500/15 bg-violet-500/[0.04]",
              tagColor:
                "bg-violet-500/10 text-violet-400 border-violet-500/20",
              heading: "Revenue growth driven by installation work",
              body: "Monthly revenue has grown consistently — now exceeding £100k in March. Growth is concentrated in commercial LED retrofit jobs, which carry stronger margin than standard supply-only orders.",
            },
            {
              tag: "Operational insight",
              cardBorder: "border-amber-500/15 bg-amber-500/[0.04]",
              tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
              heading: "Two active jobs exceeding labour budget by 10%+",
              body: `J-1042 and J-1055 are tracking above labour estimate. Previously undetectable until job close — now surfaced automatically from labour entry data joined to job budgets.`,
            },
            {
              tag: "Materials insight",
              cardBorder: "border-rose-500/15 bg-rose-500/[0.04]",
              tagColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
              heading: "Supply delay creating delivery risk on J-1051",
              body: "Emergency Exit & Safety Packs are delayed at source, pushing back the Hartley Council project. Material availability is now monitored in real time — surfaced 3 days before it would have appeared in a manual review.",
            },
          ].map((ins) => (
            <div
              key={ins.tag}
              className={`p-6 rounded-2xl border ${ins.cardBorder} flex flex-col gap-4`}
            >
              <span
                className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border self-start ${ins.tagColor}`}
              >
                {ins.tag}
              </span>
              <p className="font-semibold text-sm leading-snug">{ins.heading}</p>
              <p className="text-xs text-white/45 leading-relaxed flex-1">
                {ins.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          REVENUE TREND
      ══════════════════════════════════════ */}
      <div>
        <SectionLabel label="Revenue Trend" />
        <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <div className="flex items-start justify-between mb-6 gap-4">
            <div>
              <p className="text-sm font-semibold">
                Monthly revenue & profit — Oct 2025 to Mar 2026
              </p>
              <p className="text-xs text-white/35 mt-1">
                Served from centralised data model. No manual assembly.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/40 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Profit
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={monthlyRevenue}
              margin={{ top: 5, right: 5, bottom: 0, left: 0 }}
            >
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
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`}
                width={42}
              />
              <Tooltip content={<RevenueTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#revGrad)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#profGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ══════════════════════════════════════
          JOB TRACKER
      ══════════════════════════════════════ */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 shrink-0">
            Job Tracker
          </p>
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="text-[10px] font-medium text-white/25 shrink-0">
            {operationalKPIs.active_jobs} active projects total
          </span>
        </div>
        <div className="space-y-3">
          {activeJobs.map((job) => (
            <JobRow key={job.job_id} job={job} />
          ))}
        </div>
        <p className="text-xs text-white/20 text-center mt-4">
          Showing {activeJobs.length} of {operationalKPIs.active_jobs} active
          projects · sorted by risk
        </p>
      </div>

      {/* ══════════════════════════════════════
          LABOUR & CREWS  |  MATERIALS & COST
      ══════════════════════════════════════ */}
      <div className="grid md:grid-cols-2 gap-5">

        {/* Labour & Crews */}
        <div>
          <SectionLabel label="Labour & Crews" />
          <div className="space-y-3">
            {crewStatuses.map((crew) => (
              <CrewCard key={crew.name} crew={crew} />
            ))}
          </div>
          <div className="mt-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle size={12} className="text-amber-400" />
              <p className="text-xs font-semibold text-amber-300">
                Crew C nearing full allocation next week
              </p>
            </div>
            <p className="text-xs text-white/35 leading-relaxed">
              At 94% utilisation, Crew C has limited capacity for new job
              starts scheduled for the coming week.
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
          <div className="mt-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle size={12} className="text-white/30" />
              <p className="text-xs font-semibold text-white/50">
                All other materials within estimate
              </p>
            </div>
            <p className="text-xs text-white/30 leading-relaxed">
              12 of 15 active material lines are tracking at or below estimate.
              Only flagged lines shown above.
            </p>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════
          PRODUCT PERFORMANCE  |  INVENTORY ALERTS
      ══════════════════════════════════════ */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Top products by profit */}
        <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <div className="mb-6">
            <SectionLabel label="Product Performance" />
            <p className="text-sm font-semibold -mt-2">
              Top products — gross profit
            </p>
          </div>
          <div className="space-y-5">
            {topProducts.map((p) => (
              <div key={p.product_name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="min-w-0">
                    <span className="text-sm font-medium truncate block">
                      {p.product_name}
                    </span>
                    <span className="text-xs text-white/25">{p.category}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-xs text-white/30">
                      {pct(p.margin_pct)}
                    </span>
                    <span className="text-sm font-semibold text-white/70">
                      {fmt(p.profit)}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/[0.06]">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all"
                    style={{ width: `${p.bar}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory alerts */}
        <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <div className="mb-6">
            <SectionLabel label="Inventory Alerts" />
            <p className="text-sm font-semibold -mt-2">
              Auto-generated · below reorder level
            </p>
          </div>
          {lowStockItems.length === 0 ? (
            <div className="flex items-center gap-3 text-sm text-emerald-400 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07]">
              <Package size={14} />
              All products above reorder level
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockItems.map((a) => (
                <div
                  key={a.product_name}
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    a.severity === "critical"
                      ? "border-rose-500/20 bg-rose-500/[0.07]"
                      : "border-amber-500/20 bg-amber-500/[0.07]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <AlertTriangle
                      size={13}
                      className={
                        a.severity === "critical"
                          ? "text-rose-400 shrink-0"
                          : "text-amber-400 shrink-0"
                      }
                    />
                    <div className="min-w-0">
                      <span className="text-sm font-medium truncate block">
                        {a.product_name}
                      </span>
                      <span className="text-xs text-white/30">
                        {a.stock_level} / {a.reorder_level} units
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold shrink-0 ml-3 ${
                      a.severity === "critical"
                        ? "text-rose-400"
                        : "text-amber-400"
                    }`}
                  >
                    {a.severity === "critical" ? "Critical" : "Low stock"}
                  </span>
                </div>
              ))}
            </div>
          )}
          <p className="text-[11px] text-white/20 mt-5 leading-relaxed font-mono">
            WHERE stock_level &lt; reorder_level
          </p>
        </div>

      </div>
    </div>
  );
}
