"use server";
import { AuthService } from "@/services/auth.service";
import { CategoryService } from "@/services/category.service";
import { ExpenseService } from "@/services/expense.service";
import { CreateExpenseDTO } from "@/types/expense.type";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const categoryService = new CategoryService();
const authService = new AuthService();
const expenseService = new ExpenseService();

const createExpense = async (formData: FormData) => {
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


	// BORRAR
	console.log("CREATE EXPENSE, se recibieron los datos del formulario: ", {
		amountBs,
		rate,
		amountUsd,
		description,
		date,
		category,
	});


	// Revisar si la categoría ya existe
	const itExists = await categoryService.checkExistence(category, id);
	console.log("CREATE EXPENSE, se verificó si existe la categoría, la respuesta fue ", itExists);


	// Si no existe, crearla y almacenar su id en una variable
	let categoryId = itExists;
	if (!itExists) {
		const [error, newId] = await categoryService.create({ name: category, userId: id });
		if (newId && !error) {
			categoryId = newId;
		}
	}

	// Verificar si el gasto fue en Bs, si es el caso calcular su equivalente en USD usando la tasa de cambio proporcionada
	let actualAmountUsd: number = Number(amountUsd);
	console.log({ amountUsd, actualAmountUsd });
	if (amountBs) {
		actualAmountUsd = Number(amountBs) / Number(rate);
		console.log("Gasto en Bs, su equivalente en USD es: ", actualAmountUsd);
	}

	// Crear el gasto usando la categoría correspondiente (ya sea la existente o la nueva)
	const expenseData: CreateExpenseDTO = {
		amountUsd: actualAmountUsd,
		date: new Date(date),
		categoryId: categoryId as number,
		userId: id,
		amountBs: amountBs ? Number(amountBs) : undefined,
		rate: rate ? Number(rate) : undefined,
		description,
	}

	console.log("CREATE EXPENSE, se va a crear el gasto con los siguientes datos: ", expenseData);

	const [error, expenseId] = await expenseService.create(expenseData);
	if (error) {
		throw new Error("Error creating expense: " + error);
	}

	console.log("Expense created with ID:", expenseId);

	revalidatePath("/dashboard");

	return expenseId;
}

export { createExpense };