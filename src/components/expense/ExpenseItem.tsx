"use client";
import { Expense } from "@/types/expense.type"
import { dateToStringUTC } from "@/utils/dateToString";
import { deleteExpense } from "./deleteExpense";

type Props = {
	expense: Expense,
};


const ExpenseItem = ({expense}: Props) => {
	
	const handleDelete = async () => {
		await deleteExpense(expense.id);
	}

	return (
		<div className="border border-amber-600">
			<span>{expense.description}</span>
			<span>Bs {expense.amountBs}</span>
			<span>$ {expense.amountUsd}</span>
			<span>Category: {expense.categoryId}</span>
			<span>Fecha: {dateToStringUTC(expense.date)}</span>
			<div>
				<button onClick={handleDelete}>Eliminar</button>
			</div>
		</div>
	)
}

export { ExpenseItem };