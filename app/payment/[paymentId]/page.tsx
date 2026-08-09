import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { PaymentPageClient } from "@/components/payment/payment-page-client";

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
    <PaymentPageClient
      payment={{
        payment_id: payment.payment_id,
        payment_status:
          payment.payment_status,
        pay_address:
          payment.pay_address,
        pay_amount:
          payment.pay_amount,
        pay_currency:
          payment.pay_currency,

        // Use NOWPayments expiry time
        // with fallback.
        valid_until:
          payment.valid_until ??
          payment.expiration_estimate_date,

        price_amount:
          payment.price_amount,
        price_currency:
          payment.price_currency,
      }}
    />
  );
}