-- ─────────────────────────────────────────────────────────────────────────────
-- InventoryCo Ltd — Sample case study schema
-- Quantyx Advisory demo data layer
--
-- Run this in the Supabase SQL editor BEFORE running seed.sql
-- Tables are prefixed with "ic_" to avoid conflicts with other projects
-- ─────────────────────────────────────────────────────────────────────────────

-- Products catalogue
CREATE TABLE IF NOT EXISTS ic_products (
  id                  SERIAL PRIMARY KEY,
  product_name        TEXT           NOT NULL,
  category            TEXT           NOT NULL,
  unit_cost_gbp       NUMERIC(10, 2) NOT NULL,
  selling_price_gbp   NUMERIC(10, 2) NOT NULL
);

-- Sales transactions
CREATE TABLE IF NOT EXISTS ic_sales (
  id              SERIAL PRIMARY KEY,
  order_date      DATE           NOT NULL,
  order_id        TEXT           NOT NULL UNIQUE,
  product_id      INTEGER        NOT NULL REFERENCES ic_products(id),
  customer_name   TEXT           NOT NULL,
  quantity        INTEGER        NOT NULL,
  revenue_gbp     NUMERIC(10, 2) NOT NULL,  -- quantity × selling_price at time of sale
  cost_gbp        NUMERIC(10, 2) NOT NULL   -- quantity × unit_cost at time of sale
);

-- Inventory positions
CREATE TABLE IF NOT EXISTS ic_inventory (
  id                SERIAL PRIMARY KEY,
  product_id        INTEGER  NOT NULL REFERENCES ic_products(id) UNIQUE,
  stock_level       INTEGER  NOT NULL,
  reorder_level     INTEGER  NOT NULL,
  last_restock_date DATE     NOT NULL
);

-- ─── Read policy (allow anonymous read for demo) ──────────────────────────────
-- Run these if RLS is enabled on your project:
--
-- ALTER TABLE ic_products  ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ic_sales     ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ic_inventory ENABLE ROW LEVEL SECURITY;
--
-- CREATE POLICY "Public read ic_products"  ON ic_products  FOR SELECT USING (true);
-- CREATE POLICY "Public read ic_sales"     ON ic_sales     FOR SELECT USING (true);
-- CREATE POLICY "Public read ic_inventory" ON ic_inventory FOR SELECT USING (true);
-- ─────────────────────────────────────────────────────────────────────────────
