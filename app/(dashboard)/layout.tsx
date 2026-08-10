import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { getProfile } from "@/features/profile/queries";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { getUserSubscription } from "@/lib/subscriptions/get-user-plan";
import { getPlanLimits } from "@/lib/subscriptions/limits";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Suspension + admin status
  const {
    data: profileStatus,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select("is_suspended, is_admin")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error(profileError);
  }

  if (profileStatus?.is_suspended) {
    redirect("/suspended");
  }

  // Accounts
  const {
    data,
    error: accountsError,
  } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: true,
    });

  if (accountsError) {
    console.error(accountsError);
  }

  const accounts = data ?? [];

  const activeAccount =
    accounts.find(
      (account) => account.is_active
    ) ?? accounts[0];

  // Profile
  const profile = await getProfile();

  // Subscription
  const subscription =
    await getUserSubscription();

  const planLimits =
    getPlanLimits(subscription.plan);

  // Account usage
  const accountCount = accounts.filter(
    (account) => !account.archived
  ).length;

  // Trade usage
  const { count: tradeCount } =
    await supabase
      .from("trades")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

  return (
    <SidebarProvider>
      <AppSidebar
        plan={subscription.plan}
        accountCount={accountCount}
        accountLimit={planLimits.maxAccounts}
        tradeCount={tradeCount ?? 0}
        tradeLimit={planLimits.maxTrades}
      />

      <SidebarInset>
        <SiteHeader
          accounts={accounts}
          activeAccountId={
            activeAccount?.id ?? ""
          }
          profile={
            profile
              ? {
                  ...profile,
                  isAdmin:
                    profileStatus?.is_admin ??
                    false,
                }
              : null
          }
        />

        <main className="flex flex-1 flex-col p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}