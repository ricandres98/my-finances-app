'use strict';

const VERIFICATION_TOKEN_TABLE = 'verification_tokens';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(VERIFICATION_TOKEN_TABLE, {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      expires: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
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
    await queryInterface.dropTable(VERIFICATION_TOKEN_TABLE);
  }
};
