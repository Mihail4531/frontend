import { $axios } from "@/shared/api";
import { Comment } from "../model/types";

export const commentApi = {
  // Получить комментарии (GET)
  getByPostId: async (postId: number): Promise<Comment[]> => {
    const { data } = await $axios.get(`/posts/${postId}/comments`);
    return Array.isArray(data) ? data : data.data;
  },

  // 👇 ДОБАВЛЯЕМ: Создать комментарий (POST)
  create: async (postId: number, content: string, parentId?: number | null): Promise<Comment> => {
    // Отправляем запрос на создание
    const { data } = await $axios.post<{ data: Comment }>(`/posts/${postId}/comments`, {
      content,
      parent_id: parentId,
    });
    // Возвращаем созданный объект (обычно бэкенд возвращает его в поле data)
    return data.data;
  },

  // Удалить комментарий (DELETE)
  delete: async (postId: number, commentId: number): Promise<void> => {
    await $axios.delete(`/posts/${postId}/comments/${commentId}`);
  },
};