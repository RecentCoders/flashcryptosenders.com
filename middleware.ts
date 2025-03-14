import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle revalidation requests
  if (request.nextUrl.pathname.startsWith('/_next/static')) {
    return NextResponse.next()
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  // Apply caching headers based on page type
  const url = request.nextUrl.pathname
  
  // Set security headers for all responses
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()')
  
  // Set CSP header
  response.headers.set(
    'Content-Security-Policy',
    `default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.matomo.cloud https://plausible.io https://scripts.simpleanalyticscdn.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://flashcryptosenders.matomo.cloud https://plausible.io https://queue.simpleanalyticscdn.com; frame-src 'self'; frame-ancestors 'none';`
  )
  
  // Skip caching for API routes and auth pages
  if (url.startsWith('/api/') || url.includes('/auth/')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0')
    return response
  }
  
  // For static assets like images, fonts, etc.
  if (url.match(/\.(jpg|jpeg|png|gif|ico|svg|webp|avif|css|js|woff|woff2)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    return response
  }
  
  // For static pages that rarely change
  if (url === '/' || url === '/about' || url === '/faq' || url === '/products') {
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
    return response
  }
  
  // For dynamic pages that change more frequently
  if (url.startsWith('/blog/') || url.startsWith('/news/')) {
    response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600')
    return response
  }
  
  // Default caching strategy for other pages
  response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600')
  
  return response
}

// Configure the middleware to run only for specific paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
