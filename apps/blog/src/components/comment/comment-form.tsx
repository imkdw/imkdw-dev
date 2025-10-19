'use client';

import { KeyboardEvent } from 'react';
import { useAuth } from '@imkdw-dev/auth';
import { Avatar, AvatarImage, AvatarFallback, Button, Textarea } from '@imkdw-dev/ui';
import { Send } from 'lucide-react';

interface Props {
  newComment: string;
  onCommentChange: (value: string) => void;
  onSubmit: () => void;
  onKeyPress: (e: KeyboardEvent) => void;
  isSubmitting?: boolean;
}

export function CommentForm({ newComment, onCommentChange, onSubmit, onKeyPress, isSubmitting }: Props) {
  const { member } = useAuth();
  const isLoggedIn = member !== null;

  return (
    <div className="mb-8 bg-muted/30 rounded-xl p-4">
      <div className="flex space-x-3">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={member?.profileImage} />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="relative">
            <Textarea
              placeholder={isLoggedIn ? '댓글을 작성해주세요...' : '로그인이 필요합니다'}
              value={newComment}
              onChange={e => onCommentChange(e.target.value)}
              onKeyDown={onKeyPress}
              className="min-h-[80px] pr-12 resize-none"
              disabled={!isLoggedIn}
            />
            <Button
              onClick={onSubmit}
              disabled={!isLoggedIn || !newComment.trim() || isSubmitting}
              size="sm"
              className="absolute bottom-2 right-2 h-8 w-8 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-between items-center mt-2">
            {isLoggedIn ? (
              <>
                <p className="text-xs text-muted-foreground">Cmd/Ctrl + Enter로 빠르게 등록</p>
                <p className="text-xs text-muted-foreground">{newComment.length}/1000</p>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">댓글을 작성하려면 로그인이 필요합니다</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
