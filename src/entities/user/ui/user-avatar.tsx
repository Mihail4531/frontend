"use client";

import { ProfileUser } from "../model/types";
import { Camera } from "lucide-react";

interface UserAvatarProps {
  user: Partial<ProfileUser>;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  isEditing?: boolean;
  previewUrl?: string | null;
  onFileChange?: (file: File) => void;
}

// Размеры по умолчанию, если не переданы свои классы
const SIZE_CLASSES = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
};

export const UserAvatar = ({
  user,
  size = "md",
  className = "",
  isEditing = false,
  previewUrl,
  onFileChange,
}: UserAvatarProps) => {
  const src =
    previewUrl ||
    user.avatar_url ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${user.name || "User"}`;

  return (
    // 1. Применяем размер (SIZE_CLASSES) и кастомные классы (className) к ОДНОМУ элементу (родителю)
    <div className={`relative group shrink-0 ${SIZE_CLASSES[size]} ${className}`}>
      
      {/* 2. Внутренний контейнер просто заполняет всё пространство (w-full h-full) */}
      <div className="w-full h-full rounded-full overflow-hidden border border-white/10 bg-zinc-800 shadow-lg relative z-10">
        <img 
          src={src} 
          alt={user.name || "Avatar"} 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Кнопка загрузки фото */}
      {isEditing && (
        <label className="absolute bottom-0 right-0 z-20 cursor-pointer transition-transform hover:scale-110 active:scale-95">
          <div className="flex items-center justify-center bg-red-600 text-white p-1.5 md:p-2 rounded-full shadow-lg ring-2 ring-zinc-950 hover:bg-red-500 transition-colors">
            <Camera className="w-3 h-3 md:w-4 md:h-4" />
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files?.[0] && onFileChange?.(e.target.files[0])
            }
          />
        </label>
      )}
    </div>
  );
};