import { PLANS, type PlanName } from "./plans";

export function getPlanLimits(plan: PlanName) {
  return {
    maxAccounts: PLANS[plan].maxAccounts,
    maxTrades: PLANS[plan].maxTrades,
  };
}

export function canCreateAccount(
  plan: PlanName,
  currentAccounts: number
) {
  const maxAccounts = PLANS[plan].maxAccounts;

  if (maxAccounts === null) {
    return true;
  }

  return currentAccounts < maxAccounts;
}

export function canCreateTrade(
  plan: PlanName,
  currentTrades: number
) {
  const maxTrades = PLANS[plan].maxTrades;

  if (maxTrades === null) {
    return true;
  }

  return currentTrades < maxTrades;
}