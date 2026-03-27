import { reportTotalByDate } from "@/types/report.type";

const dayOfMaxActivity = (array: reportTotalByDate[]) => {
  let max: reportTotalByDate | undefined;

  max = array[0];
  array.forEach((item) => {
    if(max && Number(item.total_spent) > Number(max.total_spent)) max = item;
  });

  return max;
}

export { dayOfMaxActivity };