"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-stores";
import { EditProfileForm } from "@/features/edit-profile/edit/ui/edit-profile-form";
import { UserInfo } from "@/entities/user/ui/user-info";
import { LogoutButton } from "@/features/auth/logout/ui/logout-button";

// 👇 Импорты для постов
import { postApi } from "@/services/blog/blog";
import { Post } from "@/lib/types";
import { PostCard } from "@/entities/post/ui/post-card";
import { PlusCircle } from "lucide-react";
import { Button } from "@/shared/ui";

export default function ProfilePage() {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // 👇 Стейт для постов
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  // 👇 Загружаем посты пользователя
  useEffect(() => {
    if (user) {
      postApi
        .getMyPosts()
        .then(setPosts)
        .catch(console.error)
        .finally(() => setPostsLoading(false));
    }
  }, [user]);

  if (loading || !user)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Загрузка...
      </div>
    );

  return (
    <div className="min-h-screen bg-black py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Блок 1: Информация о пользователе */}
        {isEditing ? (
          <EditProfileForm
            user={user}
            onSuccess={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-6">
            <UserInfo user={user} onEdit={() => setIsEditing(true)} />
            <div className="flex justify-end">
              <LogoutButton />
            </div>
          </div>
        )}

        {/* 👇 Блок 2: Мои Публикации */}
        {!isEditing && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-2xl font-bold text-white">Мои публикации</h2>
              <Button
                onClick={() => router.push("/blog/create")}
                className="text-sm px-4 py-2 bg-gray-800 hover:bg-gray-700 border-gray-700"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Написать пост
              </Button>
            </div>

            {postsLoading ? (
              <div className="text-gray-500">Загрузка постов...</div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-900/50 rounded-2xl border border-gray-800 border-dashed">
                <p className="text-gray-400 mb-4">У вас пока нет публикаций</p>
                <Button onClick={() => router.push("/blog/create")}>
                  Создать первую запись
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
