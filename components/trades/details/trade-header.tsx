"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

import type { Trade } from "@/types/trade";

import { EditTradeDialog } from "@/components/trades/edit-trade-dialog";
import { DeleteTradeDialog } from "@/components/trades/delete-trade-dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TradeHeaderProps {
  trade: Trade;
}

export function TradeHeader({ trade }: TradeHeaderProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 rounded-2xl border border-border/80 bg-card/40 p-5 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between md:p-6 shadow-sm">
        
        {/* Core Identity and Metadata Stack */}
        <div className="space-y-2.5">
          <Link
            href="/trades"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-md"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Trades
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-black tracking-tight text-foreground md:text-3xl">
              {trade.pair}
            </h1>

            <Badge
              variant={trade.direction === "BUY" ? "default" : "secondary"}
              className="rounded-lg px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-xs"
            >
              {trade.direction}
            </Badge>

            <Badge
              variant={
                trade.result === "PROFIT"
                  ? "default"
                  : trade.result === "LOSS"
                  ? "destructive"
                  : "secondary"
              }
              className="rounded-lg px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-xs"
            >
              {trade.result}
            </Badge>
          </div>

          {/* Inline Spatial Parameters Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-muted-foreground/90">
            {/* 
              FIXED: Explicitly defined "en-US" to keep server and browser string generation 
              100% in sync, resolving the runtime hydration error.
            */}
            <span>
              {new Date(trade.trade_date).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="capitalize">
              {trade.session.toLowerCase().replace("_", " ")} Session
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="font-semibold text-foreground">
              ${Number(trade.amount).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Global Operations Hub */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 pt-2 lg:pt-0 border-t border-border/50 lg:border-none">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditOpen(true)}
            className="h-9 rounded-xl px-4 text-xs font-semibold border-border/80 bg-background/50 hover:bg-muted transition-all duration-200"
          >
            <Pencil className="mr-1.5 size-3.5 text-muted-foreground" />
            Edit Profile
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            className="h-9 rounded-xl px-4 text-xs font-semibold opacity-90 transition-all duration-200 shadow-sm"
          >
            <Trash2 className="mr-1.5 size-3.5" />
            Delete Record
          </Button>
        </div>
      </div>

      {/* Persistent Dynamic Lightbox Overlay Anchors */}
      <EditTradeDialog
        trade={trade}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <DeleteTradeDialog
        trade={trade}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}