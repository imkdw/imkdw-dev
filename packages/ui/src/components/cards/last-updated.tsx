import { cn } from '../../lib';

interface Props {
  date: string;
  className?: string;
}

export function LastUpdated({ date, className }: Props) {
  return (
    <div className={cn('text-xs text-muted-foreground', className)}>
      <span>최근 업데이트: {date}</span>
    </div>
  );
}