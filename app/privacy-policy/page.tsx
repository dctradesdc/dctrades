"use client";

import Link from "next/link";
import { FileText, Shield, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-background p-4 overflow-hidden select-none">
      <Card className="relative w-full max-w-2xl shadow-xl border bg-card text-card-foreground flex flex-col max-h-[90vh]">
        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <CardHeader className="text-center pb-2 shrink-0">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Privacy Policy & Terms
          </CardTitle>
          <p className="text-xs text-muted-foreground">Effective: July 2026</p>
        </CardHeader>

        {/* Compressed Summary Content - Scrollable inside a fixed card layout */}
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground overflow-y-auto pr-2 flex-1 scrollbar-thin">
          <section>
            <h2 className="font-semibold text-foreground mb-0.5">About DC Trades</h2>
            <p>A free trading journal tool to review metrics. We do not provide financial advice or execute trades.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-0.5">Your Data</h2>
            <p>Your data belongs to you. We keep it secure and do not sell or share it with third parties.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-0.5">Rules & Premium Systems</h2>
            <p>Exploits, malware, or abuse result in suspension. While currently free, premium analytics may be added later.</p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-0.5">Disclaimer</h2>
            <p>Trading carries financial risk. You are entirely responsible for your decisions; provided strictly &quot;as is&quot;.</p>
          </section>

          <div className="rounded-lg border bg-muted/30 p-3 shrink-0">
            <div className="flex items-center gap-2 font-medium text-foreground text-xs">
              <Shield className="h-4 w-4 text-primary" />
              Need Support?
            </div>
            <p className="mt-1 text-xs">
              Questions or suspension appeals? Reach us at{" "}
              <a href="mailto:support@dctrades.in" className="font-medium text-primary hover:underline">
                support@dctrades.in
              </a>.
            </p>
          </div>

          <div className="flex justify-center pt-2 shrink-0">
            <Link href="/login" className="text-xs font-medium text-primary hover:underline">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}