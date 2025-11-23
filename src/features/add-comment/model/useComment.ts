import { useState } from "react";
import { useAuthStore } from "@/stores/auth-stores";
import api from "@/api/config.api";
import { Comment } from "@/lib/types";

interface UseAddCommentProps {
  postId: number;
  parentId?: number | null; // 👈 1. Добавляем parentId в пропсы
  onCommentAdded: (comment: Comment) => void;
}

export const useAddComment = ({
  postId,
  parentId,
  onCommentAdded,
}: UseAddCommentProps) => {
  const { user } = useAuthStore();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const content = newComment;
    setNewComment("");
    setIsSubmitting(true);

    // Optimistic UI Logic
    const tempComment: Comment = {
      id: Date.now(),
      content: content,
      created_at: new Date().toISOString(),
      // 👇 2. Добавляем parent_id в оптимистичный объект,
      // чтобы функция buildCommentTree сразу знала, куда его положить
      parent_id: parentId || null,
      user: { id: user.id, name: user.name, avatar_url: user.avatar_url },
    };

    onCommentAdded(tempComment);

    try {
      // 👇 3. Отправляем parent_id на бэкенд
      await api.post(`/posts/${postId}/comments`, {
        content,
        parent_id: parentId,
      });
    } catch (error) {
      console.error("Ошибка отправки", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    user,
    newComment,
    setNewComment,
    isSubmitting,
    handleSubmit,
  };
};
