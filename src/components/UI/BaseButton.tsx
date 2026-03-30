const BaseButton = ({ children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={`rounded-xl px-4 py-2 cursor-pointer ${className}`}
			{...rest}
		>
			{children}
		</button>
	)
}

export { BaseButton };