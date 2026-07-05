"use client";

import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 p-10 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <TriangleAlert className="h-10 w-10 text-destructive" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Something went wrong
            </h1>

            <p className="mt-2 text-muted-foreground">
              An unexpected error occurred. Please try again.
            </p>
          </div>

          <Button onClick={reset}>
            Try Again
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}