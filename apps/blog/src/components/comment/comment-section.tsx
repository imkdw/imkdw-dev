'use client';

import { useState } from 'react';
import { useCommentForm } from '@/hooks';
import { IArticleCommentDto } from '@imkdw-dev/types';
import { getArticleComments } from '@imkdw-dev/api-client';
import { CommentForm } from './comment-form';
import { CommentList } from './comment-list';

interface Props {
  articleSlug: string;
  initialComments: IArticleCommentDto[];
}

export function CommentSection({ articleSlug, initialComments }: Props) {
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

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">댓글 {comments.length}개</h3>
      </div>
      <CommentForm
        newComment={content}
        onCommentChange={setContent}
        onSubmit={handleSubmitComment}
        onKeyPress={handleKeyPress}
        isSubmitting={isSubmitting}
      />
      <CommentList comments={comments} articleSlug={articleSlug} onDelete={handleDelete} />
    </div>
  );
}
