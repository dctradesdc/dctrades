"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { TradeForm } from "./trade-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateTradeDialog() {
  const [open, setOpen] =
    useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-xs transition-all duration-200 hover:opacity-90">
        <Plus className="mr-1.5 size-3.5 stroke-[2.5]" />
        New Trade Record
      </DialogTrigger>

      <DialogContent className="max-w-4xl overflow-hidden rounded-2xl border border-border/80 bg-background p-0 shadow-2xl">
        <DialogHeader className="border-b border-border/60 bg-neutral-50/50 px-6 py-5 dark:bg-neutral-900/10 md:px-8">
          <DialogTitle className="text-xl font-black tracking-tight md:text-2xl">
            Add Trade Log
          </DialogTitle>

          <DialogDescription className="mt-0.5 text-xs font-medium text-muted-foreground/80">
            Record structural configuration parameters to evaluate performance.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[78vh] overflow-y-auto p-6 md:p-8 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
          <TradeForm
            onSuccess={() =>
              setOpen(false)
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}