"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "../model/types";
interface NavigationProps {
  items: MenuItem[];
  isCollapsed: boolean;
  onNavigate?: () => void;
}
export const Navigation = ({ items, isCollapsed, onNavigate }: NavigationProps) => {
  const pathname = usePathname();
  
  return (
    <nav className="flex-1 p-4 space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${
              active
                ? "bg-zinc-900 text-white border border-red-500/50"
                : "text-zinc-500 hover:text-white hover:bg-zinc-900/70"
            }`}
          >
            {Icon ? (
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  active ? "text-red-500" : "group-hover:text-white"
                }`}
              />
            ) : (
              <div className="w-5 h-5 shrink-0" />
            )}

            {!isCollapsed && <span className="font-medium truncate">{item.label}</span>}
            {active && !isCollapsed && <div className="ml-auto w-1.5 h-1.5 bg-red-500 rounded-full" />}
          </Link>
        );
      })}
    </nav>
  );
};