import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

interface RouteProps {
  params: Promise<{
    paymentId: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { paymentId } = await params;

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const { data: payment } =
      await supabase
        .from("payment_orders")
        .select(
          "provider_payment_id, status, plan"
        )
        .eq(
          "provider_payment_id",
          paymentId
        )
        .eq("user_id", user.id)
        .eq("provider", "nowpayments")
        .maybeSingle();

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment not found.",
        },
        { status: 404 }
      );
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("plan, status, expires_at")
      .eq("user_id", user.id)
      .eq("status", "active")
      .order("expires_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    return NextResponse.json({
      success: true,
      status: payment.status,
      plan: payment.plan,
      subscription: subscription
        ? {
            plan: subscription.plan,
            status: subscription.status,
            expires_at: subscription.expires_at,
          }
        : null,
    });
  } catch (error) {
    console.error(
      "Payment status error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to check payment status.",
      },
      { status: 500 }
    );
  }
}