"use client";

import { useRef, useState } from "react";
import { BaseButton } from "../UI/BaseButton";
import { CardContainer } from "../UI/CardContainer";
import { InputField } from "../UI/InputField";
import { MainButton } from "../UI/MainButton";
import { sendVerificationCode } from "@/actions/auth/sendVerificationCode";
import { InputNumber } from "../UI/InputNumber";
import { validateVerificationCode } from "@/actions/auth/validateVerificationCode";

type Props = { 
  email: string
}

const VerificationCodeForm = ({ email }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const submitHandler: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!form.current) return;
    setLoading(true);

    setError(null);
    const formData = new FormData(form.current);

    const code = formData.get("code")?.toString();
    if (!code) {
      setError("El código es obligatorio");
      setLoading(false);
      return;
    }

    const error = await validateVerificationCode(email, code);

    if (error) {
      setError(error.error);
    } else {
      console.log("Código verificado correctamente!!!!!!!!!!!!!!!!!!!!!!");
    }


    setLoading(false);
  }

  return (
    <CardContainer className="max-w-sm w-full">
      <form onSubmit={submitHandler} ref={form} className="flex flex-col gap-4">
        <p>
          Ingresa el código de verificación enviado a <span className="font-semibold">{email}</span>
        </p>
        
        <InputNumber id="code" name="code" simbol=""/>
        
        {error && <p className="text-red-600 text-center text-sm">{error}</p>}

        {loading
          ? <BaseButton className="text-slate-600">Cargando...</BaseButton>
          : <MainButton className="bg-blue-500 text-white">Verificar</MainButton>
        }
      </form>
    </CardContainer>
  );
}

export { VerificationCodeForm };