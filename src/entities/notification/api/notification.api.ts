import { $axios } from "@/shared/api";
import { Notification } from "../model/types";

export const notificationApi = {

  getAll: async (): Promise<Notification[]> => {
    const { data } = await $axios.get('/notifications');

    return Array.isArray(data) ? data : data.data;
  },

 
  markAsRead: async (id: string): Promise<void> => {
    await $axios.post(`/notifications/${id}/read`);
  },
    delete: async (id: string): Promise<void> => {
    await $axios.delete(`/notifications/${id}`);
  },
};