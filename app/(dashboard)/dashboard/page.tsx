import { redirect } from "next/navigation";

import { AccountProgressCard } from "@/components/dashboard/account-progress-card";
import { getActiveAccount } from "@/features/trades/actions/helpers";
import { getAccountMetrics } from "@/features/accounts/queries/get-account-metrics";
import { AccountSwitcher } from "@/components/dashboard/account-switcher";
import { getAccounts } from "@/features/accounts/queries/index";
import { AnalysisHeader } from "@/components/analysis/analysis-header";
import { AnalysisStats } from "@/components/analysis/analysis-stats";

export default async function DashboardPage() {
  const { user, account } = await getActiveAccount();

  if (!user || !account) {
    redirect("/accounts");
  }

  const accounts = await getAccounts();
  const data = await getAccountMetrics(account.id);

  // Safe structural extraction with double-casting to satisfy both TS and ESLint
  let statsMetrics = null;
  if (data && data.metrics) {
    const m = data.metrics as unknown as Record<string, unknown>;
    
    const breakevens = typeof m.breakevens === "number" ? m.breakevens : 0;
    const netPnl = typeof m.netPnl === "number" ? m.netPnl : (typeof m.pnl === "number" ? m.pnl : 0);

    statsMetrics = {
      totalTrades: data.metrics.wins + data.metrics.losses + breakevens,
      netPnL: netPnl,
      winRate: data.metrics.winRate,
      profitFactor: data.metrics.profitFactor,
    };
  }

  return (
    /* RESPONSIVE CONTAINER:
       - Upgraded max-width from max-w-7xl to full width with a soft threshold cap for 29" monitors.
       - Paddings scale fluidly across viewports to keep text balanced.
    */
    <div className="mx-auto w-full max-w-[120rem] space-y-6 p-4 sm:p-6 lg:space-y-8 lg:p-8 2xl:p-12">
      
      {/* HEADER BAR */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 min-w-0">
        <div className="min-w-0 flex-1">
          <AnalysisHeader />
        </div>

        {/* Prevent switcher frame from getting crushed */}
        <div className="shrink-0 w-full sm:w-auto">
          <AccountSwitcher
            accounts={accounts}
            activeAccountId={account.id}
          />
        </div>
      </div>

      {data && (
        <div className="w-full min-w-0 overflow-hidden">
          <AccountProgressCard metrics={data.metrics} />
        </div>
      )}

      {/* UPGRADED STATS MATRIX LAYOUT */}
      {statsMetrics && (
        <AnalysisStats metrics={statsMetrics} />
      )}
    </div>
  );
}