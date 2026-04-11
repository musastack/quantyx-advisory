import { getSupabaseClient } from "./supabase";

/* ─────────────────────────────────────────────
   TYPES — COMMERCIAL
───────────────────────────────────────────── */

export type MonthlyRevenue = { month: string; revenue: number; profit: number };

export type TopProduct = {
  product_name: string;
  category: string;
  profit: number;
  revenue: number;
  margin_pct: number;
  bar: number; // 0–100, relative to top product
};

export type LowStockItem = {
  product_name: string;
  stock_level: number;
  reorder_level: number;
  severity: "critical" | "low";
};

export type KPISummary = {
  totalRevenue: number;
  totalProfit: number;
  grossMarginPct: number;
  inventoryValue: number;
  lowStockCount: number;
};

/* ─────────────────────────────────────────────
   TYPES — OPERATIONAL
───────────────────────────────────────────── */

export type OperationalKPIs = {
  active_jobs: number;
  jobs_at_risk: number;
  labour_hours_week: number;
  crew_utilisation_pct: number;
  materials_committed_gbp: number;
  cost_variance_pct: number;
};

export type ActiveJob = {
  job_id: string;
  name: string;
  client: string;
  status: "on-track" | "at-risk" | "delayed" | "complete" | "starting";
  crew: string;
  start_date: string;
  due_date: string;
  pct_complete: number;
  budget_gbp: number;
  actual_cost_gbp: number;
  risk_flag: string | null;
};

export type CrewStatus = {
  name: string;
  lead: string;
  jobs_active: number;
  hours_this_week: number;
  capacity_hours: number;
  utilisation_pct: number;
  status: "available" | "near-capacity" | "overallocated";
};

export type MaterialAlert = {
  material: string;
  job_id: string;
  job_name: string;
  committed_gbp: number;
  estimate_gbp: number;
  variance_pct: number;
  severity: "over" | "watch" | "supply-risk";
  note: string;
};

/* ─────────────────────────────────────────────
   DASHBOARD TYPE
───────────────────────────────────────────── */

export type InventoryCoDashboard = {
  kpis: KPISummary;
  operationalKPIs: OperationalKPIs;
  monthlyRevenue: MonthlyRevenue[];
  topProducts: TopProduct[];
  lowStockItems: LowStockItem[];
  activeJobs: ActiveJob[];
  crewStatuses: CrewStatus[];
  materialAlerts: MaterialAlert[];
  source: "supabase" | "mock";
};

/* ─────────────────────────────────────────────
   MOCK FALLBACK DATA
   Used when Supabase is not configured.
   Operational data is always illustrative.
───────────────────────────────────────────── */

