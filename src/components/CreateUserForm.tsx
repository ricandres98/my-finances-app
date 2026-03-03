"use client";
import { CreateUserDto } from "@/types/user.types";
import { useRef, useState } from "react";

function CreateUserForm() {
	const [error, setError] = useState(false);
	const form = useRef<HTMLFormElement>(null);

	const submitHandler:React.SubmitEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		
		if (form.current) {
			setError(false);
			const formData = new FormData(form.current);

			const username = formData.get("username");
			const	email = formData.get("email");
			const	password = formData.get("password");
			const	confirmPassword = formData.get("confirm-password");

			if (password === confirmPassword) {
				console.log({error})
				const body = {
					username,
					email,
					password,
				}

				const response = await fetch("/api/users/", {
					method: "POST",
					body: JSON.stringify(body)
				});

				console.log(response);
			} else {
				setError(true);
			}
		}

	}

	return (
		<div>
			<form onSubmit={submitHandler} ref={form}>
				<label htmlFor="username">
					<span>Nombre de usuario</span>
					<input type="text" id="username" name="username"/>
				</label>
				<label htmlFor="email">
					<span>Correo electrónico</span>
					<input type="email" id="email" name="email"/>
				</label>
				<label htmlFor="password">
					<span>Contraseña</span>
					<input type="password" id="password" name="password"/>
				</label>
				<label htmlFor="confirm-password">
					<span>Confirmar contraseña</span>
					<input type="password" id="confirm-password" name="confirm-password"/>
				</label>

				{error && <p>Ha ocurrido un error</p>}
				<button>Enviar</button>
			</form>
		</div>
	)
}

export { CreateUserForm };