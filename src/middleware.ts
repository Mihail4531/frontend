// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken");
  const isAuth = Boolean(token);

  const { pathname } = req.nextUrl;

  // ДОБАВЬ '/' в публичные маршруты
  const publicRoutes = ["/", "/login", "/register"];

  const isPublic = publicRoutes.includes(pathname);

  // Если НЕ авторизован → нельзя на приватные страницы
  if (!isAuth && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Если УЖЕ авторизован → нельзя на login/register
  if (isAuth && isPublic && pathname !== "/") {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
