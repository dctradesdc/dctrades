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

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r bg-background">
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-50">
            DC Trades
          </h2>
          <p className="text-xs font-medium text-muted-foreground">
            Trading Journal
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold tracking-wider text-muted-foreground/70">
            Navigation
          </SidebarGroupLabel>

          <SidebarMenu className="space-y-0.5 px-2">
            {items.map((item) => {
              const isActive =
                pathname === item.url ||
                pathname.startsWith(`${item.url}/`);

              return (
                <SidebarMenuItem key={item.title}>
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
                        strokeWidth={isActive ? 2.5 : 2}
                      />

                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

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

                <span className="text-sm">Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}