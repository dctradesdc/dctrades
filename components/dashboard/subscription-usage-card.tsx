import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SubscriptionUsageCardProps {
  plan: string;
  accountCount: number;
  maxAccounts: number | null;
  tradeCount: number;
  maxTrades: number | null;
}

export function SubscriptionUsageCard({
  plan,
  accountCount,
  maxAccounts,
  tradeCount,
  maxTrades,
}: SubscriptionUsageCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Current Plan
          </p>

          <h2 className="mt-1 text-xl font-bold capitalize">
            {plan}
          </h2>
        </div>

        {plan === "free" && (
          <Link href="/pricing">
            <Button size="sm" variant="outline">
              Upgrade
              <ArrowUpRight className="ml-1 size-4" />
            </Button>
          </Link>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Usage
          label="Trading Accounts"
          current={accountCount}
          maximum={maxAccounts}
        />

        <Usage
          label="Trades"
          current={tradeCount}
          maximum={maxTrades}
        />
      </div>
    </div>
  );
}

function Usage({
  label,
  current,
  maximum,
}: {
  label: string;
  current: number;
  maximum: number | null;
}) {
  const percentage =
    maximum === null
      ? 0
      : Math.min((current / maximum) * 100, 100);

  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {label}
        </span>

        <span className="font-medium">
          {current}
          {maximum !== null
            ? ` / ${maximum}`
            : " / Unlimited"}
        </span>
      </div>

      {maximum !== null && (
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}