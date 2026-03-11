"use client";
import { useState } from "react";

type Props = {
	name: string,
	id: string,
	simbol: string,
	required?: boolean,
}

const InputNumber = ({ name, id, required, simbol }: Props) => {
	const [value, setValue] = useState("");

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const newValue = e.target.value;
		if (/^\d*\.?\d*$/.test(newValue)) {
			setValue(newValue);
		}
	}

	return (
		<div className="flex w-full px-2 border border-slate-200 rounded-md focus-within:outline focus-within:outline-slate-400">
			<span className="text-slate-700">{simbol}</span>
			<input type="text" value={value} onChange={handleChange} onSubmit={() => setValue("")} name={name} id={id} required={required} 
				className="focus-visible:outline-none px-2 w-full"
			/>
		</div>
	)
}

export { InputNumber };