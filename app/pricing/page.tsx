import type { Metadata } from "next";

import { getUserSubscription } from "@/lib/subscriptions/get-user-plan";
import { createClient } from "@/lib/supabase/server";

import PricingPage from "@/components/pricing/pricing-page";

export const metadata: Metadata = {
  title: "Trading Journal Pricing",
  description:
    "Choose the right DC Trades plan for your trading journal. Start free or upgrade for more trading accounts and unlimited trades.",
  alternates: {
    canonical: "https://www.dctrades.in/pricing",
  },
  openGraph: {
    title: "Trading Journal Pricing | DC Trades",
    description:
      "Start free with DC Trades or upgrade for more trading accounts and unlimited trades.",
    url: "https://www.dctrades.in/pricing",
  },
};

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const subscription = await getUserSubscription();

  return (
    <PricingPage
      user={user}
      currentPlan={subscription.plan}
    />
  );
}