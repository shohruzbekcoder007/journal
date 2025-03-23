import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getUserInfo from "./api/getUserInfo";

// Himoyalangan sahifalar (barcha /admin/* yo'nalishlar)
// const protectedRoutes = ["/en/admin", "/en/admin/resources", "/en/admin/articles", "/en/admin/journals", "/en/admin/authors"];
const protectedRoutes = ['/en/admin', '/uz/admin', 'ru/admin'];

// Til sozlamalari
const locales = ["en", "ru", "uz"];
const defaultLocale = "en";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const authCookie = req.cookies.get("auth")?.value;

  // 1. **Himoyalangan sahifalar uchun autentifikatsiya tekshiruvi**
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !authCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (authCookie) {
    try {
      const decoded = await getUserInfo(authCookie);
      if(!decoded){
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (err) {
      console.log('Invalid Token:', err);
    }
  }

  // 2. **Til sozlamasi uchun tekshirish**
  // API, Next.js ichki fayllarini va statik fayllarni o'tkazib yuboramiz
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Yo'nalishda til mavjudligini tekshiramiz
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Yo'nalishning asosiy qismini olish
    const segments = pathname.split("/").filter(Boolean);
    const path = segments.length > 0 ? `/${segments.join("/")}` : "";

    // Standart tilni qo‘shib, yo‘naltirish
    return NextResponse.redirect(new URL(`/${defaultLocale}${path}`, req.url));
  }

  return NextResponse.next();
}

// **Middleware qaysi sahifalar uchun ishlashini belgilash**
export const config = {
  matcher: [
    "/((?!_next|api|_vercel|.*\\..*).*)", // Barcha sahifalar uchun til middleware ishlaydi
    "/admin/:path*", // Faqat /admin uchun autentifikatsiya middleware ishlaydi
  ],
};
