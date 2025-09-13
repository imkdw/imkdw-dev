import { NavigationArticle } from '../../types/article';

interface ArticleNavigationProps {
  previousArticle?: NavigationArticle;
  nextArticle?: NavigationArticle;
}

export function ArticleNavigation({ previousArticle, nextArticle }: ArticleNavigationProps) {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
      {previousArticle ? (
        <div className="p-6 border rounded-lg hover:bg-card/50 transition-colors border-border">
          <p className="text-sm text-muted-foreground mb-2">Previous Article</p>
          <h3 className="font-medium">{previousArticle.title}</h3>
        </div>
      ) : (
        <div />
      )}

      {nextArticle ? (
        <div className="p-6 border rounded-lg hover:bg-card/50 transition-colors border-border">
          <p className="text-sm text-muted-foreground mb-2">Next Article</p>
          <h3 className="font-medium">{nextArticle.title}</h3>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
