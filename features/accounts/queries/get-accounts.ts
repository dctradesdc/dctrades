import { createClient } from "@/lib/supabase/server";

export async function getAccounts() {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data } =
    await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at");

  return data ?? [];
}