import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface ListHeaderStat {
  label: string;
  value: number;
  icon: LucideIcon;
}

interface Props {
  title: string;
  stats?: ListHeaderStat[];
  action?: ReactNode;
}

export function ListHeader({ title, stats, action }: Props) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold m-0">{title}</h1>
        {action}
      </div>
      {stats && stats.length > 0 && (
        <div className="flex gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card rounded-lg p-4 flex-1">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">{stat.label}</p>
                  <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
