import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import { calculateAccountMetrics } from "./calculations";



async function getAccountsQuery() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      supabase,
      user: null,
    };
  }

  return {
    supabase,
    user,
  };
}

export const getAccounts = cache(async () => {
  const { supabase, user } =
    await getAccountsQuery();

  if (!user) {
    return [];
  }

  const { data: accounts, error } =
    await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id)
      .eq("archived", false)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    console.error(
      "Failed to load accounts:",
      error
    );

    return [];
  }

  return Promise.all(
    accounts.map(async (account) => {
      const {
        data: trades,
      } = await supabase
        .from("trades")
        .select(
          `
          pnl,
          result
          `
        )
        .eq(
          "account_id",
          account.id
        );

      return {
        account,
        metrics:
          calculateAccountMetrics(
            account,
            trades ?? []
          ),
      };
    })
  );
});

export const getArchivedAccounts =
  cache(async () => {
    const { supabase, user } =
      await getAccountsQuery();

    if (!user) {
      return [];
    }

    const { data, error } =
      await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", user.id)
        .eq("archived", true)
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(
        "Failed to load archived accounts:",
        error
      );

      return [];
    }

    return data;
  });

export const getAccount = cache(
  async (accountId: string) => {
    const { supabase, user } =
      await getAccountsQuery();

    if (!user) {
      return null;
    }

    const { data, error } =
      await supabase
        .from("accounts")
        .select("*")
        .eq("id", accountId)
        .eq(
          "user_id",
          user.id
        )
        .single();

    if (error) {
      console.error(
        "Failed to load account:",
        error
      );

      return null;
    }

    return data;
  }
);