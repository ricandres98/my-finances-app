"use client";

import { useState } from "react";
import { EmailForm } from "./EmailForm";
import { VerificationCodeForm } from "./VerificationCodeForm";

const VerifyEmailForms = () => {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState<string>("");


  return (
    <>
      {step === "email" && (
        <EmailForm next={(email: string) => {
          setStep("code");
          setEmail(email);
          }} 
        />
      )}
      {step === "code" && <VerificationCodeForm email={email} />}
    </>
  )
}

export { VerifyEmailForms };