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
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-xs transition-all duration-200 hover:opacity-90">
        <Plus className="mr-1.5 size-3.5 stroke-[2.5]" />
        New Trade Record
      </DialogTrigger>

      {/* 
        FIXED: Changed max-w-md to a responsive sizing strategy. 
        It stays narrow (max-w-md) on mobile to look like a phone screen card,
        but adapts smoothly to a wider layout (lg:max-w-4xl) on desktop so your 
        new multi-column form layouts have breathing room to expand.
      */}
      <DialogContent className="w-full max-w-md lg:max-w-4xl overflow-hidden rounded-2xl border border-border/80 bg-background p-0 shadow-2xl transition-all duration-300">
        <DialogHeader className="border-b border-border/60 bg-neutral-50/50 px-6 py-4 dark:bg-neutral-900/10 md:px-8">
          <DialogTitle className="text-lg font-bold tracking-tight md:text-xl">
            Add Trade Log
          </DialogTitle>

          <DialogDescription className="mt-0.5 text-xs font-medium text-muted-foreground/80">
            Record structural configuration parameters to evaluate performance.
          </DialogDescription>
        </DialogHeader>

        {/* 
          Maintains clean scrolling frame layout. Adjusted responsive padding 
          (md:p-8) to match the expanded spaciousness on larger displays.
        */}
        <div className="max-h-[78vh] overflow-y-auto p-6 md:p-8 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5">
          <TradeForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}