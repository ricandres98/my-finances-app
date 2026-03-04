'use strict';

const EXPENSE_TABLE = 'expenses';
const USER_TABLE = 'users';
const CATEGORY_TABLE = 'categories';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(EXPENSE_TABLE, { 
      id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        description: {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        date: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        amountBs:{
          field: 'amount_bs',
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        amountUsd:{
          field: 'amount_usd',
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        rate: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        userId: {
          field: 'user_id',
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: USER_TABLE,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        categoryId: {
          field: 'category_id',
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: CATEGORY_TABLE,
            key: 'id',
          }
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
          field: "created_at",
        },
     });
    
  },

  async down (queryInterface) {
    await queryInterface.dropTable(EXPENSE_TABLE);
  }
};
