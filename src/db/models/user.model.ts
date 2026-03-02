import { Model, DataTypes, Sequelize } from "sequelize";

const USER_TABLE = "users";

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
  },
};

class User extends Model {
    static associate(models: Sequelize['models']) {
      this.hasMany(models.Category, {
        as: 'categories',
        foreignKey: 'userId',
      });
      this.hasMany(models.Expense, {
        as: 'expenses',
        foreignKey: 'userId',
      });
    }

    static config(sequelize: Sequelize) {
        return {
            sequelize, 
            tableName: USER_TABLE,
            modelName: "User",
            timestamps: false
        }
    }
}

export { User, UserSchema, USER_TABLE };