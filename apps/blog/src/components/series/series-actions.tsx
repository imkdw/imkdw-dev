'use client';

import { useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Button } from '@imkdw-dev/ui';
import { useToast } from '@imkdw-dev/toast';
import { useAuth } from '@imkdw-dev/auth';
import { Share2, Edit, Trash2 } from 'lucide-react';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { deleteSeries } from '@imkdw-dev/api-client';
import { DeleteConfirmDialog } from '../common/delete-confirm-dialog';

interface DeleteDialogTranslations {
  title: string;
  description: string;
  cancel: string;
  delete: string;
  deleting: string;
}

interface ToastTranslations {
  copySuccess: string;
  copyError: string;
  deleteSuccess: string;
  deleteError: string;
}

interface ButtonTranslations {
  share: string;
  edit: string;
  delete: string;
}

interface Translations {
  deleteDialog: DeleteDialogTranslations;
  toast: ToastTranslations;
  buttons: ButtonTranslations;
}

interface Props {
  slug: string;
  translations: Translations;
}

export function SeriesActions({ slug, translations }: Props) {
  const { toast } = useToast();
  const { member } = useAuth();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const url = `${process.env.NEXT_PUBLIC_BLOG_URL}/series/${slug}`;

  const handleCopyLink = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(url);
      toast({ title: '', description: translations.toast.copySuccess });
    } catch {
      toast({
        title: '',
        description: translations.toast.copyError,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await deleteSeries(slug);
      toast({ title: '', description: translations.toast.deleteSuccess });
      router.push('/series');
    } catch {
      toast({
        title: '',
        description: translations.toast.deleteError,
        variant: 'destructive',
      });
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" onClick={handleCopyLink} className="hover:bg-primary/10 hover:text-primary">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">{translations.buttons.share}</span>
        </Button>
        {member?.role === MEMBER_ROLE.ADMIN && (
          <>
            <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary">
              <Link href={`/series/${slug}/edit`}>
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">{translations.buttons.edit}</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteClick}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">{translations.buttons.delete}</span>
            </Button>
          </>
        )}
      </div>
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        title={translations.deleteDialog.title}
        description={translations.deleteDialog.description}
        translations={{
          cancel: translations.deleteDialog.cancel,
          delete: translations.deleteDialog.delete,
          deleting: translations.deleteDialog.deleting,
        }}
      />
    </>
  );
}
