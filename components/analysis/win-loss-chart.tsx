"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Metrics {
  wins: number;
  losses: number;
  breakeven: number;
}

interface WinLossChartProps {
  metrics: Metrics;
}

// Map the array indices to match the 3D SVG gradient IDs declared in <defs>
const GRADIENT_IDS = [
  "url(#pieWins3d)",
  "url(#pieLosses3d)",
  "url(#pieBreakeven3d)",
];

export function WinLossChart({ metrics }: WinLossChartProps) {
  const total = metrics.wins + metrics.losses + metrics.breakeven;
  
  const data = [
    { name: "Wins", value: metrics.wins },
    { name: "Losses", value: metrics.losses },
    { name: "Breakeven", value: metrics.breakeven },
  ].filter(item => item.value > 0);

  return (
    <Card className="border bg-card text-card-foreground shadow-sm transition-none hover:bg-transparent">
      <CardHeader className="space-y-1 p-6 pb-4">
        <CardTitle className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          Win / Loss Distribution
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="h-85 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {/* Wins: 3D Radial Gradient (Emerald base) */}
                <radialGradient id="pieWins3d" cx="50%" cy="50%" r="50%" fx="40%" fy="40%">
                  <stop offset="0%" stopColor="#34d399" />       {/* emerald-400 inner specular highlight */}
                  <stop offset="60%" stopColor="#10b981" />      {/* emerald-500 base */}
                  <stop offset="100%" stopColor="#047857" />     {/* emerald-700 deep outer edge */}
                </radialGradient>

                {/* Losses: 3D Radial Gradient (Rose base) */}
                <radialGradient id="pieLosses3d" cx="50%" cy="50%" r="50%" fx="40%" fy="40%">
                  <stop offset="0%" stopColor="#fb7185" />       {/* rose-400 highlight */}
                  <stop offset="60%" stopColor="#f43f5e" />      {/* rose-500 base */}
                  <stop offset="100%" stopColor="#be123c" />     {/* rose-700 outer edge */}
                </radialGradient>

                {/* Breakeven: 3D Radial Gradient (Slate base) */}
                <radialGradient id="pieBreakeven3d" cx="50%" cy="50%" r="50%" fx="40%" fy="40%">
                  <stop offset="0%" stopColor="#cbd5e1" />       {/* slate-300 highlight */}
                  <stop offset="60%" stopColor="#94a3b8" />      {/* slate-400 base */}
                  <stop offset="100%" stopColor="#475569" />     {/* slate-600 outer edge */}
                </radialGradient>
              </defs>

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0];
                    const val = item.value as number;
                    const percentage = total > 0 ? ((val / total) * 100).toFixed(1) : "0.0";
                    return (
                      <div className="rounded-lg border border-border bg-popover p-2.5 shadow-md">
                        <p className="text-xs font-medium text-muted-foreground">
                          {item.name}
                        </p>
                        <p className="text-sm font-bold mt-0.5 text-slate-900 dark:text-slate-50">
                          {val.toLocaleString()} trades ({percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(value) => {
                  const rawDataIndex = data.findIndex(d => d.name === value);
                  const val = data[rawDataIndex]?.value ?? 0;
                  return (
                    <span className="text-xs font-medium text-muted-foreground mr-2">
                      {value} ({val})
                    </span>
                  );
                }}
              />

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={75}
                outerRadius={105}
                paddingAngle={4}
                stroke="transparent"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={GRADIENT_IDS[index % GRADIENT_IDS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}