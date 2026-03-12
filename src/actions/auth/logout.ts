"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
	try {
		const cookieStore = await cookies();
        cookieStore.delete("token");
	} catch {
        return { error: "No se pudo cerrar la sesión" };
	}
    redirect("/login")

}