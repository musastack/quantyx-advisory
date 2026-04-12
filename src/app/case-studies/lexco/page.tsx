import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  AlertTriangle,
  CheckCircle,
  Database,
  GitMerge,
  Layers,
  BarChart3,
  Plug,
  RefreshCw,
} from "lucide-react";
import { getLexCoData } from "@/lib/lexco";
import InsightLayer from "./InsightLayer";
import ThemeToggle from "../../ThemeToggle";

export const metadata = {
  title: "Lex & Co LLP — Quantyx Advisory",
  description:
    "Sample case study: how a mid-sized UK law firm centralised WIP tracking, matter profitability, and billing data across Clio, Xero, and Excel into a unified Postgres reporting and operating layer.",
};

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */

const deliverables = [
  {
    icon: Plug,
    title: "API-connected data extraction",
    body: "Clio and Xero data is pulled on a scheduled basis via their respective APIs. Time entries, matter records, invoices, and payment data are ingested automatically — no manual exports.",
  },
  {
    icon: Database,
    title: "Centralised Postgres data model",
    body: "All extracted data lands in a structured Postgres schema (Supabase-hosted). Tables are designed around the firm's entities — matters, timekeepers, time entries, invoices, payments, and WIP — with foreign key relationships throughout.",
  },
  {
    icon: GitMerge,
    title: "Transformation & financial logic",
    body: "Raw data is cleaned, deduplicated, and enriched with calculated fields: realisation rate, WIP aging buckets, matter margin, billing delays, and utilisation by timekeeper — all computed as SQL views ready for reporting.",
  },
  {
    icon: BarChart3,
    title: "Partner reporting layer",
    body: "The reporting layer surfaces KPI views, matter-level profitability, WIP aging, and billing performance — always current, drawn from one consistent source with no manual assembly.",
  },
  {
    icon: Layers,
    title: "Operational insight layer",
    body: "Built on the same data model, the operational layer gives partners real-time visibility over matter status, timekeeper utilisation, billing delays, and write-off risk — before problems compound.",
  },
];

