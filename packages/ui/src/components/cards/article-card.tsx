'use client';

import { Badge } from '../../primitives/badge';
import { GitBranch, Calendar, Clock, ChevronRight } from 'lucide-react';
import { TagList } from './tag-list';
import { MetaInfoItem } from './meta-info-item';
import Link from 'next/link';
import { IArticleListItemDto } from '@imkdw-dev/types';

interface Props {
  article: IArticleListItemDto;
}

export function ArticleCard({ article }: Props) {
  const publishedAt = new Date(article.createdAt).toLocaleDateString('ko-KR');
  const readTime = `${article.readMinute}분`;
  const tags = article.tags.map(tag => tag.name);
  const { title, content, series, slug } = article;

  return (
    <Link href={`/articles/${slug}`} className="block h-full">
      <div className="rounded-xl p-2 group cursor-pointer h-full flex flex-col bg-gradient-to-br from-card via-card to-muted/30 border-2 border-border/60 hover:border-primary/30 hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.3)] transition-all duration-300">
        <div className="flex-1 p-3 md:p-4">
          <div className="flex items-center mb-2 md:mb-3">
            <GitBranch className="h-4 w-4 text-accent" />
            <Badge variant="secondary" className="text-sm">
              {series.title}
            </Badge>
          </div>
          <h3 className="text-base md:text-lg font-bold leading-tight group-hover:text-primary smooth-transition line-clamp-2 pb-2">
            {title}
          </h3>
          <p className="text-muted-foreground mb-2 md:mb-3 text-md leading-relaxed line-clamp-3 flex-1">{content}</p>
          <TagList tags={tags} maxVisible={3} variant="custom" className="mb-2 md:mb-3" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground mt-auto space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2 md:space-x-3">
              <MetaInfoItem icon={<Calendar className="h-3 w-3" />} text={publishedAt} className="truncate" />
              <MetaInfoItem icon={<Clock className="h-3 w-3" />} text={readTime} />
            </div>
            <div className="flex items-center space-x-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-sm">Read</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
