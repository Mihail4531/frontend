import { Comment } from "../model/types";

export function buildCommentTree(comments: Comment[]): Comment[] {
  const map: Record<number, Comment> = {};
  const roots: Comment[] = [];
  
  // Копируем объекты, чтобы не мутировать исходный массив
  comments.forEach((c) => { 
    map[c.id] = { ...c, children: [] }; 
  });
  
  comments.forEach((c) => {
    const node = map[c.id];
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].children!.push(node);
    } else {
      roots.push(node);
    }
  });
  
  // Сортировка: новые сверху
  return roots.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}