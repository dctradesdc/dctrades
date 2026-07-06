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
    .select(`
      id,
      account_size,
      profit_target,
      overall_drawdown
    `)
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
    .select(`
      id,
      pnl,
      result,
      pair,
      session
    `)
    .eq("account_id", accountId);

  if (tradesError) {
    return null;
  }

  const metrics = calculateAccountMetrics(
    account,
    trades ?? []
  );

  const pairStats = new Map<
    string,
    {
      profit: number;
      wins: number;
    }
  >();

  const sessionStats = new Map<
    string,
    {
      profit: number;
      wins: number;
    }
  >();

  for (const trade of trades ?? []) {
    const pnl = Number(
      trade.pnl ?? 0
    );

    // Ignore losing and breakeven trades
    if (pnl <= 0) continue;

    if (trade.pair) {
      const current =
        pairStats.get(trade.pair) ?? {
          profit: 0,
          wins: 0,
        };

      current.profit += pnl;
      current.wins++;

      pairStats.set(
        trade.pair,
        current
      );
    }

    if (trade.session) {
      const current =
        sessionStats.get(
          trade.session
        ) ?? {
          profit: 0,
          wins: 0,
        };

      current.profit += pnl;
      current.wins++;

      sessionStats.set(
        trade.session,
        current
      );
    }
  }

  const bestPair =
    [...pairStats.entries()]
      .sort((a, b) => {
        if (
          b[1].profit !==
          a[1].profit
        ) {
          return (
            b[1].profit -
            a[1].profit
          );
        }

        return (
          b[1].wins -
          a[1].wins
        );
      })[0]?.[0] ?? "-";

  const bestSession =
    [...sessionStats.entries()]
      .sort((a, b) => {
        if (
          b[1].profit !==
          a[1].profit
        ) {
          return (
            b[1].profit -
            a[1].profit
          );
        }

        return (
          b[1].wins -
          a[1].wins
        );
      })[0]?.[0] ?? "-";

  return {
    account,
    metrics: {
      ...metrics,
      bestPair,
      bestSession,
    },
  };
}