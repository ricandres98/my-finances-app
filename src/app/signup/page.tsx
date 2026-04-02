import { cookies } from "next/headers";
import { SignupForm } from "./SignupForm";
import { redirect } from "next/navigation";

export default async function SignupPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");

	if (token) {
		redirect("/dashboard");
	}
	return (
		<div className="bg-slate-50 px-4 min-h-screen flex flex-col items-center">
			<div className="mt-12 mb-10 flex flex-col items-center">
				<h2 className="text-lg text-slate-500">¿Nuevo por acá?</h2>
				<h1 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center">
					¡Regístrate!
				</h1>
			</div>
			<div className="">
				<SignupForm />
			</div>
		</div>
	)
}