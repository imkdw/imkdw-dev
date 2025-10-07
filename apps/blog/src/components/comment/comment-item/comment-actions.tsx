'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@imkdw-dev/ui';
import { Reply, MoreHorizontal, Edit3, Trash2 } from 'lucide-react';

interface CommentActionsProps {
  depth: number;
  hasReplies: boolean;
  showReplies: boolean;
  repliesCount: number;
  isOwner: boolean;
  isEditing: boolean;
  onReply: () => void;
  onToggleReplies: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CommentActions({
  depth,
  hasReplies,
  showReplies,
  repliesCount,
  isOwner,
  isEditing,
  onReply,
  onToggleReplies,
  onEdit,
  onDelete,
}: CommentActionsProps) {
  return (
    <div className="flex items-center space-x-4 mt-2 ml-2">
      {/* 답글 버튼은 최상위 댓글(depth 0)에서만 표시 */}
      {depth === 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReply}
          className="h-auto p-1 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <Reply className="w-4 h-4 mr-1" />
          답글
        </Button>
      )}

      {hasReplies && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleReplies}
          className="h-auto p-1 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          {showReplies ? '답글 숨기기' : `답글 ${repliesCount}개 보기`}
        </Button>
      )}

      {isOwner && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground ml-auto"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={onEdit} disabled={isEditing}>
              <Edit3 className="w-4 h-4 mr-2" />
              댓글 수정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              댓글 삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
