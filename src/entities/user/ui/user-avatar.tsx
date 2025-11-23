"use client";

import { ProfileUser } from "@/lib/types"; // Укажите правильный путь к типам

interface Props {
  user: ProfileUser;
  size?: "sm" | "lg";
  isEditing?: boolean; // Режим редактирования
  previewUrl?: string | null; // Временная ссылка (blob) для предпросмотра
  onFileChange?: (file: File) => void; // Колбэк при выборе файла
}

export const UserAvatar = ({
  user,
  size = "lg",
  isEditing = false,
  previewUrl,
  onFileChange,
}: Props) => {
  // Если есть превью (выбрали новый файл), показываем его. Иначе - с бэкенда. Иначе - генератор.
  const src =
    previewUrl ||
    user.avatar_url ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`;

  const sizeClasses =
    size === "lg" ? "w-32 h-32 border-4" : "w-10 h-10 border-2";

  return (
    <div className="relative group mx-auto w-fit">
      {/* Сам круг аватара */}
      <div
        className={`${sizeClasses} rounded-full overflow-hidden border-gray-900 bg-gray-800 shadow-xl relative z-10`}
      >
        <img src={src} alt={user.name} className="w-full h-full object-cover" />
      </div>

      {/* Слой редактирования (появляется только если isEditing=true) */}
      {isEditing && (
        <label className="absolute bottom-0 right-0 z-20 cursor-pointer hover:scale-110 transition-transform">
          <div className="bg-red-600 text-white p-2 rounded-full shadow-lg border-2 border-gray-900 hover:bg-red-500 transition">
            {/* Иконка камеры */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          {/* Скрытый инпут файла */}
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
