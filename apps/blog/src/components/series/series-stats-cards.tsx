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

export function SeriesStatsCards({ seriesData }: Props) {
  const formatMinutes = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}시간 ${mins}분` : `${hours}시간`;
    }
    return `${mins}분`;
  };

  const statsData = [
    {
      icon: BookOpen,
      value: seriesData.articleCount,
      label: '총 글 수',
      colorClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      valueClass: 'text-2xl md:text-3xl',
    },
    {
      icon: Clock,
      value: formatMinutes(seriesData.totalReadMinute),
      label: '총 읽기 시간',
      colorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      valueClass: 'text-lg md:text-xl',
    },
    {
      icon: Calendar,
      value: seriesData.lastArticleCreatedAt ? formatDate(seriesData.lastArticleCreatedAt) : '-',
      label: '최근 업데이트',
      colorClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      valueClass: 'text-sm md:text-base',
    },
    {
      icon: Calendar,
      value: formatDate(seriesData.createdAt),
      label: '시리즈 생성일',
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
