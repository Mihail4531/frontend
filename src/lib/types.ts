// src/lib/types.ts

export interface ProfileUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
   roles?: string[]; 
  permissions?: string[];
  avatar_url?: string | null;
  bio?: string | null;
  github_username?: string | null;
  twitter_handle?: string | null;
  website?: string | null;
  location?: string | null;
  skills?: string[] | null;
}
export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  image_url?: string;
  views: number;
  is_approved: boolean;
  created_at: string;
  user?: ProfileUser;
  tags?: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export type PostFilters = {
  tag?: string;
  sort?: "newest" | "oldest";
};
export interface Comment {
  id: number;
  content: string;
  created_at: string;
  parent_id?: number | null;
  
  // Используем Partial<ProfileUser>, чтобы TypeScript знал про bio, location и соцсети,
  // но не требовал email (который бэкенд может не слать в комментах)
  user?: Partial<ProfileUser> & { 
      id: number; 
      name: string; 
      avatar_url?: string | null 
      skills?: string[] | null;
     website?: string | null;
  };
  
  children?: Comment[];
}