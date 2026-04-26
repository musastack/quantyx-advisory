"use client";

import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, ComposedChart,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell, CartesianGrid, LineChart, Line,
} from "recharts";
import { Download, ChevronRight, ArrowUpRight, ArrowDownRight, SlidersHorizontal, Building2, Plus, X } from "lucide-react";
import Link from "next/link";
import RevenueTrendChart from "../components/RevenueTrendChart";

/* ═══════════════════════════════════════════════════════════
   MERIDIAN ADVISORY PARTNERS  ·  Q1 FY2025
═══════════════════════════════════════════════════════════ */

// 15 months Jan 24 → Mar 25
const monthly = [
  { m: "Jan 24", rev: 3120, ebitda: 24.1, budget: 3200 },
  { m: "Feb 24", rev: 3280, ebitda: 25.4, budget: 3300 },
  { m: "Mar 24", rev: 3490, ebitda: 26.8, budget: 3400 },
  { m: "Apr 24", rev: 3350, ebitda: 24.9, budget: 3500 },
  { m: "May 24", rev: 3620, ebitda: 27.2, budget: 3600 },
  { m: "Jun 24", rev: 3780, ebitda: 28.1, budget: 3700 },
  { m: "Jul 24", rev: 3690, ebitda: 27.0, budget: 3800 },
  { m: "Aug 24", rev: 3850, ebitda: 28.8, budget: 3900 },
  { m: "Sep 24", rev: 4040, ebitda: 29.4, budget: 4000 },
  { m: "Oct 24", rev: 4120, ebitda: 30.1, budget: 4100 },
  { m: "Nov 24", rev: 4250, ebitda: 31.0, budget: 4200 },
  { m: "Dec 24", rev: 4080, ebitda: 28.6, budget: 4300 },
  { m: "Jan 25", rev: 4190, ebitda: 30.4, budget: 4300 },
  { m: "Feb 25", rev: 4320, ebitda: 31.2, budget: 4400 },
  { m: "Mar 25", rev: 4490, ebitda: 32.1, budget: 4500 },
];

// Service lines
const services = [
  { name: "Corporate Restructuring", value: 18400, color: "#6366f1", pct: 31.8 },
  { name: "M&A Advisory",            value: 16200, color: "#8b5cf6", pct: 28.0 },
  { name: "Forensic & Disputes",     value: 11600, color: "#06b6d4", pct: 20.1 },
  { name: "PE Advisory",             value:  8100, color: "#10b981", pct: 14.0 },
  { name: "Valuations",              value:  3500, color: "#f59e0b", pct:  6.1 },
];

// Service line monthly (Apr 24 → Mar 25, £000)
const slMonthly = [
  { m: "Apr", restr: 560, ma: 480, forensic: 340, pe: 270, val: 110 },
  { m: "May", restr: 590, ma: 510, forensic: 360, pe: 285, val: 115 },
  { m: "Jun", restr: 620, ma: 540, forensic: 370, pe: 300, val: 120 },
  { m: "Jul", restr: 600, ma: 520, forensic: 355, pe: 290, val: 115 },
  { m: "Aug", restr: 640, ma: 550, forensic: 385, pe: 310, val: 125 },
  { m: "Sep", restr: 680, ma: 580, forensic: 405, pe: 330, val: 130 },
  { m: "Oct", restr: 700, ma: 600, forensic: 415, pe: 340, val: 135 },
  { m: "Nov", restr: 730, ma: 625, forensic: 430, pe: 355, val: 140 },
  { m: "Dec", restr: 710, ma: 600, forensic: 410, pe: 340, val: 135 },
  { m: "Jan", restr: 720, ma: 615, forensic: 425, pe: 345, val: 138 },
  { m: "Feb", restr: 745, ma: 640, forensic: 440, pe: 360, val: 142 },
  { m: "Mar", restr: 780, ma: 665, forensic: 460, pe: 375, val: 145 },
];

const yearlyAvg = Math.round(monthly.slice(3).reduce((s, d) => s + d.rev, 0) / 12); // Apr 24–Mar 25

// Top customers (YTD £000)
const topCustomers = [
  { name: "Apex Capital Group",     ytd: 4280, qtr: 1420, sector: "PE Advisory",   color: "#6366f1" },
  { name: "Meridian Holdings",      ytd: 3940, qtr: 1310, sector: "M&A Advisory",  color: "#8b5cf6" },
  { name: "Forsythe & Partners",    ytd: 3620, qtr: 1190, sector: "Restructuring", color: "#06b6d4" },
  { name: "Quanta Ventures",        ytd: 3180, qtr: 1050, sector: "PE Advisory",   color: "#10b981" },
  { name: "Blackmere Corp",         ytd: 2940, qtr:  980, sector: "M&A Advisory",  color: "#eab308" },
  { name: "Summit Infrastructure",  ytd: 2760, qtr:  920, sector: "Forensic",      color: "#f97316" },
  { name: "Clearwater Capital",     ytd: 2480, qtr:  830, sector: "Restructuring", color: "#a78bfa" },
  { name: "Ironstone Advisory",     ytd: 2210, qtr:  740, sector: "Valuations",    color: "#34d399" },
];

// Grades
const grades = [
  { grade: "Partner",  count: 18, target: 18, util: 61, targetUtil: 58, rate: 950 },
  { grade: "Director", count: 32, target: 34, util: 74, targetUtil: 70, rate: 680 },
  { grade: "Manager",  count: 51, target: 52, util: 79, targetUtil: 80, rate: 480 },
  { grade: "Analyst",  count: 41, target: 45, util: 82, targetUtil: 85, rate: 310 },
];

// Debtor aging buckets (£000)
const debtorBuckets = [
  { label: "Current  0–30d", short: "0–30d", value: 2840, color: "#22c55e", pct: 15.1 },
  { label: "31–60 days",     short: "31–60d", value: 4120, color: "#eab308", pct: 21.8 },
  { label: "61–90 days",     short: "61–90d", value: 3280, color: "#f97316", pct: 17.4 },
  { label: "91+ days",       short: "91+d",   value: 8640, color: "#ef4444", pct: 45.7 },
];

// Debtor aging trend (6 months, £000)
const debtorTrend = [
  { m: "Oct", d0: 2200, d31: 3800, d61: 3100, d91: 7200 },
  { m: "Nov", d0: 2400, d31: 3900, d61: 3200, d91: 7600 },
  { m: "Dec", d0: 2600, d31: 4000, d61: 3100, d91: 7900 },
  { m: "Jan", d0: 2700, d31: 4050, d61: 3200, d91: 8200 },
  { m: "Feb", d0: 2780, d31: 4100, d61: 3250, d91: 8400 },
  { m: "Mar", d0: 2840, d31: 4120, d61: 3280, d91: 8640 },
];

const totalDebtors = debtorBuckets.reduce((s, b) => s + b.value, 0); // £18,880k
const currentCash  = 9200; // £9.2M in £000

// P&L summary
const pl = [
  { label: "Revenue",          value: 4490, prev: 4320, pct: null,  isGross: false, isEbitda: false, isNet: false },
  { label: "Cost of Delivery", value: 1841, prev: 1793, pct: null,  isGross: false, isEbitda: false, isNet: false },
  { label: "Gross Profit",     value: 2649, prev: 2527, pct: 59.0,  isGross: true,  isEbitda: false, isNet: false },
  { label: "Staff & Benefits", value:  875, prev:  862, pct: null,  isGross: false, isEbitda: false, isNet: false },
  { label: "Overhead",         value:  333, prev:  328, pct: null,  isGross: false, isEbitda: false, isNet: false },
  { label: "EBITDA",           value: 1441, prev: 1337, pct: 32.1,  isGross: false, isEbitda: true,  isNet: false },
  { label: "D&A & Finance",    value:  178, prev:  175, pct: null,  isGross: false, isEbitda: false, isNet: false },
  { label: "Net Profit",       value: 1263, prev: 1162, pct: 28.1,  isGross: false, isEbitda: false, isNet: true  },
];

/* ─── Bank data ─────────────────────────────────────────── */
const bankAccounts = [
  { name: "Current Account", bank: "HSBC",     sort: "40-22-15", balance: 6840, prev: 6210, accent: "#6366f1" },
  { name: "Client Account",  bank: "Barclays",  sort: "20-58-63", balance: 1820, prev: 1950, accent: "#06b6d4" },
  { name: "Reserve Account", bank: "Lloyds",    sort: "30-96-87", balance:  540, prev:  540, accent: "#10b981" },
];
const totalBankBalance = bankAccounts.reduce((s, a) => s + a.balance, 0);

const cashTrend30 = [
  { d: "3 Mar",  bal: 7820 }, { d: "7 Mar",  bal: 7640 }, { d: "11 Mar", bal: 8190 },
  { d: "14 Mar", bal: 8050 }, { d: "18 Mar", bal: 8380 }, { d: "21 Mar", bal: 8760 },
  { d: "25 Mar", bal: 9100 }, { d: "28 Mar", bal: 9200 }, { d: "31 Mar", bal: 9200 },
];

const upcomingPayments = [
  { desc: "PAYE / NI — March Payroll",   due: "5 Apr",  amount: 487, color: "#8b5cf6" },
  { desc: "Spaces Group — Office Rent",  due: "7 Apr",  amount:  95, color: "#06b6d4" },
  { desc: "HMRC VAT — Q1 Return",        due: "7 Apr",  amount: 218, color: "#ef4444" },
  { desc: "Zurich — PI Insurance",       due: "15 Apr", amount:  44, color: "#f59e0b" },
  { desc: "Software Licences (bundle)",  due: "18 Apr", amount:  28, color: "#6366f1" },
];

/* ─── Creditor data ─────────────────────────────────────── */
const creditorBuckets = [
  { label: "Current  0–30d", short: "0–30d", value: 1240, color: "#22c55e", pct: 34.7 },
  { label: "31–60 days",     short: "31–60d", value:  890, color: "#eab308", pct: 24.9 },
  { label: "61–90 days",     short: "61–90d", value:  620, color: "#f97316", pct: 17.3 },
  { label: "91+ days",       short: "91+d",   value:  825, color: "#ef4444", pct: 23.1 },
];
const totalCreditors = creditorBuckets.reduce((s, b) => s + b.value, 0);

const creditorTrend = [
  { m: "Oct", c0: 1100, c31: 780, c61: 540, c91: 690 },
  { m: "Nov", c0: 1150, c31: 820, c61: 570, c91: 730 },
  { m: "Dec", c0: 1200, c31: 850, c61: 590, c91: 780 },
  { m: "Jan", c0: 1210, c31: 860, c61: 600, c91: 800 },
  { m: "Feb", c0: 1230, c31: 875, c61: 610, c91: 815 },
  { m: "Mar", c0: 1240, c31: 890, c61: 620, c91: 825 },
];

const topCreditors = [
  { name: "HMRC",               balance: 487, overdue:  0, nextDue: "7 Apr 25",  sector: "Tax Authority",  color: "#ef4444" },
  { name: "Spaces Group Ltd",    balance: 285, overdue:  0, nextDue: "7 Apr 25",  sector: "Property",       color: "#06b6d4" },
  { name: "Reed Consulting",     balance: 198, overdue: 65, nextDue: "15 Apr 25", sector: "Recruitment",    color: "#f97316" },
  { name: "Zurich Insurance",    balance: 144, overdue:  0, nextDue: "15 Apr 25", sector: "Insurance",      color: "#eab308" },
  { name: "Axiom Technology",    balance: 122, overdue: 44, nextDue: "30 Apr 25", sector: "Technology",     color: "#8b5cf6" },
  { name: "Clifford Chance LLP", balance:  98, overdue: 98, nextDue: "Overdue",   sector: "Legal",          color: "#f87171" },
];

/* ─── Fixed Asset data ──────────────────────────────────── */
type Asset = {
  id: number; name: string; category: string; purchaseDate: string;
  cost: number; usefulLife: number; depMethod: "straight-line" | "reducing-balance";
};

const CAT_COLORS: Record<string, string> = {
  "IT": "#6366f1", "Leasehold": "#06b6d4", "Plant & Equipment": "#f59e0b",
  "Furniture": "#10b981", "Vehicles": "#8b5cf6",
};
const ASSET_CATS = Object.keys(CAT_COLORS);

const DEMO_ASSETS: Asset[] = [
  { id: 1, name: "Dell Laptop Fleet (×28)",  category: "IT",               purchaseDate: "2023-04-01", cost:  56000, usefulLife: 3,  depMethod: "straight-line"    },
  { id: 2, name: "Cisco VOIP System",        category: "IT",               purchaseDate: "2022-10-01", cost:  18500, usefulLife: 5,  depMethod: "straight-line"    },
  { id: 3, name: "Office Fit-Out — Floor 4", category: "Leasehold",        purchaseDate: "2021-06-01", cost: 280000, usefulLife: 10, depMethod: "straight-line"    },
  { id: 4, name: "Boardroom AV System",      category: "Plant & Equipment", purchaseDate: "2023-01-01", cost:  24000, usefulLife: 5,  depMethod: "straight-line"    },
  { id: 5, name: "Reception Furniture",      category: "Furniture",        purchaseDate: "2021-06-01", cost:  42000, usefulLife: 8,  depMethod: "straight-line"    },
  { id: 6, name: "BMW 5 Series (×2)",        category: "Vehicles",         purchaseDate: "2024-01-01", cost:  88000, usefulLife: 4,  depMethod: "reducing-balance" },
];

