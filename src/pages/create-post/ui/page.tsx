"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/entities/session";
import { CreatePostForm } from "@/features/create-post";

export const CreatePostPage = () => {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
  if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);
  if (loading || !user) return null;
  return (
    <div className="min-h-screen bg-black">
     <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div>
      <div className="px-4 py-2 md:py-18">
        <div className="mx-auto max-w-2xl">
          <CreatePostForm />
        </div>
      </div>
    </div>
  );
};