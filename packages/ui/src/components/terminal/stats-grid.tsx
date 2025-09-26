import { StatsGridProps } from './types';
import { formatNumber } from '@imkdw-dev/utils';

export function StatsGrid({ stats }: StatsGridProps) {
  const statsItems = [
    {
      label: '총 게시글',
      value: stats.article.count.toString(),
      color: 'text-primary',
    },
    {
      label: '진행 시리즈',
      value: stats.series.count.toString(),
      color: 'text-accent',
    },
    {
      label: '총 조회수',
      value: formatNumber(stats.article.viewCount),
      color: 'text-green-500',
    },
    {
      label: '기술 태그',
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
