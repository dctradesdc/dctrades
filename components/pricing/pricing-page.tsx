"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { PlanButton } from "@/components/pricing/plan-button";
import { Logo } from "@/components/logo";

interface PricingPageProps {
  user?: User | null;
  currentPlan?: "free" | "basic" | "pro";
}

const plans = [
  {
    name: "Free",
    label: "Start Journaling",
    price: "$0",
    period: "forever",
    description: "A simple way to start tracking your trades.",
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
    description: "More room to journal and manage your trading activity.",
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
    description: "Unlimited journaling for traders who want more flexibility.",
    features: [
      "Unlimited trading journal accounts",
      "Unlimited trades",
    ],
    popular: false,
  },
];

export default function PricingPage({
  user,
  currentPlan = "free",
}: PricingPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background Video Layer with 0.3x Speed */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-85 transition-opacity duration-500 dark:opacity-70"
        >
          <source
            src="https://res.cloudinary.com/dniwuwt6j/video/upload/v1786283083/BG_Vedio_prwxiu.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Balanced Transparent Overlay */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-background/35 backdrop-blur-[1px] transition-colors duration-300 dark:bg-background/50" />

      {/* Atmospheric Spatial Glow */}
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-160 w-160 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[160px] dark:bg-blue-500/15" />
      </div>

      {/* Header Bar */}
      <header className="relative z-50 flex items-center justify-between border-b border-border/40 bg-background/60 px-6 py-4 backdrop-blur-md md:px-12">
        <Logo />

        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-xs font-medium">
            <ArrowLeft className="size-4" />
            Back to Home
          </Button>
        </Link>
      </header>

      {/* Main Content Area */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Page Title & Subtitle */}
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            DC Trades Plans
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Start free and upgrade when you need more journal accounts and unlimited trades.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-card/70 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 dark:bg-card/60 ${
                plan.popular
                  ? "border-primary shadow-primary/15 ring-1 ring-primary/50"
                  : "border-border/80"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {plan.label}
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  {plan.name}
                </h2>

                <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-end gap-1.5">
                  <span className="font-mono text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>

                  <span className="pb-1 text-xs font-medium text-muted-foreground">
                    / {plan.period}
                  </span>
                </div>
              </div>

              <div className="my-6 h-px bg-border/60" />

              <ul className="space-y-3.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm font-medium"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <Check className="size-3.5 text-primary" />
                    </span>

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                {user ? (
                    plan.name.toLowerCase() === currentPlan ? (
                      <Link href="/dashboard" className="block">
                        <Button
                          className="w-full rounded-xl font-medium"
                          variant="outline"
                          size="lg"
                        >
                          Current Plan
                        </Button>
                      </Link>
                    ) : plan.name === "Free" ? (
                      <Link href="/dashboard" className="block">
                        <Button
                          className="w-full rounded-xl font-medium"
                          variant="outline"
                          size="lg"
                        >
                          Go to Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <PlanButton
                        plan={plan.name.toLowerCase() as "basic" | "pro"}
                        label={
                          currentPlan === "free"
                            ? `Choose ${plan.name}`
                            : `Upgrade to ${plan.name}`
                        }
                      />
                    )
                  ) : (
                    <Link
                      href={
                        plan.name === "Free"
                          ? "/signup"
                          : `/signup?plan=${plan.name.toLowerCase()}`
                      }
                      className="block"
                    >
                      <Button
                        className="w-full rounded-xl font-medium"
                        variant={plan.popular ? "default" : "outline"}
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

        {/* Legal & Billing Note */}
        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          Paid plans are billed for a 3-month period. Cryptocurrency payments are processed through our supported payment provider.
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