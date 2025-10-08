'use client';

import { useState } from 'react';
import { useToast } from '@imkdw-dev/toast';
import { IArticleCommentDto } from '@imkdw-dev/types';
import { CommentContent } from './comment-content';
import { CommentActions } from './comment-actions';

export interface Props {
  comment: IArticleCommentDto;
  onReply: (username: string, commentId: string) => void;
  onDelete: (commentId: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
  depth?: number;
  currentUserId?: string;
}

export function CommentItem({ comment, onReply, onDelete, onEdit, depth = 0, currentUserId = 'currentuser' }: Props) {
  const [showReplies, setShowReplies] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const { toast } = useToast();

  const isOwner = comment.author.nickname === currentUserId;

  const handleReply = () => {
    onReply(comment.author.nickname, comment.id);
  };

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
    <div className={`${depth > 0 ? 'ml-8 mt-4' : 'mt-6'} animate-fade-in`}>
      <CommentContent
        comment={comment}
        isEditing={isEditing}
        editContent={editContent}
        onEditContentChange={setEditContent}
        onEditSave={handleEditSave}
        onEditCancel={handleEditCancel}
      />

      <CommentActions
        depth={depth}
        hasReplies={comment.hasReplies}
        showReplies={showReplies}
        isOwner={isOwner}
        isEditing={isEditing}
        onReply={handleReply}
        onToggleReplies={() => setShowReplies(!showReplies)}
        onEdit={() => setIsEditing(true)}
        onDelete={handleDeleteComment}
      />
    </div>
  );
}
