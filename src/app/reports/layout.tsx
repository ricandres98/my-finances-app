import { BaseLayout } from "@/components/layout/BaseLayout";

export default function ReportsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout routeAt="/reports">
      {children}
    </BaseLayout>
  );
}