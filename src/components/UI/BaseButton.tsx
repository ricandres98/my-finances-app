const BaseButton = ({ children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={`bg-blue-500 rounded-xl px-4 py-2 text-slate-50 cursor-pointer hover:bg-blue-600 ${className}`}
			{...rest}
		>
			{children}
		</button>
	)
}

export { BaseButton };