"use server";

import { categoryService } from "@/services/category.service";
import { authService } from "@/services/auth.service";
import { revalidatePath } from "next/cache";

async function editCategory(id: number, newName: string, path: string) {
  const verificationResponse = await authService.verifyToken();

  if ("error" in verificationResponse) {
    console.error(verificationResponse);
		return verificationResponse;		
	} else {
    if(!newName || newName.trim() === "") {
      return {error: "El nombre no puede estar vacío", details: "El nombre no puede estar vacío"};
    }

    await categoryService.edit(verificationResponse.id, id, newName.toLowerCase());
    revalidatePath(path);
	}
}

export { editCategory };