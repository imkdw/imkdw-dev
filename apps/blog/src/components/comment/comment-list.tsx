'use client';

import { IArticleCommentDto } from '@imkdw-dev/types';
import { CommentItem } from './comment-item/comment-item';

interface Props {
  comments: IArticleCommentDto[];
  articleSlug: string;
  onDelete: () => Promise<void>;
}

export function CommentList({ comments, articleSlug, onDelete }: Props) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">아직 댓글이 없습니다.</p>
        <p className="text-sm text-muted-foreground mt-1">첫 번째 댓글을 작성해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} articleSlug={articleSlug} onDelete={onDelete} />
      ))}
    </div>
  );
}
