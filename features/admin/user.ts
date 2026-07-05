import { notFound } from "next/navigation";

import { createAdminClient } from "@/lib/supabase/admin";

export async function getAdminUser(
  id: string
) {
  const supabase = createAdminClient();

  const [
    { data: profile, error: profileError },
    { data: authUser, error: authError },
    { count: accounts },
    { count: trades },
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
  ]);

  if (profileError || !profile) {
    notFound();
  }

  if (authError) {
    throw new Error(authError.message);
  }

  return {
    ...profile,
    email: authUser.user?.email ?? "",
    accounts: accounts ?? 0,
    trades: trades ?? 0,
  };
}