import { NextRequest, NextResponse } from 'next/server';

export function createMiddleware() {
  return function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const cookieSession = {
      default: request.cookies.get('vitnode-login-token'),
      admin: request.cookies.get('vitnode-login-token-admin'),
    };

    // Redirect to /admin if the user is not logged in to AdminCP
    if (
      pathname.startsWith('/admin') &&
      pathname !== '/admin' &&
      pathname !== '/admin/theme-editor' &&
      !cookieSession.admin
    ) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  };
}
