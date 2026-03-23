"use client";

import { CategoryWithExpenseCount } from "@/types/category";
import { CreateExpenseForm } from "./CreateExpenseForm";
import { ExpenseList } from "./ExpenseList";
import { ExpenseItem } from "./ExpenseItem";
import { ExpenseWithCategory } from "@/types/expense.type";
import { useState } from "react";
import { Modal } from "../UI/Modal";
import { EditExpenseForm } from "./EditExpenseForm";
import { CardContainer } from "../UI/CardContainer";
import { StatCard } from "../UI/StatCard";
import { Header } from "../layout/Header";

type Props = {
  categoryList: CategoryWithExpenseCount[] | null,
  expenseList: ExpenseWithCategory[] | null,
  monthlyExpenses: number | undefined,
  weeklyExpenses: number | undefined,
}

const DashboardClient = ({ categoryList, expenseList, monthlyExpenses, weeklyExpenses }: Props) => {
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseWithCategory | null>(null);
  return (
    <>
      <main className="w-full px-4 py-8 overflow-y-auto focus-visible:outline-none [scrollbar-gutter:stable]">
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 pb-4 ">
          <StatCard title="Este mes" value={monthlyExpenses}/>
          <StatCard title="Esta semana" value={weeklyExpenses}/>
          <StatCard title="Esta semana" value={weeklyExpenses}/>
        </section>
        <section className="md:flex md:gap-6 px-4 py-8">
          <div className="sm:min-w-xs mb-10">
            <CardContainer>
              <CreateExpenseForm categories={categoryList} />
            </CardContainer>
          </div>
          <div className="w-full">
            <ExpenseList>
              {(expenseList && expenseList.length > 0)
                // Organiza desde el más reciente al más antiguo
                ? expenseList.sort((expenseA, expenseB) => expenseB.date.getTime() - expenseA.date.getTime())
                  .map((expense) => (
                    <ExpenseItem expense={expense} setEdit={setExpenseToEdit} key={`exp-${expense.id}`} />
                  ))
                : (<p className="mx-auto text-2xl font-semibold text-slate-600 text-center mt-8">¡Comienza a registrar tus gastos!</p>)
              }
            </ExpenseList>
          </div>
        </section>
      </main>
      {
        expenseToEdit  && (
        <Modal close={() => setExpenseToEdit(null)}>
          <EditExpenseForm categories={categoryList} expense={expenseToEdit} closeModal={() => setExpenseToEdit(null)}/>
        </Modal>
        )
      }
    </>
  )
}

export { DashboardClient };