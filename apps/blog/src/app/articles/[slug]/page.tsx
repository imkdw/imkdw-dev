import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { CommentSection } from '../../../components/comment/comment-section';
import { ArticleInteractions } from './components/article-interactions';
import { ArticleHeader } from '../../../components/article/article-header';
import { ArticleContent } from '../../../components/article/article-content';
import { ArticleNavigation } from '../../../components/article/article-navigation';
import { TableOfContents } from '../../../components/article/table-of-contents';
import { getArticle } from '@imkdw-dev/actions';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await getArticle(slug);
    const { article } = response;

    return {
      title: article.title,
      description: article.content.slice(0, 200),
      keywords: article.tags.map(tag => tag.name),
      authors: [{ name: 'imkdw' }],
      openGraph: {
        title: article.title,
        description: article.content.slice(0, 200),
        type: 'article',
        publishedTime: article.createdAt.toString(),
        authors: ['imkdw'],
        tags: article.tags.map(tag => tag.name),
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.content.slice(0, 200),
      },
    };
  } catch {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for does not exist.',
    };
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const response = await getArticle(slug);
  const { article, prevArticle, nextArticle } = response;

  const navigationArticles = {
    previousArticle: prevArticle
      ? {
          title: prevArticle.title,
          slug: prevArticle.slug,
        }
      : null,
    nextArticle: nextArticle
      ? {
          title: nextArticle.title,
          slug: nextArticle.slug,
        }
      : null,
  };

  return (
    <Layout enableOverflow={false}>
      <div className="max-w-7xl mx-auto p-6 lg:flex lg:gap-8">
        <main className="flex-1 max-w-4xl flex flex-col">
          <ArticleHeader article={article}>
            <ArticleInteractions slug={slug} />
          </ArticleHeader>
          <ArticleContent article={article} />
          {/* <RelatedArticles articles={relatedArticles} /> */}
          <ArticleNavigation
            previousArticle={navigationArticles.previousArticle}
            nextArticle={navigationArticles.nextArticle}
          />
          <CommentSection articleId={slug} />
        </main>
        <aside className="hidden lg:block sticky top-4 self-start">
          <TableOfContents content={article.content} />
        </aside>
      </div>
    </Layout>
  );
}
