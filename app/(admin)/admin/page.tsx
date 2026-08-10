import { getDashboardStats } from "@/features/admin/dashboard";
import { StatsCards } from "@/components/admin/dashboard/stats-cards";

import { createAdminClient } from "@/lib/supabase/admin";

export default async function AdminPage() {
  const stats = await getDashboardStats();

  const supabase = createAdminClient();

  // Subscription statistics
  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("plan, status");

  const activeSubscriptions =
    subscriptions?.filter(
      (subscription) =>
        subscription.status === "active"
    ) ?? [];

  const freeUsers =
    stats.totalUsers -
    activeSubscriptions.length;

  const basicUsers =
    activeSubscriptions.filter(
      (subscription) =>
        subscription.plan === "basic"
    ).length;

  const proUsers =
    activeSubscriptions.filter(
      (subscription) =>
        subscription.plan === "pro"
    ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage and monitor your DC Trades platform.
        </p>
      </div>

      {/* Platform Statistics */}
      <StatsCards
        totalUsers={stats.totalUsers}
        activeUsers={stats.activeUsers}
        inactiveUsers={stats.inactiveUsers}
        suspendedUsers={stats.suspendedUsers}
        totalAccounts={stats.totalAccounts}
        totalTrades={stats.totalTrades}
      />

      {/* Subscription Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Free */}
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Free Users
          </p>

          <p className="mt-2 text-3xl font-bold">
            {Math.max(freeUsers, 0)}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Users without an active paid plan
          </p>
        </div>

        {/* Basic */}
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Basic Subscribers
          </p>

          <p className="mt-2 text-3xl font-bold">
            {basicUsers}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Active Basic subscriptions
          </p>
        </div>

        {/* Pro */}
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">
            Pro Subscribers
          </p>

          <p className="mt-2 text-3xl font-bold">
            {proUsers}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Active Pro subscriptions
          </p>
        </div>
      </div>
    </div>
  );
}