import { StatsGridProps } from './types';

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
      {stats.map(stat => (
        <div key={stat.label} className="p-2 md:p-3 lg:p-4 rounded-lg bg-muted/30 border border-border/50">
          <div className={`text-base md:text-lg lg:text-2xl font-bold ${stat.color || 'text-primary'} mb-1`}>
            {stat.value}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
