type Props = {
  username: string,
}

const GreetingCard = ({ username }: Props) => {
  return (
    <div className="p-4 flex flex-col justify-between bg-white rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-sm text-slate-500 mb-2">Bienvenido </h3>
      <p className="text-lg  sm:text-2xl md:text-3xl font-semibold text-slate-900">
        {username}
      </p>
    </div>
  )
}

export { GreetingCard }; 