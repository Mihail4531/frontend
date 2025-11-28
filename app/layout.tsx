import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import { AuthProvider } from "@/app/providers";
import { Metadata } from "next"; 
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Community",
  description: "Platform for developers",
  // 👇 ЯВНО УКАЗЫВАЕМ ПУТЬ
  icons: {
    icon: '/favicon.ico', 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
           {children}
        </AuthProvider>
      </body>
    </html>
  );
}