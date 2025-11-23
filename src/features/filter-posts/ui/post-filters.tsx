"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Clock, ArrowUpDown, X } from "lucide-react";

export const PostFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTag = searchParams.get("tag");
  const currentSort = searchParams.get("sort") || "newest";

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
      {/* ЛЕВАЯ ЧАСТЬ: Текущий контекст */}
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        {currentTag ? (
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-normal text-base">Тег:</span>
            <span className="px-2 py-0.5 bg-red-500/10 text-red-500 rounded text-sm font-mono">
              #{currentTag}
            </span>
            <button
              onClick={() => updateFilter("tag", null)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-zinc-500 hover:text-white" />
            </button>
          </div>
        ) : (
          "Все публикации"
        )}
      </h2>

      {/* ПРАВАЯ ЧАСТЬ: Табы сортировки (ButtonGroup) */}
      <div className="flex items-center bg-zinc-900 p-1 rounded-lg border border-white/5">
        <button
          onClick={() => updateFilter("sort", "newest")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
            currentSort === "newest"
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          Новые
        </button>
        <div className="w-px h-4 bg-white/5 mx-1" />
        <button
          onClick={() => updateFilter("sort", "oldest")}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${
            currentSort === "oldest"
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          Старые
        </button>
      </div>
    </div>
  );
};
