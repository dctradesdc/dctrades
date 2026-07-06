import { redirect } from "next/navigation";

import { AccountProgressCard } from "@/components/dashboard/account-progress-card";
import { AccountSwitcher } from "@/components/dashboard/account-switcher";
import { AnalysisHeader } from "@/components/analysis/analysis-header";
import { AnalysisStats } from "@/components/analysis/analysis-stats";
import { PerformanceStats } from "@/components/analysis/performance-stats";

import { getAccountsList } from "@/features/accounts/queries";
import { getAccountMetrics } from "@/features/accounts/queries/get-account-metrics";
import { getActiveAccount } from "@/features/trades/actions/helpers";

export default async function DashboardPage() {
  const { user, account } =
    await getActiveAccount();

  if (!user || !account) {
    redirect("/accounts");
  }

const accounts = await getAccountsList();

  const data =
    await getAccountMetrics(
      account.id
    );

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
      typeof m.breakevens ===
      "number"
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
      wins: data.metrics.wins,
      losses:
        data.metrics.losses,
      bestSession:
        data.metrics.bestSession,
    };
  }

  return (
    <div className="mx-auto w-full max-w-[120rem] space-y-6 p-4 sm:p-6 lg:space-y-8 lg:p-8 2xl:p-12">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <AnalysisHeader />
        </div>

        <div className="w-full shrink-0 sm:w-auto">
          <AccountSwitcher
            accounts={accounts}
            activeAccountId={
              account.id
            }
          />
        </div>
      </div>

      {data && (
        <div className="w-full min-w-0 overflow-hidden">
          <AccountProgressCard
            metrics={data.metrics}
          />
        </div>
      )}

      {statsMetrics && (
        <AnalysisStats
          metrics={statsMetrics}
        />
      )}

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