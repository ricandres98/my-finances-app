import { dateToStringUTC } from "@/utils/dateToString";

type Props = {
  date: Date;
  amount: number
}

const TotalByDateItem = ({ amount, date }: Props) => {
  return (
    <li>
      <span>{dateToStringUTC(date)}</span>
      <span>$ {amount}</span>
    </li>
  );
};

export { TotalByDateItem };