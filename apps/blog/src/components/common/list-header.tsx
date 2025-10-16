import { LucideIcon } from 'lucide-react';

export interface ListHeaderStat {
  label: string;
  value: number;
  icon?: LucideIcon;
}

interface Props {
  title: string;
  stats?: ListHeaderStat[];
}

export function ListHeader({ title, stats }: Props) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <h1 className="text-2xl md:text-3xl font-bold m-0">{title}</h1>
      </div>

      {stats && stats.length > 0 && (
        <div className={`grid grid-cols-${stats.length} gap-3 md:gap-4 mt-4 md:mt-6`}>
          {stats.map((stat, index) => (
            <div key={index} className="bg-card rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm text-muted-foreground truncate">{stat.label}</p>
                  <p className="text-lg md:text-2xl font-bold">{stat.value}</p>
                </div>
                {stat.icon && <stat.icon className="h-6 w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
