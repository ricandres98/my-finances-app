/**
 * 
 * @param month a number describing the index of the month starting from 0 to january through 11 for december
 * @returns A Date object that represents the first day of the given month
 */
const startOfMonth = (month: number, year: number) => {
  return new Date(
    year,
    month,
    1
  );
}

const endOfMonth = (month: number, year: number) => {
  return new Date(
    year,
    month + 1,
    0
  );
}

const startOfWeek = () => {
  const now = new Date();

  const start = new Date(
    now.setUTCDate(now.getUTCDate() - now.getUTCDay())
  );

  start.setUTCHours(0, 0, 0);

  return start;
}


export { startOfMonth, endOfMonth,startOfWeek };