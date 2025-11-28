import { $axios } from "@/shared/api";
import { Comment } from "../model/types";

export const commentApi = {
  getByPostId: async (postId: number): Promise<Comment[]> => {
    const { data } = await $axios.get(`/posts/${postId}/comments`);
    return Array.isArray(data) ? data : data.data;
  },

  create: async (postId: number, content: string, parentId?: number | null): Promise<Comment> => {
    const { data } = await $axios.post<{ data: Comment }>(`/posts/${postId}/comments`, {
      content,
      parent_id: parentId,
    });
    return data.data;
  },


 delete: async (postId: number, commentId: number) => {
    await $axios.delete(`/comments/${commentId}`);
},
};