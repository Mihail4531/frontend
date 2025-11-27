import { useState } from "react";
import { Comment, commentApi } from "@/entities/comment"; 
import { useAuthStore } from "@/entities/session";

interface UseAddCommentProps {
  postId: number;
  parentId?: number | null;
  onCommentAdded: (comment: Comment) => void;
}

export const useAddComment = ({ postId, parentId, onCommentAdded }: UseAddCommentProps) => {
  const { user } = useAuthStore();
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Проверка: если текста нет или юзер не залогинен — выходим
    if (!newComment.trim() || !user) return;

    const content = newComment;
    setNewComment(""); 
    setIsSubmitting(true);

    // 1. Оптимистичное добавление
    const tempComment: Comment = {
      id: Date.now(), 
      content: content,
      created_at: new Date().toISOString(),
      parent_id: parentId || null,
      
      // 👇 ИСПРАВЛЕНИЕ ЗДЕСЬ
      // Мы берем ВСЕ поля из текущего user (включая email, roles и т.д.),
      // чтобы удовлетворить типы TypeScript.
      user: { ...user }, 
      
      children: [],
    };

    onCommentAdded(tempComment);

    try {
      await commentApi.create(postId, content, parentId);
    } catch (error) {
      console.error("Ошибка отправки комментария", error);
      alert("Не удалось отправить комментарий");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { user, newComment, setNewComment, isSubmitting, handleSubmit };
};