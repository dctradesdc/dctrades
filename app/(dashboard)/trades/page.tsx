import Link from "next/link";

import { CreateTradeDialog } from "@/components/trades/create-trade-dialog";
import { TradesTable } from "@/components/trades/trades-table";

import { getTrades } from "@/features/trades/queries";

import { getUserSubscription } from "@/lib/subscriptions/get-user-plan";
import { getPlanLimits } from "@/lib/subscriptions/limits";
import { createClient } from "@/lib/supabase/server";

export default async function TradesPage() {
  const trades = await getTrades();

  const subscription = await getUserSubscription();
  const limits = getPlanLimits(subscription.plan);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let tradeCount = trades.length;

  if (user) {
    const { count } = await supabase
      .from("trades")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    tradeCount = count ?? 0;
  }

  const tradeLimitText =
    limits.maxTrades === null
      ? "Unlimited"
      : `${tradeCount} / ${limits.maxTrades}`;

  const canCreateTrade =
    limits.maxTrades === null ||
    tradeCount < limits.maxTrades;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Trading Journal
          </h1>

          <p className="mt-2 text-muted-foreground">
            Record every trade, review your performance, and improve your
            consistency.
          </p>

          {/* Plan usage */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full border bg-muted/40 px-3 py-1 font-medium capitalize">
              {subscription.plan} Plan
            </span>

            <span className="rounded-full border bg-muted/40 px-3 py-1 text-muted-foreground">
              Trades:{" "}
              <span className="font-medium text-foreground">
                {tradeLimitText}
              </span>
            </span>
          </div>
        </div>

        {/* Create / Upgrade */}
        {canCreateTrade ? (
          <CreateTradeDialog />
        ) : (
          <Link
            href="/pricing"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Upgrade Plan
          </Link>
        )}
      </div>

      {/* Trades */}
      <TradesTable trades={trades} />
    </div>
  );
}