"use client";

import { useRef, useState } from "react";
import { CategoryCombobox } from "../CategoryCombobox";
import { createExpense } from "./createExpense";
import { InputNumber } from "../UI/InputNumber";

const CreateExpenseForm = () => {
	const [ currency, setCurrency ] = useState<"bs" | "usd">("bs");
	const [ error, setError ] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const form = useRef<HTMLFormElement>(null);
	
	const handleSubmit: React.SubmitEventHandler = async (e) => {
		try {
			e.preventDefault();
			setLoading(true);
			const formData = new FormData(form.current!);
			console.log(Object.fromEntries(formData.entries()));
			
			await createExpense(formData);
			
			setLoading(false);
			form.current?.reset();
		} catch (error) {
			setError((error as Error).message);
			console.error("Error creating expense:", error);
		}
	}

	return (
		<div>
			<span>Seleccione moneda del gasto:</span>
			<div>
				<label htmlFor="bs">
					<input type="radio" name="currency" id="bs" defaultChecked
						onChange={() => setCurrency("bs")}/>
					<span>Bs</span>
				</label>
				<label htmlFor="usd">
					<input type="radio" name="currency" id="usd" 
					onChange={() => setCurrency("usd")}/>
					<span>USD</span>
				</label>
			</div>

			<form className="flex flex-col" ref={form} onSubmit={handleSubmit}>
				{currency === "bs" ? (
					<>
						<label htmlFor="amountBs">
							<span>Monto:</span>
							<InputNumber name="amountBs" id="amountBs" required={true} simbol="Bs"/>
							{/* <input type="text" inputMode="decimal" id="amountBs" name="amountBs" required={true}/> */}
						</label>
						<label htmlFor="rate">
							<span>Tasa:</span>
							<InputNumber name="rate" id="rate" required={true} simbol="Bs/$"/>
							{/* <input type="number" id="rate" name="rate" required/> */}
						</label>
					</>
				) : (
					<label htmlFor="amountUsd">
						<span>Monto:</span>
						<InputNumber name="amountUsd" id="amountUsd" required={true} simbol="$"/>
						{/* <input type="number" id="amountUsd" name="amountUsd" required/> */}
					</label>
				)}
				<label htmlFor="description">
					<span>Descripción:</span>
					<input type="text" id="description" name="description"/> 
				</label>
				<label htmlFor="date">
					<span>Fecha:</span>
					<input type="date" id="date" name="date" required />
				</label>
				<CategoryCombobox />
				<button>{loading ? "Guardando..." : "Guardar"}</button>
			</form>
			{error && <p className="text-red-800">{error}</p>}
		</div>
	)
}

export { CreateExpenseForm };