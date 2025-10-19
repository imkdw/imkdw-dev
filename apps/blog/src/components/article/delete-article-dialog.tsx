'use client';

import { DeleteConfirmDialog } from '../common/delete-confirm-dialog';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export function DeleteArticleDialog({ open, onClose, onConfirm, isDeleting }: Props) {
  return (
    <DeleteConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      isDeleting={isDeleting}
      title="게시글 삭제"
      description="정말로 이 게시글을 삭제하시겠습니까?"
    />
  );
}
