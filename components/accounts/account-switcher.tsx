"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

import { setActiveAccount } from "@/features/accounts/actions";

import type { Account } from "@/types/account";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AccountSwitcherProps {
  accounts: Account[];
  activeAccountId: string;
}

export function AccountSwitcher({
  accounts,
  activeAccountId,
}: AccountSwitcherProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const active =
    accounts.find(
      (a) => a.id === activeAccountId
    );

  function handleSwitch(
    accountId: string
  ) {
    if (
      accountId === activeAccountId
    ) {
      return;
    }

    startTransition(async () => {
      const result =
        await setActiveAccount(
          accountId
        );

      if (!result.success) {
        toast.error(
          result.message
        );
        return;
      }

      toast.success(
        result.message
      );

      router.refresh();
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex min-w-52 items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <span className="truncate">
          {active?.name}
        </span>

        <ChevronDown className="size-4 opacity-60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60"
      >
        {accounts.map((account) => (
          <DropdownMenuItem
            key={account.id}
            disabled={
              isPending
            }
            onClick={() =>
              handleSwitch(
                account.id
              )
            }
          >
            <div className="flex w-full items-center justify-between">
              <span>
                {account.name}
              </span>

              {account.id ===
                activeAccountId && (
                <span className="text-xs text-primary">
                  Active
                </span>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}