"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      // We'll connect this to Supabase next.
      toast.success(
        "If an account exists, you'll receive a password reset email."
      );
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
}