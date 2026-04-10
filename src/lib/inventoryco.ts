import { getSupabaseClient } from "./supabase";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export type MonthlyRevenue = { month: string; revenue: number; profit: number };

export type TopProduct = {
  product_name: string;
  category: string;
  profit: number;
  revenue: number;
  margin_pct: number;
  bar: number; // 0-100, relative to top product
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

export type InventoryCoDashboard = {
  kpis: KPISummary;
  monthlyRevenue: MonthlyRevenue[];
  topProducts: TopProduct[];
  lowStockItems: LowStockItem[];
  source: "supabase" | "mock";
};

/* ─────────────────────────────────────────────
   MOCK FALLBACK DATA
   Used when Supabase is not configured
───────────────────────────────────────────── */

const MOCK: InventoryCoDashboard = {
  source: "mock",
  kpis: {
    totalRevenue: 487700,
    totalProfit: 138296,
    grossMarginPct: 28.4,
    inventoryValue: 210340,
    lowStockCount: 3,
  },
  monthlyRevenue: [
    { month: "Oct", revenue: 54700,  profit: 15400  },
    { month: "Nov", revenue: 68300,  profit: 19600  },
    { month: "Dec", revenue: 81800,  profit: 23200  },
    { month: "Jan", revenue: 87720,  profit: 25000  },
    { month: "Feb", revenue: 95130,  profit: 27200  },
    { month: "Mar", revenue: 100050, profit: 28100  },
  ],
  topProducts: [
    { product_name: "LED Panel Pro",          category: "Lighting",    profit: 51000, revenue: 151300, margin_pct: 33.7, bar: 100 },
    { product_name: "Commercial Batten Light", category: "Commercial", profit: 29520, revenue: 131760, margin_pct: 22.4, bar: 58  },
    { product_name: "Outdoor Floodlight",      category: "Outdoor",    profit: 12390, revenue: 54750,  margin_pct: 22.6, bar: 24  },
    { product_name: "Emergency Exit Sign",     category: "Commercial", profit: 8250,  revenue: 46400,  margin_pct: 17.8, bar: 16  },
    { product_name: "Smart Dimmer Module",     category: "Controls",   profit: 5520,  revenue: 16560,  margin_pct: 33.3, bar: 11  },
  ],
  lowStockItems: [
    { product_name: "LED Panel Pro",          stock_level: 42,  reorder_level: 50,  severity: "low"      },
    { product_name: "Outdoor Floodlight",     stock_level: 8,   reorder_level: 30,  severity: "critical" },
    { product_name: "Commercial Batten Light",stock_level: 18,  reorder_level: 35,  severity: "low"      },
  ],
};

/* ─────────────────────────────────────────────
   LIVE SUPABASE FETCH
───────────────────────────────────────────── */

export async function getInventoryCoData(): Promise<InventoryCoDashboard> {
  const supabase = getSupabaseClient();
  if (!supabase) return MOCK;

  try {
    // Fetch all sales
    const { data: sales, error: salesErr } = await supabase
      .from("ic_sales")
      .select("order_date, revenue_gbp, cost_gbp, product_id");

    if (salesErr || !sales) return MOCK;

    // Fetch products
    const { data: products, error: prodErr } = await supabase
      .from("ic_products")
      .select("id, product_name, category, unit_cost_gbp, selling_price_gbp");

    if (prodErr || !products) return MOCK;

    // Fetch inventory
    const { data: inventory, error: invErr } = await supabase
      .from("ic_inventory")
      .select("product_id, stock_level, reorder_level");

    if (invErr || !inventory) return MOCK;

    /* ── KPI calculations ── */
    const totalRevenue = sales.reduce((s, r) => s + Number(r.revenue_gbp), 0);
    const totalCost    = sales.reduce((s, r) => s + Number(r.cost_gbp), 0);
    const totalProfit  = totalRevenue - totalCost;
    const grossMarginPct = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    /* ── Inventory value ── */
    const productMap = new Map(products.map((p) => [p.id, p]));
    const inventoryValue = inventory.reduce((s, row) => {
      const p = productMap.get(row.product_id);
      return s + row.stock_level * Number(p?.unit_cost_gbp ?? 0);
    }, 0);

    /* ── Low stock ── */
    const lowStockItems: LowStockItem[] = inventory
      .filter((row) => row.stock_level < row.reorder_level)
      .map((row) => {
        const p = productMap.get(row.product_id);
        const pct = row.stock_level / row.reorder_level;
        return {
          product_name: p?.product_name ?? "Unknown",
          stock_level: row.stock_level,
          reorder_level: row.reorder_level,
          severity: (pct < 0.4 ? "critical" : "low") as "critical" | "low",
        };
      })
      .sort((a, b) => a.stock_level / a.reorder_level - b.stock_level / b.reorder_level);

    /* ── Monthly revenue (group by YYYY-MM) ── */
    const monthBuckets = new Map<string, { revenue: number; profit: number }>();
    for (const row of sales) {
      const key = row.order_date.slice(0, 7); // "2025-10"
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
        month: MONTH_LABELS[key.slice(5)] ?? key,
        revenue: Math.round(val.revenue),
        profit:  Math.round(val.profit),
      }));

    /* ── Top products by profit ── */
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
        const p = productMap.get(productId);
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
      bar: Math.round((p.profit / maxProfit) * 100),
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
      monthlyRevenue,
      topProducts,
      lowStockItems,
    };
  } catch {
    return MOCK;
  }
}
