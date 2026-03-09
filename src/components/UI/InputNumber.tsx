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
		<div>
			<span>{simbol}</span>
			<input type="text" value={value} onChange={handleChange} name={name} id={id} required={required} />
		</div>
	)
}

export { InputNumber };