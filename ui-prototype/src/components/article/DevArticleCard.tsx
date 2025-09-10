import { 
  Calendar, 
  Clock, 
  Tag, 
  Star,
  GitBranch,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface DevArticleCardProps {
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  series?: string;
  slug: string;
  isBookmarked?: boolean;
}

const DevArticleCard = ({
  title,
  excerpt,
  publishedAt,
  readTime,
  tags,
  series,
  slug,
  isBookmarked = false,
}: DevArticleCardProps) => {
  const [starred, setStarred] = useState(isBookmarked);

  const handleStar = (e: React.MouseEvent) => {
    e.preventDefault();
    setStarred(!starred);
  };

  return (
    <article className="code-card group cursor-pointer h-full flex flex-col">
      {/* Card content */}
      <div className="code-card-content relative flex-1 flex flex-col">
        {/* Star button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleStar}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 smooth-transition p-1 z-10"
        >
          <Star 
            className={`h-3 w-3 ${starred ? 'fill-current text-primary' : 'text-muted-foreground'}`} 
          />
        </Button>

        {/* Series badge */}
        {series && (
          <div className="flex items-center space-x-2 mb-3">
            <GitBranch className="h-3 w-3 text-accent" />
            <Badge variant="secondary" className="text-xs font-mono">
              {series}
            </Badge>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base md:text-lg font-semibold leading-tight mb-2 md:mb-3 group-hover:text-primary smooth-transition line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-3 md:mb-4 text-sm leading-relaxed line-clamp-3 flex-1">
          {excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted/50 text-muted-foreground border border-border/50 font-mono"
            >
              <Tag className="h-2 w-2 mr-1 flex-shrink-0" />
              <span className="truncate max-w-[80px]">{tag}</span>
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted/50 text-muted-foreground border border-border/50 font-mono">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground font-mono mt-auto space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span className="truncate">{publishedAt}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{readTime}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-primary opacity-0 group-hover:opacity-100 smooth-transition">
            <span>Read</span>
            <ChevronRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default DevArticleCard;