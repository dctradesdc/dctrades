import { z } from "zod";

export const tradeSchema = z.object({
  pair: z
    .string()
    .min(3, "Pair is required"),

  direction: z.enum([
    "BUY",
    "SELL",
  ]),

  session: z.enum([
    "ASIAN",
    "LONDON",
    "NEW_YORK",
    "OTHER",
  ]),

  amount: z.coerce.number(),

  result: z.enum([
    "PROFIT",
    "LOSS",
    "BREAKEVEN",
  ]),

  trade_date: z.coerce.date(),

  reason: z
    .string()
    .min(2, "Reason is required"),

  notes: z.string().optional(),

  before_image_url:
    z.string().optional(),

  after_image_url:
    z.string().optional(),
});

export type TradeSchema =
  z.infer<typeof tradeSchema>;

export type TradeFormValues =
  z.input<typeof tradeSchema>;