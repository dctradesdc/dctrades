import Link from "next/link";
import { redirect } from "next/navigation";
import { Ban, LogOut, Mail } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function SuspendedPage() {
  async function signOut() {
    "use server";

    const supabase = await createClient();

    await supabase.auth.signOut();

    redirect("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <Ban className="h-8 w-8 text-destructive" />
          </div>

          <CardTitle className="text-2xl">
            Account Suspended
          </CardTitle>

          <CardDescription className="max-w-sm">
            Your access to DC Trades has been temporarily suspended by an
            administrator.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
            If you believe this suspension was made in error or would like more
            information, please contact our support team.
          </div>

          <div className="space-y-2 rounded-lg border p-4">
            <div className="flex items-center gap-2 font-medium">
              <Mail className="h-4 w-4" />
              Support
            </div>

            <a
              href="mailto:support@dctrades.in"
              className="text-sm text-primary hover:underline"
            >
              support@dctrades.in
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/privacy-policy"
              className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Privacy Policy
            </Link>

            <form action={signOut} className="flex-1">
              <Button
                type="submit"
                variant="outline"
                className="w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}