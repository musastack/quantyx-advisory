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
import { getInventoryCoData } from "@/lib/inventoryco";
import InsightLayer from "./InsightLayer";
import ThemeToggle from "../../ThemeToggle";

export const metadata = {
  title: "InventoryCo Ltd — Quantyx Advisory",
  description:
    "Sample case study: how a commercial electrical contractor centralised financial, inventory, and operational data across Xero, Cin7, and Excel into a unified Postgres reporting and operating layer.",
};

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */

const deliverables = [
  {
    icon: Plug,
    title: "API-connected data extraction",
    body: "Xero and Cin7 data is pulled on a scheduled basis via their respective APIs. Job, labour, and material data is ingested via structured uploads from operational spreadsheets. All ingestion is logged and auditable.",
  },
  {
    icon: Database,
    title: "Centralised Postgres database",
    body: "All extracted data lands in a structured Postgres schema (Supabase-hosted). Tables are designed around business entities — jobs, crews, labour entries, materials, invoices, products, and inventory — with foreign key relationships defined throughout.",
  },
  {
    icon: GitMerge,
    title: "Transformation & data modelling",
    body: "Raw ingested data is cleaned, deduplicated, and standardised. Calculated fields — job margin, crew utilisation, labour variance, material cost exposure, inventory cover days — computed and stored as SQL views ready for reporting.",
  },
  {
    icon: BarChart3,
    title: "Commercial reporting layer",
    body: "The commercial layer provides KPI views, product-level margin breakdowns, revenue trend, and inventory alert logic — all from one consistent source, always current.",
  },
  {
    icon: Layers,
    title: "Operational insight layer",
    body: "Built on the same data model, the operational layer surfaces job status, crew utilisation, labour overruns, material cost variance, and delivery risk — giving management real-time visibility over delivery as well as financials.",
  },
];

const outcomes = [
  { stat: "< 30 min", label: "Weekly reporting time",      was: "Was ~5 hours manual"          },
  { stat: "100%",     label: "Job margin visibility",      was: "Previously unavailable"       },
  { stat: "Live",     label: "Crew & labour tracking",     was: "Was weekly manual timesheet"  },
  { stat: "1",        label: "Source of truth",            was: "Was 3+ disconnected systems"  },
];

/* ─────────────────────────────────────────────
   PAGE (async server component)
───────────────────────────────────────────── */

