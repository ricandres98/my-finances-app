import { expenseService } from "@/services/expense.service";
import { authService } from "@/services/auth.service";
import { categoryService } from "@/services/category.service";
import { DashboardClient } from "@/components/expense/DashboardClient";
import { userService } from "@/services/user.service";

export default async function Dashboard() {
  const { id } = await authService.verifyToken() as { id: number, exp: number };
  if (id) {
    const expenseList = await expenseService.findAllRaw(id, { limit: 10 });
    const categoryList = await categoryService.findAll(id);
    const user = await userService.findByIdRaw(id);
  
    const now = new Date();
  
    const monthlyExpenses = await expenseService.getTotalOfMonth(id, now.getMonth(), now.getFullYear());
    const weeklyExpenses = await expenseService.getTotalThisWeek(id);
    return (
      <>
        <DashboardClient 
          expenseList={expenseList} 
          categoryList={categoryList} 
          monthlyExpenses={monthlyExpenses}
          weeklyExpenses={weeklyExpenses}
          username={user.username}
          />
      </>
    );
  }
}
