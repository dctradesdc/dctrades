"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Check,
  Clock,
  Copy,
  ShieldCheck,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { Link } from "next-view-transitions";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

interface PaymentPageClientProps {
  payment: {
    payment_id: string | number;
    payment_status: string;
    pay_address: string;
    pay_amount: number;
    pay_currency: string;
    created_at?: string;
    valid_until?: string;
    price_amount?: number;
    price_currency?: string;
  };
}

function formatRemaining(milliseconds: number) {
  if (milliseconds <= 0) return "Expired";

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export function PaymentPageClient({ payment }: PaymentPageClientProps) {
  const [status, setStatus] = useState(payment.payment_status);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Pure state initializer for expiry computation (runs once on mount)
  const [expiryTime] = useState(() => {
    return payment.created_at
      ? new Date(payment.created_at).getTime() + 15 * 60 * 1000
      : Date.now() + 15 * 60 * 1000;
  });

  const [timeLeft, setTimeLeft] = useState(() =>
    formatRemaining(expiryTime - Date.now())
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      const remaining = expiryTime - Date.now();
      setTimeLeft(formatRemaining(remaining));
      if (remaining <= 0) {
        window.clearInterval(timer);
      }
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [expiryTime]);

  const isFinished = status === "finished";
  const isExpired = timeLeft === "Expired";

  const qrValue = useMemo(
    () => payment.pay_address,
    [payment.pay_address]
  );

  // Polling payment status every 10 seconds
  useEffect(() => {
    const interval = window.setInterval(async () => {
      try {
        const response = await fetch(
          `/api/payments/status/${payment.payment_id}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) return;

        const data = await response.json();

        if (data.status) {
          setStatus(data.status);

          if (
            data.status === "finished" &&
            data.subscription?.status === "active"
          ) {
            window.setTimeout(() => {
              window.location.href = "/dashboard";
            }, 2000);
          }
        }
      } catch {
        // Suppress background polling errors silently
      }
    }, 10000);

    return () => {
      window.clearInterval(interval);
    };
  }, [payment.payment_id]);

  async function copyText(value: string, fieldId: string) {
    await navigator.clipboard.writeText(value);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  }

  return (
    <main className="relative min-h-screen bg-background px-3 py-6 text-foreground sm:px-6 md:py-10 lg:px-8">
      {/* Premium DC Trades Atmospheric Glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/6 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[140px] dark:bg-blue-500/15" />
        <div className="absolute right-10 bottom-10 h-64 w-64 rounded-full bg-emerald-500/5 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-5xl space-y-6">
        {/* Navigation & Brand Header */}
        <header className="flex flex-col gap-4 border-b border-border/40 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between sm:justify-start sm:gap-6">
            <Link
              href="/pricing"
              className="group flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Pricing</span>
            </Link>

            <span className="hidden text-border sm:inline">|</span>

            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span className="hidden xs:inline">Encrypted Gateway</span>
            </div>
          </div>

          <div className="flex justify-center sm:justify-end">
            <Logo />
          </div>
        </header>

        {/* Main Payment Container Card */}
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-2xl backdrop-blur-xl">
          {/* Header Banner */}
          <div className="border-b border-border/60 bg-muted/20 p-5 sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    DC Trades Pro Checkout
                  </span>
                </div>
                <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl lg:text-3xl">
                  Complete Your Subscription
                </h1>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  Transfer the exact amount below to activate your trading journal.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold text-primary">
                  <span className="size-2 rounded-full bg-primary" />
                  <span>USDT (TRC20 Network)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Payment Grid */}
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12">
            {/* Left Column: Transaction Details & Status */}
            <div className="space-y-6 lg:col-span-7">
              {/* Amount Box */}
              <div className="rounded-xl border border-border/60 bg-muted/30 p-4 sm:p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Exact Amount to Send
                </p>

                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                      {payment.pay_amount}
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground sm:text-base">
                      USDT
                    </span>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                    onClick={() => copyText(String(payment.pay_amount), "amount")}
                  >
                    {copiedField === "amount" ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    <span>{copiedField === "amount" ? "Copied" : "Copy Amount"}</span>
                  </Button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
                  <span>TRON Network Fee:</span>
                  <span className="font-medium text-foreground">
                    Excluded (Must be covered by sender)
                  </span>
                </div>
              </div>

              {/* 15-Minute Countdown Block */}
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg border border-border/60 bg-background/50">
                    <Clock className="size-4 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold sm:text-sm">
                      Payment Window Expiry
                    </p>
                    <p className="text-[11px] text-muted-foreground sm:text-xs">
                      Send transaction before clock hits 00:00
                    </p>
                  </div>
                </div>

                <span
                  className={`font-mono text-base font-bold tabular-nums sm:text-lg ${
                    isExpired ? "text-destructive" : "text-foreground"
                  }`}
                >
                  {timeLeft}
                </span>
              </div>

              {/* Live Status Indicator */}
              <div className="rounded-xl border border-border/60 bg-muted/10 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Live Network Status
                </p>

                <div className="mt-2.5 flex items-center gap-2.5">
                  {isFinished ? (
                    <div className="flex size-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                      <Check className="size-4" />
                    </div>
                  ) : isExpired ? (
                    <div className="flex size-6 items-center justify-center rounded-full bg-destructive/20 text-destructive">
                      <AlertTriangle className="size-4" />
                    </div>
                  ) : (
                    <div className="flex size-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-500">
                      <Clock className="size-4 animate-pulse" />
                    </div>
                  )}

                  <span className="font-semibold capitalize text-foreground">
                    {isExpired && !isFinished ? "Expired" : status}
                  </span>
                </div>

                {isFinished && (
                  <p className="mt-2 text-xs font-medium text-emerald-400">
                    Payment confirmed! Your DC Trades subscription will activate automatically.
                  </p>
                )}

                {isExpired && !isFinished && (
                  <p className="mt-2 text-xs font-medium text-destructive">
                    This payment session has timed out. Please initiate a new checkout session.
                  </p>
                )}
              </div>

              {/* Payment ID Reference */}
              <div className="space-y-1.5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Payment Reference ID
                </p>

                <div className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/20 p-3">
                  <span className="truncate font-mono text-xs text-muted-foreground">
                    {payment.payment_id}
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => copyText(String(payment.payment_id), "payment_id")}
                  >
                    {copiedField === "payment_id" ? (
                      <Check className="size-4 text-emerald-500" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: QR Code & Deposit Address */}
            <div className="flex flex-col items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-5 sm:p-6 lg:col-span-5">
              <div className="w-full text-center">
                <p className="text-sm font-bold sm:text-base">Scan Wallet QR</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Scan via Binance, Trust Wallet, or Metamask
                </p>
              </div>

              <div className="my-5 rounded-2xl bg-white p-3.5 shadow-xl sm:my-6">
                <QRCodeSVG
                  value={qrValue}
                  size={180}
                  level="M"
                  includeMargin={false}
                />
              </div>

              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Deposit Address</span>
                  <span className="font-semibold text-primary">TRC20 Only</span>
                </div>

                <div className="flex w-full items-center gap-2 rounded-xl border border-border/60 bg-background/90 p-3 shadow-inner">
                  <span className="min-w-0 flex-1 break-all font-mono text-xs text-foreground">
                    {payment.pay_address}
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => copyText(payment.pay_address, "address")}
                  >
                    {copiedField === "address" ? (
                      <Check className="size-4 text-emerald-500" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Guide Steps */}
          <div className="border-t border-border/60 bg-muted/10 p-5 sm:p-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-foreground sm:text-sm">
              Quick Transfer Guide
            </h2>

            <div className="mt-4 grid gap-5 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground sm:text-sm">
                  1. Open Crypto Wallet
                </p>
                <p className="text-xs text-muted-foreground">
                  Select USDT and choose the <strong className="text-foreground">TRC20 (TRON)</strong> network.
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground sm:text-sm">
                  2. Transfer Exact Amount
                </p>
                <p className="text-xs text-muted-foreground">
                  Send <strong className="font-mono text-foreground">{payment.pay_amount} USDT</strong>. Ensure network fees are paid separately.
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-foreground sm:text-sm">
                  3. Instant Unlocking
                </p>
                <p className="text-xs text-muted-foreground">
                  Once verified on the blockchain, your DC Trades access will automatically activate.
                </p>
              </div>
            </div>
          </div>

          {/* Network Warning Banner */}
          <div className="border-t border-border/60 p-5 sm:p-6">
            <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-500">
              <AlertTriangle className="size-5 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <p className="font-bold">Crucial Network Notice</p>
                <p className="mt-0.5 text-muted-foreground">
                  Send strictly <strong className="text-foreground">USDT</strong> via the <strong className="text-foreground">TRC20 (TRON)</strong> network. Sending funds via ERC20, BEP20, or sending any other asset will result in permanent loss.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}