"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import type { AdminUser } from "@/features/admin/users";

interface Props {
  user: AdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getStatus(user: AdminUser) {
  if (user.is_suspended) {
    return "Suspended";
  }

  if (!user.last_active_at) {
    return "Inactive";
  }

  const today = new Date(
    new Date().toDateString()
  );

  const lastActive = new Date(
    user.last_active_at
  );

  const diffDays =
    (today.getTime() -
      lastActive.getTime()) /
    (1000 * 60 * 60 * 24);

  return diffDays < 7
    ? "Active"
    : "Inactive";
}

export function UserDetailsDialog({
  user,
  open,
  onOpenChange,
}: Props) {
  if (!user) return null;

  const status = getStatus(user);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            User Details
          </DialogTitle>

          <DialogDescription>
            User information.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={
                  user.avatar_url ??
                  undefined
                }
              />

              <AvatarFallback>
                {user.full_name?.charAt(
                  0
                ) ?? "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h3 className="text-lg font-semibold">
                {user.full_name ??
                  "Unknown User"}
              </h3>

              <p className="text-muted-foreground">
                {user.email}
              </p>

              <Badge className="mt-2">
                {status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Info
              label="Accounts"
              value={user.accounts}
            />

            <Info
              label="Trades"
              value={user.trades}
            />

            <Info
              label="Joined"
              value={new Date(
                user.created_at
              ).toLocaleDateString()}
            />

            <Info
              label="Last Active"
              value={
                user.last_active_at
                  ? new Date(
                      user.last_active_at
                    ).toLocaleString()
                  : "-"
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 font-medium">
        {value}
      </p>
    </div>
  );
}