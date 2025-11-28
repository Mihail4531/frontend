import { $axios } from "@/shared/api";
import { Post, Tag, UpdatePostData } from "../model/types";

export interface PostFilters {
  tag?: string;
  sort?: "newest" | "oldest";
}

export const postApi = {
  create: async (data: FormData): Promise<Post> => {
    const response = await $axios.post<{ data: Post }>("/posts", data);
    return response.data.data;
  },

  getMyPosts: async (): Promise<Post[]> => {
    const response = await $axios.get<{ data: Post[] }>("/my-posts");
    return response.data.data;
  },

  getAll: async (filters?: PostFilters): Promise<Post[]> => {
    const response = await $axios.get<{ data: Post[] }>("/posts", {
      params: {
        tag: filters?.tag,
        sort: filters?.sort,
      },
    });
    return response.data.data;
  },

  getBySlug: async (slug: string): Promise<Post> => {
    const response = await $axios.get<{ data: Post }>(`/posts/${slug}`);
    return response.data.data;
  },

  // 👇 ДОБАВЛЯЕМ ВОТ ЭТОТ МЕТОД
  getById: async (id: number): Promise<Post> => {
    // Laravel контроллер (метод show) у тебя настроен на поиск "slug OR id",
    // так что этот запрос сработает корректно
    const response = await $axios.get<{ data: Post }>(`/posts/${id}`);
    return response.data.data;
  },

  getAllTags: async (): Promise<Tag[]> => {
    const response = await $axios.get<{ data: Tag[] }>("/tags");
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await $axios.delete(`/posts/${id}`);
  },

  update: async (id: number, data: UpdatePostData): Promise<Post> => {
    const response = await $axios.put<{ data: Post }>(`/posts/${id}`, data);
    return response.data.data;
  },
};