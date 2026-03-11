"use client";

import { useRef, useState } from "react";
import { CategoryCombobox } from "../CategoryCombobox";
import { createExpense } from "./createExpense";
import { InputNumber } from "../UI/InputNumber";
import { GroupRadioInputs } from "../UI/GroupRadioInputs";
import { InputField } from "../UI/InputField";
import { MainButton } from "../UI/MainButton";

type Props = {
	categoriesString: string;
}

const CreateExpenseForm = ({ categoriesString }: Props) => {
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
		<div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200 w-full md:max-w-120">
			<span>Seleccione moneda del gasto:</span>
			<GroupRadioInputs name="currency" options={[
				{ value: "bs", setter: () => setCurrency("bs"), defaultChecked: true, },
				{ value: "usd", setter: () => setCurrency("usd") }
			]} />

			<form className="flex flex-col" ref={form} onSubmit={handleSubmit}>
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
						className="px-2 w-full border border-slate-200 rounded-md focus:outline focus:outline-slate-400"/> 
				</InputField>
				<InputField htmlFor="date" text="Fecha: ">
					<input type="date" id="date" name="date" required 
						className="px-2 w-full border border-slate-200 rounded-md focus:outline focus:outline-slate-400"/>
				</InputField>
				<InputField htmlFor="category" text="Categoría: ">
					<CategoryCombobox setIsNewCategory={setIsNewCategory} categories={JSON.parse(categoriesString)}/>
				</InputField>
				{isNewCategory && (
					<InputField htmlFor="new-category" text="Nombre de la nueva categoría: ">
						<input type="text" id="new-category" name="new-category" required={true}
							className="px-2 w-full border border-slate-200 rounded-md focus:outline focus:outline-slate-400" />
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