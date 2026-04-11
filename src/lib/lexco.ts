import { getSupabaseClient } from "./supabase";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export type Matter = {
  matter_id: string;
  name: string;
  client: string;
  department: string;
  partner: string;
  status: "on-track" | "at-risk" | "delayed" | "complete" | "billing-pending";
  open_date: string;
  target_close: string;
  wip_gbp: number;
  billed_gbp: number;
  budget_gbp: number;
  hours_recorded: number;
  recovery_rate_pct: number;
  margin_pct: number;
  risk_flag: string | null;
};

export type Timekeeper = {
  name: string;
  role: "partner" | "senior-associate" | "associate" | "trainee";
  department: string;
  billable_hours_month: number;
  non_billable_hours_month: number;
  capacity_hours_month: number;
  utilisation_pct: number;
  chargeable_value_gbp: number;
  status: "available" | "near-capacity" | "overallocated";
};

export type WIPBucket = {
  label: string;
  days: string;
  value_gbp: number;
  count: number;
  at_risk: boolean;
};

export type MonthlyFees = {
  month: string;
  billed: number;
  target: number;
};

export type LexCoKPIs = {
  total_wip_gbp: number;
  billable_hours_month: number;
  realisation_rate_pct: number;
  utilisation_rate_pct: number;
  fees_billed_month_gbp: number;
  write_offs_gbp: number;
};

export type LexCoDashboard = {
  kpis: LexCoKPIs;
  matters: Matter[];
  timekeepers: Timekeeper[];
  wipAging: WIPBucket[];
  monthlyFees: MonthlyFees[];
  source: "supabase" | "mock";
};

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */

