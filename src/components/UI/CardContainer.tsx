import React from "react";

type Props = {
  className?: string,
}

const CardContainer = ({ children, className }: Props & React.PropsWithChildren) => {
  return (
    <div className={`p-4 space-y-4 bg-white rounded-xl shadow-sm border border-slate-200 ${className || ""}`}>
      {children}
    </div>
  )
}

export { CardContainer };