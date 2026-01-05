import { Locale } from '@imkdw-dev/i18n';
import { cn } from '../../lib';

interface Props {
  date: string | Date | null;
  className?: string;
  label?: string;
  locale: Locale;
}

export function LastUpdated({ date, className, label, locale }: Props) {
  const dateString = date ? new Date(date).toLocaleDateString(locale) : '-';

  return (
    <div className={cn('text-sm text-muted-foreground', className)}>
      <span>
        {label} {dateString}
      </span>
    </div>
  );
}
