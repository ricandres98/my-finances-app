import { sequelize } from "@/libs/sequelize";
import { Category, CreateCategoryDTO } from "@/types/category";

class CategoryService {
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
	}

	/**
	 * 
	 * @param name
	 * @param userId
	 * @returns returns a promise that resolves to the category `id` if it exists on the DB or `false` if not.
	 */
	async checkExistence(name: Category["name"], userId: Category["userId"]) {
		const category = await sequelize.models.Category.findOne({ where: { name: name.toLowerCase(), userId }})
		return category ? category.dataValues.id as number : false;
	}

	async findAll(userId: Category["userId"]) {
		return await sequelize.models.Category.findAll({ where: { userId }});
	}

}

export { CategoryService };