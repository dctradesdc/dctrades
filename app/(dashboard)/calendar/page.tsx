import { getCalendar } from "@/features/calendar/queries";

import { CalendarSummary } from "@/components/calendar/calendar-summary";
import { CalendarToolbar } from "@/components/calendar/calendar-toolbar";

import { TradingCalendar } from "@/components/calendar/trading-calendar";

interface Props {
  searchParams: Promise<{
    month?: string;
    year?: string;
  }>;
}

export default async function CalendarPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const today = new Date();

  const month = resolvedParams.month ? parseInt(resolvedParams.month, 10) : today.getMonth() + 1;
  const year = resolvedParams.year ? parseInt(resolvedParams.year, 10) : today.getFullYear();

  const calendar = await getCalendar(month, year);

  if (!calendar) {
    return (
      /* Responsive container scaling from mobile to 329 inches.
        - Fixed max-width replaced with 100% width up to 3200px+ via a safely massive rem wall.
        - Fluid paddings scaling dynamically on giant screens.
      */
      <div className="mx-auto w-full max-w-[329rem] px-4 py-6 sm:px-6 md:px-8 lg:px-12 2xl:px-16 4xl:px-24 flex h-96 items-center justify-center rounded-2xl border border-dashed p-8">
        <div className="text-center">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl lg:text-3xl 2xl:text-4xl">
            No Calendar Data
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground lg:text-base 2xl:text-lg">
            Add trades to start building your trading calendar.
          </p>
        </div>
      </div>
    );
  }

  return (
    /* Key Changes for Large Displays:
      - Removed `max-w-7xl` to prevent layout locking on wide monitors.
      - `max-w-[329rem]` accommodates the 329" threshold gracefully if contained.
      - Added massive scaling gap values (`gap-` and `space-y-`) for 2xl and ultra-wide setups.
    */
    <div className="mx-auto w-full max-w-[329rem] px-4 py-6 sm:px-6 md:px-8 lg:px-12 2xl:px-16 4xl:px-24 space-y-6 md:space-y-8 lg:space-y-12 2xl:space-y-16">
      {/* Top Filter and Navigation Control Bar */}
      <CalendarToolbar 
        currentMonth={month} 
        currentYear={year} 
      />

      {/* Main Workspace Layout Stage via Dynamic Slots */}
      <TradingCalendar 
              calendar={calendar}
              summaryComponent={<CalendarSummary calendar={calendar} />} dailySummaryComponent={undefined}        
      />
    </div>
  );
}