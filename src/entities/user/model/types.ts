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
  website?: string | null;
  skills?: string[] | null;
}
export const ROLE_LABELS: Record<string, string> = {
  admin: 'Администратор',
  moderator: 'Модератор',
  user: 'Пользователь',
};