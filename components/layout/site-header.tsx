"use client";

import Link from "next/link";
import {
  PanelLeft,
  Shield,
} from "lucide-react";

import type { Account } from "@/types/account";

import { AccountSwitcher } from "@/components/dashboard/account-switcher";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface SiteHeaderProps {
  accounts: Account[];
  activeAccountId: string;

  profile: {
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
  } | null;
}

export function SiteHeader({
  accounts,
  activeAccountId,
  profile,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background/80 px-6 backdrop-blur">
      <div className="flex items-center gap-2">
        <SidebarTrigger>
          <Button
            variant="ghost"
            size="icon"
          >
            <PanelLeft className="size-5" />
          </Button>
        </SidebarTrigger>

        <Separator
          orientation="vertical"
          className="mx-2 h-6"
        />

        <h1 className="text-lg font-semibold">
          Dashboard
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <AccountSwitcher
          accounts={accounts}
          activeAccountId={activeAccountId}
        />

        {profile?.isAdmin && (
          <Link href="/admin">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Button>
          </Link>
        )}

        <ThemeToggle />

        <UserMenu
          name={profile?.name}
          email={profile?.email}
          avatar={profile?.avatar}
        />
      </div>
    </header>
  );
}