"use client";

import React from "react";
import { BookOpen, Lightbulb } from "lucide-react";

import type { Trade } from "@/types/trade";
import { Card } from "@/components/ui/card";

interface TradeJournalProps {
  trade: Trade;
}

export function TradeJournal({ trade }: TradeJournalProps) {
  return (
    /* ULTRA-WIDE CHASSIS:
       - Configured as single stacked columns (grid-cols-1) so sentences have infinite, 
         un-squished room to breathe on wide viewports.
    */
    <div className="grid grid-cols-1 gap-6">
      {/* Trade Strategy / Entry Reason Container */}
      <JournalCard
        icon={<Lightbulb className="h-4 w-4" />}
        title="Trade Setup Rationale"
      >
        {trade.reason ? (
          <p className="text-sm font-normal leading-relaxed text-foreground/90 whitespace-pre-wrap max-w-5xl">
            {trade.reason}
          </p>
        ) : (
          <EmptyText>No strategy execution rationale provided for this position.</EmptyText>
        )}
      </JournalCard>

      {/* Retrospective Trading Notes Container */}
      <JournalCard
        icon={<BookOpen className="h-4 w-4" />}
        title="Execution Notes"
      >
        {trade.notes ? (
          <p className="text-sm font-normal leading-relaxed text-foreground/90 whitespace-pre-wrap max-w-5xl">
            {trade.notes}
          </p>
        ) : (
          <EmptyText>No custom retrospective parameters recorded.</EmptyText>
        )}
      </JournalCard>
    </div>
  );
}

interface JournalCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function JournalCard({ title, icon, children }: JournalCardProps) {
  return (
    <Card className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-none hover:bg-transparent p-5 md:p-6 flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground shadow-xs">
            {icon}
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/90">
            {title}
          </h2>
        </div>

        {/* Content Section: Converted raw neutrals to matching theme variables */}
        <div className="rounded-xl border border-border/60 bg-muted/30 p-5 md:p-6">
          {children}
        </div>
      </div>
    </Card>
  );
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium text-muted-foreground/60 tracking-wide italic">
      {children}
    </p>
  );
}