/* ─── People department / office data ──────────────────── */
const deptBreakdown = [
  { name: "Corporate Restructuring", count: 42, util: 79, target: 78, color: "#6366f1" },
  { name: "M&A Advisory",            count: 38, util: 72, target: 75, color: "#8b5cf6" },
  { name: "Forensic & Disputes",     count: 28, util: 81, target: 80, color: "#06b6d4" },
  { name: "PE Advisory",             count: 24, util: 76, target: 75, color: "#10b981" },
  { name: "Valuations",              count: 10, util: 68, target: 70, color: "#f59e0b" },
];

const officeBreakdown = [
  { name: "London",     count: 98, util: 76, target: 76, color: "#6366f1" },
  { name: "Manchester", count: 28, util: 74, target: 73, color: "#8b5cf6" },
  { name: "Edinburgh",  count: 16, util: 72, target: 72, color: "#06b6d4" },
];

/* ─── FP&A nominal data ─────────────────────────────────── */
type FPANominal = {
  code: string; name: string; category: string; parentCode?: string;
  isHeader?: boolean; isRevenue?: boolean;
  actuals: number; budget: number; ytdActuals: number; ytdBudget: number;
};

const plNominals: FPANominal[] = [
  { code: "REV", name: "Revenue", category: "Revenue", isHeader: true, isRevenue: true, actuals: 4490, budget: 4500, ytdActuals: 12800, ytdBudget: 13200 },
  { code: "4000", name: "Corporate Restructuring", category: "Revenue", parentCode: "REV", isRevenue: true, actuals: 1620, budget: 1600, ytdActuals: 4540, ytdBudget: 4600 },
  { code: "4010", name: "M&A Advisory",            category: "Revenue", parentCode: "REV", isRevenue: true, actuals: 1380, budget: 1415, ytdActuals: 3920, ytdBudget: 4050 },
  { code: "4020", name: "Forensic & Disputes",     category: "Revenue", parentCode: "REV", isRevenue: true, actuals:  680, budget:  660, ytdActuals: 1940, ytdBudget: 1860 },
  { code: "4030", name: "PE Advisory",             category: "Revenue", parentCode: "REV", isRevenue: true, actuals:  520, budget:  555, ytdActuals: 1500, ytdBudget: 1590 },
  { code: "4040", name: "Valuations",              category: "Revenue", parentCode: "REV", isRevenue: true, actuals:  290, budget:  270, ytdActuals:  900, ytdBudget:  810 },
  { code: "COD", name: "Cost of Delivery", category: "Cost of Delivery", isHeader: true, actuals: 1841, budget: 1890, ytdActuals: 5060, ytdBudget: 5190 },
  { code: "5000", name: "Direct Staff Costs",    category: "Cost of Delivery", parentCode: "COD", actuals: 1420, budget: 1450, ytdActuals: 3920, ytdBudget: 4020 },
  { code: "5010", name: "Subcontractor Costs",   category: "Cost of Delivery", parentCode: "COD", actuals:  281, budget:  290, ytdActuals:  850, ytdBudget:  870 },
  { code: "5020", name: "Direct Disbursements",  category: "Cost of Delivery", parentCode: "COD", actuals:  140, budget:  150, ytdActuals:  290, ytdBudget:  300 },
  { code: "SAL", name: "Staff & Benefits", category: "Staff & Benefits", isHeader: true, actuals: 875, budget: 892, ytdActuals: 2534, ytdBudget: 2580 },
  { code: "6000", name: "Base Salaries",          category: "Staff & Benefits", parentCode: "SAL", actuals: 620, budget: 630, ytdActuals: 1800, ytdBudget: 1840 },
  { code: "6010", name: "Bonuses & Incentives",   category: "Staff & Benefits", parentCode: "SAL", actuals: 112, budget: 105, ytdActuals:  310, ytdBudget:  300 },
  { code: "6020", name: "Employer NI",            category: "Staff & Benefits", parentCode: "SAL", actuals:  88, budget: 102, ytdActuals:  260, ytdBudget:  290 },
  { code: "6030", name: "Pension Contributions",  category: "Staff & Benefits", parentCode: "SAL", actuals:  55, budget:  55, ytdActuals:  164, ytdBudget:  150 },
  { code: "OVH", name: "Overhead", category: "Overhead", isHeader: true, actuals: 333, budget: 344, ytdActuals: 949, ytdBudget: 1000 },
  { code: "7000", name: "Office Rent & Rates",     category: "Overhead", parentCode: "OVH", actuals:  95, budget:  95, ytdActuals: 285, ytdBudget:  285 },
  { code: "7010", name: "Software & Technology",   category: "Overhead", parentCode: "OVH", actuals:  58, budget:  62, ytdActuals: 168, ytdBudget:  182 },
  { code: "7020", name: "Professional Fees",       category: "Overhead", parentCode: "OVH", actuals:  48, budget:  50, ytdActuals: 138, ytdBudget:  145 },
  { code: "7030", name: "Marketing & BD",          category: "Overhead", parentCode: "OVH", actuals:  38, budget:  42, ytdActuals: 108, ytdBudget:  120 },
  { code: "7040", name: "Travel & Entertainment",  category: "Overhead", parentCode: "OVH", actuals:  52, budget:  50, ytdActuals: 148, ytdBudget:  148 },
  { code: "7050", name: "Other Overhead",          category: "Overhead", parentCode: "OVH", actuals:  42, budget:  45, ytdActuals: 102, ytdBudget:  120 },
];

const bsNominals: FPANominal[] = [
  { code: "CA",  name: "Current Assets",      category: "Assets",      isHeader: true, actuals: 34340, budget: 29550, ytdActuals: 34340, ytdBudget: 29550 },
  { code: "1000", name: "Cash & Bank",         category: "Assets", parentCode: "CA",  actuals:  9200, budget:  8500, ytdActuals:  9200, ytdBudget:  8500 },
  { code: "1100", name: "Trade Debtors",       category: "Assets", parentCode: "CA",  actuals: 18880, budget: 17000, ytdActuals: 18880, ytdBudget: 17000 },
  { code: "1200", name: "Work in Progress",    category: "Assets", parentCode: "CA",  actuals:  5800, budget:  3800, ytdActuals:  5800, ytdBudget:  3800 },
  { code: "1300", name: "Prepayments",         category: "Assets", parentCode: "CA",  actuals:   460, budget:   250, ytdActuals:   460, ytdBudget:   250 },
  { code: "FA",  name: "Fixed Assets (NBV)",  category: "Assets",      isHeader: true, actuals:   508, budget:   750, ytdActuals:   508, ytdBudget:   750 },
  { code: "2000", name: "Leasehold Improvements",category: "Assets", parentCode: "FA", actuals:  181, budget:   200, ytdActuals:   181, ytdBudget:   200 },
  { code: "2100", name: "IT Equipment",        category: "Assets", parentCode: "FA",  actuals:    95, budget:   110, ytdActuals:    95, ytdBudget:   110 },
  { code: "2200", name: "Plant & Equipment",   category: "Assets", parentCode: "FA",  actuals:   232, budget:   440, ytdActuals:   232, ytdBudget:   440 },
  { code: "CL",  name: "Current Liabilities", category: "Liabilities", isHeader: true, actuals:  3575, budget:  3280, ytdActuals:  3575, ytdBudget:  3280 },
  { code: "3000", name: "Trade Creditors",     category: "Liabilities", parentCode: "CL", actuals: 1240, budget: 1100, ytdActuals: 1240, ytdBudget: 1100 },
  { code: "3100", name: "PAYE & NI Liability", category: "Liabilities", parentCode: "CL", actuals:  487, budget:  450, ytdActuals:  487, ytdBudget:  450 },
  { code: "3200", name: "VAT Liability",       category: "Liabilities", parentCode: "CL", actuals:  898, budget:  860, ytdActuals:  898, ytdBudget:  860 },
  { code: "3300", name: "Accruals",            category: "Liabilities", parentCode: "CL", actuals:  550, budget:  450, ytdActuals:  550, ytdBudget:  450 },
  { code: "3400", name: "Deferred Revenue",    category: "Liabilities", parentCode: "CL", actuals:  400, budget:  420, ytdActuals:  400, ytdBudget:  420 },
  { code: "EQ",  name: "Equity",              category: "Equity",      isHeader: true, actuals: 31273, budget: 27020, ytdActuals: 31273, ytdBudget: 27020 },
  { code: "5000", name: "Share Capital",       category: "Equity", parentCode: "EQ",  actuals:   100, budget:   100, ytdActuals:   100, ytdBudget:   100 },
  { code: "5100", name: "Retained Earnings",   category: "Equity", parentCode: "EQ",  actuals: 31173, budget: 26920, ytdActuals: 31173, ytdBudget: 26920 },
];

const fpandaMonthly = [
  { m: "Oct", actual: 4120, budget: 4100 }, { m: "Nov", actual: 4250, budget: 4200 },
  { m: "Dec", actual: 4080, budget: 4300 }, { m: "Jan", actual: 4190, budget: 4300 },
  { m: "Feb", actual: 4320, budget: 4400 }, { m: "Mar", actual: 4490, budget: 4500 },
];

const WATERFALL_DATA = [
  { name: "Budget",        invisible: 0,    bar: 4500, color: "#6366f1", isTotal: true  },
  { name: "Restructuring", invisible: 4500, bar: 20,   color: "#22c55e", isTotal: false },
  { name: "M&A Advisory",  invisible: 4485, bar: 35,   color: "#ef4444", isTotal: false },
  { name: "Forensic",      invisible: 4485, bar: 20,   color: "#22c55e", isTotal: false },
  { name: "PE Advisory",   invisible: 4470, bar: 35,   color: "#ef4444", isTotal: false },
  { name: "Valuations",    invisible: 4470, bar: 20,   color: "#22c55e", isTotal: false },
  { name: "Actual",        invisible: 0,    bar: 4490, color: "#10b981", isTotal: true  },
];

function calcNBV(a: Asset) {
  const years = Math.max(0, (new Date("2025-03-31").getTime() - new Date(a.purchaseDate).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  if (a.depMethod === "straight-line") {
    const annual = a.cost / a.usefulLife;
    const accum  = Math.min(annual * years, a.cost);
    return { annual: Math.round(annual), accum: Math.round(accum), nbv: Math.round(a.cost - accum) };
  }
  const nbv   = a.cost * Math.pow(0.75, years);
  const accum = a.cost - nbv;
  return { annual: Math.round(nbv * 0.25), accum: Math.round(accum), nbv: Math.round(nbv) };
}

/* ═══════════════════════════════════════════════════════════
   ANIMATION
═══════════════════════════════════════════════════════════ */

function useCountUp(target: number, duration = 1600, delay = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    let r: number;
    t = setTimeout(() => {
      const s = Date.now();
      const tick = () => {
        const p = Math.min((Date.now() - s) / duration, 1);
        setV(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) r = requestAnimationFrame(tick); else setV(target);
      };
      r = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(r); };
  }, [target, duration, delay]);
  return v;
}

/* ═══════════════════════════════════════════════════════════
   PRIMITIVES
═══════════════════════════════════════════════════════════ */

// Donut with self-drawing animation
function Donut({ data, size = 180, sw = 24 }: {
  data: { value: number; color: string; label?: string }[];
  size?: number; sw?: number;
}) {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 200); return () => clearTimeout(t); }, []);
  const r = (size - sw) / 2, cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0);
  let cum = 0;
  const arcs = data.map(d => {
    const pct = d.value / total, start = cum;
    cum += pct;
    return { ...d, dash: pct * circ, offset: circ * (1 - start) };
  });
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={sw} />
      {arcs.map((a, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={a.color} strokeWidth={sw - 3} strokeLinecap="butt"
          strokeDasharray={go ? `${a.dash} ${circ - a.dash}` : `0 ${circ}`}
          strokeDashoffset={a.offset}
          style={{ transition: `stroke-dasharray 1s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s` }}
        />
      ))}
    </svg>
  );
}

// Utilisation bar with target tick marker
function UtilBar({ actual, target, color, delay = 0 }: {
  actual: number; target: number; color: string; delay?: number;
}) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(actual), 100 + delay); return () => clearTimeout(t); }, [actual, delay]);
  return (
    <div className="relative h-[8px] rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
      {/* Filled actual bar */}
      <div className="absolute inset-y-0 left-0 rounded-full"
        style={{ width: `${w}%`, background: color, transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}
      />
      {/* Target tick — white vertical line at exact target% position */}
      <div className="absolute top-[-5px] bottom-[-5px] w-[2px] rounded-full"
        style={{ left: `${target}%`, transform: "translateX(-50%)", background: "rgba(255,255,255,0.55)" }}
      />
    </div>
  );
}

