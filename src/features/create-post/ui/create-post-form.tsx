"use client";

import { Button, Input } from "@/shared/ui";
import { Textarea } from "@/shared/ui/textarea";
import { useCreatePost } from "../model/useCreate";
import { ImagePlus, X } from "lucide-react";

export const CreatePostForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    preview,
    handleFileChange,
    removeFile,
  } = useCreatePost();

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-white">Новый пост</h2>
        <p className="text-gray-400 text-sm">
          Поделитесь знаниями. Пост пройдет модерацию перед публикацией.
        </p>
      </div>

      {/* Загрузка обложки */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Обложка</label>
        {!preview ? (
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-800 border-dashed rounded-xl cursor-pointer bg-gray-950/50 hover:bg-gray-900 hover:border-red-500/50 transition group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImagePlus className="w-8 h-8 text-gray-500 group-hover:text-red-500 transition mb-2" />
              <p className="text-sm text-gray-500">
                Нажмите или перетащите фото
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <div className="relative w-full h-60 rounded-xl overflow-hidden border border-gray-800">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={removeFile}
              className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-600 text-white rounded-full transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Поля ввода */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-1.5 block">
            Заголовок
          </label>
          <Input
            {...register("title")}
            placeholder="Например: Как я выучил Laravel"
            error={errors.title?.message}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 mb-1.5 block">
            Контент
          </label>
          <Textarea
            {...register("content")}
            placeholder="Пишите здесь..."
            error={errors.content?.message}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-300 mb-1.5 block">
            Теги
          </label>
          <Input {...register("tags")} placeholder="php, backend, tutorial" />
          <p className="text-xs text-gray-500 mt-1">Через запятую</p>
        </div>
      </div>

      {errors.root && (
        <div className="p-3 bg-red-900/20 border border-red-900/30 text-red-200 rounded text-center text-sm">
          {errors.root.message}
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full md:w-auto"
        >
          Отправить на публикацию
        </Button>
      </div>
    </form>
  );
};
