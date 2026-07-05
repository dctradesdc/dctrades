"use client";

import { Controller, type Control } from "react-hook-form";

import type { TradeFormValues } from "@/features/trades/validation";

import { ImageUpload } from "@/components/shared/image-upload";

interface TradeImagesProps {
  control: Control<TradeFormValues>;
}

export function TradeImages({
  control,
}: TradeImagesProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Controller
        name="before_image_url"
        control={control}
        render={({ field }) => (
          <ImageUpload
            label="Before Screenshot"
            value={field.value ?? ""}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name="after_image_url"
        control={control}
        render={({ field }) => (
          <ImageUpload
            label="After Screenshot"
            value={field.value ?? ""}
            onChange={field.onChange}
          />
        )}
      />
    </div>
  );
}