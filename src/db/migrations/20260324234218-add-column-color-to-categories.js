'use strict';

const CATEGORY_TABLE = 'categories';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(CATEGORY_TABLE, "color", {    
		  type: Sequelize.DataTypes.STRING,
		  allowNull: true,
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(CATEGORY_TABLE, "color");
  }
};
