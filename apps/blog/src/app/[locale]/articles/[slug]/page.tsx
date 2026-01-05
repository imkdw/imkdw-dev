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
  const t = await getTranslations();

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

  const articleInteractionsTranslations = {
    deleteDialog: {
      title: t('article.deleteDialog.title'),
      description: t('article.deleteDialog.description'),
      cancel: t('common.buttons.cancel'),
      delete: t('common.buttons.delete'),
      deleting: t('common.status.deleting'),
    },
    toast: {
      copySuccess: t('article.toast.copySuccess'),
      copyError: t('article.toast.copyError'),
      deleteSuccess: t('article.toast.deleteSuccess'),
      deleteError: t('article.toast.deleteError'),
    },
    buttons: {
      share: t('article.buttons.share'),
      edit: t('article.buttons.edit'),
      delete: t('common.buttons.delete'),
    },
  };

  const commentTranslations = {
    sectionTitle: t('comments.sectionTitle'),
    form: {
      placeholder: t('comments.form.placeholder'),
      placeholderNotLoggedIn: t('comments.form.placeholderNotLoggedIn'),
      submitHint: t('comments.form.submitHint'),
      loginRequired: t('comments.form.loginRequired'),
    },
    list: {
      empty: t('comments.list.empty'),
      emptyHint: t('comments.list.emptyHint'),
    },
    item: {
      editAction: t('comments.actions.edit'),
      deleteAction: t('comments.actions.delete'),
      editingStatus: t('comments.editing.status'),
      save: t('common.buttons.save'),
      cancel: t('common.buttons.cancel'),
    },
  };

  const codeBlockTranslations = {
    copySuccess: t('ui.codeBlock.copySuccess'),
    copyFailed: t('ui.codeBlock.copyFailed'),
  };

  const imageZoomTranslations = {
    close: t('ui.imageZoom.close'),
    zoomIn: t('ui.imageZoom.zoomIn'),
    zoomOut: t('ui.imageZoom.zoomOut'),
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
          {/* <RelatedArticles articles={relatedArticles} /> */}
          <ArticleNavigation
            previousArticle={navigationArticles.previousArticle}
            nextArticle={navigationArticles.nextArticle}
          />
          <CommentSection
            articleSlug={slug}
            initialComments={commentsResponse.comments}
            locale={locale}
            translations={commentTranslations}
          />
        </div>
        <aside className="hidden lg:block sticky top-4 self-start">
          <TableOfContents content={article.content} title={t('articles.detail.tableOfContents')} />
        </aside>
      </div>
    </Layout>
  );
}
