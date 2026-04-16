import type { reportTotalByDate } from "@/types/report.type"
import { eachDayOfInterval } from "date-fns";
import { dateToStringUTC } from "./dateToString";
import { TZDate } from "@date-fns/tz";

const generateFullMonthData = (data: reportTotalByDate[], { startDate, endDate }: { startDate: Date, endDate: Date }) => {
  // const start = startOfMonth(month, year);
  // const end = endOfMonth(month, year);
  
  const startUTC = new TZDate(startDate, "UTC");
  const endUTC = new TZDate(endDate, "UTC");

  const allDays = eachDayOfInterval({ start: startUTC, end: endUTC });

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