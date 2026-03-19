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
        <section className="grid grid-cols-3 gap-4 px-4 py-4 ">
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-sm text-slate-500 mb-2">Este mes: </h3>
            <p className="text-2xl font-semibold text-slate-900">${monthlyExpenses}</p>
          </div>
          <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-sm text-slate-500 mb-2">Esta semana: </h3>
            <p className="text-2xl font-semibold text-slate-900">${weeklyExpenses}</p>
          </div>
        </section>
        <section className="md:flex md:gap-6 px-4 py-8">
          <div className="min-w-sm ">
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