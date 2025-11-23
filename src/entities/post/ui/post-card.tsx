"use client";

import { Post } from "@/lib/types";
import Link from "next/link";
import { APP_ROUTE } from "@/lib/routes/app.route";
import { Calendar, ArrowUpRight, User } from "lucide-react";

export const PostCard = ({ post }: { post: Post }) => {
  const postLink = APP_ROUTE.blog.show(post.slug);

  // 👇 ИСПРАВЛЕНО: Убрали зависимость от document.
  // Теперь логика одинаковая и на сервере, и на клиенте.
  const stripHtml = (html: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "");
  };

  const excerpt = stripHtml(post.content).substring(0, 180).trim() + "...";

  return (
    <Link
      href={postLink}
      className="group relative flex flex-col bg-zinc-900/20 border border-white/5 rounded-xl p-6 hover:bg-zinc-900/40 hover:border-white/10 transition-all duration-300"
    >
      {/* Верхняя часть: Теги и Дата */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2 overflow-hidden">
          {post.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="text-[10px] text-zinc-500 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5 group-hover:border-white/10 transition-colors"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* Статус (если не опубликован) */}
        {!post.is_approved && (
          <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[10px] font-mono uppercase rounded border border-yellow-500/20">
            На проверке
          </span>
        )}
      </div>

      {/* Заголовок */}
      <div className="mb-3 group-hover:translate-x-1 transition-transform duration-300">
        <h3 className="text-xl font-bold text-zinc-100 leading-tight tracking-tight group-hover:text-red-400 transition-colors pr-6">
          {post.title}
        </h3>
      </div>

      {/* Текст превью */}
      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
        {excerpt}
      </p>

      {/* Футер: Автор и Дата */}
      <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden ring-1 ring-white/5">
            {post.user?.avatar_url ? (
              <img
                src={post.user.avatar_url}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-3 h-3 text-zinc-500" />
            )}
          </div>
          <span className="text-zinc-400">{post.user?.name || "Аноним"}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 opacity-70">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(post.created_at).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Иконка стрелки (абсолютная, справа сверху) */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-red-400" />
      </div>
    </Link>
  );
};
