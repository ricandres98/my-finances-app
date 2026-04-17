"use server";

import { categoryService } from "@/services/category.service";
import { authService } from "@/services/auth.service";
import { revalidatePath } from "next/cache";
import { EditCategoryDTO } from "@/types/category.type";

async function editCategory({id, name, color} : EditCategoryDTO, path: string) {
  const verificationResponse = await authService.verifyToken();

  if ("error" in verificationResponse) {
    console.error(verificationResponse);
		return verificationResponse;		
	} else {
    if(!name || name.trim() === "") {
      return {error: "El nombre no puede estar vacío", details: "El nombre no puede estar vacío"};
    }

    await categoryService.edit(verificationResponse.id, { id, name: name.toLowerCase(), color});
    revalidatePath(path);
	}
}

export { editCategory };