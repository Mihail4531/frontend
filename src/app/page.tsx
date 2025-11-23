import { postApi } from "@/services/blog/blog";
import { PostCard } from "@/entities/post/ui/post-card";
import { PostFilters } from "@/features/filter-posts/ui/post-filters"; // Импорт обновлен
import { PopularTags } from "@/widgets/sidebar-tags/popular-tags"; // Импорт виджета
import { Post, Tag } from "@/lib/types";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function HomePage({ searchParams }: HomeProps) {
  const params = await searchParams;

  let posts: Post[] = [];
  let tags: Tag[] = [];

  try {
    const [postsData, tagsData] = await Promise.all([
      postApi.getAll({
        tag: params.tag,
        sort: params.sort as "newest" | "oldest",
      }),
      postApi.getAllTags(),
    ]);
    posts = postsData;
    tags = tagsData;
  } catch (e) {
    console.error("Ошибка:", e);
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-900/30 selection:text-white">
      {/* Фон */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* ХЕДЕР */}
      <div className="relative z-10 border-b border-white/5 bg-zinc-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-zinc-400 mb-3">
                <Terminal className="w-3 h-3 text-red-500" />
                <span>Dev Community</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">
                Главная
              </h1>
              <p className="text-zinc-400 text-sm max-w-md">
                Лента свежих публикаций, вопросов и статей от сообщества.
              </p>
            </div>
            <Link
              href="/blog/create"
              className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5"
            >
              Написать пост
            </Link>
          </div>
        </div>
      </div>

      {/* ОСНОВНОЙ КОНТЕНТ (Grid Layout) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* 👇 ГЛАВНАЯ СЕТКА: 12 колонок */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ЛЕВАЯ КОЛОНКА (Лента) - Занимает 8 или 9 частей из 12 */}
          <div className="lg:col-span-8 xl:col-span-9">
            {/* Панель фильтров */}
            <PostFilters />

            {/* Список постов */}
            {posts.length > 0 ? (
              <div className="flex flex-col gap-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5">
                <Terminal className="w-10 h-10 text-zinc-600 mb-3" />
                <p className="text-zinc-400 text-sm mb-1">
                  {params.tag
                    ? `По тегу #${params.tag} ничего нет`
                    : "Лента пуста"}
                </p>
                <Link
                  href="/blog/create"
                  className="text-red-400 hover:text-red-300 text-sm mt-2 flex items-center gap-1"
                >
                  Создать <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>

          {/* ПРАВАЯ КОЛОНКА (Сайдбар) - Занимает 4 или 3 части */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-4">
            <PopularTags tags={tags} />
          </aside>
        </div>
      </div>
    </main>
  );
}
