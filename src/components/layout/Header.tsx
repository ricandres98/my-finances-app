import { logout } from "@/actions/auth/logout";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "600" });

const Header = () => {
  return (
    <header className="flex justify-between p-6 bg-blue-600 text-slate-50 shadow-sm">
      <div>
        <h1 className={poppins.className + " text-xl font-bold"}>Expense Tracker</h1>
        <h2 className="hidden sm:block">Registra tus gastos y controla tu presupuesto</h2>
      </div>
      <div className="flex items-center">
        <button onClick={logout}
          className="font-semibold cursor-pointer hover:text-slate-200">
          Logout
        </button>
      </div>
    </header>
  )
}

export { Header };