"use server";

import type { TradeSchema } from "../validation";

import { tradeSchema } from "../validation";

import {
  getActiveAccount,
  revalidateTrades,
} from "./helpers";

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
    return {
      success: false,
      message: error.message,
    };
  }

  revalidateTrades();

  return {
    success: true,
    message:
      "Trade saved successfully.",
  };
}