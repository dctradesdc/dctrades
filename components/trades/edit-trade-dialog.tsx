"use client";

import type { Trade } from "@/types/trade";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TradeForm } from "./trade-form";

interface EditTradeDialogProps {
  trade: Trade | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTradeDialog({
  trade,
  open,
  onOpenChange,
}: EditTradeDialogProps) {
  if (!trade) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* UPDATED: Swapped 'max-w-6xl' for the responsive strategy matching your creation log. 
        It scales beautifully from 'max-w-md' (mobile profile view) up to 'lg:max-w-4xl' (desktop grid layout) 
        and shares the premium padding/border styles.
      */}
      <DialogContent className="w-full max-w-md lg:max-w-4xl overflow-hidden rounded-2xl border border-border/80 bg-background p-0 shadow-2xl transition-all duration-300">
        <DialogHeader className="border-b border-border/60 bg-neutral-50/50 px-6 py-4 dark:bg-neutral-900/10 md:px-8">
          <DialogTitle className="text-lg font-bold tracking-tight md:text-xl">
            Edit Trade Ledger Record
          </DialogTitle>
          <DialogDescription className="mt-0.5 text-xs font-medium text-muted-foreground/80">
            Modify configuration metrics, updates, or journal context parameters for {trade.pair}.
          </DialogDescription>
        </DialogHeader>

        {/* UPDATED: Added a bounded scroll wrapper matching your create dialog layout 
          to cleanly hold the wider responsive form grids without breaking window heights.
        */}
        <div className="max-h-[78vh] overflow-y-auto p-6 md:p-8 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
          <TradeForm
            trade={trade}
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}