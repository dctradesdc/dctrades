export interface Account {
  id: string;
  user_id: string;

  name: string;

  account_size: number;
  current_balance: number;

  daily_drawdown: number;
  overall_drawdown: number;

  profit_target: number;
  losing_percentage: number;

  archived: boolean;
  is_active: boolean;

  created_at: string;
  updated_at: string;
}