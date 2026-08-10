import { AccountGrid } from "@/components/accounts/account-grid";
import { ArchivedAccountsDialog } from "@/components/accounts/archived-accounts-dialog";
import { CreateAccountDialog } from "@/components/accounts/create-account-dialog";

import {
  getAccounts,
  getArchivedAccounts,
} from "@/features/accounts/queries";

import { getUserSubscription } from "@/lib/subscriptions/get-user-plan";
import { getPlanLimits } from "@/lib/subscriptions/limits";

export default async function AccountsPage() {
  const accounts = await getAccounts();

  const archivedAccounts =
    await getArchivedAccounts();

  const subscription =
    await getUserSubscription();

  const limits =
    getPlanLimits(subscription.plan);

  const accountCount = accounts.length;

  const hasReachedLimit =
    limits.maxAccounts !== null &&
    accountCount >= limits.maxAccounts;

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

          <div className="mt-3 text-sm text-muted-foreground">
            {limits.maxAccounts === null ? (
              <span>
                {subscription.plan.toUpperCase()} ·{" "}
                <strong className="text-foreground">
                  {accountCount}
                </strong>{" "}
                accounts · Unlimited
              </span>
            ) : (
              <span>
                {subscription.plan.toUpperCase()} ·{" "}
                <strong className="text-foreground">
                  {accountCount}
                </strong>{" "}
                / {limits.maxAccounts} accounts
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ArchivedAccountsDialog
            accounts={archivedAccounts}
          />

          {!hasReachedLimit ? (
            <CreateAccountDialog />
          ) : (
            <a
              href="/pricing"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Upgrade Plan
            </a>
          )}
        </div>
      </div>

      {hasReachedLimit && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm font-medium">
            You have reached your{" "}
            {limits.maxAccounts} account limit.
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Upgrade your plan to create more trading accounts.
          </p>
        </div>
      )}

      <AccountGrid
        accounts={accounts}
      />
    </div>
  );
}