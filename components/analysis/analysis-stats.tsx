import {
  Activity,
  DollarSign,
  Target,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Metrics {
  totalTrades: number;
  netPnL: number;
  winRate: number;
  profitFactor: number;
}

interface AnalysisStatsProps {
  metrics: Metrics;
}

export function AnalysisStats({
  metrics,
}: AnalysisStatsProps) {
  const stats = [
    {
      title: "Net P/L",
      value: `${metrics.netPnL >= 0 ? "+" : "-"}$${Math.abs(metrics.netPnL).toLocaleString()}`,
      icon: DollarSign,
      iconColor: metrics.netPnL >= 0 ? "text-emerald-500 bg-emerald-500/10" : "text-rose-500 bg-rose-500/10",
      valueColor: metrics.netPnL >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
    },
    {
      title: "Win Rate",
      value: `${metrics.winRate.toFixed(1)}%`,
      icon: Target,
      iconColor: "text-blue-500 bg-blue-500/10",
      valueColor: "text-slate-900 dark:text-slate-50",
    },
    {
      title: "Profit Factor",
      value: metrics.profitFactor.toFixed(2),
      icon: TrendingUp,
      iconColor: "text-violet-500 bg-violet-500/10",
      valueColor: "text-slate-900 dark:text-slate-50",
    },
    {
      title: "Trades",
      value: metrics.totalTrades.toLocaleString(),
      icon: Activity,
      iconColor: "text-amber-500 bg-amber-500/10",
      valueColor: "text-slate-900 dark:text-slate-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="overflow-hidden border bg-card text-card-foreground shadow-sm transition-none hover:bg-transparent">
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1.5">
              <p className="text-sm font-medium tracking-tight text-muted-foreground">
                {stat.title}
              </p>
              <p className={`text-2xl font-bold tracking-tight ${stat.valueColor}`}>
                {stat.value}
              </p>
            </div>

            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconColor}`}>
              <stat.icon className="h-6 w-6" strokeWidth={2.5} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}