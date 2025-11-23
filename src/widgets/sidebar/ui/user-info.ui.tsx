"use client";

import { useAuthStore } from "@/stores/auth-stores";
import Link from "next/link";

interface Props {
  isCollapsed: boolean;
}

export default function UserInfoUI({ isCollapsed }: Props) {
  const { user, loading } = useAuthStore();

  // Пока грузится или юзера нет — показываем красивый скелетон
  if (loading || !user) {
    return (
      <div className="p-4 border-t border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-800 rounded-full animate-pulse" />
          {!isCollapsed && (
            <div className="space-y-2">
              <div className="h-4 bg-zinc-800 rounded w-32 animate-pulse" />
              <div className="h-3 bg-zinc-700 rounded w-20 animate-pulse" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Защита от пустого имени
  const displayName = user.name?.trim() || "User";
  const firstLetter = displayName[0].toUpperCase();

  return (
    <Link
      href="/profile"
      className="block p-4 border-t border-zinc-900 hover:bg-zinc-900 transition"
    >
      <div className="flex items-center gap-3">
        {/* Аватарка */}
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white font-black text-lg shadow-xl">
            {firstLetter}
          </div>
        )}

        {/* Имя + статус */}
        {!isCollapsed && (
          <div>
            <p className="font-bold text-white truncate max-w-48">
              {displayName}
            </p>
            <p className="text-xs text-zinc-500">Авторизован</p>
          </div>
        )}
      </div>
    </Link>
  );
}
