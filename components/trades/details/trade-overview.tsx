"use client";

import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import type { Trade } from "@/types/trade";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Account {
  account_size: number;
  current_balance: number;
  profit_target: number;
}

interface TradeOverviewProps {
  trade: Trade;
  account?: Account | null;
}

export function TradeOverview({ trade, account }: TradeOverviewProps) {
  const isProfit = trade.result === "PROFIT";
  const hasAccount = !!account;

  // Account target performance calculation matrices
  const profit = hasAccount ? account.current_balance - account.account_size : 0;
  const targetAmount = hasAccount ? account.account_size * (account.profit_target / 100) : 0;


  const remaining = Math.max(targetAmount - profit, 0);

  return (
    <Card className="h-fit rounded-2xl border border-border/80 bg-card/40 p-5 md:p-6 backdrop-blur-xs shadow-xs">
      <div className="space-y-5">
        
        {/* Component Branding Title Panel */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/90">
            Trade Overview
          </h2>
          <p className="mt-0.5 text-[11px] text-muted-foreground/70">
            Summary configuration metrics for this execution log.
          </p>
        </div>

        {/* Primary Trade Identifiers Grid */}
        <div className="space-y-3.5 pt-1">
          <OverviewItem label="Trading Pair" value={trade.pair} />

          <OverviewItem
            label="Direction"
            value={
              <Badge variant={trade.direction === "BUY" ? "default" : "secondary"} className="rounded-md px-1.5 py-0 text-[10px] font-bold uppercase tracking-wide">
                {trade.direction}
              </Badge>
            }
          />

          <OverviewItem
            label="Result"
            value={
              <Badge
                variant={
                  trade.result === "PROFIT"
                    ? "default"
                    : trade.result === "LOSS"
                    ? "destructive"
                    : "secondary"
                }
                className="rounded-md px-1.5 py-0 text-[10px] font-bold uppercase tracking-wide"
              >
                {trade.result}
              </Badge>
            }
          />

          <OverviewItem label="Session" value={trade.session.replace("_", " ")} />
          <OverviewItem label="Amount" value={`$${Number(trade.amount).toLocaleString()}`} />

          <OverviewItem
            label="Profit / Loss"
            value={
              <span
                className={`flex items-center justify-end gap-1 font-bold text-sm ${
                  isProfit ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
                }`}
              >
                {isProfit ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                ${Math.abs(Number(trade.pnl ?? 0)).toLocaleString()}
              </span>
            }
          />

          <OverviewItem
            label="Trade Date"
            value={new Date(trade.trade_date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          />

          <OverviewItem
            label="Created"
            value={new Date(trade.created_at).toLocaleString(undefined, {
              dateStyle: "short",
              timeStyle: "short",
            })}
          />
        </div>

        {/* Account Scaling Status Section */}
        {hasAccount && (
          <div className="pt-2 border-t border-border/50 space-y-3.5">
            <OverviewItem
              label="Account Size"
              value={`$${account.account_size.toLocaleString()}`}
            />

            <OverviewItem
              label="Current Balance"
              value={`$${account.current_balance.toLocaleString()}`}
            />

            <OverviewItem label="Profit Target" value={`${account.profit_target}%`} />

            <OverviewItem
              label="Remaining Target"
              value={`$${remaining.toLocaleString()}`}
            />

          
          </div>
        )}
      </div>
    </Card>
  );
}

interface OverviewItemProps {
  label: string;
  value: React.ReactNode;
}

function OverviewItem({ label, value }: OverviewItemProps) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border/30 pb-3 last:border-b-0 last:pb-0">
      <span className="text-xs font-medium text-muted-foreground/80">{label}</span>
      <div className="text-right text-xs font-semibold text-foreground/90">{value}</div>
    </div>
  );
}