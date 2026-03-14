"use server";

import { SignJWT } from "jose";
import bcrypt from "bcrypt";
import { userService } from "@/services/user.service";
import { config } from "@/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function login(formData: FormData) {
	let isLoginSuccess = false;
	try {
		// 1- Validar campos
		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();

		if (!email || !password) {
			return { error: "Faltan campos" };
		}

		// 2- Verificar credenciales
		const user = await userService.find(email.toString());

		if (!user) {
			return { error: "Credenciales inválidas" };
		}

		const isValidPassword = await bcrypt.compare(password, user.dataValues.password)

		if (isValidPassword) {
			console.log("Te logueaste chico!!");

			// 3- Generar JWT
			const secret = new TextEncoder().encode(config.jwtSecret);
			const alg = "HS256";

			const token = await new SignJWT({ id: user.dataValues.id })
				.setProtectedHeader({ alg })
				.setExpirationTime("8 weeks")
				.sign(secret);

			// 4- Guardar JWT en cookie
			const cookieStore = await cookies();
			cookieStore.set("token", token, {
				httpOnly: true,
				secure: config.nodeEnv === "production",
				expires: new Date(Date.now() + 8 * 7 * 24 * 60 * 60 * 1000), //8 weeks
				path: "/"
			})

			isLoginSuccess = true;
		} else {
			return { error: "Credenciales inválidas" };
		}

	} catch {
		return { error: "Error en el servidor" };
	}

	if (isLoginSuccess) {
		// 5- Redireccionamiento
		redirect("/dashboard")
	}

}