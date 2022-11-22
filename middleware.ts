import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

}

// Matcher: allows you to filter Middleware to run on specific paths.
export const config = {
  matcher: [
    '/users/:path*',
    '/profile'
  ],
}