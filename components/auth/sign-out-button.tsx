"use client";

import { useTransition } from "react";
import { LogOut } from "lucide-react";

import { signOut } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await signOut();
        })
      }
    >
      <LogOut className="mr-2 size-4" />
      {isPending ? "Signing out..." : "Sign Out"}
    </Button>
  );
}