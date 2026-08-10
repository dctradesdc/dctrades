"use server";

import { revalidatePath } from "next/cache";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type PaidPlan = "basic" | "pro";

async function verifyAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized.");
  }

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

  if (profileError || !profile?.is_admin) {
    throw new Error("Admin access required.");
  }

  return user;
}

export async function updateUserSubscription({
  userId,
  plan,
  startedAt,
  expiresAt,
}: {
  userId: string;
  plan: PaidPlan;
  startedAt: string;
  expiresAt: string;
}) {
  await verifyAdmin();

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const start = new Date(startedAt);
  const expiry = new Date(expiresAt);

  if (Number.isNaN(start.getTime())) {
    throw new Error("Invalid start date.");
  }

  if (Number.isNaN(expiry.getTime())) {
    throw new Error("Invalid expiry date.");
  }

  if (expiry <= start) {
    throw new Error(
      "Expiry date must be after the start date."
    );
  }

  const supabase = createAdminClient();

  // Cancel any currently active subscriptions.
  const { error: cancelError } = await supabase
    .from("subscriptions")
    .update({
      status: "cancelled",
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("status", "active");

  if (cancelError) {
    console.error(
      "Cancel existing subscription error:",
      cancelError
    );

    throw new Error(
      "Unable to update existing subscription."
    );
  }

  // Create the manually assigned subscription.
  const { error } = await supabase
    .from("subscriptions")
    .insert({
      user_id: userId,
      plan,
      status: "active",
      provider: "admin",
      provider_payment_id: null,
      started_at: start.toISOString(),
      expires_at: expiry.toISOString(),
    });

  if (error) {
    console.error(
      "Create admin subscription error:",
      error
    );

    throw new Error(
      "Unable to assign subscription."
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/users");
  revalidatePath("/dashboard");
}

export async function cancelUserSubscription(
  userId: string
) {
  await verifyAdmin();

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const supabase = createAdminClient();

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: "cancelled",
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .eq("status", "active");

  if (error) {
    console.error(
      "Cancel subscription error:",
      error
    );

    throw new Error(
      "Unable to cancel subscription."
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/users");
  revalidatePath("/dashboard");
}