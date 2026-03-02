import { Model, DataTypes, Sequelize } from "sequelize";
import { USER_TABLE } from "./user.model";
import { CATEGORY_TABLE } from "./category.model";

const EXPENSE_TABLE = 'expenses';

const ExpenseSchema = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	amountBs:{
		field: 'amount_bs',
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	amountUsd:{
		field: 'amount_usd',
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	rate: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: true,
	},
	userId: {
		field: 'user_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: USER_TABLE,
			key: 'id'
		},
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	},
	categoryId: {
		field: 'category_id',
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: CATEGORY_TABLE,
			key: 'id',
		}
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		field: "created_at",
	},
}

class Expense extends Model {
	static associate(models: Sequelize['models']) {
		this.belongsTo(models.User, { as: 'user' });
		this.belongsTo(models.Category, { as: 'category'})
	}

	static config(sequelize: Sequelize) {
		return {
			sequelize,
			tableName: EXPENSE_TABLE,
			modelName: "Expense",
			timestamps: false
		}
	}
}

export { Expense, ExpenseSchema, EXPENSE_TABLE };