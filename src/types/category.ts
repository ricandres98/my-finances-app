import { User } from "./user.types";

interface Category {
	id: number,
	name: string,
	userId: User["id"],
}

type CreateCategoryDTO = Omit<Category, "id">

export type { Category, CreateCategoryDTO };