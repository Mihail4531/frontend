import { ReactNode } from "react";

interface SocialLinkProps {
  icon: ReactNode;
  label: string;
  value?: string | null;
  prefix?: string;
  isExternal?: boolean;
}

export const SocialLink = ({ icon, label, value, prefix, isExternal }: SocialLinkProps) => {
  if (!value) return null;
  const href = isExternal && !value.startsWith("http") ? `https://${value}` : value;
  const displayValue = prefix ? value.replace(prefix, "") : value.replace(/^https?:\/\//, "");

  return (
    <div className="group flex items-center gap-3">
      <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-500 group-hover:text-red-500 group-hover:border-red-500/20 transition-all">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-medium text-zinc-500">{label}</span>
        {isExternal ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-200 hover:text-red-400 truncate transition-colors">
            {prefix}{displayValue}
          </a>
        ) : (
          <span className="text-sm font-medium text-zinc-200 truncate">{value}</span>
        )}
      </div>
    </div>
  );
};