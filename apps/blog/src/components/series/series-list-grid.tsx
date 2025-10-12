import { SeriesCard } from '@imkdw-dev/ui';
import type { ISeriesDto } from '@imkdw-dev/types';

interface Props {
  items: ISeriesDto[];
}

export function SeriesListGrid({ items }: Props) {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      {items.map(series => (
        <div key={series.slug} className="w-full sm:w-[calc(50%-0.375rem)] md:w-[calc(50%-0.5rem)]">
          <SeriesCard series={series} />
        </div>
      ))}
    </div>
  );
}
