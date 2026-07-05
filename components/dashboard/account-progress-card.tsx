"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

import type { AccountMetrics } from "@/features/accounts/calculations";
import { Card } from "@/components/ui/card";

interface AccountProgressCardProps {
  metrics: AccountMetrics;
}

export function AccountProgressCard({
  metrics,
}: AccountProgressCardProps) {
  const targetBalance = metrics.currentBalance + metrics.remainingTarget;
  const isPositive = metrics.totalPnL >= 0;

  // Protect widths from breaking limits
  const progressPercent = Math.min(Math.max(metrics.progress, 0), 100);
  const drawdownPercent = Math.min(Math.max(metrics.drawdownUsed, 0), 100);

  // 3D Glass overlay reflection style definition
  const glass3dOverlay = "linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.15) 100%)";

  return (
    <Card className="rounded-2xl border bg-card text-card-foreground p-6 transition-none hover:bg-transparent shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Account Progress
          </h2>
          <p className="text-sm text-muted-foreground">
            Live performance from all trades.
          </p>
        </div>

        <div
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold border ${
            isPositive
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/30"
              : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/30"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          ) : (
            <TrendingDown className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          )}
          ${metrics.totalPnL.toLocaleString()}
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {/* Profit Target Bar */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium tracking-tight text-slate-700 dark:text-slate-300">
              Profit Target
            </span>
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {metrics.progress.toFixed(1)}%
            </span>
          </div>

          <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 shadow-[inner_0_1px_3px_rgba(0,0,0,0.1)]">
            <div
              className="h-full rounded-full bg-linear-to-r from-emerald-500 to-teal-400 border-r border-emerald-400 shadow-[inset_-1px_0_2px_rgba(255,255,255,0.2)] transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                backgroundImage: `${glass3dOverlay}, linear-gradient(to right, rgb(16, 185, 129), rgb(45, 212, 191))`,
              }}
            />
          </div>
        </div>

        {/* Overall Drawdown Bar */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium tracking-tight text-slate-700 dark:text-slate-300">
              Overall Drawdown
            </span>
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {metrics.drawdownUsed.toFixed(1)}%
            </span>
          </div>

          <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 shadow-[inner_0_1px_3px_rgba(0,0,0,0.1)]">
            <div
              className="h-full rounded-full bg-linear-to-r from-rose-500 to-orange-400 border-r border-rose-400 shadow-[inset_-1px_0_2px_rgba(255,255,255,0.2)] transition-all duration-500"
              style={{
                width: `${drawdownPercent}%`,
                backgroundImage: `${glass3dOverlay}, linear-gradient(to right, rgb(244, 63, 94), rgb(251, 146, 60))`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Current Balance"
          value={`$${metrics.currentBalance.toLocaleString()}`}
        />
        <Metric
          label="Target Balance"
          value={`$${targetBalance.toLocaleString()}`}
        />
        <Metric
          label="Remaining Target"
          value={`$${metrics.remainingTarget.toLocaleString()}`}
        />
        <Metric
          label="Remaining Drawdown"
          value={`$${metrics.remainingDrawdown.toLocaleString()}`}
        />
      </div>
    </Card>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4 transition-none">
      <p className="text-xs font-medium text-muted-foreground tracking-tight">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
        {value}
      </p>
    </div>
  );
}