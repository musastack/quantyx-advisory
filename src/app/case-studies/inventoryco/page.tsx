import Link from "next/link";
import {
  ArrowLeft,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Layers,
  BarChart3,
  Package,
} from "lucide-react";

export const metadata = {
  title: "InventoryCo Ltd Case Study — Quantyx Advisory",
  description:
    "How Quantyx Advisory helped InventoryCo centralise disconnected data systems into a single real-time reporting layer.",
};

const kpis = [
  {
    label: "Monthly Revenue",
    value: "£487,000",
    sub: "+12% vs last month",
    trend: "up",
    icon: TrendingUp,
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    label: "Top Product",
    value: "LED Panels",
    sub: "Margin: 34%",
    trend: "neutral",
    icon: Package,
    accent: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    label: "Inventory Alert",
    value: "3 SKUs",
    sub: "Below reorder level",
    trend: "warn",
    icon: AlertTriangle,
    accent: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    label: "Gross Margin",
    value: "28%",
    sub: "+3pts since centralisation",
    trend: "up",
    icon: BarChart3,
    accent: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
];

const before = [
  {
    system: "Xero",
    role: "Financial & Sales Data",
    pain: "Manual CSV exports, no live sync",
  },
  {
    system: "Cin7",
    role: "Inventory & Stock Levels",
    pain: "Siloed — no connection to financials",
  },
  {
    system: "Excel",
    role: "Reporting Layer",
    pain: "Built manually each week, error-prone",
  },
];

const outcomes = [
  {
    metric: "Reporting time",
    before: "~6 hrs/week",
    after: "Fully automated",
    icon: Clock,
  },
  {
    metric: "Data sources unified",
    before: "3 disconnected systems",
    after: "1 centralised model",
    icon: Database,
  },
  {
    metric: "Inventory visibility",
    before: "End-of-week batches",
    after: "Live, with reorder alerts",
    icon: Package,
  },
  {
    metric: "Decision speed",
    before: "Days to pull insight",
    after: "Available on demand",
    icon: TrendingUp,
  },
];

export default function InventoryCo() {
  return (
    <div className="min-h-screen bg-[#05050f] text-white">
      {/* Nav strip */}
      <div className="border-b border-white/5 bg-[#08080f]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold gradient-text text-lg">
            Quantyx Advisory
          </Link>
          <Link
            href="/#case-studies"
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            All Case Studies
          </Link>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-20 space-y-24">

        {/* ── 1. HERO ── */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
              Case Study
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/50">
              Wholesale & Distribution
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/50">
              Data Centralisation
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            From Disconnected Systems<br />
            to{" "}
            <span className="gradient-text">Real-Time Insight</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
            InventoryCo Ltd was running their business across three separate platforms
            with no single source of truth. We built a centralised data model and
            automated reporting layer — eliminating manual work and giving leadership
            live visibility into the numbers that matter.
          </p>
          <div className="flex flex-wrap gap-6 pt-2 text-sm">
            <div>
              <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Client</p>
              <p className="font-medium">InventoryCo Ltd</p>
            </div>
            <div>
              <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Sector</p>
              <p className="font-medium">Wholesale Distribution</p>
            </div>
            <div>
              <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Delivered</p>
              <p className="font-medium">Q1 2026</p>
            </div>
            <div>
              <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Stack</p>
              <p className="font-medium">Xero API · Cin7 · Power Query · Power BI</p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* ── 2. BEFORE ── */}
        <section className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
              The Problem
            </p>
            <h2 className="text-3xl font-bold mb-4">Three systems. No visibility.</h2>
            <p className="text-white/50 leading-relaxed max-w-2xl">
              Before engaging Quantyx, InventoryCo&apos;s reporting relied entirely on
              manual effort. Each week, a team member would pull exports from Xero and
              Cin7, paste them into Excel, and build a report by hand. The process was
              slow, prone to error, and always out of date by the time it reached
              leadership.
            </p>
          </div>

          {/* Systems before */}
          <div className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-white/8 bg-white/3">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                Systems in use — before engagement
              </p>
            </div>
            <div className="divide-y divide-white/5">
              {before.map((b) => (
                <div key={b.system} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <div className="sm:w-32 font-semibold text-sm">{b.system}</div>
                  <div className="sm:flex-1 text-sm text-white/50">{b.role}</div>
                  <div className="flex items-center gap-2 text-xs text-amber-400/80">
                    <AlertTriangle size={12} />
                    {b.pain}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pain point callout */}
          <div className="flex gap-4 p-5 rounded-xl border border-rose-500/15 bg-rose-500/5">
            <TrendingDown size={18} className="text-rose-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/60 leading-relaxed">
              <span className="text-white font-medium">The result:</span> Reporting consumed
              roughly 6 hours per week, decisions were made on data that was days old,
              and there was no way to drill into margins, stock levels, or product
              performance without starting from scratch.
            </p>
          </div>
        </section>

        {/* ── 3. DATA FLOW TRANSFORMATION ── */}
        <section className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
              The Solution
            </p>
            <h2 className="text-3xl font-bold mb-4">Building the data foundation</h2>
            <p className="text-white/50 leading-relaxed max-w-2xl">
              We mapped every data source, identified the fields that mattered, and
              designed a pipeline that pulled everything into one clean, structured model —
              automatically.
            </p>
          </div>

          {/* Flow diagram */}
          <div className="rounded-2xl border border-white/8 bg-white/3 p-6 md:p-8 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-6">
              Data flow — end to end
            </p>

            {/* Row 1 – Sources */}
            <div className="flex flex-wrap gap-2 justify-center">
              {["Xero (API)", "Cin7 (API)", "Excel files"].map((s) => (
                <div
                  key={s}
                  className="px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-white/80"
                >
                  {s}
                </div>
              ))}
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1 py-1">
              <ArrowDown size={16} className="text-white/20" />
              <span className="text-xs text-white/25">raw data extracted</span>
            </div>

            {/* Row 2 – Clean */}
            <div className="flex justify-center">
              <div className="px-5 py-3 rounded-xl border border-indigo-500/25 bg-indigo-500/8 text-sm font-medium text-indigo-300 text-center max-w-xs">
                <Layers size={14} className="inline mr-2 opacity-70" />
                Data cleaning & transformation
                <p className="text-xs text-indigo-400/60 font-normal mt-0.5">
                  Power Query · type normalisation · deduplication
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 py-1">
              <ArrowDown size={16} className="text-white/20" />
              <span className="text-xs text-white/25">unified schema</span>
            </div>

            {/* Row 3 – Model */}
            <div className="flex justify-center">
              <div className="px-5 py-3 rounded-xl border border-purple-500/25 bg-purple-500/8 text-sm font-medium text-purple-300 text-center max-w-xs">
                <Database size={14} className="inline mr-2 opacity-70" />
                Centralised data model
                <p className="text-xs text-purple-400/60 font-normal mt-0.5">
                  Single source of truth · relationships defined
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 py-1">
              <ArrowDown size={16} className="text-white/20" />
              <span className="text-xs text-white/25">served to reporting layer</span>
            </div>

            {/* Row 4 – Dashboard */}
            <div className="flex justify-center">
              <div className="px-5 py-3 rounded-xl border border-emerald-500/25 bg-emerald-500/8 text-sm font-medium text-emerald-300 text-center max-w-xs">
                <BarChart3 size={14} className="inline mr-2 opacity-70" />
                Live dashboard layer
                <p className="text-xs text-emerald-400/60 font-normal mt-0.5">
                  Power BI · auto-refresh · role-based access
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. DASHBOARD PREVIEW ── */}
        <section className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
              Dashboard Output
            </p>
            <h2 className="text-3xl font-bold mb-4">What leadership now sees — live</h2>
            <p className="text-white/50 leading-relaxed max-w-2xl">
              The dashboard surfaces the four metrics InventoryCo cares about most.
              Every number updates automatically. No manual input required.
            </p>
          </div>

          {/* KPI blocks */}
          <div className="grid sm:grid-cols-2 gap-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className={`p-5 rounded-2xl border ${kpi.border} ${kpi.bg} flex flex-col gap-3`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/35">
                    {kpi.label}
                  </p>
                  <div className={`w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center`}>
                    <kpi.icon size={14} className={kpi.accent} />
                  </div>
                </div>
                <p className="text-3xl font-bold tracking-tight">{kpi.value}</p>
                <div className="flex items-center gap-1.5">
                  {kpi.trend === "up" && <TrendingUp size={13} className="text-emerald-400" />}
                  {kpi.trend === "warn" && <AlertTriangle size={13} className="text-amber-400" />}
                  <span className={`text-xs font-medium ${
                    kpi.trend === "up" ? "text-emerald-400" :
                    kpi.trend === "warn" ? "text-amber-400" :
                    "text-white/40"
                  }`}>
                    {kpi.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-white/25 text-center">
            Illustrative output based on client data — values anonymised
          </p>
        </section>

        {/* ── 5. WHAT WE BUILT ── */}
        <section className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
              Deliverables
            </p>
            <h2 className="text-3xl font-bold mb-4">What we built</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "API-connected data pipelines",
                body: "Direct integrations with the Xero and Cin7 APIs replaced all manual CSV exports. Data now flows into the model automatically on a scheduled refresh — no human in the loop.",
              },
              {
                title: "Centralised data model",
                body: "We designed a structured schema that links financial data from Xero to stock and order data from Cin7. This created a single, queryable source of truth for the first time.",
              },
              {
                title: "Automated reporting layer",
                body: "A Power BI dashboard delivers live views of revenue, margins, inventory levels, and product performance. Reports that previously took hours to assemble are now always current.",
              },
              {
                title: "Inventory alert logic",
                body: "We built threshold-based alerts that flag SKUs approaching reorder levels. Leadership is notified automatically — stock issues are caught before they become fulfilment problems.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl border border-white/8 bg-white/3 hover:border-indigo-500/25 transition-colors"
              >
                <CheckCircle size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">{item.title}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6 & 7. AFTER + OUTCOMES ── */}
        <section className="space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
              The Result
            </p>
            <h2 className="text-3xl font-bold mb-4">One source of truth. Always on.</h2>
            <p className="text-white/50 leading-relaxed max-w-2xl">
              InventoryCo now operates from a single, live data model. The weekly
              reporting burden has been eliminated entirely. Leadership has real-time
              visibility into revenue, stock, and margins — and the confidence to act on
              the data.
            </p>
          </div>

          {/* Before / After comparison */}
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <div className="grid grid-cols-3 text-xs font-semibold uppercase tracking-widest text-white/30 bg-white/3 border-b border-white/8">
              <div className="px-5 py-3">Metric</div>
              <div className="px-5 py-3 border-l border-white/8">Before</div>
              <div className="px-5 py-3 border-l border-white/8 text-indigo-400">After</div>
            </div>
            {outcomes.map((o, i) => (
              <div
                key={i}
                className="grid grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <div className="px-5 py-4 flex items-center gap-2.5 text-sm font-medium">
                  <o.icon size={14} className="text-white/25 shrink-0" />
                  {o.metric}
                </div>
                <div className="px-5 py-4 border-l border-white/5 text-sm text-white/40">
                  {o.before}
                </div>
                <div className="px-5 py-4 border-l border-white/5 text-sm text-emerald-400 font-medium">
                  {o.after}
                </div>
              </div>
            ))}
          </div>

          {/* Pull quote */}
          <div className="relative p-7 rounded-2xl border border-indigo-500/20 bg-indigo-500/5">
            <div className="absolute top-5 left-6 text-5xl font-serif text-indigo-500/20 leading-none select-none">
              &ldquo;
            </div>
            <p className="text-white/75 leading-relaxed text-base italic pt-4 pl-4">
              We always knew the data was there — we just couldn&apos;t get to it. Now
              everything is in one place and it updates itself. It&apos;s changed how we
              run Monday morning meetings.
            </p>
            <p className="text-xs text-white/30 mt-4 pl-4">
              — Director, InventoryCo Ltd
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl border border-white/8 bg-white/3 p-8 md:p-10 text-center space-y-5">
          <h3 className="text-2xl md:text-3xl font-bold">
            Running into the same problems?
          </h3>
          <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            If your team is still stitching together reports from multiple systems,
            there&apos;s a better way. We&apos;ll map your data landscape and show you
            what&apos;s possible — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/#contact"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3 rounded-xl font-medium transition-colors text-sm"
            >
              Book a Free Discovery Call
            </Link>
            <Link
              href="/#case-studies"
              className="text-white/50 hover:text-white px-7 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors text-sm"
            >
              View More Case Studies
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold gradient-text">Quantyx Advisory</span>
          <p className="text-white/30 text-sm">© 2026 Quantyx Advisory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
