export const NOWPAYMENTS_PLANS = {
  basic: {
    planId:
      process.env.NOWPAYMENTS_BASIC_PLAN_ID ?? "",
    name: "Basic",
    price: 15,
    durationDays: 92,
  },

  pro: {
    planId:
      process.env.NOWPAYMENTS_PRO_PLAN_ID ?? "",
    name: "Pro",
    price: 30,
    durationDays: 92,
  },
} as const;

export type PaidPlan = "basic" | "pro";