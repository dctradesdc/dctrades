import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { AuthCard } from "@/components/auth/auth-card";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export default async function ForgotPasswordPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Forgot Password"
      description="Enter your email and we'll send you a password reset link."
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}