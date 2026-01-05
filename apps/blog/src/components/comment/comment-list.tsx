'use client';

import { IArticleCommentDto } from '@imkdw-dev/types';
import { CommentItem } from './comment-item/comment-item';

interface CommentListTranslations {
  empty: string;
  emptyHint: string;
}

interface CommentItemTranslations {
  editAction: string;
  deleteAction: string;
  editingStatus: string;
  save: string;
  cancel: string;
}

interface Props {
  comments: IArticleCommentDto[];
  articleSlug: string;
  onDelete: () => Promise<void>;
  translations: CommentListTranslations;
  itemTranslations: CommentItemTranslations;
}

export function CommentList({ comments, articleSlug, onDelete, translations, itemTranslations }: Props) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{translations.empty}</p>
        <p className="text-sm text-muted-foreground mt-1">{translations.emptyHint}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          articleSlug={articleSlug}
          onDelete={onDelete}
          translations={itemTranslations}
        />
      ))}
    </div>
  );
}
