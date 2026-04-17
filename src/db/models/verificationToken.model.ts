import { DataTypes, Model, Sequelize } from "sequelize";

const VERIFICATION_TOKEN_TABLE = 'verification_tokens';

const VerificationTokenSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "created_at",
    defaultValue: DataTypes.NOW,
  },
}

class VerificationToken extends Model {
  static associate() {}

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: VERIFICATION_TOKEN_TABLE,
      modelName: "VerificationToken",
      timestamps: false,
    }
  }
}

export { VerificationToken, VerificationTokenSchema, VERIFICATION_TOKEN_TABLE };