"use client";

import { Category } from "@/types/category";
import { CreateExpenseForm } from "./CreateExpenseForm";
import { ExpenseList } from "./ExpenseList";
import { ExpenseItem } from "./ExpenseItem";
import { ExpenseWithCategory } from "@/types/expense.type";
import { useState } from "react";
import { Modal } from "../UI/Modal";
import { EditExpenseForm } from "./EditExpenseForm";

type Props = {
  categoryList: Category[],
  expenseList: ExpenseWithCategory[] | null,
}

const DashboardClient = ({ categoryList, expenseList }: Props) => {
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseWithCategory | null>(null);
  return (
    <>
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
                  <ExpenseItem expense={expense} setEdit={setExpenseToEdit} key={`exp-${expense.id}`} />
                ))
              : (<p className="mx-auto text-2xl font-semibold text-slate-600 text-center mt-8">¡Comienza a registrar tus gastos!</p>)
            }
          </ExpenseList>
        </div>
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