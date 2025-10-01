import { SeriesMainCard } from './series-main-card';
import { SeriesStatsCards } from './series-stats-cards';
import type { ISeriesDetailDto } from '@imkdw-dev/types';

interface Props {
  seriesData: ISeriesDetailDto;
}

export function SeriesHeader({ seriesData }: Props) {
  return (
    <div className="space-y-6 mb-8">
      <SeriesMainCard seriesData={seriesData} />
      <SeriesStatsCards seriesData={seriesData} />
    </div>
  );
}