// Half-donut gauge
function Gauge({ value, target, label }: { value: number; target: number; label: string }) {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 300); return () => clearTimeout(t); }, []);
  const r = 60, sw = 10, cx = 80, cy = 74;
  const clamp = (v: number) => Math.min(Math.max(v, 0), 100) / 100;
  const p = clamp(go ? value : 0), tp = clamp(target);
  const color = value >= target ? "#22c55e" : value >= target * 0.95 ? "#eab308" : "#ef4444";
  function arc(pct: number) { const a = Math.PI * (1 - pct); return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) }; }
  const L = arc(0), R = arc(1), F = arc(p), T = arc(tp);
  const big = p > 0.5 ? 1 : 0;
  const ang = Math.PI * (1 - tp);
  const r1 = r - sw / 2 - 6, r2 = r + sw / 2 + 6;
  return (
    <div className="flex flex-col items-center">
      <svg width={cx * 2} height={cy + sw + 6} className="overflow-visible">
        <path d={`M${L.x.toFixed(1)},${L.y.toFixed(1)} A${r},${r} 0 0,1 ${R.x.toFixed(1)},${R.y.toFixed(1)}`}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={sw} strokeLinecap="round" />
        {p > 0 && <path d={`M${L.x.toFixed(1)},${L.y.toFixed(1)} A${r},${r} 0 ${big},1 ${F.x.toFixed(1)},${F.y.toFixed(1)}`}
          fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s" }} />}
        <line x1={(cx + r1 * Math.cos(ang)).toFixed(1)} y1={(cy - r1 * Math.sin(ang)).toFixed(1)}
          x2={(cx + r2 * Math.cos(ang)).toFixed(1)} y2={(cy - r2 * Math.sin(ang)).toFixed(1)}
          stroke="rgba(255,255,255,0.85)" strokeWidth={3} strokeLinecap="round" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="22" fontWeight="900"
          fontFamily="ui-monospace,monospace" fill={color}>{value}%</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)"
          letterSpacing="0.1em" style={{ textTransform: "uppercase" }}>{label}</text>
      </svg>
      <p className="text-[10px] mt-1 tabular-nums" style={{ color: "rgba(255,255,255,0.3)" }}>
        Target <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>{target}%</span>
      </p>
    </div>
  );
}

// Chart tooltip
function Tip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 text-xs shadow-2xl" style={{ background: "#111127", border: "1px solid rgba(255,255,255,0.1)" }}>
      <p className="font-bold mb-2 text-white/40 tracking-widest uppercase text-[9px]">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-3 mb-0.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-white/50 text-[11px]">{p.name}</span>
          <span className="font-bold text-white ml-auto text-[11px]">
            {typeof p.value === "number" && p.value > 500
              ? `£${(p.value / 1000).toFixed(2)}M`
              : typeof p.value === "number" && p.value < 100
                ? `${p.value.toFixed(1)}%`
                : `£${p.value.toLocaleString()}k`}
          </span>
        </div>
      ))}
    </div>
  );
}

// Shared card shell
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
      {children}
    </div>
  );
}

