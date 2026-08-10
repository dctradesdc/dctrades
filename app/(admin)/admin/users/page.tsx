import { getUsers } from "@/features/admin/users";
import { UsersTable } from "@/components/admin/users/users-table";

import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminUsersPage() {
  const users = await getUsers();

  const supabase = createAdminClient();

  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select(
      "user_id, plan, status, started_at, expires_at, provider_payment_id"
    );

  const usersWithSubscriptions = users.map((user) => {
    const subscription = subscriptions?.find(
      (sub) => sub.user_id === user.id
    );

    return {
      ...user,
      subscription: subscription
        ? {
            plan: subscription.plan,
            status: subscription.status,
            startedAt: subscription.started_at,
            expiresAt: subscription.expires_at,
            paymentId: subscription.provider_payment_id,
          }
        : {
            plan: "free",
            status: "active",
            startedAt: null,
            expiresAt: null,
            paymentId: null,
          },
    };
  });

  return (
    <div className="w-full max-w-full space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Users Management
        </h1>

        <p className="text-xs text-muted-foreground sm:text-sm">
          View, search, suspend, and manage registered users and their subscriptions.
        </p>
      </div>

      {/* Main Table Wrapper */}
      <div className="w-full overflow-x-auto">
        <UsersTable users={usersWithSubscriptions} />
      </div>
    </div>
  );
}