"use server";

import { revalidatePath } from "next/cache";

import { createAdminClient } from "@/lib/supabase/admin";

export async function toggleUserSuspension(
  userId: string,
  suspend: boolean
) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("profiles")
    .update({
      is_suspended: suspend,
    })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin/users");
  revalidatePath("/admin");

  return {
    success: true,
    message: suspend
      ? "User suspended successfully."
      : "User unsuspended successfully.",
  };
}

export async function deleteUser(
  userId: string
) {
  const supabase = createAdminClient();

  // Delete trades
  const { error: tradesError } =
    await supabase
      .from("trades")
      .delete()
      .eq("user_id", userId);

  if (tradesError) {
    throw new Error(tradesError.message);
  }

  // Delete accounts
  const { error: accountsError } =
    await supabase
      .from("accounts")
      .delete()
      .eq("user_id", userId);

  if (accountsError) {
    throw new Error(accountsError.message);
  }

  // Delete profile
  const { error: profileError } =
    await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);

  if (profileError) {
    throw new Error(profileError.message);
  }

  // Delete authentication user
  const { error: authError } =
    await supabase.auth.admin.deleteUser(
      userId
    );

  if (authError) {
    throw new Error(authError.message);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/users");

  return {
    success: true,
    message:
      "User deleted successfully.",
  };
}