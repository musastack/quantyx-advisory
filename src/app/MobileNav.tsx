"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="md:hidden p-2 text-white/50 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#08080f] border-l border-white/[0.07] flex flex-col transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <span className="font-bold text-white gradient-text">Quantyx Advisory</span>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 text-white/40 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col p-5 gap-1 text-sm">
          {[
            { label: "Services",     href: "#services"     },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Case Studies", href: "#case-studies" },
            { label: "About",        href: "#about"        },
            { label: "Contact",      href: "#contact"      },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="p-5 border-t border-white/[0.06] space-y-3">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block w-full text-center py-3 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 transition-colors"
          >
            View Demo
          </Link>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium text-sm transition-colors"
          >
            Book a Call
          </a>
        </div>
      </div>
    </>
  );
}
