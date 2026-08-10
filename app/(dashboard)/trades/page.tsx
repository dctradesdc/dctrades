import Link from "next/link";

import { CreateTradeDialog } from "@/components/trades/create-trade-dialog";
import { TradesTable } from "@/components/trades/trades-table";
import { Button } from "@/components/ui/button";

import { getTrades } from "@/features/trades/queries";

import { getUserSubscription } from "@/lib/subscriptions/get-user-plan";
import { getPlanLimits } from "@/lib/subscriptions/limits";

export default async function TradesPage() {
  const trades = await getTrades();

  const subscription =
    await getUserSubscription();

  const limits =
    getPlanLimits(subscription.plan);

  const tradeCount = trades.length;

  const hasReachedLimit =
    limits.maxTrades !== null &&
    tradeCount >= limits.maxTrades;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Trading Journal
          </h1>

          <p className="mt-2 text-muted-foreground">
            Record every trade, review your performance,
            and improve your consistency.
          </p>

          {/* Plan usage */}
          <div className="mt-3 text-sm text-muted-foreground">
            {limits.maxTrades === null ? (
              <span>
                {subscription.plan.toUpperCase()} ·{" "}
                <strong className="text-foreground">
                  {tradeCount}
                </strong>{" "}
                trades · Unlimited
              </span>
            ) : (
              <span>
                {subscription.plan.toUpperCase()} ·{" "}
                <strong className="text-foreground">
                  {tradeCount}
                </strong>{" "}
                / {limits.maxTrades} trades
              </span>
            )}
          </div>
        </div>

        {/* Create trade / Upgrade */}
        <div>
          {!hasReachedLimit ? (
            <CreateTradeDialog />
          ) : (
            <Link href="/pricing">
              <Button>
                Upgrade Plan
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Limit warning */}
      {hasReachedLimit && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm font-medium">
            You have reached your{" "}
            {limits.maxTrades} trade limit.
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Upgrade your plan to continue adding trades.
          </p>
        </div>
      )}

      {/* Trades */}
      <TradesTable trades={trades} />
    </div>
  );
}