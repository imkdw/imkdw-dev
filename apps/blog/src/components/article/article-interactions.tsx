'use client';

import Link from 'next/link';
import { Button } from '@imkdw-dev/ui';
import { useToast } from '@imkdw-dev/toast';
import { Share2, Edit } from 'lucide-react';
import { useAuth } from '@imkdw-dev/auth';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { useMemo } from 'react';

interface Props {
  slug: string;
}

export function ArticleInteractions({ slug }: Props) {
  const { toast } = useToast();
  const { member } = useAuth();

  const url = useMemo(() => `${window.location.origin}/articles/${slug}`, [slug]);

  const handleCopyLink = async (event: React.MouseEvent<HTMLButtonElement>) => {
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

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={handleCopyLink}>
        <Share2 className="w-4 h-4 sm:mr-1" />
        <span className="hidden sm:inline">Share</span>
      </Button>
      {member?.role === MEMBER_ROLE.ADMIN && (
        <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
          <Link href={`/articles/${slug}/edit`}>
            <Edit className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">Edit</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
