import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 p-10 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <SearchX className="h-10 w-10 text-primary" />
          </div>

          <div>
            <h1 className="text-5xl font-bold">
              404
            </h1>

            <h2 className="mt-3 text-2xl font-semibold">
              Page Not Found
            </h2>

            <p className="mt-2 text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/">
              <Button>
                Go Home
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button variant="outline">
                Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}