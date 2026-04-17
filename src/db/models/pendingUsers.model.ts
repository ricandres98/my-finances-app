import { Model, DataTypes, Sequelize } from "sequelize";

const PENDING_USER_TABLE = "pending_users";

const PendingUserSchema = {
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
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "password_hash",
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
  },
};

class PendingUser extends Model {
  static associate() {
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PENDING_USER_TABLE,
      modelName: "PendingUser",
      timestamps: false
    }
  }
}

export { PENDING_USER_TABLE, PendingUserSchema, PendingUser };