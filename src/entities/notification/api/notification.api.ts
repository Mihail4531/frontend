import { $axios } from "@/shared/api";
import { Notification } from "../model/types";

export const notificationApi = {
  // Получить список уведомлений
  getAll: async (): Promise<Notification[]> => {
    const { data } = await $axios.get('/notifications');
    // Laravel Resource Collection обычно возвращает { data: [...] }
    return Array.isArray(data) ? data : data.data;
  },

  // Пометить как прочитанное
  markAsRead: async (id: string): Promise<void> => {
    await $axios.post(`/notifications/${id}/read`);
  },
};