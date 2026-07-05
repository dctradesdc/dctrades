"use client";

import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { TradeFormValues } from "@/features/trades/validation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TradeReasonProps {
  register: UseFormRegister<TradeFormValues>;
  errors: FieldErrors<TradeFormValues>;
}

export function TradeReason({
  register,
  errors,
}: TradeReasonProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="reason">
        Reason
      </Label>

      <Input
        id="reason"
        placeholder="e.g. London breakout"
        {...register("reason")}
      />

      {errors.reason && (
        <p className="text-sm text-destructive">
          {errors.reason.message}
        </p>
      )}
    </div>
  );
}