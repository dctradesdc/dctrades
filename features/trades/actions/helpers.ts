"use server";

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

export async function getActiveAccount() {
  const { supabase, user } =
    await getCurrentUser();

  if (!user) {
    return {
      supabase,
      user: null,
      account: null,
    };
  }

  const { data: account } =
    await supabase
      .from("accounts")
      .select("id")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .single();

  return {
    supabase,
    user,
    account,
  };
}

export async function revalidateTrades() {
  revalidatePath("/trades");
  revalidatePath("/dashboard");
  revalidatePath("/calendar");
  revalidatePath("/analytics");
}