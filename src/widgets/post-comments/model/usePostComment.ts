import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Comment, buildCommentTree, commentApi } from "@/entities/comment"; 

export const usePostComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  // Функция загрузки (оставляем как есть)
  const fetchComments = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setIsLoading(true);
      const data = await commentApi.getByPostId(postId);
      if (isMounted.current) {
        setComments(data);
      }
    } catch (error) {
      console.error("Ошибка загрузки комментариев:", error);
    } finally {
      if (showLoader && isMounted.current) setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    isMounted.current = true;
    fetchComments(true);
    return () => { isMounted.current = false; };
  }, [fetchComments]);

  // 👇 ИСПРАВЛЕНИЕ ЗДЕСЬ
  const handleAdd = (newComment: Comment) => {
    // Просто добавляем новый комментарий (у которого уже есть настоящий ID) в список
    // setTimeout и повторный fetch не нужны!
    setComments((prev) => [newComment, ...prev]);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("Удалить комментарий?")) return;
    
    // Оптимистичное удаление (сразу убираем из UI)
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    
    try {
      await commentApi.delete(postId, commentId);
    } catch (err) {
      console.error(err);
      // Если удаление не удалось — возвращаем комментарии с сервера
      fetchComments(false); 
      alert("Ошибка удаления");
    }
  };

  const commentTree = useMemo(() => buildCommentTree(comments), [comments]);
  
  return { 
    comments, 
    commentTree, 
    isLoading, 
    handleAdd, 
    handleDeleteComment 
  };
};