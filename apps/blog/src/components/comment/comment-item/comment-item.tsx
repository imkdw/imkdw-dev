'use client';

import { useState } from 'react';
import { IArticleCommentDto } from '@imkdw-dev/types';
import { deleteArticleComment, updateArticleComment } from '@imkdw-dev/api-client';
import { CommentContent } from './comment-content';
import { useAuth } from '@imkdw-dev/auth';

interface CommentItemTranslations {
  editAction: string;
  deleteAction: string;
  editingStatus: string;
  save: string;
  cancel: string;
}

export interface Props {
  comment: IArticleCommentDto;
  articleSlug: string;
  onDelete: () => Promise<void>;
  translations: CommentItemTranslations;
}

export function CommentItem({ comment, articleSlug, onDelete, translations }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { member: user } = useAuth();

  const isOwner = comment.author.nickname === user?.nickname;

  const handleDeleteComment = async () => {
    await deleteArticleComment(articleSlug, comment.id);
    await onDelete();
  };

  const handleEditSave = async () => {
    if (editContent.trim() && editContent !== comment.content) {
      await updateArticleComment(articleSlug, comment.id, { content: editContent.trim() });
      await onDelete();
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
        translations={translations}
      />
    </div>
  );
}
