'use strict';

const EXPENSES_TABLE = "expenses";
const CATEGORIES_TABLE = "categories";
const USERS_TABLE = "users";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(EXPENSES_TABLE, "expenses_category_id_fkey");
    await queryInterface.addConstraint(EXPENSES_TABLE, {
      name: "expenses_category_id_fkey",
      type: "foreign key",
      fields: ["category_id"],
      references: {
        table: CATEGORIES_TABLE,
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(EXPENSES_TABLE, "expenses_category_id_fkey");
    await queryInterface.addConstraint('expenses', {
      fields: ['category_id'],
      type: 'foreign key',
      name: 'expenses_category_id_fkey',
      references: {
        table: 'categories',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    });
  },
};
