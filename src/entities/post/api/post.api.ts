import { $axios } from "@/shared/api";
// 👇 Импортируем типы из МОДЕЛИ текущей сущности, а не из lib
import { Post, Tag } from "../model/types";

// Интерфейс фильтров лучше держать здесь или в model/types.ts
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
  getAllTags: async (): Promise<Tag[]> => {
    const response = await $axios.get<{ data: Tag[] }>("/tags");
    return response.data.data;
  },
   delete: async (id: number): Promise<void> => {
    await $axios.delete(`/posts/${id}`);
  },
};