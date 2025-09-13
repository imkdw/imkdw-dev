import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { CommentSection } from '../../../components/sections/comment-section';
import { ArticleInteractions } from './components/article-interactions';
import { ArticleHeader } from '../../../components/article/article-header';
import { ArticleContent } from '../../../components/article/article-content';
import { RelatedArticles } from '../../../components/article/related-articles';
import { ArticleNavigation } from '../../../components/article/article-navigation';
import { TableOfContents } from '../../../components/article/table-of-contents';
import { Author, SeriesInfo, RelatedArticle, NavigationArticle, TableOfContentsItem } from '../../../types/article';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { slug } = await params;

  return {
    title: 'Understanding React Server Components: A Deep Dive into the Future',
    description:
      'React Server Components represent one of the most significant paradigm shifts in React development since hooks. This article explores the fundamentals, benefits, and practical implementation strategies.',
    keywords: ['React', 'Server Components', 'Next.js', 'Performance'],
    authors: [{ name: 'John Developer' }],
    openGraph: {
      title: 'Understanding React Server Components: A Deep Dive into the Future',
      description:
        'React Server Components represent one of the most significant paradigm shifts in React development since hooks.',
      type: 'article',
      publishedTime: '2024-12-15T00:00:00.000Z',
      authors: ['John Developer'],
      tags: ['React', 'Server Components', 'Next.js', 'Performance'],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Understanding React Server Components: A Deep Dive into the Future',
      description:
        'React Server Components represent one of the most significant paradigm shifts in React development since hooks.',
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const author: Author = {
    name: 'John Developer',
    avatar: '/placeholder.svg',
  };

  const series: SeriesInfo = {
    title: 'React Deep Dive',
    part: 3,
    total: 5,
  };

  const relatedArticles: RelatedArticle[] = [
    {
      title: 'React 18의 새로운 기능들',
      description: 'Concurrent Features와 Suspense를 활용한 성능 최적화',
      publishedAt: '2024.01.15',
      readTime: '8분',
      slug: 'react-18-new-features',
    },
    {
      title: 'TypeScript 고급 타입 활용법',
      description: 'Utility Types와 Conditional Types로 더 안전한 코드 작성하기',
      publishedAt: '2024.01.10',
      readTime: '12분',
      slug: 'typescript-advanced-types',
    },
  ];

  const navigationArticles = {
    previousArticle: {
      title: 'React 18 Concurrent Features',
      slug: 'react-18-concurrent-features',
    } as NavigationArticle,
    nextArticle: {
      title: 'Building Performant React Apps',
      slug: 'building-performant-react-apps',
    } as NavigationArticle,
  };

  const tocItems: TableOfContentsItem[] = [
    {
      id: 'what-are-server-components',
      title: 'What are Server Components?',
      level: 1,
      href: '#what-are-server-components',
    },
    {
      id: 'key-concepts',
      title: 'Key Concepts',
      level: 2,
      href: '#key-concepts',
    },
    {
      id: 'benefits-of-server-components',
      title: 'Benefits of Server Components',
      level: 1,
      href: '#benefits-of-server-components',
    },
    {
      id: 'performance-advantages',
      title: 'Performance Advantages',
      level: 2,
      href: '#performance-advantages',
    },
    {
      id: 'implementation-strategies',
      title: 'Implementation Strategies',
      level: 1,
      href: '#implementation-strategies',
    },
  ];

  return (
    <Layout enableOverflow={false}>
      <div className="max-w-7xl mx-auto p-6 lg:flex lg:gap-8">
        <main className="flex-1 max-w-4xl">
          <ArticleHeader
            title="Understanding React Server Components: A Deep Dive into the Future"
            author={author}
            publishedAt="Dec 15, 2024"
            readTime="12 min read"
            tags={['React', 'Server Components', 'Next.js', 'Performance']}
            series={series}
            slug={slug}
          >
            <ArticleInteractions slug={slug} />
          </ArticleHeader>
          <ArticleContent content={<div>Article Content</div>} />
          <RelatedArticles articles={relatedArticles} />
          <ArticleNavigation
            previousArticle={navigationArticles.previousArticle}
            nextArticle={navigationArticles.nextArticle}
          />
          <CommentSection articleId={slug} />
        </main>
        <aside className="sticky top-4 self-start">
          <TableOfContents items={tocItems} />
        </aside>
      </div>
    </Layout>
  );
}
