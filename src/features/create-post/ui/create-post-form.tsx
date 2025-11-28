"use client";

import { Button, Input } from "@/shared/ui";
import { Textarea } from "@/shared/ui/textarea";
import { useCreatePost } from "../model/useCreate";
import { Hash } from "lucide-react";

export const CreatePostForm = () => {
  const { register, handleSubmit, errors, isSubmitting } = useCreatePost();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-red-900/20"
    >
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Создать пост</h1>
        <p className="text-zinc-400 text-sm mt-1.5">
          Пост пройдёт модерацию и появится в ленте
        </p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium text-zinc-300 block mb-2">Заголовок</label>
          <Input
            {...register("title")}
            placeholder="Next js"
            error={errors.title?.message} 
            className="h-12 bg-zinc-800/70 border-zinc-700 text-white placeholder-zinc-500 focus:border-red-500 transition-all"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1 pl-1 font-medium">
              {errors.title.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-300 block mb-2">
            Содержание (Markdown)
          </label>
          <Textarea
            {...register("content")}
            placeholder={`Напишете свой код впервые`}
            error={errors.content?.message}
            className="min-h-64 sm:min-h-80 bg-zinc-800/70 border-zinc-700 text-white placeholder-zinc-600 font-mono text-sm leading-relaxed resize-none focus:border-red-500 transition-all"
          />
          {errors.content && (
            <p className="text-red-500 text-xs mt-1 pl-1 font-medium">
              {errors.content.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-zinc-300 block mb-2">Теги</label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              {...register("tags")}
              placeholder="nextjs, react, tutorial"
              className="pl-10 h-12 bg-zinc-800/70 border-zinc-700 text-white placeholder-zinc-500 focus:border-red-500 transition-all"
            />
          </div>
          {errors.tags && (
            <p className="text-red-500 text-xs mt-1 pl-1 font-medium">
              {errors.tags.message}
            </p>
          )}
        </div>
      </div>

      {errors.root && (
        <div className="mt-6 p-4 bg-red-900/20 border border-red-900/40 text-red-300 rounded-xl text-center text-sm font-medium">
          {errors.root.message}
        </div>
      )}

      <div className="mt-8">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full h-14 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-red-900/40 transition-all"
        >
          {isSubmitting ? "Публикуем..." : "Опубликовать пост"}
        </Button>
      </div>
    </form>
  );
};