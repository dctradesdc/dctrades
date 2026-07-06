"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import type { Trade } from "@/types/trade";
import { createTrade, updateTrade } from "@/features/trades/actions";
import { tradeSchema, type TradeFormValues } from "@/features/trades/validation";

import { TradeImages } from "./form/trade-images";
import { TradeBasicInfo } from "./form/trade-basic-info";
import { TradeDirection } from "./form/trade-direction";
import { TradeResult } from "./form/trade-result";
import { TradeSession } from "./form/trade-session";
import { TradeDate } from "./form/trade-date";
import { TradeReason } from "./form/trade-reason";
import { TradeNotes } from "./form/trade-notes";
import { TradeSubmit } from "./form/trade-submit";

interface TradeFormProps {
  trade?: Trade;
  onSuccess?: () => void;
}

export function TradeForm({ trade, onSuccess }: TradeFormProps) {
  const [isPending, startTransition] = useTransition();
  const isEditing = !!trade;

  const formattedDefaultDate: string = trade
    ? new Date(trade.trade_date).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TradeFormValues>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      pair: trade?.pair ?? "",
      direction: trade?.direction ?? "BUY",
      session: trade?.session ?? "LONDON",
      amount: trade?.amount ? Number(trade.amount) : 0,
      result: trade?.result ?? "PROFIT",
      trade_date: formattedDefaultDate,
      reason: trade?.reason ?? "",
      notes: trade?.notes ?? "",
      before_image_url: trade?.before_image_url ?? "",
      after_image_url: trade?.after_image_url ?? "",
    },
  });

  const onSubmit: SubmitHandler<TradeFormValues> = (values) => {
    startTransition(async () => {
      try {
        const parsed = tradeSchema.parse(values);

        const result = isEditing
          ? await updateTrade(trade!.id, parsed)
          : await createTrade(parsed);

        if (!result.success) {
          toast.error(result.message || "An error occurred updating the ledger.");
          return;
        }

        toast.success(result.message || "Ledger record structural parameters saved.");

        if (!isEditing) {
          reset({
            pair: "",
            direction: "BUY",
            session: "LONDON",
            amount: 0,
            result: "PROFIT",
            trade_date: new Date().toISOString().split("T")[0],
            reason: "",
            notes: "",
            before_image_url: "",
            after_image_url: "",
          });
        }

        onSuccess?.();
      } catch {
        toast.error("Please verify validation fields and try again.");
      }
    });
  };

  return (
    /* 
      FIXED CONTAINER WIDENING: 
      Increased max-w-lg to max-w-4xl to give room to expand on desktop, 
      while keeping it perfectly bounded on mobile screens.
    */
    <div className="container mx-auto max-w-4xl px-4 md:px-0 py-4 md:py-6">
      
      <h1 className="text-xl font-bold mb-6 text-foreground md:text-2xl">
        {isEditing ? `Edit Trade: ${trade?.pair}` : "Create New Trade Record"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* 1. Images Segment: Children can stack natively or follow their internal responsive layouts */}
        <TradeImages control={control} />

        {/* 
          2. Form Metadata Fields Grid: 
          On mobile, everything stays nicely stacked vertically.
          On `md:` devices and up, fields expand horizontally into a clean 2-column format.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Core Basic Info (Asset Pair & Size) */}
          <div className="md:col-span-2">
            <TradeBasicInfo control={control} register={register} errors={errors} />
          </div>

          {/* Trade Execution Vectors */}
          <TradeDirection control={control} />
          <TradeResult control={control} />

          {/* Temporal Alignment Vectors */}
          <TradeSession control={control} />
          <TradeDate register={register} errors={errors} />
          
        </div>

        {/* 
          3. Retrospective Context Areas:
          Full width textareas sit beneath the multi-column layout grid.
        */}
        <div className="space-y-6">
          <TradeReason register={register} errors={errors} />
          <TradeNotes register={register} errors={errors} />
        </div>

        {/* Commit Actions Frame */}
        <div className="pt-4 border-t border-border/40 flex justify-end">
          <div className="w-full md:w-auto md:min-w-35">
            <TradeSubmit isPending={isPending} />
          </div>
        </div>
      </form>
    </div>
  );
}