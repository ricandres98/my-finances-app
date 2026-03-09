import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"
import { config as env } from "@/config";
import { logout } from "./app/login/logout";

export default async function proxy(request: NextRequest) {
	const token = request.cookies.get("token");

	const { pathname } = request.nextUrl;

	console.log("SE ESTA EJECUTANDO EL PROXY EN: ", request.url);
	
	if (!token) {
		console.log("No hay token");
		if (!request.url.includes("/login"))
		return NextResponse.redirect(new URL('/login', request.url));
	} else {
		if (request.url.includes("/login") || pathname === "/") {
			return NextResponse.redirect(new URL('/dashboard', request.url));
		}
		const secret = new TextEncoder().encode(env.jwtSecret)
		try{
			const { payload } = await jwtVerify(token.value, secret)
			console.log('PAYLOAD: ', payload);

		}catch{
			await logout();
		}		
		
	}
	
	console.log("Si hay token");
	return NextResponse.next();
}


export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. /api (rutas de API)
     * 2. /_next/static (archivos estáticos)
     * 3. /_next/image (optimización de imágenes)
     * 4. /favicon.ico (icono del sitio)
     * 5. /login (la página a la que queremos llegar)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|signup).*)',
  ],
};