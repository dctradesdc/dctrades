import { createClient } from "@/lib/supabase/server";

export async function getAccount(
  id: string
) {
  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("accounts")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    return null;
  }

  return data;
}