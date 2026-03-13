"use server";
import { AuthService } from "@/services/auth.service";
import { CategoryService } from "@/services/category.service";
import { ExpenseService } from "@/services/expense.service";
import { CreateExpenseDTO, EditExpenseDTO } from "@/types/expense.type";
import { revalidatePath } from "next/cache";

const categoryService = new CategoryService();
const authService = new AuthService();
const expenseService = new ExpenseService();

const editExpense = async (expenseId: number, formData: FormData) => {
	const verifyResponse = await authService.verifyToken();
	if ("error" in verifyResponse) {
		throw new Error("Unauthorized: " + verifyResponse.error);
	}
	const { id } = verifyResponse;
	// console.log("CREATE EXPENSE, se verificó el token, usuario: ", id);

	const amountBs = formData.get("amountBs");
	const rate = formData.get("rate");
	const amountUsd = formData.get("amountUsd");
	const description = formData.get("description") as string;
	const date = formData.get("date") as string;
	const category = formData.get("category") as string;
	const newCategory = formData.get("new-category") as string;


	// BORRAR
	console.log("EDIT EXPENSE, se recibieron los datos del formulario: ", {
		amountBs,
		rate,
		amountUsd,
		description,
		date,
		category,
	});

	// Revisar si la categoría ya existe
	const itExists = await categoryService.checkExistence(category, id);
	console.log("EDIT EXPENSE, se verificó si existe la categoría, la respuesta fue ", itExists);
	let categoryId = itExists;
	
	// Si no existe, crearla y almacenar su id en una variable
	if (!itExists) {
		const [error, newId] = await categoryService.create({
			name: (newCategory && newCategory !== "") ? newCategory.toLowerCase() : category.toLowerCase(), 
			userId: id,
		});
		if (newId && !error) {
			categoryId = newId;
		} else {
			throw new Error(error?.message);
		}
	}

  
  
  let actualAmountUsd: number = Number(amountUsd);
  // Verificar si el gasto fue en Bs, si es el caso calcular su equivalente en USD usando la tasa de cambio proporcionada
  if (rate) {
    actualAmountUsd = Number(amountBs) / Number(rate);
    console.log("Gasto en Bs, su equivalente en USD es: ", actualAmountUsd);
  }

	// Crear el gasto usando la categoría correspondiente (ya sea la existente o la nueva)
	const expenseData: EditExpenseDTO = {
		amountUsd: actualAmountUsd,
		date: new Date(date),
		categoryId: categoryId as number,
		amountBs: amountBs ? Number(amountBs) : undefined,
		rate: rate ? Number(rate) : undefined,
		description,
	}

	console.log("EDIT EXPENSE, se va a sobreescribir el gasto con los siguientes datos: ", expenseData);

	const updatedExpense = await expenseService.update(id, expenseId, expenseData);

  if(updatedExpense) {
    console.log("Expense updated with ID:", expenseId);
    revalidatePath("/dashboard");
  }

	return expenseId;
}

export { editExpense };