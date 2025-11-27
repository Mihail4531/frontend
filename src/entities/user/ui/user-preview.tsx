"use client";

import { ProfileUser } from "../model/types";
import { UserAvatar } from "./user-avatar";

interface UserPreviewProps {
  user: ProfileUser;
  minimized?: boolean; 
}

export const UserPreview = ({ user, minimized }: UserPreviewProps) => {
  return (
    <div className="flex items-center gap-3 w-full group">
      <UserAvatar 
        user={user} 
        size="md" 
        className="ring-2 ring-transparent group-hover:ring-red-500/30 transition-all rounded-full"
      />

      {!minimized && (
        <div className="overflow-hidden flex flex-col justify-center">
          <p className="font-bold text-zinc-200 truncate text-sm leading-tight group-hover:text-white transition-colors">
            {user.name}
          </p>
          <p className="text-xs text-zinc-500 truncate">
            {user.email || "Пользователь"}
          </p>
        </div>
      )}
    </div>
  );
};