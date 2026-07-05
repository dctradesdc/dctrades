import { CreateTradeDialog } from "@/components/trades/create-trade-dialog";
import { TradesTable } from "@/components/trades/trades-table";

import { getTrades } from "@/features/trades/queries";

export default async function TradesPage() {
  const trades = await getTrades();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Trading Journal
          </h1>

          <p className="mt-2 text-muted-foreground">
            Record every trade, review your performance, and improve your consistency.
          </p>
        </div>

        <CreateTradeDialog />
      </div>

      <TradesTable trades={trades} />
    </div>
  );
}