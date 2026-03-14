type Props = {
  name: string,
  expenseCount: number,
  onEdit: () => void,
  onDelete: () => void,
};

const formatCapital = (string: string) => {
  return string[0].toUpperCase() + string.slice(1);
}

const CategoryItem = ({ name, expenseCount, onDelete, onEdit }: Props) => {

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
      <div className="mb-4">
        <div className="mb-2">
          <span className="text-lg font-semibold text-slate-900">{formatCapital(name)}</span>
        </div>
        <p className="text-base text-slate-500">{expenseCount} gasto(s) en esta categoría</p>
      </div>
      <div className="flex gap-4">
        <button className="hover:text-blue-500 cursor-pointer" onClick={onEdit}>Editar</button>
        <button className="hover:text-red-500 cursor-pointer" onClick={onDelete}>Eliminar</button>
      </div>
    </div>
  )
}

export { CategoryItem };