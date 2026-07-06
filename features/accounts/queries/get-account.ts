import { createClient } from "@/lib/supabase/server";

import type { Account } from "@/types/account";

export async function getAccount(
  id: string
): Promise<Account | null> {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as Account;
}