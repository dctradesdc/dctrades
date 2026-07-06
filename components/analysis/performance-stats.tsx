"use client";

import {
  Award,
  CircleX,
  CircleCheck,
  Clock3,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface PerformanceStatsProps {
  bestPair: string;
  wins: number;
  losses: number;
  bestSession: string;
}

export function PerformanceStats({
  bestPair,
  wins,
  losses,
  bestSession,
}: PerformanceStatsProps) {
  const stats = [
    {
      title: "Best Pair",
      value: bestPair || "-",
      icon: Award,
      iconColor:
        "text-blue-500 bg-blue-500/10",
      valueColor:
        "text-slate-900 dark:text-slate-50",
    },
    {
      title: "Winning Trades",
      value: wins.toLocaleString(),
      icon: CircleCheck,
      iconColor:
        "text-emerald-500 bg-emerald-500/10",
      valueColor:
        "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Losing Trades",
      value: losses.toLocaleString(),
      icon: CircleX,
      iconColor:
        "text-rose-500 bg-rose-500/10",
      valueColor:
        "text-rose-600 dark:text-rose-400",
    },
    {
      title: "Best Session",
      value: bestSession
        ? bestSession.replace("_", " ")
        : "-",
      icon: Clock3,
      iconColor:
        "text-violet-500 bg-violet-500/10",
      valueColor:
        "text-slate-900 dark:text-slate-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="overflow-hidden border bg-card shadow-sm"
        >
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>

              <p
                className={`text-2xl font-bold ${stat.valueColor}`}
              >
                {stat.value}
              </p>
            </div>

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconColor}`}
            >
              <stat.icon
                className="h-6 w-6"
                strokeWidth={2.5}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}