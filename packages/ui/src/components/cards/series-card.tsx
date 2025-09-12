import { BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '../../lib';
import { MetaInfoItem } from './meta-info-item';
import { TagList } from './tag-list';
import { LastUpdated } from './last-updated';

export interface Props {
  title: string;
  description: string;
  articleCount: number;
  totalReadTime: string;
  tags: string[];
  slug: string;
  lastUpdated: string;
  classNames?: string;
}

export function SeriesCard({
  title,
  description,
  articleCount,
  totalReadTime,
  tags,
  slug,
  lastUpdated,
  classNames,
}: Props) {
  return (
    <Link href={`/series/${slug}`} className={cn('block h-full', classNames)}>
      <div className="rounded-xl p-2 group cursor-pointer h-full flex flex-col bg-gradient-to-br from-card via-card to-muted/30 border-2 border-border/60 hover:border-primary/30 hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.3)] transition-all duration-300">
        <div className="flex-1 p-3 md:p-4">
          <div className="flex items-start justify-between mb-2 md:mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 space-y-1 md:space-y-0">
                <h3 className="text-base md:text-lg font-bold leading-tight text-foreground group-hover:text-primary smooth-transition line-clamp-2">
                  {title}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2 md:mb-3">
                <MetaInfoItem icon={<BookOpen className="h-4 w-4" />} text={`${articleCount} articles`} />
                <MetaInfoItem icon={<Clock className="h-4 w-4" />} text={totalReadTime} />
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-2 md:mb-3 line-clamp-2 leading-relaxed text-md">{description}</p>

          <TagList tags={tags} maxVisible={2} variant="badge" className="mb-2 md:mb-3" />

          <LastUpdated date={lastUpdated} className="mb-2" />
        </div>
      </div>
    </Link>
  );
}
