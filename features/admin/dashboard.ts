import { createAdminClient } from "@/lib/supabase/admin";

const adminSupabase = createAdminClient();

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  totalAccounts: number;
  totalTrades: number;
}
export async function getDashboardStats(): Promise<DashboardStats> {
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

  const { data: profiles, error: profilesError } =
    await adminSupabase
      .from("profiles")
      .select(
        "id,is_suspended,last_active_at"
      );

  if (profilesError) {
    throw profilesError;
  }

  const { count: accounts } =
    await adminSupabase
      .from("accounts")
      .select("*", {
        count: "exact",
        head: true,
      });

  const { count: trades } =
    await adminSupabase
      .from("trades")
      .select("*", {
        count: "exact",
        head: true,
      });

  let activeUsers = 0;
  let inactiveUsers = 0;
  let suspendedUsers = 0;

  for (const profile of profiles ?? []) {
    if (profile.is_suspended) {
      suspendedUsers++;
      continue;
    }

    if (
      profile.last_active_at &&
      new Date(profile.last_active_at).getTime() >
        sevenDaysAgo
    ) {
      activeUsers++;
    } else {
      inactiveUsers++;
    }
  }

  return {
    totalUsers: profiles?.length ?? 0,
    activeUsers,
    inactiveUsers,
    suspendedUsers,
    totalAccounts: accounts ?? 0,
    totalTrades: trades ?? 0,
  };
}