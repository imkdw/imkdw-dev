'use client';

import { Avatar, AvatarImage, AvatarFallback, Button, Textarea } from '@imkdw-dev/ui';
import { Send } from 'lucide-react';

interface Props {
  newComment: string;
  replyingTo: { username: string; commentId: string } | null;
  onCommentChange: (value: string) => void;
  onSubmit: () => void;
  onCancelReply: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export function CommentForm({ newComment, replyingTo, onCommentChange, onSubmit, onCancelReply, onKeyPress }: Props) {
  return (
    <div className="mb-8 bg-muted/30 rounded-xl p-4">
      <div className="flex space-x-3">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          {replyingTo && (
            <div className="mb-2 p-2 bg-muted/50 rounded-lg text-sm">
              <span className="text-muted-foreground">답글 작성 중:</span>
              <span className="font-medium ml-1">{replyingTo.username}</span>
              <Button variant="ghost" size="sm" onClick={onCancelReply} className="ml-2 h-auto p-1 text-xs">
                취소
              </Button>
            </div>
          )}

          <div className="relative">
            <Textarea
              placeholder={replyingTo ? `${replyingTo.username}에게 답글 작성...` : '댓글을 작성해주세요...'}
              value={newComment}
              onChange={e => onCommentChange(e.target.value)}
              onKeyDown={onKeyPress}
              className="min-h-[80px] pr-12 resize-none"
            />
            <Button
              onClick={onSubmit}
              disabled={!newComment.trim()}
              size="sm"
              className="absolute bottom-2 right-2 h-8 w-8 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">Cmd/Ctrl + Enter로 빠르게 등록</p>
            <p className="text-xs text-muted-foreground">{newComment.length}/1000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
