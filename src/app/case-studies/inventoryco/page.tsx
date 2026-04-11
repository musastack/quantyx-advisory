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

export const metadata = {
  title: "InventoryCo Ltd — Quantyx Advisory",
  description:
    "Sample case study: how disconnected operational data across Xero, Cin7, and Excel can be centralised into a structured, automated reporting layer backed by Postgres.",
};

/* ─────────────────────────────────────────────
   STATIC DATA
───────────────────────────────────────────── */

const deliverables = [
  {
    icon: Plug,
    title: "API-connected data extraction",
    body: "Xero and Cin7 data is pulled on a scheduled basis via their respective APIs. Structured uploads handle any data without an API endpoint. All ingestion is logged and auditable.",
  },
  {
    icon: Database,
    title: "Centralised Postgres database",
    body: "All extracted data lands in a structured Postgres schema (Supabase-hosted). Tables are designed around business entities — orders, products, inventory positions — with foreign key relationships defined.",
  },
  {
    icon: GitMerge,
    title: "Transformation & data modelling",
    body: "Raw ingested data is cleaned, deduplicated, and standardised. Calculated fields — margins, inventory cover days, reorder flags — are computed and stored as structured views.",
  },
  {
    icon: BarChart3,
    title: "Reporting & insight layer",
    body: "The reporting layer queries the transformed data model directly. Outputs include KPI views, product-level margin breakdowns, and inventory alert logic — all from one consistent source.",
  },
];

const outcomes = [
  { stat: "< 30 min", label: "Weekly reporting time",     was: "Was ~5 hours manual"          },
  { stat: "100%",     label: "Product margin visibility", was: "Previously unavailable"       },
  { stat: "3 days",   label: "Earlier stock alerts",      was: "Vs end-of-week batch review"  },
  { stat: "1",        label: "Source of truth",           was: "Was 3 disconnected systems"   },
];

/* ─────────────────────────────────────────────
   PAGE (async server component)
───────────────────────────────────────────── */

