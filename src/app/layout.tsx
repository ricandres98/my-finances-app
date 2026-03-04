import "./globals.css";
import { logout } from "./login/logout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
      <button onClick={logout}>Logout</button>
        {children}
      </body>
    </html>
  );
}
