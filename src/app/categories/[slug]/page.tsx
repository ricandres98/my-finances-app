import { ExpensesByCategoryClient } from "@/components/expense/ExpensesByCategoryClient";
import { authService } from "@/services/auth.service";
import { categoryService } from "@/services/category.service";
import { expenseService } from "@/services/expense.service";

export default async function Page(props: PageProps<"/categories/[slug]">) {

  const { slug } = await props.params;
  const { id } = await authService.verifyToken() as { id: number, exp: number };
  
  const expenseList = await expenseService.findAllRaw(id, { where: { "$category.name$": decodeURI(slug) }});
  const categoryList = await categoryService.findAll(id);

  console.log("EXPENSE LIST: ", expenseList);
  return (
    <ExpensesByCategoryClient expenseList={expenseList} categoryList={categoryList} />
  )
}