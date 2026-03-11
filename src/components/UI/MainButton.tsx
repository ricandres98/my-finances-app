import { BaseButton } from "./BaseButton"

const MainButton = ({ children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<BaseButton
			className={`bg-blue-500 hover:bg-blue-600 ${className}`}
			{...rest}
		>
			{children}
		</BaseButton>
	)
}

export { MainButton };