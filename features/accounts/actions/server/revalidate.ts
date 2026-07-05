import { revalidatePath } from "next/cache";

export function revalidateAccounts() {
  revalidatePath("/accounts");
  revalidatePath("/dashboard");
}