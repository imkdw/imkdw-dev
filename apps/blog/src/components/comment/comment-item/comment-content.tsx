'use client';

import { Avatar, AvatarImage, AvatarFallback, Button, Textarea } from '@imkdw-dev/ui';
import type { IArticleCommentDto } from '@imkdw-dev/types';
import { formatDate } from '@imkdw-dev/utils';
import { CommentActions } from './comment-actions';

interface Props {
  comment: IArticleCommentDto;
  isOwner: boolean;
  isEditing: boolean;
  editContent: string;
  onEditContentChange: (value: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CommentContent({
  comment,
  isOwner,
  isEditing,
  editContent,
  onEditContentChange,
  onEditSave,
  onEditCancel,
  onEdit,
  onDelete,
}: Props) {
  return (
    <>
      {/* 모바일 */}
      <div className="md:hidden flex items-start space-x-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={comment.author.profileImage} />
          <AvatarFallback>{comment.author.nickname.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-muted/50 rounded-2xl px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{comment.author.nickname}</span>
              <CommentActions isOwner={isOwner} isEditing={isEditing} onEdit={onEdit} onDelete={onDelete} />
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
              {isEditing && <span className="text-xs text-primary">편집 중</span>}
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editContent}
                  onChange={e => onEditContentChange(e.target.value)}
                  className="min-h-[60px] text-sm resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={onEditSave} size="sm" className="h-7 text-xs">
                    저장
                  </Button>
                  <Button onClick={onEditCancel} variant="outline" size="sm" className="h-7 text-xs">
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">{comment.content}</div>
            )}
          </div>
        </div>
      </div>

      {/* 데스크탑 */}
      <div className="hidden md:flex items-start space-x-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={comment.author.profileImage} />
          <AvatarFallback>{comment.author.nickname.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-muted/50 rounded-2xl px-4 py-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-sm">{comment.author.nickname}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
              <CommentActions isOwner={isOwner} isEditing={isEditing} onEdit={onEdit} onDelete={onDelete} />
              {isEditing && <span className="text-xs text-primary">편집 중</span>}
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editContent}
                  onChange={e => onEditContentChange(e.target.value)}
                  className="min-h-[60px] text-sm resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={onEditSave} size="sm" className="h-7 text-xs">
                    저장
                  </Button>
                  <Button onClick={onEditCancel} variant="outline" size="sm" className="h-7 text-xs">
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">{comment.content}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
