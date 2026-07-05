"use client";

import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { TradeFormValues } from "@/features/trades/validation";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TradeNotesProps {
  register: UseFormRegister<TradeFormValues>;
  errors: FieldErrors<TradeFormValues>;
}

export function TradeNotes({
  register,
  errors,
}: TradeNotesProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="notes">
        Notes
      </Label>

      <Textarea
        id="notes"
        rows={6}
        placeholder="Write anything you learned from this trade..."
        {...register("notes")}
      />

      {errors.notes && (
        <p className="text-sm text-destructive">
          {errors.notes.message}
        </p>
      )}
    </div>
  );
}