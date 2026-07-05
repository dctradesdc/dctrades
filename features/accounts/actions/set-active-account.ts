"use server";

import { getCurrentUser } from "./helpers";
import { revalidateAccounts } from "./helpers";

export async function setActiveAccount(
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

  // Remove active flag from all user's accounts
  const { error: resetError } =
    await supabase
      .from("accounts")
      .update({
        is_active: false,
      })
      .eq("user_id", user.id);

  if (resetError) {
    return {
      success: false,
      message: resetError.message,
    };
  }

  // Activate selected account
  const { error } = await supabase
    .from("accounts")
    .update({
      is_active: true,
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
    message: "Active account updated.",
  };
}