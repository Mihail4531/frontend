// app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/widgets/sidebar";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-stores";
import { Footer } from "@/widgets/footer";

const inter = Inter({ subsets: ["latin"] });

function AuthInitializer() {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    const timer = setTimeout(() => fetchUser(), 100);
    return () => clearTimeout(timer);
  }, [fetchUser]);

  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthInitializer />

        {/* 1. Главный контейнер: на всю высоту, без скролла на body */}
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
          {/* Сайдбар стоит на месте */}
          <Sidebar />

          {/* 2. Правая часть: Скроллится ТОЛЬКО этот див */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Контент страницы */}
            <main className="flex-1">{children}</main>

            {/* Футер лежит внутри скролла, в самом низу */}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
