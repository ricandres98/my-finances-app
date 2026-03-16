"use client";
import { ExpenseWithCategory } from "@/types/expense.type";
import { MainButton } from "../UI/MainButton";
import { ExpenseList } from "./ExpenseList";
import { ExpenseItem } from "./ExpenseItem";
import { useState } from "react";
import { Modal } from "../UI/Modal";
import { Category } from "@/types/category";
import { InputField } from "../UI/InputField";
import { CreateExpenseForm } from "./CreateExpenseForm";
import { EditExpenseForm } from "./EditExpenseForm";

type Props = {
  expenseList: ExpenseWithCategory[] | null,
  categoryList: Category[] | null,
}

const ExpensesClient = ({ expenseList, categoryList }: Props) => {
  const [createNew, setCreateNew] = useState<boolean>(false);
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseWithCategory | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [currencyFilter, setCurrencyFilter] = useState<"bs" | "usd" | null>(null);

  const filterByCategory = (expenses: ExpenseWithCategory[]) => {
    if (!categoryFilter) return expenses;
    return expenses.filter((expense) => expense.category.name === categoryFilter);
  }

  const filterByCurrency = (expenses: ExpenseWithCategory[]) => {
    if (!currencyFilter) return expenses;
    return expenses.filter((expense) => {
      if (currencyFilter === "bs") {
        return expense.amountBs ? true : false;
      } else if (currencyFilter === "usd") {
        return expense.amountBs ? false : true;
      }
    });
  }

  const filteredExpenses = filterByCurrency(filterByCategory(expenseList || []));

  return (
    <>
      <main className="overflow-y-auto [scrollbar-gutter:stable]">
        <div className="p-6">
          <MainButton className="w-full text-lg" onClick={() => setCreateNew(true)} type="button">Nuevo gasto +</MainButton>
        </div>

        {/* Filtro de gastos */}
        <div className="p-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm font-semibold flex gap-8">
            <InputField htmlFor="category-filter" text="Filtrar por categoría: ">
              <select
                name="category-filter"
                id="category-filter"
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
              >
                <option value="">Todas las categorías</option>
                {
                  (categoryList && categoryList.length > 0)
                  && categoryList.map((category) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))
                }
              </select>
            </InputField>
            <InputField htmlFor="currency-filter" text="Filtrar por moneda: ">
              <select
                name="currency-filter"
                id="currency-filter"
                onChange={(e) => setCurrencyFilter(e.target.value as "bs" | "usd" | null)}
                className="px-3 py-2 border border-slate-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
              >
                <option value="">Todas las monedas</option>
                <option key="bs" value="bs">Bs</option>
                <option key="usd" value="usd">$</option>
              </select>
            </InputField>
          </div>
        </div>

        {/* Contenedor de lista de gastos */}
        <div className="p-6 gap-6">
          {/* Card de gasto */}
          <ExpenseList>
            {(filteredExpenses && filteredExpenses.length > 0)
              // Organiza desde el más reciente al más antiguo
              ? filteredExpenses.sort((expenseA, expenseB) => expenseB.date.getTime() - expenseA.date.getTime())
                .map((expense) => (
                  <ExpenseItem expense={expense} setEdit={setExpenseToEdit} key={`exp-${expense.id}`} />
                ))
              : 
              expenseList?.length === 0
                ? (<p className="mx-auto text-2xl font-semibold text-slate-600 text-center mt-8">
                  ¡Comienza a registrar tus gastos!
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

export { ExpensesClient };