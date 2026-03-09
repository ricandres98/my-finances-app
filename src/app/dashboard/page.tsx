import { CreateExpenseForm } from "@/components/expense/CreateExpenseForm";
import { ExpenseService } from "@/services/expense.service";
import { AuthService } from "@/services/auth.service";
import { ExpenseItem } from "@/components/expense/ExpenseItem";
import { ExpenseList } from "@/components/expense/ExpenseList";

const expenseService = new ExpenseService();
const authService = new AuthService();

export default async function Dashboard() {
  const { id } = await authService.verifyToken() as { id: number, exp: number };
  const expenseList = await expenseService.findAll(id);

  return (
    <div className="grid md:grid-cols-[14rem_1fr]">
      <aside className="h-dvh bg-amber-300">
        <div>
          <h3>Sidebar</h3>
        </div>
      </aside>
      <main className="inline-block w-full">
        <div>
          <CreateExpenseForm />
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
