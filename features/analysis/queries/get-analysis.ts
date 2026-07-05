import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

export const getAnalysis = cache(
  async () => {
    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    // Active account
    const {
      data: account,
    } = await supabase
      .from("accounts")
      .select("id")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .single();

    if (!account) {
      return null;
    }

    const {
      data: trades,
      error,
    } = await supabase
      .from("trades")
      .select("*")
      .eq(
        "account_id",
        account.id
      )
      .order("trade_date", {
        ascending: true,
      });

    if (error) {
      console.error(error);

      return null;
    }

    return trades ?? [];
  }
);