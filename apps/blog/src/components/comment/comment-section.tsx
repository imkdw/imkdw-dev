'use client';

import { useState } from 'react';
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

  const refetchComments = async () => {
    const response = await getArticleComments(articleSlug);
    setComments(response.comments);
  };

  const { content, setContent, isSubmitting, handleSubmit } = useCommentForm({
    onSuccess: async () => {
      await refetchComments();
    },
  });

  const handleDelete = async () => {
    await refetchComments();
  };

  const handleSubmitComment = () => {
    handleSubmit(articleSlug);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  const sectionTitle = translations.sectionTitle.replace('{count}', String(comments.length));

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
