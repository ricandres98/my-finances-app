"use server";

import { categoryService } from "@/services/category.service";
import { authService } from "@/services/auth.service";
import { revalidatePath } from "next/cache";

async function deleteCategory(id: number, path?: string) {
  const verificationResponse = await authService.verifyToken();

  if ("error" in verificationResponse) {
		console.error(verificationResponse);
		return verificationResponse;
	} else {
		const { id: userId} = verificationResponse;
		await categoryService.delete(userId, id);
		
		revalidatePath(path ? path : "/");
	}
}

export { deleteCategory };