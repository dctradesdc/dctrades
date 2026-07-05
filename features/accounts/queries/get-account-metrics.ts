import { createClient } from "@/lib/supabase/server";

import { calculateAccountMetrics } from "../calculations";

export async function getAccountMetrics(
  accountId: string
) {
  const supabase =
    await createClient();

  const {
    data: account,
    error: accountError,
  } = await supabase
    .from("accounts")
    .select(
      `
      id,
      account_size,
      profit_target,
      overall_drawdown
      `
    )
    .eq("id", accountId)
    .single();

  if (accountError || !account) {
    return null;
  }

  const {
    data: trades,
    error: tradesError,
  } = await supabase
    .from("trades")
    .select(
      `
      id,
      pnl,
      result
      `
    )
    .eq("account_id", accountId);

  if (tradesError) {
    return null;
  }

  return {
    account,
    metrics: calculateAccountMetrics(
      account,
      trades ?? []
    ),
  };
}