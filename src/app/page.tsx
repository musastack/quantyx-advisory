import Link from "next/link";
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

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */

const services = [
  {
    icon: BarChart3,
    number: "01",
    title: "Dashboard & Reporting Builds",
    outcome: "Clear visibility on performance and faster decision-making.",
    description:
      "We turn raw business data into clear dashboards and management reporting — so you and your team always know what's happening across the business.",
    deliverables: [
      "Finance dashboards",
      "KPI tracking",
      "Management reporting packs",
      "Board-ready reporting",
    ],
    accent: "border-indigo-500/30 bg-indigo-500/[0.05]",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
    numColor: "text-indigo-500/40",
    outcomeBg: "border-indigo-500/25 bg-indigo-500/[0.08] text-indigo-300",
  },
  {
    icon: Zap,
    number: "02",
    title: "Process Automation",
    outcome: "Less manual work, fewer errors, faster reporting.",
    description:
      "We remove manual reporting and repetitive workflows — replacing hours of data wrangling with reliable, automated processes that run without anyone needing to trigger them.",
    deliverables: [
      "Automated reporting",
      "Reconciliations",
      "Recurring data workflows",
      "Scheduled exports and imports",
    ],
    accent: "border-violet-500/30 bg-violet-500/[0.05]",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    numColor: "text-violet-500/40",
    outcomeBg: "border-violet-500/25 bg-violet-500/[0.08] text-violet-300",
  },
  {
    icon: Layers,
    number: "03",
    title: "Data Centralisation & Insight",
    outcome: "Consistent data, better insights, improved decisions.",
    description:
      "We bring together data from multiple systems into one reporting layer — so every report draws from the same source and is always accurate and always available.",
    deliverables: [
      "Accounting + inventory + spreadsheets",
      "Central reporting database",
      "Single source of truth",
      "Cross-system reporting and insight",
    ],
    accent: "border-emerald-500/30 bg-emerald-500/[0.05]",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    numColor: "text-emerald-500/40",
    outcomeBg: "border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-300",
  },
];

/* ─────────────────────────────────────────────
   SECONDARY CASE STUDIES
───────────────────────────────────────────── */

