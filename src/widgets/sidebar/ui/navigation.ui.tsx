"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IMenuSidebar } from "../module/sidebar.interface";

interface NavigationProps {
  items: IMenuSidebar[];
  isCollapsed: boolean;
}

export default function NavigationUI({ items, isCollapsed }: NavigationProps) {
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
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all group ${
              active
                ? "bg-zinc-900 text-white border border-red-500/50"
                : "text-zinc-500 hover:text-white hover:bg-zinc-900/70"
            }`}
          >
            <Icon
              className={`w-5 h-5 flex-shrink-0 ${active ? "text-red-500" : "group-hover:text-white"}`}
            />
            {!isCollapsed && (
              <span className="font-medium truncate">{item.label}</span>
            )}
            {active && !isCollapsed && (
              <div className="ml-auto w-1.5 h-1.5 bg-red-500 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
