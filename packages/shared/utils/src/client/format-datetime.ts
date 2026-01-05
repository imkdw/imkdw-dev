import type { Locale } from '@imkdw-dev/i18n';

const RELATIVE_DATE_LABELS: Record<Locale, { justNow: string; minutesAgo: string; hoursAgo: string; daysAgo: string }> =
  {
    ko: {
      justNow: '방금 전',
      minutesAgo: '분 전',
      hoursAgo: '시간 전',
      daysAgo: '일 전',
    },
    en: {
      justNow: 'Just now',
      minutesAgo: 'm ago',
      hoursAgo: 'h ago',
      daysAgo: 'd ago',
    },
  };

const READ_TIME_LABELS: Record<Locale, { minutes: string; hours: string }> = {
  ko: {
    minutes: '분',
    hours: '시간',
  },
  en: {
    minutes: 'min',
    hours: 'hr',
  },
};

function formatRelativeDate(date: Date, locale: Locale = 'ko'): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  const labels = RELATIVE_DATE_LABELS[locale];

  if (diffSec < 60) {
    return labels.justNow;
  }

  if (diffMin < 60) {
    return `${diffMin}${labels.minutesAgo}`;
  }

  if (diffHour < 24) {
    return `${diffHour}${labels.hoursAgo}`;
  }

  return `${diffDay}${labels.daysAgo}`;
}

function formatAbsoluteDate(date: Date, locale: Locale = 'ko'): string {
  const intlLocale = locale === 'ko' ? 'ko-KR' : 'en-US';
  return new Intl.DateTimeFormat(intlLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDate(date: Date | string, locale: Locale = 'ko'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    return formatRelativeDate(dateObj, locale);
  }

  return formatAbsoluteDate(dateObj, locale);
}

export function formatReadTime(minutes: number, locale: Locale): string {
  const labels = READ_TIME_LABELS[locale];

  if (minutes < 60) {
    return `${minutes}${labels.minutes}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}${labels.hours}`;
  }

  return `${hours}${labels.hours} ${remainingMinutes}${labels.minutes}`;
}
