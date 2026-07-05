import { getAdminUser } from "@/features/admin/user";

import { UserProfileCard } from "@/components/admin/users/user-profile-card";

export default async function AdminUserPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const user = await getAdminUser(id);

  return (
    <div className="space-y-6 p-6">
      <UserProfileCard user={user} />
    </div>
  );
}