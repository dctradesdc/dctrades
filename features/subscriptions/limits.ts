export const PLAN_LIMITS = {
  free: {
    maxAccounts: 1,
    maxTrades: 10,
  },

  basic: {
    maxAccounts: 2,
    maxTrades: Infinity,
  },

  pro: {
    maxAccounts: Infinity,
    maxTrades: Infinity,
  },
} as const;

export type PlanName =
  keyof typeof PLAN_LIMITS;