"use client";

import {
  Controller,
  type Control,
} from "react-hook-form";

import type { TradeFormValues } from "@/features/trades/validation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TradeDirectionProps {
  control: Control<TradeFormValues>;
}

export function TradeDirection({
  control,
}: TradeDirectionProps) {
  return (
    <div className="space-y-2">
      <Label>Direction</Label>

      <Controller
        name="direction"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={
                field.value === "BUY"
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                field.onChange("BUY")
              }
            >
              🟢 Buy
            </Button>

            <Button
              type="button"
              variant={
                field.value === "SELL"
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                field.onChange("SELL")
              }
            >
              🔴 Sell
            </Button>
          </div>
        )}
      />
    </div>
  );
}