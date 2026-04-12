import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  ArrowUpRight,
  Database,
  GitMerge,
} from "lucide-react";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import ContactForm from "./ContactForm";

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */

const services = [
  {
    icon: BarChart3,
    number: "01",
    title: "Know exactly how your business is performing — without manual reporting",
    outcome: "Clear visibility and faster decisions.",
    description:
      "We turn raw business data into dashboards and reporting that make performance easy to understand — without anyone building a spreadsheet.",
    deliverables: [
      "Finance dashboards",
      "KPI tracking",
      "Management reporting",
    ],
    accent:      "border-indigo-500/20 bg-indigo-500/[0.04] dark:border-indigo-500/30 dark:bg-indigo-500/[0.05]",
    iconBg:      "bg-indigo-100 dark:bg-indigo-500/15",
    iconColor:   "text-indigo-600 dark:text-indigo-400",
    numColor:    "text-indigo-400/40 dark:text-indigo-500/40",
    outcomeBg:   "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/25 dark:bg-indigo-500/[0.08] dark:text-indigo-300",
  },
  {
    icon: Zap,
    number: "02",
    title: "Stop wasting time on manual reporting and repetitive processes",
    outcome: "Less manual work, fewer errors.",
    description:
      "We automate the reporting and workflows your team runs manually — so they spend time on decisions, not on data wrangling.",
    deliverables: [
      "Automated reports",
      "Reconciliations",
      "Recurring processes",
    ],
    accent:      "border-violet-500/20 bg-violet-500/[0.04] dark:border-violet-500/30 dark:bg-violet-500/[0.05]",
    iconBg:      "bg-violet-100 dark:bg-violet-500/15",
    iconColor:   "text-violet-600 dark:text-violet-400",
    numColor:    "text-violet-400/40 dark:text-violet-500/40",
    outcomeBg:   "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/25 dark:bg-violet-500/[0.08] dark:text-violet-300",
  },
  {
    icon: Layers,
    number: "03",
    title: "Get one reliable version of your data across your business",
    outcome: "Reliable data and better insight.",
    description:
      "We connect your systems and centralise data into a structured reporting layer — so every report draws from the same source.",
    deliverables: [
      "Accounting + inventory + spreadsheets",
      "Single source of truth",
      "Consistent reporting",
    ],
    accent:      "border-emerald-500/20 bg-emerald-500/[0.04] dark:border-emerald-500/30 dark:bg-emerald-500/[0.05]",
    iconBg:      "bg-emerald-100 dark:bg-emerald-500/15",
    iconColor:   "text-emerald-600 dark:text-emerald-400",
    numColor:    "text-emerald-400/40 dark:text-emerald-500/40",
    outcomeBg:   "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/[0.08] dark:text-emerald-300",
  },
];

/* ─────────────────────────────────────────────
   SECONDARY CASE STUDIES
───────────────────────────────────────────── */

