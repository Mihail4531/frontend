"use client";

import { useState, useEffect } from "react";
import { Post, postApi } from "@/entities/post";
import Link from "next/link";
import { APP_ROUTE } from "@/shared/config";
// 👇 1. Добавили иконку Flag
import { Calendar, User, Trash2, Loader2, Clock, Pencil, Flag } from "lucide-react";
import { UserPopover } from "@/entities/user/ui/user-popup";
import { useAuthStore } from "@/entities/session";
// 👇 2. Импортируем фичу (Виджет имеет право знать о фичах)
import { ReportModal } from "@/features/report-post/ui/report-modal";

interface PostCardProps {
  post: Post;
  onDelete?: (postId: number) => void;
}

export const PostCard = ({ post, onDelete }: PostCardProps) => {
  const { user } = useAuthStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // 👇 3. Состояние для открытия модалки
  const [isReportOpen, setIsReportOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const postLink = APP_ROUTE?.blog?.show(post.slug) || `/blog/${post.slug}`;
  const isOwner = post.user && user?.id === post.user.id;
  const canEdit = isOwner && !post.is_approved;
  const editLink = `/blog/edit/${post.id}`; 

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Вы уверены, что хотите удалить этот пост?")) return;
    try {
      setIsDeleting(true);
      await postApi.delete(post.id);

      if (onDelete) {
        onDelete(post.id);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Не удалось удалить пост");
    } finally {
      setIsDeleting(false);
    }
  };

  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "");
  };
  const excerpt = stripHtml(post.content).substring(0, 180).trim() + "...";
  
  return (
    <article className="group relative flex flex-col bg-zinc-900/20 border border-white/5 rounded-xl p-6 hover:bg-zinc-900/40 hover:border-white/10 transition-all duration-300">

      {post.is_approved ? (
        <Link href={postLink} className="absolute inset-0 z-0" aria-label={post.title} />
      ) : (
        <div className="absolute inset-0 z-0 cursor-default" />
      )}

      {!post.is_approved && (
        <div className="absolute top-4 left-4 z-30 pointer-events-none">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-mono font-medium uppercase rounded-md border border-yellow-500/20 backdrop-blur-sm">
            <Clock className="w-3 h-3" />
            Check
          </span>
        </div>
      )}

      {isMounted && (
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          
          {/* 👇 4. КНОПКА ПОЖАЛОВАТЬСЯ */}
          {/* Показываем, если юзер авторизован И это не его собственный пост */}
          {user && !isOwner && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsReportOpen(true);
              }}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/80 backdrop-blur-sm border border-white/10 text-zinc-500 hover:text-red-400 hover:bg-zinc-700 transition-all cursor-pointer shadow-lg"
              title="Пожаловаться"
            >
              <Flag className="w-4 h-4" />
            </button>
          )}

          {canEdit && (
            <Link
              href={editLink}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/80 backdrop-blur-sm border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all cursor-pointer shadow-lg"
              title="Редактировать"
            >
              <Pencil className="w-4 h-4" />
            </Link>
          )}
          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/80 backdrop-blur-sm border border-white/10 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 transition-all cursor-pointer shadow-lg"
              title="Удалить пост"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      )}

      <div className="flex gap-2 overflow-hidden mb-4 mt-6 relative z-10 pointer-events-none">
        {post.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag.id}
            className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors duration-300 text-zinc-500 bg-white/5 border-white/5 group-hover:text-red-400 group-hover:bg-red-500/10  group-hover:border-red-500/20"
          >
            #{tag.name}
          </span>
        ))}
      </div>
      
      <div className="mb-3 group-hover:translate-x-1 transition-transform duration-300 relative z-10 pointer-events-none">
        <h3 className="text-xl font-bold text-zinc-100 leading-tight tracking-tight group-hover:text-red-400 transition-colors pr-6">
          {post.title}
        </h3>
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1 relative z-10 pointer-events-none">
        {excerpt}
      </p>
      <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono relative z-10">
        <div className="flex items-center gap-2 relative z-20 pointer-events-auto">
          {post.user ? (
            <UserPopover user={post.user}>
              <div className="flex items-center gap-2 cursor-pointer group/author">
                <div className="w-6 h-6 rounded-full bg-zinc-800 ring-1 ring-white/10 overflow-hidden flex items-center justify-center group-hover/author:ring-red-500/50 transition-all">
                  {post.user.avatar_url ? (
                    <img src={post.user.avatar_url} alt={post.user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-3 h-3 text-zinc-500" />
                  )}
                </div>
                <span className="text-zinc-400 group-hover/author:text-zinc-300 transition-colors">
                  {post.user.name}
                </span>
              </div>
            </UserPopover>
          ) : (
            <div className="flex items-center gap-2 opacity-50">
               <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center">
                  <User className="w-3 h-3 text-zinc-600" />
               </div>
               <span>Аноним</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 pointer-events-none">
          <div className="flex items-center gap-1.5 opacity-70">
            <Calendar className="w-3 h-3" />
            <span suppressHydrationWarning>
              {new Date(post.created_at).toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
            </span>
          </div>
        </div>
      </div>

      {/* 👇 5. Вставляем модалку в конец компонента */}
      <ReportModal 
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        postId={post.id}
      />
      
    </article>
  );
};