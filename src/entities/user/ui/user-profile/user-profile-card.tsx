"use client";

import Link from "next/link";
import { Globe, Github, ShieldAlert, Edit3, ShieldCheck } from "lucide-react";
import { API_URL } from "@/shared/config";
import { ProfileUser } from "../../model/types";
import { UserAvatar } from "../user-avatar";
import { SocialLink } from "./social-link";
import { SkillTag } from "./skill-tag";

interface Props {
  user: ProfileUser;
  onEdit?: () => void;
}

const ROLE_LABELS: Record<string, string> = {
  admin: "Администратор",
  moderator: "Модератор",
  user: "Пользователь",
};

export const UserProfileCard = ({ user, onEdit }: Props) => {
  const primaryRole = user.roles?.[0] || "user";
  const displayRole = ROLE_LABELS[primaryRole] || primaryRole;
  const isAdmin = user.roles?.includes("admin");
  
  // Убираем лишние слэши для корректной ссылки
  const adminUrl = `${API_URL?.replace(/\/api\/?$/, "")}/admin`;

  return (
    <div className="group relative w-full max-w-4xl mx-auto bg-zinc-950 rounded-2xl md:rounded-3xl border border-zinc-800/60 overflow-hidden shadow-2xl">
      
      {/* --- 1. ШАПКА --- */}
      {/* h-32 на мобильном, h-48 на десктопе */}
      <div className="relative h-32 md:h-48 w-full bg-linear-to-r from-red-950 via-zinc-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        
        {/* Кнопки действий (справа сверху) */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2 md:gap-3 z-10">
          {isAdmin && (
            <Link
              href={adminUrl}
              className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-red-200 hover:bg-red-950/50 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              {/* Скрываем текст "Admin" на очень маленьких экранах, если нужно */}
              <span className="hidden xs:inline">Admin</span>
            </Link>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-1.5 md:p-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white hover:text-black transition-all"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* --- 2. КОНТЕНТ --- */}
      <div className="relative px-4 pb-6 md:px-10 md:pb-8">
        
        {/* Аватар + Имя */}
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 -mt-12 md:-mt-16 mb-6 md:mb-8">
          
          {/* Аватар: меняем размеры через классы w/h */}
          <div className="relative shrink-0 rounded-full p-1.5 bg-zinc-950 ring-1 ring-zinc-800 shadow-2xl">
            <UserAvatar 
              user={user} 
              // Принудительно задаем размеры: 28 (112px) на мобильном, 40 (160px) на ПК
              className="w-28 h-28 md:w-40 md:h-40 border-4 border-zinc-950 rounded-full" 
            />
            {/* Иконка статуса */}
            <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 bg-zinc-900 text-red-500 p-1 md:p-1.5 rounded-full border border-zinc-800 shadow-lg">
              {isAdmin ? (
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500 border-2 border-zinc-900" />
              )}
            </div>
          </div>

          {/* Текстовая информация */}
          <div className="flex-1 text-center md:text-left mb-2 space-y-1 min-w-0 w-full">
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight truncate">
              {user.name}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 text-sm font-medium text-zinc-400">
              <span className="truncate max-w-[200px]">
                @{user.email?.split('@')[0]}
              </span>
              <span className="hidden md:block w-1 h-1 rounded-full bg-zinc-700" />
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wide border ${isAdmin ? "bg-red-950/30 text-red-400 border-red-900/50" : "bg-zinc-800 text-zinc-500 border-zinc-700"}`}>
                {displayRole}
              </span>
            </div>
          </div>
        </div>

        {/* Сетка контента (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          
          {/* Левая часть: Обо мне + Навыки */}
          <div className="md:col-span-2 space-y-6 md:space-y-8">
            <div className="space-y-2 md:space-y-3">
              <h3 className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-wider">Обо мне</h3>
              {/* break-words важен, чтобы длинный текст без пробелов не рвал экран */}
              <p className="text-zinc-300 leading-relaxed text-base md:text-lg wrap-break-words">
                {user.bio || <span className="text-zinc-600 italic">Пользователь не добавил описание.</span>}
              </p>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              <h3 className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-wider">Навыки</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills?.length ? (
                  user.skills.map(s => <SkillTag key={s} label={s} />)
                ) : (
                  <p className="text-sm text-zinc-600">Навыки не указаны</p>
                )}
              </div>
            </div>
          </div>

          {/* Правая часть: Соцсети */}
          <div className="bg-zinc-900/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-zinc-800/50 h-fit space-y-4 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
              <SocialLink 
                icon={<Globe className="w-4 h-4 md:w-5 md:h-5" />} 
                label="Веб-сайт" 
                value={user.website} 
                isExternal 
              />
              <SocialLink 
                icon={<Github className="w-4 h-4 md:w-5 md:h-5" />} 
                label="GitHub" 
                value={user.github_username} 
                prefix="github.com/" 
                isExternal 
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};