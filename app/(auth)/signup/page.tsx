import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { redirect } from "next/navigation";

import { createMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

import { AuthCard } from "@/components/auth/auth-card";
import { SignupForm } from "@/components/auth/signup-form";
import { SocialLogin } from "@/components/auth/social-login";

export const metadata: Metadata = createMetadata({
  title: "Create Account",
  description:
    "Create your free DC Trades account and start journaling your trades.",
  path: "/signup",
  noIndex: true,
});

export default async function SignupPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Create your account"
      description="Start journaling your trades."
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <SignupForm />
      <SocialLogin />
    </AuthCard>
  );
}