"use client";

import { Loader2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Post } from "@/entities/post";
import { useEditPost } from "../model/useEditForm";

interface Props {
  post: Post;
  onCancel?: () => void;
}

export const EditPostForm = ({ post, onCancel }: Props) => {
  const router = useRouter();
  
  // Достаем всё необходимое из хука
  const { register, errors, isSubmitting, onSubmit } = useEditPost({ 
    post, 
    onSuccess: onCancel 
  });

  return (
    <form onSubmit={onSubmit} className="bg-zinc-900/50 p-6 rounded-xl border border-white/10 space-y-6">
      
      {/* Заголовок */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400">Заголовок</label>
        <input
          {...register("title")}
          type="text"
          className={`w-full bg-black border rounded-lg p-3 text-white focus:outline-none transition-colors 
            ${errors.title ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-white/30"}`}
          placeholder="Название поста"
        />
        {errors.title && (
          <p className="text-xs text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Теги */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400">Теги (через запятую)</label>
        <input
          {...register("tags")}
          type="text"
          className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
          placeholder="news, it, programming"
        />
        {/* Ошибки тегов редкость, так как поле optional, но если будут - покажем */}
        {errors.tags && (
          <p className="text-xs text-red-500">{errors.tags.message}</p>
        )}
      </div>

      {/* Контент */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-400">Текст</label>
        <textarea
          {...register("content")}
          className={`w-full min-h-[200px] bg-black border rounded-lg p-3 text-white focus:outline-none transition-colors resize-y
            ${errors.content ? "border-red-500/50 focus:border-red-500" : "border-zinc-800 focus:border-white/30"}`}
          placeholder="О чем пост?"
        />
        {errors.content && (
          <p className="text-xs text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* Кнопки */}
      <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
        <button
          type="button"
          onClick={() => onCancel ? onCancel() : router.back()}
          className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <X className="w-4 h-4" /> Отмена
        </button>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Сохранить
        </button>
      </div>
    </form>
  );
};