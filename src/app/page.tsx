"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Database,
  GitMerge,
  XCircle,
} from "lucide-react";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import ContactForm from "./ContactForm";
import { FloatingDashboard } from "./components/FloatingDashboard";
import { ScrollReveal } from "./components/ScrollReveal";
import { StatTicker } from "./components/StatTicker";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const secondaryCaseStudies = [
  {
    client: "Logistics SME",
    industry: "Road Freight · 45 staff",
    tag: "Process Automation",
    tagColor: "text-violet-700 bg-violet-100 border-violet-200 dark:text-violet-300 dark:bg-violet-500/10 dark:border-violet-500/20",
    headline: "Automated invoice & delivery reconciliation",
    description:
      "The finance team spent 3 hours daily matching purchase orders, delivery notes, and supplier invoices across three systems. We built an automated reconciliation pipeline that did it in seconds.",
    results: [
      "3 hrs/day manual matching eliminated",
      "Error rate: 6% → 0.3%",
      "Supplier disputes resolved 4× faster",
    ],
  },
  {
    client: "Digital Marketing Agency",
    industry: "Marketing · 12 staff",
    tag: "Reporting Builds",
    tagColor: "text-emerald-700 bg-emerald-100 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-500/10 dark:border-emerald-500/20",
    headline: "White-label client reporting portals",
    description:
      "The agency was manually pulling from Google Ads, Meta, and GA4 then formatting in slides for 20+ clients. We replaced the whole process with branded live dashboards each client could access anytime.",
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
      "Billable hours, project costs, and client revenues lived in three different systems with no joined view. Management couldn't see project margin or utilisation without a manual weekly pull.",
    results: [
      "Project margin visible in real time",
      "Utilisation tracked automatically",
      "Weekly management pack: 4 hrs → 20 min",
    ],
  },
];

const INTEGRATIONS = [
  { name: "Xero",              icon: "💚", color: "border-emerald-200 dark:border-emerald-500/25 hover:border-emerald-400 dark:hover:border-emerald-400/50" },
  { name: "QuickBooks",        icon: "🟦", color: "border-blue-200 dark:border-blue-500/25 hover:border-blue-400 dark:hover:border-blue-400/50" },
  { name: "Cin7",              icon: "📦", color: "border-indigo-200 dark:border-indigo-500/25 hover:border-indigo-400 dark:hover:border-indigo-400/50" },
  { name: "Shopify",           icon: "🛍️", color: "border-green-200 dark:border-green-500/25 hover:border-green-400 dark:hover:border-green-400/50" },
  { name: "Google Analytics",  icon: "📊", color: "border-amber-200 dark:border-amber-500/25 hover:border-amber-400 dark:hover:border-amber-400/50" },
  { name: "Google Ads",        icon: "🎯", color: "border-yellow-200 dark:border-yellow-500/25 hover:border-yellow-400 dark:hover:border-yellow-400/50" },
  { name: "Meta Ads",          icon: "📘", color: "border-blue-200 dark:border-blue-500/25 hover:border-blue-400 dark:hover:border-blue-400/50" },
  { name: "HubSpot",           icon: "🧡", color: "border-orange-200 dark:border-orange-500/25 hover:border-orange-400 dark:hover:border-orange-400/50" },
  { name: "Clio",              icon: "⚖️", color: "border-violet-200 dark:border-violet-500/25 hover:border-violet-400 dark:hover:border-violet-400/50" },
  { name: "Monday.com",        icon: "📋", color: "border-rose-200 dark:border-rose-500/25 hover:border-rose-400 dark:hover:border-rose-400/50" },
  { name: "Slack",             icon: "💬", color: "border-purple-200 dark:border-purple-500/25 hover:border-purple-400 dark:hover:border-purple-400/50" },
  { name: "Excel / CSV",       icon: "📄", color: "border-slate-200 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30" },
];

