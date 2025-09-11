import { Button } from '../../primitives/button';
import { Badge } from '../../primitives/badge';

export interface SeriesCardProps {
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

export const SeriesCard = ({
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
}: SeriesCardProps) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="default" className="text-xs">
            완료
          </Badge>
        );
      case 'coming-soon':
        return (
          <Badge variant="secondary" className="text-xs">
            예정
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return '시리즈 완료';
      case 'coming-soon':
        return '곧 시작';
      default:
        return '읽기 시작';
    }
  };

  const handleClick = () => {
    onClick?.(slug);
  };

  return (
    <div
      className={`code-card group cursor-pointer h-full flex flex-col bg-gradient-to-br from-card via-card to-muted/30 border-2 border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-300 ${className}`}
      {...(onClick && { onClick: handleClick })}
    >
      <div className="flex-1 p-3 md:p-4">
        <div className="flex items-start justify-between mb-2 md:mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 space-y-1 md:space-y-0">
              <h3 className="text-base md:text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {title}
              </h3>
              <div className="flex-shrink-0 self-start md:self-center">{getStatusBadge()}</div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-2 md:mb-3">
              <div className="flex items-center space-x-1">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>{articleCount} articles</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
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
              className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-2 py-0"
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

      <div className="mt-auto pt-2 md:pt-3 px-3 md:px-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-sm font-medium text-foreground/80">{getStatusText()}</span>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-200 p-1 h-6"
            aria-label={`View ${title} series`}
          >
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
