import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import api from "@/api/config.api";
import { Comment } from "@/lib/types";
import { UsePostCommentsResult } from "./comment.interface";

// ... (функция buildCommentTree остается без изменений) ...
function buildCommentTree(comments: Comment[]): Comment[] {
  const map: Record<number, Comment> = {};
  const roots: Comment[] = [];
  comments.forEach((c) => { map[c.id] = { ...c, children: [] }; });
  comments.forEach((c) => {
    const node = map[c.id];
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].children!.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export const usePostComments = (postId: number): UsePostCommentsResult => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  // 👇 1. Храним ID комментариев, которые мы только что удалили
  // useRef сохраняет данные между рендерами и не вызывает перерисовку
  const pendingDeletions = useRef<Set<number>>(new Set());

  const fetchComments = useCallback(
    async (showLoader = false) => {
      try {
        if (showLoader) setIsLoading(true);
        const res = await api.get(`/posts/${postId}/comments`);
        const data = Array.isArray(res.data) ? res.data : res.data.data;

        if (isMounted.current) {
          // 👇 2. ФИЛЬТРАЦИЯ
          // Перед тем как обновить стейт, убираем из списка те комменты, 
          // которые мы сейчас удаляем (чтобы они не "мерцали" и не возвращались)
          const cleanData = data.filter((c: Comment) => !pendingDeletions.current.has(c.id));
          
          setComments(cleanData);
        }
      } catch (error) {
        console.error("Ошибка загрузки", error);
      } finally {
        if (showLoader && isMounted.current) setIsLoading(false);
      }
    },
    [postId],
  );

  useEffect(() => {
    isMounted.current = true;
    fetchComments(true);
    const intervalId = setInterval(() => {
      if (isMounted.current) fetchComments(false);
    }, 4000);
    return () => {
      isMounted.current = false;
      clearInterval(intervalId);
    };
  }, [fetchComments]);

  const handleOptimisticAdd = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
    setTimeout(() => fetchComments(false), 500);
  };

  const handleDeleteComment = async (commentId: number) => {
    // 👇 3. Добавляем ID в черный список
    pendingDeletions.current.add(commentId);

    // Мгновенно убираем из UI
    setComments((prev) => prev.filter((c) => c.id !== commentId));

    try {
      await api.delete(`/posts/${postId}/comments/${commentId}`);
      
      // После успешного удаления можно убрать из черного списка, 
      // так как в БД его уже нет и Polling его не вернет.
      // Но для надежности можно оставить, Set сам очистится при перезагрузке страницы.
    } catch (error) {
      console.error("Не удалось удалить комментарий", error);
      
      // 👇 4. Если ошибка (например, интернет пропал) - возвращаем коммент
      pendingDeletions.current.delete(commentId);
      fetchComments(false); // Перезапрашиваем список, чтобы вернуть всё как было
      alert("Ошибка при удалении");
    }
  };

  const commentTree = useMemo(() => buildCommentTree(comments), [comments]);

  return {
    comments,
    commentTree,
    isLoading,
    handleOptimisticAdd,
    handleDeleteComment,
  };
};