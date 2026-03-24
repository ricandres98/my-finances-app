import { User } from "./user.types";

interface Category {
	id: number,
	name: string,
	userId: User["id"],
}

type CreateCategoryDTO = Omit<Category, "id">

interface CategoryWithExpenseCount extends Category {
	expenseCount: number;
}

export type { Category, CreateCategoryDTO, CategoryWithExpenseCount };