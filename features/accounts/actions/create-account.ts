"use server";

import {
  accountSchema,
  type AccountSchema,
} from "../validation";

import {
  getCurrentUser,
  revalidateAccounts,
} from "./helpers";

import { getUserSubscription } from "@/lib/subscriptions/get-user-plan";
import { canCreateAccount } from "@/lib/subscriptions/limits";

export async function createAccount(
  values: AccountSchema
) {
  const { supabase, user } =
    await getCurrentUser();

  if (!user) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const parsed = accountSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid account data.",
    };
  }

  // Get the user's current plan.
  const subscription =
    await getUserSubscription();

  // Count existing accounts.
  const { count, error: countError } =
    await supabase
      .from("accounts")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id)
      .eq("archived", false);

  if (countError) {
    console.error(
      "Account count error:",
      countError
    );

    return {
      success: false,
      message:
        "Unable to verify your account limit.",
    };
  }

  const currentAccounts = count ?? 0;

  // Enforce the plan limit.
  if (
    !canCreateAccount(
      subscription.plan,
      currentAccounts
    )
  ) {
    if (subscription.plan === "free") {
      return {
        success: false,
        message:
          "The Free plan allows 1 trading journal account. Upgrade to Basic for up to 2 accounts.",
      };
    }

    if (subscription.plan === "basic") {
      return {
        success: false,
        message:
          "The Basic plan allows up to 2 trading journal accounts. Upgrade to Pro for unlimited accounts.",
      };
    }

    return {
      success: false,
      message:
        "You have reached your trading journal account limit.",
    };
  }

  const { error } = await supabase
    .from("accounts")
    .insert({
      user_id: user.id,

      name: parsed.data.name,

      account_size:
        parsed.data.account_size,

      current_balance:
        parsed.data.account_size,

      daily_drawdown:
        parsed.data.daily_drawdown,

      overall_drawdown:
        parsed.data.overall_drawdown,

      profit_target:
        parsed.data.profit_target,

      losing_percentage:
        parsed.data.losing_percentage,

      archived: false,
    });

  if (error) {
    console.error(
      "Create account error:",
      error
    );

    return {
      success: false,
      message:
        "Unable to create your trading account.",
    };
  }

  revalidateAccounts();

  return {
    success: true,
    message:
      "Account created successfully.",
  };
}