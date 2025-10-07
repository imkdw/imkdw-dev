'use client';

import { useState } from 'react';
import { useToast } from '@imkdw-dev/toast';
import { useCommentForm } from '@imkdw-dev/hooks';
import type { Comment } from './types';
import { CommentForm } from './comment-form';
import { CommentList } from './comment-list';

interface Props {
  articleSlug: string;
}

export function CommentSection({ articleSlug }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
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
    setComments(prevComments =>
      prevComments.filter(comment => {
        if (comment.id === commentId) return false;
        if (comment.replies) {
          comment.replies = comment.replies.filter(reply => reply.id !== commentId);
        }
        return true;
      })
    );
  };

  const handleEdit = (commentId: string, newContent: string) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, content: newContent };
        }
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => (reply.id === commentId ? { ...reply, content: newContent } : reply)),
          };
        }
        return comment;
      })
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
