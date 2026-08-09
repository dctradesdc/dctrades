import { NextResponse } from "next/server";
import crypto from "node:crypto";

import { createAdminClient } from "@/lib/supabase/admin";

function verifySignature(
  rawBody: string,
  signature: string | null
) {
  const secret =
    process.env.NOWPAYMENTS_IPN_SECRET;

  if (!secret || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha512", secret)
    .update(rawBody)
    .digest("hex");

  const received = Buffer.from(
    signature,
    "utf8"
  );

  const expected = Buffer.from(
    expectedSignature,
    "utf8"
  );

  if (received.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    received,
    expected
  );
}

function mapPaymentStatus(status: string) {
  switch (status) {
    case "waiting":
      return "waiting";

    case "confirming":
      return "confirming";

    case "confirmed":
      return "confirmed";

    case "finished":
      return "finished";

    case "failed":
      return "failed";

    case "expired":
      return "expired";

    case "refunded":
      return "refunded";

    default:
      return "waiting";
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();

    const signature =
      request.headers.get(
        "x-nowpayments-sig"
      );

    if (
      !verifySignature(
        rawBody,
        signature
      )
    ) {
      console.warn(
        "Rejected NOWPayments IPN: invalid signature."
      );

      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    const payload = JSON.parse(rawBody);

    const paymentId = payload.payment_id
      ? String(payload.payment_id)
      : null;

    const orderId = payload.order_id
      ? String(payload.order_id)
      : null;

    const paymentStatus =
      typeof payload.payment_status ===
      "string"
        ? payload.payment_status
        : null;

    if (
      !paymentId ||
      !orderId ||
      !paymentStatus
    ) {
      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    const supabase =
      createAdminClient();

    const status =
      mapPaymentStatus(paymentStatus);

    /*
     * Find local payment order.
     */
    const {
      data: paymentOrder,
      error: lookupError,
    } = await supabase
      .from("payment_orders")
      .select("*")
      .eq("order_id", orderId)
      .eq("provider", "nowpayments")
      .maybeSingle();

    if (lookupError) {
      console.error(
        "Payment order lookup error:",
        lookupError
      );

      return NextResponse.json(
        { success: false },
        { status: 500 }
      );
    }

    if (!paymentOrder) {
      console.warn(
        "Unknown NOWPayments order:",
        orderId
      );

      return NextResponse.json(
        { success: false },
        { status: 404 }
      );
    }

    /*
     * Security check.
     */
    if (
      paymentOrder.provider_payment_id &&
      paymentOrder.provider_payment_id !==
        paymentId
    ) {
      console.warn(
        "NOWPayments payment ID mismatch."
      );

      return NextResponse.json(
        { success: false },
        { status: 400 }
      );
    }

    /*
     * Update payment order status.
     */
    const {
      error: paymentUpdateError,
    } = await supabase
      .from("payment_orders")
      .update({
        provider_payment_id: paymentId,
        status,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", paymentOrder.id);

    if (paymentUpdateError) {
      console.error(
        "Payment order update error:",
        paymentUpdateError
      );

      return NextResponse.json(
        { success: false },
        { status: 500 }
      );
    }

    /*
     * Only finished payments activate
     * subscriptions.
     */
    if (paymentStatus !== "finished") {
      return NextResponse.json({
        success: true,
      });
    }

    /*
     * IMPORTANT:
     * Check whether this payment has
     * already created a subscription.
     *
     * This prevents duplicate IPN calls
     * from extending the subscription.
     */
    const {
      data: alreadyProcessed,
      error:
        alreadyProcessedError,
    } = await supabase
      .from("subscriptions")
      .select("id")
      .eq(
        "provider_payment_id",
        paymentId
      )
      .maybeSingle();

    if (alreadyProcessedError) {
      console.error(
        "Subscription duplicate check error:",
        alreadyProcessedError
      );

      return NextResponse.json(
        { success: false },
        { status: 500 }
      );
    }

    if (alreadyProcessed) {
      return NextResponse.json({
        success: true,
        message:
          "Payment already processed.",
      });
    }

    const durationDays = 92;
    const now = new Date();

    /*
     * Find current active subscription.
     */
    const {
      data: existingSubscription,
      error:
        subscriptionLookupError,
    } = await supabase
      .from("subscriptions")
      .select(
        "id, plan, status, started_at, expires_at"
      )
      .eq(
        "user_id",
        paymentOrder.user_id
      )
      .eq("status", "active")
      .order("expires_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (subscriptionLookupError) {
      console.error(
        "Subscription lookup error:",
        subscriptionLookupError
      );

      return NextResponse.json(
        { success: false },
        { status: 500 }
      );
    }

    /*
     * Existing active subscription:
     * extend it by 92 days.
     */
    if (existingSubscription) {
      const currentExpiry =
        existingSubscription.expires_at
          ? new Date(
              existingSubscription.expires_at
            )
          : now;

      const baseDate =
        currentExpiry > now
          ? currentExpiry
          : now;

      const newExpiry =
        new Date(baseDate);

      newExpiry.setDate(
        newExpiry.getDate() +
          durationDays
      );

      const {
        error:
          updateSubscriptionError,
      } = await supabase
        .from("subscriptions")
        .update({
          plan: paymentOrder.plan,
          status: "active",
          provider: "nowpayments",
          provider_payment_id:
            paymentId,
          started_at:
            existingSubscription.started_at ??
            now.toISOString(),
          expires_at:
            newExpiry.toISOString(),
          updated_at:
            now.toISOString(),
        })
        .eq(
          "id",
          existingSubscription.id
        );

      if (updateSubscriptionError) {
        console.error(
          "Subscription update error:",
          updateSubscriptionError
        );

        return NextResponse.json(
          { success: false },
          { status: 500 }
        );
      }
    } else {
      /*
       * No active subscription:
       * create a new one.
       */
      const expiresAt =
        new Date(now);

      expiresAt.setDate(
        expiresAt.getDate() +
          durationDays
      );

      const {
        error: subscriptionError,
      } = await supabase
        .from("subscriptions")
        .insert({
          user_id:
            paymentOrder.user_id,

          plan:
            paymentOrder.plan,

          status: "active",

          provider: "nowpayments",

          provider_payment_id:
            paymentId,

          started_at:
            now.toISOString(),

          expires_at:
            expiresAt.toISOString(),
        });

      if (subscriptionError) {
        console.error(
          "Subscription creation error:",
          subscriptionError
        );

        return NextResponse.json(
          { success: false },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "NOWPayments IPN error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}