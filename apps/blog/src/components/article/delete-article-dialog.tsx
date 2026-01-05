'use client';

import { DeleteConfirmDialog } from '../common/delete-confirm-dialog';

interface Translations {
  title: string;
  description: string;
  cancel: string;
  delete: string;
  deleting: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
  translations: Translations;
}

export function DeleteArticleDialog({ open, onClose, onConfirm, isDeleting, translations }: Props) {
  return (
    <DeleteConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      isDeleting={isDeleting}
      title={translations.title}
      description={translations.description}
      translations={{
        cancel: translations.cancel,
        delete: translations.delete,
        deleting: translations.deleting,
      }}
    />
  );
}
