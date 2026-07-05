import { z } from "zod";

const percentage = z.coerce
  .number()
  .min(0, "Cannot be less than 0%.")
  .max(100, "Cannot be greater than 100%.");

export const accountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Account name is required."),

  account_size: z.coerce
    .number()
    .positive("Account size must be greater than 0."),

  current_balance: z.coerce
    .number()
    .min(0, "Balance cannot be negative."),

  daily_drawdown: percentage,

  overall_drawdown: percentage,

  profit_target: percentage,

  losing_percentage: percentage,
});

export type AccountSchema = z.infer<
  typeof accountSchema
>;