"use client";

import { useState } from "react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <SidebarProvider>
      <AdminSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}