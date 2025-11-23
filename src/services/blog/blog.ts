import api from "@/api/config.api";
import { Post, PostFilters, Tag } from "@/lib/types";
import { API_ROUTE } from "@/lib/routes/api.route";

export const postApi = {
  // Создание поста
  create: async (data: FormData): Promise<Post> => {
    const response = await api.post<{ data: Post }>(
      API_ROUTE.posts.create(),
      data,
      { withCredentials: true },
    );
    return response.data.data;
  },

  // Мои посты
  getMyPosts: async (): Promise<Post[]> => {
    const response = await api.get<{ data: Post[] }>("/my-posts");
    return response.data.data;
  },

  // 👇 2. ОБНОВЛЕНО: Принимаем фильтры и формируем URL
  getAll: async (filters?: PostFilters): Promise<Post[]> => {
    const params = new URLSearchParams();

    // Если есть тег или сортировка — добавляем в параметры запроса
    if (filters?.tag) params.append("tag", filters.tag);
    if (filters?.sort) params.append("sort", filters.sort);

    const queryString = params.toString();
    // Получится: /api/posts?tag=laravel&sort=oldest
    const url = queryString
      ? `${API_ROUTE.posts.index()}?${queryString}`
      : API_ROUTE.posts.index();

    const response = await api.get<{ data: Post[] }>(url);
    return response.data.data;
  },

  // Получить один пост
  getBySlug: async (slug: string): Promise<Post> => {
    const response = await api.get<{ data: Post }>(API_ROUTE.posts.show(slug));
    return response.data.data;
  },

  // 👇 3. НОВОЕ: Получить список всех тегов (для меню фильтров)
  getAllTags: async (): Promise<Tag[]> => {
    // Убедитесь, что в Laravel есть роут Route::get('/tags', ...)
    const response = await api.get<{ data: Tag[] }>("/tags");
    return response.data.data;
  },
};
