"use server";

import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

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
	}

	redirect("/login");
}