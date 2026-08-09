import Link from "next/link";

export function Logo() {
  return (
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
  );
}