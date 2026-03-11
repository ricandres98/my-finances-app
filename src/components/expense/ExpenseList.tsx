const ExpenseList = ({ children }: React.PropsWithChildren) => {
	return (
		<div className="my-12 space-y-6">
			{children}
		</div>
	)
}

export { ExpenseList };