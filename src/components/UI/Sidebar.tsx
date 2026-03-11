import { logout } from "@/app/login/logout";
import Link from "next/link";

const navRoutes = [
  {
    route: "/dashboard",
    description: "Dashboard"
  },
  {
    route: "/expenses",
    description: "Gastos"
  },
  {
    route: "/categories",
    description: "Categorías"
  },
  {
    route: "/reports",
    description: "Reportes"
  },
]

type Props = {
  routeAt: string;
}

const Sidebar = ({ routeAt }: Props) => {
  return (
    <aside className="h-dvh border-e flex flex-col justify-between p-6 border-slate-200 shadow-sm md:row-start-1 md:row-end-3">
      <nav>
        <ul>
          {navRoutes.map((route) => (
            <li key={route.route}
              className={`p-2 ${route.route === routeAt ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-slate-100"}`}>
              <Link href={route.route}>{route.description}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="self-end">
        <button onClick={logout} className="cursor-pointer">Logout</button>
      </div>
    </aside>
  )
}

export { Sidebar };