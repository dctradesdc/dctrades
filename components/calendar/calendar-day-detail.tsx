"use client";

import { X, ArrowUpRight, TrendingUp, ShieldAlert } from "lucide-react";
import type { CalendarDay } from "@/features/calendar/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

interface CalendarDayDetailProps {
  dayData: CalendarDay;
  onClose: () => void;
}

export function CalendarDayDetail({ dayData, onClose }: CalendarDayDetailProps) {
  return (
    <Card className="p-3.5 rounded-2xl border bg-card/40 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200 w-full min-w-0 overflow-hidden">
      {/* Detail Header Info */}
      <div className="flex items-start justify-between gap-3 border-b pb-2.5 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-xs font-bold tracking-tight sm:text-sm wrap-break-word">
            Details for {new Date(dayData.date).toLocaleDateString("default", { dateStyle: "long" })}
          </h3>
          <p className="text-[10px] text-muted-foreground mt-0.5 wrap-break-word leading-tight">
            Metrics log analysis for selected position execution group
          </p>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg shrink-0" onClick={onClose}>
          <X className="size-3.5" />
        </Button>
      </div>

      {/* FIXED METRIC GRID:
          Changed from `sm:grid-cols-4` to a stable `grid-cols-2`.
          Since this component is mounted in a narrow sidebar, 2 columns give the text 
          and values twice as much room (~180px each), preventing the squishing bug.
      */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {/* Card: Net Realized PnL */}
        <div className="rounded-xl border bg-background/50 p-2.5 min-w-0 flex flex-col justify-between">
          <span className="text-[10px] text-muted-foreground block mb-0.5 truncate">
            Net Realized PnL
          </span>
          <span className={`text-xs sm:text-sm font-extrabold break-all truncate ${dayData.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
            {dayData.pnl >= 0 ? "+" : "-"}${Math.abs(dayData.pnl).toLocaleString()}
          </span>
        </div>
        {/* Trades */}
<div className="mt-4 border-t pt-4">
  <div className="mb-3 flex items-center justify-between">
    <h4 className="text-sm font-semibold">
      Trades
    </h4>

    <span className="text-xs text-muted-foreground">
      {dayData.tradeCount} trade
      {dayData.tradeCount !== 1 ? "s" : ""}
    </span>
  </div>

  <div className="space-y-2">
    {dayData.trades.length === 0 ? (
      <p className="text-xs text-muted-foreground">
        No trades found.
      </p>
    ) : (
      dayData.trades.map((trade) => (
        <div
          key={trade.id}
          className="flex items-center justify-between rounded-lg border bg-background/50 p-2.5"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {trade.pair}
            </p>

            <p className="text-xs text-muted-foreground">
              {trade.direction} • {trade.session.replace("_", " ")}
            </p>
          </div>

            <Link href={`/trades/${trade.id}`}>
                <Button
                    size="sm"
                    variant="outline"
                >
                    View
                </Button>
                </Link>
                </div>
            ))
            )}
        </div>
        </div>

        {/* Card: Total Executed Trades */}
        <div className="rounded-xl border bg-background/50 p-2.5 min-w-0 flex flex-col justify-between">
          <span className="text-[10px] text-muted-foreground block mb-0.5 truncate">
            Total Executed Trades
          </span>
          <span className="text-xs sm:text-sm font-extrabold flex items-center gap-1 min-w-0 truncate">
            <ArrowUpRight className="size-3.5 text-muted-foreground shrink-0" />
            <span className="truncate">{dayData.tradeCount} pos</span>
          </span>
        </div>

        {/* Card: Win Strategy Split */}
        <div className="rounded-xl border bg-background/50 p-2.5 min-w-0 flex flex-col justify-between">
          <span className="text-[10px] text-muted-foreground block mb-0.5 truncate">
            Win Strategy Split
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-green-500 flex items-center gap-1 min-w-0 truncate">
            <TrendingUp className="size-3.5 shrink-0" />
            <span className="truncate">{dayData.wins} wins</span>
          </span>
        </div>

        {/* Card: Risk Breakdown */}
        <div className="rounded-xl border bg-background/50 p-2.5 min-w-0 flex flex-col justify-between">
          <span className="text-[10px] text-muted-foreground block mb-0.5 truncate">
            Risk Breakdown
          </span>
          <span className="text-xs sm:text-sm font-extrabold text-red-500 flex items-center gap-1 min-w-0 truncate">
            <ShieldAlert className="size-3.5 shrink-0" />
            <span className="truncate">{dayData.losses} losses</span>
          </span>
        </div>
      </div>
    </Card>
  );
}