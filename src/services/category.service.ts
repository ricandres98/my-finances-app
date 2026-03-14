import { Expense } from "@/db/models/expense.model";
import { sequelize } from "@/libs/sequelize";
import { Category, CategoryWithExpenseCount, CreateCategoryDTO } from "@/types/category";
import { col, fn } from "sequelize";

const categoryService = {
	async create(data: CreateCategoryDTO): Promise<[null, number] | [Error, null]> {
		try {
			const { name, userId } = data;

			const alreadyExists = await this.checkExistence(name, userId);

			if (alreadyExists) {
				throw new Error("La categoría ya está registrada");

			} else {
				const newCategory = await sequelize.models.Category.create({
					...data,
				});
				return [null, newCategory.dataValues.id as number];
			}
		} catch (error) {
			return [error as Error, null];
		}
	},

	/**
	 * 
	 * @param name
	 * @param userId
	 * @returns returns a promise that resolves to the category `id` if it exists on the DB or `false` if not.
	 */
	async checkExistence(name: Category["name"], userId: Category["userId"]) {
		const category = await sequelize.models.Category.findOne({ where: { name: name.toLowerCase(), userId }})
		return category ? category.dataValues.id as number : false;
	},

	async findAll(userId: Category["userId"]): Promise<CategoryWithExpenseCount[] | null> {
		try {
			const categories = await sequelize.models.Category.findAll(
				{ where: { userId },
				include: [{
					model: Expense,
					as: "expenses",
					attributes: [],
					required: false
				}],
				attributes: [
					"id",
					"name",
					[fn("COUNT", col("expenses.id")) , "expenseCount"]
				],
				group: ["Category.id"]
			});
			return categories.map((category) => category.dataValues as CategoryWithExpenseCount);
		} catch (error) {
			console.error(error)
			return null
		}
	},

	async delete(userId: Category["userId"], id: Category["id"]) {
		try {
			const category = await sequelize.models.Category.findOne({where: { userId, id }});
			if(!category) {
				throw new Error("Categoría no encontrada");
			} else {
				await category.destroy({
					force: true,
				});
			}
		} catch (error) {
			console.error(error)
		}
	},

}

export { categoryService };