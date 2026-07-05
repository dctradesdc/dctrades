"use client";

import {
  Controller,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

import type { TradeFormValues } from "@/features/trades/validation";

import { PairCombobox } from "../pair-combobox";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TradeBasicInfoProps {
  control: Control<TradeFormValues>;
  register: UseFormRegister<TradeFormValues>;
  errors: Partial<
    Record<
      keyof TradeFormValues,
      {
        message?: string;
      }
    >
  >;
}

export function TradeBasicInfo({
  control,
  register,
  errors,
}: TradeBasicInfoProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-2">
        <Label>Trading Pair</Label>

        <Controller
          name="pair"
          control={control}
          render={({ field }) => (
            <PairCombobox
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {errors.pair?.message && (
          <p className="text-sm text-destructive">
            {errors.pair.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Amount</Label>

        <Input
          type="number"
          step="0.01"
          placeholder="120"
          {...register("amount", {
            valueAsNumber: true,
          })}
        />

        {errors.amount?.message && (
          <p className="text-sm text-destructive">
            {String(errors.amount.message)}
          </p>
        )}
      </div>
    </div>
  );
}