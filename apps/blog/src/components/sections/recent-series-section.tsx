import { Link } from '@/i18n/navigation';
import { BookOpen, Terminal } from 'lucide-react';
import { Button, cn, SeriesCard } from '@imkdw-dev/ui';
import { jetBrainsMono } from '@imkdw-dev/fonts';
import { ISeriesListItemDto } from '@imkdw-dev/types';
import { Locale } from '@imkdw-dev/i18n';

interface SeriesCardTranslations {
  articleCount: string;
  lastUpdated: string;
}

interface Props {
  seriesList: ISeriesListItemDto[];
  translations: {
    title: string;
    viewAll: string;
    viewAllShort: string;
  };
  seriesCardTranslations: SeriesCardTranslations;
  locale: Locale;
}

export function RecentSeries({
  seriesList,
  translations,
  seriesCardTranslations = { articleCount: '__count__ articles', lastUpdated: 'Last updated:' },
  locale,
}: Props) {
  return (
    <section className="bg-background border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-semibold text-foreground">{translations.title}</h2>
            <div className={cn('terminal-prompt text-xs text-muted-foreground', jetBrainsMono.className)}>
              find ./series -type d | head -2
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/series" className="inline-flex items-center">
            <Terminal className="mr-2 h-4 w-4 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">{translations.viewAll}</span>
            <span className="sm:hidden whitespace-nowrap">{translations.viewAllShort}</span>
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {seriesList.map(item => (
          <div key={item.slug} className="bounce-in h-full card-wrapper-cv">
            <SeriesCard series={item} LinkComponent={Link} translations={seriesCardTranslations} locale={locale} />
          </div>
        ))}
      </div>
    </section>
  );
}
