"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function updateProfile({
  name,
  avatar,
}: {
  name: string;
  avatar: string;
}) {
  const supabase =
    await createClient();

  const {
    data: { user },
  } =
    await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const { error } =
    await supabase.auth.updateUser({
      data: {
        name,
        avatar_url: avatar,
      },
    });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/settings");

  return {
    success: true,
    message:
      "Profile updated successfully.",
  };
}