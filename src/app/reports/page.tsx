import { BarGraphicDailyTotal } from "@/components/reports/LineGraphic";
import { PeriodSetter } from "@/components/reports/PeriodSetter";
import { TotalByCategoryItem } from "@/components/reports/TotalByCategoryItem";
import { CardContainer } from "@/components/UI/CardContainer";
import { authService } from "@/services/auth.service";
import { expenseService } from "@/services/expense.service";
import { reportService } from "@/services/report.service";
import { dateToStringDateMonth, dateToStringUTC } from "@/utils/dateToString";
import { dayOfMaxActivity } from "@/utils/dayOfMaxActivity";
import { generateFullMonthData } from "@/utils/generateFullMonthData";

export default async function ReportsPage({ searchParams }:{
  searchParams: Promise<{ startDate: string | undefined, endDate: string | undefined }>
}) {
  const { id } = await authService.verifyToken() as { id: number, exp: number };

  if (id) {

    const { startDate, endDate } = await searchParams;
  
    // Fechas por defecto: inicio y fin del mes pasado
    const now = new Date();
    now.setDate(0);
    const endLastMonth = new Date(now);
    now.setDate(1);
    const startLastMonth = new Date(now);
  
    let start = startLastMonth;
    let end = endLastMonth;
  
    if (startDate && endDate) {
      start = new Date(startDate);
      end = new Date(endDate);
    }
  
    const totalByCategories = await reportService.getTotalByCategories(id, {
      startDate: start,
      endDate: end,
    });
    const totalByDates = await reportService.getTotalByDates(id, {
      startDate: start,
      endDate: end,
    });
    const totalInPeriod = await expenseService.getTotalOfPeriod(id, {
      startDate: start,
      endDate: end,
    });
  
    const maxActivityReport = dayOfMaxActivity(totalByDates);
    // console.log("DIA DE MAYOR ACTIVIDAD ", maxActivityReport);
  
    return (
      <main className="px-4 pb-20 lg:pb-8 overflow-y-auto [scrollbar-gutter:stable]"> 
        <div className="py-6">
          <h1 className="text-xl font-semibold text-slate-900 capitalize mb-4">
            {/* {now.toLocaleDateString("es-ES", {month: "long"})} {now.getFullYear()} */}
            {dateToStringUTC(start)} - {dateToStringUTC(end)}
          </h1>
          <PeriodSetter 
            startDate={startDate 
              ? startDate 
              : `${start.getFullYear()}-${(start.getMonth() + 1).toString().padStart(2, "0")}-${start.getDate().toString().padStart(2, "0")}`} 
            endDate={endDate 
              ? endDate 
              : `${end.getFullYear()}-${(end.getMonth() + 1).toString().padStart(2, "0")}-${end.getDate().toString().padStart(2, "0")}`}
            />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {totalInPeriod && totalInPeriod > 0 ? (
            <>
              <CardContainer>
                <h2 className="text-normal text-slate-500">Gastos por categoría</h2>
                <p className="text-2xl font-semibold mb-6">Total: <span className="tracking-wider">${totalInPeriod}</span></p>
                <ul className="flex flex-col gap-2">
                  {totalByCategories.map(category => {
                      if(Number(category.total_spent) === 0) return null;
                      return (
                        <TotalByCategoryItem
                          key={category.id}
                          amount={Number(category.total_spent)}
                          categoryName={category.name}
                          percentage={totalInPeriod ? Number(category.total_spent) / totalInPeriod * 100 : 0}
                        />
                      )
                    })
                  }
                </ul>
              </CardContainer>
              <CardContainer>
                <h2 className="text-normal text-slate-500">Gastos por día</h2>
                <p className="text-xl font-semibold mb-6">
                  Día de mayor actividad: {dateToStringDateMonth(maxActivityReport?.date)}
                  <span className="tracking-wider text-lg text-slate-500 font-medium"> (${maxActivityReport.total_spent})</span>
                </p>
                <BarGraphicDailyTotal data={generateFullMonthData(totalByDates, { startDate: start, endDate: end })} />
              </CardContainer>
            </>
          ) :(
            <CardContainer>
              <p className="text-lg text-center font-medium">No se registraron gastos en el periodo.</p>
            </CardContainer>
          )}
        </div>
      </main>
    )
  }
}