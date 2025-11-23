"use client";

import { Send, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { Comment } from "@/lib/types";
import { useAddComment } from "../model/useComment"; // Убедитесь, что путь совпадает с названием файла

interface Props {
  postId: number;
  parentId?: number | null; // 👈 1. Добавили ID родителя (опционально)
  onCommentAdded: (comment: Comment) => void;
  autoFocus?: boolean; // 👈 2. Добавили автофокус (для удобства при ответе)
}

export const AddCommentForm = (props: Props) => {
  // Передаем все пропсы (включая parentId) в хук
  const { user, newComment, setNewComment, isSubmitting, handleSubmit } =
    useAddComment(props);

  if (!user) {
    return (
      <div className="mb-12 p-8 bg-zinc-900/30 rounded-2xl border border-dashed border-white/10 text-center">
        <p className="text-zinc-400 mb-4">
          Войдите в аккаунт, чтобы присоединиться к обсуждению
        </p>
        <Link
          href="/login"
          className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors inline-block"
        >
          Войти
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-12 flex gap-4 items-start animate-in fade-in duration-500"
    >
      <div className="w-10 h-10 rounded-full bg-zinc-800 flex-shrink-0 overflow-hidden ring-1 ring-white/10">
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            className="w-full h-full object-cover"
            alt={user.name}
          />
        ) : (
          <User className="w-5 h-5 m-auto text-zinc-500 mt-2.5" />
        )}
      </div>

      <div className="flex-1 relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-zinc-500/20 rounded-xl opacity-0 group-focus-within:opacity-100 transition duration-500 blur" />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Напишите комментарий..."
          // 👇 3. Привязываем автофокус
          autoFocus={props.autoFocus}
          className="relative w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-zinc-200 focus:outline-none focus:border-white/20 placeholder:text-zinc-600 min-h-[100px] resize-y transition-all font-mono text-sm"
        />
        <button
          disabled={isSubmitting || !newComment.trim()}
          className="absolute bottom-3 right-3 p-2 bg-white text-black rounded-lg hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-white/5"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
    </form>
  );
};
