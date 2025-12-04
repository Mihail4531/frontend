"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { Button } from "@/shared/ui";
import { APP_ROUTE } from "@/shared/config"
import { useAuthStore } from "@/entities/session";
import { Post, postApi } from "@/entities/post";
import { UserProfileCard } from "@/entities/user";
import { EditProfileForm } from "@/features/edit-profile";
import { LogoutButton } from "@/features/auth/logout";
import { PostCard } from "@/widgets/ui/post-card";
  export const ProfilePage = () => {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  useEffect(() => {
    if (!loading && !user) router.replace(APP_ROUTE.auth.login());
  }, [user, loading, router]);
  useEffect(() => {
    if (user) {
      postApi.getMyPosts()
        .then(setPosts)
        .catch(console.error)
        .finally(() => setPostsLoading(false));
    }
  }, [user]);

  const handleDeletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  if (loading || !user) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Загрузка...</div>;
  }
  return (
    <div className="min-h-screen bg-black py-8 px-4 md:px-8">
        <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      </div> 
      <div className="max-w-7xl mx-auto space-y-12">
        {isEditing ? (
          <EditProfileForm
            user={user}
            onSuccess={() => setIsEditing(false)}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="space-y-6">
            <UserProfileCard user={user} onEdit={() => setIsEditing(true)} />
            <div className="flex justify-end">
              <LogoutButton />
            </div>
          </div>
        )}
        {!isEditing && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-2xl font-bold text-white">Мои публикации</h2>
              <Button
                onClick={() => router.push(APP_ROUTE.blog.create())}
                className="text-sm px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                Написать пост
              </Button>
            </div>

            {postsLoading ? (
              <div className="text-zinc-500">Загрузка постов...</div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post}
                    onDelete={handleDeletePost} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
                <p className="text-zinc-400 mb-4">У вас пока нет публикаций</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};