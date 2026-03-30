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
		<div className="bg-slate-50 px-4 flex items-center justify-center h-screen">
			<SignupForm />
		</div>
	)
}