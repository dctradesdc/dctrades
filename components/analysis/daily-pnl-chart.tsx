"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { Trade } from "@/types/trade";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buildDailyPnL } from "@/features/analysis/utils/daily-pnl";

interface Props {
  trades: Trade[];
}

export function DailyPnLChart({ trades }: Props) {
  const data = buildDailyPnL(trades);

  return (
    <Card className="border bg-card text-card-foreground shadow-sm transition-none hover:bg-transparent">
      <CardHeader className="space-y-1 p-6 pb-4">
        <CardTitle className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Daily Profit / Loss
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="h-85 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data}
              margin={{ top: 10, right: 5, left: -15, bottom: 5 }}
              barCategoryGap="35%"
            >
              <defs>
                {/* Positive (Profit) 3D Gradient */}
                <linearGradient id="barProfit3d" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />       {/* emerald-500 */}
                  <stop offset="30%" stopColor="#34d399" />      {/* emerald-400 highlight */}
                  <stop offset="70%" stopColor="#059669" />      {/* emerald-600 shadow */}
                  <stop offset="100%" stopColor="#047857" />     {/* emerald-700 deep shadow */}
                </linearGradient>

                {/* Negative (Loss) 3D Gradient */}
                <linearGradient id="barLoss3d" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f43f5e" />       {/* rose-500 */}
                  <stop offset="30%" stopColor="#fb7185" />      {/* rose-400 highlight */}
                  <stop offset="70%" stopColor="#e11d48" />      {/* rose-600 shadow */}
                  <stop offset="100%" stopColor="#be123c" />     {/* rose-700 deep shadow */}
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border, #e2e8f0)"
              />

              <XAxis
                dataKey="date"
                stroke="var(--muted-foreground, #64748b)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />

              <YAxis
                stroke="var(--muted-foreground, #64748b)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value >= 0 ? "+" : ""}$${value}`}
                dx={-5}
              />

              <Tooltip
                cursor={{ fill: "var(--muted, #f1f5f9)", opacity: 0.15 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const val = payload[0].value as number;
                    const isPositive = val >= 0;
                    return (
                      <div className="rounded-lg border border-border bg-popover p-2.5 shadow-md">
                        <p className="text-xs font-medium text-muted-foreground">
                          {payload[0].payload.date}
                        </p>
                        <p className={`text-sm font-bold mt-0.5 ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
                          {isPositive ? "+" : "-"}${Math.abs(val).toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Bar dataKey="pnl" maxBarSize={16}>
                {data.map((entry, index) => {
                  const isPositive = entry.pnl >= 0;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={isPositive ? "url(#barProfit3d)" : "url(#barLoss3d)"}
                      // Passed as valid SVG radius layout configurations to clear TS:2322 completely
                      radius={isPositive ? "4,4,0,0" : "0,0,4,4"}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}