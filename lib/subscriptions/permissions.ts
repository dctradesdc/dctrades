import { PLANS } from "./plans";
import type { PlanName } from "./plans";

export function getPlanLimits(plan: PlanName) {
  return PLANS[plan];
}

export function canCreateAccount(
  plan: PlanName,
  currentAccounts: number
) {
  const maxAccounts =
    PLANS[plan].maxAccounts;

  if (maxAccounts === null) {
    return true;
  }

  return currentAccounts < maxAccounts;
}

export function canCreateTrade(
  plan: PlanName,
  currentTrades: number
) {
  const maxTrades =
    PLANS[plan].maxTrades;

  if (maxTrades === null) {
    return true;
  }

  return currentTrades < maxTrades;
}