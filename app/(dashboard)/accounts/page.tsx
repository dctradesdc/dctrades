import { AccountGrid } from "@/components/accounts/account-grid";
import { ArchivedAccountsDialog } from "@/components/accounts/archived-accounts-dialog";
import { CreateAccountDialog } from "@/components/accounts/create-account-dialog";

import {
  getAccounts,
  getArchivedAccounts,
} from "@/features/accounts/queries";

import { getUserSubscription } from "@/lib/subscriptions/get-user-plan";
import { getPlanLimits } from "@/lib/subscriptions/limits";
import { createClient } from "@/lib/supabase/server";

export default async function AccountsPage() {
  const accounts = await getAccounts();
  const archivedAccounts = await getArchivedAccounts();

  const subscription = await getUserSubscription();
  const limits = getPlanLimits(subscription.plan);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let accountCount = accounts.length;

  if (user) {
    const { count } = await supabase
      .from("accounts")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .eq("archived", false);

    accountCount = count ?? 0;
  }

  const accountLimitText =
    limits.maxAccounts === null
      ? "Unlimited"
      : `${accountCount} / ${limits.maxAccounts}`;

  const canCreate =
    limits.maxAccounts === null ||
    accountCount < limits.maxAccounts;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Trading Accounts
          </h1>

          <p className="mt-1 text-muted-foreground">
            Create and manage your trading journal accounts.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full border bg-muted/40 px-3 py-1 font-medium capitalize">
              {subscription.plan} Plan
            </span>

            <span className="rounded-full border bg-muted/40 px-3 py-1 text-muted-foreground">
              Accounts:{" "}
              <span className="font-medium text-foreground">
                {accountLimitText}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ArchivedAccountsDialog
            accounts={archivedAccounts}
          />

          {canCreate ? (
            <CreateAccountDialog />
          ) : (
            <a
              href="/pricing"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Upgrade Plan
            </a>
          )}
        </div>
      </div>

      <AccountGrid accounts={accounts} />
    </div>
  );
}