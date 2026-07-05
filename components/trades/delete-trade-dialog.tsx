"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import type { Trade } from "@/types/trade";

import { deleteTrade } from "@/features/trades/actions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteTradeDialogProps {
  trade: Trade | null;
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;
}

export function DeleteTradeDialog({
  trade,
  open,
  onOpenChange,
}: DeleteTradeDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  if (!trade) return null;

function handleDelete() {
  const currentTrade = trade;

  if (!currentTrade) return;

  startTransition(async () => {
    const result =
      await deleteTrade(
        currentTrade.id
      );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    onOpenChange(false);
  });
}
  return (
    <AlertDialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Trade
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want
            to permanently delete
            this trade?

            <br />
            <br />

            <strong>
              {trade.pair}
            </strong>{" "}
            •{" "}
            {new Date(
              trade.trade_date
            ).toLocaleDateString()}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={
              handleDelete
            }
          >
            {isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}