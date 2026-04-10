import Link from "next/link";
import {
  BarChart3,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────── */

const services = [
  {
    icon: BarChart3,
    number: "01",
    title: "Dashboards & Management Reporting",
    outcome: "Your key numbers in one clear view — updated automatically.",
    description:
      "We design and build reporting that gives you and your finance team instant visibility into what's happening across the business. No more pulling data from different places to build a slide deck.",
    deliverables: [
      "Finance and P&L dashboards",
      "KPI and operational reporting",
      "Management information packs",
      "Board-ready reporting",
    ],
    accent: "border-indigo-500/30 bg-indigo-500/[0.05]",
    iconBg: "bg-indigo-500/15",
    iconColor: "text-indigo-400",
    numColor: "text-indigo-500/40",
  },
  {
    icon: Zap,
    number: "02",
    title: "Reporting & Process Automation",
    outcome: "Replace hours of manual work with reliable, automated processes.",
    description:
      "We find where your team is losing time to repetitive finance and admin tasks — then build automations that run without anyone needing to trigger them. Reports that used to take hours generate themselves.",
    deliverables: [
      "Automated report generation",
      "Reconciliation workflows",
      "Scheduled exports and imports",
      "Finance process improvements",
    ],
    accent: "border-violet-500/30 bg-violet-500/[0.05]",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    numColor: "text-violet-500/40",
  },
  {
    icon: Layers,
    number: "03",
    title: "Data Centralisation & Insight",
    outcome: "One place for all your data — consistent, reliable, and current.",
    description:
      "If your reporting relies on exporting from one system, pasting into another, and hoping it matches — we fix that. We connect your platforms into a single data layer so reporting is always accurate and always available.",
    deliverables: [
      "System and API integrations",
      "Centralised reporting database",
      "Single source of truth",
      "Cross-system reporting and insight",
    ],
    accent: "border-emerald-500/30 bg-emerald-500/[0.05]",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    numColor: "text-emerald-500/40",
  },
];

/* ─────────────────────────────────────────────
   CASE STUDIES
───────────────────────────────────────────── */

const caseStudies = [
  {
    client: "InventoryCo Ltd",
    industry: "Wholesale Distribution",
    tag: "Data Centralisation",
    tagColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
    headline: "From disconnected systems to real-time insight",
    description:
      "Unified Xero, Cin7, and Excel into a single centralised data model with automated pipelines — eliminating 6 hours of weekly manual reporting and giving leadership live visibility.",
    results: [
      "Reporting fully automated",
      "3 systems unified in one model",
      "Live inventory alerts deployed",
    ],
    href: "/case-studies/inventoryco",
  },
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
    href: null,
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
    href: null,
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
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(99,102,241,0.2),transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-4 py-1.5 text-sm text-white/50 mb-8">
            Specialist data consultancy · UK
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-[4.25rem] font-bold leading-[1.08] tracking-tight mb-7">
            Clearer reporting.<br />
            Less manual work.<br />
            <span className="gradient-text">Better decisions.</span>
          </h1>

          {/* Who we help */}
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-4 leading-relaxed">
            We help founder-led businesses and lean finance teams centralise data,
            automate reporting, and build dashboards that give you real visibility
            into your business.
          </p>
          <p className="text-sm text-white/30 mb-10">
            Typically working with UK businesses between £1m–£20m revenue.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#services"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-xl font-medium transition-colors text-sm"
            >
              See what we do <ArrowRight size={15} />
            </a>
            <a
              href="#contact"
              className="text-white/55 hover:text-white px-7 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-colors font-medium text-sm"
            >
              Book a free call
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHO WE ARE — credentials strip
      ══════════════════════════════════════ */}
      <div className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 shrink-0">
            Our background
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Qualified Accountants", sub: "ACA / ACCA trained" },
              { label: "Ex-Audit",              sub: "Big Four & mid-tier experience" },
              { label: "Software Developers",   sub: "Full-stack & data engineering" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white/80 leading-none">{item.label}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 sm:ml-auto sm:text-right max-w-xs leading-relaxed hidden lg:block">
            We understand the numbers <em>and</em> we build the systems.<br />
            Most firms offer one or the other.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
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

          {/* Service cards */}
          <div className="grid lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className={`relative p-7 rounded-2xl border ${s.accent} flex flex-col`}
              >
                {/* Number */}
                <span className={`text-6xl font-bold leading-none mb-6 ${s.numColor} select-none`}>
                  {s.number}
                </span>

                {/* Icon + title */}
                <div className={`w-10 h-10 rounded-xl ${s.iconBg} flex items-center justify-center mb-4`}>
                  <s.icon size={19} className={s.iconColor} />
                </div>
                <h3 className="text-lg font-bold mb-2 leading-snug">{s.title}</h3>

                {/* Outcome line */}
                <p className="text-sm font-medium text-white/70 mb-4 leading-snug">
                  {s.outcome}
                </p>

                {/* Description */}
                <p className="text-sm text-white/40 leading-relaxed mb-6 flex-1">
                  {s.description}
                </p>

                {/* Deliverables */}
                <div className="border-t border-white/[0.07] pt-5 space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-3">
                    What this includes
                  </p>
                  {s.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-xs text-white/50">
                      <div className="w-1 h-1 rounded-full bg-white/25 shrink-0" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom prompt */}
          <div className="mt-10 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
          HOW WE WORK
      ══════════════════════════════════════ */}
      <section className="py-20 px-6 border-y border-white/[0.05] bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mb-4">
                How we work
              </p>
              <h2 className="text-3xl font-bold tracking-tight leading-tight">
                Scoped projects.<br />Clear deliverables.<br />No surprises.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  step: "1",
                  title: "Discovery call",
                  body: "Free 30-minute call to understand your current setup, what's not working, and what good looks like for you.",
                },
                {
                  step: "2",
                  title: "Scoped proposal",
                  body: "We send a clear proposal — what we'll build, how long it will take, and what it will cost. Fixed-fee where possible.",
                },
                {
                  step: "3",
                  title: "Build and deliver",
                  body: "We do the work. You stay involved at key points without needing to manage the technical details.",
                },
                {
                  step: "4",
                  title: "Handover and support",
                  body: "Full documentation and handover. Optional ongoing support available for maintenance and improvements.",
                },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-xl border border-white/[0.07] bg-white/[0.025]">
                  <div className="flex items-center gap-2.5 mb-3">
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

          <div className="grid lg:grid-cols-3 gap-5">
            {caseStudies.map((cs) => (
              <div
                key={cs.client}
                className="p-7 rounded-2xl border border-white/[0.08] bg-white/[0.025] hover:border-indigo-500/25 transition-all flex flex-col"
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
                <ul className="space-y-2 mb-5">
                  {cs.results.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-xs text-white/60">
                      <CheckCircle size={12} className="text-indigo-400 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                {cs.href ? (
                  <Link
                    href={cs.href}
                    className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-semibold mt-auto"
                  >
                    Read full case study <ArrowRight size={13} />
                  </Link>
                ) : (
                  <p className="text-xs text-white/20 mt-auto">Full write-up coming soon</p>
                )}
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
