"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function updateCurrentBalance(
  accountId: string
) {
  const supabase =
    await createClient();

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const {
    data: account,
    error: accountError,
  } = await supabase
    .from("accounts")
    .select(
      "id, account_size"
    )
    .eq("id", accountId)
    .eq("user_id", user.id)
    .single();

  if (accountError || !account) {
    console.error(
      "Failed to load account:",
      accountError
    );
    return;
  }

  const {
    data: trades,
    error: tradesError,
  } = await supabase
    .from("trades")
    .select("pnl")
    .eq(
      "account_id",
      accountId
    );

  if (tradesError) {
    console.error(
      "Failed to load trades:",
      tradesError
    );
    return;
  }

  const totalPnL =
    (trades ?? []).reduce(
      (sum, trade) =>
        sum +
        Number(
          trade.pnl ?? 0
        ),
      0
    );

  const currentBalance =
    Number(
      account.account_size
    ) + totalPnL;

  const { error: updateError } =
    await supabase
      .from("accounts")
      .update({
        current_balance:
          currentBalance,
      })
      .eq("id", accountId);

  if (updateError) {
    console.error(
      "Failed to update current balance:",
      updateError
    );
    return;
  }

  revalidatePath("/dashboard");
  revalidatePath("/accounts");
  revalidatePath("/analysis");
}