const secondaryCaseStudies = [
  {
    client: "Logistics SME",
    industry: "Logistics",
    tag: "Process Automation",
    tagColor: "text-violet-300 bg-violet-500/10 border-violet-500/20",
    headline: "Automated invoice & delivery tracking",
    description:
      "Designed an end-to-end automation that matched purchase orders, invoices, and delivery confirmations — eliminating manual data entry and catching errors before they reached clients.",
    results: [
      "Zero manual invoice matching",
      "Error rate dropped from 6% to 0.3%",
      "3 staff hours saved per day",
    ],
  },
  {
    client: "Digital Marketing Agency",
    industry: "Marketing",
    tag: "Reporting Builds",
    tagColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    headline: "White-label client dashboards",
    description:
      "Created branded, auto-updating dashboards for 20+ agency clients pulling from Google Ads, Meta, and GA4 — replacing PDF reports with live portals each client could access anytime.",
    results: [
      "20+ client portals deployed",
      "Reports go live in <2 hrs",
      "Client retention up 25%",
    ],
  },
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05050f]">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#05050f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">Quantyx Advisory</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#services"     className="hover:text-white transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a>
            <a href="#contact"      className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden sm:block text-sm text-white/60 hover:text-white transition-colors"
            >
              View Demo
            </Link>
            <a
              href="#contact"
              className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(99,102,241,0.2),transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 text-sm text-white/50 mb-8">
            Specialist data consultancy · UK
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-[4.25rem] font-bold leading-[1.08] tracking-tight mb-7">
            We turn messy business data<br className="hidden sm:block" /> into{" "}
            <span className="gradient-text">clear reporting and insight.</span>
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-white/55 max-w-2xl mx-auto mb-4 leading-relaxed">
            Helping growing businesses centralise data, automate reporting, and
            build dashboards that support better decisions.
          </p>

          {/* Who it's for */}
          <p className="text-sm text-white/30 mb-10 max-w-xl mx-auto">
            For founder-led businesses, SMEs, and lean finance teams —
            with too many systems and not enough visibility.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <Link
              href="/case-studies/inventoryco"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-xl font-medium transition-colors text-sm"
            >
              View Case Study <ArrowRight size={15} />
            </Link>
            <a
              href="#services"
              className="text-white/55 hover:text-white px-7 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-colors font-medium text-sm"
            >
              See what we do
            </a>
          </div>

          {/* Credentials */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/20">
              Our background
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "Accountants",               color: "border-indigo-500/25 bg-indigo-500/8  text-indigo-300"  },
                { label: "SME Specialists",            color: "border-violet-500/25 bg-violet-500/8  text-violet-300"  },
                { label: "Ex-Audit",                  color: "border-sky-500/25    bg-sky-500/8     text-sky-300"     },
                { label: "Data Analytics Specialists", color: "border-emerald-500/25 bg-emerald-500/8 text-emerald-300" },
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
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">
              What we do
            </p>
            <div className="grid md:grid-cols-[1fr_auto] items-end gap-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight max-w-xl">
                Three services.<br />All focused on one outcome.
              </h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
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
                <h3 className="text-lg font-bold mb-3 leading-snug">{s.title}</h3>

                <p className="text-sm text-white/45 leading-relaxed mb-6 flex-1">
                  {s.description}
                </p>

                <div className="border-t border-white/[0.07] pt-5 space-y-2 mb-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-3">
                    Examples
                  </p>
                  {s.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-xs text-white/50">
                      <div className="w-1 h-1 rounded-full bg-white/25 shrink-0" />
                      {d}
                    </div>
                  ))}
                </div>

                {/* Outcome callout */}
                <div className={`rounded-xl border px-4 py-3 ${s.outcomeBg}`}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest opacity-50 mb-1">Outcome</p>
                  <p className="text-xs font-semibold leading-snug">{s.outcome}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-white/50 max-w-lg leading-relaxed">
              Most projects combine elements of two or three of these. We scope
              every engagement individually — no fixed packages, no off-the-shelf solutions.
            </p>
            <a
              href="#contact"
              className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors whitespace-nowrap"
            >
              Discuss your project <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 px-6 border-y border-white/[0.05] bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Three steps. Minimal effort from your team.
            </h2>
            <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed">
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
                color: "border-sky-500/25 bg-sky-500/[0.05]",
                iconBg: "bg-sky-500/15",
                iconColor: "text-sky-400",
                numColor: "text-sky-500/30",
              },
              {
                step: "02",
                Icon: GitMerge,
                title: "Centralise and structure",
                body: "All source data lands in a central database — cleaned, deduplicated, and modelled so every report and dashboard draws from the same consistent source.",
                tags: ["Central database", "Data modelling", "Transformation layer"],
                color: "border-violet-500/25 bg-violet-500/[0.05]",
                iconBg: "bg-violet-500/15",
                iconColor: "text-violet-400",
                numColor: "text-violet-500/30",
              },
              {
                step: "03",
                Icon: BarChart3,
                title: "Deliver insights",
                body: "We build the reporting layer on top — dashboards, KPI views, alerts, and management packs — all connected to your live data and always current.",
                tags: ["Live dashboards", "Automated reports", "KPI tracking"],
                color: "border-emerald-500/25 bg-emerald-500/[0.05]",
                iconBg: "bg-emerald-500/15",
                iconColor: "text-emerald-400",
                numColor: "text-emerald-500/30",
              },
            ].map(({ step, Icon, title, body, tags, color, iconBg, iconColor, numColor }) => (
              <div key={step} className={`p-7 rounded-2xl border ${color} flex flex-col`}>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-5xl font-bold leading-none ${numColor} select-none`}>
                    {step}
                  </span>
                  <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                    <Icon size={19} className={iconColor} />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3">{title}</h3>
                <p className="text-sm text-white/45 leading-relaxed mb-6 flex-1">{body}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[11px] text-white/35 bg-white/[0.04] border border-white/[0.07] px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Engagement process */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/20 mb-4 text-center">
              Our engagement process
            </p>
            <div className="grid sm:grid-cols-4 gap-3">
              {[
                { step: "1", title: "Discovery call",    body: "Free 30-minute call to understand your setup and what good looks like." },
                { step: "2", title: "Scoped proposal",   body: "Clear deliverables, timeline, and fixed fee. No surprises." },
                { step: "3", title: "Build and deliver", body: "We do the technical work. You stay involved at key points." },
                { step: "4", title: "Handover & support", body: "Full documentation. Optional ongoing support available." },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.025]">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                      {item.step}
                    </span>
                    <p className="text-sm font-semibold">{item.title}</p>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          CASE STUDIES
      ══════════════════════════════════════ */}
      <section id="case-studies" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">
              Case studies
            </p>
            <div className="grid md:grid-cols-[1fr_auto] items-end gap-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Work we&apos;ve done
              </h2>
              <p className="text-white/40 text-sm">
                Illustrative examples of real engagement types.
              </p>
            </div>
          </div>

          {/* Featured: InventoryCo */}
          <div className="mb-5 relative overflow-hidden rounded-2xl border border-indigo-500/25 bg-indigo-500/[0.04] p-8 md:p-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/[0.07] rounded-full blur-3xl pointer-events-none" />
            <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-10 items-start">

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 rounded-full">
                    Case Study
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/30 border border-white/[0.08] px-3 py-1 rounded-full">
                    Wholesale Distribution
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-white/30 border border-white/[0.08] px-3 py-1 rounded-full">
                    Data Centralisation
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug tracking-tight">
                  From disconnected systems<br className="hidden md:block" /> to real-time insight
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-3 max-w-lg">
                  A wholesale distributor running sales in Xero, inventory in Cin7, and
                  reporting in Excel — three disconnected systems with no central view.
                </p>
                <p className="text-white/50 text-sm leading-relaxed mb-7 max-w-lg">
                  We unified all three into a single Postgres database with automated
                  pipelines and a live reporting layer — eliminating 6 hours of weekly
                  manual reporting.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/case-studies/inventoryco"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors"
                  >
                    Read full case study <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white/70 px-6 py-3 rounded-xl border border-white/[0.09] hover:border-white/[0.18] transition-colors"
                  >
                    View demo dashboard <ExternalLink size={14} />
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-4">
                  Key results
                </p>
                {[
                  { stat: "< 30 min", label: "Weekly reporting time",       was: "Was ~5 hours manual"       },
                  { stat: "3",        label: "Systems unified in one model", was: "Previously disconnected"   },
                  { stat: "100%",     label: "Product margin visibility",    was: "Previously unavailable"    },
                  { stat: "Live",     label: "Inventory alerts deployed",    was: "Was end-of-week manual"    },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] bg-white/[0.04]">
                    <span className="text-lg font-bold text-indigo-300 shrink-0 w-16">{r.stat}</span>
                    <div>
                      <p className="text-sm font-medium text-white/80">{r.label}</p>
                      <p className="text-xs text-white/30">{r.was}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Secondary case studies */}
          <div className="grid lg:grid-cols-2 gap-5">
            {secondaryCaseStudies.map((cs) => (
              <div
                key={cs.client}
                className="p-7 rounded-2xl border border-white/[0.08] bg-white/[0.025] flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="font-semibold text-sm">{cs.client}</p>
                    <p className="text-xs text-white/35 mt-0.5">{cs.industry}</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${cs.tagColor}`}>
                    {cs.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold mb-3 leading-snug">{cs.headline}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5 flex-1">{cs.description}</p>
                <ul className="space-y-2 mb-4">
                  {cs.results.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-xs text-white/60">
                      <CheckCircle size={12} className="text-indigo-400 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-white/20 mt-auto">Full write-up coming soon</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Facing a similar problem? Let&apos;s talk <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CUSTOM BUILDS
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(99,102,241,0.12),transparent_65%)]" />
        <div className="absolute inset-0 border-y border-indigo-500/10" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">

            <div>
              <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-300 mb-7 uppercase tracking-widest">
                Custom builds
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.07] tracking-tight mb-6">
                Need more than<br />
                off-the-shelf?<br />
                <span className="gradient-text">We build it from scratch.</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-6 max-w-xl">
                Off-the-shelf tools have limits. When your business hits those limits —
                we step in and build exactly what you need from scratch.
              </p>
              <p className="text-white/40 text-base leading-relaxed mb-8 max-w-xl">
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
                    className="text-xs font-medium px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors text-sm"
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
                  color: "border-rose-500/20 bg-rose-500/[0.06]",
                  label: "The problem",
                  labelColor: "text-rose-400 border-rose-500/25 bg-rose-500/10",
                },
                {
                  icon: "→",
                  title: "Bespoke operating layer",
                  body: "We build the exact reporting and operational layer your business needs — wired to your systems, built to your logic.",
                  color: "border-indigo-500/25 bg-indigo-500/[0.07]",
                  label: "Our answer",
                  labelColor: "text-indigo-300 border-indigo-500/25 bg-indigo-500/10",
                },
                {
                  icon: "✓",
                  title: "You own it, forever",
                  body: "No vendor lock-in. Full handover, full documentation, yours to keep and build on.",
                  color: "border-emerald-500/20 bg-emerald-500/[0.06]",
                  label: "The outcome",
                  labelColor: "text-emerald-400 border-emerald-500/25 bg-emerald-500/10",
                },
              ].map((card) => (
                <div key={card.title} className={`p-5 rounded-2xl border ${card.color} flex items-start gap-4`}>
                  <span className="text-2xl leading-none mt-0.5">{card.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <p className="text-sm font-semibold">{card.title}</p>
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${card.labelColor}`}>
                        {card.label}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">{card.body}</p>
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
      <section id="contact" className="py-24 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-5">
                Get in touch
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                Let&apos;s talk about<br />your reporting.
              </h2>
              <p className="text-white/45 text-base leading-relaxed mb-8">
                Book a free 30-minute call. We&apos;ll ask about your current
                setup, understand what&apos;s not working, and tell you honestly
                whether we can help — and how.
              </p>
              <div className="space-y-3">
                {[
                  "No commitment required",
                  "Plain-English conversation — no jargon",
                  "Clear proposal within 3 working days",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-white/50">
                    <CheckCircle size={14} className="text-indigo-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
              <p className="text-sm font-semibold mb-6">Book a free discovery call</p>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/35 block mb-1.5">Your name</label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-white/35 block mb-1.5">Business email</label>
                    <input
                      type="email"
                      placeholder="jane@company.co.uk"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 text-sm transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/35 block mb-1.5">What are you trying to solve?</label>
                  <textarea
                    rows={4}
                    placeholder="e.g. We spend 4 hours every week pulling our management report together manually..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-indigo-500/60 text-sm transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3.5 rounded-xl font-semibold transition-colors text-sm"
                >
                  Book a free call
                </button>
                <p className="text-xs text-white/25 text-center">
                  We respond within 1 business day.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold gradient-text">Quantyx Advisory</span>
          <p className="text-white/25 text-xs">© 2026 Quantyx Advisory. All rights reserved. · UK</p>
          <div className="flex gap-6 text-xs text-white/25">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
