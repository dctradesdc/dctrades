import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createPayment } from "@/lib/nowpayments/client";

const PLANS = {
  basic: {
    name: "Basic",
    price: 15,
  },
  pro: {
    name: "Pro",
    price: 30,
  },
} as const;

type PaidPlan = keyof typeof PLANS;

export async function POST(request: Request) {
  try {
    // Normal client: only for checking the logged-in user
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please sign in first.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const plan = body?.plan as PaidPlan;

    if (plan !== "basic" && plan !== "pro") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid subscription plan.",
        },
        { status: 400 }
      );
    }

    const selectedPlan = PLANS[plan];

    const orderId =
      `DC-${plan.toUpperCase()}-${user.id}-${randomUUID()}`;

    // Admin client bypasses RLS.
    // This is server-side only.
    const admin = createAdminClient();

    // Create local payment order
    const {
      data: paymentOrder,
      error: orderError,
    } = await admin
      .from("payment_orders")
      .insert({
        user_id: user.id,
        plan,
        amount: selectedPlan.price,
        currency: "USD",
        provider: "nowpayments",
        order_id: orderId,
        status: "waiting",
      })
      .select("id, order_id")
      .single();

    if (orderError || !paymentOrder) {
      console.error(
        "Payment order creation error:",
        orderError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to create payment order.",
        },
        { status: 500 }
      );
    }

    // Create NOWPayments payment
    let payment;

    try {
      payment = await createPayment({
        amount: selectedPlan.price,
        orderId,
        description:
          `DC Trades ${selectedPlan.name} Plan - 3 Months`,
      });
    } catch (error) {
      // Remove local order if NOWPayments fails
      await admin
        .from("payment_orders")
        .delete()
        .eq("id", paymentOrder.id);

      throw error;
    }

    // Save NOWPayments payment ID
    const {
      error: updateError,
    } = await admin
      .from("payment_orders")
      .update({
        provider_payment_id:
          String(payment.payment_id),

        status:
          payment.payment_status === "waiting"
            ? "waiting"
            : payment.payment_status,

        updated_at:
          new Date().toISOString(),
      })
      .eq("id", paymentOrder.id);

    if (updateError) {
      console.error(
        "Payment order update error:",
        updateError
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Payment was created but could not be linked to your account. Please contact support.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      plan,
      payment,
    });
  } catch (error) {
    console.error(
      "Create payment error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unable to create payment.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}