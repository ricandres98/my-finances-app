import { ExpenseService } from "@/services/expense.service";
import { AuthService } from "@/services/auth.service";
import { CategoryService } from "@/services/category.service";
import { DashboardClient } from "@/components/expense/DashboardClient";

const expenseService = new ExpenseService();
const categoryService = new CategoryService();
const authService = new AuthService();

export default async function Dashboard() {
  const { id } = await authService.verifyToken() as { id: number, exp: number };
  const expenseList = await expenseService.findAllRaw(id);
  
  const categoryList = await categoryService.findAll(id);

  return (
    <>
      <DashboardClient expenseList={expenseList} categoryList={categoryList}/>
    </>
  );
}
