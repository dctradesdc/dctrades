"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { TypewriterText } from "@/components/layout/typewriter-text";
import { Button } from "@/components/ui/button";

interface HomePageProps {
  user?: User | null;
  signOutAction?: () => Promise<void>;
}

export default function HomePage({ user, signOutAction }: HomePageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const primaryHref = user ? "/dashboard" : "/signup";
  const secondaryHref = user ? "/dashboard" : "/login";

  const primaryLabel = user ? "Dashboard" : "Get Started";
  const secondaryLabel = user ? "Journal Your Trades" : "Login";

  return (
    <main className="relative flex min-h-screen flex-col justify-between overflow-hidden">
      {/* Background Video Layer */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-50 transition-opacity duration-500 dark:opacity-35"
        >
          <source
            src="https://res.cloudinary.com/dniwuwt6j/video/upload/v1786283083/BG_Vedio_prwxiu.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Subtle Overlay Layer */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-background/50 backdrop-blur-[2px] transition-colors duration-300 dark:bg-background/60" />

      {/* Atmospheric Spatial Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[160px] dark:bg-blue-500/15 dark:blur-[200px]" />
      </div>

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50 flex shrink-0 items-center justify-between px-6 py-6 md:px-12">
        <Link
          href="/"
          aria-label="DC Trades home"
          className="group flex items-center gap-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-card/80 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-foreground/20">
            <span className="text-xl font-black tracking-tighter">
              DC
            </span>
          </div>

          <span className="text-sm font-black uppercase tracking-[0.25em] transition-colors group-hover:text-muted-foreground">
            DC Trades
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user && signOutAction && (
            <form action={signOutAction}>
              <Button type="submit" variant="outline" className="gap-2 bg-background/80 backdrop-blur-xs">
                <LogOut className="size-4" />
                Logout
              </Button>
            </form>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center px-6 pt-24 text-center md:pt-0"
      >
        <h1
          id="hero-heading"
          className="min-h-[2.5em] max-w-4xl text-5xl italic leading-tight tracking-tight md:text-7xl"
          style={{ fontFamily: "Caveat, cursive" }}
        >
          Start your <TypewriterText />
          <br />
          trading journal.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg font-medium">
          Build discipline, review every trade, monitor your performance,
          and become a consistently profitable trader.
        </p>

        <div className="mt-10 flex w-full flex-col gap-4 px-4 sm:w-auto sm:flex-row sm:px-0">
          <Link href={primaryHref} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full min-w-56 rounded-xl text-base font-medium shadow-md shadow-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              {primaryLabel}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>

          <Link href={secondaryHref} className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full min-w-56 rounded-xl bg-background/70 text-base font-medium backdrop-blur-xs transition-all duration-300 hover:bg-background/90"
            >
              {secondaryLabel}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="z-50 w-full shrink-0 border-t border-border/40 bg-background/70 py-4 text-center backdrop-blur-md">
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