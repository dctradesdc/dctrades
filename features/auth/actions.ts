"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function signIn(
  email: string,
  password: string
) {
  const supabase = await createClient();

  const { error } =
    await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

  if (error) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  redirect("/dashboard");
}

export async function signUp(
  email: string,
  password: string,
  acceptedTerms: boolean
) {
  // Server-side enforcement
  if (!acceptedTerms) {
    return {
      success: false,
      message:
        "You must agree to the Terms of Service and Privacy Policy.",
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return {
      success: false,
      message: "Email and password are required.",
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      message:
        "Password must be at least 8 characters long.",
    };
  }

  const supabase = await createClient();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://www.dctrades.in";

  const { error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,

    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,

      // Records the version accepted at account creation.
      data: {
        terms_accepted: true,
        terms_version: "2026-08-09",
        privacy_policy_version: "2026-08-09",
        legal_accepted_at: new Date().toISOString(),
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message:
      "Account created successfully. Please check your email to verify your account.",
  };
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}