const TRUST_LOGOS = [
  "Xero", "Cin7", "Clio", "QuickBooks", "Google Analytics",
  "Meta Ads", "HubSpot", "Shopify", "Excel / CSV", "Monday.com",
];

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05050f]">

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 w-full z-50 border-b border-slate-200 dark:border-white/5"
        style={{ background: "var(--nav-bg)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image src="/logo.png" alt="Quantyx Advisory" height={48} width={192} className="object-contain" priority />
          <div className="hidden md:flex items-center gap-7 text-sm text-slate-600 dark:text-white/60">
            <a href="#services"      className="hover:text-slate-900 dark:hover:text-white transition-colors">Services</a>
            <a href="#how-it-works"  className="hover:text-slate-900 dark:hover:text-white transition-colors">How It Works</a>
            <a href="#case-studies"  className="hover:text-slate-900 dark:hover:text-white transition-colors">Case Studies</a>
            <a href="#integrations"  className="hover:text-slate-900 dark:hover:text-white transition-colors">Integrations</a>
            <a href="#pricing"       className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
            <a href="#contact"       className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
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
          HERO — split layout
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6 aurora-bg dot-grid">
        {/* Edge vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_120%,rgba(248,249,252,0.95),transparent_70%)] dark:bg-[radial-gradient(ellipse_100%_60%_at_50%_120%,rgba(5,5,15,0.7),transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">

            {/* LEFT */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-7 uppercase tracking-widest">
                Built for founder-led businesses &amp; lean finance teams
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-[3.75rem] font-bold leading-[1.06] tracking-tight mb-6 text-slate-900 dark:text-white">
                Your data exists.<br />
                You just can&apos;t{" "}
                <span className="gradient-text">see it yet.</span>
              </h1>

              {/* Subline */}
              <p className="text-lg text-slate-600 dark:text-white/55 max-w-xl mb-10 leading-relaxed">
                We connect your systems, centralise your data, and build the operating layer
                that gives management full visibility — without spreadsheets or manual effort.
              </p>

              {/* Stat tickers */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10">
                {[
                  { label: "Weekly reporting", value: "< 30 min",  note: "Was 3–8 hrs"   },
                  { label: "Dispute resolution", value: "4×",      note: "Faster"        },
                  { label: "Client churn",       value: "25%",     note: "Reduction"     },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 leading-none">{s.value}</p>
                    <p className="text-xs font-semibold text-slate-700 dark:text-white/70 mt-0.5">{s.label}</p>
                    <p className="text-[10px] text-slate-400 dark:text-white/30">{s.note}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <a
                  href="#case-studies"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors text-sm shadow-sm"
                >
                  See the work <ArrowRight size={15} />
                </a>
                <a
                  href="#how-it-works"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-white/55 dark:hover:text-white px-7 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.08] transition-colors text-sm font-medium"
                >
                  How it works
                </a>
              </div>
            </div>

            {/* RIGHT — floating dashboard */}
            <div className="hidden lg:flex items-center justify-center">
              <FloatingDashboard />
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRUST STRIP — marquee
      ══════════════════════════════════════ */}
      <div className="overflow-hidden border-y border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] py-4">
        <div className="flex items-center gap-3 mb-1 px-6">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 shrink-0">
            Systems we connect →
          </span>
        </div>
        <div className="flex animate-marquee whitespace-nowrap gap-8 px-6">
          {[...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, i) => (
            <span
              key={i}
              className="text-sm font-semibold text-slate-400 dark:text-white/30 hover:text-slate-700 dark:hover:text-white/70 transition-colors cursor-default shrink-0"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          PROBLEM SECTION
      ══════════════════════════════════════ */}
      <section className="py-24 px-6 bg-white dark:bg-transparent border-b border-slate-100 dark:border-white/[0.04]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-5">
              Sound familiar?
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900 dark:text-white leading-tight">
              Your systems are disconnected.<br />
              Your team is <span className="gradient-text">flying blind.</span>
            </h2>
            <p className="text-slate-500 dark:text-white/40 mb-12 text-base leading-relaxed max-w-xl mx-auto">
              Most growing businesses have the data. They just can't see it in one place — so decisions get made on gut feel, outdated spreadsheets, or nothing at all.
            </p>
          </ScrollReveal>

          <div className="space-y-4 text-left mb-10">
            {[
              "Hours every week manually reconciling data across spreadsheets",
              "Management making decisions without a complete picture",
              "Your finance team drowning in reports instead of insights",
            ].map((pain, i) => (
              <ScrollReveal key={pain} delay={i * 0.1} direction="left">
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-500/[0.04]">
                  <XCircle size={18} className="text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-700 dark:text-white/70 leading-relaxed">{pain}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-sm">
              <CheckCircle size={15} />
              That&apos;s what we fix.
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES — alternating rows
      ══════════════════════════════════════ */}
      <section id="services" className="py-24 px-6 bg-slate-50 dark:bg-transparent">
        <div className="max-w-6xl mx-auto">

          <ScrollReveal>
            <div className="mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
                What we do
              </p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                Three services.<br />One outcome.
              </h2>
            </div>
          </ScrollReveal>

          {/* Service 01 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 pb-20 border-b border-slate-200 dark:border-white/[0.05]">
            <ScrollReveal direction="left">
              <div>
                <span className="text-7xl font-bold text-indigo-500/20 dark:text-indigo-500/15 leading-none block mb-4 select-none">01</span>
                <h3 className="text-3xl font-bold mb-4 leading-snug text-slate-900 dark:text-white">
                  Financial operating system
                </h3>
                <p className="text-slate-600 dark:text-white/50 leading-relaxed mb-5 text-base">
                  We turn raw business data into dashboards and reporting that make performance easy to understand — without anyone building a spreadsheet.
                </p>
                <div className="inline-flex items-center gap-2 border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/[0.08] text-indigo-700 dark:text-indigo-300 rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
                  ✓ Clear visibility and faster decisions
                </div>
                <ul className="space-y-2">
                  {["Finance dashboards", "KPI tracking", "Management reporting", "Board packs"].map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-white/55">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="rounded-2xl border border-indigo-200 dark:border-indigo-500/25 bg-white dark:bg-indigo-500/[0.04] p-6 space-y-3">
                {[
                  { label: "Total Revenue",     value: "£10.57M", change: "+0.6%",  color: "text-indigo-600 dark:text-indigo-400" },
                  { label: "Gross Margin",      value: "60.8%",   change: "+0.3pp", color: "text-violet-600 dark:text-violet-400" },
                  { label: "Staff Utilisation", value: "78.3%",   change: "+2pp",   color: "text-emerald-600 dark:text-emerald-400" },
                ].map((kpi) => (
                  <div key={kpi.label} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.03]">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/30 mb-0.5">{kpi.label}</p>
                      <p className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    </div>
                    <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      ↑ {kpi.change}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Service 02 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 pb-20 border-b border-slate-200 dark:border-white/[0.05]">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <div className="rounded-2xl border border-violet-200 dark:border-violet-500/25 bg-white dark:bg-violet-500/[0.04] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
                    <Database size={14} className="text-violet-600 dark:text-violet-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-white/40">Source systems</span>
                </div>
                <div className="space-y-2 mb-4">
                  {["Xero (invoices, payments)", "Cin7 (stock, orders)", "Manual exports / spreadsheets"].map((s) => (
                    <div key={s} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/[0.05]">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                      <span className="text-xs text-slate-600 dark:text-white/55">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-violet-600 dark:text-violet-400 font-semibold mb-2 pl-1">
                  <ArrowRight size={13} />
                  Automated pipeline runs nightly
                </div>
                <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/[0.06] text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
                  ✓ Reconciliation complete · 0 errors · 3 sec
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="order-1 lg:order-2">
              <div>
                <span className="text-7xl font-bold text-violet-500/20 dark:text-violet-500/15 leading-none block mb-4 select-none">02</span>
                <h3 className="text-3xl font-bold mb-4 leading-snug text-slate-900 dark:text-white">
                  Process automation
                </h3>
                <p className="text-slate-600 dark:text-white/50 leading-relaxed mb-5 text-base">
                  We automate the reporting and workflows your team runs manually — so they spend time on decisions, not on data wrangling.
                </p>
                <div className="inline-flex items-center gap-2 border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/[0.08] text-violet-700 dark:text-violet-300 rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
                  ✓ Less manual work, fewer errors
                </div>
                <ul className="space-y-2">
                  {["Automated reports", "Invoice reconciliations", "Recurring data pulls", "Alert triggers"].map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-white/55">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Service 03 */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <span className="text-7xl font-bold text-emerald-500/20 dark:text-emerald-500/15 leading-none block mb-4 select-none">03</span>
                <h3 className="text-3xl font-bold mb-4 leading-snug text-slate-900 dark:text-white">
                  Data centralisation
                </h3>
                <p className="text-slate-600 dark:text-white/50 leading-relaxed mb-5 text-base">
                  We connect your systems and centralise data into a structured reporting layer — so every report draws from the same reliable source.
                </p>
                <div className="inline-flex items-center gap-2 border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/[0.08] text-emerald-700 dark:text-emerald-300 rounded-full px-4 py-1.5 text-xs font-semibold mb-6">
                  ✓ Reliable data and better insight
                </div>
                <ul className="space-y-2">
                  {["Accounting + inventory + spreadsheets", "Single source of truth", "Consistent cross-team reporting", "Full data documentation"].map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-white/55">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-500/25 bg-white dark:bg-emerald-500/[0.04] p-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">Unified data model</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {["Xero", "Cin7", "Excel", "Clio"].map((src) => (
                    <div key={src} className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] text-xs text-slate-600 dark:text-white/50 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {src}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-white/30 mb-3 justify-center">
                  <ArrowRight size={12} />
                  <span>Centralised to Postgres</span>
                  <ArrowRight size={12} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["Dashboards", "Reports", "Alerts"].map((out) => (
                    <div key={out} className="p-2 rounded-lg border border-emerald-200 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/[0.07] text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 text-center">
                      {out}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 px-6 border-y border-slate-100 dark:border-white/[0.05] bg-white dark:bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">

          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
                How it works
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
                Three steps. Minimal effort<br />from your team.
              </h2>
              <p className="text-slate-500 dark:text-white/40 text-sm max-w-md mx-auto leading-relaxed">
                We handle the technical complexity — you get clean data, clear reporting, and better decisions.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                step: "01",
                Icon: Database,
                title: "Connect",
                body: "We integrate your systems via APIs and structured exports — pulling from wherever your data lives.",
                tags: ["API integrations", "Scheduled exports", "Manual uploads"],
                accent: "border-sky-200 dark:border-sky-500/25",
                iconBg: "bg-sky-100 dark:bg-sky-500/15",
                iconColor: "text-sky-600 dark:text-sky-400",
                numColor: "text-sky-400/40 dark:text-sky-500/30",
              },
              {
                step: "02",
                Icon: GitMerge,
                title: "Centralise",
                body: "All data lands in a central database — cleaned, modelled, and validated so every report draws from one consistent source.",
                tags: ["Central database", "Data modelling", "Transformation layer"],
                accent: "border-violet-200 dark:border-violet-500/25",
                iconBg: "bg-violet-100 dark:bg-violet-500/15",
                iconColor: "text-violet-600 dark:text-violet-400",
                numColor: "text-violet-400/40 dark:text-violet-500/30",
              },
              {
                step: "03",
                Icon: BarChart3,
                title: "Operate",
                body: "We build the reporting layer — live dashboards, KPI views, alerts, and management packs. Always connected. Always current.",
                tags: ["Live dashboards", "Automated reports", "KPI tracking"],
                accent: "border-emerald-200 dark:border-emerald-500/25",
                iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
                iconColor: "text-emerald-600 dark:text-emerald-400",
                numColor: "text-emerald-400/40 dark:text-emerald-500/30",
              },
            ].map(({ step, Icon, title, body, tags, accent, iconBg, iconColor, numColor }, idx) => (
              <ScrollReveal key={step} delay={idx * 0.1}>
                <div className={`h-full p-7 rounded-2xl border ${accent} bg-white dark:bg-white/[0.02] flex flex-col shadow-sm dark:shadow-none`}>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`text-5xl font-bold leading-none select-none ${numColor}`}>{step}</span>
                    <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
                      <Icon size={18} className={iconColor} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{title}</h3>
                  <p className="text-sm text-slate-500 dark:text-white/45 leading-relaxed mb-6 flex-1">{body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-slate-500 dark:text-white/35 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Engagement steps */}
          <ScrollReveal delay={0.2}>
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
          </ScrollReveal>

        </div>
      </section>

      {/* ══════════════════════════════════════
          RESULTS — dark section
      ══════════════════════════════════════ */}
      <section className="py-24 px-6 bg-[#05050f] dark:bg-[#030310] relative overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-60 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">

          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400/70 mb-4">
                Real results
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                What our clients achieve
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: 30,   prefix: "< ",  suffix: " min",  label: "Weekly reporting",      was: "Was 3–8 hrs",         color: "border-indigo-500/30 bg-indigo-500/[0.06]", textColor: "text-indigo-400" },
              { value: 0.3,  prefix: "",    suffix: "%",      label: "Match error rate",      was: "Was 6%",              color: "border-violet-500/30 bg-violet-500/[0.06]", textColor: "text-violet-400", decimals: 1 },
              { value: 25,   prefix: "",    suffix: "%",      label: "Client churn reduced",  was: "Marketing clients",   color: "border-emerald-500/30 bg-emerald-500/[0.06]", textColor: "text-emerald-400" },
              { value: 20,   prefix: "",    suffix: " min",   label: "Management packs",      was: "Was 4 hrs",           color: "border-amber-500/30 bg-amber-500/[0.06]", textColor: "text-amber-400" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className={`rounded-2xl border p-6 ${stat.color} flex flex-col`} style={{ borderTopWidth: 2, borderTopColor: stat.textColor.includes("indigo") ? "rgba(99,102,241,0.5)" : stat.textColor.includes("violet") ? "rgba(139,92,246,0.5)" : stat.textColor.includes("emerald") ? "rgba(16,185,129,0.5)" : "rgba(245,158,11,0.5)" }}>
                  <p className={`text-4xl font-black mb-1 ${stat.textColor}`}>
                    {stat.prefix}
                    <StatTicker to={stat.value} decimals={stat.decimals ?? 0} />
                    {stat.suffix}
                  </p>
                  <p className="text-sm font-semibold text-white/70 mb-1">{stat.label}</p>
                  <p className="text-xs text-white/30">{stat.was}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          CASE STUDIES
      ══════════════════════════════════════ */}
      <section id="case-studies" className="py-24 px-6 bg-slate-50 dark:bg-transparent border-t border-slate-100 dark:border-white/[0.04]">
        <div className="max-w-6xl mx-auto">

          <ScrollReveal>
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
          </ScrollReveal>

          {/* Featured: InventoryCo */}
          <ScrollReveal>
            <div className="mb-5 relative overflow-hidden rounded-2xl border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/[0.04] p-8 md:p-10 shadow-sm dark:shadow-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 dark:bg-indigo-500/[0.07] rounded-full blur-3xl pointer-events-none" />
              <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-10 items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 px-3 py-1 rounded-full">Case Study</span>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-white/30 border border-slate-200 dark:border-white/[0.08] px-3 py-1 rounded-full bg-white dark:bg-transparent">Commercial Electrical</span>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-white/30 border border-slate-200 dark:border-white/[0.08] px-3 py-1 rounded-full bg-white dark:bg-transparent">Data &amp; Operational Layer</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug tracking-tight text-slate-900 dark:text-white">
                    Financial, stock, and operations —<br className="hidden md:block" /> unified into one layer
                  </h3>
                  <p className="text-slate-600 dark:text-white/50 text-sm leading-relaxed mb-4 max-w-lg">
                    A commercial electrical contractor running invoicing in Xero, stock in Cin7, and all job tracking manually in Excel — with no central view of job profitability, crew load, or delivery risk. We centralised all three into a Postgres data model and built a live operational layer on top.
                  </p>
                  <p className="text-xs text-slate-400 dark:text-white/30 mb-7 max-w-lg">
                    Built using: Xero API · Cin7 API · Postgres (Supabase) · Structured SQL views
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/case-studies/inventoryco" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm">
                      Read full case study <ArrowRight size={14} />
                    </Link>
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 dark:text-white/45 dark:hover:text-white/70 px-6 py-3 rounded-xl border border-slate-200 dark:border-white/[0.09] hover:border-slate-300 dark:hover:border-white/[0.18] bg-white dark:bg-transparent transition-colors">
                      View demo dashboard <ExternalLink size={14} />
                    </Link>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-4">Key results</p>
                  {[
                    { stat: "< 30 min", label: "Weekly reporting time",  was: "Was ~5 hours manual"         },
                    { stat: "100%",     label: "Job margin visibility",   was: "Previously unavailable"      },
                    { stat: "Live",     label: "Crew & labour tracking",  was: "Was weekly manual timesheet" },
                    { stat: "1",        label: "Source of truth",         was: "Was 3+ disconnected systems" },
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
          </ScrollReveal>

          {/* Featured: Lex & Co */}
          <ScrollReveal>
            <div className="mb-5 relative overflow-hidden rounded-2xl border border-indigo-200 dark:border-indigo-500/20 bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-500/[0.04] dark:to-transparent p-8 md:p-10 shadow-sm dark:shadow-none">
              <div className="absolute top-0 right-0 w-80 h-80 bg-violet-100 dark:bg-violet-500/[0.06] rounded-full blur-3xl pointer-events-none" />
              <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-10 items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 bg-indigo-100 dark:bg-indigo-500/10 px-3 py-1 rounded-full">Case Study</span>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-white/30 border border-slate-200 dark:border-white/[0.08] px-3 py-1 rounded-full bg-white dark:bg-transparent">Legal Services</span>
                    <span className="text-[10px] font-medium uppercase tracking-widest text-slate-500 dark:text-white/30 border border-slate-200 dark:border-white/[0.08] px-3 py-1 rounded-full bg-white dark:bg-transparent">WIP &amp; Financial Layer</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug tracking-tight text-slate-900 dark:text-white">
                    WIP, billing, and matter profitability —<br className="hidden md:block" /> unified into one partner view
                  </h3>
                  <p className="text-slate-600 dark:text-white/50 text-sm leading-relaxed mb-4 max-w-lg">
                    A mid-sized UK law firm running matters in Clio, invoicing in Xero, and WIP reconciliation manually in Excel — with no view of matter margin or billing delays. We centralised all three and built a partner-facing insight layer covering WIP, realisation rates, and billing performance.
                  </p>
                  <p className="text-xs text-slate-400 dark:text-white/30 mb-7 max-w-lg">
                    Built using: Clio API · Xero API · Postgres (Supabase) · Structured SQL views
                  </p>
                  <Link href="/case-studies/lexco" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm">
                    Read full case study <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/25 mb-4">Key results</p>
                  {[
                    { stat: "< 30 min", label: "Weekly reporting time",    was: "Was ~4 hours manual"         },
                    { stat: "100%",     label: "Matter margin visibility",  was: "Previously unavailable"      },
                    { stat: "Live",     label: "WIP & billing tracking",    was: "Was weekly manual reconcile" },
                    { stat: "1",        label: "Source of truth",           was: "Was 3+ disconnected systems" },
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
          </ScrollReveal>

          {/* Secondary */}
          <div className="grid lg:grid-cols-3 gap-5 mb-10">
            {secondaryCaseStudies.map((cs, i) => (
              <ScrollReveal key={cs.client} delay={i * 0.08}>
                <div className="h-full p-7 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.025] flex flex-col shadow-sm dark:shadow-none">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div>
                      <p className="font-semibold text-sm text-slate-900 dark:text-white">{cs.client}</p>
                      <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5">{cs.industry}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${cs.tagColor}`}>{cs.tag}</span>
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
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center">
            <a href="#contact" className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200 transition-colors">
              Facing a similar problem? Let&apos;s talk <ExternalLink size={13} />
            </a>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          INTEGRATIONS
      ══════════════════════════════════════ */}
      <section id="integrations" className="py-24 px-6 bg-white dark:bg-transparent border-t border-slate-100 dark:border-white/[0.04]">
        <div className="max-w-6xl mx-auto">

          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
                What we connect
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
                Any system you use,<br />we can wire it up
              </h2>
              <p className="text-slate-500 dark:text-white/40 text-sm max-w-md mx-auto">
                We build direct API integrations across your tech stack — accounting, inventory, CRM, marketing, and more.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {INTEGRATIONS.map((int, i) => (
              <ScrollReveal key={int.name} delay={i * 0.04}>
                <div className={`flex items-center gap-3 p-4 rounded-xl border bg-white dark:bg-white/[0.025] transition-all duration-200 hover:scale-[1.02] cursor-default ${int.color}`}>
                  <span className="text-xl leading-none">{int.icon}</span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-white/70">{int.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="text-center text-sm text-slate-400 dark:text-white/30">
              Don&apos;t see your system?{" "}
              <a href="#contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">We&apos;ve likely built it. Get in touch.</a>
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING
      ══════════════════════════════════════ */}
      <section id="pricing" className="py-24 px-6 bg-slate-50 dark:bg-transparent border-t border-slate-100 dark:border-white/[0.04]">
        <div className="max-w-6xl mx-auto">

          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
                Engagement model
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
                Scoped, fixed-fee.<br />No surprises.
              </h2>
              <p className="text-slate-500 dark:text-white/40 text-sm max-w-md mx-auto leading-relaxed">
                Every engagement is fully scoped before we start — you know exactly what you&apos;re getting and what it costs.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-5 mb-8">
            {[
              {
                name: "Data Foundations",
                tagline: "Connect your core systems and build a clean, structured data layer.",
                timeline: "4–6 weeks",
                deliverables: ["Unified data model", "Data dictionary", "Validated pipelines", "Documentation"],
                highlight: false,
                accent: "border-slate-200 dark:border-white/[0.08]",
                bg: "bg-white dark:bg-white/[0.025]",
                badge: null,
              },
              {
                name: "Operating System",
                tagline: "Full financial and operational layer with live dashboards and automated reporting.",
                timeline: "6–10 weeks",
                deliverables: ["Everything in Foundations", "Executive dashboards", "Automated reporting", "KPI tracking", "Management packs"],
                highlight: true,
                accent: "border-indigo-500/40 dark:border-indigo-500/50",
                bg: "bg-white dark:bg-indigo-500/[0.06]",
                badge: "Most popular",
              },
              {
                name: "Enterprise Integration",
                tagline: "Multi-system integration with custom logic, complex data models, and ongoing support.",
                timeline: "Bespoke scoping",
                deliverables: ["Multi-source integrations", "Custom business logic", "Bespoke data model", "Ongoing support"],
                highlight: false,
                accent: "border-slate-200 dark:border-white/[0.08]",
                bg: "bg-white dark:bg-white/[0.025]",
                badge: null,
              },
            ].map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.08}>
                <div className={`relative h-full flex flex-col rounded-2xl border p-7 shadow-sm dark:shadow-none ${tier.accent} ${tier.bg} ${tier.highlight ? "ring-2 ring-indigo-500/30" : ""}`}>
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                        {tier.badge}
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-white/45 leading-relaxed mb-5">{tier.tagline}</p>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30">Typical timeline:</span>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{tier.timeline}</span>
                  </div>
                  <ul className="space-y-2 mb-8 flex-1">
                    {tier.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-white/60">
                        <CheckCircle size={13} className="text-indigo-500 dark:text-indigo-400 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-colors ${
                      tier.highlight
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm"
                        : "border border-slate-200 dark:border-white/[0.12] text-slate-700 dark:text-white/70 hover:bg-slate-50 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    Book a scoping call <ArrowRight size={13} />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <p className="text-center text-xs text-slate-400 dark:text-white/25">
              No prices shown — every engagement is scoped individually. Proposal within 3 working days of your discovery call.
            </p>
          </ScrollReveal>

        </div>
      </section>

      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section id="about" className="py-24 px-6 border-t border-slate-100 dark:border-white/[0.05] bg-white dark:bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

            <ScrollReveal direction="left">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-5">
                  About us
                </p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-900 dark:text-white">
                  Accountants who<br />learned to build.<br />
                  <span className="gradient-text">Data engineers<br />who understand finance.</span>
                </h2>
                <p className="text-slate-600 dark:text-white/45 leading-relaxed mb-5 text-base">
                  We got frustrated with the tools available to SMEs. The enterprise products were too complex, the off-the-shelf dashboards were too generic, and consultants kept producing slide decks without building anything.
                </p>
                <p className="text-slate-500 dark:text-white/35 leading-relaxed text-sm">
                  So we built better ones. Quantyx Advisory is a specialist data consultancy for founder-led businesses and lean finance teams — we deliver real infrastructure, not recommendations.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: "📊", title: "Accounting background",     body: "We understand P&Ls, management accounts, and what a finance team actually needs — not just how to build dashboards.", color: "border-indigo-200 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/[0.04]", label: "text-indigo-700 dark:text-indigo-400" },
                { icon: "🔍", title: "Ex-audit & data analytics", body: "We've worked in audit and data roles — we know how to interrogate data and spot where things don't add up.", color: "border-violet-200 bg-violet-50 dark:border-violet-500/20 dark:bg-violet-500/[0.04]", label: "text-violet-700 dark:text-violet-400" },
                { icon: "🏗",  title: "We build, not just advise", body: "We don't produce slide decks. We build the actual pipelines, databases, and dashboards — and hand them over working.", color: "border-sky-200 bg-sky-50 dark:border-sky-500/20 dark:bg-sky-500/[0.04]", label: "text-sky-700 dark:text-sky-400" },
                { icon: "🤝", title: "SME-focused",               body: "We work with businesses without a data team. Our engagements are scoped, priced, and communicated in plain English.", color: "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/[0.04]", label: "text-emerald-700 dark:text-emerald-400" },
              ].map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.08}>
                  <div className={`p-6 rounded-2xl border ${card.color}`}>
                    <span className="text-2xl mb-4 block">{card.icon}</span>
                    <p className={`text-sm font-bold mb-2 ${card.label}`}>{card.title}</p>
                    <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed">{card.body}</p>
                  </div>
                </ScrollReveal>
              ))}

              <ScrollReveal delay={0.3} className="sm:col-span-2">
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.02]">
                  <p className="text-xs font-semibold text-slate-400 dark:text-white/30 uppercase tracking-widest mb-3">What we&apos;re not</p>
                  <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-500 dark:text-white/40">
                    <div className="flex items-start gap-2"><span className="text-rose-400 shrink-0 mt-0.5">✗</span>A large agency with account managers and project overhead</div>
                    <div className="flex items-start gap-2"><span className="text-rose-400 shrink-0 mt-0.5">✗</span>A SaaS product trying to fit your data into our template</div>
                    <div className="flex items-start gap-2"><span className="text-rose-400 shrink-0 mt-0.5">✗</span>Consultants who produce recommendations and then leave</div>
                  </div>
                </div>
              </ScrollReveal>
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

            <ScrollReveal direction="left">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-5">
                  Get in touch
                </p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-slate-900 dark:text-white">
                  Let&apos;s talk about<br />your reporting.
                </h2>
                <p className="text-slate-600 dark:text-white/45 text-base leading-relaxed mb-8">
                  Book a free 30-minute call. We&apos;ll ask about your current setup, understand what&apos;s not working, and tell you honestly whether we can help — and how.
                </p>
                <div className="space-y-3 mb-8">
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
                <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-500/25 bg-indigo-50 dark:bg-indigo-500/[0.06] text-sm text-indigo-700 dark:text-indigo-300">
                  <p className="font-semibold mb-1">Response time</p>
                  <p className="text-xs opacity-70">We respond to all enquiries within 1 working day.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <ContactForm />
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-100 dark:border-white/[0.05] bg-white dark:bg-transparent">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <Image src="/logo.png" alt="Quantyx Advisory" height={40} width={160} className="object-contain mb-4" />
              <p className="text-xs text-slate-400 dark:text-white/30 leading-relaxed max-w-[200px]">
                Specialist data consultancy for growing businesses. Built in the UK.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">Services</p>
              <ul className="space-y-2">
                {["Financial Operating System", "Process Automation", "Data Centralisation"].map((s) => (
                  <li key={s}>
                    <a href="#services" className="text-sm text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors">{s}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">Company</p>
              <ul className="space-y-2">
                {[
                  { label: "Case Studies",   href: "#case-studies" },
                  { label: "Integrations",   href: "#integrations" },
                  { label: "Pricing",        href: "#pricing" },
                  { label: "About",          href: "#about" },
                  { label: "Demo Dashboard", href: "/dashboard" },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">Get started</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors mb-4"
              >
                Book a Call <ArrowRight size={13} />
              </a>
              <p className="text-xs text-slate-400 dark:text-white/30">Free 30-min discovery call.</p>
            </div>
          </div>
          <div className="border-t border-slate-100 dark:border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 dark:text-white/25 text-xs">© 2026 Quantyx Advisory. All rights reserved. · UK</p>
            <div className="flex gap-6 text-xs text-slate-400 dark:text-white/25">
              <a href="#" className="hover:text-slate-700 dark:hover:text-white/50 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-700 dark:hover:text-white/50 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
