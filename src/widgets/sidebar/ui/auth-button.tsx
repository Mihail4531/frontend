"use client";

import { useRouter } from "next/navigation";
import { LogIn, User } from "lucide-react";
import { APP_ROUTE } from "@/shared/config";
import { useAuthStore } from "@/entities/session";

interface Props {
  isCollapsed: boolean;
  onNavigate?: () => void;
}
export const AuthButton = ({ isCollapsed, onNavigate }: Props) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const label = user ? "Профиль" : "Войти";
  const href = user ? APP_ROUTE.profile() : APP_ROUTE.auth.login();
  const Icon = user ? User : LogIn;
  const isLogin = !user;
  return (
    <button
      onClick={() => {
        router.push(href);
        onNavigate?.();
      }}
      className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all border ${
        isLogin
          ? "bg-red-600 hover:bg-red-500 text-white border-transparent shadow-lg shadow-red-900/20"
          : "bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700"
      }`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {!isCollapsed && <span className="font-medium">{label}</span>}
    </button>
  );
};