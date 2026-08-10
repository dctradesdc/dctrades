import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { AdminLayoutClient } from "@/components/admin/admin-layout-client";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/dashboard");
  }

  return (
    <AdminLayoutClient>
      <div className="mx-auto w-full min-w-0 max-w-[120rem] p-4 sm:p-6 lg:p-8 2xl:p-12">
        {children}
      </div>
    </AdminLayoutClient>
  );
}