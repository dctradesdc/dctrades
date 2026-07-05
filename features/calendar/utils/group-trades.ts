import type { Trade } from "@/types/trade";

import type {
  CalendarDay,
} from "../types";

export function groupTradesByDay(
  trades: Trade[]
): CalendarDay[] {
  const grouped = new Map<
    string,
    CalendarDay
  >();

  for (const trade of trades) {
    const date = new Date(
      trade.trade_date
    )
      .toISOString()
      .split("T")[0];

    if (!grouped.has(date)) {
      grouped.set(date, {
        date,

        trades: [],

        pnl: 0,

        wins: 0,

        losses: 0,

        breakeven: 0,

        tradeCount: 0,
      });
    }

    const day =
      grouped.get(date)!;

    day.trades.push(trade);

    day.pnl += Number(
      trade.pnl ?? 0
    );

    day.tradeCount++;

    switch (trade.result) {
      case "PROFIT":
        day.wins++;
        break;

      case "LOSS":
        day.losses++;
        break;

      case "BREAKEVEN":
        day.breakeven++;
        break;
    }
  }

  return Array.from(
    grouped.values()
  ).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}