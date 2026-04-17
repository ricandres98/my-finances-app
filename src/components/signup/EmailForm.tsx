"use client";
import { useRef, useState } from "react";
import { InputField } from "@/components/UI/InputField";
import { CardContainer } from "../UI/CardContainer";
import { BaseButton } from "../UI/BaseButton";
import { MainButton } from "../UI/MainButton";
import { sendVerificationCode } from "@/actions/auth/sendVerificationCode";

type Props = {
  next: (email: string) => void;
}

function EmailForm({ next }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const submitHandler: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!form.current) return;
    setLoading(true);

    setError(null);
    const formData = new FormData(form.current);

    const response = await sendVerificationCode(formData);

    if (response && !response.success) {
      setError(response.error);
    } else {
      next(formData.get("email") as string);
    }


    setLoading(false);
  }

  return (
    <CardContainer className="max-w-sm w-full">
      <form onSubmit={submitHandler} ref={form} className="flex flex-col gap-4">
        <InputField htmlFor="email" text="Correo electrónico">
          <input
            type="email"
            required={true}
            id="email"
            name="email"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
          />
        </InputField>
        {error && <p className="text-red-600 text-center text-sm">{error}</p>}

        {loading
          ? <BaseButton className="text-slate-600">Cargando...</BaseButton>
          : <MainButton className="bg-blue-500 text-white">Verificar</MainButton>
        }
      </form>
    </CardContainer>
  );
}

export { EmailForm };