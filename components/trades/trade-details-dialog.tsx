"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import type { Trade } from "@/types/trade";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TradeDetailsDialogProps {
  trade: Trade | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TradeDetailsDialog({
  trade,
  open,
  onOpenChange,
}: TradeDetailsDialogProps) {
  if (!trade) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="flex justify-end border-t pt-6">
        <Link href={`/trades/${trade.id}`}>
          <Button>
            View Full Details
          </Button>
        </Link>
      </div>
<DialogContent className="max-w-4xl overflow-hidden p-0">
  <DialogHeader className="border-b px-6 py-5">
    <div className="flex items-center justify-between gap-4">
      <div>
        <DialogTitle className="flex flex-wrap items-center gap-2 text-xl">
          <span>{trade.pair}</span>

          <Badge
            variant={
              trade.direction === "BUY"
                ? "default"
                : "secondary"
            }
          >
            {trade.direction}
          </Badge>

          <Badge
            variant={
              trade.result === "PROFIT"
                ? "default"
                : trade.result === "LOSS"
                ? "destructive"
                : "secondary"
            }
          >
            {trade.result}
          </Badge>
        </DialogTitle>

        <DialogDescription>
          Quick trade preview
        </DialogDescription>
      </div>

      <Link href={`/trades/${trade.id}`}>
        <Button>
          View Full Details
        </Button>
      </Link>
    </div>
  </DialogHeader>

  <div className="space-y-6 p-6">
    <div className="grid gap-4 md:grid-cols-2">
      <ImageCard
        title="Before"
        image={trade.before_image_url}
      />

      <ImageCard
        title="After"
        image={trade.after_image_url}
      />
    </div>

    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <Info
        label="Pair"
        value={trade.pair}
      />

      <Info
        label="Session"
        value={trade.session.replace(
          "_",
          " "
        )}
      />

      <Info
        label="Amount"
        value={`$${Number(
          trade.amount
        ).toLocaleString()}`}
      />

      <Info
        label="Result"
        value={trade.result}
      />

      <Info
        label="Direction"
        value={trade.direction}
      />

      <Info
        label="Date"
        value={new Date(
          trade.trade_date
        ).toLocaleDateString()}
      />
    </div>
  </div>
</DialogContent>
    </Dialog>
  );
}

function ImageCard({
  title,
  image,
}: {
  title: string;
  image?: string | null;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">
        {title} Screenshot
      </h3>

      <div className="overflow-hidden rounded-xl border">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={1200}
            height={700}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-muted text-sm text-muted-foreground">
            No screenshot
          </div>
        )}
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 font-semibold">
        {value}
      </p>
    </div>
  );
}