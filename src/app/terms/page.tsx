import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Quantyx Advisory",
  description: "Terms governing your use of the Quantyx Advisory website and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#05050f]">
      <div className="max-w-3xl mx-auto px-6 py-24">

        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 dark:text-white/30 dark:hover:text-white/60 transition-colors mb-12">
          ← Back to home
        </Link>

        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-4">
          Legal
        </p>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">Terms of Service</h1>
        <p className="text-sm text-slate-400 dark:text-white/30 mb-12">Last updated: May 2026</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-sm leading-relaxed text-slate-600 dark:text-white/55">

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">1. About these terms</h2>
            <p>These terms govern your use of the Quantyx Advisory website (quantyx.co.uk) and any services provided by Quantyx Advisory. By using our website or engaging our services, you agree to these terms. If you do not agree, please do not use our website or services.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">2. Our services</h2>
            <p>Quantyx Advisory provides bespoke data consultancy services including financial dashboard builds, data pipeline development, process automation, and management reporting systems. All engagements are governed by a separate written agreement that takes precedence over these general terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">3. Website use</h2>
            <p>You may use our website for lawful purposes only. You must not:</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Use our website in any way that could damage, disable, or impair it.</li>
              <li>Attempt to gain unauthorised access to any part of the website or its underlying systems.</li>
              <li>Transmit any harmful, offensive, or disruptive content through our contact form or any other channel.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">4. Intellectual property</h2>
            <p>All content on this website — including text, design, code, graphics, and the demo dashboard — is the intellectual property of Quantyx Advisory unless otherwise stated. You may not reproduce, distribute, or create derivative works from any content without our written permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">5. Disclaimer</h2>
            <p>The information on this website is provided for general informational purposes only. While we take care to keep it accurate, we make no warranties about its completeness or accuracy. Case studies and results shown are based on specific client engagements and are not guarantees of future outcomes.</p>
            <p className="mt-3">Our website and demo materials are provided &ldquo;as is&rdquo; without warranties of any kind, express or implied.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">6. Limitation of liability</h2>
            <p>To the fullest extent permitted by law, Quantyx Advisory will not be liable for any indirect, incidental, or consequential loss arising from your use of this website. Our liability in connection with any service engagement is governed by the written agreement for that engagement.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">7. Third-party links</h2>
            <p>Our website may contain links to third-party websites (such as Xero, QuickBooks, or integration partners). We are not responsible for the content or practices of those sites.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">8. Governing law</h2>
            <p>These terms are governed by the laws of England and Wales. Any disputes arising from them will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">9. Changes</h2>
            <p>We may update these terms from time to time. The date at the top of this page shows when they were last revised. Continued use of the website after changes constitutes your acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">10. Contact</h2>
            <p>For any questions about these terms, please reach out via the <Link href="/#contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">contact form on our website</Link>.</p>
          </section>

        </div>

      </div>
    </div>
  );
}
