import { getUserSubscription } from "@/lib/subscriptions/get-user-plan";
import { createClient } from "@/lib/supabase/server";

import PricingPage from "@/components/pricing/pricing-page";

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