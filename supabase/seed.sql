-- ─────────────────────────────────────────────────────────────────────────────
-- InventoryCo Ltd — Sample seed data
-- Quantyx Advisory demo — illustrative data only
--
-- Run AFTER schema.sql
-- Covers Oct 2025 – Mar 2026 (6 months, 50 sales rows)
-- Target: ~£487k revenue, ~29% gross margin
-- ─────────────────────────────────────────────────────────────────────────────

-- Clear existing data (safe to re-run)
TRUNCATE ic_inventory, ic_sales, ic_products RESTART IDENTITY CASCADE;

-- ── Products ─────────────────────────────────────────────────────────────────
-- LED Panel Pro carries ~34% margin — highest in the range
-- Other products blend down to ~28–30% overall margin

INSERT INTO ic_products (product_name, category, unit_cost_gbp, selling_price_gbp) VALUES
  ('LED Panel Pro',           'Lighting',    59.00,  89.00),   -- id 1  margin: 33.7%
  ('LED Strip Kit',           'Lighting',    21.00,  28.00),   -- id 2  margin: 25.0%
  ('Outdoor Floodlight',      'Outdoor',     57.00,  75.00),   -- id 3  margin: 24.0%
  ('Smart Dimmer Module',     'Controls',    30.00,  45.00),   -- id 4  margin: 33.3%
  ('Ceiling Recessed Spot',   'Lighting',    28.00,  42.00),   -- id 5  margin: 33.3%
  ('Garden Path Light',       'Outdoor',     22.00,  32.00),   -- id 6  margin: 31.3%
  ('Commercial Batten Light', 'Commercial',  54.00,  72.00),   -- id 7  margin: 25.0%
  ('Emergency Exit Sign',     'Commercial',  43.00,  58.00),   -- id 8  margin: 25.9%
  ('PIR Motion Sensor',       'Controls',    29.00,  38.00);   -- id 9  margin: 23.7%

-- ── Inventory ────────────────────────────────────────────────────────────────
-- 3 SKUs intentionally below reorder level

INSERT INTO ic_inventory (product_id, stock_level, reorder_level, last_restock_date) VALUES
  (1, 42,  50,  '2026-03-01'),   -- LED Panel Pro       — BELOW REORDER (84%)
  (2, 180, 100, '2026-02-28'),   -- LED Strip Kit        — OK
  (3, 8,   30,  '2026-01-15'),   -- Outdoor Floodlight  — CRITICAL (27%)
  (4, 75,  40,  '2026-03-10'),   -- Smart Dimmer         — OK
  (5, 90,  60,  '2026-02-20'),   -- Ceiling Spot         — OK
  (6, 215, 80,  '2026-03-05'),   -- Garden Path Light    — OK
  (7, 18,  35,  '2026-02-10'),   -- Commercial Batten   — BELOW REORDER (51%)
  (8, 65,  40,  '2026-03-12'),   -- Emergency Exit Sign  — OK
  (9, 120, 50,  '2026-03-08');   -- PIR Motion Sensor    — OK

-- ── Sales — Oct 2025 (~£54.7k) ───────────────────────────────────────────────
INSERT INTO ic_sales (order_date, order_id, product_id, customer_name, quantity, revenue_gbp, cost_gbp) VALUES
  ('2025-10-03', 'ORD-001', 7, 'Brightfield Construction Ltd',   500, 36000.00, 27000.00),
  ('2025-10-07', 'ORD-002', 3, 'Metro Electrical Supplies',      100,  7500.00,  5700.00),
  ('2025-10-12', 'ORD-003', 4, 'Northern Trade Centre',          100,  4500.00,  3000.00),
  ('2025-10-17', 'ORD-004', 5, 'Sunbeam Retail Group',            50,  2100.00,  1400.00),
  ('2025-10-22', 'ORD-005', 6, 'Prestige Property Developers',   100,  3200.00,  2200.00),
  ('2025-10-28', 'ORD-006', 2, 'Apex Facilities Management',      50,  1400.00,  1050.00);

-- ── Sales — Nov 2025 (~£68.3k) ───────────────────────────────────────────────
INSERT INTO ic_sales (order_date, order_id, product_id, customer_name, quantity, revenue_gbp, cost_gbp) VALUES
  ('2025-11-04', 'ORD-007', 1, 'Metro Electrical Supplies',      200, 17800.00, 11800.00),
  ('2025-11-08', 'ORD-008', 7, 'Citywide Maintenance Co',        300, 21600.00, 16200.00),
  ('2025-11-13', 'ORD-009', 3, 'Coastal Electrical Ltd',         150, 11250.00,  8550.00),
  ('2025-11-18', 'ORD-010', 8, 'Premier Building Solutions',     100,  5800.00,  4300.00),
  ('2025-11-21', 'ORD-011', 9, 'Regent Commercial Fit-Out',      100,  3800.00,  2900.00),
  ('2025-11-25', 'ORD-012', 4, 'Apex Facilities Management',      50,  2250.00,  1500.00),
  ('2025-11-27', 'ORD-013', 5, 'Northern Trade Centre',          100,  4200.00,  2800.00),
  ('2025-11-29', 'ORD-014', 6, 'Sunbeam Retail Group',            50,  1600.00,  1100.00);

