"use server";

import type { TradeSchema } from "../validation";
import { tradeSchema } from "../validation";

import {
  getActiveAccount,
  revalidateTrades,
} from "./helpers";

import { getUserSubscription } from "@/lib/subscriptions/get-user-plan";
import { canCreateTrade } from "@/lib/subscriptions/limits";

export async function createTrade(
  values: TradeSchema
) {
  const {
    supabase,
    user,
    account,
  } = await getActiveAccount();

  if (!user) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  if (!account) {
    return {
      success: false,
      message:
        "Please create and activate a trading account first.",
    };
  }

  const parsed =
    tradeSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid trade data.",
    };
  }

  /*
   * Check the user's current plan.
   * Existing trades are never modified or deleted.
   */
  const subscription =
    await getUserSubscription();

  /*
   * Count all trades belonging to the user.
   *
   * We count existing trades across all journal
   * accounts because the Free plan has a total
   * trade limit.
   */
  const { count, error: countError } =
    await supabase
      .from("trades")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

  if (countError) {
    console.error(
      "Trade count error:",
      countError
    );

    return {
      success: false,
      message:
        "Unable to verify your trade limit.",
    };
  }

  const currentTrades = count ?? 0;

  /*
   * Enforce plan limit.
   */
  if (
    !canCreateTrade(
      subscription.plan,
      currentTrades
    )
  ) {
    return {
      success: false,
      message:
        "You have reached the 10-trade limit on the Free plan. Upgrade to Basic or Pro to continue journaling unlimited trades.",
    };
  }

  const { error } = await supabase
    .from("trades")
    .insert({
      user_id: user.id,
      account_id: account.id,

      pair: parsed.data.pair,
      direction: parsed.data.direction,
      session: parsed.data.session,

      amount: parsed.data.amount,
      result: parsed.data.result,

      // Positive for profit, negative for loss
      pnl:
        parsed.data.result === "LOSS"
          ? -Math.abs(parsed.data.amount)
          : parsed.data.result ===
              "BREAKEVEN"
            ? 0
            : Math.abs(
                parsed.data.amount
              ),

      reason: parsed.data.reason,
      notes: parsed.data.notes,

      trade_date:
        parsed.data.trade_date,

      before_image_url:
        parsed.data.before_image_url,

      after_image_url:
        parsed.data.after_image_url,
    });

  if (error) {
    console.error(
      "Create trade error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to save the trade.",
    };
  }

  revalidateTrades();

  return {
    success: true,
    message:
      "Trade saved successfully.",
  };
}