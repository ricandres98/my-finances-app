"use client";

import { CategoryWithExpenseCount } from "@/types/category.type";
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
import Link from "next/link";
import { GreetingCard } from "../UI/GreetingCard";

type Props = {
  categoryList: CategoryWithExpenseCount[] | null,
  expenseList: ExpenseWithCategory[] | null,
  monthlyExpenses: number | undefined,
  weeklyExpenses: number | undefined,
  username: string,
}

const DashboardClient = ({ categoryList, expenseList, monthlyExpenses, weeklyExpenses, username }: Props) => {
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseWithCategory | null>(null);
  return (
    <>
      <main className="w-full px-4 py-8 overflow-y-auto focus-visible:outline-none [scrollbar-gutter:stable]">
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4 pb-4 ">
          <GreetingCard username={username}/>
          <StatCard title="Este mes" value={monthlyExpenses}/>
          <StatCard title="Esta semana" value={weeklyExpenses}/>
        </section>
        <section className="md:flex md:gap-6 px-4 py-8">
          <div className="sm:min-w-xs mb-10">
            <CardContainer className="w-full md:max-w-120">
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
            {(expenseList && expenseList.length > 0) && (
              <div className="w-full flex justify-center">
                <Link href="/expenses" className="text-slate-500 hover:underline">Ver más</Link>
              </div>
            )}
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