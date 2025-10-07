'use client';

import { Avatar, AvatarImage, AvatarFallback, Button, Textarea } from '@imkdw-dev/ui';

interface CommentContentProps {
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isEditing: boolean;
  editContent: string;
  onEditContentChange: (value: string) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
}

export function CommentContent({
  author,
  content,
  timestamp,
  isEditing,
  editContent,
  onEditContentChange,
  onEditSave,
  onEditCancel,
}: CommentContentProps) {
  return (
    <div className="flex items-start space-x-3">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={author.avatar} />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="bg-muted/50 rounded-2xl px-4 py-3">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm">{author.name}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
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
            <div className="prose prose-sm dark:prose-invert max-w-none">{content}</div>
          )}
        </div>
      </div>
    </div>
  );
}
