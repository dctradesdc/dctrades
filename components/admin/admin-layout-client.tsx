"use client";

import { useState } from "react";
import { Menu, Shield } from "lucide-react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        {/* Admin Sidebar */}
        <AdminSidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Main Content Area */}
        <SidebarInset className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
          {/* Top Mobile & Desktop Bar */}
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-3">
              {/* Desktop/Tablet Sidebar Toggle */}
              <SidebarTrigger className="hidden md:inline-flex" />

              {/* Mobile Hamburger Trigger */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle admin menu"
              >
                <Menu className="size-5" />
              </Button>

              <div className="flex items-center gap-2">
                <Shield className="size-4 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Admin Control Panel
                </span>
              </div>
            </div>
          </header>

          {/* Main Dashboard Canvas */}
          <main className="flex-1 w-full min-w-0">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}