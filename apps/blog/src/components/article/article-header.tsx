import { Badge } from '@imkdw-dev/ui';
import { BookOpen, Calendar, Clock } from 'lucide-react';
import { IArticleDto } from '@imkdw-dev/types';
import { formatDate, formatReadTime } from '@imkdw-dev/utils/client';

interface ArticleHeaderProps {
  article: IArticleDto;
  children?: React.ReactNode;
}

export function ArticleHeader({ article, children }: ArticleHeaderProps) {
  const { title, createdAt, readMinute, tags, series } = article;

  return (
    <div className="mb-8">
      {series !== null && (
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="bg-accent/20 text-accent p-2 px-4">
            <BookOpen className="w-3 h-3 mr-1" />
            {series.title}
          </Badge>
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 leading-tight">{title}</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 sm:gap-4 text-sm text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatReadTime(readMinute)}
          </span>
        </div>

        {children}
      </div>

      <div className="flex gap-2 flex-wrap">
        {tags.map(tag => (
          <Badge key={tag.name} variant="outline">
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
