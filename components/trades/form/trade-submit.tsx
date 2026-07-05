"use client";

import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TradeSubmitProps {
  isPending: boolean;
}

export function TradeSubmit({
  isPending,
}: TradeSubmitProps) {
  return (
    <div className="flex items-center justify-end gap-3 border-t pt-6">
      <Button
        type="submit"
        disabled={isPending}
        className="min-w-40"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 size-4" />
            Save Trade
          </>
        )}
      </Button>
    </div>
  );
}