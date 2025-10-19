'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@imkdw-dev/ui';
import { useToast } from '@imkdw-dev/toast';
import { Share2, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@imkdw-dev/auth';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { useEffect, useState } from 'react';
import { deleteArticle } from '@imkdw-dev/actions';
import { DeleteArticleDialog } from './delete-article-dialog';
import { MouseEvent } from 'react';

interface Props {
  slug: string;
}

export function ArticleInteractions({ slug }: Props) {
  const { toast } = useToast();
  const { member } = useAuth();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(`${window.location.origin}/articles/${slug}`);
  }, [slug]);

  const handleCopyLink = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(url);
      toast({ title: '', description: '클립보드에 글 링크가 저장되었습니다.' });
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
      await deleteArticle(slug);
      toast({ title: '', description: '게시글이 삭제되었습니다.' });
      router.push('/');
    } catch {
      toast({
        title: '',
        description: '게시글 삭제에 실패했습니다.',
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
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={handleCopyLink}>
          <Share2 className="w-4 h-4 sm:mr-1" />
          <span className="hidden sm:inline">Share</span>
        </Button>
        {member?.role === MEMBER_ROLE.ADMIN && (
          <>
            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
              <Link href={`/articles/${slug}/edit`}>
                <Edit className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">Edit</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={handleDeleteClick}>
              <Trash2 className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </>
        )}
      </div>
      <DeleteArticleDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </>
  );
}
