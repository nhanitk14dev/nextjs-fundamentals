import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session/edge'
import { sessionOptions } from './libs/session'

// This function can be marked `async` if using `await` inside
export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const session = await getIronSession(req, res, sessionOptions)

  const { user } = session

  // Redirect unauthorized user
  if (!user) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (req.nextUrl.pathname.startsWith('/api')) {
    // todo: handle the response middleware routes API
  }
}

// Matcher: allows you to filter Middleware to run on specific paths.
export const config = {
  matcher: [
    '/users/:path*', 
    // '/profile' // Currently, we use getServerSideProps inside component, let's see to explain
  ]
}
