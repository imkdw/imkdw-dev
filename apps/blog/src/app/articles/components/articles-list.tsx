import { FileText } from 'lucide-react';
import { ArticleCard } from '@imkdw-dev/ui';
import { IArticleListItemDto } from '@imkdw-dev/types';

interface Props {
  articles: IArticleListItemDto[];
}

export function ArticlesList({ articles }: Props) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
        <p className="text-muted-foreground">다른 검색어나 필터를 시도해보세요</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 cols-3 gap-4 md:gap-6">
      {articles.map(article => (
        <ArticleCard
          key={article.slug}
          title={article.title}
          excerpt=""
          publishedAt={new Date(article.createdAt).toLocaleDateString('ko-KR')}
          readTime={`${article.readMinute}분`}
          tags={[]}
          series={article.series.title}
          slug={article.slug}
        />
      ))}
    </div>
  );
}
