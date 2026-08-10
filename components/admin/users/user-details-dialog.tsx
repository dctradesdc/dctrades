"use client";

import { useState } from "react";

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
import { Button } from "@/components/ui/button";

import type { AdminUser } from "@/features/admin/users";

import { SubscriptionDialog } from "./subscription-dialog";

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
    (today.getTime() - lastActive.getTime()) /
    (1000 * 60 * 60 * 24);

  return diffDays < 7 ? "Active" : "Inactive";
}

function getPlanBadgeVariant(
  plan: AdminUser["subscription"]["plan"]
) {
  switch (plan) {
    case "pro":
      return "default" as const;

    case "basic":
      return "secondary" as const;

    default:
      return "outline" as const;
  }
}

export function UserDetailsDialog({
  user,
  open,
  onOpenChange,
}: Props) {
  const [subscriptionOpen, setSubscriptionOpen] =
    useState(false);

  if (!user) return null;

  const status = getStatus(user);
  const subscription = user.subscription;

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              User Details
            </DialogTitle>

            <DialogDescription>
              User information and subscription details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* User */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={
                    user.avatar_url ??
                    undefined
                  }
                  alt={
                    user.full_name ??
                    "User"
                  }
                />

                <AvatarFallback>
                  {user.full_name
                    ?.charAt(0)
                    .toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0">
                <h3 className="text-lg font-semibold">
                  {user.full_name ??
                    "Unknown User"}
                </h3>

                <p className="truncate text-muted-foreground">
                  {user.email}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge
                    variant={
                      status === "Suspended"
                        ? "destructive"
                        : status === "Active"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {status}
                  </Badge>

                  {user.is_admin && (
                    <Badge variant="outline">
                      Admin
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div>
              <h3 className="mb-3 text-sm font-semibold">
                Account Information
              </h3>

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
                  value={
                    user.created_at
                      ? new Date(
                          user.created_at
                        ).toLocaleDateString()
                      : "-"
                  }
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

            {/* Subscription */}
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold">
                  Subscription
                </h3>

                <Badge
                  variant={getPlanBadgeVariant(
                    subscription.plan
                  )}
                  className="capitalize"
                >
                  {subscription.plan}
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Info
                  label="Plan"
                  value={
                    <span className="capitalize">
                      {subscription.plan}
                    </span>
                  }
                />

                <Info
                  label="Status"
                  value={
                    <span className="capitalize">
                      {subscription.status}
                    </span>
                  }
                />

                <Info
                  label="Started"
                  value={
                    subscription.startedAt
                      ? new Date(
                          subscription.startedAt
                        ).toLocaleString()
                      : "-"
                  }
                />

                <Info
                  label="Expires"
                  value={
                    subscription.expiresAt
                      ? new Date(
                          subscription.expiresAt
                        ).toLocaleString()
                      : "Never"
                  }
                />

                <Info
                  label="Provider"
                  value={
                    subscription.paymentId
                      ? "NOWPayments"
                      : "Admin"
                  }
                />

                <Info
                  label="Payment ID"
                  value={
                    subscription.paymentId ??
                    "-"
                  }
                />
              </div>

              {/* Manage Button */}
              <div className="mt-5 flex justify-end border-t pt-4">
                <Button
                  type="button"
                  onClick={() =>
                    setSubscriptionOpen(true)
                  }
                >
                  Manage Subscription
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Subscription Management */}
      <SubscriptionDialog
        user={user}
        open={subscriptionOpen}
        onOpenChange={setSubscriptionOpen}
      />
    </>
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
    <div className="min-w-0 rounded-lg border bg-background/50 p-3">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 wrap-break-word font-medium">
        {value}
      </p>
    </div>
  );
}