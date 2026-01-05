import { cn } from '../../lib';

interface Props {
  date: string | Date | null;
  className?: string;
  label?: string;
  locale?: string;
}

export function LastUpdated({ date, className, label = 'Last updated:', locale = 'ko-KR' }: Props) {
  const dateString = date ? new Date(date).toLocaleDateString(locale) : '-';

  return (
    <div className={cn('text-sm text-muted-foreground', className)}>
      <span>
        {label} {dateString}
      </span>
    </div>
  );
}
