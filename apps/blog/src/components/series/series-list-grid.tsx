import { SeriesCard } from '@imkdw-dev/ui';
import type { ISeriesListItemDto } from '@imkdw-dev/types';
import { Link } from '@/i18n/navigation';

interface Props {
  items: ISeriesListItemDto[];
}

export function SeriesListGrid({ items }: Props) {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      {items.map(series => (
        <div key={series.slug} className="w-full sm:w-[calc(50%-0.375rem)] md:w-[calc(50%-0.5rem)]">
          <SeriesCard series={series} LinkComponent={Link} />
        </div>
      ))}
    </div>
  );
}
