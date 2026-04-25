"use client";

import { useEffect, useState } from "react";

const KPIS = [
  { label: "Total Revenue",     value: "£10.57M", change: "+0.6%",  up: true,  color: "text-indigo-600 dark:text-indigo-400",  dot: "bg-indigo-500" },
  { label: "Gross Margin",      value: "60.8%",   change: "+0.3pp", up: true,  color: "text-violet-600 dark:text-violet-400",  dot: "bg-violet-500" },
  { label: "Staff Utilisation", value: "78.3%",   change: "+2pp",   up: true,  color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
];

const CHART = [62, 58, 65, 70, 68, 74, 72, 78];
const MIN = 55, MAX = 82;

function Spark({ values }: { values: number[] }) {
  const w = 120, h = 36;
  const pts = values.map((v, i) => ({
    x: (i / (values.length - 1)) * w,
    y: h - ((v - MIN) / (MAX - MIN)) * h,
  }));
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <path d={d} fill="none" stroke="rgba(99,102,241,0.7)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2.5" fill="#6366f1" />
    </svg>
  );
}

export function FloatingDashboard() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const dotOpacity = tick % 2 === 0 ? 1 : 0.4;

  return (
    <div className="animate-float select-none" style={{ transform: "rotate(-1deg)" }}>
      <div
        className="rounded-2xl overflow-hidden shadow-2xl dark:shadow-indigo-950/40"
        style={{
          background: "rgba(8,8,20,0.97)",
          border: "1px solid rgba(99,102,241,0.35)",
          boxShadow: "0 0 0 1px rgba(99,102,241,0.20), 0 32px 80px rgba(0,0,0,0.55), 0 0 60px rgba(99,102,241,0.12)",
          width: 420,
          maxWidth: "100%",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(99,102,241,0.06)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-indigo-500" style={{ boxShadow: "0 0 6px rgba(99,102,241,0.8)" }} />
            <span className="text-xs font-semibold text-white/80" style={{ letterSpacing: "0.02em" }}>
              Quantyx Operating Layer
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ opacity: dotOpacity, transition: "opacity 0.4s ease", boxShadow: "0 0 4px rgba(52,211,153,0.8)" }}
            />
            <span className="text-[10px] text-white/40">Live · 2 min ago</span>
          </div>
        </div>

        {/* KPI tiles */}
        <div className="p-4 space-y-2">
          {KPIS.map((kpi, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <div className="text-[10px] font-medium text-white/40 mb-0.5 uppercase tracking-wider">{kpi.label}</div>
                <div className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</div>
              </div>
              <div className="text-right">
                <div
                  className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    kpi.up
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}
                >
                  {kpi.up ? "↑" : "↓"} {kpi.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini chart */}
        <div className="px-4 pb-4">
          <div
            className="rounded-xl p-3"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Utilisation Trend</span>
              <span className="text-[10px] text-white/25">Last 8 weeks</span>
            </div>
            <Spark values={CHART} />
          </div>
        </div>
      </div>
    </div>
  );
}
