import "./globals.css";
import { Inter, DM_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"]});
const dmSans = DM_Sans({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-slate-50 text-slate-900 ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
