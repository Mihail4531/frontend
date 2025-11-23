import { create } from "zustand";
import api from "@/api/config.api";
import { API_ROUTE } from "@/lib/routes/api.route";
import { ProfileUser } from "@/lib/types";

interface AuthState {
  user: ProfileUser | null;
  loading: boolean;

  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  updateProfile: (formData: FormData) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get<ProfileUser>(API_ROUTE.user.me(), {
        withCredentials: true,
      });
      set({ user: data, loading: false });
    } catch (error) {
      console.log(error);
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    try {
      await api.post(API_ROUTE.auth.logout(), {}, { withCredentials: true });
    } catch (error) {
      console.log(error);
    } finally {
      set({ user: null, loading: false });
    }
  },

  refresh: async () => {
    // Просто вызываем fetchUser, но можно сделать вариант без loading: true,
    // если нужно тихое обновление (background revalidation)
    await get().fetchUser();
  },

  updateProfile: async (formData: FormData) => {
    // 1. УБИРАЕМ set({ loading: true }), чтобы интерфейс не пропадал.
    // Локальный лоадер (isSubmitting) есть внутри формы.

    try {
      // Отправляем данные
      await api.post(API_ROUTE.profile.update(), formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 2. ВАЖНО: Не используем ответ от POST для установки юзера.
      // Вместо этого перезапрашиваем свежие данные через fetchUser.
      // Это гарантирует, что аватар и все поля будут синхронизированы с БД.
      await get().fetchUser();
    } catch (error) {
      // loading: false здесь не нужен, так как мы его не включали
      throw error;
    }
  },
}));

export const initializeAuth = () => {
  useAuthStore.getState().fetchUser();
};
