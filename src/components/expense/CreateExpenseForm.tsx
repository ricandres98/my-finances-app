"use client";

import { useRef, useState } from "react";
import { CategorySelect } from "../CategorySelect";
import { createExpense } from "../../actions/expenses/createExpense";
import { InputNumber } from "../UI/InputNumber";
import { GroupRadioInputs } from "../UI/GroupRadioInputs";
import { InputField } from "../UI/InputField";
import { MainButton } from "../UI/MainButton";
import { Category } from "@/types/category";

type Props = {
	categories: Category[] | null,
}

const CreateExpenseForm = ({ categories }: Props) => {
	const [ currency, setCurrency ] = useState<"bs" | "usd">("bs");
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
				
				await createExpense(formData);
				
				setLoading(false);
				setIsNewCategory(false);
				form.current.reset();
			}
			
		} catch (error) {
			setError((error as Error).message);
			setLoading(false);
			console.error("Error creating expense:", error);
		}
	}

	return (
		<div className="p-4 space-y-4 bg-white rounded-xl shadow-sm border border-slate-200 w-full md:max-w-120">
			<div>
				<span className="mr-4">Seleccione moneda del gasto:</span>
				<GroupRadioInputs name="currency" options={[
					{ value: "bs", setter: () => setCurrency("bs"), defaultChecked: true, },
					{ value: "$", setter: () => setCurrency("usd") }
				]} />
			</div>

			<form className="flex flex-col space-y-4" ref={form} onSubmit={handleSubmit}>
				{currency === "bs" ? (
					<>
						<InputField htmlFor="amountBs" text="Monto: ">
							<InputNumber name="amountBs" id="amountBs" required={true} simbol="Bs"/>
						</InputField>
						<InputField htmlFor="rate" text="Tasa: ">
							<InputNumber name="rate" id="rate" required={true} simbol="Bs/$"/>
						</InputField>
					</>
				) : (
					<InputField htmlFor="amountUsd" text="Monto">
						<InputNumber name="amountUsd" id="amountUsd" required={true} simbol="$"/>
					</InputField>
				)}
				<InputField htmlFor="description" text="Descripción: ">
					<input type="text" id="description" name="description"
						className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"/> 
				</InputField>
				<InputField htmlFor="date" text="Fecha: ">
					<input type="date" id="date" name="date" required 
						className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"/>
				</InputField>
				<InputField htmlFor="category" text="Categoría: ">
					<CategorySelect setIsNewCategory={setIsNewCategory} categories={categories}/>
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
		</div>
	)
}

export { CreateExpenseForm };