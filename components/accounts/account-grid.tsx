"use client";

import { useState } from "react";
import { toast } from "sonner";

import type { Account } from "@/types/account";

import type { AccountMetrics } from "@/features/accounts/calculations";

import {
  duplicateAccount,
  setActiveAccount,
} from "@/features/accounts/actions";

import { AccountCard } from "./account-card";
import { ArchiveAccountDialog } from "./archive-account-dialog";
import { DeleteAccountDialog } from "./delete-account-dialog";
import { EditAccountDialog } from "./edit-account-dialog";

interface AccountWithMetrics {
  account: Account;
  metrics: AccountMetrics | null;
}

interface AccountGridProps {
  accounts: AccountWithMetrics[];
}

export function AccountGrid({
  accounts,
}: AccountGridProps) {
  const [editing, setEditing] =
    useState(false);

  const [archiving, setArchiving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const [selectedAccount, setSelectedAccount] =
    useState<Account | null>(null);

  async function handleDuplicate(
    account: Account
  ) {
    const result =
      await duplicateAccount(
        account.id
      );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  }

  async function handleSetActive(
    account: Account
  ) {
    if (account.is_active) {
      return;
    }

    const result =
      await setActiveAccount(
        account.id
      );

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  }

  if (accounts.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl border border-dashed">
        <div className="space-y-2 text-center">
          <h3 className="text-xl font-semibold">
            No Accounts Yet
          </h3>

          <p className="text-muted-foreground">
            Create your first trading
            account to start journaling
            your trades.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {accounts.map(
          ({
            account,
            metrics,
          }) => (
            <AccountCard
              key={account.id}
              account={account}
              metrics={metrics}
              onSetActive={
                handleSetActive
              }
              onEdit={(
                account
              ) => {
                setSelectedAccount(
                  account
                );
                setEditing(
                  true
                );
              }}
              onDuplicate={
                handleDuplicate
              }
              onArchive={(
                account
              ) => {
                setSelectedAccount(
                  account
                );
                setArchiving(
                  true
                );
              }}
              onDelete={(
                account
              ) => {
                setSelectedAccount(
                  account
                );
                setDeleting(
                  true
                );
              }}
            />
          )
        )}
      </div>

      <EditAccountDialog
        account={selectedAccount}
        open={editing}
        onOpenChange={setEditing}
      />

      <ArchiveAccountDialog
        account={selectedAccount}
        open={archiving}
        onOpenChange={
          setArchiving
        }
      />

      <DeleteAccountDialog
        account={selectedAccount}
        open={deleting}
        onOpenChange={
          setDeleting
        }
      />
    </>
  );
}