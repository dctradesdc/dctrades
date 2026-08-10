"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

import {
  Briefcase,
  Calendar,
  ChartCandlestick,
  LayoutDashboard,
  LineChart,
  Settings,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import type { PlanName } from "@/lib/subscriptions/plans";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analysis",
    url: "/analysis",
    icon: LineChart,
  },
  {
    title: "Accounts",
    url: "/accounts",
    icon: Briefcase,
  },
  {
    title: "Trades",
    url: "/trades",
    icon: ChartCandlestick,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  plan: PlanName;
  accountCount: number;
  accountLimit: number | null;
  tradeCount: number;
  tradeLimit: number | null;
}

export function AppSidebar({
  plan,
  accountCount,
  accountLimit,
  tradeCount,
  tradeLimit,
}: AppSidebarProps) {
  const pathname = usePathname();

  const accountPercentage =
    accountLimit === null
      ? 0
      : Math.min(
          (accountCount / accountLimit) * 100,
          100
        );

  const tradePercentage =
    tradeLimit === null
      ? 0
      : Math.min(
          (tradeCount / tradeLimit) * 100,
          100
        );

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b">
        <div className="flex flex-col px-4 py-3">
          <span className="text-lg font-bold">
            DC Trades
          </span>

          <span className="text-xs text-muted-foreground">
            Trading Journal
          </span>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold tracking-wider text-muted-foreground/70">
            Navigation
          </SidebarGroupLabel>

          <SidebarMenu className="space-y-0.5 px-2">
            {items.map((item) => {
              const isActive =
                pathname === item.url ||
                pathname.startsWith(
                  `${item.url}/`
                );

              return (
                <SidebarMenuItem
                  key={item.title}
                >
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="p-0 hover:bg-transparent"
                  >
                    <Link
                      href={item.url}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-200 ${
                        isActive
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                    >
                      <item.icon
                        className="h-4 w-4 shrink-0"
                        strokeWidth={
                          isActive ? 2.5 : 2
                        }
                      />

                      <span className="text-sm">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Subscription */}
      <div className="px-3 pb-3">
        <div className="rounded-xl border bg-muted/30 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold capitalize">
              {plan} Plan
            </span>

            {plan !== "pro" && (
              <Link
                href="/pricing"
                className="text-[11px] font-medium text-primary hover:underline"
              >
                Upgrade
              </Link>
            )}
          </div>

          {/* Accounts */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Accounts
              </span>

              <span className="font-medium">
                {accountLimit === null
                  ? "Unlimited"
                  : `${accountCount} / ${accountLimit}`}
              </span>
            </div>

            {accountLimit !== null && (
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${accountPercentage}%`,
                  }}
                />
              </div>
            )}
          </div>

          {/* Trades */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Trades
              </span>

              <span className="font-medium">
                {tradeLimit === null
                  ? "Unlimited"
                  : `${tradeCount} / ${tradeLimit}`}
              </span>
            </div>

            {tradeLimit !== null && (
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${tradePercentage}%`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile */}
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Profile"
              className="p-0 hover:bg-transparent"
            >
              <Link
                href="/profile"
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-200 ${
                  pathname === "/profile" ||
                  pathname.startsWith("/profile/")
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <User
                  className="h-4 w-4 shrink-0"
                  strokeWidth={
                    pathname === "/profile" ||
                    pathname.startsWith("/profile/")
                      ? 2.5
                      : 2
                  }
                />

                <span className="text-sm">
                  Profile
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}