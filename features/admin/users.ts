import { createAdminClient } from "@/lib/supabase/admin";

export interface AdminUser {
  id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  created_at: string;
  last_active_at: string | null;
  is_admin: boolean;
  is_suspended: boolean;
  accounts: number;
  trades: number;
  status: "active" | "inactive" | "suspended";

  subscription: {
    plan: "free" | "basic" | "pro";
    status:
      | "active"
      | "expired"
      | "pending"
      | "cancelled";
    startedAt: string | null;
    expiresAt: string | null;
    paymentId: string | null;
  };
}

export async function getUsers(): Promise<AdminUser[]> {
  const supabase = createAdminClient();

  const {
    data: { users },
    error,
  } = await supabase.auth.admin.listUsers();

  if (error) {
    throw error;
  }

  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(
    sevenDaysAgo.getDate() - 7
  );

  const [
    { data: profiles },
    { data: accounts },
    { data: trades },
    { data: subscriptions },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("*"),

    supabase
      .from("accounts")
      .select("user_id"),

    supabase
      .from("trades")
      .select("user_id"),

    supabase
      .from("subscriptions")
      .select(
        "user_id, plan, status, started_at, expires_at, provider_payment_id"
      ),
  ]);

  const now = new Date();

  return users.map((user) => {
    const profile = profiles?.find(
      (p) => p.id === user.id
    );

    /*
     * Use Supabase Auth last_sign_in_at as the
     * primary activity source.
     *
     * Fall back to profile.last_active_at if
     * Auth does not have a sign-in timestamp.
     */
    const lastActiveAt =
      user.last_sign_in_at ??
      profile?.last_active_at ??
      null;

    let status: AdminUser["status"] =
      "inactive";

    if (profile?.is_suspended) {
      status = "suspended";
    } else if (
      lastActiveAt &&
      new Date(lastActiveAt) > sevenDaysAgo
    ) {
      status = "active";
    }

    const subscription =
      subscriptions?.find(
        (subscription) =>
          subscription.user_id === user.id &&
          subscription.status === "active" &&
          subscription.expires_at &&
          new Date(
            subscription.expires_at
          ) > now
      );

    return {
      id: user.id,

      email: user.email ?? "",

      full_name:
        profile?.full_name ?? null,

      avatar_url:
        profile?.avatar_url ?? null,

      created_at:
        profile?.created_at ??
        user.created_at ??
        "",

      last_active_at: lastActiveAt,

      is_admin:
        profile?.is_admin ?? false,

      is_suspended:
        profile?.is_suspended ?? false,

      accounts:
        accounts?.filter(
          (account) =>
            account.user_id === user.id
        ).length ?? 0,

      trades:
        trades?.filter(
          (trade) =>
            trade.user_id === user.id
        ).length ?? 0,

      status,

      subscription: subscription
        ? {
            plan: subscription.plan as
              | "free"
              | "basic"
              | "pro",

            status: subscription.status as
              | "active"
              | "expired"
              | "pending"
              | "cancelled",

            startedAt:
              subscription.started_at,

            expiresAt:
              subscription.expires_at,

            paymentId:
              subscription.provider_payment_id,
          }
        : {
            plan: "free",

            status: "active",

            startedAt: null,

            expiresAt: null,

            paymentId: null,
          },
    };
  });
}