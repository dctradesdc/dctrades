"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CalendarToolbarProps {
  currentMonth: number;
  currentYear: number;
}

export function CalendarToolbar({ currentMonth, currentYear }: CalendarToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const monthLabel = new Date(currentYear, currentMonth - 1).toLocaleString("default", {
    month: "long",
  });

  const navigate = (targetMonth: number, targetYear: number) => {
    // Retain any other active filters (like pairs/sessions) while updating the date
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", targetMonth.toString());
    params.set("year", targetYear.toString());
    
    router.push(`/calendar?${params.toString()}`);
  };

  const handlePrev = () => {
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    navigate(prevMonth, prevYear);
  };

  const handleNext = () => {
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
    const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;
    navigate(nextMonth, nextYear);
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
        {/* Month Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={handlePrev}>
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleNext}>
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="select-none whitespace-nowrap min-w-35">
            <h2 className="text-lg font-bold tracking-tight md:text-xl">
              {monthLabel} {currentYear}
            </h2>
            <p className="text-xs text-muted-foreground md:text-sm">
              Trading Calendar
            </p>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            All Pairs
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            All Sessions
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            All Results
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Filter className="size-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}