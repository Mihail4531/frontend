"use client";
import { useState } from "react";
import { Reply, Trash2 } from "lucide-react";
import { Comment, CommentCard } from "@/entities/comment"; 
import { AddCommentForm } from "@/features/add-comment"; 
import { useAuthStore } from "@/entities/session";

interface Props {
  comment: Comment;
  postId: number;
  onReply: (c: Comment) => void;
  onDelete: (id: number) => void;
}

export const CommentItem = ({ comment, postId, onReply, onDelete }: Props) => {
  const [isReplying, setIsReplying] = useState(false);
  const { user } = useAuthStore();

  const canDelete = user?.id === comment.user?.id || user?.roles?.includes("admin");

  const handleReplyAdded = (newComment: Comment) => {
    onReply(newComment);
    setIsReplying(false);
  };

  return (
    <div className="flex flex-col relative animate-in fade-in">
      <div className="group relative">
        <CommentCard comment={comment} />
        <div className="pl-14 mt-1 flex items-center gap-3">
          {user && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors"
            >
              <Reply className="w-3 h-3" />
              {isReplying ? "Отмена" : "Ответить"}
            </button>
          )}
          {canDelete && (
             <button
              onClick={() => onDelete(comment.id)}
              className="flex items-center gap-1 text-xs text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-3 h-3" /> Удалить
            </button>
          )}
        </div>
      </div>
      <div className="pl-14 mt-2 space-y-4">
        {isReplying && (
          <div className="relative">
            <div className="absolute left-[-18px] top-0 bottom-0 w-px bg-white/10" />
            <AddCommentForm 
                postId={postId} 
                parentId={comment.id} 
                onCommentAdded={handleReplyAdded} 
                autoFocus 
            />
          </div>
        )}
        {comment.children && comment.children.length > 0 && (
          <div className="border-l border-white/10 -ml-5 pl-5 space-y-6 pt-2">
            {comment.children.map((child) => (
              <CommentItem
                key={child.id}
                comment={child}
                postId={postId}
                onReply={onReply}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};