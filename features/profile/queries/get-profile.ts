import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

export const getProfile = cache(
  async () => {
    const supabase =
      await createClient();

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email ?? "",
      name:
        user.user_metadata
          ?.name ?? "",
      avatar:
        user.user_metadata
          ?.avatar_url ?? "",
    };
  }
);