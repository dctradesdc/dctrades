"use client";

import { Link } from "next-view-transitions";
import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  loginSchema,
  type LoginSchema,
} from "@/features/auth/validation";
import { signIn } from "@/features/auth/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchema) {
    startTransition(async () => {
      const result = await signIn(values.email, values.password);

      if (!result?.success) {
        toast.error(result?.message ?? "Unable to sign in");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Email Input Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
          Email Address
        </Label>

        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isPending}
          className="rounded-xl border-border/80 bg-background/50 focus-visible:ring-primary/20"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-xs font-medium text-destructive mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Input Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
            Password
          </Label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground underline underline-offset-2"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isPending}
            className="rounded-xl border-border/80 bg-background/50 pr-10 focus-visible:ring-primary/20"
            {...register("password")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:bg-transparent hover:text-foreground"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </Button>
        </div>

        {errors.password && (
          <p className="text-xs font-medium text-destructive mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Primary Action Button */}
      <Button
        type="submit"
        className="w-full rounded-xl font-medium transition-all duration-300 shadow-sm shadow-primary/5 hover:shadow-md"
        disabled={isPending}
      >
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}