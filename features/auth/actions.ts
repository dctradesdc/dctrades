"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function signIn(
  email: string,
  password: string
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  redirect("/dashboard");
}

export async function signUp(
  email: string,
  password: string
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
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
    message: "Account created successfully. Please check your email to verify your account.",
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