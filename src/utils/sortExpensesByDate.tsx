import { ExpenseWithCategory } from "@/types/expense.type";
import { dateToStringDateMonth } from "./dateToString";

type ExpenseByDate = {
  date: string,
  list: ExpenseWithCategory[],
};

/*
  type ExpenseWithCategory = {
    id: number,
    date: Date, <--------------------------
    amountUsd: number,
    userId: User["id"],
    categoryId: number,
    description?: string,
    rate?: number,
    amountBs?: number,
    category: {
      id: number,
      name: string,
      userId: User["id"],
      color?: string;
    },
  }

  dateToStringDateMonth(expense.date) 
*/

function sortExpensesByDate(expenseList: ExpenseWithCategory[]): ExpenseByDate[] {
  const result: ExpenseByDate[] = [];

  for (const expense of expenseList) {
    const dateString = dateToStringDateMonth(expense.date);

    const indexInResult = result.findIndex((item) => item.date === dateString);

    const dateExists = indexInResult !== -1;

    if (dateExists) {
      result[indexInResult].list.push(expense);
    } else {
      result.push({
        date: dateString,
        list: [expense],
      });
    }
  }

  return result;
  
}

export { sortExpensesByDate };