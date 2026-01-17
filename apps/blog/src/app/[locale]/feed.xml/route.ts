import { Feed } from 'feed';
import { getSeoRss } from '@imkdw-dev/api-client';
import { routing, Locale } from '@/i18n/routing';

const DEFAULT_BASE_URL = 'https://blog.imkdw.dev';

interface FeedConfig {
  title: string;
  description: string;
  language: string;
}

const FEED_CONFIG: Record<Locale, FeedConfig> = {
  ko: {
    title: process.env.NEXT_PUBLIC_BLOG_TITLE ?? '@imkdw-dev/blog',
    description: process.env.NEXT_PUBLIC_BLOG_DESCRIPTION ?? '직접 개발하고 운영하는 IT 기술블로그',
    language: 'ko-KR',
  },
  en: {
    title: process.env.NEXT_PUBLIC_BLOG_TITLE ?? '@imkdw-dev/blog',
    description: process.env.NEXT_PUBLIC_BLOG_DESCRIPTION_EN ?? 'A tech blog I develop and operate myself',
    language: 'en-US',
  },
};

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

interface Props {
  params: Promise<{ locale: Locale }>;
}

export async function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function GET(_request: Request, { params }: Props) {
  try {
    const { locale } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL ?? DEFAULT_BASE_URL;
    const config = FEED_CONFIG[locale];

    const feed = new Feed({
      title: config.title,
      description: config.description,
      id: `${baseUrl}/${locale}`,
      link: `${baseUrl}/${locale}`,
      language: config.language,
      copyright: `All rights reserved ${new Date().getFullYear()}, imkdw`,
    });

    const articles = await getSeoRss();

    for (const article of articles) {
      const articleUrl = `${baseUrl}/${locale}/articles/${article.slug}`;
      const date = typeof article.createdAt === 'string' ? new Date(article.createdAt) : article.createdAt;

      feed.addItem({
        title: article.title,
        id: article.slug,
        link: articleUrl,
        description: truncate(article.plainContent, 200),
        date,
        category: [{ name: article.seriesTitle }, ...article.tagNames.map(name => ({ name }))],
      });
    }

    return new Response(feed.rss2(), {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch {
    return new Response('Internal Server Error', { status: 500 });
  }
}
