import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "ru", "uz"]
const defaultLocale = "en"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for api routes and static files
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next()
  }

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (!pathnameHasLocale) {
    // Get the first segment of the path (if any)
    const segments = pathname.split("/").filter(Boolean)
    const path = segments.length > 0 ? `/${segments.join("/")}` : ""

    // Redirect to default locale while maintaining the path
    return NextResponse.redirect(new URL(`/${defaultLocale}${path}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|_vercel|.*\\..*).*)",
  ],
}

