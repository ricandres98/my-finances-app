import { BaseLayout } from "@/components/layout/BaseLayout";

export default function CategoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout routeAt="/categories">
      {children}
    </BaseLayout>
  );
}