"user client";
import { useRef, useState } from "react";
import { MainButton } from "../UI/MainButton";
import { createCategory } from "@/actions/categories/createCategory";

type Props = {
  path: string,
  close: () => void;
}

const CreateCategoryForm = ({ path, close } : Props) => {
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState(false);
  const form = useRef(null)

  const handleSubmit: React.SubmitEventHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (form.current) {
        const formData = new FormData(form.current);
        const name = formData.get("new-category-name") as string;
  
        const errorInCreation = await createCategory(name, path);
        
        if(errorInCreation) {
          setLoading(false);
          setError(errorInCreation.details);
        } else {
          setLoading(false);
          setError(null);
          close();
        }

      }
    } catch (error) {
      setError(error as string);
    }
  }

  return (
    <form className="space-y-6" ref={form} onSubmit={handleSubmit}>
      <label
        htmlFor="new-category-name"
        className="mb-8 block"
      >
        <span className="text-lg">Nombre de la nueva categoría:</span>
        <input
          id="new-category-name"
          name="new-category-name"
          className="mt-4 w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
        />
      </label>
      {loading ? <span>Espera...</span> : <MainButton className="w-full">Guardar</MainButton>}
      {error && <p className="text-red-700">{error}</p>}
    </form>
  )
}

export { CreateCategoryForm };