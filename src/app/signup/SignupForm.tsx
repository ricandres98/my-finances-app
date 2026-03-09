"use client";
import { useRef, useState } from "react";
import { signup } from "@/app/signup/signup";

function SignupForm() {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const form = useRef<HTMLFormElement>(null);

	const submitHandler: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		if (!form.current) return;
		setLoading(true);		
		
		setError(null);
		const formData = new FormData(form.current);

		const	password = formData.get("password");
		const	confirmPassword = formData.get("confirm-password");
		
			if (password === confirmPassword) {

				const response = await signup(formData);

				if("error" in response) {
					setError(response.error);
				}
				setLoading(false);
				
			} else {
				setError("Las contraseñas no coinciden");
				setLoading(false);
			}
	}

	return (
		<div className="w-sm bg-background text-foreground p-4 rounded shadow">
			<form onSubmit={submitHandler} ref={form} className="flex flex-col gap-4">
				<label htmlFor="username" className="flex flex-col">
					<span>Nombre de usuario</span>
					<input type="text" required={true} id="username" name="username" className="bg-slate-100 text-slate-900 " />
				</label>
				<label htmlFor="email" className="flex flex-col">
					<span>Correo electrónico</span>
					<input type="email" required={true} id="email" name="email" className="bg-slate-100 text-slate-900 "/>
				</label>
				<label htmlFor="password" className="flex flex-col">
					<span>Contraseña</span>
					<input type="password" required={true} id="password" name="password" className="bg-slate-100 text-slate-900 "/>
				</label>
				<label htmlFor="confirm-password" className="flex flex-col">
					<span>Confirmar contraseña</span>
					<input type="password" required={true} id="confirm-password" name="confirm-password" className="bg-slate-100 text-slate-900 "/>
				</label>

				{error && <p>{error}</p>}
				<button>{loading ? "cargando..." : "Enviar"}</button>
			</form>
		</div>
	)
}

export { SignupForm };