"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/entities/session";
import { Button } from "@/shared/ui";

// 1. Добавляем интерфейс пропсов
interface LogoutButtonProps {
  className?: string; 
  isCollapsed?: boolean; 
  variant?: "primary" | "secondary" | "danger"; 
}

export const LogoutButton = ({
  className = "",
  isCollapsed = false,
  variant = "danger", 
}: LogoutButtonProps) => {
  const [loading, setLoading] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleLogout}
      isLoading={loading}
    
      className={`${className} ${isCollapsed ? "px-2 justify-center" : ""}`}
      title="Выйти"
    >

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
      {!isCollapsed && <span>Выйти</span>}
    </Button>
  );
};