export default async function InventoryCo() {
  // Fetch from Supabase — falls back to mock data if env vars not set
  const dashboardData = await getInventoryCoData();

  return (
    <div className="min-h-screen bg-[#07070e] text-white selection:bg-violet-500/30">

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#07070e]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-sm text-white/80 hover:text-white transition-colors">
            Quantyx Advisory
          </Link>
          <Link href="/#case-studies" className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
            <ArrowLeft size={13} /> Case Studies
          </Link>
        </div>
      </nav>

      <main className="pt-14">

        {/* ══════════════════════════════════════
            1. HERO
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]" />
          <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36">

            <div className="flex flex-wrap items-center gap-2 mb-10">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-violet-400 border border-violet-500/25 bg-violet-500/8 px-3 py-1 rounded-full">
                Case Study
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-sky-400/80 border border-sky-500/20 bg-sky-500/8 px-3 py-1 rounded-full">
                Sample / Illustrative
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-white/25 border border-white/8 px-3 py-1 rounded-full">
                Wholesale Distribution
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-white/25 border border-white/8 px-3 py-1 rounded-full">
                Data Centralisation
              </span>
            </div>

            <h1 className="text-5xl md:text-[4rem] font-bold leading-[1.08] tracking-tight mb-7 max-w-3xl">
              Three disconnected systems.<br className="hidden md:block" /> One{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                centralised data layer.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mb-5">
              A wholesale distributor running sales in Xero, inventory in Cin7, and
              reporting in Excel — with no central view, 5 hours of weekly manual
              reporting, and zero product-level margin visibility.
            </p>
            <p className="text-sm text-white/25 mb-5 max-w-xl">
              We unified all three systems into a single Postgres database, built
              automated pipelines, and delivered a live reporting and insight layer.
            </p>
            <p className="text-xs text-white/20 mb-14 max-w-xl">
              <span className="text-white/35 font-medium">Note:</span> InventoryCo Ltd is
              a fictionalised example. All data is generated and illustrative. The
              architecture and approach reflect a realistic engagement.
            </p>

            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {[
                ["Client",     "InventoryCo Ltd (sample)"],
                ["Revenue",    "~£3–5m / year"],
                ["Sector",     "Wholesale / Distribution"],
                ["Stack",      "Xero · Cin7 · Postgres · Supabase"],
                ["Approach",   "API extraction · SQL modelling · reporting layer"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1">{label}</p>
                  <p className="text-sm font-medium text-white/70">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            1b. BESPOKE CALLOUT
        ══════════════════════════════════════ */}
        <section className="border-b border-white/[0.06] bg-white/[0.01]">
          <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="grid sm:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
              {[
                {
                  icon: "⚙",
                  label: "100% custom-built",
                  body: "No templates, no off-the-shelf tools. Every pipeline, schema, and view was designed around InventoryCo's specific systems and workflows.",
                  color: "text-violet-400",
                },
                {
                  icon: "🔗",
                  label: "Specific integrations",
                  body: "Xero and Cin7 APIs connected using InventoryCo's exact data models — product IDs, invoice structures, and inventory schema mapped precisely.",
                  color: "text-indigo-400",
                },
                {
                  icon: "📐",
                  label: "Logic built to their rules",
                  body: "Reorder thresholds, margin calculations, and alert triggers were defined by the client — then automated. Their rules, running automatically.",
                  color: "text-sky-400",
                },
              ].map((item) => (
                <div key={item.label} className="bg-[#07070e] hover:bg-white/[0.025] transition-colors p-7 flex flex-col gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <p className={`text-sm font-bold ${item.color}`}>{item.label}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            2. BEFORE
        ══════════════════════════════════════ */}
        <section className="border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-5">The Problem</p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 tracking-tight">
                  Three systems.<br />No central database.
                </h2>
                <p className="text-white/45 leading-relaxed mb-8">
                  Reporting relied entirely on manual effort. Each week someone would
                  export data from Xero and Cin7, paste it into Excel, and build a report
                  by hand. By the time it reached leadership, the numbers were already
                  days old — and reconciling across three systems introduced consistent
                  errors.
                </p>
                <div className="space-y-3">
                  {[
                    "No single source of truth — each system told a different story",
                    "Manual reconciliation between sales and inventory data",
                    "No product-level margin visibility — revenue and cost lived separately",
                    "Stock issues only surfaced during end-of-week manual reviews",
                    "Report quality depended on who built it and when",
                  ].map((issue) => (
                    <div key={issue} className="flex items-start gap-3 text-sm text-white/50">
                      <div className="mt-2 w-1 h-1 rounded-full bg-white/20 shrink-0" />
                      {issue}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-4">
                  Systems in use — before
                </p>
                {[
                  {
                    name: "Xero",       badge: "Financial / Sales",
                    detail: "Invoice and revenue data. Accessible via API — but only used as manual CSV exports in practice.",
                    issue:  "No live integration — exports triggered manually each week",
                    accentBorder: "border-l-blue-500/50", accentBg: "bg-blue-500/[0.04]",
                  },
                  {
                    name: "Cin7",       badge: "Inventory / Stock",
                    detail: "Product catalogue, SKU-level stock positions, purchase orders, and warehouse data.",
                    issue:  "Completely siloed — no linkage to sales or financials",
                    accentBorder: "border-l-orange-500/50", accentBg: "bg-orange-500/[0.04]",
                  },
                  {
                    name: "Excel",      badge: "Reporting",
                    detail: "Weekly reports built by copy-pasting from Xero exports and Cin7 data dumps.",
                    issue:  "Rebuilt from scratch each week — inconsistent and error-prone",
                    accentBorder: "border-l-emerald-500/50", accentBg: "bg-emerald-500/[0.04]",
                  },
                ].map((s) => (
                  <div key={s.name} className={`border-l-2 ${s.accentBorder} ${s.accentBg} border border-white/[0.06] rounded-xl p-5 space-y-2`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{s.name}</span>
                      <span className="text-[10px] text-white/35 font-medium border border-white/10 px-2 py-0.5 rounded-full">{s.badge}</span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">{s.detail}</p>
                    <p className="text-xs text-amber-400/70 flex items-center gap-1.5 pt-1">
                      <AlertTriangle size={11} className="shrink-0" />{s.issue}
                    </p>
                  </div>
                ))}
                <div className="mt-2 rounded-xl border border-rose-500/15 bg-rose-500/[0.06] p-5">
                  <p className="text-sm font-semibold text-rose-300 mb-1.5">~5 hours per week</p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    consumed by manual reporting — pulling exports, cleaning data,
                    reconciling figures, and formatting before a single insight could be read.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. DATA ARCHITECTURE
        ══════════════════════════════════════ */}
        <section className="border-b border-white/[0.06] bg-white/[0.015]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">Architecture</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The data architecture</h2>
              <p className="text-white/40 max-w-xl mx-auto text-base leading-relaxed">
                A structured pipeline connects every source system to a centralised
                Postgres database — with a clean transformation layer producing reporting
                outputs.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-3">

              {/* Sources */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/20 text-center mb-2">Source systems</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Xero",  sub: "API / OAuth",       color: "border-blue-500/25   bg-blue-500/[0.06]   text-blue-300"   },
                    { label: "Cin7",  sub: "REST API",           color: "border-orange-500/25 bg-orange-500/[0.06] text-orange-300" },
                    { label: "Excel", sub: "Structured upload",  color: "border-emerald-500/25 bg-emerald-500/[0.06] text-emerald-300" },
                  ].map((s) => (
                    <div key={s.label} className={`border ${s.color} rounded-xl px-3 py-3.5 text-center`}>
                      <p className="text-sm font-semibold">{s.label}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              <ArchArrow label="scheduled extraction" icon={<RefreshCw size={12} className="text-white/20" />} />

              <ArchLayer
                icon={<Plug size={14} />}
                color="border-sky-500/25 bg-sky-500/[0.07] text-sky-300"
                label="Ingestion Layer"
                pills={["Scheduled jobs", "Error logging", "Incremental loads", "Raw data staging"]}
                body="Each source system is polled on a defined schedule. Raw data lands in staging tables before any transformation — preserving a full audit trail of every ingestion run."
              />

              <ArchArrow label="load to database" />

              {/* Database — highlighted */}
              <div className="border-2 border-violet-500/40 bg-violet-500/[0.08] rounded-2xl px-5 py-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Database size={16} className="text-violet-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-sm font-semibold text-violet-200">Centralised Database</p>
                      <span className="text-[10px] text-violet-400/70 border border-violet-500/25 px-2 py-0.5 rounded-full">Postgres · Supabase</span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed mb-3">
                      The single source of truth. All source data stored in a structured
                      relational schema — orders, products, inventory positions, and cost
                      data joined by consistent keys.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["ic_sales", "ic_products", "ic_inventory", "views"].map((t) => (
                        <div key={t} className="text-center py-2 rounded-lg bg-white/[0.04] border border-white/[0.07]">
                          <p className="text-[10px] text-white/35 font-mono">{t}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <ArchArrow label="transform & model" icon={<GitMerge size={12} className="text-white/20" />} />

              <ArchLayer
                icon={<GitMerge size={14} />}
                color="border-indigo-500/25 bg-indigo-500/[0.07] text-indigo-300"
                label="Transformation Layer"
                pills={["Type normalisation", "Deduplication", "Margin calculations", "Reorder flag logic"]}
                body="Raw tables are transformed into clean, analysis-ready views. Calculated fields — gross margin per SKU, inventory cover days, reorder alerts — computed as SQL views."
              />

              <ArchArrow label="serve to reporting" icon={<BarChart3 size={12} className="text-white/20" />} />

              <ArchLayer
                icon={<Layers size={14} />}
                color="border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-300"
                label="Reporting & Insight Layer"
                pills={["KPI views", "Product margin breakdowns", "Stock alert logic", "Scheduled summaries"]}
                body="The reporting layer reads directly from transformed views. Outputs are consistent, always current, and require no manual input — every number traces to the same model."
              />

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            4. WHAT WAS BUILT
        ══════════════════════════════════════ */}
        <section className="border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-5">Deliverables</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">What was built</h2>
                <p className="text-white/40 leading-relaxed text-sm">
                  Four components — each removing a layer of manual dependency from
                  the business and replacing it with an automated, reliable process.
                </p>
              </div>
              <div className="space-y-3">
                {deliverables.map((d) => (
                  <div key={d.title} className="flex gap-4 p-5 rounded-xl border border-white/[0.07] bg-white/[0.025] hover:border-white/[0.12] transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <d.icon size={14} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">{d.title}</p>
                      <p className="text-xs text-white/40 leading-relaxed">{d.body}</p>
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
        <section className="border-b border-white/[0.06] bg-white/[0.015]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">Insight Layer</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                What the business can now see
              </h2>
              <p className="text-white/40 text-base max-w-xl leading-relaxed">
                These outputs are served from the centralised data model. Every figure
                is computed from the same underlying source — no manual assembly, no
                version conflicts.
              </p>
            </div>
            <InsightLayer data={dashboardData} />
          </div>
        </section>

        {/* ══════════════════════════════════════
            6. AFTER
        ══════════════════════════════════════ */}
        <section className="border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-5">
                  Operating Model — After
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  One version of the truth
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { heading: "Centralised data layer",  body: "Xero, Cin7, and Excel all feed into one Postgres database. Every report, view, and alert draws from the same underlying source."                       },
                  { heading: "Automated pipelines",     body: "Scheduled API pulls replace all manual exports. Data arrives, is staged, cleaned, and loaded — without anyone needing to trigger it."           },
                  { heading: "Near real-time visibility", body: "Revenue, margin, and stock data is current within the refresh cycle. Leadership no longer waits for a manually compiled weekly report."      },
                  { heading: "Scalable architecture",   body: "The schema is designed to accommodate additional products, channels, or reporting requirements without structural rebuild."                     },
                ].map((item) => (
                  <div key={item.heading} className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.025]">
                    <p className="text-sm font-semibold mb-2">{item.heading}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            7. OUTCOMES
        ══════════════════════════════════════ */}
        <section className="border-b border-white/[0.06] bg-white/[0.015]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">Results</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Indicative outcomes</h2>
              <p className="text-white/30 text-sm mt-3">Figures are illustrative, based on typical engagements of this type.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
              {outcomes.map((o) => (
                <div key={o.label} className="bg-[#07070e] p-8 flex flex-col gap-2 hover:bg-white/[0.03] transition-colors">
                  <p className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/55">{o.stat}</p>
                  <p className="text-sm font-semibold text-white/75 mt-1">{o.label}</p>
                  <p className="text-xs text-white/25">{o.was}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {[
                { heading: "Reporting time: 5 hours → 30 minutes",    body: "Weekly management reporting now runs automatically — no exports, no copy-paste, no manual reconciliation." },
                { heading: "Product margin visibility: 0% → 100%",     body: "Every SKU now has a calculated gross margin — available in real time from the centralised data model." },
                { heading: "Inventory alerts: end-of-week → live",     body: "Stock issues are surfaced automatically the moment they fall below reorder threshold — not days later." },
                { heading: "One consistent source of truth",            body: "All reporting draws from the same Postgres model. No more version conflicts or figures that don't reconcile." },
              ].map((item) => (
                <div key={item.heading} className="flex items-start gap-3 p-5 rounded-xl border border-white/[0.07] bg-white/[0.025]">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white/80 mb-1">{item.heading}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            8. CLOSING
        ══════════════════════════════════════ */}
        <section className="border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-8">Summary</p>
              <p className="text-2xl md:text-3xl font-medium leading-snug text-white/80 mb-8 tracking-tight">
                &ldquo;Every business has different systems, different data, and different
                decisions to make. That&rsquo;s why nothing here was adapted from a template
                — it was designed specifically for how InventoryCo operates.&rdquo;
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  "Schema designed around their exact SKU structure",
                  "Alert thresholds set by the client, automated by us",
                  "Margin logic built to match their cost model",
                  "Reporting cadence matched to their management rhythm",
                ].map((point) => (
                  <span key={point} className="text-xs font-medium text-white/40 border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 rounded-full">
                    {point}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/[0.06]" />
                <p className="text-xs text-white/25 shrink-0">Quantyx Advisory · Sample engagement · Illustrative</p>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400/70 mb-3">Custom build</p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  We&apos;ll build something this specific for you.
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Every engagement starts from scratch — your systems, your data, your rules.
                  In a free 30-minute call we&apos;ll map your setup and show you exactly
                  what a bespoke solution would look like.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link href="/#contact" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                  Book a free call <ArrowRight size={15} />
                </Link>
                <Link href="/#case-studies" className="inline-flex items-center justify-center text-sm font-medium text-white/45 hover:text-white/70 px-6 py-3 rounded-xl border border-white/[0.09] hover:border-white/[0.18] transition-colors whitespace-nowrap">
                  More case studies
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold text-white/40">Quantyx Advisory</span>
          <span className="text-xs text-white/20">© 2026 Quantyx Advisory. All rights reserved.</span>
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
      <ArrowDown size={14} className="text-white/15" />
      <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest text-white/20">
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
          <span key={p} className="text-[10px] text-white/35 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded-full">{p}</span>
        ))}
      </div>
      <p className="text-xs text-white/35 leading-relaxed">{body}</p>
    </div>
  );
}
