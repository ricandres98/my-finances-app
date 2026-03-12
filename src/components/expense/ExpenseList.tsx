const ExpenseList = ({ children }: React.PropsWithChildren) => {
	return (
		<div className="space-y-6 pb-8">
			{children}
		</div>
	)
}

export { ExpenseList };