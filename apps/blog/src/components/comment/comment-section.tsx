'use client';

import { useState, useCallback, type KeyboardEvent } from 'react';
import { useCommentForm } from '@/hooks';
import { IArticleCommentDto } from '@imkdw-dev/types';
import type { Locale } from '@imkdw-dev/i18n';
import { getArticleComments } from '@imkdw-dev/api-client';
import { CommentForm } from './comment-form';
import { CommentList } from './comment-list';

interface CommentSectionTranslations {
  sectionTitle: string;
  form: {
    placeholder: string;
    placeholderNotLoggedIn: string;
    submitHint: string;
    loginRequired: string;
  };
  list: {
    empty: string;
    emptyHint: string;
  };
  item: {
    editAction: string;
    deleteAction: string;
    editingStatus: string;
    save: string;
    cancel: string;
  };
}

interface Props {
  articleSlug: string;
  initialComments: IArticleCommentDto[];
  locale: Locale;
  translations: CommentSectionTranslations;
}

export function CommentSection({ articleSlug, initialComments, locale, translations }: Props) {
  const [comments, setComments] = useState<IArticleCommentDto[]>(initialComments);

  const refetchComments = useCallback(async () => {
    const response = await getArticleComments(articleSlug);
    setComments(response.comments);
  }, [articleSlug]);

  const { content, setContent, isSubmitting, handleSubmit } = useCommentForm({
    onSuccess: refetchComments,
  });

  const handleDelete = useCallback(async () => {
    await refetchComments();
  }, [refetchComments]);

  const handleSubmitComment = useCallback(() => {
    handleSubmit(articleSlug);
  }, [handleSubmit, articleSlug]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmitComment();
      }
    },
    [handleSubmitComment]
  );

  const sectionTitle = translations.sectionTitle.replace('__count__', String(comments.length));

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">{sectionTitle}</h3>
      </div>
      <CommentForm
        newComment={content}
        onCommentChange={setContent}
        onSubmit={handleSubmitComment}
        onKeyPress={handleKeyPress}
        isSubmitting={isSubmitting}
        translations={translations.form}
      />
      <CommentList
        comments={comments}
        articleSlug={articleSlug}
        locale={locale}
        onDelete={handleDelete}
        translations={translations.list}
        itemTranslations={translations.item}
      />
    </div>
  );
}
