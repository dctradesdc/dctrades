import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

interface PaymentPageProps {
  params: Promise<{
    paymentId: string;
  }>;
}

export default async function PaymentPage({
  params,
}: PaymentPageProps) {
  const { paymentId } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const response = await fetch(
    `https://api.nowpayments.io/v1/payment/${paymentId}`,
    {
      headers: {
        "x-api-key":
          process.env.NOWPAYMENTS_API_KEY!,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    notFound();
  }

  const payment = await response.json();

  return (
    <main className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-lg">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              DC Trades
            </p>

            <h1 className="mt-2 text-2xl font-bold">
              Complete your payment
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Send the exact amount shown below.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <div className="rounded-xl bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Amount
              </p>

              <p className="mt-1 text-2xl font-bold">
                {payment.pay_amount}{" "}
                {payment.pay_currency}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Payment address
              </p>

              <div className="mt-2 break-all rounded-xl border bg-muted/30 p-4 font-mono text-sm">
                {payment.pay_address}
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Payment ID
              </p>

              <p className="mt-1 font-mono text-sm">
                {payment.payment_id}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Status
              </p>

              <p className="mt-1 font-medium capitalize">
                {payment.payment_status}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm">
            <p className="font-medium">
              Important
            </p>

            <p className="mt-1 text-muted-foreground">
              Send the exact amount using the
              specified network. Your plan will
              be activated after the payment is
              confirmed.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}