const MOCK: InventoryCoDashboard = {
  source: "mock",

  /* — Commercial KPIs — */
  kpis: {
    totalRevenue:   487700,
    totalProfit:    138296,
    grossMarginPct: 28.4,
    inventoryValue: 210340,
    lowStockCount:  3,
  },

  /* — Operational KPIs — */
  operationalKPIs: {
    active_jobs:             18,
    jobs_at_risk:            3,
    labour_hours_week:       426,
    crew_utilisation_pct:    82,
    materials_committed_gbp: 96400,
    cost_variance_pct:       6.8,
  },

  /* — Revenue trend — */
  monthlyRevenue: [
    { month: "Oct", revenue:  54700, profit: 15400 },
    { month: "Nov", revenue:  68300, profit: 19600 },
    { month: "Dec", revenue:  81800, profit: 23200 },
    { month: "Jan", revenue:  87720, profit: 25000 },
    { month: "Feb", revenue:  95130, profit: 27200 },
    { month: "Mar", revenue: 100050, profit: 28100 },
  ],

  /* — Top products by gross profit — */
  topProducts: [
    { product_name: "LED Panel Pro",           category: "Lighting",   profit: 51000, revenue: 151300, margin_pct: 33.7, bar: 100 },
    { product_name: "Commercial Batten Light", category: "Commercial", profit: 29520, revenue: 131760, margin_pct: 22.4, bar: 58  },
    { product_name: "Outdoor Floodlight",      category: "Outdoor",    profit: 12390, revenue:  54750, margin_pct: 22.6, bar: 24  },
    { product_name: "Emergency Exit Sign",     category: "Commercial", profit:  8250, revenue:  46400, margin_pct: 17.8, bar: 16  },
    { product_name: "Smart Dimmer Module",     category: "Controls",   profit:  5520, revenue:  16560, margin_pct: 33.3, bar: 11  },
  ],

  /* — Low stock alerts — */
  lowStockItems: [
    { product_name: "LED Panel Pro",           stock_level: 42, reorder_level: 50, severity: "low"      },
    { product_name: "Outdoor Floodlight",      stock_level:  8, reorder_level: 30, severity: "critical" },
    { product_name: "Commercial Batten Light", stock_level: 18, reorder_level: 35, severity: "low"      },
  ],

  /* — Active job tracker — */
  activeJobs: [
    {
      job_id: "J-1042",
      name: "LED Retrofit — Manchester",
      client: "Metro Facilities Group",
      status: "at-risk",
      crew: "Crew A",
      start_date: "03 Mar",
      due_date: "11 Apr",
      pct_complete: 72,
      budget_gbp: 48000,
      actual_cost_gbp: 38200,
      risk_flag: "Labour 14% over budget",
    },
    {
      job_id: "J-1048",
      name: "Warehouse Lighting Fitout",
      client: "Redfield Logistics",
      status: "on-track",
      crew: "Crew C",
      start_date: "17 Mar",
      due_date: "28 Apr",
      pct_complete: 41,
      budget_gbp: 32500,
      actual_cost_gbp: 14800,
      risk_flag: null,
    },
    {
      job_id: "J-1051",
      name: "Emergency Upgrade Package",
      client: "Hartley Council",
      status: "at-risk",
      crew: "Crew B",
      start_date: "21 Mar",
      due_date: "04 Apr",
      pct_complete: 88,
      budget_gbp: 19200,
      actual_cost_gbp: 17900,
      risk_flag: "Awaiting materials — delivery delayed",
    },
    {
      job_id: "J-1037",
      name: "Office Lighting Refurb",
      client: "Prestige Offices Ltd",
      status: "on-track",
      crew: "Crew A",
      start_date: "14 Feb",
      due_date: "07 Apr",
      pct_complete: 95,
      budget_gbp: 27000,
      actual_cost_gbp: 24800,
      risk_flag: null,
    },
    {
      job_id: "J-1055",
      name: "Industrial Unit LED Install",
      client: "Barton Industrial",
      status: "at-risk",
      crew: "Crew C",
      start_date: "24 Mar",
      due_date: "02 May",
      pct_complete: 22,
      budget_gbp: 54000,
      actual_cost_gbp: 13100,
      risk_flag: "Start delayed — site access issue",
    },
    {
      job_id: "J-1061",
      name: "Smart Controls Retrofit",
      client: "Quantum Workspace",
      status: "starting",
      crew: "Crew B",
      start_date: "31 Mar",
      due_date: "09 May",
      pct_complete: 8,
      budget_gbp: 38500,
      actual_cost_gbp: 3200,
      risk_flag: null,
    },
  ],

  /* — Crew utilisation — */
  crewStatuses: [
    {
      name: "Crew A",
      lead: "J. Hartley",
      jobs_active: 7,
      hours_this_week: 148,
      capacity_hours: 160,
      utilisation_pct: 92,
      status: "near-capacity",
    },
    {
      name: "Crew B",
      lead: "R. Osei",
      jobs_active: 6,
      hours_this_week: 127,
      capacity_hours: 160,
      utilisation_pct: 79,
      status: "available",
    },
    {
      name: "Crew C",
      lead: "M. Patel",
      jobs_active: 5,
      hours_this_week: 151,
      capacity_hours: 160,
      utilisation_pct: 94,
      status: "near-capacity",
    },
  ],

  /* — Material cost alerts — */
  materialAlerts: [
    {
      material: "LED Panel Pro 60W",
      job_id: "J-1042",
      job_name: "LED Retrofit — Manchester",
      committed_gbp: 18200,
      estimate_gbp: 15400,
      variance_pct: 18.2,
      severity: "over",
      note: "Unplanned variation: additional units required on-site",
    },
    {
      material: "Cable Trunking & Accessories",
      job_id: "J-1048",
      job_name: "Warehouse Lighting Fitout",
      committed_gbp: 4100,
      estimate_gbp: 3800,
      variance_pct: 7.9,
      severity: "watch",
      note: "Within tolerance — flagged for monitoring",
    },
    {
      material: "Emergency Exit & Safety Packs",
      job_id: "J-1051",
      job_name: "Emergency Upgrade Package",
      committed_gbp: 6800,
      estimate_gbp: 6800,
      variance_pct: 0,
      severity: "supply-risk",
      note: "Supplier delay — estimated 3-day impact on job completion",
    },
  ],
};

/* ─────────────────────────────────────────────
   LIVE SUPABASE FETCH
   Commercial data pulled from Supabase.
   Operational data always uses mock (not yet
   wired to live tables in this demo).
───────────────────────────────────────────── */

