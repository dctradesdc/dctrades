"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PasswordCard() {
  const [isEditing, setIsEditing] =
    useState(false);

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (password.length < 8) {
      toast.error(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      "Password updated successfully."
    );

    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsEditing(false);
  }

  function handleCancel() {
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsEditing(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>

        <CardDescription>
          Keep your account secure by using a
          strong password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!isEditing ? (
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">
                Password
              </p>

              <p className="text-sm text-muted-foreground">
                Change your account password.
              </p>
            </div>

            <Button
              onClick={() =>
                setIsEditing(true)
              }
            >
              <KeyRound className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="password">
                New Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  required
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setShowPassword(
                      (v) => !v
                    )
                  }
                  className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    confirmPassword
                  }
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  required
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setShowConfirmPassword(
                      (v) => !v
                    )
                  }
                  className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
              >
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {loading
                  ? "Updating..."
                  : "Save Password"}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}