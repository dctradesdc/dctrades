import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { CalendarMonth } from "@/features/calendar/types";

interface CalendarSummaryProps {
  calendar: CalendarMonth;
}

export function CalendarSummary({
  calendar,
}: CalendarSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Monthly Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <SummaryItem
          label="Net P/L"
          value={`$${calendar.totalPnL.toLocaleString()}`}
        />

        <SummaryItem
          label="Trades"
          value={calendar.totalTrades}
        />

        <SummaryItem
          label="Winning Days"
          value={calendar.winningDays}
        />

        <SummaryItem
          label="Losing Days"
          value={calendar.losingDays}
        />

        <SummaryItem
          label="Break-even Days"
          value={calendar.breakevenDays}
        />
      </CardContent>
    </Card>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}