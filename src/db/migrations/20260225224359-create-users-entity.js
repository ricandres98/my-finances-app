'use strict';
const USER_TABLE = "users";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(USER_TABLE, {
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
       password: {
         type: Sequelize.DataTypes.STRING,
         allowNull: false,
       },
       createdAt: {
         type: Sequelize.DataTypes.DATE,
         allowNull: false,
         field: "created_at",
       },
     });
  },

  async down (queryInterface) {

    await queryInterface.dropTable(USER_TABLE);

  }
};
