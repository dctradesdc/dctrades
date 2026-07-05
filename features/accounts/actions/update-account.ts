"use server";

import {
  accountSchema,
  type AccountSchema,
} from "../validation";

import {
  getCurrentUser,
  revalidateAccounts,
} from "./helpers";

export async function updateAccount(
  accountId: string,
  values: AccountSchema
) {
  const { supabase, user } =
    await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const parsed = accountSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid account data.",
    };
  }

  const { error } = await supabase
    .from("accounts")
    .update({
      name: parsed.data.name,

      account_size:
        parsed.data.account_size,

      daily_drawdown:
        parsed.data.daily_drawdown,

      overall_drawdown:
        parsed.data.overall_drawdown,

      profit_target:
        parsed.data.profit_target,

      losing_percentage:
        parsed.data.losing_percentage,
    })
    .eq("id", accountId)
    .eq("user_id", user.id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidateAccounts();

  return {
    success: true,
    message: "Account updated successfully.",
  };
}