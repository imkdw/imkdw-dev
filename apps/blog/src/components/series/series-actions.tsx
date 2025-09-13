'use client';

import { useState } from 'react';
import { Button } from '@imkdw-dev/ui';
import { Bookmark, Share2 } from 'lucide-react';

export function SeriesActions() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
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
      <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
        <Share2 className="h-4 w-4" />
        <span className="hidden sm:inline ml-2">공유</span>
      </Button>
    </div>
  );
}
