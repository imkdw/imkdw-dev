import { FileText } from 'lucide-react';
import { ArticleCard } from '@imkdw-dev/ui';
import { IArticleListItemDto } from '@imkdw-dev/types';

interface Props {
  articles: IArticleListItemDto[];
  translations: {
    noResults: string;
  };
}

export function ArticlesList({ articles, translations }: Props) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">{translations.noResults}</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 cols-3 gap-4">
      {articles.map(article => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
