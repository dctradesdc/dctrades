"use client";

import {
  Controller,
  type Control,
} from "react-hook-form";

import type { TradeFormValues } from "@/features/trades/validation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface TradeSessionProps {
  control: Control<TradeFormValues>;
}

const SESSIONS = [
  {
    value: "ASIAN",
    label: "Asian",
  },
  {
    value: "LONDON",
    label: "London",
  },
  {
    value: "NEW_YORK",
    label: "New York",
  },
  {
    value: "OTHER",
    label: "Other",
  },
] as const;

export function TradeSession({
  control,
}: TradeSessionProps) {
  return (
    <div className="space-y-2">
      <Label>Session</Label>

      <Controller
        name="session"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {SESSIONS.map((session) => (
              <Button
                key={session.value}
                type="button"
                variant={
                  field.value === session.value
                    ? "default"
                    : "outline"
                }
                onClick={() =>
                  field.onChange(session.value)
                }
              >
                {session.label}
              </Button>
            ))}
          </div>
        )}
      />
    </div>
  );
}