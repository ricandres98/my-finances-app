import { Model, DataTypes, Sequelize } from "sequelize";
import { USER_TABLE } from "./user.model";

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
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
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		field: "created_at",
		defaultValue: DataTypes.NOW,
	},
}

class Category extends Model {
	static associate(models: Sequelize['models']) { 
		this.belongsTo(models.User, { as: 'user'});
		this.hasMany(models.Expense, {
			as: 'expenses',
			foreignKey: 'categoryId',
			onDelete: "CASCADE",
			onUpdate: "CASCADE"
		});
	}

	static config(sequelize: Sequelize) {
		return {
			sequelize,
			tableName: CATEGORY_TABLE,
			modelName: "Category",
			timestamps: false,
		}
	}
}

export { Category, CategorySchema, CATEGORY_TABLE };