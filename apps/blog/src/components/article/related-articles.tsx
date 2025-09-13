import { Calendar, Clock } from 'lucide-react';
import { RelatedArticle } from '../../types/article';

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-lg font-semibold mb-6">관련 글</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg hover:bg-card/50 transition-colors cursor-pointer border-border"
          >
            <h4 className="font-medium mb-1">{article.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{article.description}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{article.publishedAt}</span>
              <Clock className="h-3 w-3 ml-2" />
              <span>{article.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
