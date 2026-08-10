"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  cancelUserSubscription,
  updateUserSubscription,
} from "@/features/admin/actions/subscription";

import type { AdminUser } from "@/features/admin/users";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  user: AdminUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function toDateTimeLocal(value: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }
  
  
  const offset = date.getTimezoneOffset();

  const localDate = new Date(
    date.getTime() - offset * 60 * 1000
  );

  return localDate.toISOString().slice(0, 16);
}

function getDefaultStartDate() {
  const date = new Date();


  const offset = date.getTimezoneOffset();

  const localDate = new Date(
    date.getTime() - offset * 60 * 1000
  );

  return localDate.toISOString().slice(0, 16);
}

function getDefaultExpiryDate() {
  const date = new Date();

  date.setDate(date.getDate() + 92);

  const offset = date.getTimezoneOffset();

  const localDate = new Date(
    date.getTime() - offset * 60 * 1000
  );

  return localDate.toISOString().slice(0, 16);
}

export function SubscriptionDialog({
  user,
  open,
  onOpenChange,
}: Props) {

  const existingPlan =
    user.subscription.plan === "pro"
      ? "pro"
      : "basic";

  const [plan, setPlan] = useState<"basic" | "pro">(
    existingPlan
  );

  const [startedAt, setStartedAt] = useState(
    () =>
      toDateTimeLocal(
        user.subscription.startedAt
      ) || getDefaultStartDate()
  );

  const [expiresAt, setExpiresAt] = useState(
    () =>
      toDateTimeLocal(
        user.subscription.expiresAt
      ) || getDefaultExpiryDate()
  );

  const [pending, startTransition] =
    useTransition();

  function handleSave() {
    if (!startedAt || !expiresAt) {
      toast.error(
        "Please select both start and expiry dates."
      );

      return;
    }

    const start = new Date(startedAt);
    const expiry = new Date(expiresAt);

    if (expiry <= start) {
      toast.error(
        "Expiry date must be after the start date."
      );

      return;
    }

    startTransition(async () => {
      try {
        await updateUserSubscription({
          userId: user.id,
          plan,
          startedAt,
          expiresAt,
        });

        toast.success(
          `${plan === "pro" ? "Pro" : "Basic"} plan assigned successfully.`
        );

        onOpenChange(false);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to update subscription."
        );
      }
    });
  }

  function handleCancel() {
    startTransition(async () => {
      try {
        await cancelUserSubscription(user.id);

        toast.success(
          "Subscription cancelled."
        );

        onOpenChange(false);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to cancel subscription."
        );
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Manage Subscription
          </DialogTitle>

          <DialogDescription>
            Assign or cancel a subscription for{" "}
            {user.email}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Plan */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Plan
            </label>

            <Select
              value={plan}
              onValueChange={(value) =>
                setPlan(
                  value as "basic" | "pro"
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="basic">
                  Basic
                </SelectItem>

                <SelectItem value="pro">
                  Pro
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Start Date
            </label>

            <Input
              type="datetime-local"
              value={startedAt}
              onChange={(event) =>
                setStartedAt(
                  event.target.value
                )
              }
            />
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Expiry Date
            </label>

            <Input
              type="datetime-local"
              value={expiresAt}
              onChange={(event) =>
                setExpiresAt(
                  event.target.value
                )
              }
            />
          </div>

          {/* Current Subscription */}
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="text-sm font-semibold">
              Current Subscription
            </p>

            <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <p>
                Plan:{" "}
                <span className="font-medium capitalize text-foreground">
                  {user.subscription.plan}
                </span>
              </p>

              <p>
                Status:{" "}
                <span className="font-medium capitalize text-foreground">
                  {user.subscription.status}
                </span>
              </p>

              <p>
                Started:{" "}
                <span className="font-medium text-foreground">
                  {user.subscription.startedAt
                    ? new Date(
                        user.subscription.startedAt
                      ).toLocaleString()
                    : "-"}
                </span>
              </p>

              <p>
                Expires:{" "}
                <span className="font-medium text-foreground">
                  {user.subscription.expiresAt
                    ? new Date(
                        user.subscription.expiresAt
                      ).toLocaleString()
                    : "Never"}
                </span>
              </p>

              <p>
                Provider:{" "}
                <span className="font-medium text-foreground">
                  {user.subscription.paymentId
                    ? "NOWPayments"
                    : "Admin"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button
            type="button"
            variant="destructive"
            disabled={pending}
            onClick={handleCancel}
          >
            {pending && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}

            Cancel Subscription
          </Button>

          <Button
            type="button"
            disabled={pending}
            onClick={handleSave}
          >
            {pending && (
              <Loader2 className="mr-2 size-4 animate-spin" />
            )}

            Save Subscription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}