const MOCK: LexCoDashboard = {
  source: "mock",

  kpis: {
    total_wip_gbp:          1_220_000,
    billable_hours_month:   3_420,
    realisation_rate_pct:   87.4,
    utilisation_rate_pct:   78.2,
    fees_billed_month_gbp:  540_000,
    write_offs_gbp:         62_000,
  },

  matters: [
    {
      matter_id:          "M-204",
      name:               "Corporate Restructure",
      client:             "Meridian Capital Partners",
      department:         "Corporate",
      partner:            "S. Chen",
      status:             "at-risk",
      open_date:          "04 Nov 2024",
      target_close:       "28 Feb 2025",
      wip_gbp:            48_000,
      billed_gbp:         32_000,
      budget_gbp:         95_000,
      hours_recorded:     156,
      recovery_rate_pct:  66.7,
      margin_pct:         22,
      risk_flag:          "Low recovery rate — two invoices under client query. WIP at risk of partial write-off.",
    },
    {
      matter_id:          "M-187",
      name:               "Commercial Lease Portfolio",
      client:             "Stratford Property Group",
      department:         "Real Estate",
      partner:            "J. Harrington",
      status:             "on-track",
      open_date:          "12 Sep 2024",
      target_close:       "31 Mar 2025",
      wip_gbp:            28_000,
      billed_gbp:         64_000,
      budget_gbp:         110_000,
      hours_recorded:     218,
      recovery_rate_pct:  92.3,
      margin_pct:         38,
      risk_flag:          null,
    },
    {
      matter_id:          "M-219",
      name:               "Employment Tribunal — Rayner v Hawthorn",
      client:             "Hawthorn Financial Ltd",
      department:         "Employment",
      partner:            "P. Sharma",
      status:             "at-risk",
      open_date:          "18 Oct 2024",
      target_close:       "30 Apr 2025",
      wip_gbp:            19_000,
      billed_gbp:         22_000,
      budget_gbp:         55_000,
      hours_recorded:     94,
      recovery_rate_pct:  68.2,
      margin_pct:         18,
      risk_flag:          "Client disputing time entries. Recovery rate below 70% threshold — partner review required.",
    },
    {
      matter_id:          "M-244",
      name:               "Company Sale — Helix Biotech",
      client:             "Helix Biotech Ltd",
      department:         "Corporate",
      partner:            "J. Harrington",
      status:             "on-track",
      open_date:          "02 Dec 2024",
      target_close:       "28 Mar 2025",
      wip_gbp:            62_000,
      billed_gbp:         95_000,
      budget_gbp:         180_000,
      hours_recorded:     312,
      recovery_rate_pct:  91.4,
      margin_pct:         42,
      risk_flag:          null,
    },
    {
      matter_id:          "M-209",
      name:               "Shareholder Dispute — Crestwood",
      client:             "Crestwood Holdings",
      department:         "Litigation",
      partner:            "T. Bradley",
      status:             "at-risk",
      open_date:          "08 Aug 2024",
      target_close:       "15 May 2025",
      wip_gbp:            88_000,
      billed_gbp:         12_000,
      budget_gbp:         120_000,
      hours_recorded:     284,
      recovery_rate_pct:  57.1,
      margin_pct:         8,
      risk_flag:          "WIP over 90 days unbilled — billing stalled pending litigation outcome. Significant write-off risk.",
    },
    {
      matter_id:          "M-231",
      name:               "Property Acquisition — Canary Wharf",
      client:             "Oak & Moor Developments",
      department:         "Real Estate",
      partner:            "S. Chen",
      status:             "on-track",
      open_date:          "21 Jan 2025",
      target_close:       "30 Apr 2025",
      wip_gbp:            35_000,
      billed_gbp:         18_000,
      budget_gbp:         80_000,
      hours_recorded:     141,
      recovery_rate_pct:  89.1,
      margin_pct:         34,
      risk_flag:          null,
    },
    {
      matter_id:          "M-226",
      name:               "Planning Application — Riverside Quarter",
      client:             "Riverside Quarter Ltd",
      department:         "Planning",
      partner:            "P. Sharma",
      status:             "delayed",
      open_date:          "14 Oct 2024",
      target_close:       "28 Feb 2025",
      wip_gbp:            24_000,
      billed_gbp:         31_000,
      budget_gbp:         70_000,
      hours_recorded:     172,
      recovery_rate_pct:  82.4,
      margin_pct:         26,
      risk_flag:          "Matter delayed by council decision — target close overdue. WIP aging past 60 days.",
    },
    {
      matter_id:          "M-251",
      name:               "GDPR Compliance Review",
      client:             "Vantage Insurance Group",
      department:         "Commercial",
      partner:            "E. Wallace",
      status:             "on-track",
      open_date:          "10 Feb 2025",
      target_close:       "31 Mar 2025",
      wip_gbp:            11_000,
      billed_gbp:         28_000,
      budget_gbp:         52_000,
      hours_recorded:     88,
      recovery_rate_pct:  95.2,
      margin_pct:         44,
      risk_flag:          null,
    },
    {
      matter_id:          "M-198",
      name:               "IP Licensing Agreement",
      client:             "NovaTech IP Holdings",
      department:         "IP",
      partner:            "S. Chen",
      status:             "billing-pending",
      open_date:          "03 Sep 2024",
      target_close:       "20 Feb 2025",
      wip_gbp:            42_000,
      billed_gbp:         58_000,
      budget_gbp:         115_000,
      hours_recorded:     241,
      recovery_rate_pct:  88.0,
      margin_pct:         36,
      risk_flag:          "Final invoice not yet raised — £42k WIP awaiting fee earner sign-off.",
    },
    {
      matter_id:          "M-215",
      name:               "Contract Negotiation Series",
      client:             "Ascend Digital Ltd",
      department:         "Commercial",
      partner:            "D. Osei",
      status:             "complete",
      open_date:          "29 Oct 2024",
      target_close:       "31 Jan 2025",
      wip_gbp:            0,
      billed_gbp:         38_000,
      budget_gbp:         40_000,
      hours_recorded:     126,
      recovery_rate_pct:  97.4,
      margin_pct:         41,
      risk_flag:          null,
    },
  ],

  timekeepers: [
    {
      name:                     "Sarah Chen",
      role:                     "partner",
      department:               "Corporate / IP",
      billable_hours_month:     148,
      non_billable_hours_month: 24,
      capacity_hours_month:     160,
      utilisation_pct:          92.5,
      chargeable_value_gbp:     52_400,
      status:                   "near-capacity",
    },
    {
      name:                     "James Harrington",
      role:                     "partner",
      department:               "Corporate",
      billable_hours_month:     118,
      non_billable_hours_month: 36,
      capacity_hours_month:     160,
      utilisation_pct:          73.8,
      chargeable_value_gbp:     41_800,
      status:                   "available",
    },
    {
      name:                     "Priya Sharma",
      role:                     "senior-associate",
      department:               "Employment / Planning",
      billable_hours_month:     141,
      non_billable_hours_month: 19,
      capacity_hours_month:     160,
      utilisation_pct:          88.1,
      chargeable_value_gbp:     34_100,
      status:                   "near-capacity",
    },
    {
      name:                     "Tom Bradley",
      role:                     "associate",
      department:               "Litigation",
      billable_hours_month:     152,
      non_billable_hours_month: 8,
      capacity_hours_month:     160,
      utilisation_pct:          95.0,
      chargeable_value_gbp:     26_800,
      status:                   "near-capacity",
    },
    {
      name:                     "Emma Wallace",
      role:                     "associate",
      department:               "Commercial",
      billable_hours_month:     98,
      non_billable_hours_month: 38,
      capacity_hours_month:     160,
      utilisation_pct:          61.3,
      chargeable_value_gbp:     17_300,
      status:                   "available",
    },
    {
      name:                     "David Osei",
      role:                     "trainee",
      department:               "Commercial",
      billable_hours_month:     125,
      non_billable_hours_month: 35,
      capacity_hours_month:     160,
      utilisation_pct:          78.1,
      chargeable_value_gbp:     12_500,
      status:                   "available",
    },
  ],

  wipAging: [
    { label: "Current",  days: "0–30 days",  value_gbp: 580_000, count: 18, at_risk: false },
    { label: "Ageing",   days: "31–60 days", value_gbp: 340_000, count: 11, at_risk: false },
    { label: "Overdue",  days: "61–90 days", value_gbp: 180_000, count:  6, at_risk: true  },
    { label: "Critical", days: "90+ days",   value_gbp: 120_000, count:  4, at_risk: true  },
  ],

  monthlyFees: [
    { month: "Aug", billed: 420_000, target: 500_000 },
    { month: "Sep", billed: 480_000, target: 500_000 },
    { month: "Oct", billed: 510_000, target: 510_000 },
    { month: "Nov", billed: 495_000, target: 510_000 },
    { month: "Dec", billed: 380_000, target: 460_000 },
    { month: "Jan", billed: 530_000, target: 520_000 },
    { month: "Feb", billed: 540_000, target: 530_000 },
  ],
};

/* ─────────────────────────────────────────────
   DATA FETCH (Supabase → mock fallback)
───────────────────────────────────────────── */

export async function getLexCoData(): Promise<LexCoDashboard> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) return MOCK;
    // Production: query lc_matters, lc_timekeepers, lc_wip_aging etc.
    return MOCK;
  } catch {
    return MOCK;
  }
}
