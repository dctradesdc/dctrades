"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import type { Account } from "@/types/account";

import { archiveAccount } from "@/features/accounts/actions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ArchiveAccountDialogProps {
  account: Account | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ArchiveAccountDialog({
  account,
  open,
  onOpenChange,
}: ArchiveAccountDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  if (!account) return null;

  function handleArchive() {
    startTransition(async () => {
 const currentAccount = account;

if (!currentAccount) return;

const result = await archiveAccount(
  currentAccount.id
);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      onOpenChange(false);
    });
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Archive Account
          </AlertDialogTitle>

          <AlertDialogDescription>
            Archive{" "}
            <strong>{account.name}</strong>?

            <br />
            <br />

            You can restore this account later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleArchive}
            disabled={isPending}
          >
            {isPending
              ? "Archiving..."
              : "Archive"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}