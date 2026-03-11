import { BaseButton } from "./BaseButton"

const MainButton = ({ children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<BaseButton
			className={`bg-blue-600 hover:bg-blue-700 ${className}`}
			{...rest}
		>
			{children}
		</BaseButton>
	)
}

export { MainButton };