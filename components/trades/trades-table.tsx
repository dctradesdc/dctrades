"use client";

import { useState } from "react";

import type { Trade } from "@/types/trade";

import { TradeCard } from "./trade-card";
import { TradeDetailsDialog } from "./trade-details-dialog";
import { EditTradeDialog } from "./edit-trade-dialog";
import { DeleteTradeDialog } from "./delete-trade-dialog";

interface TradesTableProps {
  trades: Trade[];
}

export function TradesTable({ trades }: TradesTableProps) {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // High-End Institutional Fallback Frame
  if (!trades.length) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed border-border/80 bg-neutral-50/40 p-6 text-center dark:bg-neutral-900/10">
        <div className="max-w-sm space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
            No Execution Logs Yet
          </h2>
          <p className="text-xs text-muted-foreground/90 leading-relaxed">
            Commit your first trading framework entry to generate systemic ledger evaluations and data performance arrays.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Precision Spaced Active Feed Grid */}
      <div className="flex flex-col gap-3.5" role="feed" aria-label="Trading Ledger Feed">
        {trades.map((trade) => (
          <TradeCard
            key={trade.id}
            trade={trade}
            onView={(t) => {
              setSelectedTrade(t);
              setViewOpen(true);
            }}
            onEdit={(t) => {
              setSelectedTrade(t);
              setEditOpen(true);
            }}
            onDelete={(t) => {
              setSelectedTrade(t);
              setDeleteOpen(true);
            }}
          />
        ))}
      </div>

      {/* Persistent Overlay Dynamic Dialog Targets */}
      {viewOpen && (
        <TradeDetailsDialog
          trade={selectedTrade}
          open={viewOpen}
          onOpenChange={setViewOpen}
        />
      )}

      {editOpen && (
        <EditTradeDialog
          trade={selectedTrade}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      )}

      {deleteOpen && (
        <DeleteTradeDialog
          trade={selectedTrade}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
        />
      )}
    </>
  );
}