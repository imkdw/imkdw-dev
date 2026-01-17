import { NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

const DEFAULT_BASE_URL = 'https://blog.imkdw.dev';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL ?? DEFAULT_BASE_URL;
  return NextResponse.redirect(`${baseUrl}/${routing.defaultLocale}/feed.xml`, 308);
}
