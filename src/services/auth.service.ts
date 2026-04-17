import { config } from "@/config";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const authService = {
	async verifyToken() {
		try {
			const cookieStore = await cookies();
			const token = cookieStore.get("token")?.value;

			if (!token) {
				throw new Error("No token found");
			}

			const { payload } = await jwtVerify(token, new TextEncoder().encode(config.jwtSecret));
			
			return payload as { id: number, exp: number };
		} catch (error) {
			return { error: "Invalid token", details: error instanceof Error ? error.message : String(error) };
		}
		
	},
}

export { authService };