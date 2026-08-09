const NOWPAYMENTS_API_URL =
  "https://api.nowpayments.io/v1";

function getApiKey() {
  const apiKey =
    process.env.NOWPAYMENTS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "NOWPAYMENTS_API_KEY is not configured."
    );
  }

  return apiKey;
}

async function nowPaymentsRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(
    `${NOWPAYMENTS_API_URL}${path}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
        "x-api-key": getApiKey(),
        ...(options.headers ?? {}),
      },

      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(
      "NOWPayments API error:",
      data
    );

    throw new Error(
      data?.message ||
        "NOWPayments request failed."
    );
  }

  return data as T;
}

export interface NowPaymentsPayment {
  payment_id: string | number;
  payment_status: string;

  pay_address?: string;
  pay_amount?: number;
  pay_currency?: string;

  invoice_url?: string;

  order_id?: string;
  order_description?: string;
}

export async function createPayment({
  amount,
  orderId,
  description,
}: {
  amount: number;
  orderId: string;
  description: string;
}) {
  return nowPaymentsRequest<NowPaymentsPayment>(
    "/payment",
    {
      method: "POST",

      body: JSON.stringify({
        price_amount: amount,
        price_currency: "usd",

        // Customer pays with USDT on TRON.
        pay_currency: "usdttrc20",

        order_id: orderId,

        order_description:
          description,

        ipn_callback_url:
          `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/nowpayments/ipn`,
      }),
    }
  );
}