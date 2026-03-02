import { Sequelize } from "sequelize";
import { User, UserSchema } from "./user.model";
import { Category, CategorySchema } from "./category.model";
import { Expense, ExpenseSchema } from "./expense.model";

function setupModels(sequelize: Sequelize) {
	User.init(UserSchema, User.config(sequelize));
	Category.init(CategorySchema, Category.config(sequelize));
	Expense.init(ExpenseSchema, Expense.config(sequelize));

	User.associate(sequelize.models);
	Category.associate(sequelize.models);
	Expense.associate(sequelize.models);
}

export { setupModels };
