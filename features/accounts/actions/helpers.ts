import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    supabase,
    user,
  };
}

export function revalidateAccounts() {
  revalidatePath("/accounts");
  revalidatePath("/dashboard");
}