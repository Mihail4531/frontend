"use client";

import { useRouter } from "next/navigation";
import { LogIn, User } from "lucide-react";
import { APP_ROUTE } from "@/lib/routes/app.route";
import { useAuthStore } from "@/stores/auth-stores";

interface AuthUIProps {
  isCollapsed: boolean;
}

export default function AuthUI({ isCollapsed }: AuthUIProps) {
  const { user } = useAuthStore();
  const router = useRouter();

  const label = user ? "Профиль" : "Войти";
  const href = user ? APP_ROUTE.profile() : APP_ROUTE.auth.login();
  const Icon = user ? User : LogIn;
  const isLogin = !user;

  // УБРАЛИ ВНЕШНИЙ DIV c border-t и padding.
  // Теперь компонент возвращает чистую кнопку.
  return (
    <button
      onClick={() => router.push(href)}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all border ${
        isLogin
          ? "bg-red-600 hover:bg-red-500 text-white border-transparent shadow-lg shadow-red-900/20"
          : "bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700"
      }`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!isCollapsed && <span className="font-medium">{label}</span>}
    </button>
  );
}
