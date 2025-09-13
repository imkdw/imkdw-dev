import { Badge, Avatar, AvatarImage, AvatarFallback } from '@imkdw-dev/ui';
import { BookOpen, Calendar, Clock } from 'lucide-react';
import { Author, SeriesInfo } from '../../types/article';

interface ArticleHeaderProps {
  title: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  tags: string[];
  series?: SeriesInfo;
  slug: string;
  children?: React.ReactNode;
}

export function ArticleHeader({ title, author, publishedAt, readTime, tags, series, children }: ArticleHeaderProps) {
  return (
    <div className="mb-8">
      {series && (
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="bg-accent/20 text-accent p-2 px-4">
            <BookOpen className="w-3 h-3 mr-1" />
            {series.title}
          </Badge>
          <span className="text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">
            Part {series.part} of {series.total}
          </span>
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">{title}</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={author.avatar ?? '/placeholder.svg'} />
            <AvatarFallback>{author.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{author.name}</p>
            <div className="flex items-center gap-2 sm:gap-4 text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readTime}
              </span>
            </div>
          </div>
        </div>

        {children}
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags.map(tag => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
