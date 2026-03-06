import { sequelize } from "@/libs/sequelize";
import type { CreateExpenseDTO, Expense } from "@/types/expense.type";
import { Model } from "sequelize";

class ExpenseService {
	async create(data: CreateExpenseDTO): Promise<[null, number] | [Error, null]> {
		try {
			const newExpense = await sequelize.models.Expense.create({
				...data,
			});
			
			return [null, newExpense.dataValues.id as number]

		} catch(error) {
			return [error as Error, null];
		}
	}

	async findAll(userId: Expense["userId"]): Promise<Model<Expense>[] | null> {
		return await sequelize.models.Expense.findAll({ where: { userId }});
	}

	async findByCategory(userId: Expense["userId"], categoryId: Expense["categoryId"]): Promise<Model<Expense>[] | null>{
		return await sequelize.models.Expense.findAll({ where: { userId, categoryId }});
	}

	delete() { }

	update() { }
}

export { ExpenseService };