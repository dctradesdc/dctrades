import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { getProfile } from "@/features/profile/queries";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase =
    await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Get suspension + admin status
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

  const profile =
    await getProfile();

  return (
    <SidebarProvider>
      <AppSidebar />

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