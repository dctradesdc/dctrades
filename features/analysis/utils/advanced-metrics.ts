import type { Trade } from "@/types/trade";

export function calculateAdvancedMetrics(
  trades: Trade[]
) {
  const wins = trades.filter(
    (t) => t.result === "PROFIT"
  );

  const losses = trades.filter(
    (t) => t.result === "LOSS"
  );

  const grossProfit = wins.reduce(
    (sum, t) => sum + Number(t.pnl),
    0
  );

  const grossLoss = Math.abs(
    losses.reduce(
      (sum, t) => sum + Number(t.pnl),
      0
    )
  );

  const averageWin =
    wins.length === 0
      ? 0
      : grossProfit / wins.length;

  const averageLoss =
    losses.length === 0
      ? 0
      : grossLoss / losses.length;

  const expectancy =
    trades.length === 0
      ? 0
      : (grossProfit - grossLoss) /
        trades.length;

  let equity = 0;
  let peak = 0;
  let maxDrawdown = 0;

  for (const trade of trades) {
    equity += Number(trade.pnl);

    if (equity > peak) {
      peak = equity;
    }

    const drawdown =
      peak - equity;

    if (
      drawdown >
      maxDrawdown
    ) {
      maxDrawdown =
        drawdown;
    }
  }

  return {
    averageWin,

    averageLoss,

    expectancy,

    maxDrawdown,
  };
}