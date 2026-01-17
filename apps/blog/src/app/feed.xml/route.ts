import { Feed } from 'feed';
import { getSeoRss } from '@imkdw-dev/api-client';

const BLOG_TITLE = process.env.NEXT_PUBLIC_BLOG_TITLE ?? '@imkdw-dev/blog';
const BLOG_DESCRIPTION = process.env.NEXT_PUBLIC_BLOG_DESCRIPTION ?? 'A tech blog I develop and operate myself';
const DEFAULT_LOCALE = 'ko';

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BLOG_URL ?? '';

    const feed = new Feed({
      title: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      id: baseUrl,
      link: baseUrl,
      language: 'ko-KR',
      copyright: `All rights reserved ${new Date().getFullYear()}, imkdw`,
    });

    const articles = await getSeoRss();

    for (const article of articles) {
      const articleUrl = `${baseUrl}/${DEFAULT_LOCALE}/articles/${article.slug}`;
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
