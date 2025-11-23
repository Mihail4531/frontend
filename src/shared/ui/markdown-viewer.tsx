"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ComponentPropsWithoutRef } from "react";

interface MarkdownViewerProps {
  content: string;
  className?: string; // 👇 Добавили возможность менять стили извне
}

type CodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  node?: object;
};

export const MarkdownViewer = ({ content, className }: MarkdownViewerProps) => {
  // Собираем базовые классы + те, что передали (или дефолтный prose-lg)
  const baseClasses =
    "prose prose-invert max-w-none prose-p:text-zinc-300 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-bold prose-a:text-red-400 hover:prose-a:text-red-300 prose-a:no-underline prose-strong:text-white prose-ul:text-zinc-300 prose-ol:text-zinc-300 prose-li:marker:text-zinc-500 prose-code:text-red-300 prose-code:bg-red-950/30 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none";

  // Если передали className, используем его, иначе дефолт (prose-lg)
  const finalClass = `${baseClasses} ${className || "prose-lg"}`;

  return (
    <div className={finalClass}>
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <div className="relative group rounded-lg overflow-hidden my-4 border border-white/10 shadow-md">
                <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-white/5">
                  <div className="flex gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase">
                    {match[1]}
                  </span>
                </div>

                <SyntaxHighlighter
                  {...props}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    background: "#09090b",
                    padding: "1rem",
                    fontSize: "0.85rem", // Чуть меньше шрифт кода для комментов
                    lineHeight: "1.5",
                  }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="bg-zinc-800/50 text-red-300 px-1 py-0.5 rounded font-mono text-xs border border-white/5"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
