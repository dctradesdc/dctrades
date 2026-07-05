"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Shield,
  Users,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { signOut } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
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
    title: "Admin Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function AdminSidebar({ mobileOpen, setMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/85 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        className={`fixed inset-y-0 left-0 z-50 flex h-full border-r bg-background transition-all duration-300 ease-in-out md:sticky md:z-0 ${
          // Mobile state logic
          mobileOpen ? "translate-x-0 w-70" : "-translate-x-full md:translate-x-0"
        } ${
          // Desktop folding logic
          isCollapsed ? "md:w-17.5" : "md:w-65"
        }`}
      >
        {/* Header containing the Logo */}
        <SidebarHeader className="relative border-b p-4 flex flex-row items-center justify-between min-h-16.25">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <Shield className="h-6 w-6 shrink-0 text-primary transition-transform duration-300" />
            
            {/* Logo details disappear smoothly when folded */}
            <div
              className={`transition-all duration-300 origin-left ${
                isCollapsed ? "md:opacity-0 md:scale-90 md:w-0" : "opacity-100 scale-100"
              }`}
            >
              <h2 className="text-base font-bold tracking-tight">DC Trades</h2>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>

          {/* Desktop Fold Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-4 hidden h-6 w-6 rounded-full border bg-background p-0 shadow-sm hover:bg-accent md:flex z-50"
          >
            {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
        </SidebarHeader>

        {/* Navigation Content */}
        <SidebarContent className="overflow-x-hidden">
          <SidebarGroup>
            <SidebarGroupLabel 
              className={`transition-opacity duration-200 ${isCollapsed ? "md:opacity-0" : "opacity-100"}`}
            >
              {!isCollapsed && "Navigation"}
            </SidebarGroupLabel>
            
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton className="p-0 hover:bg-transparent">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-base transition-colors md:py-2 md:text-sm ${
                          active
                            ? "bg-primary/10 font-medium text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        } ${isCollapsed ? "md:justify-center md:px-0" : ""}`}
                      >
                        <item.icon
                          className="h-5 w-5 shrink-0 md:h-4 md:w-4"
                          strokeWidth={active ? 2.5 : 2}
                        />
                        <span className={`transition-all duration-300 ${isCollapsed ? "md:hidden" : "block"}`}>
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

        {/* Footer Actions */}
        <SidebarFooter className="border-t p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="p-0 hover:bg-transparent">
                <Link
                  href="/dashboard"
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:py-2 md:text-sm ${
                    isCollapsed ? "md:justify-center md:px-0" : ""
                  }`}
                >
                  <ArrowLeft className="h-5 w-5 shrink-0 md:h-4 md:w-4" />
                  <span className={isCollapsed ? "md:hidden" : "block"}>Back to Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <form action={signOut}>
                <SidebarMenuButton
                  type="submit"
                  className={`w-full gap-3 rounded-lg px-3 py-2.5 text-base text-destructive hover:bg-destructive/10 hover:text-destructive md:py-2 md:text-sm ${
                    isCollapsed ? "md:justify-center md:px-0" : "justify-start"
                  }`}
                >
                  <LogOut className="h-5 w-5 shrink-0 md:h-4 md:w-4" />
                  <span className={isCollapsed ? "md:hidden" : "block"}>Logout</span>
                </SidebarMenuButton>
              </form>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}