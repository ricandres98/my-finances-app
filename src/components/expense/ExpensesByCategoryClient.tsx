"use client";
import { ExpenseWithCategory } from "@/types/expense.type";
import { ExpenseList } from "./ExpenseList";
import { ExpenseItem } from "./ExpenseItem";
import { useState } from "react";
import { Modal } from "../UI/Modal";
import { Category } from "@/types/category.type";
import { CreateExpenseForm } from "./CreateExpenseForm";
import { EditExpenseForm } from "./EditExpenseForm";


type Props = {
  expenseList: ExpenseWithCategory[] | null,
  categoryList: Category[] | null,
}

const ExpensesByCategoryClient = ({ expenseList, categoryList }: Props) => {
  const [createNew, setCreateNew] = useState<boolean>(false);
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseWithCategory | null>(null);

  return (
    <>
      <main className="overflow-y-auto [scrollbar-gutter:stable] pb-8">
        {/* Contenedor de lista de gastos */}
        <div className="p-6 gap-6">
          {/* Card de gasto */}
          <ExpenseList>
            {(expenseList && expenseList.length > 0)
              // Organiza desde el más reciente al más antiguo
              ? expenseList.sort((expenseA, expenseB) => expenseB.date.getTime() - expenseA.date.getTime())
                .map((expense) => (
                  <ExpenseItem expense={expense} setEdit={setExpenseToEdit} key={`exp-${expense.id}`} />
                ))
              : 
              expenseList?.length === 0
                ? (<p className="mx-auto text-2xl font-semibold text-slate-600 text-center mt-8">
                  No hay gastos registrados en esta categoría.
                </p>)
                : (<p className="mx-auto text-2xl font-semibold text-slate-600 text-center mt-8">
                  No se encontraron gastos que coincidan con los filtros seleccionados.
                </p>)
            }
          </ExpenseList>
        </div>
      </main>
      {
        createNew && (
          <Modal close={() => setCreateNew(false)}>
            <CreateExpenseForm categories={categoryList} close={() => setCreateNew(false)}/>
          </Modal>
        )
      }
      {
        expenseToEdit && (
          <Modal close={() => setExpenseToEdit(null)}>
            <EditExpenseForm categories={categoryList} expense={expenseToEdit} closeModal={() => setExpenseToEdit(null)} />
          </Modal>
        )
      }
    </>
  )
}

export { ExpensesByCategoryClient };