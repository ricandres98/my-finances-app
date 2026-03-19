"use server";

import { categoryService } from "@/services/category.service";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

const defaultCategories = [
	"servicios",
	"alimentación",
	"transporte",
	"ahorro",
];

export async function signup(formData: FormData) {

	const username = formData.get("username");
	const email = formData.get("email");
	const password = formData.get("password");

	if (!username || !email || !password) {
		return { error: "Faltan campos" };
	}

	const response = await userService.create({
		username: username.toString(),
		email: email.toString(),
		password: password.toString()
	});

	if (response[0]) {
		return { error: response[0].message };
	} else {
		defaultCategories.forEach(async (category) => {
			await categoryService.create({ 
				name: category,
				userId: response[1],
			 })
		})
	}

	redirect("/login");
}