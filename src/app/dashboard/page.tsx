"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
  Bell,
  Settings,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const revenueData = [
  { month: "Oct", revenue: 42000, target: 38000 },
  { month: "Nov", revenue: 51000, target: 45000 },
  { month: "Dec", revenue: 67000, target: 55000 },
  { month: "Jan", revenue: 58000, target: 60000 },
  { month: "Feb", revenue: 72000, target: 65000 },
  { month: "Mar", revenue: 85000, target: 70000 },
  { month: "Apr", revenue: 91000, target: 80000 },
];

const channelData = [
  { name: "Mon", value: 3200 },
  { name: "Tue", value: 4100 },
  { name: "Wed", value: 3800 },
  { name: "Thu", value: 5200 },
  { name: "Fri", value: 6100 },
  { name: "Sat", value: 4700 },
  { name: "Sun", value: 3300 },
];

const trafficData = [
  { name: "Organic", value: 38, color: "#6366f1" },
  { name: "Paid", value: 27, color: "#8b5cf6" },
  { name: "Referral", value: 18, color: "#a78bfa" },
  { name: "Direct", value: 17, color: "#c4b5fd" },
];

const recentActivity = [
  { event: "New enterprise client signed", time: "2 min ago", type: "success" },
  { event: "Revenue target exceeded for Q1", time: "18 min ago", type: "success" },
  { event: "Automation pipeline completed", time: "1 hr ago", type: "info" },
  { event: "Dashboard report generated", time: "3 hrs ago", type: "info" },
  { event: "User churn detected – action needed", time: "5 hrs ago", type: "warning" },
];

const kpis = [
  {
    label: "Total Revenue",
    value: "$91,204",
    change: "+18.4%",
    up: true,
    icon: DollarSign,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    label: "Active Clients",
    value: "1,284",
    change: "+6.2%",
    up: true,
    icon: Users,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    label: "Conversions",
    value: "3,847",
    change: "+11.9%",
    up: true,
    icon: ShoppingCart,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    label: "Churn Rate",
    value: "2.1%",
    change: "-0.4%",
    up: false,
    icon: Activity,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#05050f] text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-56 border-r border-white/5 bg-[#08080f] flex flex-col z-40 hidden lg:flex">
        <div className="p-5 border-b border-white/5">
          <span className="font-bold gradient-text text-lg">Quantyx Advisory</span>
          <p className="text-xs text-white/30 mt-0.5">Analytics Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 text-sm">
          {[
            { label: "Overview", active: true },
            { label: "Revenue" },
            { label: "Clients" },
            { label: "Automations" },
            { label: "Reports" },
            { label: "Integrations" },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                item.active
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <ArrowLeft size={12} />
            Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-56">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 border-b border-white/5 bg-[#05050f]/80 backdrop-blur-md flex items-center justify-between px-6">
          <div>
            <h1 className="font-semibold">Overview</h1>
            <p className="text-xs text-white/30">April 2026 · Live data</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-white/40 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            </button>
            <button className="p-2 text-white/40 hover:text-white transition-colors">
              <Settings size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
              QA
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* KPI cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="p-5 rounded-2xl border border-white/8 bg-white/3 hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-white/40 uppercase tracking-wide">{kpi.label}</p>
                  <div className={`w-8 h-8 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                    <kpi.icon size={16} className={kpi.color} />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-1">{kpi.value}</p>
                <div className="flex items-center gap-1">
                  {kpi.up ? (
                    <TrendingUp size={13} className="text-green-400" />
                  ) : (
                    <TrendingDown size={13} className="text-rose-400" />
                  )}
                  <span className={`text-xs font-medium ${kpi.up ? "text-green-400" : "text-rose-400"}`}>
                    {kpi.change}
                  </span>
                  <span className="text-xs text-white/30">vs last month</span>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="p-6 rounded-2xl border border-white/8 bg-white/3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold">Revenue vs Target</h2>
                <p className="text-xs text-white/40">Last 7 months</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/20" />
                  Target
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
                />
                <Area type="monotone" dataKey="target" stroke="rgba(255,255,255,0.2)" strokeWidth={2} fill="none" strokeDasharray="4 4" />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bottom row */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Daily orders */}
            <div className="lg:col-span-2 p-6 rounded-2xl border border-white/8 bg-white/3">
              <h2 className="font-semibold mb-1">Daily Conversions</h2>
              <p className="text-xs text-white/40 mb-6">This week</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={channelData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Traffic sources */}
            <div className="p-6 rounded-2xl border border-white/8 bg-white/3">
              <h2 className="font-semibold mb-1">Traffic Sources</h2>
              <p className="text-xs text-white/40 mb-4">This month</p>
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
                    formatter={(value) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {trafficData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                      <span className="text-white/50">{d.name}</span>
                    </div>
                    <span className="font-medium">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="p-6 rounded-2xl border border-white/8 bg-white/3">
            <h2 className="font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        item.type === "success"
                          ? "bg-green-400"
                          : item.type === "warning"
                          ? "bg-amber-400"
                          : "bg-indigo-400"
                      }`}
                    />
                    <span className="text-sm text-white/80">{item.event}</span>
                  </div>
                  <span className="text-xs text-white/30 shrink-0 ml-4">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
