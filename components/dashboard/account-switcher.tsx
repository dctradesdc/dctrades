"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";

import type { Account } from "@/types/account";

import { setActiveAccount } from "@/features/accounts/actions";

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

  if (!accounts.length) {
    return null;
  }

  const active =
    accounts.find(
      (a) => a.id === activeAccountId
    ) ?? accounts[0];

  function switchAccount(
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
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.refresh();
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex min-w-52 items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-accent">
        <span className="truncate">
          {active.name}
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
            disabled={isPending}
            onClick={() =>
              switchAccount(
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
                <Check className="size-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}