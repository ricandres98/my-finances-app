type Props = {
	htmlFor: string,
	text: string;
	className?: string,
}

const InputField = ({ htmlFor, text, children, className }: React.PropsWithChildren<Props>) => {
	return (
		<>
			<label htmlFor={htmlFor}
				className={"flex items-center " + className && ""}
			>
				<span className="mr-2">{text}</span>
				{children}
			</label>
		</>
	);
};

export { InputField };