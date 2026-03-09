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

	async findOne(userId: Expense["userId"], id: Expense["id"]) {
		try {
			const expense = await sequelize.models.Expense.findOne({where: {userId, id}});

			if (expense) {
				return expense;
			} else {
				return null;
			}

		} catch (error) {
			console.error("Error fetching expense:", error);
			return null;
		}
	}

	async deleteOne(userId: Expense["userId"], id: Expense["id"]) {
		try {
			const expense = await this.findOne(userId, id);
			
			if(expense) {
				await expense.destroy();
				return true;
			} else {
				throw new Error("Expense not found");
			}
			
		} catch (error) {
			console.error("Error deleting expense:", error);
			return false;
		}
	 }

	update() { }
}

export { ExpenseService };