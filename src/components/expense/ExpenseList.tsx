const ExpenseList = ({ children }: React.PropsWithChildren) => {
	return (
		<div className="space-y-6">
			{children}
		</div>
	)
}

export { ExpenseList };