interface TradeMetric {
  pnl: number | null;
  result:
    | "PROFIT"
    | "LOSS"
    | "BREAKEVEN";
}
export interface AccountMetrics {
  totalPnL: number;
  currentBalance: number;

  targetAmount: number;
  remainingTarget: number;
  progress: number;

  maxDrawdownAmount: number;
  drawdownUsed: number;
  remainingDrawdown: number;

  wins: number;
  losses: number;
  breakevens: number;

  winRate: number;

  biggestWin: number;
  biggestLoss: number;

  averageWin: number;
  averageLoss: number;

  profitFactor: number;
}

interface AccountSettings {
  account_size: number;
  profit_target: number;
  overall_drawdown: number;
}

export function calculateAccountMetrics(
  account: AccountSettings,
  trades: TradeMetric[]
): AccountMetrics {
  const wins = trades.filter(
    (t) => t.result === "PROFIT"
  );

  const losses = trades.filter(
    (t) => t.result === "LOSS"
  );

  const breakevens = trades.filter(
    (t) => t.result === "BREAKEVEN"
  );

  const totalPnL = trades.reduce(
    (sum, trade) =>
      sum + Number(trade.pnl ?? 0),
    0
  );

  const currentBalance =
    account.account_size + totalPnL;

  const targetAmount =
    account.account_size *
    (account.profit_target / 100);

  const remainingTarget =
    Math.max(
      targetAmount - totalPnL,
      0
    );

  const progress =
    targetAmount > 0
      ? Math.min(
          Math.max(
            (totalPnL /
              targetAmount) *
              100,
            0
          ),
          100
        )
      : 0;

  const maxDrawdownAmount =
    account.account_size *
    (account.overall_drawdown / 100);

  const drawdownUsed =
    totalPnL < 0
      ? Math.min(
          (-totalPnL /
            maxDrawdownAmount) *
            100,
          100
        )
      : 0;

  const remainingDrawdown =
    Math.max(
      maxDrawdownAmount +
        Math.min(totalPnL, 0),
      0
    );

  const biggestWin =
    wins.length
      ? Math.max(
          ...wins.map((t) =>
            Number(t.pnl)
          )
        )
      : 0;

  const biggestLoss =
    losses.length
      ? Math.min(
          ...losses.map((t) =>
            Number(t.pnl)
          )
        )
      : 0;

  const averageWin =
    wins.length
      ? wins.reduce(
          (s, t) =>
            s + Number(t.pnl),
          0
        ) / wins.length
      : 0;

  const averageLoss =
    losses.length
      ? Math.abs(
          losses.reduce(
            (s, t) =>
              s +
              Number(t.pnl),
            0
          ) / losses.length
        )
      : 0;

  const grossProfit =
    wins.reduce(
      (s, t) =>
        s + Number(t.pnl),
      0
    );

  const grossLoss = Math.abs(
    losses.reduce(
      (s, t) =>
        s + Number(t.pnl),
      0
    )
  );

  const profitFactor =
    grossLoss === 0
      ? grossProfit
      : grossProfit /
        grossLoss;

  const closedTrades =
    wins.length +
    losses.length +
    breakevens.length;

  const winRate =
    closedTrades === 0
      ? 0
      : (wins.length /
          closedTrades) *
        100;

  return {
    totalPnL,
    currentBalance,

    targetAmount,
    remainingTarget,
    progress,

    maxDrawdownAmount,
    drawdownUsed,
    remainingDrawdown,

    wins: wins.length,
    losses: losses.length,
    breakevens:
      breakevens.length,

    winRate,

    biggestWin,
    biggestLoss,

    averageWin,
    averageLoss,

    profitFactor,
  };
}