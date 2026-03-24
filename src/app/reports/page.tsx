import { TotalByCategoryItem } from "@/components/reports/TotalByCategoryItem";
import { TotalByDateItem } from "@/components/reports/TotalByDateItem";
import { CardContainer } from "@/components/UI/CardContainer";
import { authService } from "@/services/auth.service";
import { reportService } from "@/services/report.service";

export default async function ReportsPage() {
  const { id } = await authService.verifyToken() as { id: number, exp: number };
  const totalByCategories = await reportService.getTotalByCategories(id, 3, 2026);
  const totalByDates = await reportService.getTotalByDates(id, 3, 2026);
  console.log(totalByDates);

  return (
    <main className="px-4 py-8 overflow-y-auto [scrollbar-gutter:stable]">
      <h1>Reportes</h1>
      <CardContainer>
        <h2>Gastos por categoría</h2>
        <ul>
          {totalByCategories.map(category => (
            <TotalByCategoryItem key={category.id} amount={category.total_spent} categoryName={category.name}/>
          ))}
        </ul>
      </CardContainer>
      <CardContainer>
        <h2>Gastos por día</h2>
        <ul>
          {totalByDates.map(report => (
            <TotalByDateItem key={report.date.getTime()} amount={report.total_spent} date={report.date} />
          ))}
        </ul>
      </CardContainer>
    </main>
  )
}