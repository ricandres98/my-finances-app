"use server";

import { authService } from "@/services/auth.service";
import { categoryService } from "@/services/category.service";
import { revalidatePath } from "next/cache";

async function createCategory(name: string, path: string) {
  const verificationResponse = await authService.verifyToken()

  if ("error" in verificationResponse) {
    console.error(verificationResponse);
		return verificationResponse;
  } else {
    const itExists = await categoryService.checkExistence(name, verificationResponse.id);

    if (itExists) {
      return {error: "La categoría ya existe", details: "La categoría ya existe"}
    } else {
      await categoryService.create({name: name.toLowerCase(), userId:verificationResponse.id});
      revalidatePath(path);
    }
  }
}

export { createCategory };