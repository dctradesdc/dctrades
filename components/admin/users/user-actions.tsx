"use client";

import { useState, useTransition } from "react";
import {
  Ban,
  CheckCircle,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import {
  toggleUserSuspension,
} from "@/features/admin/actions";

import { DeleteUserDialog } from "./delete-user-dialog";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  userId: string;
  suspended: boolean;
  onView: () => void;
}

export function UserActions({
  userId,
  suspended,
  onView,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent focus:outline-none"
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-48"
        >
          <DropdownMenuItem
            onClick={onView}
          >
            <Eye className="mr-2 h-4 w-4" />
            View User
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={pending}
            onClick={() => {
              startTransition(
                async () => {
                  try {
                    await toggleUserSuspension(
                      userId,
                      !suspended
                    );

                    toast.success(
                      suspended
                        ? "User unsuspended."
                        : "User suspended."
                    );
                  } catch {
                    toast.error(
                      "Something went wrong."
                    );
                  }
                }
              );
            }}
          >
            {suspended ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Unsuspend
              </>
            ) : (
              <>
                <Ban className="mr-2 h-4 w-4" />
                Suspend
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={() =>
              setDeleteOpen(true)
            }
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteUserDialog
        userId={userId}
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
      />
    </>
  );
}