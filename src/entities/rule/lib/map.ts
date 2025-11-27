import { 
  ShieldAlert, Code2, MessageSquareWarning, 
  Users, Ghost, Zap, Scale, Heart, LucideIcon 
} from "lucide-react";

// Словарь иконок
export const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Code2,
  Ghost,
  MessageSquareWarning,
  ShieldAlert,
  Zap,
  Scale,
  Heart
};
export const getColorClasses = (colorName: string) => {
  const map: Record<string, string> = {
    blue:    "text-blue-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/20",
    emerald: "text-emerald-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20",
    purple:  "text-purple-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/20",
    yellow:  "text-yellow-400 group-hover:text-yellow-400 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/20",
    red:     "text-red-400 group-hover:text-red-400 group-hover:bg-red-500/10 group-hover:border-red-500/20",
    orange:  "text-orange-400 group-hover:text-orange-400 group-hover:bg-orange-500/10 group-hover:border-orange-500/20",
  };
  
  return map[colorName] || map['blue']; // Fallback на синий
};