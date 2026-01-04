'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button } from '@imkdw-dev/ui';

interface Translations {
  cancel: string;
  delete: string;
  deleting: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
  title: string;
  description: string;
  translations: Translations;
}

export function DeleteConfirmDialog({ open, onClose, onConfirm, isDeleting, title, description, translations }: Props) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            {translations.cancel}
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isDeleting}>
            {isDeleting ? translations.deleting : translations.delete}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
