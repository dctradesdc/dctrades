"use server";

import { tradeSchema } from "../validation";

import {
  getCurrentUser,
  revalidateTrades,
} from "./helpers";

import type { TradeSchema } from "../validation";

export async function updateTrade(
  tradeId: string,
  values: TradeSchema
) {
  const {
    supabase,
    user,
  } = await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "Unauthorized.",
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
    .update({
      pair: parsed.data.pair,
      direction:
        parsed.data.direction,
      session:
        parsed.data.session,
      amount:
        parsed.data.amount,
      result:
        parsed.data.result,
      trade_date:
        parsed.data.trade_date,
      reason:
        parsed.data.reason,
      notes:
        parsed.data.notes,
      before_image_url:
        parsed.data.before_image_url,
      after_image_url:
        parsed.data.after_image_url,
    })
    .eq("id", tradeId)
    .eq("user_id", user.id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  await revalidateTrades();

  return {
    success: true,
    message:
      "Trade updated successfully.",
  };
}