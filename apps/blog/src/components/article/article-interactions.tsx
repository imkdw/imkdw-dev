'use client';

import Link from 'next/link';
import { Button } from '@imkdw-dev/ui';
import { useToast } from '@imkdw-dev/toast';
import { Share2, Edit } from 'lucide-react';

interface Props {
  slug: string;
}

export function ArticleInteractions({ slug }: Props) {
  const { toast } = useToast();

  const handleShare = async () => {
    const url = `${window.location.origin}/articles/${slug}`;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- navigator.share는 모든 브라우저에서 지원되지 않음
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Understanding React Server Components',
          text: 'React Server Components에 대한 깊이 있는 가이드',
          url,
        });
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== 'AbortError') {
            handleCopyLink(url);
          }
        } else {
          handleCopyLink(url);
        }
      }
    } else {
      handleCopyLink(url);
    }
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: '링크가 복사되었습니다',
        description: '클립보드에 글 링크가 저장되었습니다.',
      });
    } catch {
      toast({
        title: '링크 복사 실패',
        description: '링크 복사에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={handleShare}>
        <Share2 className="w-4 h-4 sm:mr-1" />
        <span className="hidden sm:inline">Share</span>
      </Button>
      <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
        <Link href={`${slug}/edit`}>
          <Edit className="w-4 h-4 sm:mr-1" />
          <span className="hidden sm:inline">Edit</span>
        </Link>
      </Button>
    </div>
  );
}
