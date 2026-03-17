"use client";
import { ExpenseWithCategory } from "@/types/expense.type";
import { MainButton } from "../UI/MainButton";
import { ExpenseList } from "./ExpenseList";
import { ExpenseItem } from "./ExpenseItem";
import { useState } from "react";
import { Modal } from "../UI/Modal";
import { Category } from "@/types/category";
import { CreateExpenseForm } from "./CreateExpenseForm";
import { EditExpenseForm } from "./EditExpenseForm";
import { FilterExpensesPanel } from "./FilterExpensesPanel";

type Props = {
  expenseList: ExpenseWithCategory[] | null,
  categoryList: Category[] | null,
}

const ExpensesClient = ({ expenseList, categoryList }: Props) => {
  const [createNew, setCreateNew] = useState<boolean>(false);
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseWithCategory | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [currencyFilter, setCurrencyFilter] = useState<"bs" | "usd" | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

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

  const filterByDate = (expenses: ExpenseWithCategory[]) => {
    if (!dateFilter) return expenses;
    return expenses.filter((expense) => {
      const date = new Date(expense.date);
      const monthYearString = `${date.getUTCMonth() + 1}-${date.getUTCFullYear()}`;
      console.log("TEST STRING: ", monthYearString);
      console.log("DATE FILTER: ", dateFilter);

      return monthYearString === dateFilter;
    })
  }

  const filteredExpenses = filterByDate(filterByCurrency(filterByCategory(expenseList || [])));

  return (
    <>
      <main className="overflow-y-auto [scrollbar-gutter:stable]">
        <div className="p-6">
          <MainButton className="w-full text-lg" onClick={() => setCreateNew(true)} type="button">Nuevo gasto +</MainButton>
        </div>

        <FilterExpensesPanel 
          expenseList={expenseList} 
          categoryList={categoryList} 
          setCategoryFilter={setCategoryFilter} 
          setCurrencyFilter={setCurrencyFilter} 
          setDateFilter={setDateFilter}
        />
        
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