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

  // Extracted safely as a string representation to bind natively with HTML date picker attributes
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
      {/* Workspace Graphics Upload Segment */}
      <TradeImages control={control} />

      {/* Primary Asset Core Parameters */}
      <TradeBasicInfo control={control} register={register} errors={errors} />

      {/* Dynamic Orders Direction & Outcomes Workspace */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TradeDirection control={control} />
        <TradeResult control={control} />
      </div>

      {/* Timeline Configurations & Context Matrices */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TradeSession control={control} />
        <TradeDate register={register} errors={errors} />
      </div>

      {/* Rationale & retrospective journals */}
      <TradeReason register={register} errors={errors} />
      <TradeNotes register={register} errors={errors} />

      {/* Execution Frame Commit Controller */}
      <TradeSubmit isPending={isPending} />
    </form>
  );
}