import { CreateExpenseForm } from "@/components/expense/CreateExpenseForm";
import { ExpenseService } from "@/services/expense.service";
import { AuthService } from "@/services/auth.service";
import { ExpenseItem } from "@/components/expense/ExpenseItem";
import { ExpenseList } from "@/components/expense/ExpenseList";

import { logout } from "../login/logout";
import { CategoryService } from "@/services/category.service";

const expenseService = new ExpenseService();
const categoryService = new CategoryService();
const authService = new AuthService();

export default async function Dashboard() {
  const { id } = await authService.verifyToken() as { id: number, exp: number };
  const expenseList = await expenseService.findAll(id);
  console.log("Expense list: ", expenseList);
  const categoryList = await categoryService.findAll(id);
  const categoryListStringified = JSON.stringify(categoryList);

  return (
    <div className="grid md:grid-cols-[14rem_1fr] md:grid-rows-[5rem_1fr] h-screen">
      <aside className="h-dv border-e-2 md:row-start-1 md:row-end-3">
        <div>
          <h3>Sidebar</h3>
        </div>
      </aside>
      <header>
        <div>
          <h1>Finance APP</h1>
          <h2>Registra tus gastos y controla tu presupuesto</h2>
        </div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <main className="inline-block w-full px-4">
        <div>
          <CreateExpenseForm categoriesString={categoryListStringified} />
        </div>
        <div>
          <ExpenseList>
            {(expenseList && expenseList.length > 0)
              // Organiza desde el más reciente al más antiguo
              ? expenseList.sort((expenseA, expenseB) => expenseB.dataValues.date.getTime() - expenseA.dataValues.date.getTime())
              .map((expense) => (
                <ExpenseItem expense={expense.dataValues} key={`exp-${expense.dataValues.id}`} />
              ))
              : "Comienza a registrar tus gastos"
            }
          </ExpenseList>
        </div>
      </main>
    </div>
  );
}
