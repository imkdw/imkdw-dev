'use client';

import { useState } from 'react';
import { useToast } from '@imkdw-dev/toast';
import { useCommentForm } from '@imkdw-dev/hooks';
import { IArticleCommentDto } from '@imkdw-dev/types';
import { CommentForm } from './comment-form';
import { CommentList } from './comment-list';

interface Props {
  articleSlug: string;
  initialComments?: IArticleCommentDto[];
}

export function CommentSection({ articleSlug, initialComments = [] }: Props) {
  const [comments, setComments] = useState<IArticleCommentDto[]>(initialComments);
  const { toast } = useToast();

  const { content, setContent, isSubmitting, handleSubmit } = useCommentForm({
    onSuccess: () => {
      toast({
        title: '댓글이 등록되었습니다',
        description: '댓글이 성공적으로 등록되었습니다.',
      });
    },
  });

  const handleDelete = (commentId: string) => {
    setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
  };

  const handleEdit = (commentId: string, newContent: string) => {
    setComments(prevComments =>
      prevComments.map(comment => (comment.id === commentId ? { ...comment, content: newContent } : comment))
    );
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
        <p className="text-sm text-muted-foreground">이 글에 대한 생각을 댓글로 나눠주세요.</p>
      </div>

      <CommentForm
        newComment={content}
        replyingTo={null}
        onCommentChange={setContent}
        onSubmit={handleSubmitComment}
        onCancelReply={() => {}}
        onKeyPress={handleKeyPress}
        isSubmitting={isSubmitting}
      />

      <CommentList comments={comments} onReply={() => {}} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}
