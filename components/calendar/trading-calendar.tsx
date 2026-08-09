"use client";

import { useMemo, useState } from "react";
import type {
  CalendarDay,
  CalendarMonth,
} from "@/features/calendar/types";
import { Card } from "@/components/ui/card";

import { CalendarDayDetail } from "./calendar-day-detail";

interface TradingCalendarProps {
  calendar: CalendarMonth;
  summaryComponent: React.ReactNode;
  dailySummaryComponent: React.ReactNode;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}

export function TradingCalendar({
  calendar,
  summaryComponent,
  dailySummaryComponent,
}: TradingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const now = new Date();

  const today = formatDate(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  );

  const cells = useMemo(() => {
    // Local date initialization (No UTC offset side-effects)
    const firstDay = new Date(
      calendar.year,
      calendar.month - 1,
      1
    );

    const startOffset = firstDay.getDay();
    const result: (CalendarDay | null)[] = [];

    // Empty cells before the 1st of the month
    for (let i = 0; i < startOffset; i++) {
      result.push(null);
    }

    // Days in current month
    const daysInMonth = new Date(
      calendar.year,
      calendar.month,
      0
    ).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(
        calendar.year,
        calendar.month,
        day
      );

      result.push(
        calendar.days.find((d) => d.date === date) ?? {
          date,
          pnl: 0,
          wins: 0,
          losses: 0,
          breakeven: 0,
          tradeCount: 0,
          trades: [],
        }
      );
    }

    // Calculate exact minimum grid size (28, 35, or 42 cells) to avoid empty bottom rows
    const totalRenderedDays = Math.ceil(result.length / 7) * 7;
    while (result.length < totalRenderedDays) {
      result.push(null);
    }

    return result;
  }, [calendar]);

  // Fast O(1) Map lookup for active date details
  const cellsMap = useMemo(() => {
    const map = new Map<string, CalendarDay>();
    for (const item of cells) {
      if (item) {
        map.set(item.date, item);
      }
    }
    return map;
  }, [cells]);

  const activeDayData = selectedDate ? cellsMap.get(selectedDate) ?? null : null;
  const totalRows = Math.ceil(cells.length / 7);

  return (
    <>
      {/* Left Column: Calendar Grid */}
      <div className="w-full min-w-0">
        <Card className="flex w-full flex-col overflow-hidden rounded-2xl border bg-card/10 shadow-sm">
          {/* Header Row */}
          <div className="grid grid-cols-7 border-b bg-muted/20">
            {WEEK_DAYS.map((day) => (
              <div
                key={day}
                className="py-3 text-center text-[10px] font-semibold tracking-tight text-muted-foreground sm:text-xs md:text-sm lg:text-base 2xl:text-lg 4xl:text-2xl"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div
            style={{ gridTemplateRows: `repeat(${totalRows}, minmax(0, 1fr))` }}
            className="grid w-full grid-cols-7 gap-px bg-border/30 aspect-square max-h-[75vh] sm:max-h-[80vh] xl:aspect-auto xl:min-h-137.5 2xl:min-h-187.5 4xl:min-h-[1100px]"
          >
            {cells.map((day, index) => {
              if (!day) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="bg-background/20 opacity-30"
                  />
                );
              }

              const isToday = day.date === today;
              const isSelected = selectedDate === day.date;
              const hasActivity = day.tradeCount > 0 || day.pnl !== 0;

              let bgStyle = "bg-background/40";

              if (hasActivity) {
                bgStyle =
                  day.pnl >= 0
                    ? "bg-emerald-500/12 hover:bg-emerald-500/20 text-emerald-400"
                    : "bg-rose-500/12 hover:bg-rose-500/20 text-rose-400";
              } else {
                bgStyle = "bg-background/70 hover:bg-accent/20";
              }

              return (
                <button
                  key={day.date}
                  type="button"
                  onClick={() =>
                    setSelectedDate(isSelected ? null : day.date)
                  }
                  className={`group relative flex aspect-square w-full select-none flex-col justify-between overflow-hidden p-2 text-left outline-none transition-all duration-150 sm:p-3 xl:aspect-auto ${bgStyle} ${
                    isSelected
                      ? "z-10 bg-accent/15 ring-1.5 ring-inset ring-primary/60"
                      : ""
                  } ${
                    isToday
                      ? "z-10 ring-1.5 ring-inset ring-muted-foreground/30"
                      : ""
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`text-[10px] font-medium tracking-tight sm:text-xs md:text-sm lg:text-base 2xl:text-xl 4xl:text-3xl ${
                        hasActivity
                          ? day.pnl >= 0
                            ? "text-emerald-400/90"
                            : "text-rose-400/90"
                          : "text-muted-foreground/80 group-hover:text-foreground"
                      }`}
                    >
                      {Number(day.date.slice(8, 10))}
                    </span>

                    {day.tradeCount > 0 && (
                      <span className="shrink-0 rounded-md border border-border/40 bg-background/40 px-1 py-0.5 text-[7px] font-semibold text-foreground/90 backdrop-blur-xs sm:text-[8px] md:text-[10px] lg:text-xs">
                        {day.tradeCount}
                      </span>
                    )}
                  </div>

                  {hasActivity ? (
                    <div className="mt-auto w-full min-w-0 leading-none">
                      <p
                        className={`break-all truncate text-[9px] font-semibold tracking-tight sm:text-[11px] md:text-xs lg:text-sm 2xl:text-xl 4xl:text-4xl ${
                          day.pnl >= 0
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {day.pnl >= 0 ? "+" : "-"}
                        $
                        {Math.abs(day.pnl).toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <div className="h-2 2xl:h-6" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Right Column */}
      <div className="w-full min-w-0 space-y-4 overflow-hidden md:space-y-6 lg:space-y-8 xl:sticky xl:top-6">
        {activeDayData ? (
          <CalendarDayDetail
            dayData={activeDayData}
            onClose={() => setSelectedDate(null)}
          />
        ) : (
          <>
            {summaryComponent}
            {dailySummaryComponent}
          </>
        )}
      </div>
    </>
  );
}