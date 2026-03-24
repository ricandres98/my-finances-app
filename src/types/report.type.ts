type reportTotalByCategory = {
  id: number,
  name: string,
  total_spent: number,
}

type reportTotalByDate = {
  date: Date,
  total_spent: number,
}

export type { reportTotalByCategory, reportTotalByDate };