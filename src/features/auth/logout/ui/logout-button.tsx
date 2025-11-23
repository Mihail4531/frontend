"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-stores";
import { Button } from "@/shared/ui";

// 1. Добавляем интерфейс пропсов
interface LogoutButtonProps {
  className?: string; // Чтобы принимать стили снаружи
  isCollapsed?: boolean; // Чтобы знать, скрывать текст или нет
  variant?: "primary" | "secondary" | "danger"; // Чтобы менять цвет
}

export const LogoutButton = ({
  className = "",
  isCollapsed = false,
  variant = "danger", // По умолчанию красная, но можно переопределить
}: LogoutButtonProps) => {
  const [loading, setLoading] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleLogout}
      isLoading={loading}
      // 2. Пробрасываем className в базовую кнопку
      className={`${className} ${isCollapsed ? "px-2 justify-center" : ""}`}
      title="Выйти"
    >
      {/* Иконка выхода */}
      <svg
        className="w-5 h-5 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>

      {/* 3. Прячем текст, если сайдбар свернут */}
      {!isCollapsed && <span>Выйти</span>}
    </Button>
  );
};