export default async function InventoryCo() {
  const dashboardData = await getInventoryCoData();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07070e] text-slate-900 dark:text-white selection:bg-violet-500/30">

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 border-b border-slate-200 dark:border-white/[0.06] backdrop-blur-xl"
        style={{ background: "var(--nav-bg)" }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-sm text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors">
            Quantyx Advisory
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/#case-studies" className="flex items-center gap-1.5 text-sm text-slate-400 dark:text-white/40 hover:text-slate-600 dark:hover:text-white/70 transition-colors">
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]" />
          <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36">

            <div className="flex flex-wrap items-center gap-2 mb-10">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400 border border-violet-400/40 dark:border-violet-500/25 bg-violet-100 dark:bg-violet-500/8 px-3 py-1 rounded-full">
                Case Study
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-sky-600 dark:text-sky-400/80 border border-sky-400/30 dark:border-sky-500/20 bg-sky-100/80 dark:bg-sky-500/8 px-3 py-1 rounded-full">
                Sample / Illustrative
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-slate-400 dark:text-white/25 border border-slate-200 dark:border-white/8 px-3 py-1 rounded-full">
                Commercial Electrical · Installation
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-slate-400 dark:text-white/25 border border-slate-200 dark:border-white/8 px-3 py-1 rounded-full">
                Data & Operational Layer
              </span>
            </div>

            <h1 className="text-5xl md:text-[4rem] font-bold leading-[1.08] tracking-tight mb-7 max-w-3xl">
              Financial, stock, and operations —<br className="hidden md:block" /> unified into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
                one operating layer.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 dark:text-white/50 leading-relaxed max-w-2xl mb-5">
              A commercial electrical contractor running invoicing in Xero, stock in
              Cin7, and jobs, crews, and materials tracked manually in Excel — with
              no central view of job profitability, crew utilisation, or delivery risk.
            </p>
            <p className="text-sm text-slate-400 dark:text-white/35 mb-5 max-w-xl leading-relaxed">
              We centralised all systems into a single Postgres data model and built
              two layers on top: a commercial reporting layer and a live operational
              layer covering jobs, labour, crews, and material cost exposure.
            </p>
            <p className="text-xs text-slate-300 dark:text-white/20 mb-5 max-w-xl">
              <span className="text-slate-400 dark:text-white/35 font-medium">Note:</span> InventoryCo Ltd is
              a fictionalised example. All data is generated and illustrative. The
              architecture and approach reflect a realistic engagement.
            </p>
            <div className="inline-flex items-center gap-2 border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.03] rounded-full px-4 py-1.5 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <p className="text-xs text-slate-500 dark:text-white/40">Built using real-world system architecture — Xero API · Cin7 API · Postgres · Supabase</p>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {[
                ["Client",     "InventoryCo Ltd (sample)"],
                ["Revenue",    "~£3–5m / year"],
                ["Sector",     "Commercial Electrical / Lighting Installation"],
                ["Stack",      "Xero · Cin7 · Postgres · Supabase"],
                ["Approach",   "API extraction · SQL modelling · operational reporting layer"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-1">{label}</p>
                  <p className="text-sm font-medium text-slate-600 dark:text-white/70">{value}</p>
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
                  body: "No templates, no off-the-shelf tools. Every pipeline, schema, and view was designed around InventoryCo's specific systems and workflows.",
                  color: "text-violet-600 dark:text-violet-400",
                },
                {
                  icon: "🔗",
                  label: "Specific integrations",
                  body: "Xero and Cin7 APIs connected using InventoryCo's exact data models — product IDs, invoice structures, and inventory schema mapped precisely.",
                  color: "text-indigo-600 dark:text-indigo-400",
                },
                {
                  icon: "📐",
                  label: "Logic built to their rules",
                  body: "Reorder thresholds, margin calculations, and alert triggers were defined by the client — then automated. Their rules, running automatically.",
                  color: "text-sky-600 dark:text-sky-400",
                },
              ].map((item) => (
                <div key={item.label} className="bg-white dark:bg-[#07070e] p-7 flex flex-col gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <p className={`text-sm font-bold ${item.color}`}>{item.label}</p>
                  <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            2. BEFORE
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-5">The Problem</p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 tracking-tight">
                  Three systems.<br />No operational visibility.
                </h2>
                <p className="text-slate-500 dark:text-white/45 leading-relaxed mb-8">
                  As the business grew from supply-only to supply-and-install,
                  the reporting problem compounded. Financial data lived in Xero,
                  stock in Cin7, and every operational record — jobs, crews, labour
                  hours, material allocations — sat in Excel. Leadership had no
                  joined-up view of whether projects were delivering on margin,
                  whether crews were overcommitted, or where costs were running over.
                </p>
                <div className="space-y-3">
                  {[
                    "No single source of truth — financial, stock, and operational data fully siloed",
                    "Job profitability unknown until invoice raised — weeks after delivery",
                    "Labour and material costs not tied to jobs — no variance tracking",
                    "Crew allocation managed by memory and phone calls, not data",
                    "Stock issues and supply delays only surfaced during manual end-of-week reviews",
                    "Management reporting built manually each week — inconsistent and time-consuming",
                  ].map((issue) => (
                    <div key={issue} className="flex items-start gap-3 text-sm text-slate-500 dark:text-white/50">
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
                    name: "Xero",
                    badge: "Financial / Invoicing",
                    detail: "Invoice and revenue data. API available but only used as manual CSV exports in practice. No linkage to job or delivery data.",
                    issue: "Exports triggered manually — already days old before anyone read them",
                    accentBorder: "border-l-blue-500/50", accentBg: "bg-blue-500/[0.04]",
                  },
                  {
                    name: "Cin7",
                    badge: "Inventory / Purchasing",
                    detail: "Product catalogue, SKU-level stock positions, purchase orders, and supplier data. Not linked to jobs or install projects.",
                    issue: "Completely siloed — stock not tied to job material requirements",
                    accentBorder: "border-l-orange-500/50", accentBg: "bg-orange-500/[0.04]",
                  },
                  {
                    name: "Excel",
                    badge: "Jobs / Labour / Reporting",
                    detail: "Used for everything not covered by Xero or Cin7: job tracking, crew allocation, labour hours, material usage, and the weekly management report — all in separate spreadsheets.",
                    issue: "No single Excel model — multiple files, no version control, rebuilt weekly",
                    accentBorder: "border-l-emerald-500/50", accentBg: "bg-emerald-500/[0.04]",
                  },
                ].map((s) => (
                  <div key={s.name} className={`border-l-2 ${s.accentBorder} ${s.accentBg} border border-slate-200 dark:border-white/[0.06] rounded-xl p-5 space-y-2`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{s.name}</span>
                      <span className="text-[10px] text-slate-400 dark:text-white/35 font-medium border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-full">{s.badge}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{s.detail}</p>
                    <p className="text-xs text-amber-600 dark:text-amber-400/70 flex items-center gap-1.5 pt-1">
                      <AlertTriangle size={11} className="shrink-0" />{s.issue}
                    </p>
                  </div>
                ))}
                <div className="mt-2 rounded-xl border border-rose-400/25 dark:border-rose-500/15 bg-rose-50 dark:bg-rose-500/[0.06] p-5 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-rose-600 dark:text-rose-300 mb-1">~5 hours per week</p>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
                      consumed by manual reporting — pulling exports, reconciling figures, and formatting before a single number could be shared.
                    </p>
                  </div>
                  <div className="border-t border-slate-200 dark:border-white/[0.06] pt-3">
                    <p className="text-sm font-semibold text-rose-500/80 dark:text-rose-300/70 mb-1">Zero job cost visibility</p>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">
                      Labour and material costs were not linked to jobs — management had no way to know whether a project was delivering on margin until weeks after completion.
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
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">Architecture</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The data architecture</h2>
              <p className="text-slate-500 dark:text-white/40 max-w-xl mx-auto text-base leading-relaxed">
                A structured pipeline connects every source system — financial,
                inventory, and operational — into a single Postgres database, with
                commercial and operational reporting layers built on top.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-3">

              {/* Sources */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/20 text-center mb-2">Source systems</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Xero",  sub: "API / OAuth",       color: "border-blue-400/40 dark:border-blue-500/25 bg-blue-50 dark:bg-blue-500/[0.06] text-blue-600 dark:text-blue-300"   },
                    { label: "Cin7",  sub: "REST API",           color: "border-orange-400/40 dark:border-orange-500/25 bg-orange-50 dark:bg-orange-500/[0.06] text-orange-600 dark:text-orange-300" },
                    { label: "Excel", sub: "Structured upload",  color: "border-emerald-400/40 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/[0.06] text-emerald-700 dark:text-emerald-300" },
                  ].map((s) => (
                    <div key={s.label} className={`border ${s.color} rounded-xl px-3 py-3.5 text-center`}>
                      <p className="text-sm font-semibold">{s.label}</p>
                      <p className="text-[10px] text-slate-400 dark:text-white/30 mt-0.5">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              <ArchArrow label="scheduled extraction" icon={<RefreshCw size={12} className="text-slate-300 dark:text-white/20" />} />

              <ArchLayer
                icon={<Plug size={14} />}
                color="border-sky-400/40 dark:border-sky-500/25 bg-sky-50 dark:bg-sky-500/[0.07] text-sky-700 dark:text-sky-300"
                label="Ingestion Layer"
                pills={["Scheduled jobs", "Error logging", "Incremental loads", "Raw data staging"]}
                body="Each source system is polled on a defined schedule. Raw data lands in staging tables before any transformation — preserving a full audit trail of every ingestion run."
              />

              <ArchArrow label="load to database" />

              {/* Database — highlighted */}
              <div className="border-2 border-violet-400/40 dark:border-violet-500/40 bg-violet-50 dark:bg-violet-500/[0.08] rounded-2xl px-5 py-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Database size={16} className="text-violet-600 dark:text-violet-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-sm font-semibold text-violet-700 dark:text-violet-200">Centralised Database</p>
                      <span className="text-[10px] text-violet-600 dark:text-violet-400/70 border border-violet-400/30 dark:border-violet-500/25 px-2 py-0.5 rounded-full">Postgres · Supabase</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed mb-3">
                      The single source of truth. All source data stored in a structured
                      relational schema — jobs, crews, labour, materials, invoices,
                      products, and inventory — joined by consistent keys.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["ic_jobs", "ic_labour_entries", "ic_materials", "ic_sales", "ic_products", "ic_inventory", "ic_crews", "views"].map((t) => (
                        <div key={t} className="text-center py-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07]">
                          <p className="text-[10px] text-slate-400 dark:text-white/35 font-mono">{t}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <ArchArrow label="transform & model" icon={<GitMerge size={12} className="text-slate-300 dark:text-white/20" />} />

              <ArchLayer
                icon={<GitMerge size={14} />}
                color="border-indigo-400/40 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/[0.07] text-indigo-700 dark:text-indigo-300"
                label="Transformation Layer"
                pills={["Type normalisation", "Deduplication", "Margin calculations", "Job cost variance", "Crew utilisation", "Reorder flags"]}
                body="Raw tables are transformed into clean, analysis-ready views. Calculated fields include gross margin per SKU, job profitability, labour variance, crew utilisation, material cost exposure, and inventory cover — all computed as SQL views."
              />

              <ArchArrow label="serve to reporting" icon={<BarChart3 size={12} className="text-slate-300 dark:text-white/20" />} />

              <ArchLayer
                icon={<Layers size={14} />}
                color="border-emerald-400/40 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/[0.07] text-emerald-700 dark:text-emerald-300"
                label="Commercial Reporting Layer"
                pills={["KPI views", "Product margin", "Revenue trend", "Stock alerts", "Scheduled summaries"]}
                body="Commercial reporting outputs — revenue, profit, margin, inventory — served from transformed views. Always current, no manual assembly."
              />

              <ArchArrow label="serve to operations" icon={<BarChart3 size={12} className="text-slate-300 dark:text-white/20" />} />

              <ArchLayer
                icon={<Layers size={14} />}
                color="border-violet-400/40 dark:border-violet-500/25 bg-violet-50 dark:bg-violet-500/[0.07] text-violet-700 dark:text-violet-300"
                label="Operational Insight Layer"
                pills={["Job tracker", "Crew utilisation", "Labour overruns", "Material alerts", "Delivery risk"]}
                body="Built on the same model, the operational layer surfaces job status, crew capacity, labour budget variance, and material cost exposure — giving management delivery control alongside financial visibility."
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
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-5">Deliverables</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">What was built</h2>
                <p className="text-slate-500 dark:text-white/40 leading-relaxed text-sm">
                  Five components — each removing a layer of manual dependency and
                  replacing it with an automated, reliable process. The result is a
                  single operating layer covering both commercial and delivery performance.
                </p>
              </div>
              <div className="space-y-3">
                {deliverables.map((d) => (
                  <div key={d.title} className="flex gap-4 p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
                    <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <d.icon size={14} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{d.title}</p>
                      <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{d.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5. INSIGHT LAYER (live Supabase data)
        ══════════════════════════════════════ */}
        <section className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-100/50 dark:bg-white/[0.015]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">Insight Layer</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                What the business can now see
              </h2>
              <p className="text-slate-500 dark:text-white/40 text-base max-w-xl leading-relaxed">
                These outputs are served from the centralised data model. Every figure
                is computed from the same underlying source — no manual assembly, no
                version conflicts.
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
                  heading: "Identify margin issues before they impact profitability",
                  body: "Labour overruns and material cost variance are surfaced as they happen — not discovered weeks after job close.",
                  accent: "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.04]",
                  label: "text-rose-600 dark:text-rose-400",
                },
                {
                  heading: "Spot operational bottlenecks early",
                  body: "Crew capacity, job risk, and delivery timelines are visible in real time — giving management time to act.",
                  accent: "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/[0.04]",
                  label: "text-amber-600 dark:text-amber-400",
                },
                {
                  heading: "Make staffing and inventory decisions with confidence",
                  body: "Crew utilisation and material availability are tracked automatically — no phone calls, no manual tally.",
                  accent: "border-indigo-200 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/[0.04]",
                  label: "text-indigo-600 dark:text-indigo-400",
                },
              ].map((item) => (
                <div key={item.heading} className={`p-6 rounded-2xl border ${item.accent}`}>
                  <p className={`text-sm font-bold mb-2 ${item.label}`}>{item.heading}</p>
                  <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            6. AFTER
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
                  { heading: "One central data model",       body: "Xero, Cin7, and Excel all feed into one Postgres database. Every report, KPI, and alert — commercial and operational — draws from the same source." },
                  { heading: "Automated pipelines",          body: "Scheduled API pulls replace all manual exports. Data arrives, is staged, cleaned, and loaded without anyone needing to trigger it." },
                  { heading: "Commercial visibility",        body: "Revenue, margin, and stock data is current within the refresh cycle. No more manually compiled weekly reports." },
                  { heading: "Operational control",          body: "Job status, crew utilisation, labour budget variance, and material cost exposure are visible in real time — days before they would have surfaced manually." },
                  { heading: "Job profitability — live",     body: "Labour entries and material allocations are now joined to job budgets. Management sees margin per job as it is earned, not weeks after completion." },
                  { heading: "Scalable architecture",        body: "The schema is designed to accommodate additional crews, job types, or reporting requirements without a structural rebuild." },
                ].map((item) => (
                  <div key={item.heading} className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
                    <p className="text-sm font-semibold mb-2">{item.heading}</p>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{item.body}</p>
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
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">Results</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Indicative outcomes</h2>
              <p className="text-slate-400 dark:text-white/30 text-sm mt-3">Figures are illustrative, based on typical engagements of this type.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-white/[0.06] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.06]">
              {outcomes.map((o) => (
                <div key={o.label} className="bg-white dark:bg-[#07070e] p-8 flex flex-col gap-2">
                  <p className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-white/55">{o.stat}</p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-white/75 mt-1">{o.label}</p>
                  <p className="text-xs text-slate-400 dark:text-white/25">{o.was}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {[
                { heading: "Reporting time: 5 hours → 30 minutes",       body: "Weekly management reporting now runs automatically — no exports, no copy-paste, no manual reconciliation." },
                { heading: "Job margin visibility: unknown → live",        body: "Labour and material costs are now joined to jobs in real time. Management sees margin per project as it is earned, not weeks after completion." },
                { heading: "Crew utilisation: tracked manually → live",   body: "Crew hours, capacity, and allocation are now visible at any point — no more reliance on phone calls or memory to manage workload." },
                { heading: "One consistent source of truth",               body: "Every report, KPI, and alert draws from the same Postgres model. No version conflicts, no figures that don't reconcile." },
              ].map((item) => (
                <div key={item.heading} className="flex items-start gap-3 p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
                  <CheckCircle size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-white/80 mb-1">{item.heading}</p>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{item.body}</p>
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
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-8">Summary</p>
              <p className="text-2xl md:text-3xl font-medium leading-snug text-slate-600 dark:text-white/80 mb-8 tracking-tight">
                &ldquo;Every business has different systems, different operations, and
                different decisions to make. That&rsquo;s why nothing here was adapted
                from a template — it was designed specifically for how InventoryCo operates,
                across both their commercial and delivery model.&rdquo;
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  "Job schema designed around their exact project structure",
                  "Labour and material variance logic built to their cost model",
                  "Crew utilisation thresholds set by the client",
                  "Alert rules defined by their operations team, automated by us",
                  "Reporting cadence matched to their management rhythm",
                ].map((point) => (
                  <span key={point} className="text-xs font-medium text-slate-500 dark:text-white/40 border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.03] px-3 py-1.5 rounded-full">
                    {point}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200 dark:bg-white/[0.06]" />
                <p className="text-xs text-slate-400 dark:text-white/25 shrink-0">Quantyx Advisory · Sample engagement · Illustrative</p>
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
                <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400/70 mb-3">Custom build</p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  We&apos;ll build something this specific for you.
                </h3>
                <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed">
                  Every engagement starts from scratch — your systems, your data, your rules.
                  In a free 30-minute call we&apos;ll map your setup and show you exactly
                  what a bespoke solution would look like.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link href="/#contact" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                  Book a free call <ArrowRight size={15} />
                </Link>
                <Link href="/#case-studies" className="inline-flex items-center justify-center text-sm font-medium text-slate-500 dark:text-white/45 hover:text-slate-700 dark:hover:text-white/70 px-6 py-3 rounded-xl border border-slate-200 dark:border-white/[0.09] hover:border-slate-300 dark:hover:border-white/[0.18] transition-colors whitespace-nowrap">
                  More case studies
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-200 dark:border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold text-slate-400 dark:text-white/40">Quantyx Advisory</span>
          <span className="text-xs text-slate-300 dark:text-white/20">© 2026 Quantyx Advisory. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

function ArchArrow({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <ArrowDown size={14} className="text-slate-300 dark:text-white/15" />
      <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest text-slate-400 dark:text-white/20">
        {icon}{label}
      </span>
    </div>
  );
}

function ArchLayer({ icon, color, label, pills, body }: {
  icon: React.ReactNode; color: string; label: string; pills: string[]; body: string;
}) {
  return (
    <div className={`border ${color} rounded-xl px-5 py-4`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="opacity-80">{icon}</span>
        <p className="text-sm font-semibold">{label}</p>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {pills.map((p) => (
          <span key={p} className="text-[10px] text-slate-400 dark:text-white/35 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] px-2 py-0.5 rounded-full">{p}</span>
        ))}
      </div>
      <p className="text-xs text-slate-500 dark:text-white/35 leading-relaxed">{body}</p>
    </div>
  );
}
