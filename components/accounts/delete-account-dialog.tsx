"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import type { Account } from "@/types/account";

import { deleteAccount } from "@/features/accounts/actions";

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

interface DeleteAccountDialogProps {
  account: Account | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteAccountDialog({
  account,
  open,
  onOpenChange,
}: DeleteAccountDialogProps) {
  const [isPending, startTransition] =
    useTransition();

  if (!account) return null;

  function handleDelete() {
    startTransition(async () => {
const accountId = account?.id;

if (!accountId) return;

const result = await deleteAccount(accountId);

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
            Delete Account
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently delete{" "}
            <strong>{account.name}</strong>.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}