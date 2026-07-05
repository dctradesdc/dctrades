export function getHeatColor(pnl: number): string {
  if (pnl === 0) return "bg-background";

  if (pnl > 0) {
    if (pnl >= 1000) return "bg-green-700 text-white";
    if (pnl >= 500)  return "bg-green-600 text-white";
    if (pnl >= 100)  return "bg-green-100 dark:bg-green-900/30";
    return "bg-green-50 dark:bg-green-950/30";
  }

  // Negative PnL handling
  if (pnl <= -1000) return "bg-red-700 text-white";
  if (pnl <= -500)  return "bg-red-600 text-white";
  if (pnl <= -100)  return "bg-red-100 dark:bg-red-900/30";
  return "bg-red-50 dark:bg-red-950/30";
}