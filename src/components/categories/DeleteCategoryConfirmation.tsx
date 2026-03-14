import { CategoryWithExpenseCount } from "@/types/category";
import { MainButton } from "../UI/MainButton";

type Props = {
  category: CategoryWithExpenseCount,
  cancel: () => void,
  deleteCategory: () => void,
}

const DeleteCategoryConfirmation = ({ category, cancel, deleteCategory }: Props) => {
  const handleDeletion = () => {
    deleteCategory();
    cancel();
  }

  return (
    <div>
      <div className="space-y-4 mb-6">
        <p className="text-lg text-center text-slate-900 font-semibold">
          ¿Estás seguro(a) de eliminar la categoría <span className="italic">{category.name}</span>?
        </p>
        <p className="text-center text-slate-600">
          Se borrarán <span className="font-bold">{category.expenseCount}</span> gasto(s) dentro esta categoría
        </p>
      </div>
      <div className="flex gap-6 justify-center">
        <MainButton onClick={cancel}>Cancelar</MainButton>
        <button 
          onClick={handleDeletion}
          className="px-4 py-2 cursor-pointer text-red-600 hover:text-red-700" 
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export { DeleteCategoryConfirmation };