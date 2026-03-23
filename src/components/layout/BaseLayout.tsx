import { NavBarMobile } from "./NavBarMobile";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import React, { JSX } from "react";
import { ChartNoAxesCombined, ChartPie, CircleDollarSign, House } from "lucide-react";

const navRoutes = [
  {
    route: "/dashboard",
    description: "Dashboard",
    icon: <House />,
  },
  {
    route: "/expenses",
    description: "Gastos",
    icon: <CircleDollarSign />,
  },
  {
    route: "/categories",
    description: "Categorías",
    icon: <ChartPie />,
  },
  {
    route: "/reports",
    description: "Reportes",
    icon: <ChartNoAxesCombined />,
  },
]

export type Route = {
  route: string,
  description: string,
  icon: JSX.Element,
};

type Props = {
  routeAt: string,
};

const BaseLayout = ({ routeAt, children }: Props & React.PropsWithChildren) => {
  return (
    <div className="h-dvh grid lg:grid-cols-[14rem_1fr] overflow-hidden grid-rows-[minmax(4.5rem,min-content)_1fr] md:grid-rows-[minmax(6rem,min-content)_1fr]">
      <Sidebar routeAt={routeAt} navRoutes={navRoutes} />
      <Header />
      {children}
      <NavBarMobile routeAt ={routeAt} navRoutes={navRoutes} />
    </div>
  )
};

export { BaseLayout };