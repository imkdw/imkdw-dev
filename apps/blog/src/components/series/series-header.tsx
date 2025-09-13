import { SeriesMainCard } from './series-main-card';
import { SeriesStatsCards } from './series-stats-cards';
import type { SeriesData } from '../../types/series';

interface Props {
  seriesData: SeriesData;
}

export function SeriesHeader({ seriesData }: Props) {
  return (
    <div className="space-y-6 mb-8">
      <SeriesMainCard seriesData={seriesData} />
      <SeriesStatsCards seriesData={seriesData} />
    </div>
  );
}
