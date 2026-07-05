"use client";

import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { TradeFormValues } from "@/features/trades/validation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TradeDateProps {
  register: UseFormRegister<TradeFormValues>;
  errors: FieldErrors<TradeFormValues>;
}

export function TradeDate({
  register,
  errors,
}: TradeDateProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="trade_date">
        Trade Date
      </Label>

      <Input
        id="trade_date"
        type="date"
        {...register("trade_date", {
          valueAsDate: true,
        })}
      />

      {errors.trade_date && (
        <p className="text-sm text-destructive">
          {errors.trade_date.message}
        </p>
      )}
    </div>
  );
}