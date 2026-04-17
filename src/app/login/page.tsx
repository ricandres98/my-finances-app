import { LoginForm } from "./LoginForm";

export default function Login() {
	return (
		<div className="bg-slate-50 px-4 min-h-screen flex flex-col items-center">
			<div className="mt-12 mb-10 flex flex-col items-center">
				<h1 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center">
					Expense Tracker
				</h1>
				<h2 className="text-lg text-slate-500">Regístralo, Analízalo y Mejóralo.</h2>
			</div>
			<div className="">
			<LoginForm />
			</div>
		</div>
	)
}