-- ── Sales — Dec 2025 (~£81.8k) ───────────────────────────────────────────────
INSERT INTO ic_sales (order_date, order_id, product_id, customer_name, quantity, revenue_gbp, cost_gbp) VALUES
  ('2025-12-02', 'ORD-015', 1, 'Brightfield Construction Ltd',   300, 26700.00, 17700.00),
  ('2025-12-05', 'ORD-016', 7, 'Citywide Maintenance Co',        250, 18000.00, 13500.00),
  ('2025-12-09', 'ORD-017', 2, 'Metro Electrical Supplies',      200,  5600.00,  4200.00),
  ('2025-12-12', 'ORD-018', 3, 'Coastal Electrical Ltd',         100,  7500.00,  5700.00),
  ('2025-12-16', 'ORD-019', 8, 'Premier Building Solutions',      80,  4640.00,  3440.00),
  ('2025-12-18', 'ORD-020', 9, 'Regent Commercial Fit-Out',       80,  3040.00,  2320.00),
  ('2025-12-20', 'ORD-021', 4, 'Northern Trade Centre',           80,  3600.00,  2400.00),
  ('2025-12-23', 'ORD-022', 6, 'Prestige Property Developers',   150,  4800.00,  3300.00),
  ('2025-12-27', 'ORD-023', 5, 'Apex Facilities Management',      80,  3360.00,  2240.00),
  ('2025-12-30', 'ORD-024', 9, 'Sunbeam Retail Group',           120,  4560.00,  3480.00);

-- ── Sales — Jan 2026 (~£87.7k) ───────────────────────────────────────────────
INSERT INTO ic_sales (order_date, order_id, product_id, customer_name, quantity, revenue_gbp, cost_gbp) VALUES
  ('2026-01-06', 'ORD-025', 1, 'Metro Electrical Supplies',      350, 31150.00, 20650.00),
  ('2026-01-09', 'ORD-026', 7, 'Premier Building Solutions',     300, 21600.00, 16200.00),
  ('2026-01-14', 'ORD-027', 3, 'Brightfield Construction Ltd',   150, 11250.00,  8550.00),
  ('2026-01-17', 'ORD-028', 2, 'Citywide Maintenance Co',        150,  4200.00,  3150.00),
  ('2026-01-21', 'ORD-029', 8, 'Coastal Electrical Ltd',         120,  6960.00,  5160.00),
  ('2026-01-24', 'ORD-030', 4, 'Northern Trade Centre',           80,  3600.00,  2400.00),
  ('2026-01-27', 'ORD-031', 6, 'Regent Commercial Fit-Out',       80,  2560.00,  1760.00),
  ('2026-01-29', 'ORD-032', 5, 'Apex Facilities Management',      80,  3360.00,  2240.00),
  ('2026-01-31', 'ORD-033', 9, 'Sunbeam Retail Group',            80,  3040.00,  2320.00);

-- ── Sales — Feb 2026 (~£95.1k) ───────────────────────────────────────────────
INSERT INTO ic_sales (order_date, order_id, product_id, customer_name, quantity, revenue_gbp, cost_gbp) VALUES
  ('2026-02-04', 'ORD-034', 1, 'Brightfield Construction Ltd',   400, 35600.00, 23600.00),
  ('2026-02-07', 'ORD-035', 7, 'Metro Electrical Supplies',      350, 25200.00, 18900.00),
  ('2026-02-12', 'ORD-036', 3, 'Coastal Electrical Ltd',         150, 11250.00,  8550.00),
  ('2026-02-17', 'ORD-037', 8, 'Premier Building Solutions',     100,  5800.00,  4300.00),
  ('2026-02-20', 'ORD-038', 2, 'Citywide Maintenance Co',        200,  5600.00,  4200.00),
  ('2026-02-24', 'ORD-039', 4, 'Northern Trade Centre',           80,  3600.00,  2400.00),
  ('2026-02-26', 'ORD-040', 9, 'Apex Facilities Management',      80,  3040.00,  2320.00),
  ('2026-02-28', 'ORD-041', 5, 'Regent Commercial Fit-Out',      120,  5040.00,  3360.00);

-- ── Sales — Mar 2026 (~£100k) ────────────────────────────────────────────────
INSERT INTO ic_sales (order_date, order_id, product_id, customer_name, quantity, revenue_gbp, cost_gbp) VALUES
  ('2026-03-03', 'ORD-042', 1, 'Metro Electrical Supplies',      450, 40050.00, 26550.00),
  ('2026-03-06', 'ORD-043', 7, 'Brightfield Construction Ltd',   350, 25200.00, 18900.00),
  ('2026-03-11', 'ORD-044', 3, 'Citywide Maintenance Co',        120,  9000.00,  6840.00),
  ('2026-03-14', 'ORD-045', 8, 'Premier Building Solutions',     150,  8700.00,  6450.00),
  ('2026-03-18', 'ORD-046', 6, 'Prestige Property Developers',   200,  6400.00,  4400.00),
  ('2026-03-21', 'ORD-047', 4, 'Coastal Electrical Ltd',          80,  3600.00,  2400.00),
  ('2026-03-24', 'ORD-048', 9, 'Regent Commercial Fit-Out',       80,  3040.00,  2320.00),
  ('2026-03-27', 'ORD-049', 2, 'Northern Trade Centre',          100,  2800.00,  2100.00),
  ('2026-03-31', 'ORD-050', 5, 'Apex Facilities Management',      30,  1260.00,   840.00);

-- ── Verification queries (run to confirm) ────────────────────────────────────
-- SELECT COUNT(*) FROM ic_sales;                     -- expect 50
-- SELECT SUM(revenue_gbp) FROM ic_sales;             -- expect ~487,700
-- SELECT ROUND((SUM(revenue_gbp - cost_gbp) / SUM(revenue_gbp)) * 100, 1) AS margin_pct FROM ic_sales;
-- SELECT product_id, SUM(revenue_gbp - cost_gbp) AS profit FROM ic_sales GROUP BY product_id ORDER BY profit DESC;
