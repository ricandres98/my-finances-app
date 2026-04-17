import { PropsWithChildren } from "react";

type Props = {
  close: () => void,
}

const Modal = ({ children, close }: PropsWithChildren<Props>) => {
  return (
    <>
      <div className="h-dvh w-dvw bg-slate-100/50 fixed flex justify-center items-center" onClick={close}>
        <div className="bg-white inline-block rounded-lg border-slate-200 shadow-sm p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-end">
            <button className="cursor-pointer hover:text-red-500 mb-6" onClick={close}>X</button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export { Modal };