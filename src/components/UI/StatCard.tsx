type Props = {
  title: string,
  value: number | undefined,
}

const StatCard = ({ title, value }: Props) => {
  return (
    <div className="p-4 flex flex-col justify-between bg-white rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-sm text-slate-500 mb-2">{title}: </h3>
      <p className="text-lg tracking-wider sm:text-2xl md:text-3xl font-semibold text-slate-900">$ {value ? value : "0.00"}</p>
    </div>
  )
}

export { StatCard }; 