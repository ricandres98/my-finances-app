import { ExpenseWithCategory } from "@/types/expense.type";
import { InputField } from "../UI/InputField";
import { Category } from "@/types/category";

const getListOfDates = (expenses: ExpenseWithCategory[] | null) => {
  if (!expenses) return []
  
  const monthYearSet = new Set<string>();

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    monthYearSet.add(`${month}-${year}`);
  });

  return Array.from(monthYearSet);
};

type Props = {
  expenseList: ExpenseWithCategory[] | null,
  categoryList: Category[] | null,
  setCategoryFilter: (category: string | null) => void,
  setCurrencyFilter: (currency: "bs" | "usd" | null) => void,
  setDateFilter: (date: string | null) => void,
}

const FilterExpensesPanel = ({ expenseList, categoryList, setCategoryFilter, setCurrencyFilter, setDateFilter }: Props) => {
  const monthYearOptions = getListOfDates(expenseList);

  return (
    <div className="p-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm font-semibold flex gap-8">
            <InputField htmlFor="category-filter" text="Filtrar por categoría: ">
              <select
                name="category-filter"
                id="category-filter"
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
              >
                <option value="">Todas las categorías</option>
                {
                  (categoryList && categoryList.length > 0)
                  && categoryList.map((category) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))
                }
              </select>
            </InputField>
            <InputField htmlFor="currency-filter" text="Filtrar por moneda: ">
              <select
                name="currency-filter"
                id="currency-filter"
                onChange={(e) => setCurrencyFilter(e.target.value as "bs" | "usd" | null)}
                className="px-3 py-2 border border-slate-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
              >
                <option value="">Todas las monedas</option>
                <option key="bs" value="bs">Bs</option>
                <option key="usd" value="usd">$</option>
              </select>
            </InputField>
            <InputField htmlFor="date-filter" text="Filtrar por mes: ">
              <select
                name="date-filter"
                id="date-filter"
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus-visible:outline-none"
              >
                <option value="">Todas las fechas</option>
                {monthYearOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </InputField>
          </div>
        </div>
  )
}

export { FilterExpensesPanel };