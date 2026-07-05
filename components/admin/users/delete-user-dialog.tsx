"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { deleteUser } from "@/features/admin/actions";

import { Input } from "@/components/ui/input";

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

interface Props {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteUserDialog({
  userId,
  open,
  onOpenChange,
}: Props) {
  const [text, setText] =
    useState("");

  const [pending, startTransition] =
    useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteUser(userId);

        toast.success(
          "User deleted."
        );

        onOpenChange(false);
      } catch {
        toast.error(
          "Unable to delete user."
        );
      }
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
            Delete User
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action is permanent.

            Type <b>DELETE</b> to
            continue.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Input
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          placeholder="DELETE"
        />

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={
              pending ||
              text !== "DELETE"
            }
            onClick={handleDelete}
          >
            {pending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Delete User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}