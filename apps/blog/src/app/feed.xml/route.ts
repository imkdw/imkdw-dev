import { Feed } from 'feed';
import { getSeoRss } from '@imkdw-dev/api-client';

const BLOG_TITLE = '@imkdw-dev/blog';
const BLOG_DESCRIPTION = '직접 개발하고 운영하는 IT 기술블로그';

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

export async function GET() {
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
    const articleUrl = `${baseUrl}/articles/${article.slug}`;
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
}
