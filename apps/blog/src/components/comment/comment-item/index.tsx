'use client';

import { useState } from 'react';
import { useToast } from '@imkdw-dev/toast';
import { CommentContent } from './comment-content';
import { CommentActions } from './comment-actions';
import { Comment } from '@/components/comment/types';

export interface Props {
  comment: Comment;
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

  const isOwner = comment.author.username === currentUserId;

  const handleReply = () => {
    onReply(comment.author.username, comment.id);
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
        author={comment.author}
        content={comment.content}
        timestamp={comment.timestamp}
        isEditing={isEditing}
        editContent={editContent}
        onEditContentChange={setEditContent}
        onEditSave={handleEditSave}
        onEditCancel={handleEditCancel}
      />

      <CommentActions
        depth={depth}
        hasReplies={!!comment.replies && comment.replies.length > 0}
        showReplies={showReplies}
        repliesCount={comment.replies?.length ?? 0}
        isOwner={isOwner}
        isEditing={isEditing}
        onReply={handleReply}
        onToggleReplies={() => setShowReplies(!showReplies)}
        onEdit={() => setIsEditing(true)}
        onDelete={handleDeleteComment}
      />

      {/* Replies */}
      {showReplies && comment.replies && (
        <div className="mt-4">
          {comment.replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onDelete={onDelete}
              onEdit={onEdit}
              depth={depth + 1}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
