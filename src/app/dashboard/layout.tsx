import { BaseLayout } from "@/components/layout/BaseLayout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout routeAt="/dashboard">
      {children}
    </BaseLayout>
  );
}