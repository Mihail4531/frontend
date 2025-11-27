"use client";
import { Send, User as UserIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { Comment } from "@/entities/comment";
import { useAddComment } from "../model/useComment";

interface Props {
  postId: number;
  parentId?: number | null;
  onCommentAdded: (comment: Comment) => void;
  autoFocus?: boolean;
}

export const AddCommentForm = (props: Props) => {
  const { user, newComment, setNewComment, isSubmitting, handleSubmit } = useAddComment(props);

  if (!user) {
    return (
      <div className="mb-8 p-4 bg-zinc-900/30 rounded-xl border border-dashed border-white/10 text-center">
        <p className="text-zinc-400 text-sm mb-2">Войдите, чтобы комментировать</p>
        <Link href="/login" className="text-white text-xs underline">Войти</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-start mb-6">
      <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
        {user.avatar_url ? (
          <img src={user.avatar_url} className="w-full h-full object-cover" alt={user.name} />
        ) : (
          <UserIcon className="w-4 h-4 m-auto text-zinc-500 mt-2" />
        )}
      </div>
      <div className="flex-1 relative">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Напишите комментарий..."
          autoFocus={props.autoFocus}
          className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-zinc-200 text-sm focus:outline-none focus:border-white/30 min-h-[80px]"
        />
        <button
          disabled={isSubmitting || !newComment.trim()}
          className="absolute bottom-2 right-2 p-1.5 bg-white text-black rounded-md hover:bg-zinc-200 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
        </button>
      </div>
    </form>
  );
};