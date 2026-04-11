"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("qx-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("qx-theme", "light");
    }
  }

  // Prevent hydration mismatch — render a size-matched placeholder
  if (!mounted) {
    return <div className="w-9 h-9 rounded-lg shrink-0" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                 border border-slate-200 bg-white text-slate-400
                 hover:text-slate-700 hover:bg-slate-50
                 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white/40
                 dark:hover:text-white dark:hover:bg-white/[0.08]
                 transition-colors duration-200"
    >
      {dark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
