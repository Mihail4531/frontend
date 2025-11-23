"use client";

import { useState } from "react";
import { Comment } from "@/lib/types";
import { CommentCard } from "@/entities/comment";
import { AddCommentForm } from "@/features/add-comment";
import { Reply, Trash2 } from "lucide-react"; // 👈 Добавили Trash2
import { useAuthStore } from "@/stores/auth-stores"; // 👈 Добавили стор

interface Props {
  comment: Comment;
  postId: number;
  onReply: (c: Comment) => void;
  onDelete: (id: number) => void; // 👈 Добавили обязательный проп
}

export const CommentItem = ({ comment, postId, onReply, onDelete }: Props) => {
  const [isReplying, setIsReplying] = useState(false);
  const { user } = useAuthStore(); // Получаем текущего пользователя

  // 👇 Логика прав: Автор ИЛИ Админ ИЛИ Модератор
  const canDelete =
    user?.id === comment.user?.id ||
    user?.roles?.includes("admin") ||
    user?.roles?.includes("moderator");

  const handleCommentAdded = (newComment: Comment) => {
    onReply(newComment);
    setIsReplying(false);
  };

  return (
    <div className="flex flex-col relative">
      {/* Область комментария */}
      <div className="relative group">
        <CommentCard comment={comment} />

        {/* Кнопки действий */}
        <div className="pl-14 mt-1 flex items-center gap-3">
          {/* Кнопка ОТВЕТИТЬ */}
          <button
            onClick={() => setIsReplying(!isReplying)}
            className={`
                    flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md transition-all duration-200
                    ${
                      isReplying
                        ? "text-red-400 bg-red-500/10"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                    }
                `}
          >
            <Reply className="w-3 h-3" />
            {isReplying ? "Отмена" : "Ответить"}
          </button>

          {/* 👇 Кнопка УДАЛИТЬ (Видна только если есть права) */}
          {canDelete && (
            <button
              onClick={() => {
                if (confirm("Удалить этот комментарий?")) {
                  onDelete(comment.id);
                }
              }}
              className="flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-3 h-3" />
              Удалить
            </button>
          )}
        </div>
      </div>

      {/* Ветка ответов */}
      <div className="pl-14 mt-2 space-y-4">
        {/* Форма ответа */}
        {isReplying && (
          <div className="pt-2 animate-in fade-in slide-in-from-top-2 relative">
            <div className="absolute left-[-18px] top-0 bottom-0 w-px bg-white/10" />
            <AddCommentForm
              postId={postId}
              parentId={comment.id}
              onCommentAdded={handleCommentAdded}
              autoFocus
            />
          </div>
        )}

        {/* Рекурсивный рендер детей */}
        {comment.children && comment.children.length > 0 && (
          <div className="relative border-l border-white/10 ml-[-20px] pl-5 space-y-6 pt-2">
            {comment.children.map((child) => (
              <CommentItem
                key={child.id}
                comment={child}
                postId={postId}
                onReply={onReply}
                onDelete={onDelete} // 👈 ВАЖНО: Прокидываем функцию дальше детям
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};