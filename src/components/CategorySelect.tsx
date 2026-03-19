import { Category } from "@/types/category";
import { ChangeEventHandler } from "react";

type Props = {
	setIsNewCategory: (a: boolean) => void,
	categories: Category[] | null,
	defaultValue?: string,
}

// Pendiente construir un Combobox con estas categorías, para que el usuario pueda elegir una o escribir una nueva
const CategorySelect = ({ setIsNewCategory, categories, defaultValue }: Props) => {

	const categoriesList = categories ? categories.map((category) => category.name) : [];

	const handleChange: ChangeEventHandler<HTMLSelectElement, HTMLSelectElement> = (e) => {
		const value = e.target.value;

		if (value === "nueva categoría") {
			setIsNewCategory(true);
		} else {
			setIsNewCategory(false);
		}
	}

	return (
			<select id="category" name="category" onChange={handleChange} defaultValue={defaultValue ? defaultValue : ""} required={true}
				className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none">
				<option value="" disabled hidden>
					Seleccione una categoría
				</option>
				<option value="nueva categoría" key={"nueva categoría"}>nueva categoría</option>
				{categoriesList.map((category) => (
					<option value={category} key={category}>{category}</option>
				))}
		</select>
	)
}

export { CategorySelect };