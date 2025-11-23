"use client";

import { useState } from "react";
import LogoUI from "./logo.ui";
import NavigationUI from "./navigation.ui";
import AuthUI from "./auth.ui";
import { MENU_DATA } from "../module/menu.data";
import { LogoutButton } from "@/features/auth/logout/ui/logout-button";
import { useAuthStore } from "@/stores/auth-stores"; // Импорт для проверки user
import UserInfoUI from "./user-info.ui";

export default function SidebarUI() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuthStore(); // Нужно, чтобы показывать Logout только если есть юзер

  // Эти стили копируем из AuthUI (состояние "залогинен")
  const logoutStyles = `
    w-full flex items-center justify-start gap-3 px-3 py-3 rounded-lg transition-all 
    bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700
    font-medium
  `;

  return (
    <aside
      className={`
        h-screen bg-black border-r border-zinc-900 flex flex-col
        transition-all duration-300 ease-out
        ${isCollapsed ? "w-20" : "w-80"}
      `}
    >
      <LogoUI
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      <NavigationUI items={MENU_DATA} isCollapsed={isCollapsed} />

      {/* 
         ФУТЕР САЙДБАРА 
         Создаем общий контейнер с отступом и верхней границей здесь
      */}
      <div className="mt-auto p-4 border-t border-zinc-900 space-y-2">
        {/* Кнопка Профиля */}
        <AuthUI isCollapsed={isCollapsed} />

        {/* Кнопка Выхода (показываем только если есть юзер) */}
        {user && (
          <LogoutButton
            isCollapsed={isCollapsed}
            // Передаем классы, чтобы она выглядела точь-в-точь как профиль
            className={logoutStyles}
            // variant="secondary" можно убрать или оставить, className перекроет цвета
          />
        )}
        <UserInfoUI isCollapsed={isCollapsed} />
      </div>
    </aside>
  );
}
