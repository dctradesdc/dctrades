"use server";

import {
  accountSchema,
  type AccountSchema,
} from "../validation";

import {
  getCurrentUser,
  revalidateAccounts,
} from "./helpers";

export async function createAccount(
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
    .insert({
      user_id: user.id,

      name: parsed.data.name,

      account_size:
        parsed.data.account_size,

      current_balance:
        parsed.data.account_size,

      daily_drawdown:
        parsed.data.daily_drawdown,

      overall_drawdown:
        parsed.data.overall_drawdown,

      profit_target:
        parsed.data.profit_target,

      losing_percentage:
        parsed.data.losing_percentage,

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
    message: "Account created successfully.",
  };
}