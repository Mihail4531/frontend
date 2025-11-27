import { Rule } from "../model/types";
import { ICON_MAP, getColorClasses } from "../lib/map";
import { CircleHelp } from "lucide-react"; // Запасная иконка

interface RuleCardProps {
  rule: Rule;
}

export const RuleCard = ({ rule }: RuleCardProps) => {
  // 1. Превращаем строку "Zap" в Компонент
  const IconComponent = ICON_MAP[rule.icon] || CircleHelp;
  
  // 2. Получаем строку классов для цвета
  const colorClasses = getColorClasses(rule.color);

  return (
    <div className="group relative p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/60 hover:border-white/10 transition-all duration-300 overflow-hidden h-full">
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Иконка с динамическим цветом */}
        <div className={`
            w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center mb-6 border border-white/5 
            group-hover:scale-110 transition-all duration-300
            ${colorClasses} 
        `}>
          {/* Убираем group-hover классы для самой иконки, так как они теперь на родителе div-е для фона */}
          <IconComponent className="w-6 h-6 transition-colors" />
        </div>
        
        <h3 className={`text-xl font-bold text-zinc-100 mb-3 transition-colors group-hover:text-zinc-50`}>
          {rule.id}. {rule.title}
        </h3>
        
        <p className="text-zinc-400 leading-relaxed text-sm">
          {rule.description}
        </p>
      </div>
    </div>
  );
};