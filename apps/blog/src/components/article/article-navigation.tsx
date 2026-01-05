import { Link } from '@/i18n/navigation';
import { NavigationArticle } from '../../types/article';

interface Translations {
  previousArticle: string;
  nextArticle: string;
}

interface Props {
  previousArticle: NavigationArticle | null;
  nextArticle: NavigationArticle | null;
  translations: Translations;
}

export function ArticleNavigation({ previousArticle, nextArticle, translations }: Props) {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
      {previousArticle ? (
        <Link href={`/articles/${previousArticle.slug}`}>
          <div className="p-6 border rounded-lg hover:bg-card/50 transition-colors border-border text-left">
            <p className="text-sm text-muted-foreground mb-2">{translations.previousArticle}</p>
            <h3 className="font-medium truncate">{previousArticle.title}</h3>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextArticle ? (
        <Link href={`/articles/${nextArticle.slug}`}>
          <div className="p-6 border rounded-lg hover:bg-card/50 transition-colors border-border text-right">
            <p className="text-sm text-muted-foreground mb-2">{translations.nextArticle}</p>
            <h3 className="font-medium truncate">{nextArticle.title}</h3>
          </div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
