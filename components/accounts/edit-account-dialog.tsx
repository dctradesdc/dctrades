"use client";


import type { Account } from "@/types/account";

import { AccountForm } from "./account-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditAccountDialogProps {
  account: Account | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditAccountDialog({
  account,
  open,
  onOpenChange,
}: EditAccountDialogProps) {
  if (!account) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Edit Account
          </DialogTitle>

          <DialogDescription>
            Update your trading account.
          </DialogDescription>
        </DialogHeader>

        <AccountForm
          account={account}
          onSuccess={() =>
            onOpenChange(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}