import { ProfileUser } from "@/entities/user";

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  views: number;
  is_approved: boolean;
  created_at: string;
  user?: ProfileUser;
  tags?: Tag[];
}
export type PostFilters = {
  tag?: string;
  sort?: "newest" | "oldest";
};