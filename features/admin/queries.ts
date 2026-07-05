import { createClient } from "@/lib/supabase/server";

export interface AdminUser {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  last_active_at: string | null;
  is_admin: boolean;
  is_suspended: boolean;
  accounts: number;
  trades: number;
  email: string;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const supabase = await createClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      avatar_url,
      created_at,
      last_active_at,
      is_admin,
      is_suspended
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (profiles ?? []).map((profile) => ({
    ...profile,
    email: "",
    accounts: 0,
    trades: 0,
  }));
}