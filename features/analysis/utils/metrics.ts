import type { Trade } from "@/types/trade";

export function calculateMetrics(
  trades: Trade[]
) {
  const totalTrades =
    trades.length;

  const wins =
    trades.filter(
      (t) =>
        t.result === "PROFIT"
    );

  const losses =
    trades.filter(
      (t) =>
        t.result === "LOSS"
    );

  const breakeven =
    trades.filter(
      (t) =>
        t.result ===
        "BREAKEVEN"
    );

  const netPnL = trades.reduce(
    (sum, trade) =>
      sum +
      Number(trade.pnl ?? 0),
    0
  );

  const grossProfit =
    wins.reduce(
      (sum, trade) =>
        sum +
        Number(trade.pnl),
      0
    );

  const grossLoss =
    Math.abs(
      losses.reduce(
        (sum, trade) =>
          sum +
          Number(trade.pnl),
        0
      )
    );

  const winRate =
    totalTrades === 0
      ? 0
      : (wins.length /
          totalTrades) *
        100;

  const profitFactor =
    grossLoss === 0
      ? grossProfit
      : grossProfit /
        grossLoss;

  return {
    totalTrades,

    wins: wins.length,

    losses:
      losses.length,

    breakeven:
      breakeven.length,

    winRate,

    netPnL,

    grossProfit,

    grossLoss,

    profitFactor,
  };
}