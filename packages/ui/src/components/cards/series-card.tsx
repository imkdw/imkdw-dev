import { Button } from '../../primitives/button';
import { Badge } from '../../primitives/badge';
import { BookOpen, Clock } from 'lucide-react';
import Link from 'next/link';

export interface Props {
  title: string;
  description: string;
  articleCount: number;
  totalReadTime: string;
  tags: string[];
  slug: string;
  lastUpdated: string;
  status?: 'active' | 'completed' | 'coming-soon';
  onClick?: (slug: string) => void;
  className?: string;
}

export function SeriesCard({
  title,
  description,
  articleCount,
  totalReadTime,
  tags,
  slug,
  lastUpdated,
  status = 'active',
  onClick,
  className = '',
}: Props) {
  return (
    <Link href={`/series/${slug}`} className="block h-full">
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
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{articleCount} articles</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{totalReadTime}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground mb-2 md:mb-3 line-clamp-2 leading-relaxed text-sm">{description}</p>

          <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
            {tags.slice(0, 2).map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-2 py-1"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/20 px-2 py-0">
                +{tags.length - 2}
              </Badge>
            )}
          </div>

          <div className="mb-2 text-xs text-muted-foreground">
            <span>최근 업데이트: {lastUpdated}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
