import Link from "next/link";
import { Check, Crown } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { UserSubscription } from "@/lib/subscriptions/types";
import { getPlanLimits } from "@/lib/subscriptions/limits";

interface SubscriptionCardProps {
  subscription: UserSubscription;
  accountCount: number;
  tradeCount: number;
}

export function SubscriptionCard({
  subscription,
  accountCount,
  tradeCount,
}: SubscriptionCardProps) {
  const limits = getPlanLimits(subscription.plan);

  const accountLimit = limits.maxAccounts;
  const tradeLimit = limits.maxTrades;

  const accountText =
    accountLimit === null
      ? `${accountCount} / Unlimited`
      : `${accountCount} / ${accountLimit}`;

  const tradeText =
    tradeLimit === null
      ? `${tradeCount} / Unlimited`
      : `${tradeCount} / ${tradeLimit}`;

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Current Plan
          </p>

          <div className="mt-1 flex items-center gap-2">
            <h2 className="text-xl font-bold capitalize">
              {subscription.plan}
            </h2>

            {subscription.plan !== "free" && (
              <Crown className="size-4 text-amber-500" />
            )}
          </div>
        </div>

        {subscription.plan === "free" && (
          <Link href="/pricing">
            <Button size="sm">Upgrade</Button>
          </Link>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-muted/40 p-4">
          <p className="text-xs text-muted-foreground">
            Trading Accounts
          </p>

          <p className="mt-1 text-lg font-semibold">
            {accountText}
          </p>
        </div>

        <div className="rounded-xl bg-muted/40 p-4">
          <p className="text-xs text-muted-foreground">
            Trades
          </p>

          <p className="mt-1 text-lg font-semibold">
            {tradeText}
          </p>
        </div>
      </div>

      {subscription.expiresAt && (
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Check className="size-4 text-emerald-500" />
          Active until{" "}
          {new Date(subscription.expiresAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}