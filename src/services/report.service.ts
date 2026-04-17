import { Expense } from "@/db/models/expense.model";
import { sequelize } from "@/libs/sequelize";
import { reportTotalByCategory, reportTotalByDate } from "@/types/report.type";
import { User } from "@/types/user.types";
import { col, fn, literal, Op } from "sequelize";

const reportService = {
  /*
  getTotalByCategories: async (userId: User["id"], month: number, year: number): Promise<reportTotalByCategory[]> => {
    const startDate = new Date(year, month - 1, 1); // Mes en JS es 0-indexed
    const endDate = new Date(year, month, 0, 23, 59, 59); // El día 0 del mes siguiente es el último del actual

    return await sequelize.models.Category.findAll({
      where: { userId },
      attributes: [
        "id",
        "name",
        [fn('COALESCE', fn('SUM', col('expenses.amount_usd')), 0), 'total_spent'],
      ],
      include: [{
        model: Expense,
        as: "expenses",
        attributes: [],
        required: false,
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          }
        }
      }],
      group: ['Category.id', 'Category.name'],
      order: [[literal('total_spent'), 'DESC']],
      raw: true,
    }) as unknown as reportTotalByCategory[];
  },
  */
  
  getTotalByCategories: async (
    userId: User["id"], 
    { 
      startDate, 
      endDate, 
    } : { 
      startDate: Date, 
      endDate: Date 
    }
  ): Promise<reportTotalByCategory[]> => {

    return await sequelize.models.Category.findAll({
      where: { userId },
      attributes: [
        "id",
        "name",
        [fn('COALESCE', fn('SUM', col('expenses.amount_usd')), 0), 'total_spent'],
      ],
      include: [{
        model: Expense,
        as: "expenses",
        attributes: [],
        required: false,
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          }
        }
      }],
      group: ['Category.id', 'Category.name'],
      order: [[literal('total_spent'), 'DESC']],
      raw: true,
    }) as unknown as reportTotalByCategory[];
  },

  /*
  getTotalByDates: async (userId: User["id"], month: number, year: number): Promise<reportTotalByDate[]> => {
    const startDate = new Date(year, month - 1, 1); // Mes en JS es 0-indexed
    const endDate = new Date(year, month, 0, 23, 59, 59); // El día 0 del mes siguiente es el último del actual

    return await sequelize.models.Expense.findAll({
      where: { 
        userId,
        date: {
          [Op.between]: [startDate, endDate],
        }
      },
      attributes: [
        "date",
        [fn('COALESCE', fn('SUM', col('Expense.amount_usd')), 0), 'total_spent'],
      ],
      group: ["Expense.date"],
      order: [["date", "ASC"]],
      raw: true,
    }) as unknown as reportTotalByDate[];
  },
  */
  
  getTotalByDates: async (
    userId: User["id"], 
    { 
      startDate, 
      endDate, 
    } : { 
      startDate: Date, 
      endDate: Date 
    }
  ): Promise<reportTotalByDate[]> => {
    // const startDate = new Date(year, month - 1, 1); // Mes en JS es 0-indexed
    // const endDate = new Date(year, month, 0, 23, 59, 59); // El día 0 del mes siguiente es el último del actual

    return await sequelize.models.Expense.findAll({
      where: { 
        userId,
        date: {
          [Op.between]: [startDate, endDate],
        }
      },
      attributes: [
        "date",
        [fn('COALESCE', fn('SUM', col('Expense.amount_usd')), 0), 'total_spent'],
      ],
      group: ["Expense.date"],
      order: [["date", "ASC"]],
      raw: true,
    }) as unknown as reportTotalByDate[];
  },
}

export { reportService };