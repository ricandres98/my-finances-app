type Props = {
  categoryName: string,
  amount: number,
  percentage: number,
}

const TotalByCategoryItem = ({ amount, categoryName, percentage }: Props) => {
  return (
    <li className="flex items-end justify-between">
      <div className="w-full max-w-120 mr-4">
        {/* Nombre y porcentaje */}
        <div className="flex justify-between">
          <span className="inline-block text-normal font-medium text-slate-900 mb-1 capitalize">{categoryName}:</span>
          <span className="font-semibold">{percentage.toFixed(2)}%</span>
        </div>
        {/* Barra */}
        <div className="relative inline-block w-full h-4.5 border-slate-400 rounded-lg bg-gray-200 overflow-hidden">
          <div
            className={`h-10 bg-blue-700`}
            style={{ width: percentage + "%" }}
          >
          </div>
          <div className="absolute top-0 bottom-0  p-2 flex justify-between w-full">
          </div>
        </div>
      </div>
      {/* Monto */}
      <span className="font-semibold text-lg w-fit text-nowrap tracking-wider">${amount.toFixed(2)}</span>
    </li>
  );
};

export { TotalByCategoryItem };