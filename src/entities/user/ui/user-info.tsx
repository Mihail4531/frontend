"use client";

import { ProfileUser } from "@/lib/types";
import { UserAvatar } from "./user-avatar";
import { API_URL } from "@/lib/constants";
import { 
  MapPin, 
  Globe, 
  Github, 
  Twitter, 
  ShieldAlert, 
  Edit3, 
  ShieldCheck 
} from "lucide-react";

interface Props {
  user: ProfileUser;
  onEdit?: () => void;
}

const ROLE_LABELS: Record<string, string> = {
  admin: 'Администратор',
  moderator: 'Модератор',
  user: 'Пользователь',
};

export const UserInfo = ({ user, onEdit }: Props) => {
  // 1. Логика ролей
  const primaryRole = user.roles?.[0] || 'user';
  const displayRole = ROLE_LABELS[primaryRole] || primaryRole;
  
  // 2. Исправленное определение админа
  const isAdmin = user.roles?.includes('admin');

  // 3. Ссылка на админку (убираем /api и слэш на конце, если есть)
  const adminUrl = `${API_URL.replace(/\/api\/?$/, "")}/admin`;

  return (
    <div className="w-full bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
      
      {/* --- ШАПКА ПРОФИЛЯ --- */}
      <div className="relative w-full bg-gradient-to-r from-red-900 via-red-800 to-red-950 p-6 md:p-8">
        {/* Шум на фоне */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Аватар и Имя */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="ring-4 ring-white/10 rounded-full shadow-xl bg-black">
              <UserAvatar user={user} size="lg" />
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {user.name}
              </h1>
              <p className="text-red-200 font-medium">{user.email}</p>

              {/* Бейджик роли */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold bg-black/40 text-red-100 border border-red-500/30 uppercase tracking-wide mt-1">
                  {isAdmin && <ShieldCheck className="w-3 h-3" />}
                  {displayRole}
              </span>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-wrap justify-center gap-3">
            {isAdmin && (
              <a
                href={adminUrl}
                className="flex items-center gap-2 bg-red-950/40 hover:bg-red-900/60 text-white border border-red-400/20 font-semibold py-2.5 px-5 rounded-lg shadow-sm transition hover:scale-105"
              >
                <ShieldAlert className="w-5 h-5" />
                Admin Panel
              </a>
            )}

            {onEdit && (
              <button
                onClick={onEdit}
                className="flex items-center gap-2 bg-white text-red-950 hover:bg-gray-100 font-bold py-2.5 px-6 rounded-lg shadow-lg transition transform hover:scale-105 active:scale-95"
              >
                <Edit3 className="w-4 h-4" />
                Редактировать
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- ИНФОРМАЦИЯ --- */}
      <div className="p-6 md:p-8 bg-gray-900">
        <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-gray-800">
          Персональная информация
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          <InfoItem label="Полное имя" value={user.name} />
          <InfoItem label="Email адрес" value={user.email} />
          
          <InfoItem label="Биография" value={user.bio} fullWidth />

          <InfoItem
            label="Локация"
            value={user.location}
            icon={<MapPin className="w-5 h-5" />}
          />

          <InfoItem
            label="Веб-сайт"
            value={user.website}
            isLink
            icon={<Globe className="w-5 h-5" />}
          />

          <InfoItem
            label="GitHub"
            value={user.github_username}
            isLink
            prefix="github.com/"
            icon={<Github className="w-5 h-5" />}
          />
          
          <InfoItem
            label="Twitter / X"
            value={user.twitter_handle}
            isLink
            prefix="@"
            icon={<Twitter className="w-5 h-5" />}
          />

          {/* Навыки */}
          <div className="md:col-span-2 pt-4 border-t border-gray-800/50 mt-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
              Навыки и технологии
            </p>
            {user.skills && user.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-750 text-gray-200 border border-gray-700 rounded-lg text-sm font-medium transition cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic text-sm">Навыки не указаны</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Вспомогательный компонент (чистый и аккуратный) ---
interface InfoItemProps {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  isLink?: boolean;
  prefix?: string;
}

const InfoItem = ({ label, value, icon, fullWidth, isLink, prefix }: InfoItemProps) => {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
        {label}
      </p>
      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-950/50 border border-gray-800/50 hover:border-gray-700 transition-colors">
        {icon && <div className="text-red-500">{icon}</div>}

        <div className="flex-1 overflow-hidden">
          {value ? (
            isLink ? (
              <a
                href={value.startsWith("http") ? value : `https://${value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-red-400 hover:text-red-300 truncate transition block"
              >
                {prefix}
                {value.replace(/^https?:\/\//, "")}
              </a>
            ) : (
              <p className="text-base font-medium text-gray-200 leading-relaxed break-words">
                {value}
              </p>
            )
          ) : (
            <span className="text-gray-600 italic text-sm">—</span>
          )}
        </div>
      </div>
    </div>
  );
};