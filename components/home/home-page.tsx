"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  LogOut,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { TypewriterText } from "@/components/layout/typewriter-text";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

interface HomePageProps {
  user?: User | null;
  signOutAction?: () => Promise<void>;
}

export default function HomePage({
  user,
  signOutAction,
}: HomePageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Synchronized to 0.3x speed
      videoRef.current.playbackRate = 0.3;
      videoRef.current.play().catch(() => {
        // Handle autoplay policy error gracefully
      });
    }
  }, []);

  const primaryHref = user ? "/dashboard" : "/signup";
  const primaryLabel = user ? "Dashboard" : "Get Started";

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground">
      {/* Background Video Layer - Fixed Position */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-80 transition-opacity duration-500 dark:opacity-65"
        >
          <source
            src="https://res.cloudinary.com/dniwuwt6j/video/upload/v1786283083/BG_Vedio_prwxiu.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Balanced Transparent Overlay for Contrast */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-background/40 backdrop-blur-[1px] transition-colors duration-300 dark:bg-background/55" />

      {/* Atmospheric Glow */}
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[160px] dark:bg-blue-500/15 dark:blur-[200px]" />
      </div>

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <Logo />

        <div className="flex items-center gap-3">
          {/* Dashboard - logged in only */}
          {user && (
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="bg-background/80 backdrop-blur-xs transition-colors hover:bg-background"
              >
                Dashboard
              </Button>
            </Link>
          )}

          {/* Pricing */}
          <Link href="/pricing">
            <Button
              variant="outline"
              className="gap-2 bg-background/80 backdrop-blur-xs transition-colors hover:bg-background"
            >
              <CreditCard className="size-4" />
              <span>Pricing</span>
            </Button>
          </Link>

          <ThemeToggle />

          {/* Logout - logged in only */}
          {user && signOutAction && (
            <form action={signOutAction}>
              <Button
                type="submit"
                variant="outline"
                className="gap-2 bg-background/80 backdrop-blur-xs"
              >
                <LogOut className="size-4" />
                <span>Logout</span>
              </Button>
            </form>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="relative z-20 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pt-24 text-center md:pt-0"
      >
        <h1
          id="hero-heading"
          className="min-h-[2.5em] max-w-4xl text-5xl italic leading-tight tracking-tight md:text-7xl"
          style={{
            fontFamily: "Caveat, cursive",
          }}
        >
          Start your <TypewriterText />
          <br />
          trading journal.
        </h1>

        <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-muted-foreground md:text-lg">
          Build discipline, review every trade, monitor your performance, and
          become a consistently profitable trader.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={primaryHref} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full min-w-56 rounded-xl text-base font-medium shadow-md shadow-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              {primaryLabel}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>

          {!user && (
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full min-w-56 rounded-xl bg-background/70 text-base font-medium backdrop-blur-xs transition-all duration-300 hover:bg-background/90"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-50 w-full shrink-0 border-t border-border/40 bg-background/70 py-4 text-center backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-xs font-medium text-muted-foreground">
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>

          <span className="text-border">|</span>

          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms of Service
          </Link>

          <span className="text-border">|</span>

          <Link
            href="/disclaimer"
            className="transition-colors hover:text-foreground"
          >
            Disclaimer
          </Link>

          <span className="text-border">|</span>

          <Link
            href="/refund-policy"
            className="transition-colors hover:text-foreground"
          >
            Refund Policy
          </Link>

          <span className="text-border">|</span>

          <Link
            href="/cookie-policy"
            className="transition-colors hover:text-foreground"
          >
            Cookie Policy
          </Link>

          <span className="text-border">|</span>

          <a
            href="https://calculator.dctrades.in"
            className="transition-colors hover:text-foreground"
          >
            Trading Calculator
          </a>
        </div>
      </footer>
    </main>
  );
}