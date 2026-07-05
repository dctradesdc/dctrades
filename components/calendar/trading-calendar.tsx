"use client";

import { useMemo, useState } from "react";
import type { CalendarDay, CalendarMonth } from "@/features/calendar/types";
import { Card } from "@/components/ui/card";

import { CalendarDayDetail } from "./calendar-day-detail";

interface TradingCalendarProps {
  calendar: CalendarMonth;
  summaryComponent: React.ReactNode;
  dailySummaryComponent: React.ReactNode;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function TradingCalendar({ 
  calendar, 
  summaryComponent, 
  dailySummaryComponent 
}: TradingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];

  const cells = useMemo(() => {
    const firstDay = new Date(calendar.year, calendar.month - 1, 1);
    const startOffset = firstDay.getDay();
    const result: (CalendarDay | null)[] = [];

    for (let i = 0; i < startOffset; i++) result.push(null);

    const daysInMonth = new Date(calendar.year, calendar.month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(calendar.year, calendar.month - 1, day).toISOString().split("T")[0];
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

    while (result.length < 42) result.push(null);
    return result;
  }, [calendar]);

  const activeDayData = useMemo(() => {
    if (!selectedDate) return null;
    return cells.find((c) => c?.date === selectedDate) ?? null;
  }, [selectedDate, cells]);

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 xl:grid-cols-[1fr_24rem] 2xl:grid-cols-[1fr_26rem] 3xl:grid-cols-[1fr_30rem] 4xl:grid-cols-[1fr_35rem] xl:items-start w-full min-w-0">
      
      {/* Left Column: Core Matrix Grid View */}
      <div className="w-full min-w-0">
        <Card className="w-full overflow-hidden rounded-2xl border bg-card/10 shadow-sm flex flex-col">
          <div className="grid grid-cols-7 border-b bg-muted/20">
            {WEEK_DAYS.map((day) => (
              <div key={day} className="py-3 text-center text-[10px] font-semibold tracking-tight text-muted-foreground sm:text-xs md:text-sm lg:text-base 2xl:text-lg 4xl:text-2xl">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 grid-rows-6 aspect-square max-h-[75vh] sm:max-h-[80vh] xl:aspect-auto xl:min-h-137.5 2xl:min-h-187.5 4xl:min-h-[1100px] w-full bg-border/30 gap-px">
            {cells.map((day, index) => {
              if (!day) return <div key={`empty-${index}`} className="bg-background/20 opacity-30" />;

              const date = new Date(day.date);
              const isToday = day.date === today;
              const isSelected = selectedDate === day.date;
              const hasActivity = day.tradeCount > 0 || day.pnl !== 0;

              let bgStyle = "bg-background/40";
              if (hasActivity) {
                bgStyle = day.pnl >= 0 
                  ? "bg-emerald-500/12 hover:bg-emerald-500/20 text-emerald-400" 
                  : "bg-rose-500/12 hover:bg-rose-500/20 text-rose-400";
              } else {
                bgStyle = "bg-background/70 hover:bg-accent/20";
              }

              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(isSelected ? null : day.date)}
                  className={`group relative flex aspect-square xl:aspect-auto w-full flex-col justify-between p-2 sm:p-3 text-left transition-all duration-150 overflow-hidden select-none outline-none ${bgStyle} ${
                    isSelected 
                      ? "ring-1.5 ring-primary/60 ring-inset z-10 bg-accent/15" 
                      : ""
                  } ${isToday ? "ring-1.5 ring-muted-foreground/30 ring-inset z-10" : ""}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[10px] font-medium sm:text-xs md:text-sm lg:text-base 2xl:text-xl 4xl:text-3xl tracking-tight ${
                      hasActivity 
                        ? day.pnl >= 0 ? "text-emerald-400/90" : "text-rose-400/90"
                        : "text-muted-foreground/80 group-hover:text-foreground"
                    }`}>
                      {date.getDate()}
                    </span>
                    
                    {day.tradeCount > 0 && (
                      <span className="rounded-md bg-background/40 border border-border/40 backdrop-blur-xs px-1 py-0.5 text-[7px] font-semibold sm:text-[8px] md:text-[10px] lg:text-xs text-foreground/90 shrink-0">
                        {day.tradeCount}
                      </span>
                    )}
                  </div>

                  {hasActivity ? (
                    <div className="mt-auto w-full leading-none min-w-0">
                      <p className={`text-[9px] font-semibold tracking-tight sm:text-[11px] md:text-xs lg:text-sm 2xl:text-xl 4xl:text-4xl break-all truncate ${
                        day.pnl >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}>
                        {day.pnl >= 0 ? "+" : "-"}${Math.abs(day.pnl).toLocaleString()}
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

      {/* Right Column: Sidebars Toggle Logic */}
      <div className="space-y-4 md:space-y-6 lg:space-y-8 w-full xl:sticky xl:top-6 min-w-0 overflow-hidden">
        {activeDayData ? (
          // Displayed only when a specific day is clicked/active
          <CalendarDayDetail 
            dayData={activeDayData} 
            onClose={() => setSelectedDate(null)} 
          />
        ) : (
          // Displayed by default when no day is selected
          <>
            {summaryComponent}
            {dailySummaryComponent}
          </>
        )}
      </div>
    </div>
  );
}