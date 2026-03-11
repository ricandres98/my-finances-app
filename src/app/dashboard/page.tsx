import { CreateExpenseForm } from "@/components/expense/CreateExpenseForm";
import { ExpenseService } from "@/services/expense.service";
import { AuthService } from "@/services/auth.service";
import { ExpenseItem } from "@/components/expense/ExpenseItem";
import { ExpenseList } from "@/components/expense/ExpenseList";

import { CategoryService } from "@/services/category.service";
import { EXPENSE_TABLE } from "@/db/models/expense.model";
import { Header } from "@/components/UI/Header";
import { Sidebar } from "@/components/UI/Sidebar";

const expenseService = new ExpenseService();
const categoryService = new CategoryService();
const authService = new AuthService();

export default async function Dashboard() {
  const { id } = await authService.verifyToken() as { id: number, exp: number };
  const expenseList = await expenseService.findAllRaw(id);
  // const parseExpenseList =
  //   expenseList
  //     ? expenseList.map((expense) => ({ ...expense.dataValues, category: expense.dataValues.category?.dataValues}))
  //     : null;
  console.log("Expense list: ", expenseList);
  // console.log("Parsed Expense list: ", parsedExpenseList);
  const categoryList = await categoryService.findAll(id);
  const categoryListStringified = JSON.stringify(categoryList);

  return (
    // md:grid-rows-[minmax(5rem,min-content)_1fr]
    <div className="h-dvh grid md:grid-cols-[14rem_1fr] overflow-hidden">
      <Sidebar />
      <Header />
      <main className="w-full md:flex md:gap-6 px-4 pt-8 overflow-y-auto">
        <div className="min-w-sm ">
          <CreateExpenseForm categoriesString={categoryListStringified} />
        </div>
        <div className="w-full">
          <ExpenseList>
            {(expenseList && expenseList.length > 0)
              // Organiza desde el más reciente al más antiguo
              ? expenseList.sort((expenseA, expenseB) => expenseB.date.getTime() - expenseA.date.getTime())
              .map((expense) => (
                <ExpenseItem expense={expense} key={`exp-${expense.id}`} />
              ))
              : "Comienza a registrar tus gastos"
            }
          </ExpenseList>
        </div>
      </main>
    </div>
  );
}
