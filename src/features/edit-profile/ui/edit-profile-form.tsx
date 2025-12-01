"use client";

import { ProfileUser } from "@/entities/user";
import { Button, Input } from "@/shared/ui";
import { UserAvatar } from "@/entities/user/ui/user-avatar"; // Импорт аватара
import { useEditProfile } from "../model/useProfile";

interface Props {
  user: ProfileUser;
  onSuccess: () => void;
  onCancel: () => void;
}

export const EditProfileForm = ({ user, onSuccess, onCancel }: Props) => {
  
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    preview,
    handleFileChange,
  } = useEditProfile({ user, onSuccess });

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      {/* СЕКЦИЯ 1: Аватар */}
      <div className="flex flex-col items-center -mt-12">
        <UserAvatar
          user={user}
          size="lg"
          isEditing={true}
          previewUrl={preview}
          onFileChange={handleFileChange}
        />
        <span className="text-xs text-gray-500 mt-3">
          Нажмите на фото, чтобы изменить
        </span>
      </div>

      <div className="grid gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">
            О себе
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Имя</label>
              <Input {...register("name")} placeholder="Ваше имя" />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Биография
            </label>
            <textarea
              {...register("bio")}
              rows={3}
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-red-500 outline-none resize-none transition focus:ring-1 focus:ring-red-500"
              placeholder="Расскажите немного о себе..."
            />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">
            Социальные сети
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
                  <label className="text-sm text-gray-400 mb-1 block">GitHub</label>
                  <Input {...register("github_username")} placeholder="username" />
                            
                  
                  {errors.github_username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.github_username.message}
                    </p>
                  )}
                </div>
                            <div className="md:col-span-2">
              <label className="text-sm text-gray-400 mb-1 block">
                Веб-сайт
              </label>
              <Input
                {...register("website")}
                placeholder="https://example.com"
              />
              {errors.website && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.website.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white border-b border-gray-800 pb-2">
            Навыки
          </h3>
          <div>
            <Input
              {...register("skills")}
              placeholder="React, PHP, Design (через запятую)"
            />
            <p className="text-xs text-gray-500 mt-2">
              Перечислите технологии через запятую
            </p>
          </div>
        </div>
      </div>
      {errors.root && (
        <div className="p-3 bg-red-900/20 text-red-300 rounded text-center border border-red-900/30">
          {errors.root.message}
        </div>
      )}
      <div className="flex gap-4 pt-4 border-t border-gray-800">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          Отмена
        </Button>
      </div>
    </form>
  );
};
