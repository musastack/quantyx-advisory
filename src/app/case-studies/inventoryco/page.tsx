import Link from "next/link";
import { ArrowLeft, ArrowRight, TrendingUp, AlertTriangle, CheckCircle, ArrowDown, Minus } from "lucide-react";

export const metadata = {
  title: "InventoryCo Ltd — Quantyx Advisory",
  description:
    "How Quantyx Advisory helped InventoryCo centralise three disconnected systems into a single automated reporting layer.",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const kpis = [
  {
    label: "Monthly Revenue",
    value: "£487,000",
    delta: "+12%",
    note: "vs last month",
    positive: true,
  },
  {
    label: "Gross Profit",
    value: "£138,000",
    delta: "28%",
    note: "margin",
    positive: true,
  },
  {
    label: "Inventory Value",
    value: "£210,000",
    delta: null,
    note: "across all SKUs",
    positive: null,
  },
  {
    label: "Low Stock Alerts",
    value: "3 SKUs",
    delta: "flagged",
    note: "below reorder level",
    positive: false,
  },
];

const insights = [
  {
    tag: "Revenue",
    color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    dot: "bg-violet-400",
    heading: "Growth is consistent but concentrated",
    body: "Revenue has grown steadily over the last 6 months. The majority is driven by the lighting product category — creating concentration risk that wasn't previously visible.",
  },
  {
    tag: "Margin",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
    heading: "High-revenue ≠ high-margin",
    body: "LED panels generate the strongest gross margins at 34%, despite not being the highest-revenue product. Without product-level data, this was invisible to leadership.",
  },
  {
    tag: "Stock",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
    heading: "3 SKUs are a fulfilment risk right now",
    body: "Three SKUs have dropped below their reorder thresholds. Previously this would only surface during a manual stock review — now it's flagged automatically.",
  },
];

const products = [
  { name: "LED Panels", profit: "£42,000", bar: 100 },
  { name: "Strip Lighting", profit: "£31,000", bar: 74 },
  { name: "Outdoor Units", profit: "£18,000", bar: 43 },
];

const stockAlerts = [
  { sku: "LED Panel X200", status: "Below reorder", level: "warn" },
  { sku: "Outdoor Unit A4", status: "Critical — reorder now", level: "critical" },
  { sku: "Strip Light B12", status: "Low stock", level: "warn" },
];

const deliverables = [
  {
    title: "Centralised data layer",
    body: "All data from Xero, Cin7, and Excel now flows into a single structured model. One source of truth, consistently maintained.",
  },
  {
    title: "Automated pipelines",
    body: "Scheduled extractions via Power Query replaced all manual CSV exports. Data refreshes without human input.",
  },
  {
    title: "Clean data model",
    body: "Relationships between sales, inventory, and product data were formally defined — enabling cross-source analysis for the first time.",
  },
  {
    title: "Reporting layer",
    body: "A structured reporting layer sits on top of the data model, serving clean outputs to dashboards and scheduled summaries.",
  },
];

const outcomes = [
  {
    stat: "< 30 min",
    label: "Weekly reporting",
    was: "Was ~5 hours manual",
  },
  {
    stat: "100%",
    label: "Product margin visibility",
    was: "Previously none",
  },
  {
    stat: "3 days",
    label: "Earlier stock alerts",
    was: "Vs end-of-week review",
  },
  {
    stat: "1",
    label: "Source of truth",
    was: "Was 3 disconnected systems",
  },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function InventoryCo() {
  return (
    <div className="min-h-screen bg-[#07070e] text-white selection:bg-violet-500/30">

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06] bg-[#07070e]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-sm text-white/80 hover:text-white transition-colors">
            Quantyx Advisory
          </Link>
          <Link
            href="/#case-studies"
            className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ArrowLeft size={13} />
            Case Studies
          </Link>
        </div>
      </nav>

      <main className="pt-14">

        {/* ══════════════════════════════════════
            1. HERO
        ══════════════════════════════════════ */}
        <section className="relative overflow-hidden border-b border-white/[0.06]">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(139,92,246,0.12),transparent)]" />

          <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-violet-400 border border-violet-500/25 bg-violet-500/8 px-3 py-1 rounded-full">
                Case Study
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-white/25 border border-white/8 px-3 py-1 rounded-full">
                Wholesale Distribution
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-white/25 border border-white/8 px-3 py-1 rounded-full">
                Data Centralisation
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-[4rem] font-bold leading-[1.08] tracking-tight mb-7 max-w-3xl">
              From Disconnected Systems<br className="hidden md:block" /> to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                Real-Time Insight
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/45 leading-relaxed max-w-2xl mb-14">
              InventoryCo Ltd were running their business across three separate platforms
              with no way to connect them. We built a centralised data model and
              automated reporting layer — turning hours of manual work into live,
              always-accurate visibility.
            </p>

            {/* Client strip */}
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {[
                ["Client", "InventoryCo Ltd"],
                ["Revenue", "~£3–5m / year"],
                ["Sector", "Wholesale / Distribution"],
                ["Stack", "Xero · Cin7 · Power Query"],
                ["Delivered", "Q1 2026"],
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
            2. BEFORE
        ══════════════════════════════════════ */}
        <section className="border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">

            <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
              {/* Left — narrative */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-5">
                  The Problem
                </p>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 tracking-tight">
                  Three systems.<br />No visibility.
                </h2>
                <p className="text-white/45 leading-relaxed mb-8">
                  Before this engagement, InventoryCo&apos;s reporting relied on manual effort
                  every single week. A team member would export data from Xero and Cin7,
                  paste it into Excel, and build a report by hand. By the time it reached
                  leadership, the numbers were already days old.
                </p>

                {/* Issue list */}
                <div className="space-y-3">
                  {[
                    "No single source of truth across systems",
                    "Manual reconciliation introduced errors",
                    "No product-level profitability data",
                    "Stock issues only visible in end-of-week reviews",
                  ].map((issue) => (
                    <div key={issue} className="flex items-start gap-3 text-sm text-white/50">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-white/20 shrink-0" />
                      {issue}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — system cards */}
              <div className="space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-4">
                  Systems in use — before
                </p>

                {[
                  {
                    name: "Xero",
                    role: "Sales & financial data",
                    issue: "Manual CSV exports only — no live sync",
                    color: "border-l-blue-500/40",
                  },
                  {
                    name: "Cin7",
                    role: "Inventory & stock levels",
                    issue: "Completely siloed — no connection to financials",
                    color: "border-l-orange-500/40",
                  },
                  {
                    name: "Excel",
                    role: "Reporting layer",
                    issue: "Rebuilt manually each week — error-prone and slow",
                    color: "border-l-green-500/40",
                  },
                ].map((s) => (
                  <div
                    key={s.name}
                    className={`border-l-2 ${s.color} bg-white/[0.03] border border-l-2 border-white/[0.06] rounded-xl p-5 flex flex-col gap-1.5`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{s.name}</span>
                      <span className="text-xs text-white/35">{s.role}</span>
                    </div>
                    <p className="text-xs text-amber-400/70 flex items-center gap-1.5">
                      <AlertTriangle size={11} className="shrink-0" />
                      {s.issue}
                    </p>
                  </div>
                ))}

                {/* Time cost callout */}
                <div className="mt-4 rounded-xl border border-rose-500/15 bg-rose-500/[0.06] p-5">
                  <p className="text-sm font-semibold text-rose-300 mb-1">~5 hours</p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    spent on manual reporting every week — pulling, cleaning, and formatting
                    data across three platforms before a single insight could be read.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. DATA FLOW
        ══════════════════════════════════════ */}
        <section className="border-b border-white/[0.06] bg-white/[0.015]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">
                The Approach
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Building the data foundation
              </h2>
              <p className="text-white/40 max-w-xl mx-auto text-base leading-relaxed">
                We mapped every data source, identified the critical fields, and designed
                a pipeline that handles everything automatically.
              </p>
            </div>

            {/* Flow */}
            <div className="max-w-lg mx-auto space-y-2">

              {/* Sources */}
              <div className="grid grid-cols-3 gap-2">
                {["Xero", "Cin7", "Excel"].map((s) => (
                  <div
                    key={s}
                    className="text-center py-3.5 px-3 rounded-xl border border-white/10 bg-white/[0.04] text-sm font-medium text-white/70"
                  >
                    {s}
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <FlowArrow label="extract" />

              {/* Step */}
              <FlowStep
                color="border-blue-500/25 bg-blue-500/[0.07]"
                textColor="text-blue-300"
                label="Data Extraction"
                sub="Scheduled pulls via API connections and Power Query"
              />

              <FlowArrow label="transform" />

              <FlowStep
                color="border-violet-500/25 bg-violet-500/[0.07]"
                textColor="text-violet-300"
                label="Cleaning & Normalisation"
                sub="Type standardisation · deduplication · relationship mapping"
              />

              <FlowArrow label="load" />

              <FlowStep
                color="border-indigo-500/25 bg-indigo-500/[0.07]"
                textColor="text-indigo-300"
                label="Centralised Data Model"
                sub="Single source of truth · all entities linked · version controlled"
              />

              <FlowArrow label="serve" />

              <FlowStep
                color="border-emerald-500/25 bg-emerald-500/[0.07]"
                textColor="text-emerald-300"
                label="Reporting Layer"
                sub="Live dashboards · scheduled summaries · alert logic"
              />

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            4. INSIGHT LAYER
        ══════════════════════════════════════ */}
        <section className="border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">

            <div className="mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">
                Insight Layer
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                What the business can now see
              </h2>
              <p className="text-white/40 text-base max-w-xl leading-relaxed">
                These are the outputs InventoryCo reviews each Monday morning. Every
                number is live. Nothing is manually compiled.
              </p>
            </div>

            {/* KPI grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05] transition-colors flex flex-col gap-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                    {k.label}
                  </p>
                  <p className="text-3xl font-bold tracking-tight leading-none">{k.value}</p>
                  <div className="flex items-center gap-1.5 mt-auto">
                    {k.positive === true && (
                      <TrendingUp size={12} className="text-emerald-400 shrink-0" />
                    )}
                    {k.positive === false && (
                      <AlertTriangle size={12} className="text-amber-400 shrink-0" />
                    )}
                    {k.positive === null && (
                      <Minus size={12} className="text-white/20 shrink-0" />
                    )}
                    <span className={`text-xs font-semibold ${
                      k.positive === true ? "text-emerald-400" :
                      k.positive === false ? "text-amber-400" :
                      "text-white/30"
                    }`}>
                      {k.delta}
                    </span>
                    <span className="text-xs text-white/25">{k.note}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Insight blocks */}
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {insights.map((ins) => (
                <div
                  key={ins.tag}
                  className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.025] flex flex-col gap-4"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${ins.dot}`} />
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${ins.color}`}>
                      {ins.tag}
                    </span>
                  </div>
                  <p className="font-semibold text-sm leading-snug">{ins.heading}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{ins.body}</p>
                </div>
              ))}
            </div>

            {/* Bottom row — product performance + stock alerts */}
            <div className="grid md:grid-cols-2 gap-4">

              {/* Product performance */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-6">
                  Top products by gross profit
                </p>
                <div className="space-y-5">
                  {products.map((p) => (
                    <div key={p.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{p.name}</span>
                        <span className="text-sm font-semibold text-white/70">{p.profit}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/[0.06]">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                          style={{ width: `${p.bar}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inventory alerts */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-6">
                  Inventory alerts
                </p>
                <div className="space-y-3">
                  {stockAlerts.map((a) => (
                    <div
                      key={a.sku}
                      className={`flex items-center justify-between p-4 rounded-xl border ${
                        a.level === "critical"
                          ? "border-rose-500/20 bg-rose-500/[0.07]"
                          : "border-amber-500/20 bg-amber-500/[0.07]"
                      }`}
                    >
                      <span className="text-sm font-medium">{a.sku}</span>
                      <span className={`text-xs font-semibold ${
                        a.level === "critical" ? "text-rose-400" : "text-amber-400"
                      }`}>
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-white/20 mt-5">
                  Alerts fire automatically — no manual stock review required.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5. WHAT WE BUILT
        ══════════════════════════════════════ */}
        <section className="border-b border-white/[0.06] bg-white/[0.015]">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-5">
                  Deliverables
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                  What we built
                </h2>
                <p className="text-white/40 leading-relaxed text-sm">
                  Four core components were designed, built, and handed over — each one
                  removing a layer of manual dependency from the business.
                </p>
              </div>

              <div className="space-y-3">
                {deliverables.map((d, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-xl border border-white/[0.07] bg-white/[0.025] hover:border-white/[0.12] transition-colors"
                  >
                    <CheckCircle size={16} className="text-violet-400 shrink-0 mt-0.5" />
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
                  {
                    heading: "Centralised data",
                    body: "Xero, Cin7, and Excel data feeds into one model. All reporting draws from the same source.",
                  },
                  {
                    heading: "Automated pipelines",
                    body: "Data refreshes on schedule. No manual exports, no copy-pasting, no version conflicts.",
                  },
                  {
                    heading: "Real-time visibility",
                    body: "Leadership can check revenue, margin, and stock levels at any point — not just after a manual report is built.",
                  },
                  {
                    heading: "Scalable foundation",
                    body: "The data model is designed to accommodate new products, channels, and reporting requirements without rebuild.",
                  },
                ].map((item) => (
                  <div
                    key={item.heading}
                    className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.025]"
                  >
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
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">
                Results
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Measured outcomes
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
              {outcomes.map((o) => (
                <div
                  key={o.label}
                  className="bg-[#07070e] p-8 flex flex-col gap-2 hover:bg-white/[0.03] transition-colors"
                >
                  <p className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                    {o.stat}
                  </p>
                  <p className="text-sm font-semibold text-white/70">{o.label}</p>
                  <p className="text-xs text-white/25 mt-1">{o.was}</p>
                </div>
              ))}
            </div>

            {/* Bullet outcomes */}
            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {[
                "Reporting time reduced from ~5 hours to under 30 minutes per week",
                "Clear, product-level margin visibility for the first time",
                "Inventory issues flagged automatically — days before they become problems",
                "Leadership makes decisions on live data, not week-old spreadsheets",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-white/50 p-4 rounded-xl border border-white/[0.06]">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  {item}
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
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-8">
                Summary
              </p>
              <blockquote className="text-2xl md:text-3xl font-medium leading-snug text-white/80 mb-8 tracking-tight">
                &ldquo;This project transformed how the business understands its data —
                moving from manual reporting to a scalable, automated insight layer that
                gives leadership confidence in every number they see.&rdquo;
              </blockquote>
              <p className="text-sm text-white/30">Quantyx Advisory · InventoryCo Ltd engagement · Q1 2026</p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                  Dealing with the same problem?
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  If your team is stitching together reports from multiple systems, we
                  can map your data landscape and show you what&apos;s possible — in a
                  free 30-minute call.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
                >
                  Book a free call <ArrowRight size={15} />
                </Link>
                <Link
                  href="/#case-studies"
                  className="inline-flex items-center justify-center text-sm font-medium text-white/45 hover:text-white/70 px-6 py-3 rounded-xl border border-white/[0.09] hover:border-white/[0.18] transition-colors whitespace-nowrap"
                >
                  More case studies
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
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

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <ArrowDown size={14} className="text-white/15" />
      <span className="text-[10px] font-medium uppercase tracking-widest text-white/20">{label}</span>
    </div>
  );
}

function FlowStep({
  color,
  textColor,
  label,
  sub,
}: {
  color: string;
  textColor: string;
  label: string;
  sub: string;
}) {
  return (
    <div className={`border ${color} rounded-xl px-5 py-4 text-center`}>
      <p className={`text-sm font-semibold mb-1 ${textColor}`}>{label}</p>
      <p className="text-xs text-white/30">{sub}</p>
    </div>
  );
}
