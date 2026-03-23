import Link from "next/link";
import { Route } from "./BaseLayout";

type Props = {
  routeAt: string,
  navRoutes: Route[],
}


const NavBarMobile = ({ routeAt, navRoutes }: Props) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-blue-500 lg:hidden text-white">
      <ul className="grid grid-flow-col">
        {navRoutes.map((route) => (
          <li key={route.route}
            className={`p-2 ${route.route === routeAt ? "bg-blue-400 font-semibold" : "hover:bg-blue-600"} transition-all`}
          >
            <Link
              href={route.route}
              className={`flex flex-col items-center w-full`}
            >
              {route.icon}
              <span className="text-sm sm:text-base">
                {route.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
};

export { NavBarMobile };