export async function getInventoryCoData(): Promise<InventoryCoDashboard> {
  const supabase = getSupabaseClient();
  if (!supabase) return MOCK;

  try {
    const { data: sales, error: salesErr } = await supabase
      .from("ic_sales")
      .select("order_date, revenue_gbp, cost_gbp, product_id");
    if (salesErr || !sales) return MOCK;

    const { data: products, error: prodErr } = await supabase
      .from("ic_products")
      .select("id, product_name, category, unit_cost_gbp, selling_price_gbp");
    if (prodErr || !products) return MOCK;

    const { data: inventory, error: invErr } = await supabase
      .from("ic_inventory")
      .select("product_id, stock_level, reorder_level");
    if (invErr || !inventory) return MOCK;

    /* ── KPI calculations ── */
    const totalRevenue   = sales.reduce((s, r) => s + Number(r.revenue_gbp), 0);
    const totalCost      = sales.reduce((s, r) => s + Number(r.cost_gbp),    0);
    const totalProfit    = totalRevenue - totalCost;
    const grossMarginPct = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    /* ── Inventory value ── */
    const productMap    = new Map(products.map((p) => [p.id, p]));
    const inventoryValue = inventory.reduce((s, row) => {
      const p = productMap.get(row.product_id);
      return s + row.stock_level * Number(p?.unit_cost_gbp ?? 0);
    }, 0);

    /* ── Low stock ── */
    const lowStockItems: LowStockItem[] = inventory
      .filter((row) => row.stock_level < row.reorder_level)
      .map((row) => {
        const p   = productMap.get(row.product_id);
        const pct = row.stock_level / row.reorder_level;
        return {
          product_name:  p?.product_name ?? "Unknown",
          stock_level:   row.stock_level,
          reorder_level: row.reorder_level,
          severity: (pct < 0.4 ? "critical" : "low") as "critical" | "low",
        };
      })
      .sort((a, b) => a.stock_level / a.reorder_level - b.stock_level / b.reorder_level);

    /* ── Monthly revenue ── */
    const monthBuckets = new Map<string, { revenue: number; profit: number }>();
    for (const row of sales) {
      const key  = row.order_date.slice(0, 7);
      const prev = monthBuckets.get(key) ?? { revenue: 0, profit: 0 };
      monthBuckets.set(key, {
        revenue: prev.revenue + Number(row.revenue_gbp),
        profit:  prev.profit  + Number(row.revenue_gbp) - Number(row.cost_gbp),
      });
    }
    const MONTH_LABELS: Record<string, string> = {
      "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
      "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
      "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
    };
    const monthlyRevenue: MonthlyRevenue[] = [...monthBuckets.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, val]) => ({
        month:   MONTH_LABELS[key.slice(5)] ?? key,
        revenue: Math.round(val.revenue),
        profit:  Math.round(val.profit),
      }));

    /* ── Top products ── */
    const productProfits = new Map<number, { revenue: number; cost: number }>();
    for (const row of sales) {
      const prev = productProfits.get(row.product_id) ?? { revenue: 0, cost: 0 };
      productProfits.set(row.product_id, {
        revenue: prev.revenue + Number(row.revenue_gbp),
        cost:    prev.cost    + Number(row.cost_gbp),
      });
    }
    const rawTopProducts = [...productProfits.entries()]
      .map(([productId, { revenue, cost }]) => {
        const p      = productMap.get(productId);
        const profit = revenue - cost;
        return {
          product_name: p?.product_name ?? "Unknown",
          category:     p?.category ?? "",
          revenue:      Math.round(revenue),
          profit:       Math.round(profit),
          margin_pct:   revenue > 0 ? (profit / revenue) * 100 : 0,
          bar:          0,
        };
      })
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 5);

    const maxProfit = rawTopProducts[0]?.profit ?? 1;
    const topProducts: TopProduct[] = rawTopProducts.map((p) => ({
      ...p,
      margin_pct: Math.round(p.margin_pct * 10) / 10,
      bar:        Math.round((p.profit / maxProfit) * 100),
    }));

    return {
      source: "supabase",
      kpis: {
        totalRevenue:   Math.round(totalRevenue),
        totalProfit:    Math.round(totalProfit),
        grossMarginPct: Math.round(grossMarginPct * 10) / 10,
        inventoryValue: Math.round(inventoryValue),
        lowStockCount:  lowStockItems.length,
      },
      /* Operational data always uses mock in this demo */
      operationalKPIs: MOCK.operationalKPIs,
      activeJobs:      MOCK.activeJobs,
      crewStatuses:    MOCK.crewStatuses,
      materialAlerts:  MOCK.materialAlerts,
      monthlyRevenue,
      topProducts,
      lowStockItems,
    };
  } catch {
    return MOCK;
  }
}
