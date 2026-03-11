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
		<div className="mb-4">
			<label htmlFor="category">Categoría:</label>
			<select id="category" name="category" onChange={handleChange} defaultValue={""}>
				<option value="" disabled hidden>
					Seleccione una categoría
				</option>
				<option value="nueva categoría" key={"nueva categoría"}>nueva categoría</option>
				{/* {categoriesToShow.concat(defaultCategoriesToAdd).map((category) => ( */}
				{defaultCategoriesToAdd.concat(categoriesToShow).map((category) => (
					<option value={category} key={category}>{category}</option>
				))}
			</select>
		</div>
	)
}

export { CategoryCombobox };