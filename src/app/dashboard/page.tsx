import { expenseService } from "@/services/expense.service";
import { authService } from "@/services/auth.service";
import { categoryService } from "@/services/category.service";
import { DashboardClient } from "@/components/expense/DashboardClient";

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
