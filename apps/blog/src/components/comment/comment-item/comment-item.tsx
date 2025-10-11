'use client';

import { useState } from 'react';
import { useToast } from '@imkdw-dev/toast';
import { IArticleCommentDto } from '@imkdw-dev/types';
import { CommentContent } from './comment-content';
import { useAuth } from '@imkdw-dev/auth';

export interface Props {
  comment: IArticleCommentDto;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
}

export function CommentItem({ comment, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { toast } = useToast();
  const { user } = useAuth();

  const isOwner = comment.author.nickname === user?.nickname;

  const handleDeleteComment = () => {
    onDelete(comment.id);
    toast({
      title: '댓글이 삭제되었습니다',
      description: '댓글이 성공적으로 삭제되었습니다.',
    });
  };

  const handleEditSave = () => {
    if (editContent.trim() && editContent !== comment.content) {
      onEdit(comment.id, editContent.trim());
      toast({
        title: '댓글이 수정되었습니다',
        description: '댓글이 성공적으로 수정되었습니다.',
      });
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className="mt-6 animate-fade-in">
      <CommentContent
        comment={comment}
        isOwner={isOwner}
        isEditing={isEditing}
        editContent={editContent}
        onEditContentChange={setEditContent}
        onEditSave={handleEditSave}
        onEditCancel={handleEditCancel}
        onEdit={() => setIsEditing(true)}
        onDelete={handleDeleteComment}
      />
    </div>
  );
}
