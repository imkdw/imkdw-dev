import { Calendar, Clock, Tag, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  series?: string;
  slug: string;
  isBookmarked?: boolean;
}

const ArticleCard = ({
  title,
  excerpt,
  publishedAt,
  readTime,
  tags,
  series,
  slug,
  isBookmarked = false,
}: ArticleCardProps) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    setBookmarked(!bookmarked);
  };

  return (
    <Link to={`/articles/${slug}`}>
      <article className="article-card group cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {series && (
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {series}
              </Badge>
            </div>
          )}
          <h3 className="text-xl font-semibold leading-tight group-hover:text-primary smooth-transition line-clamp-2">
            {title}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBookmark}
          className="ml-2 opacity-0 group-hover:opacity-100 smooth-transition"
        >
          {bookmarked ? (
            <BookmarkCheck className="h-4 w-4 text-primary" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </Button>
      </div>

      <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
        {excerpt}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            <Tag className="h-3 w-3 mr-1" />
            {tag}
          </Badge>
        ))}
        {tags.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{tags.length - 3} more
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{publishedAt}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
        <div className="text-primary font-medium opacity-0 group-hover:opacity-100 smooth-transition">
          Read more →
        </div>
      </div>
    </article>
    </Link>
  );
};

export default ArticleCard;