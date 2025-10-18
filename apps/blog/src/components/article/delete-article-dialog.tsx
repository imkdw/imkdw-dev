'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button } from '@imkdw-dev/ui';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export function DeleteArticleDialog({ open, onClose, onConfirm, isDeleting }: Props) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>게시글 삭제</DialogTitle>
          <DialogDescription>정말로 이 게시글을 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            취소
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
