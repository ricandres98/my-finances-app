"use client";
import { SubmitEventHandler, useState } from "react";
import { MainButton } from "../UI/MainButton";
import { editCategory } from "@/actions/categories/editCategory";
import type { CategoryWithExpenseCount } from "@/types/category.type";

type Props = {
  path: string,
  close: () => void,
  category: CategoryWithExpenseCount,
  // editCategoryFn: (id: number, newName: string, path: string) => void,
}

const EditCategoryForm = ({ category, close, path }: Props) => {
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState(false);  
  const [ categoryName, setCategoryName ] = useState<string>(category.name);
  const [ categoryColor, setCategoryColor ] = useState<string | undefined>(category.color);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    console.log("COLOR INPUT: ", categoryColor);

    try {
      await editCategory({
        id: category.id, 
        name: categoryName,
        color: categoryColor,
      }, path);
      setLoading(false);
      setError(null);
      close();
    } catch (error) {
      setLoading(false);
      setError(error as string);
    }
  }


  return (
    <form className="space-y-6"  onSubmit={handleSubmit}>
      <label
        htmlFor="new-category-name"
        className="mb-8 block"
      >
        <span className="text-lg">Editar categoría: </span>
        <input
          id="new-category-name"
          name="new-category-name"
          className="mt-4 w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
          required={true}
          value={categoryName}
          onChange={(e) => {setCategoryName(e.target.value)}}
        />
      </label>
      <label
        htmlFor="category-color"
        className="mb-8 block"
      >
        <span className="text-lg">Color: </span>
        <input
          id="category-color"
          name="category-color"
          className="mt-4 w-full h-10 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
          required={true}
          type="color"
          defaultValue={categoryColor ? categoryColor : "#FAFAFA"}
          onChange={(e) => {setCategoryColor(e.target.value)}}
        />
      </label>
      {loading ? <span className="px-4 py-2">Espera...</span> : <MainButton className="w-full">Guardar</MainButton>}
      {error && <p className="text-red-700">{error}</p>}
    </form>
  )
}

export { EditCategoryForm };