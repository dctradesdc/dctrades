"use client";

import { Card } from "@/components/ui/card";

import type { AccountMetrics } from "@/features/accounts/calculations";

interface AccountProgressProps {
  metrics?: AccountMetrics | null;
}

export function AccountProgress({
  metrics,
}: AccountProgressProps) {
  if (!metrics) return null;

  const targetBalance =
    metrics.currentBalance +
    metrics.remainingTarget;

  return (
    <Card className="rounded-2xl p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">
            Account Progress
          </h2>

          <p className="text-sm text-muted-foreground">
            Live metrics calculated from your journal.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Profit Target</span>

            <span className="font-semibold">
              {metrics.progress.toFixed(1)}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500"
              style={{
                width: `${metrics.progress}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Overall Drawdown Used</span>

            <span className="font-semibold">
              {metrics.drawdownUsed.toFixed(1)}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-red-600 transition-all duration-500"
              style={{
                width: `${metrics.drawdownUsed}%`,
              }}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric
            title="Current Balance"
            value={`$${metrics.currentBalance.toLocaleString()}`}
          />

          <Metric
            title="Total P/L"
            value={`$${metrics.totalPnL.toLocaleString()}`}
          />

          <Metric
            title="Remaining Target"
            value={`$${metrics.remainingTarget.toLocaleString()}`}
          />

          <Metric
            title="Target Balance"
            value={`$${targetBalance.toLocaleString()}`}
          />
        </div>
      </div>
    </Card>
  );
}

function Metric({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-xs text-muted-foreground">
        {title}
      </p>

      <p className="mt-2 text-lg font-semibold">
        {value}
      </p>
    </div>
  );
}