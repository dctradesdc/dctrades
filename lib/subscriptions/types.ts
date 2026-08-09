import type { PlanName } from "./plans";

export interface UserSubscription {
  plan: PlanName;
  status:
    | "active"
    | "expired"
    | "pending"
    | "cancelled";
  startedAt: string | null;
  expiresAt: string | null;
  paymentId?: string | null;
}