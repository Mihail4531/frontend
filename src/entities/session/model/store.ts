import { create } from "zustand";
import { $axios, authApi } from "@/shared/api"
import { ProfileUser } from "@/entities/user";
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
      const { data } = await authApi.getMe();
      set({ user: data, loading: false });
    } catch  {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error(error);
    } finally {
      set({ user: null, loading: false });
    }
  },
   refresh: async () => {
    await get().fetchUser();
  },
  updateProfile: async (formData: FormData) => {
    try {
      await $axios.post("/profile", formData);
      await get().fetchUser();
    } catch (error) {
      throw error;
    }
  },
}));
