const defaultCategories = [
	"servicios",
	"alimentación",
	"ahorro",
	"reparaciones",
];

// Pendiente construir un Combobox con estas categorías, para que el usuario pueda elegir una o escribir una nueva
const CategoryCombobox = () => {
	return (
		<div>
			<label htmlFor="category">Categoría:</label>
			<select id="category" name="category">
				{defaultCategories.map((category) => (
					<option value={category} key={category}>{category}</option>
				))}
			</select>
		</div>
	)
}

export { CategoryCombobox };