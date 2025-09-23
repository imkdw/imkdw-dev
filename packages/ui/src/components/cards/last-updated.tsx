import { cn } from '../../lib';

interface Props {
  date: string | Date | null;
  className?: string;
}

export function LastUpdated({ date, className }: Props) {
  const dateString = date ? new Date(date).toLocaleDateString('ko-KR') : '-';

  return (
    <div className={cn('text-sm text-muted-foreground', className)}>
      <span>최근 업데이트: {dateString}</span>
    </div>
  );
}
