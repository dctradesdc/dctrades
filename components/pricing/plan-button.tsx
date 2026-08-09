"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface PlanButtonProps {
  plan: "basic" | "pro";
  label: string;
}

interface PaymentResponse {
  payment_id: string | number;
  payment_status: string;
  pay_address?: string;
  pay_amount?: number;
  pay_currency?: string;
  valid_until?: string;
}

interface ApiResponse {
  success: boolean;
  plan?: "basic" | "pro";
  payment?: PaymentResponse;
  message?: string;
}

export function PlanButton({
  plan,
  label,
}: PlanButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    if (loading) return;

    try {
      setLoading(true);

      const response = await fetch(
        "/api/payments/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ plan }),
        }
      );

      const data: ApiResponse =
        await response.json();

      console.log(
        "NOWPayments response:",
        data
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to start payment."
        );
      }

      const paymentId =
        data.payment?.payment_id;

      if (!paymentId) {
        throw new Error(
          "Payment was not created correctly."
        );
      }

      router.push(
        `/payment/${paymentId}`
      );
    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to start payment."
      );

      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      className="w-full rounded-xl"
      size="lg"
      disabled={loading}
      onClick={handleSubscribe}
    >
      {loading
        ? "Creating payment..."
        : label}
    </Button>
  );
}