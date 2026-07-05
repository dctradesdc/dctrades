import { getUsers } from "@/features/admin/users";

import { UsersTable } from "@/components/admin/users/users-table";

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Users
        </h1>

        <p className="text-muted-foreground">
          View, search, suspend, and manage registered users.
        </p>
      </div>

      <UsersTable users={users} />
    </div>
  );
}