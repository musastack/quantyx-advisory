"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, AlertTriangle, Minus, Package, Database } from "lucide-react";
import type {
  InventoryCoDashboard,
  MonthlyRevenue,
  TopProduct,
  LowStockItem,
  KPISummary,
} from "@/lib/inventoryco";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */

function fmt(n: number) {
  return "£" + Math.round(n).toLocaleString("en-GB");
}

function pct(n: number) {
  return n.toFixed(1) + "%";
}

/* ─────────────────────────────────────────────
   CUSTOM TOOLTIP
───────────────────────────────────────────── */

function RevenueTooltip({ active, payload, label }: { active?: boolean; payload?: { value?: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0f0f1a] border border-white/10 rounded-xl px-4 py-3 text-sm shadow-xl">
      <p className="text-white/40 text-xs mb-2">{label}</p>
      <div className="space-y-1">
        <p className="text-white font-medium">
          Revenue: <span className="text-violet-300">{fmt(payload[0]?.value ?? 0)}</span>
        </p>
        <p className="text-white/60">
          Profit: <span className="text-emerald-400">{fmt(payload[1]?.value ?? 0)}</span>
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   KPI CARDS
───────────────────────────────────────────── */

function KPICard({
  label,
  value,
  sub,
  positive,
}: {
  label: string;
  value: string;
  sub: string;
  positive: boolean | null;
}) {
  return (
    <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#07070e] hover:bg-white/[0.03] transition-colors flex flex-col gap-3">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">{label}</p>
      <p className="text-4xl font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">{value}</p>
      <div className="flex items-center gap-1.5 mt-auto pt-1 border-t border-white/[0.06]">
        {positive === true  && <TrendingUp    size={11} className="text-emerald-400 shrink-0" />}
        {positive === false && <AlertTriangle size={11} className="text-amber-400   shrink-0" />}
        {positive === null  && <Minus         size={11} className="text-white/20    shrink-0" />}
        <span className={`text-xs ${
          positive === true  ? "text-emerald-400 font-medium" :
          positive === false ? "text-amber-400   font-medium" :
          "text-white/30"
        }`}>
          {sub}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */

export default function InsightLayer({ data }: { data: InventoryCoDashboard }) {
  const { kpis, monthlyRevenue, topProducts, lowStockItems, source } = data;

  const revenueGrowthPct =
    monthlyRevenue.length >= 2
      ? (((monthlyRevenue.at(-1)!.revenue - monthlyRevenue[0].revenue) /
          monthlyRevenue[0].revenue) *
          100).toFixed(0)
      : null;

  return (
    <div className="space-y-10">

      {/* Source badge */}
      <div className="flex items-center gap-2">
        <Database size={13} className={source === "supabase" ? "text-emerald-400" : "text-white/25"} />
        <span className={`text-xs font-medium ${source === "supabase" ? "text-emerald-400" : "text-white/25"}`}>
          {source === "supabase" ? "Live — Supabase" : "Demo — sample data"}
        </span>
      </div>

      {/* ── KPI grid ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total Revenue"
          value={fmt(kpis.totalRevenue)}
          sub={revenueGrowthPct ? `+${revenueGrowthPct}% over period` : "6-month total"}
          positive={true}
        />
        <KPICard
          label="Gross Profit"
          value={fmt(kpis.totalProfit)}
          sub={`${pct(kpis.grossMarginPct)} margin`}
          positive={true}
        />
        <KPICard
          label="Inventory Value"
          value={fmt(kpis.inventoryValue)}
          sub="at cost across all SKUs"
          positive={null}
        />
        <KPICard
          label="Low Stock Alerts"
          value={`${kpis.lowStockCount} SKUs`}
          sub="below reorder level"
          positive={kpis.lowStockCount === 0 ? null : false}
        />
      </div>

      {/* ── Insight blocks ── */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            tag: "Revenue insight",
            color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
            cardBorder: "border-violet-500/15 bg-violet-500/[0.04]",
            heading: "Growth is consistent but concentrated",
            body: "Revenue has grown across the period, primarily driven by the lighting category. That concentration creates risk that was previously invisible before data was centralised.",
          },
          {
            tag: "Margin insight",
            color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            cardBorder: "border-emerald-500/15 bg-emerald-500/[0.04]",
            heading: "High-revenue ≠ high-margin",
            body: `LED Panel Pro delivers ${pct(topProducts[0]?.margin_pct ?? 34)} gross margin — the strongest in the range — yet this was undetectable before financial and product data were joined in a single model.`,
          },
          {
            tag: "Stock insight",
            color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            cardBorder: "border-amber-500/15 bg-amber-500/[0.04]",
            heading: `${kpis.lowStockCount} SKU${kpis.lowStockCount === 1 ? "" : "s"} flagged as fulfilment risk`,
            body: "Items below reorder level are now flagged automatically via a threshold rule on the inventory table — surfaced days before they would have appeared in a manual end-of-week review.",
          },
        ].map((ins) => (
          <div key={ins.tag} className={`p-6 rounded-2xl border ${ins.cardBorder} flex flex-col gap-4`}>
            <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border self-start ${ins.color}`}>
              {ins.tag}
            </span>
            <p className="font-semibold text-sm leading-snug">{ins.heading}</p>
            <p className="text-xs text-white/45 leading-relaxed flex-1">{ins.body}</p>
          </div>
        ))}
      </div>

      {/* ── Revenue trend chart ── */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.025]">
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">
              Revenue trend
            </p>
            <p className="text-sm font-semibold">Monthly revenue & profit — Oct 2025 to Mar 2026</p>
            <p className="text-xs text-white/35 mt-1">Served from centralised data model. No manual assembly.</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/40 shrink-0">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-violet-500" />Revenue
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />Profit
            </span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}   />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`}
              width={42}
            />
            <Tooltip content={<RevenueTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="url(#revGrad)"
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#profGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Bottom row: top products + stock alerts ── */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Top products by profit */}
        <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">
              Product performance
            </p>
            <p className="text-sm font-semibold">Top products — gross profit</p>
          </div>
          <div className="space-y-5">
            {topProducts.map((p) => (
              <div key={p.product_name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <span className="text-sm font-medium">{p.product_name}</span>
                    <span className="text-xs text-white/25 ml-2">{p.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/30">{pct(p.margin_pct)}</span>
                    <span className="text-sm font-semibold text-white/70">{fmt(p.profit)}</span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/[0.06]">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all"
                    style={{ width: `${p.bar}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory alerts */}
        <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.025]">
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1">
              Inventory alerts
            </p>
            <p className="text-sm font-semibold">Auto-generated · below reorder level</p>
          </div>
          {lowStockItems.length === 0 ? (
            <div className="flex items-center gap-3 text-sm text-emerald-400 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07]">
              <Package size={14} />
              All products above reorder level
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockItems.map((a) => (
                <div
                  key={a.product_name}
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    a.severity === "critical"
                      ? "border-rose-500/20 bg-rose-500/[0.07]"
                      : "border-amber-500/20 bg-amber-500/[0.07]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <AlertTriangle
                      size={13}
                      className={a.severity === "critical" ? "text-rose-400" : "text-amber-400"}
                    />
                    <div>
                      <span className="text-sm font-medium">{a.product_name}</span>
                      <span className="text-xs text-white/30 ml-2">
                        {a.stock_level} / {a.reorder_level} units
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${
                    a.severity === "critical" ? "text-rose-400" : "text-amber-400"
                  }`}>
                    {a.severity === "critical" ? "Critical" : "Low stock"}
                  </span>
                </div>
              ))}
            </div>
          )}
          <p className="text-[11px] text-white/20 mt-5 leading-relaxed font-mono">
            WHERE stock_level &lt; reorder_level
          </p>
        </div>

      </div>
    </div>
  );
}
