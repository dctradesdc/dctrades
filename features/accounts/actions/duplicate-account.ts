"use server";

import {
  getCurrentUser,
  revalidateAccounts,
} from "./helpers";

export async function duplicateAccount(
  accountId: string
) {
  const { supabase, user } =
    await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const {
    data: account,
    error: fetchError,
  } = await supabase
    .from("accounts")
    .select("*")
    .eq("id", accountId)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !account) {
    return {
      success: false,
      message: "Account not found.",
    };
  }

  const { error } = await supabase
    .from("accounts")
    .insert({
      user_id: user.id,

      name: `${account.name} (Copy)`,

      account_size: account.account_size,

      // Reset to starting balance
      current_balance:
        account.account_size,

      daily_drawdown:
        account.daily_drawdown,

      overall_drawdown:
        account.overall_drawdown,

      profit_target:
        account.profit_target,

      losing_percentage:
        account.losing_percentage,

      archived: false,
    });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidateAccounts();

  return {
    success: true,
    message:
      "Account duplicated successfully.",
  };
}