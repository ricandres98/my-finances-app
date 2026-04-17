import { User } from "./user.types";

interface Category {
	id: number,
	name: string,
	userId: User["id"],
	color?: string;
}

type CreateCategoryDTO = Omit<Category, "id">;

type EditCategoryDTO = Omit<Category, "userId">;

interface CategoryWithExpenseCount extends Category {
	expenseCount: number;
}

export type { Category, CreateCategoryDTO, CategoryWithExpenseCount, EditCategoryDTO };