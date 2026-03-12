"use server";
import { ExpenseService } from "@/services/expense.service";
import { AuthService } from "@/services/auth.service";
import { revalidatePath } from "next/cache";


const expenseService = new ExpenseService();
const authService = new AuthService();


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