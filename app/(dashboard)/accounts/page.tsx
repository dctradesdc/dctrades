import { AccountGrid } from "@/components/accounts/account-grid";
import { ArchivedAccountsDialog } from "@/components/accounts/archived-accounts-dialog";
import { CreateAccountDialog } from "@/components/accounts/create-account-dialog";

import {
  getAccounts,
  getArchivedAccounts,
} from "@/features/accounts/queries";

export default async function AccountsPage() {
  const accounts =
    await getAccounts();

  const archivedAccounts =
    await getArchivedAccounts();

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
        </div>

        <div className="flex items-center gap-3">
          <ArchivedAccountsDialog
            accounts={archivedAccounts}
          />

          <CreateAccountDialog />
        </div>
      </div>

      <AccountGrid
        accounts={accounts}
      />
    </div>
  );
}