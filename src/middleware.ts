import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Публичные маршруты, куда можно заходить без авторизации
const publicRoutes = ['/login', '/register'];

// Админские маршруты
const adminRoutes = ['/admin', '/admin/(.*)'];

// Пользовательские маршруты
const userRoutes = ['/', '/tasks', '/dashboard/(.*)'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Если пользователь на публичной странице и есть сессия, редирект по роли
  const cookie = request.cookies.get('laravel_session'); // стандартная cookie Sanctum
  if (publicRoutes.includes(pathname) && cookie) {
    try {
      // Запрашиваем пользователя у backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });

      const user = await res.json();

      if (user.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url));
      } else {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch {
      // Если не удалось получить пользователя — разрешаем доступ
      return NextResponse.next();
    }
  }

  // Для защищённых маршрутов проверяем cookie
  const isProtectedRoute =
    !publicRoutes.includes(pathname) &&
    (userRoutes.includes(pathname) || adminRoutes.some((r) => pathname.startsWith(r.replace('/(.*)', ''))));

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Куда применяется middleware
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'], // исключаем статические файлы
};
