"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SearchX, ArrowLeft, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/logo";

export default function NotFound() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-6 text-foreground">
      {/* Background Video Layer */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-85 transition-opacity duration-500 dark:opacity-70"
        >
          <source
            src="https://res.cloudinary.com/dniwuwt6j/video/upload/v1786283083/BG_Vedio_prwxiu.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Balanced Transparent Overlay */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-background/35 backdrop-blur-[1px] transition-colors duration-300 dark:bg-background/50" />

      {/* Atmospheric Spatial Glow */}
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 size-160 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[160px] dark:bg-blue-500/15" />
      </div>

      {/* Main Glassmorphic 404 Card */}
      <Card className="relative z-20 w-full max-w-lg border-border/80 bg-card/75 shadow-2xl backdrop-blur-md dark:bg-card/65">
        <CardContent className="flex flex-col items-center gap-6 p-8 text-center sm:p-10">
          <Logo />

          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
            <SearchX className="size-10 text-primary" />
          </div>

          <div>
            <h1 className="font-mono text-6xl font-extrabold tracking-tight">
              404
            </h1>

            <h2 className="mt-2 text-2xl font-bold">
              Page Not Found
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist, has been removed, or moved to another URL.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="w-full sm:w-auto">
              <Button size="lg" className="w-full gap-2 rounded-xl font-medium">
                <ArrowLeft className="size-4" />
                <span>Go Home</span>
              </Button>
            </Link>

            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full gap-2 rounded-xl bg-background/80 font-medium backdrop-blur-xs hover:bg-background"
              >
                <LayoutDashboard className="size-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}