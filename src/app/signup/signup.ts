"use server";

import { UserService } from "@/services/user.service";
import { NextResponse } from "next/server";

const service = new UserService();

export async function signup(formData: FormData) {

	const username = formData.get("username");
	const email = formData.get("email");
	const password = formData.get("password");

	if (!username || !email || !password) {
		return { error: "Faltan campos" };
	}

	const response = await service.create({
		username: username.toString(),
		email: email.toString(),
		password: password.toString()
	});

	if (response[0]) {
		return { error: response[0].message };
	}

	// return { message: "Usuario creado con éxito" };
	return NextResponse.redirect("/login");

}