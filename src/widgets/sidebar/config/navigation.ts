import { Home, FileText, Scale  } from "lucide-react";
import { MenuItem } from "../model/types";
import { APP_ROUTE } from "@/shared/config";

export const SIDEBAR_NAVIGATION: MenuItem[] = [
  { label: "Главная", href: "/", icon: Home },
  { label: "Посты", href: APP_ROUTE.blog.create(), icon: FileText },
  {label: "Правила", href: APP_ROUTE.rules(), icon: Scale }
];