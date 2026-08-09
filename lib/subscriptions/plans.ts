export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    durationDays: null,
    maxAccounts: 1,
    maxTrades: 10,
  },

  basic: {
    name: "Basic",
    price: 15,
    durationDays: 92,
    maxAccounts: 2,
    maxTrades: null,
  },

  pro: {
    name: "Pro",
    price: 30,
    durationDays: 92,
    maxAccounts: null,
    maxTrades: null,
  },
} as const;

export type PlanName = keyof typeof PLANS;