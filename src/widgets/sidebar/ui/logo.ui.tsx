"use client";

import { ChevronLeft } from "lucide-react"; // Используем стрелочку вместо меню, это понятнее для сворачивания

interface LogoProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function LogoUI({ isCollapsed, onToggle }: LogoProps) {
  return (
    <div
      className={`
        relative flex items-center h-20 border-b border-zinc-900 transition-all duration-300
        ${isCollapsed ? "justify-center px-0" : "justify-between px-5"}
      `}
    >
      {/* 
         ГРУППА ЛОГОТИПА 
         Если меню свернуто, этот блок становится кнопкой для разворачивания
      */}
      <button
        onClick={isCollapsed ? onToggle : undefined} // Кликабельно только если свернуто
        className={`flex items-center gap-3 group ${isCollapsed ? "cursor-pointer" : "cursor-default"}`}
        title={isCollapsed ? "Развернуть меню" : ""}
      >
        {/* Иконка (Квадрат с терминалом) */}
        <div className="relative flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gradient-to-br from-zinc-800 to-black border border-zinc-700 rounded-xl shadow-lg shadow-red-900/10 group-hover:border-zinc-500 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
            {/* Скобка > */}
            <path
              d="M8 9L11 12L8 15"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Нижнее подчеркивание _ (Красное) */}
            <path
              d="M15 15H13"
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Текстовая часть (Скрывается при сворачивании) */}
        <div
          className={`
            flex flex-col items-start transition-all duration-200 overflow-hidden
            ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
          `}
        >
          <h1 className="text-lg font-bold tracking-tight text-white leading-none whitespace-nowrap">
            Dev<span className="text-red-600">Nexus</span>
          </h1>
          <span className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mt-0.5">
            Community
          </span>
        </div>
      </button>

      {/* 
          КНОПКА СВОРАЧИВАНИЯ (Стрелочка)
          Показываем её только когда меню открыто.
      */}
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
}
