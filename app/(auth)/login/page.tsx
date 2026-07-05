import { Link } from "next-view-transitions";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { SocialLogin } from "@/components/auth/social-login";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Welcome Back"
      description="Sign in to your trading journal."
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <LoginForm />
      <SocialLogin />
    </AuthCard>
  );
}