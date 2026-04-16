import { categoryService } from "@/services/category.service";
import { authService } from "@/services/auth.service";
import { CategoriesClient } from "@/components/categories/CategoriesClient";

export default async function CategoriesPage() {
  const { id } = await authService.verifyToken() as { id: number, exp: number };

  const categoryList = await categoryService.findAll(id);

  return (
    <CategoriesClient categoryList={categoryList} path="/categories"/>
  )
}