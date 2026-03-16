const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 space-y-4 bg-white rounded-xl shadow-sm border border-slate-200 w-full md:max-w-120">
      {children}
    </div>
  )
}

export { CardContainer };