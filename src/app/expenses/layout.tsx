import { BaseLayout } from "@/components/layout/BaseLayout";

export default function ExpensesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout routeAt="/expenses">
      {children}
    </BaseLayout>
  );
}