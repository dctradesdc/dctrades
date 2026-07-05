import type { Trade } from "@/types/trade";

export function buildDailyPnL(
  trades: Trade[]
) {
  const grouped = new Map<
    string,
    number
  >();

  for (const trade of trades) {
    const date = new Date(
      trade.trade_date
    ).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });

    grouped.set(
      date,
      (grouped.get(date) ?? 0) +
        Number(trade.pnl ?? 0)
    );
  }

  return Array.from(
    grouped.entries()
  ).map(([date, pnl]) => ({
    date,
    pnl,
  }));
}