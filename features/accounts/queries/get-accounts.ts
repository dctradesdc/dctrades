import { createClient } from "@/lib/supabase/server";

import type { Account } from "@/types/account";

export async function getAccounts(): Promise<Account[]> {
  const supabase =
    await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const {
    data,
    error,
  } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as Account[];
}