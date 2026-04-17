type reportTotalByCategory = {
  id: number,
  name: string,
  total_spent: string,
}

type reportTotalByDate = {
  date: Date,
  total_spent: number,
}

export type { reportTotalByCategory, reportTotalByDate };