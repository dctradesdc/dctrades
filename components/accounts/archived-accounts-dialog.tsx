"use client";

import { useTransition } from "react";
import { Archive, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import type { Account } from "@/types/account";

import { restoreAccount } from "@/features/accounts/actions";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ArchivedAccountsDialogProps {
  accounts: Account[];
}

export function ArchivedAccountsDialog({
  accounts,
}: ArchivedAccountsDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  function handleRestore(
    accountId: string
  ) {
    startTransition(async () => {
      const result = await restoreAccount(
        accountId
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-10 items-center justify-center rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Archive className="mr-2 size-4" />
        Archived ({accounts.length})
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Archived Accounts
          </DialogTitle>

          <DialogDescription>
            Restore or permanently delete archived
            accounts.
          </DialogDescription>
        </DialogHeader>

        {accounts.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
            <p className="text-muted-foreground">
              No archived accounts.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-medium">
                    {account.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    $
                    {Number(
                      account.account_size
                    ).toLocaleString()}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={isPending}
                  onClick={() =>
                    handleRestore(account.id)
                  }
                >
                  <RotateCcw className="mr-2 size-4" />
                  Restore
                </Button>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}