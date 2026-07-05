import type { Trade } from "@/types/trade";

export function buildEquityCurve(
  trades: Trade[]
) {
  let equity = 0;

  return trades.map((trade) => {
    equity += Number(
      trade.pnl ?? 0
    );

    return {
      date: new Date(
        trade.trade_date
      ).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),

      equity,

      pnl: Number(
        trade.pnl ?? 0
      ),

      pair: trade.pair,
    };
  });
}