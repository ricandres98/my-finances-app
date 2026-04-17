"use server";

import { verificationService } from "@/services/verification.service";
import { redirect } from "next/navigation";

export async function sendVerificationCode(formData: FormData) {
  let isSuccesful = false;
  let vid = null;
  try {
    const username = formData.get("username")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if(!email || !username || !password) {
      return {
        error: "Todos los campos son obligatorios",
        success: false,
      }
    }

    vid = await verificationService.generateVerificationToken(email);
    
    const isUserPending = await verificationService.getPendingUser(email);
    
    if(!isUserPending) {
      await verificationService.savePendingUser(username, email, password);
    } else {
      await verificationService.editPendingUser(username, email, password);
    }
    
    // const cookieStore = await cookies();

    // cookieStore.set("verification_email", email, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   expires: new Date(Date.now() + 15 * 60 * 1000), //15 minutos
    // });

    isSuccesful = true;
    
  } catch (error) {
    console.log("ERROR AL ENVIAR CÓDIGO: ", error);
    return { 
      error: "Nombre de usuario ya existe",
      success: false,
    };
  }

  if (isSuccesful) {
    redirect(`/signup/verify-email?vid=${vid}`);
  }
}