import type { Metadata } from 'next';
import { Layout } from '@/components/layout';
import { CommentSection } from '@/components/comment/comment-section';
import { ArticleInteractions } from '@/components/article/article-interactions';
import { ArticleHeader } from '@/components/article/article-header';
import { ArticleContent } from '@/components/article/article-content';
import { ArticleNavigation } from '@/components/article/article-navigation';
import { TableOfContents } from '@/components/article/table-of-contents';
import { ReadingProgressBar } from '@/components/article/reading-progress-bar';
import { ViewCountTracker } from '@/components/article/view-count-tracker';
import { getArticle, getArticleComments } from '@imkdw-dev/api-client';
import { createMetadata } from '@/utils/metadata-creator';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@imkdw-dev/i18n';

interface Props {
  params: Promise<{ slug: string; locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await getArticle(slug);

  return createMetadata({
    title: article.title,
    description: article.plainContent,
  });
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;

  const [response, commentsResponse, tArticle, tArticles, tCommon, tComments, tUi] = await Promise.all([
    getArticle(slug),
    getArticleComments(slug),
    getTranslations('article'),
    getTranslations('articles'),
    getTranslations('common'),
    getTranslations('comments'),
    getTranslations('ui'),
  ]);
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

  const articleInteractionsTranslations = {
    deleteDialog: {
      title: tArticle('deleteDialog.title'),
      description: tArticle('deleteDialog.description'),
      cancel: tCommon('buttons.cancel'),
      delete: tCommon('buttons.delete'),
      deleting: tCommon('status.deleting'),
    },
    toast: {
      copySuccess: tArticle('toast.copySuccess'),
      copyError: tArticle('toast.copyError'),
      deleteSuccess: tArticle('toast.deleteSuccess'),
      deleteError: tArticle('toast.deleteError'),
    },
    buttons: {
      share: tArticle('buttons.share'),
      edit: tArticle('buttons.edit'),
      delete: tCommon('buttons.delete'),
    },
  };

  const commentTranslations = {
    sectionTitle: tComments('sectionTitle'),
    form: {
      placeholder: tComments('form.placeholder'),
      placeholderNotLoggedIn: tComments('form.placeholderNotLoggedIn'),
      submitHint: tComments('form.submitHint'),
      loginRequired: tComments('form.loginRequired'),
    },
    list: {
      empty: tComments('list.empty'),
      emptyHint: tComments('list.emptyHint'),
    },
    item: {
      editAction: tComments('actions.edit'),
      deleteAction: tComments('actions.delete'),
      editingStatus: tComments('editing.status'),
      save: tCommon('buttons.save'),
      cancel: tCommon('buttons.cancel'),
    },
  };

  const codeBlockTranslations = {
    copySuccess: tUi('codeBlock.copySuccess'),
    copyFailed: tUi('codeBlock.copyFailed'),
  };

  const imageZoomTranslations = {
    close: tUi('imageZoom.close'),
    zoomIn: tUi('imageZoom.zoomIn'),
    zoomOut: tUi('imageZoom.zoomOut'),
  };

  return (
    <Layout enableOverflow={false}>
      <ReadingProgressBar />
      <ViewCountTracker slug={slug} />
      <div className="max-w-7xl mx-auto p-6 lg:flex lg:gap-8">
        <div className="flex-1 max-w-4xl flex flex-col">
          <ArticleHeader article={article} locale={locale}>
            <ArticleInteractions slug={slug} translations={articleInteractionsTranslations} />
          </ArticleHeader>
          <ArticleContent
            article={article}
            codeBlockTranslations={codeBlockTranslations}
            imageZoomTranslations={imageZoomTranslations}
          />
          <ArticleNavigation
            previousArticle={navigationArticles.previousArticle}
            nextArticle={navigationArticles.nextArticle}
            translations={{
              previousArticle: tArticles('navigation.previous'),
              nextArticle: tArticles('navigation.next'),
            }}
          />
          <CommentSection
            articleSlug={slug}
            initialComments={commentsResponse.comments}
            locale={locale}
            translations={commentTranslations}
          />
        </div>
        <aside className="hidden lg:block sticky top-4 self-start">
          <TableOfContents content={article.content} title={tArticles('detail.tableOfContents')} />
        </aside>
      </div>
    </Layout>
  );
}
