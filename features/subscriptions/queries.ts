import { createClient } from "@/lib/supabase/server";
import {
  PLAN_LIMITS,
  type PlanName,
} from "./limits";

export async function getCurrentPlan(): Promise<PlanName> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "free";
  }

  const { data: subscription } =
    await supabase
      .from("subscriptions")
      .select("plan, status, expires_at")
      .eq("user_id", user.id)
      .eq("status", "active")
      .gt("expires_at", new Date().toISOString())
      .order("expires_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

  if (
    subscription?.plan === "basic" ||
    subscription?.plan === "pro"
  ) {
    return subscription.plan;
  }

  return "free";
}

export async function getPlanLimits() {
  const plan = await getCurrentPlan();

  return {
    plan,
    limits: PLAN_LIMITS[plan],
  };
}