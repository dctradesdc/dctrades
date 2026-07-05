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
  ] = await Promise.all([
    supabase.from("profiles").select("*"),
    supabase
      .from("accounts")
      .select("user_id"),
    supabase
      .from("trades")
      .select("user_id"),
  ]);

  return users.map((user) => {
    const profile = profiles?.find(
      (p) => p.id === user.id
    );

    let status: AdminUser["status"] =
      "inactive";

    if (profile?.is_suspended) {
      status = "suspended";
    } else if (
      profile?.last_active_at &&
      new Date(
        profile.last_active_at
      ) > sevenDaysAgo
    ) {
      status = "active";
    }

    return {
      id: user.id,

      email: user.email ?? "",

      full_name:
        profile?.full_name ?? null,

      avatar_url:
        profile?.avatar_url ?? null,

      created_at:
        profile?.created_at ?? "",

      last_active_at:
        profile?.last_active_at ??
        null,

      is_admin:
        profile?.is_admin ?? false,

      is_suspended:
        profile?.is_suspended ??
        false,

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
    };
  });
}