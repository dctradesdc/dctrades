import { TrendingUp } from "lucide-react";

export function AnalysisHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <TrendingUp className="size-7 text-primary" />

        <div>
          <h1 className="text-3xl font-bold">
            Trading Analysis
          </h1>

          <p className="text-muted-foreground">
            Analyze your trading performance.
          </p>
        </div>
      </div>
    </div>
  );
}