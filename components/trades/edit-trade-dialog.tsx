"use client";

import type { Trade } from "@/types/trade";

import {
  Dialog,
  DialogContent,
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
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>
            Edit Trade
          </DialogTitle>
        </DialogHeader>

        <TradeForm
          trade={trade}
          onSuccess={() =>
            onOpenChange(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}