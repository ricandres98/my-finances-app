import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function CategoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh grid md:grid-cols-[14rem_1fr] overflow-hidden md:grid-rows-[minmax(6rem,min-content)_1fr]">
      <Sidebar routeAt="/categories"/>
      <Header />
      {children}
    </div>
  );
}