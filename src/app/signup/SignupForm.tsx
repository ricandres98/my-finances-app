"use client";
import { useRef, useState } from "react";
import { CardContainer } from "@/components/UI/CardContainer";
import { InputField  } from "@/components/UI/InputField";
import { BaseButton } from "@/components/UI/BaseButton";
import { MainButton } from "@/components/UI/MainButton";
import { sendVerificationCode } from "@/actions/auth/sendVerificationCode";

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

		const password = formData.get("password");
		const confirmPassword = formData.get("confirm-password");

		if (password === confirmPassword) {

			const response = await sendVerificationCode(formData);

			if (response?.error) {
				setError(response.error);
			}
			setLoading(false);

		} else {
			setError("Las contraseñas no coinciden");
			setLoading(false);
		}
	}

	return (
		<CardContainer className="max-w-sm w-full">
			<form onSubmit={submitHandler} ref={form} className="flex flex-col gap-4">
				<InputField htmlFor="username" text="Nombre de usuario">
					<input 
						type="text" 
						required={true} 
						id="username" 
						name="username" 
						className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
					/>
				</InputField>

				<InputField htmlFor="email" text="Correo electrónico">
					<input 
						type="email" 
						required={true} 
						id="email" 
						name="email" 
						className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
					/>
				</InputField>

				<InputField htmlFor="password" text="Contraseña">
					<input 
						type="password" 
						required={true} 
						id="password" 
						name="password" 
						className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
					/>
				</InputField>

				<InputField htmlFor="confirm-password" text="Confirmar contraseña" >
					<input 
						type="password" 
						required={true} 
						id="confirm-password" 
						name="confirm-password" 
						className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
					/>
				</InputField>

				{error && <p className="text-red-600 text-center text-sm">{error}</p>}
				
				{loading
					? <BaseButton className="text-slate-600">Cargando...</BaseButton>
					: <MainButton className="bg-blue-500 text-white">Enviar</MainButton>
				}
			</form>
		</CardContainer>
	)
}

export { SignupForm };