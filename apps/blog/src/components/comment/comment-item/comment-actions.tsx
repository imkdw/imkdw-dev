import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@imkdw-dev/ui';
import { MoreHorizontal, Edit3, Trash2 } from 'lucide-react';

interface Props {
  isOwner: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export function CommentActions({ isOwner, isEditing, onEdit, onDelete }: Props) {
  if (!isOwner) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center justify-center h-auto p-1 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground transition-colors rounded-md">
        <MoreHorizontal className="w-4 h-4" />
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
  );
}
