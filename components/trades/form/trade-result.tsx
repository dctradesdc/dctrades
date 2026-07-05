"use client";

import {
  Controller,
  type Control,
} from "react-hook-form";

import type { TradeFormValues } from "@/features/trades/validation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TradeResultProps {
  control: Control<TradeFormValues>;
}

const RESULTS = [
  {
    value: "PROFIT",
    label: "Profit",
  },
  {
    value: "LOSS",
    label: "Loss",
  },
  {
    value: "BREAKEVEN",
    label: "Breakeven",
  },
] as const;

export function TradeResult({
  control,
}: TradeResultProps) {
  return (
    <div className="space-y-2">
      <Label>Result</Label>

      <Controller
        name="result"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-3 gap-3">
            {RESULTS.map((result) => (
              <Button
                key={result.value}
                type="button"
                variant={
                  field.value === result.value
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  field.onChange(result.value)
                }
              >
                {result.label}
              </Button>
            ))}
          </div>
        )}
      />
    </div>
  );
}