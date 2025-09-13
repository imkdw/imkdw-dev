'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, useToast } from '@imkdw-dev/ui';
import { Star, Share2, Edit } from 'lucide-react';

interface ArticleInteractionsProps {
  slug: string;
}

export function ArticleInteractions({ slug }: ArticleInteractionsProps) {
  const [isStarred, setIsStarred] = useState(false);
  const { toast } = useToast();

  const handleStar = () => {
    setIsStarred(!isStarred);
    toast({
      title: isStarred ? '즐겨찾기에서 제거되었습니다' : '즐겨찾기에 추가되었습니다',
      description: isStarred ? '이 글이 즐겨찾기에서 제거되었습니다.' : '이 글이 즐겨찾기에 추가되었습니다.',
    });
  };

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
        // 사용자가 공유를 취소한 경우 아무것도 하지 않음
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
      <Button
        variant="outline"
        size="sm"
        className={`text-xs sm:text-sm ${isStarred ? 'text-yellow-600 border-yellow-600' : ''}`}
        onClick={handleStar}
      >
        <Star className={`w-4 h-4 sm:mr-1 ${isStarred ? 'fill-current' : ''}`} />
        <span className="hidden sm:inline">{isStarred ? 'Starred' : 'Star'}</span>
      </Button>
      <Button variant="outline" size="sm" className="text-xs sm:text-sm" onClick={handleShare}>
        <Share2 className="w-4 h-4 sm:mr-1" />
        <span className="hidden sm:inline">Share</span>
      </Button>
      <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
        <Link href={`/edit/${slug}`}>
          <Edit className="w-4 h-4 sm:mr-1" />
          <span className="hidden sm:inline">Edit</span>
        </Link>
      </Button>
    </div>
  );
}
