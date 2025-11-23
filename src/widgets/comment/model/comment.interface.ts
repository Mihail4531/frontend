import { Comment } from "@/lib/types";

export interface PostCommentsProps {
  postId: number;
}

export interface UsePostCommentsResult {
  comments: Comment[];
  commentTree: Comment[]; // 👈 ДОБАВЬТЕ ЭТО ПОЛЕ
  isLoading: boolean;
  handleOptimisticAdd: (newComment: Comment) => void;
  handleDeleteComment: (commentId: number) => void;
}
