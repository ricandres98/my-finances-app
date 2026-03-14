"use server";
import { expenseService } from "@/services/expense.service";
import { authService } from "@/services/auth.service";
import { revalidatePath } from "next/cache";

async function deleteExpense(expenseId: number) {
  const verificationResponse = await authService.verifyToken();

	if ("error" in verificationResponse) {
		console.error(verificationResponse);
		return verificationResponse;
	} else {
		const { id } = verificationResponse;
		const deletedSuccess = await expenseService.deleteOne(id, expenseId);
		
		revalidatePath("/dashboard");
		return deletedSuccess;
	}
}

export { deleteExpense };