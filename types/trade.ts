export interface Trade {
  id: string;

  user_id: string;
  account_id: string;

  pair: string;

  direction: "BUY" | "SELL";

  session:
    | "ASIAN"
    | "LONDON"
    | "NEW_YORK"
    | "OTHER";

  amount: number;

  pnl: number | null;

  result:
    | "PROFIT"
    | "LOSS"
    | "BREAKEVEN";

  reason: string;

  notes: string | null;

  before_image_url: string | null;

  after_image_url: string | null;

  trade_date: string;

  created_at: string;

  updated_at?: string;
}