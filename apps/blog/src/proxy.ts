import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { get } from '@vercel/edge-config';

import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/maintenance') {
    return NextResponse.next();
  }

  let isMaintenance = false;
  try {
    isMaintenance = (await get<boolean>('isMaintenance')) ?? false;
  } catch {
    // EDGE_CONFIG 환경변수가 없는 경우 (로컬 등)
  }

  if (isMaintenance) {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.rewrite(url, { status: 503 });
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|feed\\.xml|sitemap\\.xml|robots\\.txt|favicon\\.ico).*)',
};
