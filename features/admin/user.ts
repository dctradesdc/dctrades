import { notFound } from "next/navigation";

import { createAdminClient } from "@/lib/supabase/admin";

export async function getAdminUser(id: string) {
  const supabase = createAdminClient();

  const [
    { data: profile, error: profileError },
    { data: authUser, error: authError },
    { count: accounts },
    { count: trades },
    { data: subscription },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single(),

    supabase.auth.admin.getUserById(id),

    supabase
      .from("accounts")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", id),

    supabase
      .from("trades")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", id),

    supabase
      .from("subscriptions")
      .select(
        "plan, status, started_at, expires_at, provider, provider_payment_id"
      )
      .eq("user_id", id)
      .order("expires_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle(),
  ]);

  if (profileError || !profile) {
    notFound();
  }

  if (authError) {
    throw new Error(authError.message);
  }

  const now = new Date();

  const subscriptionActive =
    subscription?.status === "active" &&
    subscription.expires_at &&
    new Date(subscription.expires_at) > now;

  return {
    ...profile,

    email: authUser.user?.email ?? "",

    accounts: accounts ?? 0,

    trades: trades ?? 0,

    plan: subscriptionActive
      ? subscription.plan
      : "free",

    subscription_status:
      subscription?.status ?? "expired",

    subscription_started_at:
      subscription?.started_at ?? null,

    subscription_expires_at:
      subscriptionActive
        ? subscription.expires_at
        : null,

    subscription_provider:
      subscription?.provider ?? null,

    subscription_payment_id:
      subscription?.provider_payment_id ?? null,
  };
}