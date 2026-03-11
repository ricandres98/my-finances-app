type Props = {
	htmlFor: string,
	text: string;
}

const InputField = ({ htmlFor, text, children }: React.PropsWithChildren<Props>) => {
	return (
		<>
			<label htmlFor={htmlFor}
				className="mb-4 flex">
				<span className="mr-2">{text}</span>
				{children}
			</label>
		</>
	);
};

export { InputField };