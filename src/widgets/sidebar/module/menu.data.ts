import { IMenuSidebar } from "../module/sidebar.interface";
import { APP_ROUTE } from "@/lib/routes/app.route";
import { Home, LogIn, PlusCircle } from "lucide-react"; // 👈 Добавили иконку

export const MENU_DATA: IMenuSidebar[] = [
  {
    label: "Главная",
    href: APP_ROUTE.home(),
    icon: Home,
  },
  {
    label: "Написать пост",
    href: APP_ROUTE.blog.create(), // 👈 Ссылка на создание
    icon: PlusCircle,
  },
];

export const AUTH_DATA_SIDEBAR: IMenuSidebar[] = [
  {
    label: "Войти",
    href: APP_ROUTE.auth.login(),
    icon: LogIn,
  },
];
