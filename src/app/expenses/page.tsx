import { ExpensesClient } from "@/components/expense/ExpensesClient";
import { authService } from "@/services/auth.service";
import { categoryService } from "@/services/category.service";
import { expenseService } from "@/services/expense.service";

export default async function ExpensesPage() {
  const { id } = await authService.verifyToken() as { id: number, exp: number };
  const expenseList = await expenseService.findAllRaw(id);
  const categoryList = await categoryService.findAll(id);
  return (
    <ExpensesClient expenseList={expenseList} categoryList={categoryList} />
  )
}