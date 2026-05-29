import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPPORTED_LOCALES = ['cs', 'en']
const DEFAULT_LOCALE = 'cs'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static assets, API calls, and internal Next.js files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if pathname already includes a supported locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect to default locale if not present
  request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Trigger on all paths except static assets
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
