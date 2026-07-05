"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { Account } from "@/types/account";

import { accountSchema } from "@/features/accounts/validation";
import {
  createAccount,
  updateAccount,
} from "@/features/accounts/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AccountFormValues = z.input<typeof accountSchema>;
type AccountSchema = z.output<typeof accountSchema>;

interface AccountFormProps {
  account?: Account;
  onSuccess?: () => void;
}

export function AccountForm({
  account,
  onSuccess,
}: AccountFormProps) {
  const [isPending, startTransition] =
    useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: account?.name ?? "",
      account_size:
        account?.account_size ?? 100000,
      current_balance:
        account?.current_balance ??
        100000,
      daily_drawdown:
        account?.daily_drawdown ?? 5,
      overall_drawdown:
        account?.overall_drawdown ?? 10,
      profit_target:
        account?.profit_target ?? 10,
      losing_percentage:
        account?.losing_percentage ??
        20,
    },
  });

  function onSubmit(
    values: AccountFormValues
  ) {
    startTransition(async () => {
      const parsed: AccountSchema =
        accountSchema.parse(values);

      const result = account
        ? await updateAccount(
            account.id,
            parsed
          )
        : await createAccount(parsed);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      reset();

      onSuccess?.();
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Account Name"
          error={errors.name?.message}
        >
          <Input
            placeholder="FTMO Challenge"
            {...register("name")}
          />
        </Field>

        <Field
          label="Account Size ($)"
          error={
            errors.account_size?.message
          }
        >
          <Input
            type="number"
            {...register("account_size")}
          />
        </Field>

        <Field
          label="Current Balance ($)"
          error={
            errors.current_balance
              ?.message
          }
        >
          <Input
            type="number"
            {...register(
              "current_balance"
            )}
            disabled={!!account}
          />
        </Field>

        <Field
          label="Daily Drawdown (%)"
          error={
            errors.daily_drawdown
              ?.message
          }
        >
          <Input
            type="number"
            {...register(
              "daily_drawdown"
            )}
          />
        </Field>

        <Field
          label="Overall Drawdown (%)"
          error={
            errors.overall_drawdown
              ?.message
          }
        >
          <Input
            type="number"
            {...register(
              "overall_drawdown"
            )}
          />
        </Field>

        <Field
          label="Profit Target (%)"
          error={
            errors.profit_target
              ?.message
          }
        >
          <Input
            type="number"
            {...register(
              "profit_target"
            )}
          />
        </Field>

        <Field
          label="Losing Percentage (%)"
          error={
            errors.losing_percentage
              ?.message
          }
        >
          <Input
            type="number"
            {...register(
              "losing_percentage"
            )}
          />
        </Field>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending
          ? account
            ? "Updating Account..."
            : "Creating Account..."
          : account
            ? "Update Account"
            : "Create Account"}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {children}

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}