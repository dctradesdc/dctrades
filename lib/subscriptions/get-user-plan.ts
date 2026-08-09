import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import {
  PLANS,
  type PlanName,
} from "./plans";
import type { UserSubscription } from "./types";

export const getUserSubscription = cache(
  async (): Promise<UserSubscription> => {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        plan: "free",
        status: "active",
        startedAt: null,
        expiresAt: null,
        paymentId: null,
      };
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

      return {
        plan: "free",
        status: "active",
        startedAt: null,
        expiresAt: null,
        paymentId: null,
      };
    }

    const subscription =
      subscriptions?.find(
        (item) =>
          item.expires_at &&
          new Date(item.expires_at) > new Date()
      );

    if (!subscription) {
      return {
        plan: "free",
        status: "active",
        startedAt: null,
        expiresAt: null,
        paymentId: null,
      };
    }

    const plan =
      subscription.plan as PlanName;

    if (!PLANS[plan]) {
      return {
        plan: "free",
        status: "active",
        startedAt: null,
        expiresAt: null,
        paymentId: null,
      };
    }

    return {
      plan,
      status: subscription.status,
      startedAt: subscription.started_at,
      expiresAt: subscription.expires_at,
      paymentId:
        subscription.provider_payment_id,
    };
  }
);