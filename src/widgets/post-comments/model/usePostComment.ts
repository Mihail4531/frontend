import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Comment, buildCommentTree, commentApi } from "@/entities/comment"; // ✅ Импорт API

export const usePostComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  const fetchComments = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setIsLoading(true);
      
      // 👇 Теперь вызов выглядит чисто
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

  const handleOptimisticAdd = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
    setTimeout(() => fetchComments(false), 1000);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("Удалить комментарий?")) return;
    
    // Оптимистичное удаление
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    
    try {
      // 👇 И здесь чисто
      await commentApi.delete(postId, commentId);
    } catch (err) {
      console.error(err);
      fetchComments(false); // Откат
      alert("Ошибка удаления");
    }
  };

  const commentTree = useMemo(() => buildCommentTree(comments), [comments]);

  return { 
    comments, 
    commentTree, 
    isLoading, 
    handleOptimisticAdd, 
    handleDeleteComment 
  };
};