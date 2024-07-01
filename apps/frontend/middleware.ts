import { NextRequest } from 'next/server';
import { createMiddleware } from 'vitnode-frontend/middleware';

export default async function middleware(request: NextRequest) {
  const response = await createMiddleware(request);

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|robots.txt|sitemap.xml|sitemap).*)',
};
