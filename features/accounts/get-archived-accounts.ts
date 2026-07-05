import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

export const getArchivedAccounts = cache(
  async () => {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id)
      .eq("archived", true)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return [];
    }

    return data;
  }
);