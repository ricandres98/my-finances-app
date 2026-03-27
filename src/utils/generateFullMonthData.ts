import type { reportTotalByDate } from "@/types/report.type"
import { endOfMonth, startOfMonth } from "./dateUtils"
import { eachDayOfInterval } from "date-fns";
import { dateToStringUTC } from "./dateToString";

const generateFullMonthData = (data: reportTotalByDate[], month: number, year: number) => {
  const start = startOfMonth(month, year);
  const end = endOfMonth(month, year);

  const allDays = eachDayOfInterval({ start, end });

  return allDays.map(day => {
    const dateString = dateToStringUTC(day);
    // Buscamos si hay un gasto real para este día específico
    const realEntry = data.find(d => dateToStringUTC(d.date) === dateString);
    
    return {
      fecha: day.getDate(), // Para que el eje X se vea limpio
      monto: realEntry ? realEntry.total_spent : 0
    };
  });
};

export { generateFullMonthData }