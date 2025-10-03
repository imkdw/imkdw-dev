import { Badge } from '../../primitives/badge';
import { cn } from '../../lib';

type Variant = 'badge' | 'custom';
interface Props {
  tags: string[];
  variant: Variant;
  className?: string;
  maxVisible?: number;
}

export function TagList({ tags, maxVisible = 2, variant, className }: Props) {
  const visibleTags = tags.slice(0, maxVisible);
  const remainingCount = tags.length - maxVisible;

  const renderTag = (tag: string) => {
    if (variant === 'badge') {
      return (
        <Badge
          key={tag}
          variant="secondary"
          className="text-sm bg-primary/10 text-primary hover:bg-primary/20 px-2 py-1"
        >
          {tag}
        </Badge>
      );
    }

    return (
      <span
        key={tag}
        className="inline-flex items-center px-2 py-1 rounded-lg text-sm bg-secondary/80 text-secondary-foreground ring-1 ring-accent/10 hover:bg-secondary hover:ring-accent/20 transition-colors duration-200"
      >
        {tag}
      </span>
    );
  };

  const renderRemainingCount = () => {
    if (remainingCount <= 0) {
      return null;
    }

    if (variant === 'badge') {
      return (
        <Badge variant="secondary" className="text-sm bg-accent/10 text-accent px-2 py-0">
          +{remainingCount}
        </Badge>
      );
    }

    return (
      <span className="inline-flex items-center px-2 py-1 rounded-lg text-sm bg-secondary/80 text-secondary-foreground border border-accent/20 ring-1 ring-accent/10 hover:bg-secondary hover:ring-accent/20 transition-colors duration-200">
        +{remainingCount}
      </span>
    );
  };

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {visibleTags.map(renderTag)}
      {renderRemainingCount()}
    </div>
  );
}
