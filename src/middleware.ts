// middleware.ts
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Публичные маршруты (добавьте '/' если нужно)
  const publicRoutes = ["/", "/login", "/register"];
  const isPublic = publicRoutes.includes(pathname);

  // Пропускаем статические файлы и API-роуты
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  // Проверяем аутентификацию через backend-API
  const authResponse = await fetch("https://gremlini.store/api/user", {  // Замените на ваш эндпоинт проверки пользователя
    method: "GET",
    credentials: "include",  // Отправляем куки браузера к backend
    headers: {
      "Cookie": req.headers.get("cookie") || "",  // Передаём все куки из запроса (на случай прокси)
    },
  });

  const isAuth = authResponse.status === 200;

  // Если НЕ авторизован и НЕ на публичном роуте → редирект на login
  if (!isAuth && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Если УЖЕ авторизован и на login/register → редирект на profile (кроме '/')
  if (isAuth && isPublic && pathname !== "/") {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};