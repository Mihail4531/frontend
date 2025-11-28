import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Comment, buildCommentTree, commentApi } from "@/entities/comment"; 

export const usePostComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  // Функция загрузки
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

  const handleAdd = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  // 👇 ГЛАВНОЕ ИСПРАВЛЕНИЕ ЗДЕСЬ 👇
  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("Удалить комментарий?")) return;
    
    // Оптимистичное удаление: убираем и родителя, и всех его детей сразу
    setComments((prev) => {
      // 1. Создаем набор ID для удаления
      const idsToDelete = new Set<number>();
      idsToDelete.add(commentId);

      // 2. Рекурсивная функция для поиска всех потомков в плоском списке
      const collectChildren = (parentId: number) => {
        prev.forEach((c) => {
          if (c.parent_id === parentId) {
            idsToDelete.add(c.id);
            collectChildren(c.id); // Ищем детей ребенка
          }
        });
      };

      // 3. Запускаем поиск
      collectChildren(commentId);

      // 4. Возвращаем список БЕЗ родителя и БЕЗ детей
      return prev.filter((c) => !idsToDelete.has(c.id));
    });
    
    try {
      // Отправляем на сервер только ID родителя.
      // Благодаря cascadeOnDelete сервер удалит и детей.
      await commentApi.delete(postId, commentId);
    } catch (err) {
      console.error(err);
      // Если ошибка — возвращаем данные с сервера
      fetchComments(false); 
      alert("Ошибка удаления");
    }
  };
  // 👆 КОНЕЦ ИСПРАВЛЕНИЯ 👆

  const commentTree = useMemo(() => buildCommentTree(comments), [comments]);
  
  return { 
    comments, 
    commentTree, 
    isLoading, 
    handleAdd, 
    handleDeleteComment 
  };
};