'use client';

import { GitBranch, Calendar, Clock } from 'lucide-react';
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
  const { title, plainContent, series, slug } = article;

  return (
    <article className="block h-full">
      <Link href={`/articles/${slug}`} className="block h-full">
        <div className="rounded-xl p-2 group h-full flex flex-col bg-gradient-to-br from-card via-card to-muted/30 border-2 border-border/60 hover:border-primary/30 hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.3)] transition-all duration-300">
          <div className="flex-1 p-3 md:p-4">
            <div className="flex items-center mb-2 md:mb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-primary/10 via-primary/5 to-accent/5 border border-primary/20 hover:border-primary/40 hover:bg-primary/15 transition-all duration-200">
                <GitBranch className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-medium text-primary">{series.title}</span>
              </div>
            </div>
            <h3 className="text-base md:text-lg font-bold leading-tight group-hover:text-primary smooth-transition line-clamp-2 pb-2">
              {title}
            </h3>
            <p className="text-muted-foreground mb-2 md:mb-3 text-md leading-relaxed line-clamp-3 flex-1">
              {plainContent}
            </p>
            <TagList tags={tags} maxVisible={3} variant="custom" className="mb-2 md:mb-3" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground mt-auto space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 md:space-x-3">
                <MetaInfoItem icon={<Calendar className="h-3 w-3" />} text={publishedAt} className="truncate" />
                <MetaInfoItem icon={<Clock className="h-3 w-3" />} text={readTime} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