const outcomes = [
  { stat: "< 30 min", label: "Weekly reporting time",     was: "Was ~4 hours manual"          },
  { stat: "100%",     label: "Matter margin visibility",   was: "Previously unavailable"       },
  { stat: "Live",     label: "WIP & billing tracking",    was: "Was weekly manual reconcile"  },
  { stat: "1",        label: "Source of truth",           was: "Was 3+ disconnected systems"  },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default async function LexCoPage() {
  const dashboardData = await getLexCoData();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07070e] text-slate-900 dark:text-white selection:bg-violet-500/30">

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 border-b border-slate-200 dark:border-white/[0.06] backdrop-blur-xl"
        style={{ background: "var(--nav-bg)" }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold text-sm text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Quantyx Advisory
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/#case-studies"
              className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 transition-colors"
            >
              <ArrowLeft size={13} /> Case Studies
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-14">

        {/* ══════════════════════════════════════
            1. HERO
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden border-b border-slate-200 dark:border-white/[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.12),transparent)]" />
          <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36">

            <div className="flex flex-wrap items-center gap-2 mb-10">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-400/40 dark:border-indigo-500/25 bg-indigo-100 dark:bg-indigo-500/8 px-3 py-1 rounded-full">
                Case Study
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-sky-600 dark:text-sky-400/80 border border-sky-400/30 dark:border-sky-500/20 bg-sky-100/80 dark:bg-sky-500/8 px-3 py-1 rounded-full">
                Sample / Illustrative
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-slate-400 dark:text-white/25 border border-slate-200 dark:border-white/8 px-3 py-1 rounded-full">
                Legal Services · Professional Services
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-slate-400 dark:text-white/25 border border-slate-200 dark:border-white/8 px-3 py-1 rounded-full">
                WIP &amp; Financial Operating Layer
              </span>
            </div>

            <h1 className="text-5xl md:text-[4rem] font-bold leading-[1.08] tracking-tight mb-7 max-w-3xl">
              WIP, billing, and matter profitability —<br className="hidden md:block" /> unified into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                one partner view.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 dark:text-white/50 leading-relaxed max-w-2xl mb-5">
              A mid-sized UK law firm running matters in Clio, invoicing in Xero,
              and WIP reconciliation manually in Excel — with no clear view of
              matter profitability, billing delays, or write-off risk.
            </p>
            <p className="text-sm text-slate-400 dark:text-white/35 mb-5 max-w-xl leading-relaxed">
              We centralised all three into a single Postgres data model and built
              a partner-facing insight layer covering WIP, matter margin, timekeeper
              utilisation, and billing performance.
            </p>
            <p className="text-xs text-slate-300 dark:text-white/20 mb-5 max-w-xl">
              <span className="text-slate-400 dark:text-white/35 font-medium">Note:</span>{" "}
              Lex &amp; Co LLP is a fictionalised example. All data is generated and
              illustrative. The architecture and approach reflect a realistic engagement.
            </p>
            <div className="inline-flex items-center gap-2 border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.03] rounded-full px-4 py-1.5 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <p className="text-xs text-slate-500 dark:text-white/40">
                Built using real-world system architecture — Clio API · Xero API · Postgres · Supabase
              </p>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {[
                ["Client",   "Lex & Co LLP (sample)"],
                ["Revenue",  "~£5–10m / year"],
                ["Sector",   "Legal Services · LLP"],
                ["Stack",    "Clio · Xero · Postgres · Supabase"],
                ["Approach", "API extraction · SQL modelling · partner reporting layer"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-1">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-slate-600 dark:text-white/70">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            1b. BESPOKE CALLOUT
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-100/40 dark:bg-white/[0.01]">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="grid sm:grid-cols-3 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">
              {[
                {
                  icon: "⚙",
                  label: "100% custom-built",
                  body: "No off-the-shelf dashboards or generic reporting tools. Every pipeline, schema, and view was designed around Lex & Co's specific systems, matter structure, and fee-earner model.",
                  color: "text-indigo-600 dark:text-indigo-400",
                },
                {
                  icon: "🔗",
                  label: "Specific integrations",
                  body: "Clio and Xero APIs connected using the firm's exact data models — matter IDs, timekeeper rates, invoice structures, and payment terms mapped precisely into the schema.",
                  color: "text-violet-600 dark:text-violet-400",
                },
                {
                  icon: "📐",
                  label: "Logic built to their rules",
                  body: "Recovery rate thresholds, WIP aging bands, utilisation targets, and write-off alert rules were defined by the partners — then automated. Their rules, running automatically.",
                  color: "text-sky-600 dark:text-sky-400",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white dark:bg-[#07070e] p-7 flex flex-col gap-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  <p className={`text-sm font-bold ${item.color}`}>{item.label}</p>
                  <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            2. THE PROBLEM
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-5">
                  The Problem
                </p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 tracking-tight">
                  Three systems.<br />No view of profitability.
                </h2>
                <p className="text-slate-500 dark:text-white/45 leading-relaxed mb-8">
                  As the firm grew in headcount and matter volume, the reporting
                  problem compounded. Time was recorded in Clio, invoicing handled
                  in Xero, and WIP reconciliation done manually in Excel every week.
                  Partners had no joined-up view of matter margin, billing delays,
                  or which matters were at risk of write-off — until it was too late
                  to act.
                </p>
                <div className="space-y-3">
                  {[
                    "WIP tracked inconsistently — no single source of truth across systems",
                    "Matter profitability unknown until invoice raised — often weeks after work completed",
                    "Time recorded but not properly analysed against budget or recovery targets",
                    "Billing delays not visible — work sat unbilled for weeks without anyone noticing",
                    "Write-off risk only surfaced during manual end-of-month reconciliation",
                    "Management reporting built by hand in Excel each week — time-consuming and inconsistent",
                  ].map((issue) => (
                    <div
                      key={issue}
                      className="flex items-start gap-3 text-sm text-slate-500 dark:text-white/50"
                    >
                      <div className="mt-2 w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20 shrink-0" />
                      {issue}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-4">
                  Systems in use — before
                </p>
                {[
                  {
                    name:         "Clio",
                    badge:        "Practice Management",
                    detail:       "All matter records, time entries, and fee-earner data lived in Clio. API available but only accessed manually for periodic exports. No live link to billing or financial data.",
                    issue:        "Time recorded but not reconciled against budget — no visibility over recovery",
                    accentBorder: "border-l-indigo-500/50",
                    accentBg:     "bg-indigo-500/[0.04]",
                  },
                  {
                    name:         "Xero",
                    badge:        "Invoicing / Accounting",
                    detail:       "All invoicing, payment tracking, and accounting ran through Xero. Not linked to matter records or timekeeper data — revenue and time data lived in completely separate systems.",
                    issue:        "No way to reconcile billing to time recorded — matter margin unknown",
                    accentBorder: "border-l-blue-500/50",
                    accentBg:     "bg-blue-500/[0.04]",
                  },
                  {
                    name:         "Excel",
                    badge:        "WIP / Reporting",
                    detail:       "WIP reconciliation, billing delay tracking, and the weekly management report were all built in Excel — pulling exports from Clio and Xero, reconciling manually, formatting for partners.",
                    issue:        "Rebuilt weekly, inconsistent month-to-month, no version control",
                    accentBorder: "border-l-emerald-500/50",
                    accentBg:     "bg-emerald-500/[0.04]",
                  },
                ].map((s) => (
                  <div
                    key={s.name}
                    className={`border-l-2 ${s.accentBorder} ${s.accentBg} border border-slate-200 dark:border-white/[0.06] rounded-xl p-5 space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{s.name}</span>
                      <span className="text-[10px] text-slate-400 dark:text-white/35 font-medium border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-full">
                        {s.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
                      {s.detail}
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400/70 flex items-center gap-1.5 pt-1">
                      <AlertTriangle size={11} className="shrink-0" />
                      {s.issue}
                    </p>
                  </div>
                ))}
                <div className="mt-2 rounded-xl border border-rose-400/25 dark:border-rose-500/15 bg-rose-50 dark:bg-rose-500/[0.06] p-5 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-rose-600 dark:text-rose-300 mb-1">
                      ~4 hours per week
                    </p>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
                      consumed by manual WIP reconciliation and reporting — pulling exports, reconciling
                      figures, and formatting for partner review before a single number could be discussed.
                    </p>
                  </div>
                  <div className="border-t border-slate-200 dark:border-white/[0.06] pt-3">
                    <p className="text-sm font-semibold text-rose-500/80 dark:text-rose-300/70 mb-1">
                      Zero matter profitability visibility
                    </p>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
                      Time and billing were not joined — partners had no way to see whether a
                      matter was delivering on margin until weeks after the work was complete.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. DATA ARCHITECTURE
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-100/50 dark:bg-white/[0.015]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
                Architecture
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                The data architecture
              </h2>
              <p className="text-slate-500 dark:text-white/40 max-w-xl mx-auto text-base leading-relaxed">
                A structured pipeline connects every source system — practice
                management, invoicing, and manual WIP records — into a single
                Postgres database, with a partner-facing insight layer built on top.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-3">

              {/* Sources */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/20 text-center mb-2">
                  Source systems
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Clio",  sub: "REST API",          color: "border-indigo-400/40 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/[0.06] text-indigo-600 dark:text-indigo-300"  },
                    { label: "Xero",  sub: "API / OAuth",       color: "border-blue-400/40 dark:border-blue-500/25 bg-blue-50 dark:bg-blue-500/[0.06] text-blue-600 dark:text-blue-300"              },
                    { label: "Excel", sub: "Structured upload", color: "border-emerald-400/40 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/[0.06] text-emerald-700 dark:text-emerald-300" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className={`border ${s.color} rounded-xl px-3 py-3.5 text-center`}
                    >
                      <p className="text-sm font-semibold">{s.label}</p>
                      <p className="text-[10px] text-slate-400 dark:text-white/30 mt-0.5">
                        {s.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <ArchArrow
                label="scheduled extraction"
                icon={<RefreshCw size={12} className="text-slate-300 dark:text-white/20" />}
              />

              <ArchLayer
                icon={<Plug size={14} />}
                color="border-sky-400/40 dark:border-sky-500/25 bg-sky-50 dark:bg-sky-500/[0.07] text-sky-700 dark:text-sky-300"
                label="Ingestion Layer"
                pills={[
                  "Scheduled jobs",
                  "Error logging",
                  "Incremental loads",
                  "Raw data staging",
                ]}
                body="Clio and Xero are polled on a scheduled basis. Raw data lands in staging tables before any transformation — preserving a full audit trail of every ingestion run."
              />

              <ArchArrow label="load to database" />

              {/* Database */}
              <div className="border-2 border-indigo-400/40 dark:border-indigo-500/40 bg-indigo-50 dark:bg-indigo-500/[0.08] rounded-2xl px-5 py-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Database size={16} className="text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-200">
                        Centralised Database
                      </p>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400/70 border border-indigo-400/30 dark:border-indigo-500/25 px-2 py-0.5 rounded-full">
                        Postgres · Supabase
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed mb-3">
                      The single source of truth. All source data stored in a structured
                      relational schema — matters, timekeepers, time entries, invoices,
                      payments, WIP, and adjustments — joined by consistent keys.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        "lc_matters",
                        "lc_time_entries",
                        "lc_invoices",
                        "lc_payments",
                        "lc_timekeepers",
                        "lc_wip",
                        "lc_write_offs",
                        "views",
                      ].map((t) => (
                        <div
                          key={t}
                          className="text-center py-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07]"
                        >
                          <p className="text-[10px] text-slate-400 dark:text-white/35 font-mono">
                            {t}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <ArchArrow
                label="transform & model"
                icon={<GitMerge size={12} className="text-slate-300 dark:text-white/20" />}
              />

              <ArchLayer
                icon={<GitMerge size={14} />}
                color="border-violet-400/40 dark:border-violet-500/25 bg-violet-50 dark:bg-violet-500/[0.07] text-violet-700 dark:text-violet-300"
                label="Transformation Layer"
                pills={[
                  "Type normalisation",
                  "Deduplication",
                  "WIP aging buckets",
                  "Realisation rate",
                  "Matter margin",
                  "Utilisation calc.",
                ]}
                body="Raw tables are transformed into clean, analysis-ready views. Calculated fields include WIP age, matter margin, realisation rate, billing delay, timekeeper utilisation, and write-off risk flags — all computed as SQL views."
              />

              <ArchArrow
                label="serve to partners"
                icon={<BarChart3 size={12} className="text-slate-300 dark:text-white/20" />}
              />

              <ArchLayer
                icon={<Layers size={14} />}
                color="border-indigo-400/40 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/[0.07] text-indigo-700 dark:text-indigo-300"
                label="Partner Insight Layer"
                pills={[
                  "Matter tracker",
                  "WIP aging",
                  "Realisation rates",
                  "Utilisation",
                  "Billing alerts",
                  "Profitability view",
                ]}
                body="The partner layer surfaces matter status, WIP aging, billing delays, write-off risk, and timekeeper utilisation — giving leadership full visibility over delivery and financial performance from one consistent source."
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            4. WHAT WAS BUILT
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-5">
                  Deliverables
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                  What was built
                </h2>
                <p className="text-slate-500 dark:text-white/40 leading-relaxed text-sm">
                  Five components — each removing a layer of manual dependency and
                  replacing it with an automated, reliable process. The result is a
                  single operating layer covering WIP, billing, profitability, and
                  utilisation.
                </p>
              </div>
              <div className="space-y-3">
                {deliverables.map((d) => (
                  <div
                    key={d.title}
                    className="flex gap-4 p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <d.icon size={14} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{d.title}</p>
                      <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
                        {d.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5. INSIGHT LAYER
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-100/50 dark:bg-white/[0.015]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
                Partner Portal
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                What the firm can now see
              </h2>
              <p className="text-slate-500 dark:text-white/40 text-base max-w-xl leading-relaxed">
                These outputs are served from the centralised data model. Every figure
                is computed from the same underlying source — no manual assembly, no
                version conflicts, no end-of-week reconciliation.
              </p>
            </div>
            <InsightLayer data={dashboardData} />
          </div>
        </section>

        {/* ══════════════════════════════════════
            5b. DECISION CONTEXT
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-14">
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  heading: "Identify write-off risk before it crystallises",
                  body: "WIP aging is tracked automatically. Partners see which matters are approaching the write-off threshold — days before they would have surfaced in a manual review.",
                  accent: "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.04]",
                  label:  "text-rose-600 dark:text-rose-400",
                },
                {
                  heading: "Understand matter profitability as work is delivered",
                  body: "Realisation rates and margin are tracked matter-by-matter in real time — not reconstructed weeks after the invoice is raised.",
                  accent: "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.04]",
                  label:  "text-amber-600 dark:text-amber-400",
                },
                {
                  heading: "Manage utilisation and capacity with confidence",
                  body: "Timekeeper hours, billable vs non-billable split, and capacity are tracked automatically — no manual tally, no reliance on memory to manage workload.",
                  accent: "border-indigo-200 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/[0.04]",
                  label:  "text-indigo-600 dark:text-indigo-400",
                },
              ].map((item) => (
                <div
                  key={item.heading}
                  className={`p-6 rounded-2xl border ${item.accent}`}
                >
                  <p className={`text-sm font-bold mb-2 ${item.label}`}>
                    {item.heading}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5c. BEFORE / AFTER COMPARISON
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-100/50 dark:bg-white/[0.015]">
          <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-3">
                The Transformation
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Before vs After
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">

              {/* BEFORE */}
              <div className="bg-white dark:bg-[#07070e] p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-rose-400" />
                  <p className="text-xs font-bold uppercase tracking-widest text-rose-500 dark:text-rose-400">
                    Before
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "WIP tracking",       value: "Manual Excel reconciliation, rebuilt weekly" },
                    { label: "Matter margin",       value: "Unknown until invoice raised — weeks after work" },
                    { label: "Billing delays",      value: "Not tracked — work sat unbilled unnoticed" },
                    { label: "Write-off risk",      value: "Only surfaced in monthly manual review" },
                    { label: "Utilisation",         value: "Estimated from timesheets — no live data" },
                    { label: "Data source",         value: "3 disconnected systems — Clio, Xero, Excel" },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-4 items-start">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-300 dark:bg-rose-500/50 shrink-0" />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-0.5">
                          {row.label}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-white/45 leading-relaxed">
                          {row.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AFTER */}
              <div className="bg-slate-50 dark:bg-[#0b0b18] p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    After
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "WIP tracking",       value: "Automated — updated on every data refresh, no manual work" },
                    { label: "Matter margin",       value: "Live — tracked as time is recorded and invoices raised" },
                    { label: "Billing delays",      value: "Flagged automatically — WIP aging visible by matter" },
                    { label: "Write-off risk",      value: "Surfaced in real time — 60- and 90-day aging alerts automated" },
                    { label: "Utilisation",         value: "Live by timekeeper — billable vs non-billable tracked automatically" },
                    { label: "Data source",         value: "One Postgres model — every report from the same source" },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-4 items-start">
                      <CheckCircle
                        size={13}
                        className="text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-0.5">
                          {row.label}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">
                          {row.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            6. AFTER — OPERATING MODEL
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-5">
                  Operating Model — After
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  One version of the truth
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    heading: "One central data model",
                    body: "Clio, Xero, and Excel all feed into one Postgres database. Every report, KPI, and alert draws from the same source.",
                  },
                  {
                    heading: "Automated pipelines",
                    body: "Scheduled API pulls replace all manual exports. Data arrives, is staged, cleaned, and loaded without anyone needing to trigger it.",
                  },
                  {
                    heading: "WIP transparency",
                    body: "WIP is tracked by matter, timekeeper, and aging band — always current within the refresh cycle. No weekly reconciliation required.",
                  },
                  {
                    heading: "Matter profitability — live",
                    body: "Time entries and invoices are joined to matters. Partners see margin per matter as work is delivered — not weeks after the final bill.",
                  },
                  {
                    heading: "Billing delay alerts",
                    body: "WIP aging triggers automatic alerts at 30, 60, and 90 days. Matters at write-off risk are surfaced before the damage compounds.",
                  },
                  {
                    heading: "Scalable architecture",
                    body: "The schema is designed to accommodate additional matter types, departments, or reporting requirements without a structural rebuild.",
                  },
                ].map((item) => (
                  <div
                    key={item.heading}
                    className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none"
                  >
                    <p className="text-sm font-semibold mb-2">{item.heading}</p>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            7. OUTCOMES
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-100/50 dark:bg-white/[0.015]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
                Results
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Indicative outcomes
              </h2>
              <p className="text-slate-400 dark:text-white/30 text-sm mt-3">
                Figures are illustrative, based on typical engagements of this type.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">
              {outcomes.map((o) => (
                <div
                  key={o.label}
                  className="bg-white dark:bg-[#07070e] p-8 flex flex-col gap-2"
                >
                  <p className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-white/55">
                    {o.stat}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-white/75 mt-1">
                    {o.label}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-white/25">{o.was}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {[
                {
                  heading: "Reporting time: 4 hours → 30 minutes",
                  body: "Weekly WIP reconciliation and partner reporting now runs automatically — no exports, no manual reconciliation, no formatting.",
                },
                {
                  heading: "Matter margin visibility: unknown → live",
                  body: "Time entries and invoices are joined to matters in real time. Partners see realisation rates and margin per matter as work is delivered.",
                },
                {
                  heading: "Write-off risk: discovered late → flagged early",
                  body: "WIP aging alerts surface at-risk matters at 60 and 90 days — giving partners time to act before the exposure compounds.",
                },
                {
                  heading: "One consistent source of truth",
                  body: "Every report, KPI, and alert draws from the same Postgres model. No version conflicts, no figures that don't reconcile.",
                },
              ].map((item) => (
                <div
                  key={item.heading}
                  className="flex items-start gap-3 p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none"
                >
                  <CheckCircle
                    size={14}
                    className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-white/80 mb-1">
                      {item.heading}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            8. CLOSING
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-8">
                Summary
              </p>
              <p className="text-2xl md:text-3xl font-medium leading-snug text-slate-600 dark:text-white/80 mb-8 tracking-tight">
                &ldquo;Every firm has different systems, different matter structures, and
                different decisions to make. That&rsquo;s why nothing here was adapted
                from a template — it was designed specifically for how Lex &amp; Co
                operates, across both their financial and operational model.&rdquo;
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  "Matter schema designed around their exact practice areas",
                  "WIP aging thresholds set by the firm's write-off policy",
                  "Realisation rate targets configured by the partners",
                  "Billing alert rules defined by the operations team, automated by us",
                  "Reporting cadence matched to their partner meeting rhythm",
                ].map((point) => (
                  <span
                    key={point}
                    className="text-xs font-medium text-slate-500 dark:text-white/40 border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.03] px-3 py-1.5 rounded-full"
                  >
                    {point}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200 dark:bg-white/[0.06]" />
                <p className="text-xs text-slate-400 dark:text-white/25 shrink-0">
                  Quantyx Advisory · Sample engagement · Illustrative
                </p>
                <div className="h-px flex-1 bg-slate-200 dark:bg-white/[0.06]" />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-100/50 dark:bg-white/[0.03] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400/70 mb-3">
                  Custom build
                </p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  We'll build something this specific for you.
                </h3>
                <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed">
                  Every engagement starts from scratch — your systems, your data, your rules.
                  In a free 30-minute call we'll map your setup and show you exactly
                  what a bespoke solution would look like.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
                >
                  Book a free call <ArrowRight size={15} />
                </Link>
                <Link
                  href="/#case-studies"
                  className="inline-flex items-center justify-center text-sm font-medium text-slate-500 dark:text-white/45 hover:text-slate-700 dark:hover:text-white/70 px-6 py-3 rounded-xl border border-slate-200 dark:border-white/[0.09] hover:border-slate-300 dark:hover:border-white/[0.18] transition-colors whitespace-nowrap"
                >
                  More case studies
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold text-slate-400 dark:text-white/40">
            Quantyx Advisory
          </span>
          <span className="text-xs text-slate-300 dark:text-white/20">
            © 2026 Quantyx Advisory. All rights reserved.
          </span>
        </div>
      </footer>

    </div>
  );
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function ArchArrow({
  label,
  icon,
}: {
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <ArrowDown size={14} className="text-slate-300 dark:text-white/15" />
      <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-white/20">
        {icon}
        {label}
      </span>
    </div>
  );
}

function ArchLayer({
  icon,
  color,
  label,
  pills,
  body,
}: {
  icon: React.ReactNode;
  color: string;
  label: string;
  pills: string[];
  body: string;
}) {
  return (
    <div className={`border ${color} rounded-xl px-5 py-4`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="opacity-80">{icon}</span>
        <p className="text-sm font-semibold">{label}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {pills.map((p) => (
          <span
            key={p}
            className="text-[10px] text-slate-400 dark:text-white/35 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] px-2 py-0.5 rounded-full"
          >
            {p}
          </span>
        ))}
      </div>
      <p className="text-xs text-slate-500 dark:text-white/35 leading-relaxed">{body}</p>
    </div>
  );
}
