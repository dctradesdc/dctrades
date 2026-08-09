import { redirect } from "next/navigation";

import { AccountProgressCard } from "@/components/dashboard/account-progress-card";
import { AccountSwitcher } from "@/components/dashboard/account-switcher";
import { SubscriptionCard } from "@/components/dashboard/subscription-card";

import { AnalysisHeader } from "@/components/analysis/analysis-header";
import { AnalysisStats } from "@/components/analysis/analysis-stats";
import { PerformanceStats } from "@/components/analysis/performance-stats";

import { getAccountsList } from "@/features/accounts/queries";
import { getAccountMetrics } from "@/features/accounts/queries/get-account-metrics";
import { getActiveAccount } from "@/features/trades/actions/helpers";

import { getUserSubscription } from "@/lib/subscriptions/get-user-plan";

export default async function DashboardPage() {
  const {
    supabase,
    user,
    account,
  } = await getActiveAccount();

  if (!user || !account) {
    redirect("/accounts");
  }

  const accounts = await getAccountsList();

  // Current subscription
  const subscription =
    await getUserSubscription();

  // Account usage
  const { count: accountCount } =
    await supabase
      .from("accounts")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .eq("archived", false);

  // Trade usage
  const { count: tradeCount } =
    await supabase
      .from("trades")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

  const data =
    await getAccountMetrics(account.id);

  let statsMetrics: {
    totalTrades: number;
    netPnL: number;
    winRate: number;
    profitFactor: number;
  } | null = null;

  let performanceMetrics: {
    bestPair: string;
    wins: number;
    losses: number;
    bestSession: string;
  } | null = null;

  if (data?.metrics) {
    const m =
      data.metrics as unknown as Record<
        string,
        unknown
      >;

    const breakevens =
      typeof m.breakevens === "number"
        ? m.breakevens
        : 0;

    const netPnl =
      typeof m.netPnl === "number"
        ? m.netPnl
        : typeof m.pnl === "number"
          ? m.pnl
          : 0;

    statsMetrics = {
      totalTrades:
        data.metrics.wins +
        data.metrics.losses +
        breakevens,

      netPnL: netPnl,

      winRate:
        data.metrics.winRate,

      profitFactor:
        data.metrics.profitFactor,
    };

    performanceMetrics = {
      bestPair:
        data.metrics.bestPair,

      wins:
        data.metrics.wins,

      losses:
        data.metrics.losses,

      bestSession:
        data.metrics.bestSession,
    };
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Header */}
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AnalysisHeader />

        <div className="w-full shrink-0 sm:w-auto">
          <AccountSwitcher
            accounts={accounts}
            activeAccountId={account.id}
          />
        </div>
      </div>

      {/* Subscription */}
      <SubscriptionCard
        subscription={subscription}
        accountCount={accountCount ?? 0}
        tradeCount={tradeCount ?? 0}
      />

      {/* Account Progress */}
      {data && (
        <div className="w-full min-w-0 overflow-hidden">
          <AccountProgressCard
            metrics={data.metrics}
          />
        </div>
      )}

      {/* Statistics */}
      {statsMetrics && (
        <AnalysisStats
          metrics={statsMetrics}
        />
      )}

      {/* Performance */}
      {performanceMetrics && (
        <PerformanceStats
          bestPair={
            performanceMetrics.bestPair
          }
          wins={
            performanceMetrics.wins
          }
          losses={
            performanceMetrics.losses
          }
          bestSession={
            performanceMetrics.bestSession
          }
        />
      )}
    </div>
  );
}