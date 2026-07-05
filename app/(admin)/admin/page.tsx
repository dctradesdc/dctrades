import { getDashboardStats } from "@/features/admin/dashboard";

import { StatsCards } from "@/components/admin/dashboard/stats-cards";

export default async function AdminPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-muted-foreground">
          Manage your DC Trades platform.
        </p>
      </div>

      <StatsCards
        totalUsers={stats.totalUsers}
        activeUsers={stats.activeUsers}
        inactiveUsers={stats.inactiveUsers}
        suspendedUsers={stats.suspendedUsers}
        totalAccounts={stats.totalAccounts}
        totalTrades={stats.totalTrades}
      />
    </div>
  );
}