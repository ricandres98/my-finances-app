'use strict';

const EXPENSE_TABLE = 'expenses';
const USER_TABLE = 'users';
const CATEGORY_TABLE = 'categories';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(USER_TABLE, "created_at", {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: Sequelize.DataTypes.NOW,
    });
    await queryInterface.changeColumn(CATEGORY_TABLE, "created_at", {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: Sequelize.DataTypes.NOW,
    });
    await queryInterface.changeColumn(EXPENSE_TABLE, "created_at", {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: Sequelize.DataTypes.NOW,
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(USER_TABLE, "created_at", {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    });
    await queryInterface.changeColumn(CATEGORY_TABLE, "created_at", {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    });
    await queryInterface.changeColumn(EXPENSE_TABLE, "created_at", {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    });
  }
};
