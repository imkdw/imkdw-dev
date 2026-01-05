'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button } from '@imkdw-dev/ui';

interface Props {
  open: boolean;
  onRestore: () => void;
  onDiscard: () => void;
}

export function DraftRestoreDialog({ open, onRestore, onDiscard }: Props) {
  return (
    <Dialog open={open} onClose={onDiscard}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>임시 저장된 글이 있습니다</DialogTitle>
          <div>
            <DialogDescription>이전에 작성하던 글이 발견되었습니다</DialogDescription>
            <DialogDescription>임시 저장된 내용을 불러올까요?</DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onDiscard}>
            삭제
          </Button>
          <Button onClick={onRestore}>복원</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
