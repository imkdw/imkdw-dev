'use client';

import { useState } from 'react';
import { Button } from '../../primitives/button';
import { Badge } from '../../primitives/badge';

export interface Props {
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  series?: string;
  slug: string;
  isBookmarked?: boolean;
  onClick?: (slug: string) => void;
  className?: string;
}

export const ArticleCard = ({
  title,
  excerpt,
  publishedAt,
  readTime,
  tags,
  series,
  slug,
  isBookmarked = false,
  onClick,
  className = '',
}: Props) => {
  const [starred, setStarred] = useState(isBookmarked);

  const handleStar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStarred(!starred);
  };

  const handleClick = () => {
    onClick?.(slug);
  };

  return (
    <article
      className={`code-card group cursor-pointer h-full flex flex-col ${className}`}
      {...(onClick && { onClick: handleClick })}
    >
      <div className="code-card-content relative flex-1 flex flex-col">
        {/* Star button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleStar}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 z-10"
          aria-label={starred ? 'Remove bookmark' : 'Add bookmark'}
        >
          <svg
            className={`h-3 w-3 ${starred ? 'fill-current text-primary' : 'text-muted-foreground'}`}
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </Button>

        {/* Series badge */}
        {series && (
          <div className="flex items-center space-x-2 mb-3">
            <svg className="h-3 w-3 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="6" y1="3" x2="6" y2="15" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="m18 9-1.5-1.5" />
            </svg>
            <Badge variant="secondary" className="text-xs">
              {series}
            </Badge>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base md:text-lg font-semibold leading-tight mb-2 md:mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-3 md:mb-4 text-sm leading-relaxed line-clamp-3 flex-1">{excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
          {tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted/50 text-muted-foreground border border-border/50"
            >
              <svg className="h-2 w-2 mr-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
              <span className="truncate max-w-[80px]">{tag}</span>
            </span>
          ))}
          {tags.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-muted/50 text-muted-foreground border border-border/50">
              +{tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground mt-auto space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="flex items-center space-x-1">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="truncate">{publishedAt}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <span>{readTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span>Read</span>
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  );
};
