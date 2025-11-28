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
    if (!newComment.trim() || !user) return;

    const content = newComment;
    setIsSubmitting(true);

    try {
      // 1. Сначала отправляем запрос на сервер
      const realCommentFromServer = await commentApi.create(postId, content, parentId);

      // 2. Сервер вернул созданный объект с НАСТОЯЩИМ ID (например, id: 15)
      // Добавляем его в список на фронте
      onCommentAdded(realCommentFromServer);

      // 3. Очищаем форму только после успеха
      setNewComment(""); 
    } catch (error) {
      console.error("Ошибка отправки комментария", error);
      alert("Не удалось отправить комментарий");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { user, newComment, setNewComment, isSubmitting, handleSubmit };
};