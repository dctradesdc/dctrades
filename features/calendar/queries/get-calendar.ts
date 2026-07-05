import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

import { groupTradesByDay } from "../utils/group-trades";
import { calculateCalendarMetrics } from "../utils/calendar-metrics";

export const getCalendar = cache(
  async (
    month: number,
    year: number
  ) => {
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

    const start = new Date(
      year,
      month - 1,
      1
    );

    const end = new Date(
      year,
      month,
      1
    );

    const { data: trades, error } =
      await supabase
        .from("trades")
        .select("*")
        .eq(
          "account_id",
          account.id
        )
        .gte(
          "trade_date",
          start.toISOString()
        )
        .lt(
          "trade_date",
          end.toISOString()
        )
        .order("trade_date");

    if (error) {
      console.error(error);
      return null;
    }

    const days =
      groupTradesByDay(
        trades ?? []
      );

    const metrics =
      calculateCalendarMetrics(
        days,
        month,
        year
      );

    return {
      accountId: account.id,

      trades: trades ?? [],

      ...metrics,
    };
  }
);