const secondaryCaseStudies = [
  {
    client: "Logistics SME",
    industry: "Road Freight · 45 staff",
    tag: "Process Automation",
    tagColor: "text-violet-700 bg-violet-100 border-violet-200 dark:text-violet-300 dark:bg-violet-500/10 dark:border-violet-500/20",
    headline: "Automated invoice & delivery reconciliation",
    description:
      "The finance team spent 3 hours daily matching purchase orders, delivery notes, and supplier invoices across three systems. We built an automated reconciliation pipeline that did it in seconds and flagged mismatches for review.",
    results: [
      "3 hrs/day manual matching eliminated",
      "Error rate: 6% → 0.3%",
      "Supplier disputes resolved 4x faster",
    ],
  },
  {
    client: "Digital Marketing Agency",
    industry: "Marketing · 12 staff",
    tag: "Reporting Builds",
    tagColor: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-500/10 dark:border-emerald-500/20",
    headline: "White-label client reporting portals",
    description:
      "The agency was sending PDF reports weekly — manually pulled from Google Ads, Meta, and GA4, formatted in slides, and emailed to 20+ clients. We replaced the whole process with branded live dashboards each client could access anytime.",
    results: [
      "20+ client portals live",
      "Reporting time: 8 hrs/week → automated",
      "Client churn down 25%",
    ],
  },
  {
    client: "Professional Services Firm",
    industry: "Consultancy · 28 staff",
    tag: "Data Centralisation",
    tagColor: "text-sky-700 bg-sky-100 border-sky-200 dark:text-sky-300 dark:bg-sky-500/10 dark:border-sky-500/20",
    headline: "Centralised project margin & utilisation reporting",
    description:
      "Billable hours, project costs, and client revenues lived in three different systems with no joined view. Management couldn't see project margin or team utilisation without a manual weekly pull. We built a central model covering both.",
    results: [
      "Project margin visible in real time",
      "Utilisation tracked automatically",
      "Weekly management pack: 4 hrs → 20 min",
    ],
  },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05050f]">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-200 dark:border-white/5"
           style={{ background: "var(--nav-bg)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image src="/logo.png" alt="Quantyx Advisory" height={56} width={224} className="object-contain" priority />
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600 dark:text-white/60">
            <a href="#services"     className="hover:text-slate-900 dark:hover:text-white transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">How It Works</a>
            <a href="#case-studies" className="hover:text-slate-900 dark:hover:text-white transition-colors">Case Studies</a>
            <a href="#about"        className="hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
            <a href="#contact"      className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="hidden sm:block text-sm text-slate-500 hover:text-slate-900 dark:text-white/60 dark:hover:text-white transition-colors px-1"
            >
              View Demo
            </Link>
            <a
              href="#contact"
              className="hidden sm:block text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Book a Call
            </a>
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(99,102,241,0.10),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_50%_-20%,rgba(99,102,241,0.20),transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-slate-200 bg-white rounded-full px-4 py-1.5 text-sm text-slate-500 mb-8 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/50">
            Specialist data consultancy · UK
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-[4.25rem] font-bold leading-[1.08] tracking-tight mb-7 text-slate-900 dark:text-white">
            Build the reporting and operating layer<br className="hidden sm:block" />{" "}
            <span className="gradient-text">your business is missing.</span>
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-white/55 max-w-2xl mx-auto mb-4 leading-relaxed">
            We help growing businesses centralise data, automate reporting, and
            build dashboards and internal systems that support better decisions.
          </p>

          {/* Who it's for */}
          <p className="text-sm text-slate-400 dark:text-white/30 mb-10 max-w-xl mx-auto">
            For founder-led teams and lean finance functions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <Link
              href="/case-studies/inventoryco"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-xl font-medium transition-colors text-sm shadow-sm"
            >
              View Case Study <ArrowRight size={15} />
            </Link>
            <a
              href="#services"
              className="text-slate-600 hover:text-slate-900 px-7 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-colors font-medium text-sm shadow-sm dark:text-white/55 dark:hover:text-white dark:border-white/10 dark:hover:border-white/20 dark:bg-transparent dark:hover:bg-white/5"
            >
              See what we do
            </a>
          </div>

          {/* Credentials */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-300 dark:text-white/20">
              Our background
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "Accountants",                color: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/25 dark:bg-indigo-500/8 dark:text-indigo-300"   },
                { label: "SME Specialists",             color: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/25 dark:bg-violet-500/8 dark:text-violet-300"   },
                { label: "Ex-Audit",                   color: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/25 dark:bg-sky-500/8 dark:text-sky-300"                     },
                { label: "Data Analytics Specialists",  color: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/8 dark:text-emerald-300" },
              ].map((c) => (
                <span
                  key={c.label}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-full border ${c.color}`}
                >
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section id="services" className="py-24 px-6 bg-white dark:bg-transparent border-t border-slate-100 dark:border-white/[0.04]">
        <div className="max-w-6xl mx-auto">

          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
              What we do
            </p>
            <div className="grid md:grid-cols-[1fr_auto] items-end gap-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-xl text-slate-900 dark:text-white">
                Three services.<br />All focused on one outcome.
              </h2>
              <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed max-w-xs">
                We help growing businesses centralise data, automate reporting, and
                build dashboards that support faster, better-informed decisions.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className={`relative p-7 rounded-2xl border ${s.accent} flex flex-col`}
              >
                <span className={`text-6xl font-bold leading-none mb-6 ${s.numColor} select-none`}>
                  {s.number}
                </span>

                <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center mb-4`}>
                  <s.icon size={19} className={s.iconColor} />
                </div>
                <h3 className="text-base font-bold mb-3 leading-snug text-slate-900 dark:text-white">{s.title}</h3>

                <p className="text-sm text-slate-500 dark:text-white/45 leading-relaxed mb-6 flex-1">
                  {s.description}
                </p>

                <div className="border-t border-slate-100 dark:border-white/[0.07] pt-5 space-y-2 mb-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-3">
                    Examples
                  </p>
                  {s.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/50">
                      <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/25 shrink-0" />
                      {d}
                    </div>
                  ))}
                </div>

                {/* Outcome callout */}
                <div className={`rounded-xl border px-4 py-3 ${s.outcomeBg}`}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest opacity-60 mb-1">Outcome</p>
                  <p className="text-xs font-semibold leading-snug">{s.outcome}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-6 rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm dark:shadow-none">
            <p className="text-sm text-slate-500 dark:text-white/50 max-w-lg leading-relaxed">
              Most projects combine elements of two or three of these. We scope
              every engagement individually — no fixed packages, no off-the-shelf solutions.
            </p>
            <a
              href="#contact"
              className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors whitespace-nowrap"
            >
              Discuss your project <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 px-6 border-y border-slate-100 dark:border-white/[0.05] bg-slate-50 dark:bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              Three steps. Minimal effort from your team.
            </h2>
            <p className="text-slate-500 dark:text-white/40 text-sm max-w-md mx-auto leading-relaxed">
              We handle the technical complexity — you get clean data, clear reporting, and better decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                step: "01",
                Icon: Database,
                title: "Extract data",
                body: "We connect to your systems via APIs and structured exports — pulling sales, inventory, finance, or operational data from wherever it currently lives.",
                tags: ["API integrations", "Scheduled exports", "Manual uploads"],
                color:    "border-sky-200 bg-white dark:border-sky-500/25 dark:bg-sky-500/[0.05]",
                iconBg:   "bg-sky-100 dark:bg-sky-500/15",
                iconColor:"text-sky-600 dark:text-sky-400",
                numColor: "text-sky-400/40 dark:text-sky-500/30",
              },
              {
                step: "02",
                Icon: GitMerge,
                title: "Centralise and structure",
                body: "All source data lands in a central database — cleaned, deduplicated, and modelled so every report and dashboard draws from the same consistent source.",
                tags: ["Central database", "Data modelling", "Transformation layer"],
                color:    "border-violet-200 bg-white dark:border-violet-500/25 dark:bg-violet-500/[0.05]",
                iconBg:   "bg-violet-100 dark:bg-violet-500/15",
                iconColor:"text-violet-600 dark:text-violet-400",
                numColor: "text-violet-400/40 dark:text-violet-500/30",
              },
              {
                step: "03",
                Icon: BarChart3,
                title: "Deliver insights",
                body: "We build the reporting layer on top — dashboards, KPI views, alerts, and management packs — all connected to your live data and always current.",
                tags: ["Live dashboards", "Automated reports", "KPI tracking"],
                color:    "border-emerald-200 bg-white dark:border-emerald-500/25 dark:bg-emerald-500/[0.05]",
                iconBg:   "bg-emerald-100 dark:bg-emerald-500/15",
                iconColor:"text-emerald-600 dark:text-emerald-400",
                numColor: "text-emerald-400/40 dark:text-emerald-500/30",
              },
            ].map(({ step, Icon, title, body, tags, color, iconBg, iconColor, numColor }) => (
              <div key={step} className={`p-7 rounded-2xl border ${color} flex flex-col shadow-sm dark:shadow-none`}>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-5xl font-bold leading-none ${numColor} select-none`}>
                    {step}
                  </span>
                  <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                    <Icon size={19} className={iconColor} />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-white/45 leading-relaxed mb-6 flex-1">{body}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[11px] text-slate-500 dark:text-white/35 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Engagement process */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-300 dark:text-white/20 mb-4 text-center">
              Our engagement process
            </p>
            <div className="grid sm:grid-cols-4 gap-3">
              {[
                { step: "1", title: "Discovery call",     body: "Free 30-minute call to understand your setup and what good looks like." },
                { step: "2", title: "Scoped proposal",    body: "Clear deliverables, timeline, and fixed fee. No surprises." },
                { step: "3", title: "Build and deliver",  body: "We do the technical work. You stay involved at key points." },
                { step: "4", title: "Handover & support", body: "Full documentation. Optional ongoing support available." },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.025] shadow-sm dark:shadow-none">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                      {item.step}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT / WHY QUANTYX
      ══════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 border-t border-slate-100 dark:border-white/[0.05] bg-white dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-5">
                About us
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-900 dark:text-white">
                A small specialist team.<br />
                Serious about<br />
                <span className="gradient-text">your data.</span>
              </h2>
              <p className="text-slate-600 dark:text-white/45 leading-relaxed mb-5 text-base">
                Quantyx Advisory is a specialist data consultancy working with
                growing businesses — typically founder-led SMEs and lean finance
                teams — who need better reporting and data infrastructure but
                don't want to hire a full internal data team.
              </p>
              <p className="text-slate-500 dark:text-white/35 leading-relaxed text-sm">
                We have backgrounds in accountancy, audit, and data analytics.
                That combination matters: we understand how businesses work,
                what finance teams actually need, and how to build the technical
                infrastructure to deliver it.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: "📊",
                  title: "Accounting background",
                  body: "We understand P&Ls, management accounts, and what a finance team actually needs — not just how to build dashboards.",
                  color: "border-indigo-200 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/[0.04]",
                  label: "text-indigo-700 dark:text-indigo-400",
                },
                {
                  icon: "🔍",
                  title: "Ex-audit & data analytics",
                  body: "We've worked in audit and data roles — we know how to interrogate data and spot where things don't add up before they become problems.",
                  color: "border-violet-200 bg-violet-50 dark:border-violet-500/20 dark:bg-violet-500/[0.04]",
                  label: "text-violet-700 dark:text-violet-400",
                },
                {
                  icon: "🏗",
                  title: "We build, not just advise",
                  body: "We don't produce slide decks and strategy documents. We build the actual pipelines, databases, and dashboards — and hand them over working.",
                  color: "border-sky-200 bg-sky-50 dark:border-sky-500/20 dark:bg-sky-500/[0.04]",
                  label: "text-sky-700 dark:text-sky-400",
                },
                {
                  icon: "🤝",
                  title: "SME-focused",
                  body: "We work with businesses that don't have a data team. Our engagements are scoped, priced, and communicated in plain English — no enterprise overhead.",
                  color: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/[0.04]",
                  label: "text-emerald-700 dark:text-emerald-400",
                },
              ].map((card) => (
                <div key={card.title} className={`p-6 rounded-2xl border ${card.color}`}>
                  <span className="text-2xl mb-4 block">{card.icon}</span>
                  <p className={`text-sm font-bold mb-2 ${card.label}`}>{card.title}</p>
                  <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{card.body}</p>
                </div>
              ))}

              {/* What we're not */}
              <div className="sm:col-span-2 p-5 rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
                <p className="text-xs font-semibold text-slate-400 dark:text-white/30 uppercase tracking-widest mb-3">
                  What we're not
                </p>
                <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-500 dark:text-white/40">
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 shrink-0 mt-0.5">✗</span>
                    A large agency with account managers and project overhead
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 shrink-0 mt-0.5">✗</span>
                    A SaaS product trying to fit your data into our template
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 shrink-0 mt-0.5">✗</span>
                    Consultants who produce recommendations and then leave
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CASE STUDIES
      ══════════════════════════════════════ */}
      <section id="case-studies" className="py-24 px-6 bg-slate-50 dark:bg-transparent border-t border-slate-100 dark:border-white/[0.04]">
        <div className="max-w-6xl mx-auto">

          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
              Case studies
            </p>
            <div className="grid md:grid-cols-[1fr_auto] items-end gap-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                The systems we build
              </h2>
              <p className="text-slate-400 dark:text-white/40 text-sm">
                Illustrative examples based on real engagement types.
              </p>
            </div>
          </div>

          {/* Featured: InventoryCo */}
          <div className="mb-5 relative overflow-hidden rounded-2xl border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/[0.04] p-8 md:p-10 shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 dark:bg-indigo-500/[0.07] rounded-full blur-3xl pointer-events-none" />
            <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-10 items-start">

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 px-3 py-1 rounded-full">
                    Case Study
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-white/30 border border-slate-200 dark:border-white/[0.08] px-3 py-1 rounded-full bg-white dark:bg-transparent">
                    Commercial Electrical
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-white/30 border border-slate-200 dark:border-white/[0.08] px-3 py-1 rounded-full bg-white dark:bg-transparent">
                    Data &amp; Operational Layer
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug tracking-tight text-slate-900 dark:text-white">
                  Financial, stock, and operations —<br className="hidden md:block" /> unified into one layer
                </h3>
                <p className="text-slate-600 dark:text-white/50 text-sm leading-relaxed mb-3 max-w-lg">
                  A commercial electrical contractor running invoicing in Xero, stock in
                  Cin7, and all job, crew, and material tracking manually in Excel —
                  with no central view of job profitability, crew load, or delivery risk.
                </p>
                <p className="text-slate-600 dark:text-white/50 text-sm leading-relaxed mb-4 max-w-lg">
                  We centralised all three into a Postgres data model and built two layers
                  on top: a commercial reporting layer and a live operational layer
                  covering jobs, labour, crews, and material cost exposure.
                </p>
                <p className="text-xs text-slate-400 dark:text-white/30 mb-7 max-w-lg">
                  Built using real-world system architecture — Xero API, Cin7 API, Postgres (Supabase), structured SQL views.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/case-studies/inventoryco"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
                  >
                    Read full case study <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-white/45 dark:hover:text-white/70 px-6 py-3 rounded-xl border border-slate-200 dark:border-white/[0.09] hover:border-slate-300 dark:hover:border-white/[0.18] bg-white dark:bg-transparent transition-colors"
                  >
                    View demo dashboard <ExternalLink size={14} />
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-4">
                  Key results
                </p>
                {[
                  { stat: "< 30 min", label: "Weekly reporting time",        was: "Was ~5 hours manual"         },
                  { stat: "100%",     label: "Job margin visibility",         was: "Previously unavailable"      },
                  { stat: "Live",     label: "Crew & labour tracking",        was: "Was weekly manual timesheet" },
                  { stat: "1",        label: "Source of truth",               was: "Was 3+ disconnected systems" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-4 p-4 rounded-xl border border-indigo-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.04]">
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-300 shrink-0 w-16">{r.stat}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white/80">{r.label}</p>
                      <p className="text-xs text-slate-400 dark:text-white/30">{r.was}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Featured: Lex & Co */}
          <div className="mb-5 relative overflow-hidden rounded-2xl border border-indigo-200 dark:border-indigo-500/20 bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-500/[0.04] dark:to-transparent p-8 md:p-10 shadow-sm dark:shadow-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-violet-100 dark:bg-violet-500/[0.06] rounded-full blur-3xl pointer-events-none" />
            <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-10 items-start">

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 px-3 py-1 rounded-full">
                    Case Study
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-white/30 border border-slate-200 dark:border-white/[0.08] px-3 py-1 rounded-full bg-white dark:bg-transparent">
                    Legal Services
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-white/30 border border-slate-200 dark:border-white/[0.08] px-3 py-1 rounded-full bg-white dark:bg-transparent">
                    WIP &amp; Financial Layer
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug tracking-tight text-slate-900 dark:text-white">
                  WIP, billing, and matter profitability —<br className="hidden md:block" /> unified into one partner view
                </h3>
                <p className="text-slate-600 dark:text-white/50 text-sm leading-relaxed mb-3 max-w-lg">
                  A mid-sized UK law firm running matters in Clio, invoicing in Xero, and WIP
                  reconciliation manually in Excel — with no view of matter margin, billing
                  delays, or write-off risk.
                </p>
                <p className="text-slate-600 dark:text-white/50 text-sm leading-relaxed mb-4 max-w-lg">
                  We centralised all three into a Postgres data model and built a partner-facing
                  insight layer covering WIP, realisation rates, timekeeper utilisation, and
                  billing performance.
                </p>
                <p className="text-xs text-slate-400 dark:text-white/30 mb-7 max-w-lg">
                  Built using real-world system architecture — Clio API, Xero API, Postgres (Supabase), structured SQL views.
                </p>

                <Link
                  href="/case-studies/lexco"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
                >
                  Read full case study <ArrowRight size={14} />
                </Link>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-4">
                  Key results
                </p>
                {[
                  { stat: "< 30 min", label: "Weekly reporting time",      was: "Was ~4 hours manual"           },
                  { stat: "100%",     label: "Matter margin visibility",    was: "Previously unavailable"        },
                  { stat: "Live",     label: "WIP & billing tracking",      was: "Was weekly manual reconcile"   },
                  { stat: "1",        label: "Source of truth",             was: "Was 3+ disconnected systems"   },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center gap-4 p-4 rounded-xl border border-indigo-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.04]"
                  >
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-300 shrink-0 w-16">
                      {r.stat}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-white/80">
                        {r.label}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-white/30">{r.was}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Secondary case studies */}
          <div className="grid lg:grid-cols-3 gap-5">
            {secondaryCaseStudies.map((cs) => (
              <div
                key={cs.client}
                className="p-7 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] flex flex-col shadow-sm dark:shadow-none"
              >
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-white">{cs.client}</p>
                    <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">{cs.industry}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${cs.tagColor}`}>
                    {cs.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-3 leading-snug text-slate-900 dark:text-white">{cs.headline}</h3>
                <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed mb-5 flex-1">{cs.description}</p>
                <ul className="space-y-2">
                  {cs.results.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-xs text-slate-600 dark:text-white/60">
                      <CheckCircle size={12} className="text-indigo-500 dark:text-indigo-400 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200 transition-colors"
            >
              Facing a similar problem? Let's talk <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CUSTOM BUILDS
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden bg-white dark:bg-transparent border-t border-slate-100 dark:border-indigo-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(99,102,241,0.06),transparent_65%)] dark:bg-[radial-gradient(ellipse_at_50%_50%,rgba(99,102,241,0.12),transparent_65%)]" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">

            <div>
              <div className="inline-flex items-center gap-2 border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-7 uppercase tracking-widest">
                Custom builds
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.07] tracking-tight mb-6 text-slate-900 dark:text-white">
                Need more than<br />
                off-the-shelf?<br />
                <span className="gradient-text">We build it from scratch.</span>
              </h2>
              <p className="text-slate-600 dark:text-white/50 text-lg leading-relaxed mb-6 max-w-xl">
                Off-the-shelf tools have limits. When your business hits those limits —
                we step in and build exactly what you need from scratch.
              </p>
              <p className="text-slate-500 dark:text-white/40 text-base leading-relaxed mb-8 max-w-xl">
                That might be a custom reporting dashboard, an automated data pipeline,
                or an internal operating layer that gives your team visibility over jobs,
                costs, crews, or margins that no SaaS product covers by default.
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  "Custom dashboards",
                  "Internal operating tools",
                  "Job & project tracking",
                  "Labour & cost visibility",
                  "Data pipelines",
                  "API integrations",
                  "Bespoke automations",
                  "White-label portals",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] text-slate-600 dark:text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors text-sm shadow-sm"
              >
                Tell us what you need <ArrowRight size={15} />
              </a>
            </div>

            <div className="hidden lg:flex flex-col gap-4">
              {[
                {
                  icon: "⚡",
                  title: "Gap in your current tools",
                  body: "Job costs, crew visibility, margin by project — most businesses track these in spreadsheets because no SaaS product covers their exact workflow.",
                  color: "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/[0.06]",
                  label: "The problem",
                  labelColor: "text-rose-600 border-rose-200 bg-rose-100 dark:text-rose-400 dark:border-rose-500/25 dark:bg-rose-500/10",
                },
                {
                  icon: "→",
                  title: "Bespoke operating layer",
                  body: "We build the exact reporting and operational layer your business needs — wired to your systems, built to your logic.",
                  color: "border-indigo-200 bg-indigo-50 dark:border-indigo-500/25 dark:bg-indigo-500/[0.07]",
                  label: "Our answer",
                  labelColor: "text-indigo-700 border-indigo-200 bg-indigo-100 dark:text-indigo-300 dark:border-indigo-500/25 dark:bg-indigo-500/10",
                },
                {
                  icon: "✓",
                  title: "You own it, forever",
                  body: "No vendor lock-in. Full handover, full documentation, yours to keep and build on.",
                  color: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/[0.06]",
                  label: "The outcome",
                  labelColor: "text-emerald-700 border-emerald-200 bg-emerald-100 dark:text-emerald-400 dark:border-emerald-500/25 dark:bg-emerald-500/10",
                },
              ].map((card) => (
                <div key={card.title} className={`p-5 rounded-2xl border ${card.color} flex items-start gap-4`}>
                  <span className="text-2xl leading-none mt-0.5">{card.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{card.title}</p>
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${card.labelColor}`}>
                        {card.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTACT
      ══════════════════════════════════════ */}
      <section id="contact" className="py-24 px-6 border-t border-slate-100 dark:border-white/[0.05] bg-slate-50 dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-5">
                Get in touch
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-slate-900 dark:text-white">
                Let's talk about<br />your reporting.
              </h2>
              <p className="text-slate-600 dark:text-white/45 text-base leading-relaxed mb-8">
                Book a free 30-minute call. We'll ask about your current
                setup, understand what's not working, and tell you honestly
                whether we can help — and how.
              </p>
              <div className="space-y-3">
                {[
                  "No commitment required",
                  "Plain-English conversation — no jargon",
                  "Clear proposal within 3 working days",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-white/50">
                    <CheckCircle size={14} className="text-indigo-500 dark:text-indigo-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <ContactForm />

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 border-t border-slate-100 dark:border-white/[0.05] bg-white dark:bg-transparent">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold gradient-text">Quantyx Advisory</span>
          <p className="text-slate-400 dark:text-white/25 text-xs">© 2026 Quantyx Advisory. All rights reserved. · UK</p>
          <div className="flex gap-6 text-xs text-slate-400 dark:text-white/25">
            <a href="#" className="hover:text-slate-700 dark:hover:text-white/50 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-700 dark:hover:text-white/50 transition-colors">Terms</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
