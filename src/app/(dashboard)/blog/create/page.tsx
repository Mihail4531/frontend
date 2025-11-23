"use client";

import { CreatePostForm } from "@/features/create-post/ui/create-post-form";
import { useAuthStore } from "@/stores/auth-stores";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreatePostPage() {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  // Редирект если не залогинен
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return null; // Или лоадер

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <CreatePostForm />
      </div>
    </div>
  );
}
