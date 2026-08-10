import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SubscriptionCardProps {
  plan: string;
  status: string;
  expiresAt: string | null;
}

export function SubscriptionCard({
  plan,
  status,
  expiresAt,
}: SubscriptionCardProps) {
  const isFree = plan === "free";

  const formattedExpiry = expiresAt
    ? new Date(expiresAt).toLocaleDateString()
    : null;

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">
            Subscription
          </p>

          <h2 className="mt-1 text-2xl font-bold capitalize">
            {plan} Plan
          </h2>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
          {status}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {plan === "free" && (
          <>
            <Feature>1 trading journal account</Feature>
            <Feature>Up to 10 trades</Feature>
          </>
        )}

        {plan === "basic" && (
          <>
            <Feature>2 trading journal accounts</Feature>
            <Feature>Unlimited trades</Feature>
          </>
        )}

        {plan === "pro" && (
          <>
            <Feature>Unlimited trading accounts</Feature>
            <Feature>Unlimited trades</Feature>
          </>
        )}
      </div>

      {formattedExpiry && (
        <p className="mt-5 text-sm text-muted-foreground">
          Expires on{" "}
          <span className="font-medium text-foreground">
            {formattedExpiry}
          </span>
        </p>
      )}

      <div className="mt-6">
        <Link href="/pricing">
          <Button className="w-full">
            {isFree ? "Upgrade Plan" : "Manage Plan"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Feature({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Check className="size-4 text-primary" />
      <span>{children}</span>
    </div>
  );
}