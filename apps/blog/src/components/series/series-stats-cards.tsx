import { Card, CardContent } from '@imkdw-dev/ui';
import { formatDate } from '@imkdw-dev/utils/client';
import { BookOpen, Clock, Calendar, LucideIcon } from 'lucide-react';
import type { ISeriesDetailDto } from '@imkdw-dev/types';

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  colorClass: string;
  valueClass?: string;
}

interface Props {
  seriesData: ISeriesDetailDto;
  translations: {
    totalArticles: string;
    totalReadTime: string;
    lastUpdated: string;
    createdAt: string;
    hours: string;
    minutes: string;
  };
}

function StatCard({ icon: Icon, value, label, colorClass, valueClass = 'text-2xl md:text-3xl' }: StatCardProps) {
  return (
    <Card className="group hover:shadow-md transition-all duration-300 hover-scale border-none bg-card">
      <CardContent className="p-6 text-center">
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colorClass} mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <p className={`${valueClass} font-bold text-foreground mb-1`}>{value}</p>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
      </CardContent>
    </Card>
  );
}

export function SeriesStatsCards({ seriesData, translations }: Props) {
  const formatMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0
        ? `${hours}${translations.hours} ${mins}${translations.minutes}`
        : `${hours}${translations.hours}`;
    }
    return `${mins}${translations.minutes}`;
  };

  const statsData = [
    {
      icon: BookOpen,
      value: seriesData.articleCount,
      label: translations.totalArticles,
      colorClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      valueClass: 'text-2xl md:text-3xl',
    },
    {
      icon: Clock,
      value: formatMinutes(seriesData.totalReadMinute),
      label: translations.totalReadTime,
      colorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      valueClass: 'text-lg md:text-xl',
    },
    {
      icon: Calendar,
      value: seriesData.lastArticleCreatedAt ? formatDate(seriesData.lastArticleCreatedAt) : '-',
      label: translations.lastUpdated,
      colorClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      valueClass: 'text-sm md:text-base',
    },
    {
      icon: Calendar,
      value: formatDate(seriesData.createdAt),
      label: translations.createdAt,
      colorClass: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      valueClass: 'text-sm md:text-base',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          colorClass={stat.colorClass}
          valueClass={stat.valueClass}
        />
      ))}
    </div>
  );
}
