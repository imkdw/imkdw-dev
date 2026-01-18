'use client';

import { Avatar, AvatarImage, AvatarFallback, Button, Textarea } from '@imkdw-dev/ui';
import type { IArticleCommentDto } from '@imkdw-dev/types';
import type { Locale } from '@imkdw-dev/i18n';
import { formatDate } from '@imkdw-dev/utils';
import { CommentActions } from './comment-actions';

interface CommentContentTranslations {
  editAction: string;
  deleteAction: string;
  editingStatus: string;
  save: string;
  cancel: string;
}

interface Props {
  comment: IArticleCommentDto;
  isOwner: boolean;
  isEditing: boolean;
  editContent: string;
  locale: Locale;
  onEditContentChange: (value: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
  translations: CommentContentTranslations;
}

export function CommentContent({
  comment,
  isOwner,
  isEditing,
  editContent,
  locale,
  onEditContentChange,
  onEditSave,
  onEditCancel,
  onEdit,
  onDelete,
  translations,
}: Props) {
  const actionsTranslations = {
    editAction: translations.editAction,
    deleteAction: translations.deleteAction,
  };

  return (
    <>
      {/* Mobile */}
      <div className="md:hidden flex items-start space-x-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={comment.author.profileImage} />
          <AvatarFallback>{comment.author.nickname.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-background-secondary border border-border rounded-2xl px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{comment.author.nickname}</span>
              <CommentActions
                isOwner={isOwner}
                isEditing={isEditing}
                onEdit={onEdit}
                onDelete={onDelete}
                translations={actionsTranslations}
              />
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt, locale)}</span>
              {isEditing && <span className="text-xs text-primary">{translations.editingStatus}</span>}
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
                    {translations.save}
                  </Button>
                  <Button onClick={onEditCancel} variant="outline" size="sm" className="h-7 text-xs">
                    {translations.cancel}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">{comment.content}</div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-start space-x-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={comment.author.profileImage} />
          <AvatarFallback>{comment.author.nickname.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-background-secondary border border-border rounded-2xl px-4 py-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-sm">{comment.author.nickname}</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt, locale)}</span>
              <CommentActions
                isOwner={isOwner}
                isEditing={isEditing}
                onEdit={onEdit}
                onDelete={onDelete}
                translations={actionsTranslations}
              />
              {isEditing && <span className="text-xs text-primary">{translations.editingStatus}</span>}
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
                    {translations.save}
                  </Button>
                  <Button onClick={onEditCancel} variant="outline" size="sm" className="h-7 text-xs">
                    {translations.cancel}
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
