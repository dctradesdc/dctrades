import { notFound } from "next/navigation";

import { getTrade } from "@/features/trades/queries";

import { AccountProgress } from "@/components/trades/details/account-progress";
import { TradeGallery } from "@/components/trades/details/trade-gallery";
import { TradeHeader } from "@/components/trades/details/trade-header";
import { TradeJournal } from "@/components/trades/details/trade-journal";
import { TradeOverview } from "@/components/trades/details/trade-overview";
import { getAccountMetrics } from "@/features/accounts/queries/get-account-metrics";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function TradePage({ params }: Props) {
  const { id } = await params;

  const trade = await getTrade(id);

  if (!trade) {
    notFound();
  }

  const accountMetrics = await getAccountMetrics(trade.account_id);

  return (
    /* ULTRA-WIDE MONITOR FIX:
       - Bumped max-width from max-w-7xl up to max-w-[120rem] (1920px)
       - Added fluid structural padding changes for 2K/4K scaling environments
    */
    <div className="mx-auto w-full max-w-[120rem] space-y-6 p-4 sm:p-6 lg:space-y-8 lg:p-8 2xl:p-12">
      <TradeHeader trade={trade} />

      <AccountProgress metrics={accountMetrics?.metrics} />

      {/* EXPANDED COLUMN METRIC SCALE:
          - Shifted sidebar block layout from fixed 400px to a comfortable 460px on large devices.
          - Gives the main panel (Gallery + Journal text) much more horizontal space to scale.
      */}
      <div className="grid gap-6 md:gap-8 xl:grid-cols-[1fr_420px] 2xl:grid-cols-[1fr_460px] xl:items-start">
        <div className="space-y-6 md:space-y-8 min-w-0">
          <TradeGallery trade={trade} />

          {/* Wrapper to let long paragraphs or rich-text inside your Journal expand comfortably */}
          <div className="w-full min-w-0 overflow-hidden bg-card text-card-foreground rounded-xl">
            <TradeJournal trade={trade} />
          </div>
        </div>

        <aside className="w-full xl:sticky xl:top-8 shrink-0">
          <TradeOverview trade={trade} />
        </aside>
      </div>
    </div>
  );
}