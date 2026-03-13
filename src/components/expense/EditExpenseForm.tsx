"use client";

import { useRef, useState } from "react";
import { InputField } from "../UI/InputField";
import { InputNumber } from "../UI/InputNumber";
import { CategorySelect } from "../CategorySelect";
import { MainButton } from "../UI/MainButton";
import type { Category } from "@/types/category";
import { ExpenseWithCategory } from "@/types/expense.type";
import { dateToStringFormat } from "@/utils/dateToString";
import { editExpense } from "@/actions/expenses/editExpense";

type Props = {
	categories: Category[],
  expense: ExpenseWithCategory,
  closeModal: () => void,
}

const EditExpenseForm = ({ categories, expense, closeModal }: Props) => {
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState(false);

  const [ isNewCategory, setIsNewCategory ] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit: React.SubmitEventHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(null)
      if (form.current) {
        const formData = new FormData(form.current!);

        await editExpense(expense.id, formData);

        setLoading(false);
        setIsNewCategory(false);
        form.current.reset();
        closeModal();
      }

    } catch (error) {
      setError((error as Error).message);
      setLoading(false);
      console.error("Error creating expense:", error);
    }
  }

  return (
    <>
			<form className="flex flex-col space-y-4 w-sm" ref={form} onSubmit={handleSubmit}>
				{expense.rate ? (
					<>
						<InputField htmlFor="amountBs" text="Monto: ">
							<InputNumber name="amountBs" id="amountBs" required={true} simbol="Bs" defaultValue={expense.amountBs}/>
						</InputField>
						<InputField htmlFor="rate" text="Tasa: ">
							<InputNumber name="rate" id="rate" required={true} simbol="Bs/$" defaultValue={expense.rate}/>
						</InputField>
					</>
				) : (
					<InputField htmlFor="amountUsd" text="Monto">
						<InputNumber name="amountUsd" id="amountUsd" required={true} simbol="$" defaultValue={expense.amountUsd}/>
					</InputField>
				)}
				<InputField htmlFor="description" text="Descripción: ">
					<input type="text" id="description" name="description" defaultValue={expense.description}
						className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"/> 
				</InputField>
				<InputField htmlFor="date" text="Fecha: ">
					<input type="date" id="date" name="date" required defaultValue={dateToStringFormat(expense.date)}
						className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"/>
				</InputField>
				<InputField htmlFor="category" text="Categoría: ">
					<CategorySelect setIsNewCategory={setIsNewCategory} categories={categories} defaultValue={expense.category.name}/>
				</InputField>
				{isNewCategory && (
					<InputField htmlFor="new-category" text="Nombre de la nueva categoría: ">
						<input type="text" id="new-category" name="new-category" required={true}
							className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none" />
					</InputField>
				)}
				{loading ? (
					<span className="text-slate-600 mx-auto p-4">Guardando...</span>
				) : (
					<MainButton>Guardar</MainButton>
				)}
			</form>
			{error && <p className="text-red-800">{error}</p>}
		</>
  )
}

export { EditExpenseForm };