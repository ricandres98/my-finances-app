import { PropsWithChildren } from "react";

type Props = {
  dateString: string
}

const ExpenseListWithDate = ({ dateString, children }: PropsWithChildren<Props>) => {
  return (
    <div className="">
      <span className="mb-2 block text-slate-500">{dateString}</span>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  )
}

export { ExpenseListWithDate };