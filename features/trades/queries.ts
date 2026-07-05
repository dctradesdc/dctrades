import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

export const getTrades = cache(async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: account } = await supabase
    .from("accounts")
    .select("id")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (!account) {
    return [];
  }

  const { data, error } = await supabase
    .from("trades")
    .select("*")
    .eq("account_id", account.id)
    .order("trade_date", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Failed to load trades:",
      error
    );

    return [];
  }

  return data;
});

export const getTrade = cache(
  async (tradeId: string) => {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data, error } = await supabase
      .from("trades")
      .select("*")
      .eq("id", tradeId)
      .single();

    if (error) {
      console.error(
        "Failed to load trade:",
        error
      );

      return null;
    }

    return data;
  }
);