import { InputHTMLAttributes } from "react";

type Props = {
  className?: string,
}

const BaseInput = ({ className, ...rest }: Props & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input 
      type="text" 
      className={
        `w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus-visible:outline-none 
        ${className && ""}`
      }
      {...rest}
    />
  )
}

export { BaseInput };