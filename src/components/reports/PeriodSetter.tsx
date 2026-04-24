"use client";

import { dateToStringUTC } from "@/utils/dateToString";
import { CardContainer } from "../UI/CardContainer";
import { InputField } from "../UI/InputField";
import { MainButton } from "../UI/MainButton";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  startDate: string,
  endDate: string,
}

const PeriodSetter = ({ startDate, endDate }: Props) => {
  const [ error, setError ] = useState<string | null>(null)
  const [ start, setStart ] = useState<string>(startDate);
  const [ end, setEnd ] = useState<string>(endDate);

  const router = useRouter();
  const searchParams = useSearchParams();

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);

    const todayDate = new Date(today);

    const dateA = new Date(start);
    const dateB = new Date(end);

    const isFutureDate =
      dateA.getTime() > todayDate.getTime() ||
      dateB.getTime() > todayDate.getTime();

    if (isFutureDate) {
      alert("No puedes seleccionar una fecha futura");
      return;
    }

    if (dateA.getTime() > dateB.getTime()) {
      setError("La fecha inicial no puede ser mayor que la final");
    } else {
      const params = new URLSearchParams(searchParams.toString());

      params.set("startDate", start);
      params.set("endDate", end);

      router.replace(`/reports?${params.toString()}`)

      console.log(searchParams)
      console.log(searchParams.toString())
    }
  }

  return (
  <CardContainer>
    <h2 className="text-xl font-medium mb-4">
      Período a consultar:
      <span className="text-slate-500 text-lg mx-2">
        {dateToStringUTC(new Date(startDate))} - {dateToStringUTC(new Date(endDate))}
      </span>
    </h2>
    <form onSubmit={handleSubmit} className="space-x-4">
      <InputField htmlFor="startDate" text="Fecha de inicio: ">
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={start}
          max={today}
          onChange={(e) => setStart(e.target.value)}
          className="w-full md:max-w-50 px-3 py-2 mb-6 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
          />
      </InputField>
      <InputField htmlFor="endDate" text="Fecha de fin: ">
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={end}
          max={today}
          onChange={(e) => setEnd(e.target.value)}
          className="w-full md:max-w-50 px-3 py-2 mb-6 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
        />
      </InputField>
      <MainButton className="w-full md:w-max">Buscar</MainButton>
    </form>
    {error && <p className="text-red-600 text-sm">{error}</p>}
  </CardContainer>
  )
};

export { PeriodSetter };