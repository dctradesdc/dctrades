import { getAnalysis } from "@/features/analysis/queries/get-analysis";
import { calculateMetrics } from "@/features/analysis/utils/metrics";

import { AnalysisHeader } from "@/components/analysis/analysis-header";
import { AnalysisStats } from "@/components/analysis/analysis-stats";
import { DailyPnLChart } from "@/components/analysis/daily-pnl-chart";
import { EquityCurveChart } from "@/components/analysis/equity-curve-chart";
import { SessionChart } from "@/components/analysis/session-chart";
import { WinLossChart } from "@/components/analysis/win-loss-chart";

export default async function AnalysisPage() {
  const trades = (await getAnalysis()) ?? [];

  const metrics = calculateMetrics(trades);

  return (
    <div className="space-y-8">
      <AnalysisHeader />

      <AnalysisStats metrics={metrics} />

      <div className="grid gap-6 xl:grid-cols-2">
        <EquityCurveChart trades={trades} />

        <DailyPnLChart trades={trades} />

        <WinLossChart metrics={metrics} />

        <SessionChart trades={trades} />
      </div>
    </div>
  );
}