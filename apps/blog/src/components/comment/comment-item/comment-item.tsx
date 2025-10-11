'use client';

import { useState } from 'react';
import { IArticleCommentDto } from '@imkdw-dev/types';
import { deleteArticleComment } from '@imkdw-dev/actions';
import { CommentContent } from './comment-content';
import { useAuth } from '@imkdw-dev/auth';

export interface Props {
  comment: IArticleCommentDto;
  articleSlug: string;
  onDelete: () => Promise<void>;
  onEdit: (commentId: string, newContent: string) => void;
}

export function CommentItem({ comment, articleSlug, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { user } = useAuth();

  const isOwner = comment.author.nickname === user?.nickname;

  const handleDeleteComment = async () => {
    await deleteArticleComment(articleSlug, comment.id);
    await onDelete();
  };

  const handleEditSave = () => {
    if (editContent.trim() && editContent !== comment.content) {
      onEdit(comment.id, editContent.trim());
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
