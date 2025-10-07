'use client';

import type { Comment } from './types';
import { CommentItem } from './comment-item';

interface Props {
  comments: Comment[];
  onReply: (username: string, commentId: string) => void;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
}

export function CommentList({ comments, onReply, onDelete, onEdit }: Props) {
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
        <CommentItem key={comment.id} comment={comment} onReply={onReply} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
