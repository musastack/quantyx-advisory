import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Quantyx Advisory",
  description: "How Quantyx Advisory collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05050f]">
      <div className="max-w-3xl mx-auto px-6 py-24">

        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white/60 transition-colors mb-12">
          ← Back to home
        </Link>

        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
          Legal
        </p>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Privacy Policy</h1>
        <p className="text-sm text-slate-400 dark:text-white/30 mb-12">Last updated: May 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-sm leading-relaxed text-slate-600 dark:text-white/55">

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">1. Who we are</h2>
            <p>Quantyx Advisory is a specialist data consultancy registered in the United Kingdom. We build bespoke financial dashboards, data pipelines, and reporting systems for founder-led businesses and lean finance teams.</p>
            <p className="mt-3">For the purposes of UK data protection law, Quantyx Advisory is the data controller of any personal data you provide to us.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">2. What data we collect</h2>
            <p>We collect personal data only when you choose to provide it. This includes:</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li><strong>Contact enquiries</strong> — name, email address, company name, and any information you include in your message when you contact us via our website form.</li>
              <li><strong>Discovery calls</strong> — notes from conversations, if you book a call with us.</li>
              <li><strong>Client engagements</strong> — business and financial data shared in the course of a project, governed by a separate data processing agreement.</li>
            </ul>
            <p className="mt-3">We do not use tracking cookies, advertising cookies, or third-party analytics beyond basic server-side access logs.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">3. Why we collect it</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Respond to your enquiry and assess whether we can help.</li>
              <li>Deliver the services you have engaged us for.</li>
              <li>Send you relevant follow-up information you have requested.</li>
            </ul>
            <p className="mt-3">We do not sell your data to third parties. We do not use your data for automated decision-making or profiling.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">4. Legal basis</h2>
            <p>Our legal basis for processing your personal data is:</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li><strong>Legitimate interests</strong> — responding to business enquiries and providing our services.</li>
              <li><strong>Contract performance</strong> — processing data necessary to deliver an engagement you have commissioned.</li>
              <li><strong>Consent</strong> — where you have explicitly opted in to receive communications from us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">5. How long we keep it</h2>
            <p>We keep your contact details for as long as necessary to manage our relationship with you. If you do not become a client, we will delete your enquiry data within 12 months. Client project data is retained for 6 years in line with UK accounting obligations, then securely deleted.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">6. Your rights</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data (subject to legal obligations).</li>
              <li>Object to our processing of your data.</li>
              <li>Lodge a complaint with the ICO (<a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">ico.org.uk</a>).</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, contact us at the address below.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">7. Contact</h2>
            <p>For any data-related queries or requests, please contact us via the <Link href="/#contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">contact form on our website</Link>.</p>
          </section>

        </div>

      </div>
    </div>
  );
}
