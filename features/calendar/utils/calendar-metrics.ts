import type {
  CalendarDay,
  CalendarMonth,
} from "../types";

export function calculateCalendarMetrics(
  days: CalendarDay[],
  month: number,
  year: number
): CalendarMonth {
  const totalPnL = days.reduce(
    (sum, day) => sum + day.pnl,
    0
  );

  const totalTrades = days.reduce(
    (sum, day) =>
      sum + day.tradeCount,
    0
  );

  const winningDays =
    days.filter(
      (day) => day.pnl > 0
    ).length;

  const losingDays =
    days.filter(
      (day) => day.pnl < 0
    ).length;

  const breakevenDays =
    days.filter(
      (day) => day.pnl === 0
    ).length;

  let bestDay: CalendarDay | null =
    null;

  let worstDay: CalendarDay | null =
    null;

  for (const day of days) {
    if (
      !bestDay ||
      day.pnl > bestDay.pnl
    ) {
      bestDay = day;
    }

    if (
      !worstDay ||
      day.pnl < worstDay.pnl
    ) {
      worstDay = day;
    }
  }

  return {
    month,
    year,

    days,

    totalPnL,

    totalTrades,

    winningDays,

    losingDays,

    breakevenDays,

    bestDay,

    worstDay,
  };
}