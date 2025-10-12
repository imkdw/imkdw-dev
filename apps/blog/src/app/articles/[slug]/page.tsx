import type { Metadata } from 'next';
import { Layout } from '@imkdw-dev/ui';
import { CommentSection } from '../../../components/comment/comment-section';
import { ArticleInteractions } from '../../../components/article/article-interactions';
import { ArticleHeader } from '../../../components/article/article-header';
import { ArticleContent } from '../../../components/article/article-content';
import { ArticleNavigation } from '../../../components/article/article-navigation';
import { TableOfContents } from '../../../components/article/table-of-contents';
import { getArticle, getArticleComments } from '@imkdw-dev/actions';
import { createMetadata } from '@/utils/metadata-creator';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await getArticle(slug);

  return createMetadata({
    title: article.title,
    description: article.content.slice(0, 200),
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const response = await getArticle(slug);
  const { article, prevArticle, nextArticle } = response;

  const commentsResponse = await getArticleComments(slug);

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
          <CommentSection articleSlug={slug} initialComments={commentsResponse.comments} />
        </main>
        <aside className="hidden lg:block sticky top-4 self-start">
          <TableOfContents content={article.content} />
        </aside>
      </div>
    </Layout>
  );
}
