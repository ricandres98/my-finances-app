type Props = {
  categoryName: string;
  amount: number
}

const TotalByCategoryItem = ({ amount, categoryName }: Props) => {
  return (
    <li>
      <span>{categoryName}</span>
      <span>$ {amount}</span>
    </li>
  );
};

export { TotalByCategoryItem };