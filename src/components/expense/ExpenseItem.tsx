"use client";
import { ExpenseWithCategory } from "@/types/expense.type"
import { dateToStringUTC } from "@/utils/dateToString";
import { deleteExpense } from "../../actions/expenses/deleteExpense";

type Props = {
	expense: ExpenseWithCategory,
	setEdit: (expense: ExpenseWithCategory) => void;
};


const ExpenseItem = ({ expense, setEdit }: Props) => {
	
	const handleDelete = async () => {
		await deleteExpense(expense.id);
	}

	return (
		<div className="flex justify-between border border-slate-200 p-6 bg-white rounded-xl shadow-sm space-y-4">
			<div>
				<span className="sm:text-lg font-medium text-slate-900">
					{expense.category.name[0].toUpperCase() + expense.category.name.slice(1)}
				</span>
				<div className="flex flex-col sm:flex-row space-x-4">
					{expense.description && <span className="text-xs sm:text-sm text-slate-500">{expense.description}</span>}
					<span className="text-xs sm:text-sm text-slate-500">{dateToStringUTC(expense.date)}</span>
				</div>
			</div>
			<div className="flex flex-col items-end justify-between">
				<div className="flex flex-col items-end">
					<div>
						<span className="text-xl text-slate-500">{expense.amountBs ? "≈" : ""}</span>
						<span className="text-lg sm:text-xl tracking-wider font-semibold text-slate-900"> ${expense.amountUsd}</span>
					</div>
					{expense.amountBs && <span className="text-sm tracking-wider text-slate-500"> Bs {expense.amountBs}</span>}
				</div>
				<div className="flex gap-4">
					<button className="hover:text-blue-500 cursor-pointer" onClick={() => setEdit(expense)}>Editar</button>
					<button className="hover:text-red-500 cursor-pointer" onClick={handleDelete}>Eliminar</button>
				</div>
			</div>
		</div>
	)
}

export { ExpenseItem };