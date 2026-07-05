export interface AdminUser {
  id: string;

  full_name: string | null;

  email: string;

  avatar_url: string | null;

  is_admin: boolean;

  is_suspended: boolean;

  last_active_at: string | null;

  created_at: string;

  accounts: number;

  trades: number;
}