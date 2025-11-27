import { ProfileUser } from "@/entities/user";

export interface Comment {
id: number;
content: string;
created_at: string;
parent_id?: number | null;
  user?: ProfileUser;
  children?: Comment[];
}