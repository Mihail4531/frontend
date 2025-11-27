"use client";

import { Clock, User} from "lucide-react";
import { Comment } from "../model/types";
import { MarkdownViewer } from "@/shared/ui/markdown-viewer";
// 👇 1. Импортируем UserPopover
import { UserPopover } from "@/entities/user/ui/user-popup"; 

interface Props {
  comment: Comment;
}

export const CommentCard = ({ comment }: Props) => {
  const user = comment.user;
  
  return (
    <div className="flex gap-4 group animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex-shrink-0 mt-1">
        {user ? (
            <UserPopover user={user}>
                <div className="w-10 h-10 rounded-full bg-zinc-800 ring-1 ring-white/10 overflow-hidden cursor-pointer hover:ring-red-500/50 transition-all">
                    {user.avatar_url ? (
                    <img 
                        src={user.avatar_url} 
                        alt={user.name} 
                        className="w-full h-full object-cover" 
                    />
                    ) : (
                    <User className="w-5 h-5 m-auto text-zinc-500 relative top-2" />
                    )}
                </div>
            </UserPopover>
        ) : (
            
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                <User className="w-5 h-5 text-zinc-600" />
            </div>
        )}
      </div>

       <div className="flex-1 min-w-0">
        {/* Шапка: Имя и Дата */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-zinc-200 font-bold text-sm hover:text-red-400 transition-colors cursor-pointer">
            {comment.user?.name || "Аноним"}
          </span>
          
          <span className="text-zinc-600 text-xs font-mono flex items-center gap-1">
            <Clock className="w-3 h-3 opacity-50" />
            {new Date(comment.created_at).toLocaleDateString("ru-RU", {
              day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
            })}
          </span>
        </div>

        <div className="bg-zinc-900/30 p-4 rounded-r-xl rounded-bl-xl border border-white/5">
          <MarkdownViewer content={comment.content} className="prose-sm prose-invert" />
        </div>
      </div>
    </div>
  );
};