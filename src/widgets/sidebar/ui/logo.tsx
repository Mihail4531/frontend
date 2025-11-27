"use client";

import { ChevronLeft, Terminal } from "lucide-react";

interface LogoProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Logo = ({ isCollapsed, onToggle }: LogoProps) => {
  return (
    <div
      className={`relative flex items-center h-20 border-b border-zinc-900 transition-all duration-300 ${
        isCollapsed ? "justify-center px-0" : "justify-between px-5"
      }`}
    >
      <button
        onClick={isCollapsed ? onToggle : undefined}
        className={`flex items-center gap-3 group ${
          isCollapsed ? "cursor-pointer" : "cursor-default"
        }`}
        title={isCollapsed ? "Развернуть меню" : ""}
      >
        <div className="relative shrink-0 flex items-center justify-center w-10 h-10 bg-linear-to-br from-zinc-800 to-black border border-zinc-700 rounded-xl shadow-lg shadow-red-900/10 group-hover:border-zinc-500 transition-colors">
          <Terminal className="w-5 h-5 text-zinc-200 group-hover:text-red-500 transition-colors" />
        </div>
        <div
          className={`flex flex-col items-start transition-all duration-200 overflow-hidden ${
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          <span className="block text-lg font-bold tracking-tight text-white leading-none whitespace-nowrap">
             The <span className="text-red-500">Developer</span>
         </span>
  
        <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mt-1">
        Community
        </span>
        </div>
      </button>
      {!isCollapsed && (
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all"
          title="Свернуть меню"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};