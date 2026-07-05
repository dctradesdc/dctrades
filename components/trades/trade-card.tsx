"use client";

import React from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import type { Trade } from "@/types/trade";
import { Card } from "@/components/ui/card";
import { TradeActions } from "./trade-actions";

interface TradeCardProps {
  trade: Trade;
  onView: (trade: Trade) => void;
  onEdit: (trade: Trade) => void;
  onDelete: (trade: Trade) => void;
}

export function TradeCard({
  trade,
  onView,
  onEdit,
  onDelete,
}: TradeCardProps) {
  const isProfit = trade.result === "PROFIT";

  return (
    <Card 
      onClick={() => onView(trade)}
      className="group overflow-hidden border border-border/80 bg-card/40 backdrop-blur-xs transition-all duration-300 hover:bg-muted/30 hover:shadow-xs cursor-pointer select-none"
    >
      <div className="flex items-center gap-4 p-3.5 sm:p-4">
        {/* Visual Media Attachments (Before / After Compact Strips) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <ImageBox src={trade.before_image_url} alt="Before Execution Setup" />
          <ImageBox src={trade.after_image_url} alt="After Execution Outcome" />
        </div>

        {/* Core Asset Identifiers */}
        <div className="min-w-[5.5rem] shrink-0 space-y-0.5">
          <p className="text-sm font-bold tracking-tight text-foreground">
            {trade.pair}
          </p>
          <p className="text-[10px] font-medium text-muted-foreground/80">
            {new Date(trade.trade_date).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "2-digit",
            })}
          </p>
        </div>

        {/* Metric Tags: Direction & Outcome */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <Badge color={trade.direction === "BUY" ? "green" : "red"}>
            {trade.direction}
          </Badge>

          <Badge
            color={
              trade.result === "PROFIT"
                ? "green"
                : trade.result === "LOSS"
                ? "red"
                : "gray"
            }
          >
            {trade.result}
          </Badge>
        </div>

        {/* Global Market Session Parameters */}
        <div className="hidden min-w-[6rem] text-xs font-semibold uppercase tracking-wider text-muted-foreground/90 lg:block shrink-0">
          {trade.session.replace("_", " ")}
        </div>

        {/* Position Size Volume */}
        <div className="hidden w-24 text-right text-xs font-semibold text-muted-foreground xl:block shrink-0">
          ${Number(trade.amount).toLocaleString()}
        </div>

        {/* Performance Returns Yield (Net PnL Display) */}
        <div
          className={`flex w-28 items-center justify-end gap-0.5 text-xs font-bold sm:text-sm tracking-tight shrink-0 ml-auto sm:ml-0 ${
            isProfit
              ? "text-green-600 dark:text-green-500"
              : "text-red-600 dark:text-red-500"
          }`}
        >
          {isProfit ? (
            <ArrowUpRight className="size-3.5 stroke-[2.5]" />
          ) : (
            <ArrowDownRight className="size-3.5 stroke-[2.5]" />
          )}
          ${Math.abs(Number(trade.pnl ?? 0)).toLocaleString()}
        </div>

        {/* Micro Rationale Log Context Segment */}
        <div className="hidden flex-1 min-w-[8rem] truncate xl:block px-2">
          <p className="truncate text-xs font-medium text-muted-foreground/70">
            {trade.reason || "No technical strategy context mapped."}
          </p>
        </div>

        {/* Action Controls Hub Interface */}
        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
          <TradeActions
            onView={() => onView(trade)}
            onEdit={() => onEdit(trade)}
            onDelete={() => onDelete(trade)}
          />
        </div>
      </div>
    </Card>
  );
}

function ImageBox({ src, alt }: { src: string | null | undefined; alt: string }) {
  const hasImage = typeof src === "string" && src.length > 0;

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-neutral-100/30 dark:bg-neutral-950/20 shadow-inner shrink-0">
      {hasImage ? (
        <Image
          src={src}
          alt={alt}
          width={48}
          height={48}
          className="size-11 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex size-11 items-center justify-center text-[8px] font-bold uppercase tracking-tighter text-muted-foreground/50 select-none bg-muted/40 text-center px-0.5">
          Empty
        </div>
      )}
    </div>
  );
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "green" | "red" | "gray";
}) {
  const styles = {
    green:
      "border-green-500/10 bg-green-500/5 text-green-600 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400",
    red:
      "border-red-500/10 bg-red-500/5 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400",
    gray:
      "border-border bg-muted/50 text-muted-foreground",
  };

  return (
    <span
      className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide select-none ${styles[color]}`}
    >
      {children}
    </span>
  );
}