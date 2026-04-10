import Link from "next/link";
import {
  BarChart3,
  Zap,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle,
  Users,
  Globe,
  ExternalLink,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Real-Time Dashboards",
    description:
      "Visualise KPIs, revenue, and operations data in beautiful, interactive dashboards built for your business.",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description:
      "Eliminate repetitive tasks. Automate approvals, notifications, reports, and data pipelines with zero-code tools.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description:
      "Go beyond reporting — uncover trends and forecast outcomes with AI-powered analytics tailored to your data.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Role-based access, audit logs, and end-to-end encryption keep your business data secure and compliant.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share dashboards, annotate charts, and align your team around a single source of truth.",
  },
  {
    icon: Globe,
    title: "Any Data Source",
    description:
      "Connect to Salesforce, HubSpot, Google Sheets, SQL databases, REST APIs, and more in minutes.",
  },
];

const stats = [
  { label: "Businesses Served", value: "120+" },
  { label: "Hours Saved / Month", value: "40k+" },
  { label: "Dashboards Deployed", value: "500+" },
  { label: "Uptime SLA", value: "99.9%" },
];

const caseStudies = [
  {
    client: "InventoryCo Ltd",
    industry: "Wholesale Distribution",
    tag: "Data Centralisation",
    tagColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
    headline: "From disconnected systems to real-time insight",
    description:
      "Unified Xero, Cin7, and Excel into a single centralised data model with automated pipelines — eliminating 6 hours of weekly manual reporting and giving leadership live visibility.",
    results: ["Reporting fully automated", "3 systems unified in one model", "Live inventory alerts deployed"],
    href: "/case-studies/inventoryco",
  },
  {
    client: "Logistics SME",
    industry: "Logistics",
    tag: "Process Automation",
    tagColor: "text-purple-300 bg-purple-500/10 border-purple-500/20",
    headline: "Automated invoice & delivery tracking",
    description:
      "Designed an end-to-end automation that matched purchase orders, invoices, and delivery confirmations — eliminating manual data entry and catching errors before they reached clients.",
    results: ["Zero manual invoice matching", "Error rate dropped from 6% to 0.3%", "3 staff hours saved per day"],
    href: null,
  },
  {
    client: "Digital Marketing Agency",
    industry: "Marketing",
    tag: "Client Reporting",
    tagColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    headline: "White-label client dashboards",
    description:
      "Created branded, auto-updating dashboards for 20+ agency clients pulling from Google Ads, Meta, and GA4 — replacing PDF reports with live portals each client could access anytime.",
    results: ["20+ client portals deployed", "Reports go live in <2 hrs", "Client retention up 25%"],
    href: null,
  },
];

const plans = [
  {
    name: "Starter",
    price: "$299",
    period: "/mo",
    description: "Perfect for small businesses getting started with data.",
    features: [
      "Up to 5 dashboards",
      "3 data source integrations",
      "Basic automation (5 workflows)",
      "Email support",
      "7-day data retention",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$799",
    period: "/mo",
    description: "For scaling teams that need more power and automation.",
    features: [
      "Unlimited dashboards",
      "20+ data source integrations",
      "Advanced automation (unlimited)",
      "Priority support & onboarding",
      "90-day data retention",
      "Predictive analytics",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organisations.",
    features: [
      "Everything in Growth",
      "Custom integrations",
      "Dedicated success manager",
      "SLA & compliance support",
      "Unlimited data retention",
      "On-premise option",
    ],
    cta: "Contact Us",
    highlight: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05050f]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#05050f]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">Quantyx Advisory</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(99,102,241,0.25),transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 rounded-full px-4 py-1.5 text-sm text-indigo-300 mb-6">
            <Zap size={14} />
            Business Intelligence, Automated
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Turn Your Data Into{" "}
            <span className="gradient-text">Decisions</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Quantyx Advisory builds custom dashboards and automation workflows that give
            your business a competitive edge — without the complexity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-medium transition-colors"
            >
              See Live Dashboard <ArrowRight size={16} />
            </Link>
            <a
              href="#contact"
              className="text-white/60 hover:text-white px-8 py-3.5 rounded-xl border border-white/10 hover:border-white/20 transition-colors font-medium"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold gradient-text mb-1">{s.value}</div>
              <div className="text-sm text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything your business needs
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              From raw data to actionable insight — Quantyx handles the entire stack.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center mb-4 group-hover:bg-indigo-500/25 transition-colors">
                  <f.icon size={20} className="text-indigo-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-indigo-500/30 bg-indigo-500/10 rounded-full px-4 py-1.5 text-sm text-indigo-300 mb-4">
              Real results, real clients
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Case Studies</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Here&apos;s a sample of the work we&apos;ve delivered for businesses across different industries.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <div
                key={cs.client}
                className="p-7 rounded-2xl border border-white/8 bg-white/3 hover:border-indigo-500/30 transition-all flex flex-col group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="font-semibold">{cs.client}</p>
                    <p className="text-xs text-white/40 mt-0.5">{cs.industry}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${cs.tagColor}`}>
                    {cs.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 gradient-text">{cs.headline}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">{cs.description}</p>
                <ul className="space-y-2 mb-6">
                  {cs.results.map((r) => (
                    <li key={r} className="flex items-center gap-2 text-sm text-white/70">
                      <CheckCircle size={14} className="text-indigo-400 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
                {cs.href ? (
                  <Link
                    href={cs.href}
                    className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium mt-auto"
                  >
                    Read full case study <ArrowRight size={14} />
                  </Link>
                ) : (
                  <p className="text-xs text-white/20 mt-auto">Full case study coming soon</p>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200 transition-colors"
            >
              Want results like these? Let&apos;s talk <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-white/50 text-lg">No hidden fees. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl border flex flex-col ${
                  plan.highlight
                    ? "border-indigo-500/60 bg-indigo-500/10 shadow-[0_0_40px_rgba(99,102,241,0.2)]"
                    : "border-white/8 bg-white/3"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-3">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-white/40 pb-1">{plan.period}</span>
                  </div>
                  <p className="text-white/50 text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle size={16} className="text-indigo-400 mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block text-center py-3 rounded-xl font-medium transition-colors ${
                    plan.highlight
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                      : "border border-white/15 hover:border-white/30 text-white/80 hover:text-white"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to transform your business?
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Book a free 30-minute strategy call and see how Quantyx Advisory can
            automate your workflows and build dashboards that drive results.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/60 text-sm"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium transition-colors text-sm whitespace-nowrap"
            >
              Book Free Call
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold gradient-text">Quantyx Advisory</span>
          <p className="text-white/30 text-sm">© 2026 Quantyx Advisory. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
