"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/omponents/providers/theme-provider";

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({
  children,
}: AppProviderProps) {
  return (
    <ThemeProvider>
      {children}
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}