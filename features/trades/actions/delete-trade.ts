"use server";

import {
  getCurrentUser,
  revalidateTrades,
} from "./helpers";

export async function deleteTrade(
  tradeId: string
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

  const { error } = await supabase
    .from("trades")
    .delete()
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
      "Trade deleted successfully.",
  };
}