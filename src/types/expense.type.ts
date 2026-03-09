import { User } from "./user.types";

interface Expense {
	id: number,
	date: Date,
	amountUsd: number,
	userId: User["id"],
	categoryId: number,
	description?: string,
	rate?: number,
	amountBs?: number,
}

type CreateExpenseDTO = Omit<Expense, "id">;

export type { Expense, CreateExpenseDTO };