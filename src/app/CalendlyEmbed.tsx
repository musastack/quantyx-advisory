"use client";

import { useEffect, useState } from "react";

export default function CalendlyEmbed() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Detect current theme
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      observer.disconnect();
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  const bg = dark ? "0d0d1f" : "ffffff";
  const text = dark ? "ffffff" : "1e293b";
  const primary = "4f46e5";

  const url = `https://calendly.com/mabdullah-quantyxadvisory/30min?background_color=${bg}&text_color=${text}&primary_color=${primary}&hide_gdpr_banner=1`;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.08] shadow-xl dark:shadow-2xl">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 dark:border-white/[0.06] bg-white dark:bg-[#0d0d1f]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-400/60" />
          <span className="w-3 h-3 rounded-full bg-amber-400/60" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/60" />
        </div>
        <span className="flex-1 text-center text-[11px] font-medium text-slate-400 dark:text-white/25 tracking-wide">
          Book a Discovery Call — 30 min
        </span>
      </div>

      {/* Calendly widget */}
      <div
        key={dark ? "dark" : "light"}
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: "320px", height: "660px" }}
      />
    </div>
  );
}
