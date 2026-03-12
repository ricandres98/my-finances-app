import { CreateExpenseForm } from "@/components/expense/CreateExpenseForm";
import { ExpenseService } from "@/services/expense.service";
import { AuthService } from "@/services/auth.service";
import { ExpenseItem } from "@/components/expense/ExpenseItem";
import { ExpenseList } from "@/components/expense/ExpenseList";

import { CategoryService } from "@/services/category.service";
import { EXPENSE_TABLE } from "@/db/models/expense.model";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

const expenseService = new ExpenseService();
const categoryService = new CategoryService();
const authService = new AuthService();

export default async function Dashboard() {
  const { id } = await authService.verifyToken() as { id: number, exp: number };
  const expenseList = await expenseService.findAllRaw(id);
  
  const categoryList = await categoryService.findAll(id);

  return (
    <main className="w-full md:flex md:gap-6 px-4 py-8 overflow-y-auto focus-visible:outline-none">
      <div className="min-w-sm ">
        <CreateExpenseForm categories={categoryList} />
      </div>
      <div className="w-full">
        <ExpenseList>
          {(expenseList && expenseList.length > 0)
            // Organiza desde el más reciente al más antiguo
            ? expenseList.sort((expenseA, expenseB) => expenseB.date.getTime() - expenseA.date.getTime())
              .map((expense) => (
                <ExpenseItem expense={expense} key={`exp-${expense.id}`} />
              ))
            : (<p className="mx-auto text-2xl font-semibold text-slate-600 text-center mt-8">¡Comienza a registrar tus gastos!</p>)
          }
        </ExpenseList>
      </div>
    </main>
  );
}
