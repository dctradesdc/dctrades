import { Link } from "next-view-transitions";
import { ArrowRight, LogOut } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { TypewriterText } from "@/components/layout/typewriter-text";
import { Button } from "@/components/ui/button";
import { signOut } from "@/features/auth/actions";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const primaryHref = user ? "/dashboard" : "/signup";
  const secondaryHref = user ? "/dashboard" : "/login";

  const primaryLabel = user ? "Dashboard" : "Get Started";
  const secondaryLabel = user ? "Journal Your Trades" : "Login";

  return (
    <main className="relative flex h-screen w-screen flex-col justify-between overflow-hidden bg-background selection:bg-primary/10 select-none">
      {/* Premium Cinematic Background Layer */}
      <div className="absolute inset-0 -z-20 bg-linear-to-b from-background via-background to-background" />

      {/* Atmospheric Spatial Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[160px] dark:bg-blue-500/10 dark:blur-[200px]" />
      </div>

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 shrink-0">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-card shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-foreground/20">
            <span className="text-xl font-black tracking-tighter">DC</span>
          </div>
          <span className="text-sm font-black uppercase tracking-[0.25em] transition-colors group-hover:text-muted-foreground">
            DC Trades
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user && (
            <form action={signOut}>
              <Button type="submit" variant="outline" className="gap-2">
                <LogOut className="size-4" />
                Logout
              </Button>
            </form>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center px-6 text-center">
        <h1
          className="max-w-4xl text-5xl italic leading-tight tracking-tight md:text-7xl min-h-[2.5em]"
          style={{ fontFamily: "Caveat, cursive" }}
        >
          Start your <TypewriterText />
          <br />
          with journaling.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
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
              className="w-full min-w-56 rounded-xl text-base font-medium transition-all duration-300"
            >
              {secondaryLabel}
            </Button>
          </Link>
        </div>
      </section>

      {/* Unscrollable Fixed Footer Area */}
      <footer className="w-full py-6 text-center z-50 shrink-0 border-t border-border/40 bg-background/50 backdrop-blur-xs">
        <div className="flex justify-center gap-6 text-xs font-medium text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy & Terms
          </Link>
          <span className="text-border">|</span>
          <Link href="/calculator" className="hover:text-foreground transition-colors">
            Trading Calculator
          </Link>
        </div>
      </footer>
    </main>
  );
}