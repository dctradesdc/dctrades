"use client";

import {
  CheckCircle2,
  Circle,
} from "lucide-react";

import type { Account } from "@/types/account";

import type { AccountMetrics } from "@/features/accounts/calculations";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { AccountMenu } from "./account-menu";

interface AccountCardProps {
  account: Account;
  metrics: AccountMetrics | null;

  onOpen?: (account: Account) => void;
  onEdit?: (account: Account) => void;
  onDuplicate?: (account: Account) => void;
  onExport?: (account: Account) => void;
  onArchive?: (account: Account) => void;
  onDelete?: (account: Account) => void;
  onSetActive?: (account: Account) => void;
}

export function AccountCard({
  account,
  metrics,
  onEdit,
  onDuplicate,
  onExport,
  onArchive,
  onDelete,
  onSetActive,
}: AccountCardProps) {
const currentBalance =
  metrics?.currentBalance ??
  Number(account.current_balance);

  const profit =
    metrics?.totalPnL ?? 0;

  const progress =
    metrics?.progress ?? 0;

  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>
            {account.name}
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Trading Account
          </p>
        </div>

        <AccountMenu
          onEdit={() =>
            onEdit?.(account)
          }
          onDuplicate={() =>
            onDuplicate?.(
              account
            )
          }
          onExport={() =>
            onExport?.(account)
          }
          onArchive={() =>
            onArchive?.(
              account
            )
          }
          onDelete={() =>
            onDelete?.(account)
          }
        />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs text-muted-foreground">
              Account Size
            </p>

            <p className="mt-1 text-lg font-semibold">
              $
              {account.account_size.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Current Balance
            </p>

            <p className="mt-1 text-lg font-semibold">
              $
              {currentBalance.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Profit Target
            </p>

            <p className="mt-1 text-lg font-semibold">
              {account.profit_target}%
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Profit / Loss
            </p>

            <p
              className={`mt-1 text-lg font-semibold ${
                profit >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {profit >= 0
                ? "+"
                : "-"}
              $
              {Math.abs(
                profit
              ).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Target Progress
            </span>

            <span className="font-medium">
              {progress.toFixed(1)}
              %
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">
              Daily DD
            </p>

            <p className="font-semibold">
              {
                account.daily_drawdown
              }
              %
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Overall DD
            </p>

            <p className="font-semibold">
              {
                account.overall_drawdown
              }
              %
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              Losing %
            </p>

            <p className="font-semibold">
              {
                account.losing_percentage
              }
              %
            </p>
          </div>
        </div>

        <div className="border-t pt-5">
          <Button
            variant={
              account.is_active
                ? "default"
                : "outline"
            }
            className="w-full justify-start"
            disabled={
              account.is_active
            }
            onClick={() =>
              onSetActive?.(
                account
              )
            }
          >
            {account.is_active ? (
              <CheckCircle2 className="mr-2 size-5" />
            ) : (
              <Circle className="mr-2 size-5" />
            )}

            {account.is_active
              ? "Active Account"
              : "Make Active"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}