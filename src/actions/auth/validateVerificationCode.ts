"use server";

import { verificationService } from "@/services/verification.service";
import { signup } from "./signup";

export async function validateVerificationCode(email: string, code: string) {
  let verificationSuceed = false;

  try {
    const result = await verificationService.validateVerificationToken(email, code);

    if (!result) {
      return { 
        error: "El código de verificación es incorrecto",
        success: false,
      };
    }

    verificationSuceed = true;

    // return { success: true };
    
  } catch (error) {
    console.log("ERROR AL ENVIAR CÓDIGO: ", (error as Error).message);
    return {
      error: (error as Error).message,
      success: false,
    };
  }
  
  if (verificationSuceed) {
    const error = await signup(email);

    if (error) return {
      error: error.error,
      success: false,
    }
  }
}