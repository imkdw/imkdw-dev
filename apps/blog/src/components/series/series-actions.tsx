'use client';

import { useState, MouseEvent, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@imkdw-dev/ui';
import { useToast } from '@imkdw-dev/toast';
import { useAuth } from '@imkdw-dev/auth';
import { Bookmark, Share2, Edit, Trash2 } from 'lucide-react';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { deleteSeries } from '@imkdw-dev/actions';
import { DeleteConfirmDialog } from '../common/delete-confirm-dialog';

interface Props {
  slug: string;
}

export function SeriesActions({ slug }: Props) {
  const { toast } = useToast();
  const { member } = useAuth();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const url = useMemo(() => `${window.location.origin}/series/${slug}`, [slug]);

  const handleCopyLink = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(url);
      toast({ title: '', description: '클립보드에 시리즈 링크가 저장되었습니다.' });
    } catch {
      toast({
        title: '',
        description: '링크 복사에 실패했습니다.',
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
      toast({ title: '', description: '시리즈가 삭제되었습니다.' });
      router.push('/series');
    } catch {
      toast({
        title: '',
        description: '시리즈 삭제에 실패했습니다.',
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="hover:bg-primary/10 hover:text-primary"
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current text-primary' : ''}`} />
          <span className="hidden sm:inline ml-2">북마크</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCopyLink} className="hover:bg-primary/10 hover:text-primary">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">공유</span>
        </Button>
        {member?.role === MEMBER_ROLE.ADMIN && (
          <>
            <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary">
              <Link href={`/series/${slug}/edit`}>
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">수정</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteClick}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">삭제</span>
            </Button>
          </>
        )}
      </div>
      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        title="시리즈 삭제"
        description="정말로 이 시리즈를 삭제하시겠습니까?"
      />
    </>
  );
}
