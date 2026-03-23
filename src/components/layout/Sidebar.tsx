import { logout } from "@/actions/auth/logout";
import Link from "next/link";
import { Route } from "./BaseLayout";

type Props = {
  routeAt: string;
  navRoutes: Route[];
}

const Sidebar = ({ routeAt, navRoutes }: Props) => {
  return (
    <aside 
      className="hidden h-dvh border-e lg:flex lg:flex-col lg:justify-between p-6 
      border-slate-200 shadow-sm md:row-start-1 md:row-end-3"
    >
      <nav>
        <ul>
          {navRoutes.map((route) => (
            <li 
              key={route.route}
              className={`p-2 ${route.route === routeAt ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-slate-100"}`}
            >
              <Link className="w-full flex gap-2" href={route.route}>
                {route.icon}
                <span>
                  {route.description}
                </span>
              </Link>
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