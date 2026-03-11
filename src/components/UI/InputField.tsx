type Props = {
	htmlFor: string,
	text: string;
}

const InputField = ({ htmlFor, text, children }: React.PropsWithChildren<Props>) => {
	return (
		<>
			<label htmlFor={htmlFor}
				className="flex items-center">
				<span className="mr-2">{text}</span>
				{children}
			</label>
		</>
	);
};

export { InputField };