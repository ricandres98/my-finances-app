"use server";

import { categoryService } from "@/services/category.service";
import { userService } from "@/services/user.service";
import { verificationService } from "@/services/verification.service";
import { serverLogin } from "./serverLogin";

const defaultCategories = [
	"servicios",
	"alimentación",
	"transporte",
	"ahorro",
];

export async function signup(email: string) {

	if (!email) {
		return { error: "Faltan campos" };
	}

	const pendingUser = await verificationService.getPendingUser(email);

	if (!pendingUser) {
		return{ error: "Usuario inválido"};
	}

	const response = await userService.create({
		username: pendingUser?.dataValues.username,
		email: pendingUser.dataValues.email,
		password: pendingUser.dataValues.passwordHash,
	});

	if (response.error) {
		return { error: response.message };
	} else {

		pendingUser.destroy();

		for (const category of defaultCategories) {
			await categoryService.create({ 
				name: category,
				userId: response.message,
			 });
		}

		console.log("HORA DE REDIRIGIR")
		await serverLogin(email, pendingUser.dataValues.passwordHash);

	}

}