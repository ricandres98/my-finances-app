"use client";

import { CategoryWithExpenseCount } from "@/types/category"
import { MainButton } from "../UI/MainButton"
import { CategoryItem } from "./CategoryItem"
import { Modal } from "../UI/Modal"
import { useState } from "react";
import { DeleteCategoryConfirmation } from "./DeleteCategoryConfirmation";
import { deleteCategory } from "@/actions/categories/deleteCategory";
import { CreateCategoryForm } from "./CreateCategoryForm";
import { EditCategoryForm } from "./EditCategoryForm";

type Props = {
  categoryList: CategoryWithExpenseCount[] | null,
  path: string,
}

const CategoriesClient = ({ categoryList, path }: Props) => {
  const [ isOpen, setIsOpen] = useState(false);
  const [ categoryToDelete, setCategoryToDelete ] = useState<CategoryWithExpenseCount | null>(null);
  const [ editCategory, setEditCategory ] = useState<CategoryWithExpenseCount | null>(null);
  const [ createNew, setCreateNew ] = useState<boolean>(false);


  const openNewCategoryForm = () => {
    setIsOpen(true)
    setCreateNew(true);
    setCategoryToDelete(null);
    setEditCategory(null);
    
    console.log("CREATE NEW");
  }

  const openEditCategoryForm = (category: CategoryWithExpenseCount) => {
    setIsOpen(true)
    setEditCategory(category);
    setCreateNew(false);
    setCategoryToDelete(null);
    
    console.log("EDIT: ", category);
  }

  const confirmDeleteCategory = (category: CategoryWithExpenseCount) => {
    setIsOpen(true);
    setCategoryToDelete(category);
    setCreateNew(false);
    setEditCategory(null);

    console.log("DELETE: ", category);
  }

  const closeModal = () => {
    setIsOpen(false);
    setCategoryToDelete(null);
    setCreateNew(false);
    setEditCategory(null);
  }

  return (
    <>
      <main className="overflow-y-auto [scrollbar-gutter:stable] pb-8 sm:pb-0">
        <div className="p-6">
          <MainButton className="w-full text-lg" onClick={openNewCategoryForm} type="button">Nueva categoría +</MainButton>
        </div>
        {/* Contenedor de grilla de categorías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 p-6 pb-10 sm:pb-6 gap-6">
          {/* Card de categoría */}
          {categoryList && categoryList.map((category) => (
            <CategoryItem 
              expenseCount={category.expenseCount} 
              name={category.name} key={category.id} 
              onDelete={() => confirmDeleteCategory(category)} 
              onEdit={() => openEditCategoryForm(category)}
            />
          ))}
        </div>
      </main>
      {isOpen && (
        <Modal close={() => setIsOpen(false)}>
          {categoryToDelete && (
            <DeleteCategoryConfirmation 
              category={categoryToDelete} 
              deleteCategory={() => deleteCategory(categoryToDelete.id, path)}
              cancel={closeModal} 
              />
          )}
          {createNew && (
            <CreateCategoryForm path={path} close={closeModal}/>
          )}
          {editCategory && (
            <EditCategoryForm 
              category={editCategory}
              path={path} 
              close={closeModal}
            />
          )}
          {/* Establecer qué se mostrará dentro del modal según el estado 
          (create new: boolean, editCategory: Category, deleteCategory: number) */}
        </Modal>
      )}
    </>
  )
}

export { CategoriesClient };