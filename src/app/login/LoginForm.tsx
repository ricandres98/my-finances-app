"use client";
import { useRef, useState } from "react";
import { login } from "../../actions/auth/login";
import Link from "next/link";
import { CardContainer } from "@/components/UI/CardContainer";
import { InputField } from "@/components/UI/InputField";
import { BaseButton } from "@/components/UI/BaseButton";
import { MainButton } from "@/components/UI/MainButton";

function LoginForm() {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const form = useRef<HTMLFormElement>(null);

	const submitHandler: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		if (!form.current) return;

		setLoading(true);
		setError(null);
		const formData = new FormData(form.current);

		const response = await login(formData);

		setLoading(false);

		if (response && "error" in response && response.error) {
			setError(response.error);
		}
	}

	return (
		<CardContainer>

			<form onSubmit={submitHandler} ref={form} className="flex flex-col gap-4 mb-6">
				<InputField htmlFor="email" text="Correo electrónico">
					<input
						type="email"
						id="email"
						name="email"
						required={true}
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

				{error && <p className="text-red-600 text-center text-sm">{error}</p>}
				{loading
					? <BaseButton className="text-slate-600">Cargando...</BaseButton>
					: <MainButton className="bg-blue-500 text-white">Enviar</MainButton>
				}
			</form>

			<Link href="/signup" className="hover:underline text-center block">¿No tienes una cuenta? Regístrate aquí</Link>

		</CardContainer>
	)
}

export { LoginForm };