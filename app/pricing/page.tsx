import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { Check } from "lucide-react";

import { createMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { PlanButton } from "@/components/pricing/plan-button";

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description:
    "Choose the DC Trades plan that fits your trading journal needs. Start free or unlock more journal accounts and unlimited trades.",
  path: "/pricing",
});

const plans = [
  {
    name: "Free",
    label: "Start Journaling",
    price: "$0",
    period: "forever",
    description:
      "A simple way to start tracking your trades.",
    features: [
      "1 trading journal account",
      "Up to 10 trades",
    ],
    popular: false,
  },
  {
    name: "Basic",
    label: "For Active Traders",
    price: "$15",
    period: "3 months",
    description:
      "More room to journal and manage your trading activity.",
    features: [
      "2 trading journal accounts",
      "Unlimited trades",
    ],
    popular: true,
  },
  {
    name: "Pro",
    label: "For Serious Traders",
    price: "$30",
    period: "3 months",
    description:
      "Unlimited journaling for traders who want more flexibility.",
    features: [
      "Unlimited trading journal accounts",
      "Unlimited trades",
    ],
    popular: false,
  },
];

export default async function PricingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to DC Trades
          </Link>

          <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">
            Simple pricing for your trading journal
          </h1>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Start free and upgrade when you need more journal accounts
            and unlimited trades.
          </p>
        </div>

        {/* Pricing */}
        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                plan.popular
                  ? "border-primary shadow-primary/10"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  {plan.label}
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  {plan.name}
                </h2>

                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mt-8">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>

                  <span className="pb-1 text-sm text-muted-foreground">
                    / {plan.period}
                  </span>
                </div>
              </div>

              <div className="my-8 h-px bg-border" />

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="size-3.5 text-primary" />
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                {/* Logged-in user */}
                {user ? (
                  plan.name === "Free" ? (
                    <Link
                      href="/dashboard"
                      className="block"
                    >
                      <Button
                        className="w-full rounded-xl"
                        variant="outline"
                        size="lg"
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <PlanButton
                      plan={
                        plan.name.toLowerCase() as
                          | "basic"
                          | "pro"
                      }
                      label={`Choose ${plan.name}`}
                    />
                  )
                ) : (
                  /* Logged-out user */
                  <Link
                    href={
                      plan.name === "Free"
                        ? "/signup"
                        : `/signup?plan=${plan.name.toLowerCase()}`
                    }
                    className="block"
                  >
                    <Button
                      className="w-full rounded-xl"
                      variant={
                        plan.popular
                          ? "default"
                          : "outline"
                      }
                      size="lg"
                    >
                      {plan.name === "Free"
                        ? "Get Started"
                        : `Choose ${plan.name}`}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legal note */}
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Paid plans are billed for a 3-month period. Cryptocurrency
          payments are processed through our supported payment provider.
          See our{" "}
          <Link
            href="/refund-policy"
            className="underline underline-offset-4 hover:text-foreground"
          >
            Refund Policy
          </Link>{" "}
          for applicable terms.
        </p>
      </div>
    </main>
  );
}