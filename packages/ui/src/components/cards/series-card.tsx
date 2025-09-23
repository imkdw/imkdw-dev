import Link from 'next/link';
import { ISeriesListItemDto } from '@imkdw-dev/types';
import { MetaInfoItem } from './meta-info-item';
import { BookOpen, Clock } from 'lucide-react';
import { LastUpdated } from './last-updated';

export interface Props {
  series: ISeriesListItemDto;
}

export function SeriesCard({ series }: Props) {
  return (
    <Link href={`/series/${series.slug}`} className="block h-full">
      <div className="rounded-xl p-2 group cursor-pointer h-full flex flex-col bg-gradient-to-br from-card via-card to-muted/30 border-2 border-border/60 hover:border-primary/30 hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.3)] transition-all duration-300">
        <div className="flex-1 p-3 md:p-4">
          <div className="flex items-start justify-between mb-2 md:mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 space-y-1 md:space-y-0">
                <h3 className="text-base md:text-lg font-bold leading-tight text-foreground group-hover:text-primary smooth-transition line-clamp-2">
                  {series.title}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2 md:mb-3">
                <MetaInfoItem icon={<BookOpen className="h-4 w-4" />} text={`${series.articleCount} 개`} />
                <MetaInfoItem icon={<Clock className="h-4 w-4" />} text={`${series.totalReadMinute} 분`} />
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mb-2 md:mb-3 line-clamp-2 leading-relaxed text-md">
            {series.description}
          </p>
          {/* <TagList tags={tags} maxVisible={2} variant="badge" className="mb-2 md:mb-3" /> */}
          <LastUpdated date={series.lastArticleCreatedAt} className="mb-2" />
        </div>
      </div>
    </Link>
  );
}
