"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuthStore } from "@/entities/session";
import { postApi, Post } from "@/entities/post";
import { EditPostForm } from "@/features/edit-post"; // Твоя форма
import { APP_ROUTE } from "@/shared/config";

export const EditPostPage = () => {
  const { user, loading: authLoading } = useAuthStore();
  const router = useRouter();
  
  // 👇 Исправление ошибки с params
  const params = useParams(); 
  const idFromUrl = params?.id; // Безопасное чтение
  const postId = Number(idFromUrl);

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Редирект если не авторизован
  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [user, authLoading, router]);

  // 2. Загрузка поста
  useEffect(() => {
    // Если нет ID или юзера — не грузим
    if (!postId || isNaN(postId) || !user) return;

    postApi.getById(postId)
      .then((data) => {
        // Проверка: Автор ли это?
        if (data.user?.id !== user.id) {
          alert("Вы не автор этого поста");
          router.replace(APP_ROUTE.profile());
          return;
        }
        // Проверка: Опубликован ли?
        if (data.is_approved) {
          alert("Нельзя редактировать опубликованный пост");
          router.replace(APP_ROUTE.profile());
          return;
        }
        setPost(data);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        router.replace(APP_ROUTE.profile());
      })
      .finally(() => setIsLoading(false));
  }, [postId, user, router]);

  if (authLoading || isLoading || !user || !post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div>

      <div className="px-4 py-2 md:py-18 relative z-10">
        <div className="mx-auto max-w-2xl mt-10">
          <h1 className="text-2xl font-bold text-white mb-6">Редактирование</h1>
          <EditPostForm post={post} onCancel={() => router.back()} />
        </div>
      </div>
    </div>
  );
};