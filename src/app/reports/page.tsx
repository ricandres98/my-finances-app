import { BarGraphicDailyTotal } from "@/components/reports/LineGraphic";
import { TotalByCategoryItem } from "@/components/reports/TotalByCategoryItem";
import { CardContainer } from "@/components/UI/CardContainer";
import { authService } from "@/services/auth.service";
import { expenseService } from "@/services/expense.service";
import { reportService } from "@/services/report.service";
import { dateToStringDateMonth } from "@/utils/dateToString";
import { dayOfMaxActivity } from "@/utils/dayOfMaxActivity";
import { generateFullMonthData } from "@/utils/generateFullMonthData";

export default async function ReportsPage() {
  const { id } = await authService.verifyToken() as { id: number, exp: number };

  const now = new Date();
  now.setDate(0);
  const lastMonth = now.getMonth() + 1; // No es el index, sino el número real del mes pasado
  const lastMonthIndex = lastMonth - 1; // Para usar en funciones que requieren el index del mes, como startOfMonth

  const totalByCategories = await reportService.getTotalByCategories(id, lastMonth, now.getFullYear());
  const totalByDates = await reportService.getTotalByDates(id, lastMonth, now.getFullYear());
  const totalLastMonth = await expenseService.getTotalOfMonth(id, lastMonthIndex, now.getFullYear());

  const maxActivityReport = dayOfMaxActivity(totalByDates);
  console.log("DIA DE MAYOR ACTIVIDAD ",maxActivityReport )

  if (totalLastMonth)
  return (
    <main className="px-4 pb-20 lg:pb-8 overflow-y-auto [scrollbar-gutter:stable]">
      <div className="py-6">
        <h1 className="text-xl font-bold text-slate-900 capitalize">
          {now.toLocaleDateString("es-ES", {month: "long"})} {now.getFullYear()}
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <CardContainer>
          <h2 className="text-normal text-slate-500">Gastos por categoría</h2>
          <p className="text-2xl font-semibold mb-6">Total: <span className="tracking-wider">${totalLastMonth}</span></p>
          <ul className="flex flex-col gap-2">
            {totalByCategories.map(category => (
              <TotalByCategoryItem 
                key={category.id} 
                amount={Number(category.total_spent)} 
                categoryName={category.name}
                percentage={Number(category.total_spent) / totalLastMonth * 100}
              />
            ))}
          </ul>
        </CardContainer>
        <CardContainer>
          <h2 className="text-normal text-slate-500">Gastos por día</h2>
          <p className="text-xl font-semibold mb-6">
            Día de mayor actividad: {dateToStringDateMonth(maxActivityReport.date)}
            <span className="tracking-wider text-lg text-slate-500 font-medium"> (${maxActivityReport.total_spent})</span>
          </p>
          <BarGraphicDailyTotal data={generateFullMonthData(totalByDates, lastMonthIndex, now.getFullYear()) } />
        </CardContainer>
      </div>
    </main>
  )
}