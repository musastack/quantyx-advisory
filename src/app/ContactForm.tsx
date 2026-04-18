"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [name, setName]       = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, company, email, message }),
    });

    setStatus(res.ok ? "sent" : "error");
  }

  if (status === "sent") {
    return (
      <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-8 shadow-sm dark:shadow-none flex flex-col items-center justify-center text-center gap-4 min-h-[300px]">
        <CheckCircle size={36} className="text-indigo-500" />
        <p className="text-lg font-semibold text-slate-900 dark:text-white">Message sent</p>
        <p className="text-sm text-slate-500 dark:text-white/40">
          Thanks {name} — we'll be in touch within 3 business days.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-2xl p-8 shadow-sm dark:shadow-none">
      <p className="text-sm font-semibold mb-6 text-slate-900 dark:text-white">Book a free discovery call</p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-500 dark:text-white/35 block mb-1.5">Your name</label>
            <input
              type="text"
              required
              placeholder="Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500/60 text-sm transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 dark:text-white/35 block mb-1.5">Business email</label>
            <input
              type="email"
              required
              placeholder="jane@company.co.uk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500/60 text-sm transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-500 dark:text-white/35 block mb-1.5">Company name</label>
          <input
            type="text"
            required
            placeholder="Acme Ltd"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500/60 text-sm transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 dark:text-white/35 block mb-1.5">What are you trying to solve?</label>
          <textarea
            rows={4}
            required
            placeholder="e.g. We spend 4 hours every week pulling our management report together manually..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500/60 text-sm transition-colors resize-none"
          />
        </div>
        {status === "error" && (
          <p className="text-xs text-red-500">Something went wrong — please email us directly at contact@quantyxadvisory.com</p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition-colors text-sm shadow-sm"
        >
          {status === "sending" ? "Sending…" : "Book a free call"}
        </button>
        <p className="text-xs text-slate-400 dark:text-white/25 text-center">
          We respond within 3 business days.
        </p>
      </form>
    </div>
  );
}
