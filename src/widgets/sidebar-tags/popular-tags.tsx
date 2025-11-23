"use client";

import { Tag } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Hash, TrendingUp, Info } from "lucide-react";
import Link from "next/link";

interface Props {
  tags: Tag[];
}

export const PopularTags = ({ tags }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");

  const handleTagClick = (tagName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentTag === tagName) params.delete("tag");
    else params.set("tag", tagName);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-zinc-900/20 border border-white/5 rounded-xl flex flex-col h-full max-h-[calc(100vh-120px)]">
      <div className="p-5 pb-3 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2 text-red-500 mb-1">
          <TrendingUp className="w-4 h-4" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Популярные теги
          </h3>
        </div>
      </div>

      {/* 2. Список тегов (СКРОЛЛИТСЯ ТОЛЬКО ОН) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag.name)}
              className={`group flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all ${
                currentTag === tag.name
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "hover:bg-white/5 text-zinc-400 hover:text-zinc-200 border border-transparent"
              }`}
            >
              <span className="flex items-center gap-2">
                <Hash
                  className={`w-3.5 h-3.5 ${currentTag === tag.name ? "opacity-100" : "opacity-30 group-hover:opacity-70"}`}
                />
                {tag.name}
              </span>
            </button>
          ))
        ) : (
          <p className="text-xs text-zinc-500 py-4 text-center">
            Тегов пока нет
          </p>
        )}
      </div>

      {/* 3. Футер "Полезное" (Прибит к низу, всегда виден) */}
      <div className="p-5 pt-4 border-t border-white/5 bg-zinc-900/40 rounded-b-xl flex-shrink-0 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3 text-zinc-300">
          <Info className="w-3.5 h-3.5" />
          <h4 className="text-xs font-bold uppercase tracking-wide">
            Полезное
          </h4>
        </div>
        <ul className="space-y-2 text-xs text-zinc-500 font-mono">
          <li>
            <span className="block text-zinc-300 mb-0.5">Dev Community</span>
            <span className="opacity-70">Платформа для разработчиков.</span>
          </li>
          <li>
            <Link
              href="#"
              className="hover:text-red-400 transition-colors block"
            >
              Правила сообщества
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:text-red-400 transition-colors block"
            >
              Markdown гайд
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="hover:text-red-400 transition-colors block"
            >
              О проекте
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
