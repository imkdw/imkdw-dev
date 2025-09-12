import { Badge } from '../../primitives/badge';
import { cn } from '../../lib';

interface Props {
  tags: string[];
  maxVisible?: number;
  variant: 'badge' | 'custom';
  className?: string;
}

export function TagList({ tags, maxVisible = 2, variant, className }: Props) {
  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;

  if (variant === 'badge') {
    return (
      <div className={cn('flex flex-wrap gap-1', className)}>
        {visibleTags.map(tag => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-2 py-1 border"
          >
            {tag}
          </Badge>
        ))}
        {remainingCount > 0 && (
          <Badge variant="secondary" className="text-sm bg-accent/10 text-accent border-accent/20 px-2 py-0 border">
            +{remainingCount}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {visibleTags.map(tag => (
        <span
          key={tag}
          className="inline-flex items-center px-2 py-1 rounded-lg text-sm bg-secondary/80 text-secondary-foreground border-1 border-accent/40 ring-1 ring-accent/10 hover:bg-secondary hover:border-accent/60 hover:ring-accent/20 transition-colors duration-200"
        >
          {tag}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="inline-flex items-center px-2 py-1 rounded-lg text-sm bg-secondary/80 text-secondary-foreground border-2 border-accent/40 ring-1 ring-accent/10 hover:bg-secondary hover:border-accent/60 hover:ring-accent/20 transition-colors duration-200">
          +{remainingCount}
        </span>
      )}
    </div>
  );
}
