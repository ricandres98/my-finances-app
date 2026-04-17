"use client";
import { InputHTMLAttributes, useState } from "react";

type Props = {
	name: string,
	id: string,
	simbol: string,
	required?: boolean,
	defaultValue?:number,
}

const InputNumber = ({ name, id, required, simbol, defaultValue, ...rest }: Props & InputHTMLAttributes<HTMLInputElement>) => {
	const [value, setValue] = useState(defaultValue ? defaultValue : "");

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const newValue = e.target.value;
		if (/^\d*\.?\d*$/.test(newValue)) {
			setValue(newValue);
		}
	}

	return (
		<div 
			className="flex w-full px-3 py-2 border border-slate-300 rounded-lg 
			focus-within:ring-2 focus-within:ring-blue-500">
			<span className="text-slate-700">{simbol}</span>
			<input {...rest}  type="text" value={value} onChange={handleChange} onSubmit={() => setValue("")} name={name} id={id} required={required} 
				className="focus-visible:outline-none px-2 w-full"
			/>
		</div>
	)
}

export { InputNumber };