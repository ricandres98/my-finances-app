'use strict';

const PENDING_USER_TABLE = "pending_users";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(PENDING_USER_TABLE, {
      id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        username: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        passwordHash: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          field: "password_hash",
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          field: "created_at",
          defaultValue: Sequelize.DataTypes.NOW,
        },
    });
    
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PENDING_USER_TABLE);
  }
};
