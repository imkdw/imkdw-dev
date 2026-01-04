import { formatNumber } from '@imkdw-dev/utils/client';
import type { IResponseGetStatsDto } from '@imkdw-dev/types';

interface Props {
  stats: IResponseGetStatsDto;
  translations: {
    totalArticles: string;
    activeSeries: string;
    totalViews: string;
    techTags: string;
  };
}

export function StatsGrid({ stats, translations }: Props) {
  const statsItems = [
    {
      label: translations.totalArticles,
      value: stats.article.count.toString(),
      color: 'text-primary',
    },
    {
      label: translations.activeSeries,
      value: stats.series.count.toString(),
      color: 'text-accent',
    },
    {
      label: translations.totalViews,
      value: formatNumber(stats.article.viewCount),
      color: 'text-green-500',
    },
    {
      label: translations.techTags,
      value: stats.tag.count.toString(),
      color: 'text-accent',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
      {statsItems.map(stat => (
        <div key={stat.label} className="p-2 md:p-3 lg:p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className={`text-base md:text-lg lg:text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
          <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
