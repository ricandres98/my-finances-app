import { Category } from "@/types/category";
import { ChangeEventHandler } from "react";

const defaultCategories = [
	"servicios",
	"alimentación",
	"ahorro",
	"reparaciones",
];

type Props = {
	setIsNewCategory: (a: boolean) => void,
	categories: Category[]
}

// Pendiente construir un Combobox con estas categorías, para que el usuario pueda elegir una o escribir una nueva
const CategoryCombobox = ({ setIsNewCategory, categories }: Props) => {

	const categoriesToShow = categories.map((category) => category.name);

	const defaultCategoriesToAdd: string[] = [];
	defaultCategories.forEach((category) => {
		if (!categoriesToShow.includes(category)) defaultCategoriesToAdd.push(category);
	});


	const handleChange: ChangeEventHandler<HTMLSelectElement, HTMLSelectElement> = (e) => {
		const value = e.target.value;

		if (value === "nueva categoría") {
			setIsNewCategory(true);
		} else {
			setIsNewCategory(false);
		}
	}

	return (
			<select id="category" name="category" onChange={handleChange} defaultValue={""} required={true}
				className="px-2 w-full border border-slate-200 rounded-md focus:outline focus:outline-slate-400">
				<option value="" disabled hidden>
					Seleccione una categoría
				</option>
				<option value="nueva categoría" key={"nueva categoría"}>nueva categoría</option>
				{defaultCategoriesToAdd.concat(categoriesToShow).map((category) => (
					<option value={category} key={category}>{category}</option>
				))}
		</select>
	)
}

export { CategoryCombobox };