import { logout } from "@/actions/auth/logout";

const Header = () => {
  return (
    <header className="flex justify-between p-6 border-b border-slate-200 bg-blue-600 text-slate-50 shadow-sm">
      <div>
        <h1 className="text-xl font-bold">Expense Tracker</h1>
        <h2>Registra tus gastos y controla tu presupuesto</h2>
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