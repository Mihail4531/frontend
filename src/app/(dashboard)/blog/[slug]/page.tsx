import { postApi } from "@/services/blog/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Eye, User, Hash } from "lucide-react";
import { MarkdownViewer } from "@/shared/ui/markdown-viewer";
import { PostComments } from "@/widgets/comment";

// Настройки для Next.js
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 👇 ВАЖНО: Должно быть export default async function
export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post = null;

  try {
    post = await postApi.getBySlug(slug);
  } catch (error) {
    console.log(error)
    return notFound();
  }

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-black text-zinc-200 selection:bg-red-900/50 selection:text-white">
      {/* Фон: Сетка + Свечение */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-red-900/10 blur-[120px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Основной контейнер */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-12 pb-24">
        {/* Навигация */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Назад к списку
        </Link>

        {/* Хедер статьи */}
        <header className="mb-16 border-b border-white/5 pb-10">
          {/* Теги */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-1 px-2.5 py-1 rounded border border-red-900/20 bg-red-900/5 text-red-400 text-xs font-mono tracking-wide"
                >
                  <Hash className="w-3 h-3 opacity-50" />
                  {tag.name}
                </div>
              ))}
            </div>
          )}

          {/* Заголовок */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white leading-[1.1] mb-8">
            {post.title}
          </h1>

          {/* Инфо-строка */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 font-mono">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-zinc-800 ring-1 ring-white/10 overflow-hidden flex items-center justify-center">
                {post.user?.avatar_url ? (
                  <img
                    src={post.user.avatar_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-3 h-3 text-zinc-400" />
                )}
              </div>
              <span className="text-zinc-300">
                {post.user?.name || "Автор"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 opacity-70" />
              <span>
                {new Date(post.created_at).toLocaleDateString("ru-RU", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 opacity-70" />
              <span>{post.views || 0} просмотров</span>
            </div>
          </div>
        </header>

        {/* Контент (Markdown) */}
        <div className="w-full overflow-hidden">
          <MarkdownViewer content={post.content} />
        </div>

        {/* Футер статьи */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center gap-4">
          <div className="w-8 h-px bg-red-500/50" />
          <p className="text-zinc-600 text-sm font-mono">Конец Записи</p>
        </div>

        <div className="mt-10">
          <PostComments postId={post.id} />
        </div>
      </div>
    </div>
  );
}
