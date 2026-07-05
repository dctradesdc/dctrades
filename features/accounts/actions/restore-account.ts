"use server";

import {
  getCurrentUser,
  revalidateAccounts,
} from "./helpers";

export async function restoreAccount(
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

  const { error } = await supabase
    .from("accounts")
    .update({
      archived: false,
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
    message: "Account restored successfully.",
  };
}