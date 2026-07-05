import type { Trade } from "@/types/trade";

export interface CalendarDay {
  date: string;

  trades: Trade[];

  pnl: number;

  wins: number;

  losses: number;

  breakeven: number;

  tradeCount: number;
}

export interface CalendarWeek {
  week: number;

  days: CalendarDay[];
}

export interface CalendarMonth {
  month: number;

  year: number;

  days: CalendarDay[];

  totalPnL: number;

  winningDays: number;

  losingDays: number;

  breakevenDays: number;

  totalTrades: number;

  bestDay: CalendarDay | null;

  worstDay: CalendarDay | null;
}