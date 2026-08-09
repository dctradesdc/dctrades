import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import {
  PLANS,
  type PlanName,
} from "./plans";
import type { UserSubscription } from "./types";

const FREE_SUBSCRIPTION: UserSubscription = {
  plan: "free",
  status: "active",
  startedAt: null,
  expiresAt: null,
  paymentId: null,
};

export const getUserSubscription = cache(
  async (): Promise<UserSubscription> => {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Not logged in
    if (!user) {
      return FREE_SUBSCRIPTION;
    }

    const { data: subscriptions, error } =
      await supabase
        .from("subscriptions")
        .select(
          "plan, status, started_at, expires_at, provider_payment_id"
        )
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("expires_at", {
          ascending: false,
        });

    if (error) {
      console.error(
        "Get subscription error:",
        error
      );

      return FREE_SUBSCRIPTION;
    }

    const now = new Date();

    const subscription = subscriptions?.find(
      (item) =>
        item.expires_at &&
        new Date(item.expires_at) > now
    );

    // No active subscription
    if (!subscription) {
      return FREE_SUBSCRIPTION;
    }

    const plan = subscription.plan as PlanName;

    // Invalid database plan
    if (!PLANS[plan]) {
      console.error(
        "Invalid subscription plan:",
        subscription.plan
      );

      return FREE_SUBSCRIPTION;
    }

    return {
      plan,
      status: "active",
      startedAt: subscription.started_at,
      expiresAt: subscription.expires_at,
      paymentId:
        subscription.provider_payment_id,
    };
  }
);