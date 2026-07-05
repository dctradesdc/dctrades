"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import type { Trade } from "@/types/trade";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buildEquityCurve } from "@/features/analysis/utils";

interface Props {
  trades: Trade[];
}

export function EquityCurveChart({ trades }: Props) {
  const data = buildEquityCurve(trades);

  return (
    <Card className="border bg-card text-card-foreground shadow-sm transition-none hover:bg-transparent">
      <CardHeader className="space-y-1 p-6 pb-4">
        <CardTitle className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Equity Curve
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="h-85 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data}
              margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
            >
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
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                dx={-5}
              />

              <Tooltip
                cursor={{ stroke: "var(--border, #e2e8f0)", strokeWidth: 1, strokeDasharray: "4 4" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const val = payload[0].value as number;
                    return (
                      <div className="rounded-lg border border-border bg-popover p-2.5 shadow-md">
                        <p className="text-xs font-medium text-muted-foreground">
                          {payload[0].payload.date}
                        </p>
                        <p className="text-sm font-bold mt-0.5 text-indigo-600 dark:text-indigo-400">
                          ${val.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="equity"
                stroke="rgb(79 70 229)" // indigo-600 premium brand look
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 0, fill: "rgb(79 70 229)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}