// Pill tab selector
function Pills<T extends string>({ options, active, onChange, color = "#6366f1" }: {
  options: { id: T; label: string }[]; active: T; onChange: (id: T) => void; color?: string;
}) {
  return (
    <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
      {options.map(o => (
        <button key={o.id} onClick={() => onChange(o.id)}
          className="px-4 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150"
          style={active === o.id
            ? { background: color, color: "#fff", boxShadow: `0 0 12px ${color}40` }
            : { color: "rgba(255,255,255,0.35)" }}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

// Chart type toggle — reusable across sections
type CType = "area" | "line" | "bar";
function ChartTypeToggle({ type, setType }: { type: CType; setType: (t: CType) => void }) {
  const opts: { id: CType; icon: string }[] = [
    { id: "area", icon: "∿" }, { id: "line", icon: "—" }, { id: "bar", icon: "▊" },
  ];
  return (
    <div className="flex gap-1">
      {opts.map(o => (
        <button key={o.id} onClick={() => setType(o.id)}
          className="px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider transition-all"
          style={type === o.id
            ? { background: "rgba(99,102,241,0.18)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }
            : { color: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {o.icon}
        </button>
      ))}
    </div>
  );
}

// Mini sparkline — plain SVG, no axes, no dots
function Spark({ data, color = "#6ee7b7" }: { data: number[]; color?: string }) {
  if (data.length < 2) return null;
  const W = 64, H = 32, PAD = 2;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - PAD - ((v - min) / range) * (H - PAD * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg width={W} height={H} style={{ display: "block", overflow: "visible", flexShrink: 0 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// Per-metric progress visualisation
type ProgressConfig =
  | { type: "revenue"; actual: number; target: number; monthsElapsed: number }
  | { type: "margin";  actual: number; target: number; rangeMin: number; rangeMax: number }
  | { type: "cash";    actual: number; target: number }
  | { type: "lockup";  actual: number; ceiling: number; warnWithin: number };

function MetricProgress({ p }: { p: ProgressConfig }) {
  const track: React.CSSProperties = {
    position: "relative", height: 4, borderRadius: 2,
    background: "rgba(255,255,255,0.07)",
  };
  const labelL: React.CSSProperties = {
    fontSize: 9, fontWeight: 600, letterSpacing: "0.06em",
    textTransform: "uppercase", color: "rgba(255,255,255,0.22)",
  };
  const labelRow: React.CSSProperties = {
    display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6,
  };
  const bar = (pct: number, color: string): React.CSSProperties => ({
    height: "100%", width: `${Math.min(pct, 100)}%`, borderRadius: 2, background: color,
    transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
  });

  if (p.type === "revenue") {
    const fillPct = (p.actual / p.target) * 100;
    const pacePct = (p.monthsElapsed / 12) * 100;
    const diff    = fillPct - pacePct;
    const color   = diff >= 0 ? "#6ee7b7" : diff >= -3 ? "#f59e0b" : "#f87171";
    const note    = diff >= -3
      ? `on pace · ${fillPct.toFixed(1)}% of £${(p.target / 1000).toFixed(1)}M`
      : `behind · ${fillPct.toFixed(1)}% of £${(p.target / 1000).toFixed(1)}M`;
    return (
      <div>
        <div style={labelRow}>
          <span style={labelL}>Annual target £{(p.target / 1000).toFixed(1)}M</span>
          <span style={{ fontSize: 9, fontWeight: 700, color }}>{note}</span>
        </div>
        <div style={track}>
          <div style={bar(fillPct, color)} />
          {/* pace marker — shows where revenue should be today */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: `${pacePct}%`,
            width: 1.5, background: "rgba(255,255,255,0.45)", borderRadius: 1,
            transform: "translateX(-50%)",
          }} />
        </div>
      </div>
    );
  }

  if (p.type === "margin") {
    const range     = p.rangeMax - p.rangeMin;
    const targetPct = ((p.target - p.rangeMin) / range) * 100;
    const actualPct = Math.max(3, Math.min(((p.actual - p.rangeMin) / range) * 100, 97));
    const diff      = p.actual - p.target;
    const color     = diff >= 0 ? "#6ee7b7" : diff >= -1 ? "#f59e0b" : "#f87171";
    const note      = diff >= 0
      ? `+${diff.toFixed(1)}pp above target`
      : `${Math.abs(diff).toFixed(1)}pp below target`;
    return (
      <div>
        <div style={labelRow}>
          <span style={labelL}>Target {p.target}% &nbsp;·&nbsp; {p.rangeMin}–{p.rangeMax}% range</span>
          <span style={{ fontSize: 9, fontWeight: 700, color }}>{note}</span>
        </div>
        <div style={track}>
          {/* target tick */}
          <div style={{
            position: "absolute", top: -2, bottom: -2, left: `${targetPct}%`,
            width: 1, background: "rgba(255,255,255,0.3)", transform: "translateX(-50%)",
          }} />
          {/* current value dot */}
          <div style={{
            position: "absolute", top: "50%", left: `${actualPct}%`,
            width: 8, height: 8, borderRadius: "50%", background: color,
            transform: "translate(-50%, -50%)",
            transition: "left 1.2s cubic-bezier(0.16,1,0.3,1)",
            zIndex: 1,
          }} />
        </div>
      </div>
    );
  }

  if (p.type === "cash") {
    const above   = p.actual >= p.target;
    const fillPct = above ? 100 : (p.actual / p.target) * 100;
    const diff    = p.actual - p.target;
    const color   = above ? "#6ee7b7" : fillPct >= 80 ? "#f59e0b" : "#f87171";
    const note    = above
      ? `£${Math.abs(diff).toFixed(1)}M above target`
      : `£${Math.abs(diff).toFixed(1)}M below target`;
    return (
      <div>
        <div style={labelRow}>
          <span style={labelL}>Target £{p.target.toFixed(1)}M</span>
          <span style={{ fontSize: 9, fontWeight: 700, color }}>{note}</span>
        </div>
        <div style={track}>
          <div style={bar(fillPct, color)} />
        </div>
      </div>
    );
  }

  // lockup — inverted ceiling metric
  const breached    = p.actual >= p.ceiling;
  const nearCeiling = !breached && p.actual >= p.ceiling - p.warnWithin;
  const fillPct     = breached ? 100 : (p.actual / p.ceiling) * 100;
  const color       = breached ? "#f87171" : nearCeiling ? "#f59e0b" : "#6ee7b7";
  const remaining   = p.ceiling - p.actual;
  const note        = breached
    ? `${p.actual - p.ceiling}d over target`
    : nearCeiling ? `${remaining}d to target`
    : `${remaining}d below target`;
  return (
    <div>
      <div style={labelRow}>
        <span style={labelL}>Target {p.ceiling}d</span>
        <span style={{ fontSize: 9, fontWeight: 700, color }}>{note}</span>
      </div>
      <div style={track}>
        <div style={bar(fillPct, color)} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: OVERVIEW
═══════════════════════════════════════════════════════════ */
function Overview() {
  const [ebitdaType, setEbitdaType] = useState<CType>("area");
  const rev  = useCountUp(12800, 1600, 200);
  const marg = useCountUp(31.2,  1400, 400);
  const cash = useCountUp(9.2,   1400, 600);

  const kpis = [
    {
      label: "Q1 Revenue",    display: `£${(rev / 1000).toFixed(2)}M`,
      spark: monthly.slice(-3).map(d => d.rev),    sparkColor: "#6ee7b7",
      deltaQtr: "+18.4%",   upQtr: true,
      deltaBudget: "–3.0%", upBudget: false,
      progress: { type: "revenue" as const, actual: 12800, target: 57600, monthsElapsed: 3 },
    },
    {
      label: "EBITDA Margin", display: `${marg.toFixed(1)}%`,
      spark: monthly.slice(-3).map(d => d.ebitda), sparkColor: "#6ee7b7",
      deltaQtr: "+3.2pp",   upQtr: true,
      deltaBudget: "+2.2pp", upBudget: true,
      progress: { type: "margin" as const, actual: 32.1, target: 30.0, rangeMin: 20, rangeMax: 40 },
    },
    {
      label: "Cash",          display: `£${cash.toFixed(1)}M`,
      spark: [7.8, 8.4, 9.2],             sparkColor: "#6ee7b7",
      deltaQtr: "+£1.4M",   upQtr: true,
      deltaBudget: "+£0.7M", upBudget: true,
      progress: { type: "cash" as const, actual: 9.2, target: 8.5 },
    },
    {
      label: "Lockup Days",   display: "94d",
      spark: [100, 97, 94],               sparkColor: "#6ee7b7",
      deltaQtr: "–6d",       upQtr: true,
      deltaBudget: "+4d",    upBudget: false,
      progress: { type: "lockup" as const, actual: 94, ceiling: 90, warnWithin: 5 },
    },
  ];

  const signals = [
    { color: "#ef4444", text: "M&A pipeline coverage fell to 1.8× — target 2.5×. Review deal sourcing before end of April." },
    { color: "#eab308", text: "Analyst utilisation 82% vs 85% target for 3 consecutive months — capacity review needed." },
    { color: "#22c55e", text: "EBITDA 32.1% this month — highest in 15 months. Cost discipline to be sustained in Q2." },
  ];

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg,#0c0c24 0%,#12103a 50%,#080f2a 100%)" }}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(rgba(99,102,241,0.35) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative grid lg:grid-cols-2">
          <div className="p-10 lg:p-14">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-8"
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-300">Live · March 2025</span>
            </div>
            <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Q1 FY2025 Revenue</p>
            <p className="text-[4.5rem] font-black tracking-tight text-white leading-none tabular-nums">
              £{(rev / 1000).toFixed(2)}M
            </p>
            <div className="flex items-center gap-4 mt-5">
              <span className="text-emerald-400 font-bold text-lg flex items-center gap-1"><ArrowUpRight size={16} />+18.4% YoY</span>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>vs £10.8M Q1 FY24</span>
            </div>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>On track vs £57.6M annual target · 22.2% delivered</p>
          </div>
          <div className="px-10 py-14 flex flex-col justify-center gap-6">
            {[
              { label: "vs Prior Year",       value: "+44%",   note: "Q1 FY25 vs Q1 FY24",            color: "#6ee7b7" },
              { label: "vs Annual Budget",     value: "–£0.8M", note: "1.4% below annual budget pace",  color: "#f87171" },
              { label: "Annual Target Progress", value: "22.2%", note: "of £57.6M annual target",       color: "#a5b4fc" },
            ].map((s, i) => (
              <div key={i}>
                {i > 0 && <div className="mb-6 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />}
                <p className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>{s.label}</p>
                <p className="text-[2.2rem] font-black tabular-nums mt-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{s.note}</p>
                {i === 2 && (
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full" style={{ width: "22.2%", background: "#6366f1", transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <Card key={i} className="p-6 flex flex-col">
            {/* label */}
            <div className="flex items-start justify-between mb-3">
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>{k.label}</p>
            </div>
            {/* main value */}
            <p className="text-[2.2rem] font-black text-white tabular-nums leading-none mb-3">{k.display}</p>
            {/* dual delta */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className={`flex items-center gap-1 text-[13px] font-semibold ${k.upQtr ? "text-emerald-400" : "text-rose-400"}`}>
                {k.upQtr ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                <span>{k.deltaQtr}</span>
                <span className="text-[10px] font-normal ml-0.5" style={{ color: "rgba(255,255,255,0.22)" }}>qtr</span>
              </div>
              <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.1)", flexShrink: 0 }} />
              <div className="flex items-center gap-1 text-[13px] font-semibold" style={{ color: k.upBudget ? "#60a5fa" : "#f87171" }}>
                {k.upBudget ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                <span>{k.deltaBudget}</span>
                <span className="text-[10px] font-normal ml-0.5" style={{ color: "rgba(255,255,255,0.22)" }}>bud</span>
              </div>
            </div>
            {/* progress */}
            <div className="mt-auto">
              <MetricProgress p={k.progress} />
            </div>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 p-7">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>EBITDA Margin</p>
              <p className="text-white font-bold text-sm mt-0.5">15-month trend</p>
            </div>
            <div className="flex items-center gap-3">
              <ChartTypeToggle type={ebitdaType} setType={setEbitdaType} />
              <div className="text-right">
                <p className="text-[2rem] font-black text-white tabular-nums">32.1%</p>
                <p className="text-emerald-400 text-xs font-semibold">+3.2pp YoY</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            {ebitdaType === "bar" ? (
              <BarChart data={monthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 8 }} axisLine={false} tickLine={false} interval={2} />
                <YAxis domain={[22, 34]} tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} width={30} />
                <Tooltip content={<Tip />} />
                <ReferenceLine y={28} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <Bar dataKey="ebitda" fill="#22c55e" fillOpacity={0.8} radius={[3, 3, 0, 0]} name="EBITDA %" isAnimationActive animationDuration={900} />
              </BarChart>
            ) : ebitdaType === "line" ? (
              <LineChart data={monthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 8 }} axisLine={false} tickLine={false} interval={2} />
                <YAxis domain={[22, 34]} tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} width={30} />
                <Tooltip content={<Tip />} />
                <ReferenceLine y={28} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="ebitda" stroke="#22c55e" strokeWidth={2.5} dot={false} name="EBITDA %" isAnimationActive animationDuration={1200} />
              </LineChart>
            ) : (
              <AreaChart data={monthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="eG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 8 }} axisLine={false} tickLine={false} interval={2} />
                <YAxis domain={[22, 34]} tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} width={30} />
                <Tooltip content={<Tip />} />
                <ReferenceLine y={28} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <Area type="monotone" dataKey="ebitda" stroke="#22c55e" strokeWidth={2.5} fill="url(#eG)" dot={false} name="EBITDA %" isAnimationActive animationDuration={1400} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2 p-7">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Revenue Mix</p>
          <p className="text-white font-bold text-sm mb-6">YTD by practice</p>
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <Donut data={services} size={150} sw={20} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[9px] tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Total</p>
                <p className="text-[1rem] font-black text-white tabular-nums">£57.8M</p>
              </div>
            </div>
            <div className="w-full space-y-2">
              {services.map((s, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                  <span className="text-[11px] flex-1 truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{s.name}</span>
                  <span className="text-[11px] font-bold text-white tabular-nums">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Signals */}
      <Card>
        <div className="px-7 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Signals requiring attention</p>
        </div>
        {signals.map((s, i) => (
          <div key={i} className="flex items-start gap-4 px-7 py-4 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: s.color }} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>{s.text}</p>
            <ChevronRight size={14} className="shrink-0 mt-0.5" style={{ color: "rgba(255,255,255,0.15)" }} />
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: REVENUE
═══════════════════════════════════════════════════════════ */

function Revenue() {
  return (
    <div className="space-y-5">
      {/* Summary tiles */}
      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { label: "March Revenue",  value: "£4.49M", delta: "+£0.17M MoM",  note: "vs Feb 2025",       up: true,  accent: "#6366f1" },
          { label: "YTD vs Budget",  value: "–£0.8M", delta: "–1.4% miss",   note: "£57.8M vs £58.6M",  up: false, accent: "#ef4444" },
          { label: "Annual Avg/mo",  value: `£${(yearlyAvg / 1000).toFixed(2)}M`, delta: "+12.1% vs prior yr", note: "Apr 24–Mar 25", up: true, accent: "#22c55e" },
        ].map((c, i) => (
          <div key={i} className="rounded-2xl p-7 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: c.accent }} />
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{c.label}</p>
            <p className="text-[2.6rem] font-black text-white tabular-nums leading-none">{c.value}</p>
            <div className={`flex items-center gap-2 mt-3 font-semibold text-sm ${c.up ? "text-emerald-400" : "text-rose-400"}`}>
              {c.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {c.delta} <span className="font-normal text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>{c.note}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Budget vs Actuals | vs Annual Average */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Budget vs Actuals */}
        <Card className="lg:col-span-3 p-7">
          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Actual vs Budget</p>
            <p className="text-white font-bold text-sm mt-0.5">Monthly — Apr 24 to Mar 25</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={monthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false}
                tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={42} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="rev" radius={[4, 4, 0, 0]} name="Actual" isAnimationActive animationDuration={1000}>
                {monthly.map((d, i) => <Cell key={i} fill={d.rev >= d.budget ? "#6366f1" : "#ef4444"} fillOpacity={0.85} />)}
              </Bar>
              <Line type="monotone" dataKey="budget" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5}
                strokeDasharray="5 3" dot={false} name="Budget" isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-3 justify-end">
            {[{ color: "#6366f1", l: "Above budget" }, { color: "#ef4444", l: "Below budget" }, { color: "rgba(255,255,255,0.3)", l: "Budget line" }].map(lg => (
              <div key={lg.l} className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: lg.color }} />{lg.l}
              </div>
            ))}
          </div>
        </Card>

        {/* vs Annual Average */}
        <Card className="lg:col-span-2 p-7">
          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>vs Annual Average</p>
            <p className="text-white font-bold text-sm mt-0.5">Avg £{(yearlyAvg / 1000).toFixed(2)}M/mo</p>
          </div>
          <ResponsiveContainer width="100%" height={148}>
            <AreaChart data={monthly.slice(3)} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="avgG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 8 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 8 }} axisLine={false} tickLine={false}
                tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={38} />
              <Tooltip content={<Tip />} />
              <ReferenceLine y={yearlyAvg} stroke="rgba(255,255,255,0.3)" strokeDasharray="5 3" strokeWidth={1.5} />
              <Area type="monotone" dataKey="rev" stroke="#6366f1" strokeWidth={2.5} fill="url(#avgG)"
                dot={{ fill: "#6366f1", r: 2.5, strokeWidth: 0 }} name="Revenue" isAnimationActive animationDuration={1200} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {monthly.slice(3).slice(-6).map((d, i) => {
              const diff = d.rev - yearlyAvg;
              return (
                <div key={i} className="rounded-lg p-2 text-center" style={{ background: diff >= 0 ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)" }}>
                  <p className="text-[8px] mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{d.m}</p>
                  <p className={`text-[10px] font-bold tabular-nums ${diff >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {diff >= 0 ? "+" : ""}£{Math.round(diff / 100) / 10}M
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Row 2: By Service Line | Top Customers */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Service Line Breakdown */}
        <Card className="lg:col-span-3 p-7">
          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Revenue by Service Line</p>
            <p className="text-white font-bold text-sm mt-0.5">Monthly contribution — Apr 24 to Mar 25</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={slMonthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false}
                tickFormatter={v => `£${v}k`} width={42} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="restr"    stackId="a" fill="#6366f1" fillOpacity={0.9} name="Restructuring" isAnimationActive animationDuration={900} />
              <Bar dataKey="ma"       stackId="a" fill="#8b5cf6" fillOpacity={0.9} name="M&A Advisory"  isAnimationActive animationDuration={900} />
              <Bar dataKey="forensic" stackId="a" fill="#06b6d4" fillOpacity={0.9} name="Forensic"      isAnimationActive animationDuration={900} />
              <Bar dataKey="pe"       stackId="a" fill="#10b981" fillOpacity={0.9} name="PE Advisory"   isAnimationActive animationDuration={900} />
              <Bar dataKey="val"      stackId="a" fill="#f59e0b" fillOpacity={0.9} name="Valuations"    isAnimationActive animationDuration={900} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-3">
            {services.map(s => (
              <div key={s.name} className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />{s.name}
              </div>
            ))}
          </div>
        </Card>

        {/* Top Customers */}
        <Card className="lg:col-span-2 p-7">
          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Top Clients</p>
            <p className="text-white font-bold text-sm mt-0.5">YTD revenue — £000s</p>
          </div>
          <div className="space-y-4">
            {topCustomers.map((c, i) => {
              const maxYtd = topCustomers[0].ytd;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <p className="text-[11px] font-semibold text-white truncate max-w-[140px]">{c.name}</p>
                      <p className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{c.sector}</p>
                    </div>
                    <p className="text-[12px] font-black text-white tabular-nums shrink-0">£{(c.ytd / 1000).toFixed(1)}M</p>
                  </div>
                  <div className="space-y-1">
                    <div className="relative h-[6px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${(c.ytd / maxYtd) * 100}%`, background: c.color, opacity: 0.9,
                          transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms` }} />
                    </div>
                    <div className="relative h-[3px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div className="absolute inset-y-0 left-0 rounded-full"
                        style={{ width: `${(c.qtr / maxYtd) * 100}%`, background: c.color, opacity: 0.35,
                          transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 60 + 100}ms` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-1.5 text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              <div className="w-2 h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.5)" }} /> YTD
            </div>
            <div className="flex items-center gap-1.5 text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              <div className="w-2 h-1 rounded-sm" style={{ background: "rgba(255,255,255,0.25)" }} /> Q1 only
            </div>
          </div>
        </Card>
      </div>

      {/* P&L table */}
      <Card className="overflow-hidden">
        <div className="px-7 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>P&L Summary</p>
          <p className="text-white font-bold text-sm mt-0.5">March 2025</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {["", "Current", "Prior Month", "Margin", "MoM"].map(h => (
                <th key={h} className={`px-7 py-3 text-[9px] font-bold tracking-widest uppercase ${h === "" ? "text-left" : "text-right"}`}
                  style={{ color: "rgba(255,255,255,0.2)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pl.map((row, i) => {
              const mom = ((row.value - row.prev) / row.prev) * 100;
              const spec = row.isGross || row.isEbitda || row.isNet;
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.035)", background: spec ? "rgba(255,255,255,0.025)" : undefined }}>
                  <td className={`px-7 py-3.5 ${spec ? "font-bold text-white" : "font-medium"}`}
                    style={{ color: spec ? undefined : "rgba(255,255,255,0.5)" }}>{row.label}</td>
                  <td className="px-7 py-3.5 text-right tabular-nums font-bold text-white">£{row.value.toLocaleString()}k</td>
                  <td className="px-7 py-3.5 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.3)" }}>£{row.prev.toLocaleString()}k</td>
                  <td className="px-7 py-3.5 text-right tabular-nums font-semibold" style={{ color: row.pct ? "#6366f1" : "rgba(255,255,255,0.15)" }}>
                    {row.pct ? `${row.pct}%` : "—"}
                  </td>
                  <td className={`px-7 py-3.5 text-right tabular-nums font-semibold ${mom >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {mom >= 0 ? "+" : ""}{mom.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: PEOPLE
═══════════════════════════════════════════════════════════ */

function People() {
  const [hcType,     setHcType]     = useState<CType>("area");
  const [filterView, setFilterView] = useState<"grade" | "dept" | "office">("grade");

  type BreakdownItem = { name: string; count: number; util: number; target: number; color: string };
  const breakdownData: BreakdownItem[] =
    filterView === "grade"  ? grades.map(g => ({ name: g.grade, count: g.count, util: g.util, target: g.targetUtil, color: g.util >= g.targetUtil ? "#22c55e" : "#ef4444" })) :
    filterView === "dept"   ? deptBreakdown :
    officeBreakdown;

  const avgUtil = breakdownData.reduce((s, g) => s + g.util, 0) / breakdownData.length;
  const avgTgt  = breakdownData.reduce((s, g) => s + g.target, 0) / breakdownData.length;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Headcount", value: "142",    delta: "+8 this quarter", up: true  },
          { label: "Fee Earners",     value: "108",    delta: "+5 this quarter", up: true  },
          { label: "Revenue / FTE",   value: "£29.3k", delta: "+£3.1k MoM",      up: true  },
        ].map((k, i) => (
          <Card key={i} className="p-7">
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{k.label}</p>
            <p className="text-[2.4rem] font-black text-white tabular-nums leading-none">{k.value}</p>
            <p className="mt-2 text-sm font-semibold text-emerald-400 flex items-center gap-1"><ArrowUpRight size={13} />{k.delta}</p>
          </Card>
        ))}
      </div>

      {/* Filter toggle */}
      <div className="flex items-center gap-3">
        <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>View by:</span>
        <div className="flex gap-1.5">
          {([["grade", "Grade"], ["dept", "Department"], ["office", "Office"]] as const).map(([id, label]) => (
            <button key={id} onClick={() => setFilterView(id)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all"
              style={filterView === id
                ? { background: "rgba(99,102,241,0.2)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.35)" }
                : { color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Gauge + util bars */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-8 flex flex-col items-center">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-6 self-start" style={{ color: "rgba(255,255,255,0.3)" }}>Average Utilisation</p>
          <Gauge value={parseFloat(avgUtil.toFixed(1))} target={parseFloat(avgTgt.toFixed(1))} label="avg utilisation" />
          <div className="mt-5 grid grid-cols-2 gap-3 w-full">
            {[
              { label: "Above target", grades: grades.filter(g => g.util >= g.targetUtil), color: "#22c55e" },
              { label: "Below target", grades: grades.filter(g => g.util < g.targetUtil),  color: "#ef4444" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-3" style={{ background: `${s.color}12`, border: `1px solid ${s.color}20` }}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{s.label}</p>
                  <p className="text-[1.3rem] font-black tabular-nums" style={{ color: s.color }}>{s.grades.length}</p>
                </div>
                <div className="space-y-0.5">
                  {s.grades.map(g => {
                    const diff = g.util - g.targetUtil;
                    return (
                      <div key={g.grade} className="flex items-center justify-between">
                        <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>{g.grade}</span>
                        <span className="text-[9px] font-bold tabular-nums" style={{ color: s.color }}>
                          {diff >= 0 ? "+" : ""}{diff}pp
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Utilisation by {filterView === "grade" ? "Grade" : filterView === "dept" ? "Department" : "Office"}</p>
          <p className="text-white/40 text-[10px] mb-6">Bar shows actual · white line = target</p>
          <div className="space-y-8">
            {breakdownData.map((g, i) => {
              const color = g.util >= g.target ? "#22c55e" : g.util >= g.target * 0.97 ? "#eab308" : "#ef4444";
              const diff  = g.util - g.target;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-sm font-semibold text-white">{g.name}</span>
                      {filterView !== "grade" && (
                        <span className="ml-2 text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>{g.count} headcount</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>target {g.target}%</span>
                      <span className="text-sm font-black tabular-nums" style={{ color }}>{g.util}%</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${diff >= 0 ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"}`}>
                        {diff >= 0 ? "+" : ""}{diff}pp
                      </span>
                    </div>
                  </div>
                  <UtilBar actual={g.util} target={g.target} color={color} delay={i * 90} />
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            White tick mark = target threshold
          </p>
        </Card>
      </div>

      {/* Headcount trend + grade table */}
      <div className="grid lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 p-7">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Headcount Trend</p>
            <ChartTypeToggle type={hcType} setType={setHcType} />
          </div>
          <p className="text-white font-bold text-sm mb-6">Last 6 months</p>
          {(() => {
            const hcData = [{m:"Oct",hc:128},{m:"Nov",hc:131},{m:"Dec",hc:130},{m:"Jan",hc:134},{m:"Feb",hc:138},{m:"Mar",hc:142}];
            const common = { margin: { top: 5, right: 5, bottom: 0, left: 0 } };
            const axes = <>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis domain={[120, 150]} tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<Tip />} />
            </>;
            return (
              <ResponsiveContainer width="100%" height={180}>
                {hcType === "bar" ? (
                  <BarChart data={hcData} {...common}>
                    {axes}
                    <Bar dataKey="hc" fill="#8b5cf6" fillOpacity={0.8} radius={[3,3,0,0]} name="Headcount" isAnimationActive animationDuration={900} />
                  </BarChart>
                ) : hcType === "line" ? (
                  <LineChart data={hcData} {...common}>
                    {axes}
                    <Line type="monotone" dataKey="hc" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 3, strokeWidth: 0 }} name="Headcount" isAnimationActive animationDuration={1200} />
                  </LineChart>
                ) : (
                  <AreaChart data={hcData} {...common}>
                    <defs>
                      <linearGradient id="hcG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    {axes}
                    <Area type="monotone" dataKey="hc" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#hcG)" dot={{ fill: "#8b5cf6", r: 3, strokeWidth: 0 }} name="Headcount" isAnimationActive animationDuration={1200} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            );
          })()}
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <div className="px-7 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Grade Breakdown</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {["Grade", "Count", "Tgt", "Rate/hr"].map(h => (
                  <th key={h} className={`px-5 py-3 text-[9px] font-bold tracking-widest uppercase ${h === "Grade" ? "text-left" : "text-right"}`}
                    style={{ color: "rgba(255,255,255,0.2)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td className="px-5 py-3.5 font-semibold text-white">{g.grade}</td>
                  <td className={`px-5 py-3.5 text-right font-bold tabular-nums ${g.count >= g.target ? "text-emerald-400" : "text-rose-400"}`}>{g.count}</td>
                  <td className="px-5 py-3.5 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.3)" }}>{g.target}</td>
                  <td className="px-5 py-3.5 text-right tabular-nums font-mono" style={{ color: "rgba(255,255,255,0.5)" }}>£{g.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: DEBTORS
═══════════════════════════════════════════════════════════ */

function Debtors() {
  // Forecast sliders
  const [recovery91, setRecovery91]       = useState(25);   // % of 91+ recovered
  const [lockupReduction, setLockupReduction] = useState(14); // days to reduce lockup (0–34)
  const [accel3190, setAccel3190]         = useState(20);   // % of 31-90d accelerated

  // Cash freed calculations
  const currentLockup  = 94;
  const monthlyRev     = 4490;
  const lockupTarget   = currentLockup - lockupReduction;    // derived: e.g. 94 - 14 = 80
  const cashFrom91     = Math.round(debtorBuckets[3].value * recovery91 / 100);
  const cashFromLockup = Math.round((lockupReduction / 30) * monthlyRev);
  const cashFrom3190   = Math.round((debtorBuckets[1].value + debtorBuckets[2].value) * accel3190 / 100);
  const totalFreed     = cashFrom91 + cashFromLockup + cashFrom3190;
  const projectedCash  = currentCash + totalFreed;

  return (
    <div className="space-y-5">
      {/* Header stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Debtors",   value: `£${(totalDebtors / 1000).toFixed(1)}M`, delta: "+£0.6M MoM", up: false, accent: "#ef4444" },
          { label: "91+ Days",        value: "£8.64M",  delta: "+£0.24M MoM",  up: false, accent: "#ef4444" },
          { label: "Lockup Days",     value: "94d",     delta: "+4d vs target", up: false, accent: "#eab308" },
          { label: "Current Cash",    value: "£9.20M",  delta: "+£1.4M QoQ",   up: true,  accent: "#22c55e" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: s.accent }} />
            <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>{s.label}</p>
            <p className="text-[1.9rem] font-black text-white tabular-nums leading-none">{s.value}</p>
            <div className={`flex items-center gap-1 mt-2 text-[11px] font-semibold ${s.up ? "text-emerald-400" : "text-rose-400"}`}>
              {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Aging breakdown + trend */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Donut + legend */}
        <Card className="lg:col-span-2 p-7">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Debtor Aging Mix</p>
          <p className="text-white font-bold text-sm mb-6">March 2025</p>
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <Donut data={debtorBuckets} size={170} sw={22} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[9px] tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Total</p>
                <p className="text-[1.1rem] font-black text-white tabular-nums">£{(totalDebtors / 1000).toFixed(1)}M</p>
              </div>
            </div>
            <div className="w-full space-y-3">
              {debtorBuckets.map((b, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: b.color }} />
                      <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{b.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-white tabular-nums">£{(b.value / 1000).toFixed(1)}M</span>
                      <span className="text-[10px] tabular-nums w-10 text-right" style={{ color: "rgba(255,255,255,0.3)" }}>{b.pct}%</span>
                    </div>
                  </div>
                  <div className="relative h-[4px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${b.pct}%`, background: b.color, opacity: 0.75,
                        transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Aging trend stacked bar */}
        <Card className="lg:col-span-3 p-7">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Aging Trend</p>
          <p className="text-white font-bold text-sm mb-6">6-month view — Oct 24 to Mar 25</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={debtorTrend} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false}
                tickFormatter={v => `£${(v / 1000).toFixed(0)}M`} width={36} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="d0"  stackId="a" fill="#22c55e" fillOpacity={0.85} name="0–30d"  isAnimationActive animationDuration={900} />
              <Bar dataKey="d31" stackId="a" fill="#eab308" fillOpacity={0.85} name="31–60d" isAnimationActive animationDuration={900} />
              <Bar dataKey="d61" stackId="a" fill="#f97316" fillOpacity={0.85} name="61–90d" isAnimationActive animationDuration={900} />
              <Bar dataKey="d91" stackId="a" fill="#ef4444" fillOpacity={0.9}  name="91+d"   isAnimationActive animationDuration={900} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 flex-wrap">
            {[{ color: "#22c55e", l: "0–30d" }, { color: "#eab308", l: "31–60d" }, { color: "#f97316", l: "61–90d" }, { color: "#ef4444", l: "91+d" }].map(lg => (
              <div key={lg.l} className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: lg.color }} />{lg.l}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Cash Forecast Tool */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="px-7 py-5 border-b flex items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <SlidersHorizontal size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Cash Forecast Tool</p>
            <p className="text-white font-bold text-sm mt-0.5">Adjust levers to see potential cash released</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 divide-x" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {/* Sliders */}
          <div className="p-7 space-y-8">
            {/* Slider 1 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-white">Recover 91+ day debtors</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Current 91+ balance: £8.64M</p>
                </div>
                <span className="text-lg font-black tabular-nums" style={{ color: "#ef4444" }}>{recovery91}%</span>
              </div>
              <input type="range" min={0} max={80} value={recovery91} onChange={e => setRecovery91(+e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#ef4444", background: `linear-gradient(to right, #ef4444 ${recovery91/80*100}%, rgba(255,255,255,0.1) ${recovery91/80*100}%)` }}
              />
              <div className="flex justify-between text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                <span>0%</span><span>80%</span>
              </div>
              <p className="mt-2 text-[11px] font-semibold text-emerald-400">
                +£{(cashFrom91 / 1000).toFixed(2)}M freed
              </p>
            </div>

            {/* Slider 2 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-white">Reduce lockup days</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Current: 94d · target: {lockupTarget}d · each day ≈ £{Math.round(monthlyRev / 30)}k</p>
                </div>
                <span className="text-lg font-black tabular-nums" style={{ color: "#eab308" }}>–{lockupReduction}d</span>
              </div>
              <input type="range" min={0} max={34} value={lockupReduction} onChange={e => setLockupReduction(+e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#eab308", background: `linear-gradient(to right, #eab308 ${lockupReduction / 34 * 100}%, rgba(255,255,255,0.1) ${lockupReduction / 34 * 100}%)` }}
              />
              <div className="flex justify-between text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                <span>0 days (no change)</span><span>34 days (max)</span>
              </div>
              <p className="mt-2 text-[11px] font-semibold text-emerald-400">
                +£{(cashFromLockup / 1000).toFixed(2)}M freed ({lockupReduction} day improvement → target {lockupTarget}d)
              </p>
            </div>

            {/* Slider 3 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-semibold text-white">Accelerate 31–90 day collection</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>31–90d balance: £{((debtorBuckets[1].value + debtorBuckets[2].value) / 1000).toFixed(1)}M</p>
                </div>
                <span className="text-lg font-black tabular-nums" style={{ color: "#f97316" }}>{accel3190}%</span>
              </div>
              <input type="range" min={0} max={60} value={accel3190} onChange={e => setAccel3190(+e.target.value)}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: "#f97316", background: `linear-gradient(to right, #f97316 ${accel3190/60*100}%, rgba(255,255,255,0.1) ${accel3190/60*100}%)` }}
              />
              <div className="flex justify-between text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                <span>0%</span><span>60%</span>
              </div>
              <p className="mt-2 text-[11px] font-semibold text-emerald-400">
                +£{(cashFrom3190 / 1000).toFixed(2)}M freed
              </p>
            </div>
          </div>

          {/* Result panel */}
          <div className="p-7 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>Projected outcome</p>

              <div className="space-y-4 mb-8">
                {[
                  { label: "Current Cash Position",      value: `£${(currentCash / 1000).toFixed(2)}M`,     color: "rgba(255,255,255,0.4)" },
                  { label: "91+ Recovery",               value: `+£${(cashFrom91 / 1000).toFixed(2)}M`,     color: "#ef4444" },
                  { label: "Lockup Improvement",         value: `+£${(cashFromLockup / 1000).toFixed(2)}M`, color: "#eab308" },
                  { label: "31–90d Acceleration",        value: `+£${(cashFrom3190 / 1000).toFixed(2)}M`,   color: "#f97316" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{r.label}</span>
                    <span className="text-sm font-bold tabular-nums" style={{ color: r.color }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Big result */}
            <div className="rounded-2xl p-6 text-center" style={{ background: totalFreed > 0 ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${totalFreed > 0 ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.07)"}` }}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Total Cash Released</p>
              <p className="text-[2.8rem] font-black tabular-nums text-emerald-400 leading-none">
                +£{(totalFreed / 1000).toFixed(2)}M
              </p>
              <div className="mt-3 pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <p className="text-[10px] mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Projected cash balance</p>
                <p className="text-[1.6rem] font-black tabular-nums text-white">
                  £{(projectedCash / 1000).toFixed(2)}M
                </p>
                <p className="text-emerald-400 text-xs font-semibold mt-1">
                  vs £{(currentCash / 1000).toFixed(1)}M today
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: BANK
═══════════════════════════════════════════════════════════ */
function Bank() {
  const [cashChartType, setCashChartType] = useState<CType>("area");
  const totalUpcoming = upcomingPayments.reduce((s, p) => s + p.amount, 0);
  const runwayMonths  = (totalBankBalance / (333 + 875)).toFixed(1);

  const cashAxes = (
    <>
      <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
      <XAxis dataKey="d" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 8 }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false}
        tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={40} />
      <Tooltip content={<Tip />} />
    </>
  );

  return (
    <div className="space-y-5">
      {/* Account cards */}
      <div className="grid grid-cols-3 gap-4">
        {bankAccounts.map((a, i) => {
          const diff = a.balance - a.prev;
          const up   = diff >= 0;
          return (
            <div key={i} className="rounded-2xl p-7 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: a.accent }} />
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>{a.name}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>{a.bank} · Sort {a.sort}</p>
                </div>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${a.accent}18` }}>
                  <Building2 size={14} style={{ color: a.accent }} />
                </div>
              </div>
              <p className="text-[2.2rem] font-black text-white tabular-nums leading-none">
                £{(a.balance / 1000).toFixed(2)}M
              </p>
              <div className={`flex items-center gap-1 mt-2 text-[11px] font-semibold ${up ? "text-emerald-400" : "text-rose-400"}`}>
                {up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                £{Math.abs(diff).toLocaleString()}k MoM
              </div>
              <p className="text-[9px] mt-2" style={{ color: "rgba(255,255,255,0.2)" }}>Reconciled 31 Mar 2025</p>
            </div>
          );
        })}
      </div>

      {/* Cash trend + upcoming */}
      <div className="grid lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 p-7">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Combined Balance</p>
              <p className="text-white font-bold text-sm mt-0.5">30-day movement — March 2025</p>
            </div>
            <ChartTypeToggle type={cashChartType} setType={setCashChartType} />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            {cashChartType === "bar" ? (
              <BarChart data={cashTrend30} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                {cashAxes}
                <Bar dataKey="bal" fill="#6366f1" fillOpacity={0.8} radius={[3,3,0,0]} name="Balance" isAnimationActive animationDuration={900} />
              </BarChart>
            ) : cashChartType === "line" ? (
              <LineChart data={cashTrend30} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                {cashAxes}
                <Line type="monotone" dataKey="bal" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }} name="Balance" isAnimationActive animationDuration={1200} />
              </LineChart>
            ) : (
              <AreaChart data={cashTrend30} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="bankG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                {cashAxes}
                <Area type="monotone" dataKey="bal" stroke="#6366f1" strokeWidth={2.5} fill="url(#bankG)"
                  dot={{ fill: "#6366f1", r: 2.5, strokeWidth: 0 }} name="Balance" isAnimationActive animationDuration={1200} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2 p-7">
          <div className="mb-5">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Upcoming Payments</p>
            <p className="text-white font-bold text-sm mt-0.5">Next 30 days · £{(totalUpcoming / 1000).toFixed(3)}M total</p>
          </div>
          <div className="space-y-1">
            {upcomingPayments.map((p, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-white truncate">{p.desc}</p>
                  <p className="text-[9px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Due {p.due}</p>
                </div>
                <p className="text-sm font-bold tabular-nums shrink-0" style={{ color: p.color }}>–£{p.amount}k</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Cash",    value: `£${(totalBankBalance / 1000).toFixed(2)}M`, note: "Combined across all accounts", color: "#6366f1" },
          { label: "Cash Runway",   value: `${runwayMonths} months`,                     note: "At current overhead rate",     color: "#10b981" },
          { label: "Payments Due",  value: `£${(totalUpcoming / 1000).toFixed(3)}M`,    note: "Due in next 30 days",          color: "#f59e0b" },
        ].map((c, i) => (
          <Card key={i} className="p-7">
            <p className="text-[10px] font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{c.label}</p>
            <p className="text-[2rem] font-black tabular-nums leading-none" style={{ color: c.color }}>{c.value}</p>
            <p className="mt-2 text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>{c.note}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: ASSETS
═══════════════════════════════════════════════════════════ */
function Assets() {
  const [assets, setAssets] = useState<Asset[]>(DEMO_ASSETS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "", category: "IT", purchaseDate: "", cost: "", usefulLife: "", depMethod: "straight-line" as Asset["depMethod"],
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("qx_assets");
      if (saved) setAssets(JSON.parse(saved));
    } catch {}
  }, []);

  function saveAssets(updated: Asset[]) {
    setAssets(updated);
    try { localStorage.setItem("qx_assets", JSON.stringify(updated)); } catch {}
  }

  function addAsset() {
    if (!form.name || !form.purchaseDate || !form.cost || !form.usefulLife) return;
    saveAssets([...assets, { id: Date.now(), name: form.name, category: form.category, purchaseDate: form.purchaseDate, cost: +form.cost, usefulLife: +form.usefulLife, depMethod: form.depMethod }]);
    setShowForm(false);
    setForm({ name: "", category: "IT", purchaseDate: "", cost: "", usefulLife: "", depMethod: "straight-line" });
  }

  const totals = assets.reduce((acc, a) => {
    const { annual, accum, nbv } = calcNBV(a);
    return { cost: acc.cost + a.cost, accum: acc.accum + accum, nbv: acc.nbv + nbv, annual: acc.annual + annual };
  }, { cost: 0, accum: 0, nbv: 0, annual: 0 });

  const catData = ASSET_CATS
    .map(c => ({ label: c, color: CAT_COLORS[c], value: assets.filter(a => a.category === c).reduce((s, a) => s + calcNBV(a).nbv, 0) }))
    .filter(c => c.value > 0);

  const inp: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8, padding: "8px 12px", color: "rgba(255,255,255,0.85)", fontSize: 12, outline: "none",
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Cost",        value: `£${(totals.cost  / 1000).toFixed(0)}k`, accent: "#6366f1" },
          { label: "Total NBV",         value: `£${(totals.nbv   / 1000).toFixed(0)}k`, accent: "#22c55e" },
          { label: "Accumulated Dep",   value: `£${(totals.accum / 1000).toFixed(0)}k`, accent: "#eab308" },
          { label: "Annual Dep Charge", value: `£${(totals.annual/ 1000).toFixed(0)}k`, accent: "#f97316" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: s.accent }} />
            <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>{s.label}</p>
            <p className="text-[1.8rem] font-black text-white tabular-nums leading-none">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Register + NBV donut */}
      <div className="grid lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-3 overflow-hidden">
          <div className="px-7 py-5 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Fixed Asset Register</p>
              <p className="text-white font-bold text-sm mt-0.5">{assets.length} assets · As at 31 Mar 2025</p>
            </div>
            <button onClick={() => setShowForm(v => !v)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold transition-all"
              style={{ background: "rgba(99,102,241,0.18)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}>
              <Plus size={11} /> Add Asset
            </button>
          </div>

          {showForm && (
            <div className="px-7 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(99,102,241,0.05)" }}>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Asset Name</p>
                  <input style={inp} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. HP ProBook Fleet (×12)" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Category</p>
                  <select style={inp} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {ASSET_CATS.map(c => <option key={c} value={c} style={{ background: "#0d1530" }}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Purchase Date</p>
                  <input type="date" style={inp} value={form.purchaseDate} onChange={e => setForm(f => ({ ...f, purchaseDate: e.target.value }))} />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Cost (£)</p>
                  <input type="number" style={inp} value={form.cost} onChange={e => setForm(f => ({ ...f, cost: e.target.value }))} placeholder="25000" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Useful Life (years)</p>
                  <input type="number" style={inp} value={form.usefulLife} onChange={e => setForm(f => ({ ...f, usefulLife: e.target.value }))} placeholder="5" />
                </div>
                <div className="col-span-2">
                  <p className="text-[9px] uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Depreciation Method</p>
                  <select style={inp} value={form.depMethod} onChange={e => setForm(f => ({ ...f, depMethod: e.target.value as Asset["depMethod"] }))}>
                    <option value="straight-line" style={{ background: "#0d1530" }}>Straight-Line</option>
                    <option value="reducing-balance" style={{ background: "#0d1530" }}>Reducing Balance (25% p.a.)</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={addAsset}
                  className="px-5 py-2 rounded-xl text-[11px] font-bold"
                  style={{ background: "rgba(99,102,241,0.25)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.4)" }}>
                  Add to Register
                </button>
                <button onClick={() => setShowForm(false)}
                  className="px-5 py-2 rounded-xl text-[11px] font-bold"
                  style={{ color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["Asset", "Cost", "Accum Dep", "NBV", "Dep/yr", "Method", ""].map(h => (
                    <th key={h} className={`px-4 py-3 text-[9px] font-bold tracking-widest uppercase ${h === "Asset" ? "text-left" : "text-right"}`}
                      style={{ color: "rgba(255,255,255,0.2)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {assets.map(a => {
                  const { annual, accum, nbv } = calcNBV(a);
                  const color = CAT_COLORS[a.category] || "#6366f1";
                  return (
                    <tr key={a.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.035)" }}>
                      <td className="px-4 py-3.5">
                        <p className="text-[11px] font-semibold text-white truncate max-w-[150px]">{a.name}</p>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: `${color}18`, color }}>{a.category}</span>
                      </td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-white font-semibold text-[11px]">£{a.cost.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-[11px]" style={{ color: "#eab308" }}>£{accum.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-right tabular-nums font-bold text-[11px]" style={{ color: nbv > 0 ? "#22c55e" : "rgba(255,255,255,0.3)" }}>£{nbv.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-right tabular-nums text-[11px]" style={{ color: "rgba(255,255,255,0.4)" }}>£{annual.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-right text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                        {a.depMethod === "straight-line" ? "S/L" : "R/B"}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button onClick={() => saveAssets(assets.filter(x => x.id !== a.id))}
                          className="p-1 rounded-lg transition-all"
                          style={{ color: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <X size={10} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-7">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>NBV by Category</p>
          <p className="text-white font-bold text-sm mb-6">Net book value mix</p>
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <Donut data={catData} size={150} sw={20} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[9px] tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Total NBV</p>
                <p className="text-[0.95rem] font-black text-white tabular-nums">£{(totals.nbv / 1000).toFixed(0)}k</p>
              </div>
            </div>
            <div className="w-full space-y-2.5">
              {catData.map((c, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
                  <span className="text-[11px] flex-1 truncate" style={{ color: "rgba(255,255,255,0.5)" }}>{c.label}</span>
                  <span className="text-[11px] font-bold text-white tabular-nums">£{(c.value / 1000).toFixed(0)}k</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: CREDITORS
═══════════════════════════════════════════════════════════ */
function Creditors() {
  const [earlyPayPct,    setEarlyPayPct]    = useState(20);
  const [extendDays,     setExtendDays]     = useState(10);
  const [clearOverduePct,setClearOverduePct]= useState(50);
  const [agingType,      setAgingType]      = useState<CType>("bar");

  const overdueBalance  = topCreditors.reduce((s, c) => s + c.overdue, 0);
  const savedFromEarly  = Math.round(creditorBuckets[0].value * earlyPayPct / 100 * 0.025);
  const deferredCash    = Math.round((extendDays / 30) * (creditorBuckets[1].value + creditorBuckets[2].value));
  const clearedOverdue  = Math.round(overdueBalance * clearOverduePct / 100);
  const netCashImpact   = deferredCash - clearedOverdue;

  const agingAxes = (
    <>
      <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
      <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
      <YAxis tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false}
        tickFormatter={v => `£${(v / 1000).toFixed(0)}M`} width={36} />
      <Tooltip content={<Tip />} />
    </>
  );

  return (
    <div className="space-y-5">
      {/* Header stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Creditors",      value: `£${(totalCreditors / 1000).toFixed(2)}M`, delta: "+£0.12M MoM",    up: false, accent: "#f97316" },
          { label: "Overdue (61+ days)",   value: `£${((creditorBuckets[2].value + creditorBuckets[3].value) / 1000).toFixed(2)}M`, delta: "Requires action", up: false, accent: "#ef4444" },
          { label: "Payable Days (DPO)",   value: "52d",                                      delta: "+7d vs 45d target", up: false, accent: "#eab308" },
          { label: "Invoices Outstanding", value: "43",                                        delta: "12 overdue",        up: false, accent: "#8b5cf6" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: s.accent }} />
            <p className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>{s.label}</p>
            <p className="text-[1.9rem] font-black text-white tabular-nums leading-none">{s.value}</p>
            <div className={`flex items-center gap-1 mt-2 text-[11px] font-semibold ${s.up ? "text-emerald-400" : "text-rose-400"}`}>
              {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{s.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Aging donut + trend */}
      <div className="grid lg:grid-cols-5 gap-4">
        <Card className="lg:col-span-2 p-7">
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Creditor Aging Mix</p>
          <p className="text-white font-bold text-sm mb-6">March 2025</p>
          <div className="flex flex-col items-center gap-5">
            <div className="relative">
              <Donut data={creditorBuckets} size={170} sw={22} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[9px] tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Total</p>
                <p className="text-[1.1rem] font-black text-white tabular-nums">£{(totalCreditors / 1000).toFixed(1)}M</p>
              </div>
            </div>
            <div className="w-full space-y-3">
              {creditorBuckets.map((b, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: b.color }} />
                      <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{b.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-white tabular-nums">£{(b.value / 1000).toFixed(1)}M</span>
                      <span className="text-[10px] tabular-nums w-10 text-right" style={{ color: "rgba(255,255,255,0.3)" }}>{b.pct}%</span>
                    </div>
                  </div>
                  <div className="relative h-[4px] rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div className="absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${b.pct}%`, background: b.color, opacity: 0.75, transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-3 p-7">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Aging Trend</p>
            <ChartTypeToggle type={agingType} setType={setAgingType} />
          </div>
          <p className="text-white font-bold text-sm mb-6">6-month view — Oct 24 to Mar 25</p>
          <ResponsiveContainer width="100%" height={220}>
            {agingType === "area" ? (
              <AreaChart data={creditorTrend} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  {["#22c55e","#eab308","#f97316","#ef4444"].map((c,i) => (
                    <linearGradient key={i} id={`cG${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={c} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                {agingAxes}
                <Area dataKey="c0"  stackId="a" stroke="#22c55e" fill="url(#cG0)" name="0–30d"  isAnimationActive animationDuration={900} />
                <Area dataKey="c31" stackId="a" stroke="#eab308" fill="url(#cG1)" name="31–60d" isAnimationActive animationDuration={900} />
                <Area dataKey="c61" stackId="a" stroke="#f97316" fill="url(#cG2)" name="61–90d" isAnimationActive animationDuration={900} />
                <Area dataKey="c91" stackId="a" stroke="#ef4444" fill="url(#cG3)" name="91+d"   isAnimationActive animationDuration={900} />
              </AreaChart>
            ) : agingType === "line" ? (
              <LineChart data={creditorTrend} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                {agingAxes}
                <Line dataKey="c0"  stroke="#22c55e" strokeWidth={2} dot={false} name="0–30d"  />
                <Line dataKey="c31" stroke="#eab308" strokeWidth={2} dot={false} name="31–60d" />
                <Line dataKey="c61" stroke="#f97316" strokeWidth={2} dot={false} name="61–90d" />
                <Line dataKey="c91" stroke="#ef4444" strokeWidth={2} dot={false} name="91+d"   />
              </LineChart>
            ) : (
              <BarChart data={creditorTrend} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                {agingAxes}
                <Bar dataKey="c0"  stackId="a" fill="#22c55e" fillOpacity={0.85} name="0–30d"  isAnimationActive animationDuration={900} />
                <Bar dataKey="c31" stackId="a" fill="#eab308" fillOpacity={0.85} name="31–60d" isAnimationActive animationDuration={900} />
                <Bar dataKey="c61" stackId="a" fill="#f97316" fillOpacity={0.85} name="61–90d" isAnimationActive animationDuration={900} />
                <Bar dataKey="c91" stackId="a" fill="#ef4444" fillOpacity={0.9}  name="91+d"   isAnimationActive animationDuration={900} radius={[4,4,0,0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 flex-wrap">
            {[{ color: "#22c55e", l: "0–30d" }, { color: "#eab308", l: "31–60d" }, { color: "#f97316", l: "61–90d" }, { color: "#ef4444", l: "91+d" }].map(lg => (
              <div key={lg.l} className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                <div className="w-2 h-2 rounded-full" style={{ background: lg.color }} />{lg.l}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Creditors table */}
      <Card className="overflow-hidden">
        <div className="px-7 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Top Creditors</p>
          <p className="text-white font-bold text-sm mt-0.5">By outstanding balance — March 2025</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {["Creditor", "Sector", "Balance", "Overdue", "Next Due", ""].map(h => (
                <th key={h} className={`px-7 py-3 text-[9px] font-bold tracking-widest uppercase ${h === "Creditor" || h === "Sector" ? "text-left" : "text-right"}`}
                  style={{ color: "rgba(255,255,255,0.2)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topCreditors.map((c, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.035)" }}>
                <td className="px-7 py-3.5 font-semibold text-white">{c.name}</td>
                <td className="px-7 py-3.5 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{c.sector}</td>
                <td className="px-7 py-3.5 text-right tabular-nums font-bold text-white">£{c.balance}k</td>
                <td className={`px-7 py-3.5 text-right tabular-nums font-semibold ${c.overdue > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                  {c.overdue > 0 ? `£${c.overdue}k` : "—"}
                </td>
                <td className="px-7 py-3.5 text-right text-[11px]"
                  style={{ color: c.nextDue === "Overdue" ? "#f87171" : "rgba(255,255,255,0.4)", fontWeight: c.nextDue === "Overdue" ? 700 : 400 }}>
                  {c.nextDue}
                </td>
                <td className="px-7 py-3.5">
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", minWidth: 60 }}>
                    <div className="h-full rounded-full" style={{ width: `${(c.balance / topCreditors[0].balance) * 100}%`, background: c.color, opacity: 0.8 }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Payment optimisation tool */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="px-7 py-5 border-b flex items-center gap-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <SlidersHorizontal size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Payment Optimisation Tool</p>
            <p className="text-white font-bold text-sm mt-0.5">Model payment strategy to optimise cash flow</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-0 divide-x" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="p-7 space-y-8">
            {[
              { label: "Early payment — take discount", note: "2.5% discount on current balance paid early", min: 0, max: 80, val: earlyPayPct, set: setEarlyPayPct, color: "#22c55e", result: `+£${savedFromEarly}k saving from discounts`, suffix: "%" },
              { label: "Negotiate extended terms", note: "Defer 31–90d payables by additional days", min: 0, max: 30, val: extendDays, set: setExtendDays, color: "#6366f1", result: `+£${(deferredCash / 1000).toFixed(2)}M deferred`, suffix: "d" },
              { label: "Clear overdue payables", note: `Overdue balance: £${overdueBalance}k — protect supplier relationships`, min: 0, max: 100, val: clearOverduePct, set: setClearOverduePct, color: "#f97316", result: `£${clearedOverdue}k cleared`, suffix: "%" },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{s.label}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{s.note}</p>
                  </div>
                  <span className="text-lg font-black tabular-nums ml-4 shrink-0" style={{ color: s.color }}>{s.val}{s.suffix}</span>
                </div>
                <input type="range" min={s.min} max={s.max} value={s.val} onChange={e => s.set(+e.target.value)}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: s.color, background: `linear-gradient(to right, ${s.color} ${(s.val - s.min) / (s.max - s.min) * 100}%, rgba(255,255,255,0.1) ${(s.val - s.min) / (s.max - s.min) * 100}%)` }} />
                <div className="flex justify-between text-[9px] mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                  <span>{s.min}{s.suffix}</span><span>{s.max}{s.suffix}</span>
                </div>
                <p className="mt-2 text-[11px] font-semibold" style={{ color: s.color }}>{s.result}</p>
              </div>
            ))}
          </div>
          <div className="p-7 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>Modelled outcome</p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Current cash position", value: `£${(currentCash / 1000).toFixed(2)}M`, color: "rgba(255,255,255,0.4)" },
                  { label: "Early payment savings",  value: `+£${savedFromEarly}k`,                color: "#22c55e" },
                  { label: "Deferred payables",      value: `+£${(deferredCash / 1000).toFixed(2)}M`, color: "#6366f1" },
                  { label: "Overdue cleared",        value: `–£${clearedOverdue}k`,                   color: "#f97316" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{r.label}</span>
                    <span className="text-sm font-bold tabular-nums" style={{ color: r.color }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6 text-center"
              style={{ background: netCashImpact >= 0 ? "rgba(99,102,241,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${netCashImpact >= 0 ? "rgba(99,102,241,0.2)" : "rgba(239,68,68,0.2)"}` }}>
              <p className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>Net Cash Impact</p>
              <p className={`text-[2.8rem] font-black tabular-nums leading-none ${netCashImpact >= 0 ? "text-indigo-400" : "text-rose-400"}`}>
                {netCashImpact >= 0 ? "+" : "–"}£{(Math.abs(netCashImpact) / 1000).toFixed(2)}M
              </p>
              <p className="text-[10px] mt-3" style={{ color: "rgba(255,255,255,0.3)" }}>Deferred cash less early payment outflow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: FP&A — BUDGET vs ACTUALS
═══════════════════════════════════════════════════════════ */

type VarReason = "" | "timing" | "volume" | "rate" | "one-off" | "scope-change";
const VAR_REASONS: { id: VarReason; label: string }[] = [
  { id: "",            label: "— Select —"    },
  { id: "timing",      label: "Timing"        },
  { id: "volume",      label: "Volume"        },
  { id: "rate",        label: "Rate / Price"  },
  { id: "one-off",     label: "One-off"       },
  { id: "scope-change",label: "Scope Change"  },
];

function FPandA() {
  const [view,       setView]       = useState<"pl" | "bs">("pl");
  const [collapsed,  setCollapsed]  = useState<Record<string, boolean>>({});
  const [reasons,    setReasons]    = useState<Record<string, VarReason>>({});
  const [comments,   setComments]   = useState<Record<string, string>>({});

  // Persist comments + reasons in localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("fpanda_state") || "{}");
      if (saved.reasons)  setReasons(saved.reasons);
      if (saved.comments) setComments(saved.comments);
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    localStorage.setItem("fpanda_state", JSON.stringify({ reasons, comments }));
  }, [reasons, comments]);

  const nominals = view === "pl" ? plNominals : bsNominals;

  function toggleSection(code: string) {
    setCollapsed(p => ({ ...p, [code]: !p[code] }));
  }

  // Visible rows (collapse children when header is collapsed)
  const collapsedHeaders = new Set(
    nominals.filter(n => n.isHeader && collapsed[n.code]).map(n => n.code)
  );
  const visibleRows = nominals.filter(n => !n.parentCode || !collapsedHeaders.has(n.parentCode));

  // CSV export
  function exportCSV() {
    const headers = ["Code","Nominal","Actuals","Budget","Var","Var%","Reason","Comment","YTD Actuals","YTD Budget","YTD Var"];
    const rows = nominals.map(n => {
      const varAmt  = n.actuals - n.budget;
      const varPct  = n.budget !== 0 ? ((varAmt / n.budget) * 100).toFixed(1) : "—";
      const ytdVar  = n.ytdActuals - n.ytdBudget;
      return [
        n.code, `"${n.name}"`, n.actuals, n.budget, varAmt, varPct,
        reasons[n.code] || "", `"${(comments[n.code] || "").replace(/"/g, "'")}"`,
        n.ytdActuals, n.ytdBudget, ytdVar,
      ].join(",");
    });
    const csv  = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `fpanda_${view}_${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }

  // PDF export via print
  function exportPDF() { window.print(); }

  // Variance colour helper
  function varColor(varAmt: number, isRevenue?: boolean) {
    if (varAmt === 0) return "rgba(255,255,255,0.2)";
    const good = isRevenue ? varAmt > 0 : varAmt < 0;
    return good ? "#22c55e" : "#ef4444";
  }

  return (
    <div className="space-y-5">
      {/* Header toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Financial Planning & Analysis</p>
          <p className="text-white font-bold text-lg mt-0.5">Budget vs Actuals — March 2025</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Pills
            options={[{ id: "pl", label: "P & L" }, { id: "bs", label: "Balance Sheet" }]}
            active={view}
            onChange={v => setView(v as "pl" | "bs")}
          />
          <button onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold transition-all"
            style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)" }}>
            <Download size={13} /> Export CSV
          </button>
          <button onClick={exportPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold transition-all"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Download size={13} /> Export PDF
          </button>
        </div>
      </div>

      {/* Charts row */}
      {view === "pl" && (
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Waterfall */}
          <Card className="lg:col-span-3 p-7">
            <div className="mb-5">
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Budget Bridge</p>
              <p className="text-white font-bold text-sm mt-0.5">Budget → Actual variance by practice · Mar 25 (£000)</p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={WATERFALL_DATA} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis domain={[4400, 4550]} tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `£${v}`} width={42} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const d = WATERFALL_DATA.find(w => w.name === label);
                    return (
                      <div className="rounded-xl px-4 py-3 text-xs shadow-2xl" style={{ background: "#111127", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <p className="font-bold mb-1 text-white/40 tracking-widest uppercase text-[9px]">{label}</p>
                        <p className="font-bold text-white">{d?.isTotal ? `£${d.bar.toLocaleString()}k` : `${d && d.bar >= 0 ? "+" : ""}£${d?.bar}k`}</p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="invisible" stackId="a" fill="transparent" isAnimationActive={false} />
                <Bar dataKey="bar" stackId="a" radius={[3, 3, 0, 0]} isAnimationActive animationDuration={800}>
                  {WATERFALL_DATA.map((d, i) => <Cell key={i} fill={d.color} fillOpacity={0.9} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-5 mt-3 justify-end flex-wrap">
              {[{ color: "#6366f1", l: "Budget / Actual total" }, { color: "#22c55e", l: "Favourable" }, { color: "#ef4444", l: "Adverse" }].map(lg => (
                <div key={lg.l} className="flex items-center gap-1.5 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: lg.color }} />{lg.l}
                </div>
              ))}
            </div>
          </Card>

          {/* Monthly comparison */}
          <Card className="lg:col-span-2 p-7">
            <div className="mb-5">
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Monthly Trend</p>
              <p className="text-white font-bold text-sm mt-0.5">Actual vs Budget (6 mo) · £000</p>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <ComposedChart data={fpandaMonthly} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis domain={[3900, 4600]} tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 9 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `£${(v / 1000).toFixed(1)}M`} width={42} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="actual" name="Actual" radius={[3,3,0,0]} isAnimationActive animationDuration={900}>
                  {fpandaMonthly.map((d, i) => <Cell key={i} fill={d.actual >= d.budget ? "#6366f1" : "#ef4444"} fillOpacity={0.85} />)}
                </Bar>
                <Line type="monotone" dataKey="budget" name="Budget" stroke="rgba(255,255,255,0.3)" strokeWidth={1.5} strokeDasharray="4 3" dot={false} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Nominal table */}
      <Card className="overflow-hidden">
        <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
              {view === "pl" ? "P&L Nominals" : "Balance Sheet Nominals"}
            </p>
            <p className="text-white font-bold text-sm mt-0.5">Nominal-by-nominal · March 2025</p>
          </div>
          <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>Click category to expand / collapse</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs min-w-[960px]">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                {[
                  { label: "Code",        align: "left"  },
                  { label: "Nominal",     align: "left"  },
                  { label: "Actuals",     align: "right" },
                  { label: "Budget",      align: "right" },
                  { label: "Var",         align: "right" },
                  { label: "Var %",       align: "right" },
                  { label: "Reason",      align: "left"  },
                  { label: "Commentary",  align: "left"  },
                  { label: "YTD Actuals", align: "right" },
                  { label: "YTD Budget",  align: "right" },
                  { label: "YTD Var",     align: "right" },
                ].map(h => (
                  <th key={h.label}
                    className={`px-5 py-3 text-[9px] font-bold tracking-widest uppercase ${h.align === "right" ? "text-right" : "text-left"}`}
                    style={{ color: "rgba(255,255,255,0.2)" }}>
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((n, i) => {
                const varAmt  = n.actuals - n.budget;
                const varPct  = n.budget !== 0 ? (varAmt / n.budget) * 100 : 0;
                const ytdVar  = n.ytdActuals - n.ytdBudget;
                const vc      = varColor(varAmt, n.isRevenue);
                const ytdVC   = varColor(ytdVar, n.isRevenue);
                const isHead  = n.isHeader;

                return (
                  <tr key={n.code}
                    onClick={isHead ? () => toggleSection(n.code) : undefined}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      background: isHead ? "rgba(255,255,255,0.04)" : undefined,
                      cursor: isHead ? "pointer" : undefined,
                    }}>
                    {/* Code */}
                    <td className="px-5 py-3 tabular-nums font-mono text-[10px]"
                      style={{ color: "rgba(255,255,255,0.25)" }}>
                      {isHead && (
                        <span className="mr-1 text-[8px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {collapsed[n.code] ? "▶" : "▼"}
                        </span>
                      )}
                      {n.code}
                    </td>

                    {/* Nominal */}
                    <td className="px-5 py-3" style={{ color: isHead ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)", fontWeight: isHead ? 700 : 400, paddingLeft: isHead ? undefined : "2rem" }}>
                      {n.name}
                    </td>

                    {/* Actuals */}
                    <td className="px-5 py-3 text-right tabular-nums font-bold text-white">
                      £{n.actuals.toLocaleString()}k
                    </td>

                    {/* Budget */}
                    <td className="px-5 py-3 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.35)" }}>
                      £{n.budget.toLocaleString()}k
                    </td>

                    {/* Var */}
                    <td className="px-5 py-3 text-right tabular-nums font-semibold" style={{ color: vc }}>
                      {varAmt >= 0 ? "+" : ""}£{varAmt.toLocaleString()}k
                    </td>

                    {/* Var % */}
                    <td className="px-5 py-3 text-right tabular-nums font-semibold" style={{ color: vc }}>
                      {n.budget !== 0 ? `${varPct >= 0 ? "+" : ""}${varPct.toFixed(1)}%` : "—"}
                    </td>

                    {/* Reason */}
                    <td className="px-5 py-3">
                      {!isHead && (
                        <select
                          value={reasons[n.code] || ""}
                          onChange={e => setReasons(p => ({ ...p, [n.code]: e.target.value as VarReason }))}
                          onClick={e => e.stopPropagation()}
                          className="rounded-lg px-2 py-1 text-[10px] font-semibold w-[120px]"
                          style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)", outline: "none" }}>
                          {VAR_REASONS.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                        </select>
                      )}
                    </td>

                    {/* Commentary */}
                    <td className="px-5 py-3">
                      {!isHead && (
                        <input
                          type="text"
                          placeholder="Add note…"
                          value={comments[n.code] || ""}
                          onChange={e => setComments(p => ({ ...p, [n.code]: e.target.value }))}
                          onClick={e => e.stopPropagation()}
                          className="rounded-lg px-3 py-1 text-[10px] w-[180px]"
                          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)", outline: "none" }}
                        />
                      )}
                    </td>

                    {/* YTD Actuals */}
                    <td className="px-5 py-3 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.5)" }}>
                      £{n.ytdActuals.toLocaleString()}k
                    </td>

                    {/* YTD Budget */}
                    <td className="px-5 py-3 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.3)" }}>
                      £{n.ytdBudget.toLocaleString()}k
                    </td>

                    {/* YTD Var */}
                    <td className="px-5 py-3 text-right tabular-nums font-semibold" style={{ color: ytdVC }}>
                      {ytdVar >= 0 ? "+" : ""}£{ytdVar.toLocaleString()}k
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: REPORTS
═══════════════════════════════════════════════════════════ */

function Reports() {
  const docs = [
    { title: "Q1 Board Pack",        sub: "Full board-ready PDF · 28 pages",   color: "#6366f1", ready: true  },
    { title: "P&L Statement",        sub: "Mar 2025 · with prior comparisons",  color: "#8b5cf6", ready: true  },
    { title: "Cash Flow Forecast",   sub: "6-month forward projection",          color: "#06b6d4", ready: true  },
    { title: "Utilisation Report",   sub: "Grade × month heatmap",              color: "#22c55e", ready: true  },
    { title: "Budget Variance Pack", sub: "Q1 actual vs budget deep-dive",      color: "#eab308", ready: false },
    { title: "Investor Summary",     sub: "1-page KPI summary — ready Apr 5",   color: "#ef4444", ready: false },
  ];

  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {docs.map((d, i) => (
          <Card key={i} className="p-7 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${d.color}18` }}>
                <Download size={15} style={{ color: d.color }} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{d.title}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{d.sub}</p>
              </div>
            </div>
            <button className="w-full rounded-xl py-2.5 text-[11px] font-bold tracking-wide transition-all duration-150"
              style={d.ready
                ? { background: `${d.color}20`, color: d.color, border: `1px solid ${d.color}30` }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.07)", cursor: "default" }}>
              {d.ready ? "Download PDF" : "Generating…"}
            </button>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="px-8 py-5 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Detailed P&L</p>
            <p className="text-white font-bold text-sm mt-0.5">March 2025</p>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {["Line Item", "Mar 25", "Feb 25", "Margin", "MoM Change"].map(h => (
                <th key={h} className={`px-8 py-3 text-[9px] font-bold tracking-widest uppercase ${h === "Line Item" ? "text-left" : "text-right"}`}
                  style={{ color: "rgba(255,255,255,0.2)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pl.map((row, i) => {
              const mom = ((row.value - row.prev) / row.prev) * 100;
              const spec = row.isGross || row.isEbitda || row.isNet;
              return (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.035)", background: spec ? "rgba(255,255,255,0.025)" : undefined }}>
                  <td className={`px-8 py-3.5 ${spec ? "font-bold text-white" : "font-medium"}`}
                    style={{ color: spec ? undefined : "rgba(255,255,255,0.5)" }}>{row.label}</td>
                  <td className="px-8 py-3.5 text-right font-bold tabular-nums text-white">£{row.value.toLocaleString()}k</td>
                  <td className="px-8 py-3.5 text-right tabular-nums" style={{ color: "rgba(255,255,255,0.3)" }}>£{row.prev.toLocaleString()}k</td>
                  <td className="px-8 py-3.5 text-right tabular-nums font-semibold" style={{ color: row.pct ? "#6366f1" : "rgba(255,255,255,0.15)" }}>
                    {row.pct ? `${row.pct}%` : "—"}
                  </td>
                  <td className={`px-8 py-3.5 text-right tabular-nums font-semibold ${mom >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {mom >= 0 ? "+" : ""}{mom.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════ */

type Tab = "overview" | "revenue" | "bank" | "people" | "debtors" | "creditors" | "assets" | "fpanda" | "reports";

const TABS: { id: Tab; label: string; dot?: string }[] = [
  { id: "overview",   label: "Overview"   },
  { id: "revenue",    label: "Revenue"    },
  { id: "bank",       label: "Bank"       },
  { id: "people",     label: "People"     },
  { id: "debtors",    label: "Debtors",   dot: "#ef4444" },
  { id: "creditors",  label: "Creditors", dot: "#f97316" },
  { id: "assets",     label: "Assets"     },
  { id: "fpanda",     label: "FP&A"       },
  { id: "reports",    label: "Reports"    },
];

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen" style={{ background: "#09090f", color: "rgba(255,255,255,0.85)" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl"
        style={{ background: "rgba(9,9,15,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-[1280px] mx-auto px-8 h-14 flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-black text-[12px]">Q</span>
            </div>
            <span className="font-black text-[13px] text-white tracking-tight">Meridian</span>
          </Link>

          <nav className="flex gap-1">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className="px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-150 flex items-center gap-1.5"
                style={tab === t.id
                  ? { background: "rgba(99,102,241,0.18)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)" }
                  : { color: "rgba(255,255,255,0.35)", border: "1px solid transparent" }}>
                {t.label}
                {t.dot && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.dot }} />}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              March 2025
            </div>
            <Link href="/" className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}>
              ← Back
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-8 py-10">
        {tab === "overview"  && <Overview />}
        {tab === "revenue"   && <Revenue />}
        {tab === "bank"      && <Bank />}
        {tab === "people"    && <People />}
        {tab === "debtors"   && <Debtors />}
        {tab === "creditors" && <Creditors />}
        {tab === "assets"    && <Assets />}
        {tab === "fpanda"    && <FPandA />}
        {tab === "reports"   && <Reports />}
      </main>
    </div>
  );
}
