'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Button } from '@imkdw-dev/ui';

interface Translations {
  title: string;
  description: string;
  subDescription: string;
  restore: string;
  discard: string;
}

interface Props {
  open: boolean;
  onRestore: () => void;
  onDiscard: () => void;
  translations: Translations;
}

export function DraftRestoreDialog({ open, onRestore, onDiscard, translations }: Props) {
  return (
    <Dialog open={open} onClose={onDiscard}>
      <DialogContent>
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>{translations.title}</DialogTitle>
          <div>
            <DialogDescription>{translations.description}</DialogDescription>
            <DialogDescription>{translations.subDescription}</DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onDiscard}>
            {translations.discard}
          </Button>
          <Button onClick={onRestore}>{translations.restore}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
